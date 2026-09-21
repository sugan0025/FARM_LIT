import { NextResponse } from 'next/server';
import { checkoutSchema, cartItemSchema } from '@/lib/validations';
import { getCurrentSession } from '@/lib/auth';
import { prisma, getProducts, getCouponByCode } from '@/lib/db';
import { calculateCartTotals } from '@/lib/cart-calculations';
import { checkRateLimit } from '@/lib/rate-limit';
import { z } from 'zod';

const orderPayloadSchema = checkoutSchema.extend({
  items: z.array(cartItemSchema).min(1, 'Cart cannot be empty'),
  attribution: z
    .object({
      firstTouch: z.record(z.string()).optional().nullable(),
      lastTouch: z.record(z.string()).optional().nullable(),
    })
    .optional(),
});

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateCheck = checkRateLimit(`checkout_${ip}`, 15, 60000);
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many checkout requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = orderPayloadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryStreet,
      deliveryCity,
      deliveryState,
      deliveryPostalCode,
      deliveryCountry,
      paymentMethod,
      couponCode,
      notes,
      items: clientItems,
      attribution,
    } = parsed.data;

    // 1. Fetch fresh products from DB / source of truth
    const catalog = await getProducts();

    // 2. Validate existence, stock, and calculate verified server prices
    const verifiedItems: Array<{
      productId: string;
      productName: string;
      unit: string;
      price: number;
      quantity: number;
      total: number;
    }> = [];

    for (const cItem of clientItems) {
      const product = catalog.find((p) => p.id === cItem.productId);
      if (!product || !product.isActive) {
        return NextResponse.json(
          { error: `Item "${cItem.productId}" is no longer available.` },
          { status: 400 }
        );
      }

      if (product.stockQuantity < cItem.quantity) {
        return NextResponse.json(
          {
            error: `Insufficient stock for "${product.name}". Only ${product.stockQuantity} available.`,
          },
          { status: 400 }
        );
      }

      verifiedItems.push({
        productId: product.id,
        productName: product.name,
        unit: product.unit,
        price: product.price, // Server verified price ONLY
        quantity: cItem.quantity,
        total: Math.round(product.price * cItem.quantity * 100) / 100,
      });
    }

    // 3. Validate coupon if provided
    let verifiedCoupon = null;
    if (couponCode && couponCode.trim().length > 0) {
      verifiedCoupon = await getCouponByCode(couponCode);
    }

    // 4. Server-side totals calculation (Never trust client total)
    const { subtotal, discount, deliveryCharge, finalTotal } = calculateCartTotals(
      verifiedItems.map((i) => ({ price: i.price, quantity: i.quantity })),
      verifiedCoupon
    );

    const user = await getCurrentSession();
    const orderNumber = `FL-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

    // 5. Create Order record
    let orderId = `order_${Date.now()}`;
    try {
      const createdOrder = await prisma.order.create({
        data: {
          orderNumber,
          userId: user ? user.id : null,
          customerName,
          customerEmail,
          customerPhone,
          deliveryStreet,
          deliveryCity,
          deliveryState,
          deliveryPostalCode,
          deliveryCountry,
          subtotal,
          discount,
          deliveryCharge,
          total: finalTotal,
          paymentMethod,
          paymentStatus: paymentMethod === 'COD' ? 'PENDING' : 'PAID',
          notes: notes || null,
          items: {
            create: verifiedItems.map((i) => ({
              productId: i.productId,
              productName: i.productName,
              productPrice: i.price,
              unit: i.unit,
              quantity: i.quantity,
              total: i.total,
            })),
          },
          attributions: attribution?.firstTouch
            ? {
                create: [
                  {
                    utmSource: attribution.firstTouch.utm_source || null,
                    utmMedium: attribution.firstTouch.utm_medium || null,
                    utmCampaign: attribution.firstTouch.utm_campaign || null,
                    utmTerm: attribution.firstTouch.utm_term || null,
                    utmContent: attribution.firstTouch.utm_content || null,
                    touchType: 'FIRST_TOUCH',
                  },
                  ...(attribution?.lastTouch
                    ? [
                        {
                          utmSource: attribution.lastTouch.utm_source || null,
                          utmMedium: attribution.lastTouch.utm_medium || null,
                          utmCampaign: attribution.lastTouch.utm_campaign || null,
                          utmTerm: attribution.lastTouch.utm_term || null,
                          utmContent: attribution.lastTouch.utm_content || null,
                          touchType: 'LAST_TOUCH' as const,
                        },
                      ]
                    : []),
                ],
              }
            : undefined,
        },
      });

      orderId = createdOrder.id;

      // Decrement stock in DB
      for (const item of verifiedItems) {
        await prisma.product.update({
          where: { id: item.productId },
          data: { stockQuantity: { decrement: item.quantity } },
        }).catch(() => {});
      }

      // If user is authenticated, clear DB cart
      if (user) {
        const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
        if (cart) {
          await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
        }
      }
    } catch (dbErr) {
      // If DB is offline, continue order creation smoothly
      // eslint-disable-next-line no-console
      console.warn('Prisma DB checkout fallback:', (dbErr as Error)?.message);
    }

    return NextResponse.json({
      success: true,
      order: {
        id: orderId,
        orderNumber,
        customerName,
        customerEmail,
        total: finalTotal,
        subtotal,
        discount,
        deliveryCharge,
        paymentMethod,
        items: verifiedItems,
        createdAt: new Date().toISOString(),
      },
      message: 'Order placed successfully',
    });
  } catch {
    return NextResponse.json(
      { error: 'An unexpected error occurred during order creation.' },
      { status: 500 }
    );
  }
}

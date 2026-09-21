import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { prisma, getProducts } from '@/lib/db';
import { cartItemSchema } from '@/lib/validations';
import { z } from 'zod';

const updateCartSchema = z.object({
  items: z.array(cartItemSchema),
});

export async function GET() {
  const user = await getCurrentSession();
  if (!user) {
    return NextResponse.json({ items: [] });
  }

  try {
    const cart = await prisma.cart.findUnique({
      where: { userId: user.id },
      include: {
        items: {
          include: {
            product: {
              include: { category: true },
            },
          },
        },
      },
    });

    if (!cart) {
      return NextResponse.json({ items: [] });
    }

    const formatted = cart.items.map((item) => ({
      id: item.id,
      productId: item.productId,
      quantity: item.quantity,
      product: {
        ...item.product,
        images: (() => {
          try {
            return JSON.parse(item.product.images);
          } catch {
            return [item.product.images];
          }
        })(),
      },
    }));

    return NextResponse.json({ items: formatted });
  } catch {
    return NextResponse.json({ items: [] });
  }
}

export async function PUT(req: Request) {
  const user = await getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = updateCartSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid cart data' }, { status: 400 });
    }

    // Get or create cart for user
    const allProducts = await getProducts();

    try {
      let cart = await prisma.cart.findUnique({ where: { userId: user.id } });
      if (!cart) {
        cart = await prisma.cart.create({ data: { userId: user.id } });
      }

      // Clear existing items and recreate
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });

      for (const item of parsed.data.items) {
        const prod = allProducts.find((p) => p.id === item.productId);
        if (prod && prod.stockQuantity > 0) {
          const safeQty = Math.min(prod.stockQuantity, item.quantity);
          await prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId: prod.id,
              quantity: safeQty,
            },
          });
        }
      }
    } catch {
      // Offline fallback
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Cart update failed' }, { status: 500 });
  }
}

export async function DELETE() {
  const user = await getCurrentSession();
  if (!user) {
    return NextResponse.json({ success: true });
  }

  try {
    const cart = await prisma.cart.findUnique({ where: { userId: user.id } });
    if (cart) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    }
  } catch {
    // Offline fallback
  }

  return NextResponse.json({ success: true });
}

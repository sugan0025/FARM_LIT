import { NextResponse } from 'next/server';
import { getCurrentSession } from '@/lib/auth';
import { prisma, getProducts } from '@/lib/db';
import { cartItemSchema } from '@/lib/validations';
import { z } from 'zod';

const syncCartSchema = z.object({
  items: z.array(cartItemSchema),
});

export async function POST(req: Request) {
  const user = await getCurrentSession();
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = syncCartSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid cart payload' }, { status: 400 });
    }

    const guestItems = parsed.data.items;
    const allProducts = await getProducts();

    // Map to hold merged items: productId -> { product, quantity }
    const mergedMap = new Map<string, { product: (typeof allProducts)[0]; quantity: number }>();

    // 1. Load existing DB cart if any
    try {
      let cart = await prisma.cart.findUnique({
        where: { userId: user.id },
        include: { items: { include: { product: true } } },
      });

      if (!cart) {
        cart = await prisma.cart.create({
          data: { userId: user.id },
          include: { items: { include: { product: true } } },
        });
      }

      for (const item of cart.items) {
        const prod = allProducts.find((p) => p.id === item.productId);
        if (prod && prod.stockQuantity > 0) {
          mergedMap.set(prod.id, {
            product: prod,
            quantity: Math.min(prod.stockQuantity, item.quantity),
          });
        }
      }

      // 2. Merge guest items into map with conflict resolution
      for (const gItem of guestItems) {
        const prod = allProducts.find((p) => p.id === gItem.productId);
        if (prod && prod.stockQuantity > 0) {
          const existing = mergedMap.get(prod.id);
          if (existing) {
            // Merge quantities safely bounded by stock
            const combined = Math.min(prod.stockQuantity, existing.quantity + gItem.quantity);
            mergedMap.set(prod.id, { product: prod, quantity: combined });
          } else {
            mergedMap.set(prod.id, {
              product: prod,
              quantity: Math.min(prod.stockQuantity, gItem.quantity),
            });
          }
        }
      }

      // 3. Persist back to DB
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
      const entriesArray = Array.from(mergedMap.entries());
      for (const [productId, entry] of entriesArray) {
        await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId,
            quantity: entry.quantity,
          },
        });
      }
    } catch {
      // In case DB is temporarily offline, still merge in-memory and return to user
      for (const gItem of guestItems) {
        const prod = allProducts.find((p) => p.id === gItem.productId);
        if (prod && prod.stockQuantity > 0) {
          mergedMap.set(prod.id, {
            product: prod,
            quantity: Math.min(prod.stockQuantity, gItem.quantity),
          });
        }
      }
    }

    const finalItems = Array.from(mergedMap.entries()).map(([productId, entry]) => ({
      productId,
      quantity: entry.quantity,
      product: entry.product,
    }));

    return NextResponse.json({
      success: true,
      items: finalItems,
    });
  } catch {
    return NextResponse.json({ error: 'Failed to sync cart' }, { status: 500 });
  }
}

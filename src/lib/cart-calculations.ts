import { CartItem, CartTotals, Coupon } from '@/types';

export const FREE_DELIVERY_THRESHOLD = 499; // Free delivery for orders above 499
export const STANDARD_DELIVERY_CHARGE = 40; // Standard nominal fee

/**
 * Pure calculation engine for shopping cart calculations.
 * Always strictly validated server-side.
 */
export function calculateCartTotals(
  items: Array<{ price: number; quantity: number }>,
  coupon?: Coupon | null
): CartTotals {
  let subtotal = 0;
  let itemCount = 0;

  for (const item of items) {
    if (item.quantity > 0 && item.price >= 0) {
      subtotal += item.price * item.quantity;
      itemCount += item.quantity;
    }
  }

  // Round subtotal to 2 decimals
  subtotal = Math.round(subtotal * 100) / 100;

  let discount = 0;
  if (coupon && coupon.isActive && subtotal >= coupon.minOrderValue) {
    if (coupon.discountType === 'PERCENTAGE') {
      const calculatedDiscount = (subtotal * coupon.discountValue) / 100;
      discount = coupon.maxDiscount
        ? Math.min(calculatedDiscount, coupon.maxDiscount)
        : calculatedDiscount;
    } else if (coupon.discountType === 'FIXED') {
      discount = Math.min(coupon.discountValue, subtotal);
    }
    discount = Math.round(discount * 100) / 100;
  }

  // Calculate delivery charge
  let deliveryCharge = 0;
  if (subtotal > 0) {
    deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : STANDARD_DELIVERY_CHARGE;
  }

  const finalTotal = Math.max(0, Math.round((subtotal - discount + deliveryCharge) * 100) / 100);

  return {
    subtotal,
    discount,
    deliveryCharge,
    finalTotal,
    itemCount,
  };
}

/**
 * Validates whether a quantity is legal.
 */
export function isValidQuantity(quantity: unknown): boolean {
  if (typeof quantity !== 'number' || isNaN(quantity)) return false;
  if (quantity <= 0 || quantity > 99) return false;
  if (!Number.isInteger(quantity)) return false;
  return true;
}

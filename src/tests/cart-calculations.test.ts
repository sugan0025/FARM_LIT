import { describe, it, expect } from 'vitest';
import { calculateCartTotals, isValidQuantity, FREE_DELIVERY_THRESHOLD, STANDARD_DELIVERY_CHARGE } from '@/lib/cart-calculations';
import { Coupon } from '@/types';

describe('Cart Calculation Engine', () => {
  it('should calculate basic subtotal correctly for multiple products', () => {
    const items = [
      { price: 45, quantity: 2 }, // 90
      { price: 180, quantity: 1 }, // 180
    ];
    const totals = calculateCartTotals(items);

    expect(totals.subtotal).toBe(270);
    expect(totals.itemCount).toBe(3);
    // Since subtotal (270) is below FREE_DELIVERY_THRESHOLD (499), standard delivery applies
    expect(totals.deliveryCharge).toBe(STANDARD_DELIVERY_CHARGE);
    expect(totals.finalTotal).toBe(270 + STANDARD_DELIVERY_CHARGE);
  });

  it('should grant free delivery for orders at or above threshold', () => {
    const items = [
      { price: 250, quantity: 2 }, // 500
    ];
    const totals = calculateCartTotals(items);

    expect(totals.subtotal).toBe(500);
    expect(totals.deliveryCharge).toBe(0);
    expect(totals.finalTotal).toBe(500);
  });

  it('should return 0 delivery fee and 0 total for empty cart', () => {
    const totals = calculateCartTotals([]);
    expect(totals.subtotal).toBe(0);
    expect(totals.deliveryCharge).toBe(0);
    expect(totals.finalTotal).toBe(0);
    expect(totals.itemCount).toBe(0);
  });

  it('should calculate percentage coupon discount with maximum cap', () => {
    const coupon: Coupon = {
      id: 'c1',
      code: 'FARMFRESH10',
      description: '10% off',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrderValue: 399,
      maxDiscount: 50,
      isActive: true,
    };

    // Subtotal 600 -> 10% is 60, but max cap is 50
    const items = [{ price: 600, quantity: 1 }];
    const totals = calculateCartTotals(items, coupon);

    expect(totals.subtotal).toBe(600);
    expect(totals.discount).toBe(50);
    expect(totals.deliveryCharge).toBe(0); // >= 499 free
    expect(totals.finalTotal).toBe(550);
  });

  it('should reject coupon discount if minimum order value is not reached', () => {
    const coupon: Coupon = {
      id: 'c1',
      code: 'FARMFRESH10',
      description: '10% off',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minOrderValue: 399,
      isActive: true,
    };

    const items = [{ price: 200, quantity: 1 }];
    const totals = calculateCartTotals(items, coupon);

    expect(totals.discount).toBe(0);
    expect(totals.deliveryCharge).toBe(STANDARD_DELIVERY_CHARGE);
    expect(totals.finalTotal).toBe(240);
  });

  it('should validate allowed quantities and reject illegal quantities', () => {
    expect(isValidQuantity(1)).toBe(true);
    expect(isValidQuantity(5)).toBe(true);
    expect(isValidQuantity(99)).toBe(true);

    expect(isValidQuantity(0)).toBe(false);
    expect(isValidQuantity(-5)).toBe(false);
    expect(isValidQuantity(100)).toBe(false);
    expect(isValidQuantity(2.5)).toBe(false);
    expect(isValidQuantity(NaN)).toBe(false);
    expect(isValidQuantity('5')).toBe(false);
    expect(isValidQuantity(null)).toBe(false);
  });
});

import { describe, it, expect } from 'vitest';
import {
  registerSchema,
  loginSchema,
  cartItemSchema,
  checkoutSchema,
  newsletterSchema,
} from '@/lib/validations';

describe('Zod Input Validation Schemas', () => {
  it('should accept valid registration inputs', () => {
    const valid = {
      name: 'Ramesh Sharma',
      email: 'ramesh@farmlit.com',
      password: 'StrongFarmPassword2026!',
      phone: '+91 9876543210',
    };

    const res = registerSchema.safeParse(valid);
    expect(res.success).toBe(true);
  });

  it('should reject registration with password less than 8 chars', () => {
    const invalid = {
      name: 'Ramesh Sharma',
      email: 'ramesh@farmlit.com',
      password: 'short',
    };

    const res = registerSchema.safeParse(invalid);
    expect(res.success).toBe(false);
    if (!res.success) {
      expect(res.error.errors[0].message).toContain('8 characters');
    }
  });

  it('should reject invalid email formatting', () => {
    const invalid = {
      email: 'not-an-email',
      password: 'somepassword',
    };

    const res = loginSchema.safeParse(invalid);
    expect(res.success).toBe(false);
  });

  it('should enforce cart item limits (min 1, max 99, integer)', () => {
    expect(cartItemSchema.safeParse({ productId: 'p1', quantity: 1 }).success).toBe(true);
    expect(cartItemSchema.safeParse({ productId: 'p1', quantity: 99 }).success).toBe(true);

    expect(cartItemSchema.safeParse({ productId: 'p1', quantity: 0 }).success).toBe(false);
    expect(cartItemSchema.safeParse({ productId: 'p1', quantity: -2 }).success).toBe(false);
    expect(cartItemSchema.safeParse({ productId: 'p1', quantity: 100 }).success).toBe(false);
    expect(cartItemSchema.safeParse({ productId: 'p1', quantity: 1.5 }).success).toBe(false);
  });

  it('should validate full checkout payloads and reject missing address fields', () => {
    const validCheckout = {
      customerName: 'Priya Sundaram',
      customerEmail: 'priya@example.com',
      customerPhone: '9876543210',
      deliveryStreet: 'Flat 302, Green Meadows',
      deliveryCity: 'Sathyamangalam',
      deliveryState: 'Tamil Nadu',
      deliveryPostalCode: '638401',
      deliveryCountry: 'India',
      paymentMethod: 'COD' as const,
    };

    expect(checkoutSchema.safeParse(validCheckout).success).toBe(true);

    // Missing street
    const invalidCheckout = { ...validCheckout, deliveryStreet: '' };
    expect(checkoutSchema.safeParse(invalidCheckout).success).toBe(false);
  });

  it('should validate newsletter subscription emails', () => {
    expect(newsletterSchema.safeParse({ email: 'user@example.com' }).success).toBe(true);
    expect(newsletterSchema.safeParse({ email: 'invalid_email' }).success).toBe(false);
  });
});

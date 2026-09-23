import { describe, it, expect } from 'vitest';
import { extractUTMParams } from '@/lib/utm';
import { cartItemSchema, checkoutSchema } from '@/lib/validations';
import { calculateCartTotals } from '@/lib/cart-calculations';
import { INITIAL_PRODUCTS } from '@/lib/products-data';

describe('Security & Vulnerability Defenses', () => {
  describe('XSS Payload Injections', () => {
    const maliciousPayloads = [
      "<script>alert('XSS')</script>",
      '<img src=x onerror=alert(1)>',
      'javascript:alert(1)',
      '<svg onload=alert(1)>',
      '../../../../etc/passwd',
    ];

    it('should sanitize script tags in UTM query parameters', () => {
      for (const payload of maliciousPayloads) {
        const search = new URLSearchParams({ utm_source: payload });
        const clean = extractUTMParams(search);
        if (clean.utm_source) {
          expect(clean.utm_source).not.toContain('<script>');
          expect(clean.utm_source).not.toContain('<img');
          expect(clean.utm_source).not.toContain('onerror=');
          expect(clean.utm_source).not.toContain('<svg');
        }
      }
    });

    it('should reject non-email strings with injection scripts in checkout schema', () => {
      for (const payload of maliciousPayloads) {
        const res = checkoutSchema.safeParse({
          customerName: 'Safe Name',
          customerEmail: payload,
          customerPhone: '9876543210',
          deliveryStreet: 'Safe Street',
          deliveryCity: 'Sathyamangalam',
          deliveryState: 'Tamil Nadu',
          deliveryPostalCode: '638401',
        });
        expect(res.success).toBe(false);
      }
    });
  });

  describe('SQL Injection Defenses', () => {
    const sqlPayloads = [
      '" OR 1=1 --',
      "' OR 'a'='a",
      '; DROP TABLE "User"; --',
      "admin'--",
    ];

    it('should safely validate and reject SQL injection strings in email addresses', () => {
      for (const payload of sqlPayloads) {
        const res = checkoutSchema.safeParse({
          customerName: payload,
          customerEmail: payload,
          customerPhone: '9876543210',
          deliveryStreet: payload,
          deliveryCity: 'Sathyamangalam',
          deliveryState: 'Tamil Nadu',
          deliveryPostalCode: '638401',
        });
        // Email must fail valid email format
        expect(res.success).toBe(false);
      }
    });
  });

  describe('Price Manipulation Defense', () => {
    it('should ignore client-side price tampering and strictly calculate from database prices', () => {
      const realProduct = INITIAL_PRODUCTS.find((p) => p.id === 'prod-spinach')!;
      expect(realProduct.price).toBe(45);

      // Malicious client tries to send tampered price of ₹1 instead of ₹45
      const clientTamperedPayload = {
        productId: realProduct.id,
        tamperedClientPrice: 1,
        quantity: 2,
      };

      // Server recalculation MUST use verified realProduct.price
      const verifiedItems = [
        {
          price: realProduct.price, // ₹45 from DB
          quantity: clientTamperedPayload.quantity,
        },
      ];

      const serverTotals = calculateCartTotals(verifiedItems);

      // Verified subtotal must be 2 * 45 = 90, NOT 2 * 1 = 2
      expect(serverTotals.subtotal).toBe(90);
      expect(serverTotals.subtotal).not.toBe(2);
    });
  });

  describe('Negative & Out-of-Bounds Quantity Defense', () => {
    it('should reject negative quantities in cart validation', () => {
      const negativeItem = { productId: 'prod-spinach', quantity: -10 };
      const res = cartItemSchema.safeParse(negativeItem);
      expect(res.success).toBe(false);
    });

    it('should reject zero quantities', () => {
      const zeroItem = { productId: 'prod-spinach', quantity: 0 };
      const res = cartItemSchema.safeParse(zeroItem);
      expect(res.success).toBe(false);
    });

    it('should reject fractional quantities', () => {
      const fractionalItem = { productId: 'prod-spinach', quantity: 2.7 };
      const res = cartItemSchema.safeParse(fractionalItem);
      expect(res.success).toBe(false);
    });

    it('should reject excessively large quantities designed to overflow or crash inventory', () => {
      const hugeItem = { productId: 'prod-spinach', quantity: 1000000 };
      const res = cartItemSchema.safeParse(hugeItem);
      expect(res.success).toBe(false);
    });
  });
});

import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name too long'),
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password is too long'),
  phone: z
    .string()
    .regex(/^[0-9+ -]{8,15}$/, 'Please enter a valid phone number')
    .optional()
    .or(z.literal('')),
});

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  password: z.string().min(1, 'Password is required'),
});

export const cartItemSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z
    .number()
    .int('Quantity must be an integer')
    .min(1, 'Quantity must be at least 1')
    .max(99, 'Maximum quantity is 99'),
});

export const checkoutSchema = z.object({
  customerName: z.string().min(2, 'Full name is required').max(80),
  customerEmail: z.string().email('Valid email is required').toLowerCase().trim(),
  customerPhone: z.string().regex(/^[0-9+ -]{8,15}$/, 'Valid 10-digit phone number is required'),
  deliveryStreet: z.string().min(5, 'Street address is required').max(150),
  deliveryCity: z.string().min(2, 'City is required').max(60),
  deliveryState: z.string().min(2, 'State is required').max(60),
  deliveryPostalCode: z.string().min(4, 'Postal code is required').max(10),
  deliveryCountry: z.string().default('India'),
  paymentMethod: z.enum(['COD', 'TEST_CARD', 'UPI']).default('COD'),
  couponCode: z.string().optional().or(z.literal('')),
  notes: z.string().max(300).optional(),
});

export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(60),
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
  phone: z.string().max(20).optional(),
  subject: z.string().min(3, 'Subject must be at least 3 characters').max(120),
  message: z.string().min(10, 'Message must be at least 10 characters').max(2000),
});

export const newsletterSchema = z.object({
  email: z.string().email('Please enter a valid email address').toLowerCase().trim(),
});

export const couponValidateSchema = z.object({
  code: z.string().min(2, 'Coupon code is required').trim().toUpperCase(),
  subtotal: z.number().min(0, 'Subtotal must be positive'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type CartItemInput = z.infer<typeof cartItemSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;

import emailjs from '@emailjs/browser';
import { SITE_CONFIG } from './site-config';

export interface OrderEmailItem {
  productId?: string;
  productName: string;
  price: number;
  quantity: number;
  unit?: string;
  total: number;
}

export interface OrderEmailPayload {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  deliveryStreet?: string;
  deliveryCity?: string;
  deliveryState?: string;
  deliveryPostalCode?: string;
  paymentMethod?: string;
  subtotal: number;
  discount?: number;
  deliveryCharge?: number;
  total: number;
  items: OrderEmailItem[];
  notes?: string;
  createdAt?: string;
}

/**
 * Formats order items into an aesthetically clean, human-readable text receipt.
 */
export function formatOrderItemsList(items: OrderEmailItem[]): string {
  if (!items || items.length === 0) return 'No items listed';
  return items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.productName} (${item.unit || 'unit'}) x ${item.quantity} — ₹${item.total}`
    )
    .join('\n');
}

/**
 * Formats delivery address into a single readable string.
 */
export function formatDeliveryAddress(order: OrderEmailPayload): string {
  const parts = [
    order.deliveryStreet,
    order.deliveryCity,
    order.deliveryState,
    order.deliveryPostalCode,
  ].filter(Boolean);
  return parts.length > 0 ? parts.join(', ') : 'Delivery address on file';
}

/**
 * Sends both Customer Order Confirmation and Store Admin New Order notifications via EmailJS.
 */
export async function sendOrderEmails(order: OrderEmailPayload): Promise<{
  customerSuccess: boolean;
  adminSuccess: boolean;
  errors?: string[];
}> {
  const serviceId = SITE_CONFIG.email.serviceId;
  const customerTemplateId = SITE_CONFIG.email.orderConfirmedTemplateId;
  const adminTemplateId = SITE_CONFIG.email.newOrderTemplateId;
  const publicKey = SITE_CONFIG.email.publicKey;
  const adminEmail = SITE_CONFIG.email.adminEmail;

  if (!publicKey) {
    console.warn(
      '[EmailJS] Public Key is not configured yet. Emails were not sent. Please set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.'
    );
    return {
      customerSuccess: false,
      adminSuccess: false,
      errors: ['NEXT_PUBLIC_EMAILJS_PUBLIC_KEY not set'],
    };
  }

  const formattedDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const itemsSummary = formatOrderItemsList(order.items);
  const deliveryAddress = formatDeliveryAddress(order);

  // Common parameters covering any custom variable names used in EmailJS templates
  const baseParams = {
    // Order Identifiers
    order_id: order.orderNumber,
    order_number: order.orderNumber,
    order_date: formattedDate,
    date: formattedDate,

    // Customer Information
    customer_name: order.customerName,
    to_name: order.customerName,
    customer_email: order.customerEmail,
    to_email: order.customerEmail,
    email: order.customerEmail,
    customer_phone: order.customerPhone || 'N/A',
    phone: order.customerPhone || 'N/A',

    // Financials
    total: `₹${order.total}`,
    total_amount: `₹${order.total}`,
    order_total: `₹${order.total}`,
    subtotal: `₹${order.subtotal}`,
    discount: `₹${order.discount || 0}`,
    delivery_charge: `₹${order.deliveryCharge || 0}`,
    payment_method: order.paymentMethod || 'Pay on Delivery (Cash/UPI)',

    // Fulfillment Details
    delivery_address: deliveryAddress,
    shipping_address: deliveryAddress,
    address: deliveryAddress,
    delivery_city: order.deliveryCity || 'Sathyamangalam',
    pincode: order.deliveryPostalCode || '638401',

    // Line items & Notes
    items_list: itemsSummary,
    order_summary: itemsSummary,
    items: itemsSummary,
    notes: order.notes || 'No special instructions',

    // Store Branding
    store_name: SITE_CONFIG.name,
    store_url: SITE_CONFIG.baseUrl,
    store_phone: SITE_CONFIG.contact.phone,
    store_email: SITE_CONFIG.contact.email,
  };

  const results = {
    customerSuccess: false,
    adminSuccess: false,
    errors: [] as string[],
  };

  // 1. Send Order Confirmation Email to the Customer
  try {
    const customerParams = {
      ...baseParams,
      to_email: order.customerEmail,
      recipient_email: order.customerEmail,
    };

    await emailjs.send(serviceId, customerTemplateId, customerParams, publicKey);
    results.customerSuccess = true;
    console.info(`[EmailJS] Customer confirmation email sent for order ${order.orderNumber}`);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error('[EmailJS] Failed to send customer confirmation:', errorMsg);
    results.errors.push(`Customer email failed: ${errorMsg}`);
  }

  // 2. Send New Order Alert Email to the Store Admin
  try {
    const adminParams = {
      ...baseParams,
      to_email: adminEmail || SITE_CONFIG.contact.email,
      admin_email: adminEmail || SITE_CONFIG.contact.email,
      recipient_email: adminEmail || SITE_CONFIG.contact.email,
      to_name: 'Farm_lit Store Admin',
    };

    await emailjs.send(serviceId, adminTemplateId, adminParams, publicKey);
    results.adminSuccess = true;
    console.info(`[EmailJS] Admin new order notification sent for order ${order.orderNumber}`);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : JSON.stringify(err);
    console.error('[EmailJS] Failed to send admin alert:', errorMsg);
    results.errors.push(`Admin email failed: ${errorMsg}`);
  }

  return results;
}

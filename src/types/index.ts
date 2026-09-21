export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  order: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string | null;
  categoryId: string;
  category?: Category;
  price: number;
  compareAtPrice?: number | null;
  discountPercentage: number;
  SKU: string;
  stockQuantity: number;
  unit: string; // kg, 500g, litre, pack, piece
  images: string[]; // parsed from JSON string or array
  altText?: string | null;
  rating: number;
  reviewCount: number;
  isFeatured: boolean;
  isActive: boolean;
  origin?: string | null;
  shelfLife?: string | null;
  storageNotes?: string | null;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CartItem {
  id?: string;
  productId: string;
  product: Product;
  quantity: number;
}

export interface CartTotals {
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  finalTotal: number;
  itemCount: number;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
  phone?: string | null;
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'PERCENTAGE' | 'FIXED';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number | null;
  expiresAt?: string | Date | null;
  isActive: boolean;
}

export interface Address {
  id?: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string | null;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryPostalCode: string;
  deliveryCountry: string;
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: string;
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED';
  notes?: string | null;
  createdAt: string | Date;
  items: OrderItem[];
  attributions?: CampaignAttribution[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productPrice: number;
  unit: string;
  quantity: number;
  total: number;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  isDemo: boolean;
  createdAt: string | Date;
}

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

export interface CampaignAttribution {
  id?: string;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmCampaign?: string | null;
  utmTerm?: string | null;
  utmContent?: string | null;
  touchType: 'FIRST_TOUCH' | 'LAST_TOUCH';
  createdAt?: string | Date;
}

export type AnalyticsEventType =
  | 'page_view'
  | 'product_view'
  | 'search'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'signup'
  | 'login'
  | 'newsletter_signup'
  | 'whatsapp_click'
  | 'campaign_click';

export interface AnalyticsEvent {
  event: AnalyticsEventType;
  properties?: Record<string, unknown>;
  timestamp: number;
}

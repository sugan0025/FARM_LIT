import { PrismaClient } from '@prisma/client';
import { INITIAL_CATEGORIES, INITIAL_PRODUCTS, INITIAL_COUPONS } from './products-data';
import { Product, Category, Coupon } from '@/types';

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

/**
 * Safe repository for Products with Supabase DB + In-Memory resilience
 */
export async function getProducts(options?: {
  categorySlug?: string;
  isFeatured?: boolean;
  search?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
}): Promise<Product[]> {
  try {
    // Attempt query from Prisma / Supabase
    const where: Record<string, unknown> = { isActive: true };
    if (options?.isFeatured !== undefined) where.isFeatured = options.isFeatured;
    if (options?.categorySlug) {
      where.category = { slug: options.categorySlug };
    }
    if (options?.search) {
      where.OR = [
        { name: { contains: options.search, mode: 'insensitive' } },
        { description: { contains: options.search, mode: 'insensitive' } },
      ];
    }
    if (options?.minPrice !== undefined || options?.maxPrice !== undefined) {
      const priceFilter: Record<string, number> = {};
      if (options.minPrice !== undefined) priceFilter.gte = options.minPrice;
      if (options.maxPrice !== undefined) priceFilter.lte = options.maxPrice;
      where.price = priceFilter;
    }
    if (options?.inStockOnly) {
      where.stockQuantity = { gt: 0 };
    }

    const dbProducts = await prisma.product.findMany({
      where,
      include: { category: true },
      orderBy:
        options?.sortBy === 'price-low'
          ? { price: 'asc' }
          : options?.sortBy === 'price-high'
          ? { price: 'desc' }
          : options?.sortBy === 'newest'
          ? { createdAt: 'desc' }
          : { id: 'asc' },
    });

    if (dbProducts && dbProducts.length > 0) {
      return dbProducts.map((p) => ({
        ...p,
        images: (() => {
          try {
            return JSON.parse(p.images);
          } catch {
            return [p.images];
          }
        })(),
      }));
    }
  } catch (err) {
    // If DB is offline or not yet migrated, fall back gracefully to verified catalog
    // eslint-disable-next-line no-console
    console.warn('Prisma DB query fallback to catalog:', (err as Error)?.message);
  }

  // Fallback to in-memory rich catalog
  let list = [...INITIAL_PRODUCTS];

  if (options?.categorySlug) {
    const cat = INITIAL_CATEGORIES.find((c) => c.slug === options.categorySlug);
    if (cat) {
      list = list.filter((p) => p.categoryId === cat.id);
    }
  }

  if (options?.isFeatured !== undefined) {
    list = list.filter((p) => p.isFeatured === options.isFeatured);
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q)
    );
  }

  if (options?.minPrice !== undefined) {
    list = list.filter((p) => p.price >= options.minPrice!);
  }
  if (options?.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }
  if (options?.inStockOnly) {
    list = list.filter((p) => p.stockQuantity > 0);
  }

  if (options?.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (options?.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (options?.sortBy === 'popular') {
    list.sort((a, b) => b.reviewCount - a.reviewCount);
  }

  // Populate category info
  return list.map((p) => ({
    ...p,
    category: INITIAL_CATEGORIES.find((c) => c.id === p.categoryId),
  }));
}

/**
 * Retrieve a single product by slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const p = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });
    if (p) {
      return {
        ...p,
        images: (() => {
          try {
            return JSON.parse(p.images);
          } catch {
            return [p.images];
          }
        })(),
      };
    }
  } catch {
    // Fallback to static data
  }

  const found = INITIAL_PRODUCTS.find((p) => p.slug === slug);
  if (!found) return null;
  return {
    ...found,
    category: INITIAL_CATEGORIES.find((c) => c.id === found.categoryId),
  };
}

/**
 * Retrieve product categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const dbCategories = await prisma.category.findMany({
      orderBy: { order: 'asc' },
    });
    if (dbCategories && dbCategories.length > 0) return dbCategories;
  } catch {
    // Fallback
  }
  return INITIAL_CATEGORIES;
}

/**
 * Retrieve active coupon by code
 */
export async function getCouponByCode(code: string): Promise<Coupon | null> {
  const normalized = code.trim().toUpperCase();
  try {
    const dbCoupon = await prisma.coupon.findUnique({
      where: { code: normalized },
    });
    if (dbCoupon && dbCoupon.isActive) return dbCoupon;
  } catch {
    // Fallback
  }
  return INITIAL_COUPONS.find((c) => c.code === normalized && c.isActive) || null;
}

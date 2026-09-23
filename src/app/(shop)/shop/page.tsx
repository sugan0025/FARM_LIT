import React from 'react';
import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/db';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductFilter } from '@/components/shop/ProductFilter';
import { Sprout } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Shop Farm Fresh Produce | Vegetables, Fruits & Grocery',
  description:
    'Browse our complete catalog of farm-harvested vegetables, seasonal fruits, organic unpolished pulses, stone-ground flours, and pure grocery essentials.',
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/shop`,
  },
};

interface ShopPageProps {
  searchParams: {
    category?: string;
    sort?: string;
    stock?: string;
    q?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { category, sort, stock, q } = searchParams;

  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({
      categorySlug: category,
      sortBy: sort,
      inStockOnly: stock === 'in-stock',
      search: q,
    }),
  ]);

  const activeCategory = categories.find((c) => c.slug === category);

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-100 px-3 py-1 rounded-full">
            Farm Catalog
          </span>
          <h1 className="text-3xl font-black text-farm-950 mt-2">
            {activeCategory ? activeCategory.name : q ? `Search results for "${q}"` : 'All Fresh Produce'}
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 mt-1">
            {activeCategory?.description ||
              'Ethically harvested produce delivered fresh to your kitchen within 24 hours.'}
          </p>
        </div>

        {/* 2-Column Grid: Sidebar Filter + Product Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Sidebar */}
          <div className="bg-white p-5 rounded-2xl border border-earth-200 shadow-sm sticky top-24">
            <ProductFilter
              categories={categories}
              currentCategory={category}
              currentSort={sort}
              currentInStock={stock === 'in-stock'}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-4 text-xs font-semibold text-earth-500">
              <span>Showing {products.length} fresh products</span>
              {category && (
                <span className="bg-farm-50 text-farm-800 px-2.5 py-1 rounded-lg">
                  Filtered by {activeCategory?.name || category}
                </span>
              )}
            </div>

            {products.length === 0 ? (
              <div className="bg-white rounded-2xl border border-earth-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-earth-100 text-earth-400 flex items-center justify-center mx-auto">
                  <Sprout className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-earth-900">No produce found</h3>
                <p className="text-xs text-earth-500 max-w-sm mx-auto">
                  We couldn’t find any items matching your selected criteria. Try adjusting your filters or search keywords.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { getProducts, getCategories } from '@/lib/db';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { ValueProps } from '@/components/home/ValueProps';
import { OffersBanner } from '@/components/home/OffersBanner';
import { CommunityPreview } from '@/components/home/CommunityPreview';
import { DemoReviews } from '@/components/home/DemoReviews';
import { ProductCard } from '@/components/shop/ProductCard';

export const revalidate = 60; // ISR revalidate every 60s

export default async function HomePage() {
  const [categories, featuredProducts] = await Promise.all([
    getCategories(),
    getProducts({ isFeatured: true }),
  ]);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Shop by Category */}
      <CategorySection categories={categories} />

      {/* 3. Featured Products Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-100/80 px-3 py-1 rounded-full">
                Hand-Picked Daily
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-farm-950 mt-2">
                Featured Farm Favorites
              </h2>
              <p className="text-xs sm:text-sm text-earth-600 mt-1">
                Highest-rated crisp vegetables, sweet seasonal fruits, and staple kitchen flours.
              </p>
            </div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-farm-800 hover:text-farm-600 transition-colors mt-3 sm:mt-0"
            >
              View Full Catalog <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 8).map((product, idx) => (
              <ProductCard key={product.id} product={product} priority={idx < 4} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Why Farm_lit? */}
      <ValueProps />

      {/* 5. Special Harvest Offers */}
      <OffersBanner />

      {/* 6. Farm_lit Community */}
      <CommunityPreview />

      {/* 7. Customer Reviews (Transparently Marked Demo Content) */}
      <DemoReviews />
    </div>
  );
}

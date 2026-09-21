import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Tag, Sparkles, Percent, Truck, Check, ArrowRight } from 'lucide-react';
import { INITIAL_COUPONS } from '@/lib/products-data';
import { getProducts } from '@/lib/db';
import { ProductCard } from '@/components/shop/ProductCard';

export const metadata: Metadata = {
  title: 'Special Deals & Promo Coupons | Farm_lit',
  description:
    'Exclusive harvest discounts, promo coupons, and bundle savings on farm-fresh vegetables, organic fruits, and kitchen essentials.',
};

export default async function OffersPage() {
  const discountedProducts = (await getProducts()).filter((p) => p.discountPercentage > 0);

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-harvest-500 via-amber-600 to-farm-800 text-white p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="relative z-10 max-w-xl space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-slate-950 text-harvest-300 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Direct Farmer Savings
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight">
              Farm_lit Harvest Offers & Codes
            </h1>
            <p className="text-sm sm:text-base text-harvest-50 leading-relaxed">
              We pass savings directly to consumers by working hand-in-hand with regional agricultural clusters. Use these coupons during checkout!
            </p>
          </div>
        </div>

        {/* Coupons List */}
        <div>
          <h2 className="text-2xl font-black text-farm-950 mb-6 flex items-center gap-2">
            <Tag className="w-6 h-6 text-harvest-600" /> Active Promo Codes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_COUPONS.map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-2xl border-2 border-dashed border-harvest-400 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="bg-harvest-100 text-harvest-800 font-extrabold text-xs px-2.5 py-0.5 rounded-full">
                      {coupon.discountType === 'PERCENTAGE'
                        ? `${coupon.discountValue}% OFF`
                        : `₹${coupon.discountValue} OFF`}
                    </span>
                    <span className="text-[11px] text-earth-500 font-semibold">
                      Min Order ₹{coupon.minOrderValue}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-farm-950 font-mono tracking-wider">
                    {coupon.code}
                  </h3>
                  <p className="text-xs text-earth-600 leading-relaxed">
                    {coupon.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-earth-100 flex items-center justify-between text-xs font-bold text-farm-800">
                  <span>Enter during checkout</span>
                  <Link href="/shop" className="hover:underline flex items-center gap-1">
                    Shop Produce &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Discounted Produce Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-farm-700">
                Reduced Farm Prices
              </span>
              <h2 className="text-2xl font-black text-farm-950 mt-1">
                Items On Sale Today ({discountedProducts.length})
              </h2>
            </div>
            <Link
              href="/shop"
              className="text-xs font-bold text-farm-800 hover:underline flex items-center gap-1"
            >
              Browse All Produce <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {discountedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

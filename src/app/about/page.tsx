import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Sprout, ShieldCheck, Heart, Award, Users, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Farm_lit | Fresh, Honest & Sustainable Grocery Produce',
  description:
    'Learn about Farm_lit’s mission: providing pure farm-fresh vegetables, seasonal fruits, and staple grains directly from regional growers without artificial preservation.',
};

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen py-12 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-50 px-3 py-1 rounded-full">
            Our Origin Story
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-farm-950">
            Reconnecting Your Table to Natural Farm Harvests
          </h1>
          <p className="text-sm sm:text-base text-earth-600 leading-relaxed">
            Farm_lit began with a straightforward observation: grocery store vegetables were spending days in artificial cold warehouses and losing essential vitality, while smallholder farmers were getting squeezed by middlemen.
          </p>
        </div>

        {/* Story visual */}
        <div className="relative h-72 sm:h-96 rounded-3xl overflow-hidden shadow-xl bg-earth-100 border border-earth-200">
          <Image
            src="/images/banners/farm-landscape.webp"
            alt="Lush green farmland in morning mist"
            fill
            className="object-cover"
          />
        </div>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="p-6 rounded-2xl bg-earth-50 border border-earth-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-farm-100 text-farm-800 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-farm-950">100% Honest Cultivation</h3>
            <p className="text-xs text-earth-600 leading-relaxed">
              We work directly with certified organic and residue-free growers who practice composting, companion cropping, and natural soil rejuvenation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-earth-50 border border-earth-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-farm-100 text-farm-800 flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-farm-950">No Deceptive Claims</h3>
            <p className="text-xs text-earth-600 leading-relaxed">
              We never claim &ldquo;certified organic&rdquo; unless the explicit farm certificate is registered and displayed. Real transparency, always.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-earth-50 border border-earth-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-farm-100 text-farm-800 flex items-center justify-center">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-farm-950">Fair Farmer Remuneration</h3>
            <p className="text-xs text-earth-600 leading-relaxed">
              By removing up to 4 layers of urban intermediaries, our growers earn 30-40% higher yields, allowing their families to invest in sustainable soil tech.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-farm-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-black">Experience the Farm_lit Difference Today</h2>
          <p className="text-xs sm:text-sm text-farm-200 max-w-md mx-auto">
            Order fresh produce harvested this very morning and delivered directly to your doorstep.
          </p>
          <div>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-harvest-500 hover:bg-harvest-600 text-slate-950 font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-colors"
            >
              Shop Morning Harvest <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

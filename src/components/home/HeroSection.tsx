import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Leaf } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-farm-50/70 via-white to-white py-12 md:py-20">
      {/* Decorative ambient background blur */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-farm-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-harvest-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-farm-100/80 border border-farm-200 px-3.5 py-1.5 rounded-full text-xs font-bold text-farm-900 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-farm-700" />
              <span>Direct Farm-to-Table Grocery Delivery • Sathyamangalam</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-farm-950 tracking-tight leading-[1.1]">
              Fresh. Natural. <br />
              <span className="text-farm-700 underline decoration-harvest-400 decoration-wavy decoration-2">
                Everyday.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-earth-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Fresh vegetables, fruits, grains and everyday grocery essentials for your home. Pure, honest produce sourced directly from dedicated organic regional growers.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                href="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-farm-800 hover:bg-farm-900 text-white text-base font-bold px-8 py-4 rounded-2xl shadow-lift hover:shadow-2xl transition-all duration-200"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/offers"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-harvest-50 hover:bg-harvest-100 border border-harvest-300 text-harvest-900 text-base font-bold px-7 py-4 rounded-2xl transition-all duration-200"
              >
                <span>Explore Offers</span>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-3 border-t border-earth-200 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-xs text-earth-700 font-semibold">
                <Leaf className="w-4 h-4 text-farm-600 shrink-0" />
                <span>Zero Wax & Chemical Preservatives</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-earth-700 font-semibold">
                <ShieldCheck className="w-4 h-4 text-farm-600 shrink-0" />
                <span>Rigorous Quality Checks</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-earth-700 font-semibold">
                <Truck className="w-4 h-4 text-farm-600 shrink-0" />
                <span>Harvested Same Morning</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual */}
              <div className="relative h-[380px] sm:h-[460px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-earth-100">
                <Image
                  src="/images/banners/hero-fresh.webp"
                  alt="Fresh farm harvest vegetables and fruits in rustic wooden crates"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 500px"
                />
              </div>

              {/* Floating Floating Stat Card */}
              <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-earth-100 flex items-center gap-3.5 max-w-[220px] hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default">
                <div className="w-11 h-11 rounded-xl bg-farm-100 text-farm-800 flex items-center justify-center font-black text-lg">
                  100%
                </div>
                <div>
                  <p className="text-xs font-bold text-farm-950">Natural & Fresh</p>
                  <p className="text-[11px] text-earth-500">Delivered within hours</p>
                </div>
              </div>

              {/* Floating Review Card */}
              <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-earth-100 flex items-center gap-2.5 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-default">
                <div className="text-amber-500 font-bold text-sm flex items-center gap-1">
                  ★ 4.9
                </div>
                <div className="text-[11px] text-earth-700 font-medium">
                  Loved by <strong>15,000+</strong> homes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

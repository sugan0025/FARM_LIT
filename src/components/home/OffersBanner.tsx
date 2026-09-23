'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Tag, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';

export function OffersBanner() {
  const [copied, setCopied] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-farm-900 via-farm-800 to-farm-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 space-y-3">
            <div className="inline-flex items-center gap-1.5 bg-harvest-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Weekend Harvest Special
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Stock Up on Nature’s Best at Special Farm Prices
            </h2>
            <p className="text-sm text-farm-100/90 leading-relaxed">
              Use verified promo codes at checkout to unlock instant discounts and free express delivery across all vegetables, fruits, and cold-pressed staples.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Promo Card 1 */}
            <div className="bg-white/10 hover:bg-white/15 hover:border-white/30 hover:-translate-y-1.5 hover:shadow-2xl backdrop-blur-md border border-white/15 p-4 rounded-2xl flex flex-col justify-between space-y-3 transition-all duration-300 ease-out">
              <div>
                <span className="text-xs font-bold text-harvest-400">First Order Bonus</span>
                <h4 className="text-lg font-black text-white mt-0.5">10% OFF Storewide</h4>
                <p className="text-xs text-farm-200 mt-1">Min. order ₹399. Capped at ₹100 discount.</p>
              </div>
              <div className="flex items-center justify-between bg-black/30 p-2 rounded-xl border border-white/10">
                <code className="text-sm font-black text-harvest-300">FARMFRESH10</code>
                <button
                  onClick={() => copyCode('FARMFRESH10')}
                  className="p-1.5 hover:bg-white/20 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                  aria-label="Copy FARMFRESH10"
                >
                  {copied === 'FARMFRESH10' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-farm-400" />
                      <span className="text-[11px] text-farm-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Promo Card 2 */}
            <div className="bg-white/10 hover:bg-white/15 hover:border-white/30 hover:-translate-y-1.5 hover:shadow-2xl backdrop-blur-md border border-white/15 p-4 rounded-2xl flex flex-col justify-between space-y-3 transition-all duration-300 ease-out">
              <div>
                <span className="text-xs font-bold text-harvest-400">Zero Shipping</span>
                <h4 className="text-lg font-black text-white mt-0.5">FREE Delivery</h4>
                <p className="text-xs text-farm-200 mt-1">Flat ₹40 delivery fee waived on orders above ₹299.</p>
              </div>
              <div className="flex items-center justify-between bg-black/30 p-2 rounded-xl border border-white/10">
                <code className="text-sm font-black text-harvest-300">FREESHIP</code>
                <button
                  onClick={() => copyCode('FREESHIP')}
                  className="p-1.5 hover:bg-white/20 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                  aria-label="Copy FREESHIP"
                >
                  {copied === 'FREESHIP' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-farm-400" />
                      <span className="text-[11px] text-farm-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Farm_lit',
  description: 'Farm_lit terms and conditions governing the purchase of fresh groceries and consumer rights.',
};

export default function TermsPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-earth-800">
        <div className="border-b border-earth-200 pb-6">
          <span className="text-xs font-bold text-farm-700 uppercase tracking-wider">Legal Document</span>
          <h1 className="text-3xl font-black text-farm-950 mt-1">Terms of Service</h1>
          <p className="text-xs text-earth-500 mt-1">Last Updated: September 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">1. Acceptance of Terms</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            By browsing our website, creating an account, or placing an order on Farm_lit, you agree to comply with these terms, our delivery policies, and applicable agricultural commerce regulations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">2. Produce Pricing & Inventory Truth</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            Due to agricultural harvests, weights of items sold per piece or bunch may naturally fluctuate by up to ±5%. All prices displayed at checkout are finalized on the server at the exact time of order placement.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">3. User Conduct</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            Users must not attempt to manipulate cart prices, send unauthorized payload injections, or perform automated scraping that degrades the platform. Accounts found abusing coupon logic or rate limits will be terminated.
          </p>
        </section>
      </div>
    </div>
  );
}

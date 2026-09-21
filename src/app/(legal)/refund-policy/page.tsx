import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Refund & Return Policy | Farm_lit',
  description: 'Farm_lit freshness guarantee and return/refund guidelines for perishable grocery items.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-earth-800">
        <div className="border-b border-earth-200 pb-6">
          <span className="text-xs font-bold text-farm-700 uppercase tracking-wider">Customer Assurance</span>
          <h1 className="text-3xl font-black text-farm-950 mt-1">Refund & Return Policy</h1>
          <p className="text-xs text-earth-500 mt-1">Last Updated: September 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">1. Freshness Guarantee</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            If any perishable fruit, vegetable, or dairy item arrives damaged, wilted, or does not meet your expectations for crispness, simply let us know within 24 hours of delivery. We offer an immediate no-questions-asked replacement or 100% refund credit to your original payment method.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">2. Dry Staples & Essentials</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            For sealed pulses, stone-ground flours, edible oils, and wildflower honey, returns are accepted within 7 days of delivery provided the protective factory packaging remains intact.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">3. Processing Time</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            Approved refunds are initiated immediately and reflect in your bank account or payment card within 2 to 4 business days.
          </p>
        </section>
      </div>
    </div>
  );
}

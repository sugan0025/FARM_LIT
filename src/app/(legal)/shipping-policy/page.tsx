import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Farm_lit',
  description: 'Farm_lit morning delivery schedules, delivery charge thresholds, and service coverage.',
};

export default function ShippingPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-earth-800">
        <div className="border-b border-earth-200 pb-6">
          <span className="text-xs font-bold text-farm-700 uppercase tracking-wider">Logistics & Delivery</span>
          <h1 className="text-3xl font-black text-farm-950 mt-1">Shipping & Delivery Policy</h1>
          <p className="text-xs text-earth-500 mt-1">Last Updated: September 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">1. Early Morning Delivery Window</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            All orders confirmed before 10:00 PM are harvested that evening, chilled overnight, and delivered between 6:00 AM and 9:00 AM the following morning to ensure vegetables arrive before breakfast preparation.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">2. Free Delivery Threshold</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            All grocery orders with a subtotal of ₹499 or higher automatically receive 100% FREE Delivery. For orders below ₹499, a nominal standard fulfillment fee of ₹40 is applied.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">3. Eco-Friendly Packaging</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            Farm_lit operates on a zero-plastic pledge. All leafy greens and produce are delivered in breathable compostable bags and reusable insulated totes.
          </p>
        </section>
      </div>
    </div>
  );
}

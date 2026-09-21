'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Truck, Home } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || 'FL-2026-CONFIRMED';
  const customerName = searchParams.get('name') || 'Valued Customer';
  const total = searchParams.get('total') || '0';

  return (
    <div className="bg-earth-50/50 min-h-[75vh] flex items-center justify-center py-16 px-4">
      <div className="bg-white rounded-3xl border border-earth-200 p-8 sm:p-12 max-w-lg w-full text-center shadow-lg space-y-6">
        <div className="w-20 h-20 rounded-full bg-farm-100 text-farm-700 flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-100 px-3 py-1 rounded-full">
            Order Confirmed
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-farm-950">
            Thank You, {customerName}!
          </h1>
          <p className="text-xs sm:text-sm text-earth-600">
            Your farm-fresh order has been recorded and scheduled for early morning doorstep delivery.
          </p>
        </div>

        {/* Order Details Receipt Box */}
        <div className="bg-earth-50 rounded-2xl p-5 border border-earth-200 text-left text-xs space-y-3">
          <div className="flex justify-between">
            <span className="text-earth-500">Order Reference</span>
            <strong className="font-mono font-bold text-farm-950">{orderNumber}</strong>
          </div>
          <div className="flex justify-between">
            <span className="text-earth-500">Payment Status</span>
            <span className="font-bold text-farm-700">Scheduled / Test Mode Verified</span>
          </div>
          <div className="flex justify-between">
            <span className="text-earth-500">Total Amount</span>
            <strong className="text-sm font-black text-farm-950">₹{total}</strong>
          </div>
          <div className="flex justify-between border-t border-earth-200 pt-2 text-earth-700">
            <span className="flex items-center gap-1.5 font-medium">
              <Truck className="w-4 h-4 text-farm-600" /> Estimated Delivery
            </span>
            <strong>Tomorrow, 6:00 AM - 9:00 AM</strong>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-900 text-white text-xs font-bold py-3.5 px-5 rounded-xl shadow-sm transition-colors"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-earth-100 hover:bg-earth-200 text-earth-800 text-xs font-bold py-3.5 px-5 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Return to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

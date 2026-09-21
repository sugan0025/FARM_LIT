'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { getStoredAttribution } from '@/lib/utm';
import { trackEvent } from '@/lib/analytics';
import { ShieldCheck, Lock, CreditCard, Banknote, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { items, totals, appliedCoupon, clearCart } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerEmail: user?.email || '',
    customerPhone: user?.phone || '',
    deliveryStreet: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryPostalCode: '',
    deliveryCountry: 'India',
    paymentMethod: 'COD',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (items.length === 0) {
      setErrorMsg('Your basket is empty. Please add items before checking out.');
      return;
    }

    setLoading(true);

    try {
      const attribution = getStoredAttribution();

      const payload = {
        customerName: formData.customerName,
        customerEmail: formData.customerEmail,
        customerPhone: formData.customerPhone,
        deliveryStreet: formData.deliveryStreet,
        deliveryCity: formData.deliveryCity,
        deliveryState: formData.deliveryState,
        deliveryPostalCode: formData.deliveryPostalCode,
        deliveryCountry: formData.deliveryCountry,
        paymentMethod: formData.paymentMethod,
        couponCode: appliedCoupon?.code || '',
        notes: formData.notes,
        items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        attribution,
      };

      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to place order. Please check your information.');
        setLoading(false);
        return;
      }

      // Track purchase event
      trackEvent('purchase', {
        order_id: data.order.orderNumber,
        value: data.order.total,
        currency: 'INR',
        item_count: data.order.items.length,
      });

      // Clear local cart
      clearCart();

      // Navigate to confirmation receipt
      router.push(
        `/checkout/success?orderNumber=${encodeURIComponent(data.order.orderNumber)}&name=${encodeURIComponent(
          data.order.customerName
        )}&total=${data.order.total}`
      );
    } catch {
      setErrorMsg('A network error occurred while submitting your order. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold text-farm-950">Your basket is empty</h1>
        <p className="text-xs text-earth-500">Please add items to your cart before proceeding to checkout.</p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 bg-farm-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-farm-950">Checkout</h1>
          <p className="text-xs sm:text-sm text-earth-600 mt-1">
            Fill in your delivery address to receive your fresh harvest order.
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Customer & Address Information */}
          <div className="lg:col-span-7 space-y-6">
            {/* Customer Details */}
            <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-farm-950 pb-2 border-b border-earth-100">
                1. Customer Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-earth-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    name="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-sm space-y-4">
              <h2 className="text-base font-bold text-farm-950 pb-2 border-b border-earth-100">
                2. Delivery Address
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-earth-700 mb-1">Flat / House / Street Address *</label>
                  <input
                    type="text"
                    required
                    name="deliveryStreet"
                    value={formData.deliveryStreet}
                    onChange={handleChange}
                    placeholder="Flat 402, Green Orchid Apartments, Bannerghatta Rd"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">City *</label>
                  <input
                    type="text"
                    required
                    name="deliveryCity"
                    value={formData.deliveryCity}
                    onChange={handleChange}
                    placeholder="Pune"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">State *</label>
                  <input
                    type="text"
                    required
                    name="deliveryState"
                    value={formData.deliveryState}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">Postal Code *</label>
                  <input
                    type="text"
                    required
                    name="deliveryPostalCode"
                    value={formData.deliveryPostalCode}
                    onChange={handleChange}
                    placeholder="411001"
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">Country</label>
                  <input
                    type="text"
                    disabled
                    value="India"
                    className="w-full bg-earth-100 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-600"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-2xl border border-earth-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-earth-100">
                <h2 className="text-base font-bold text-farm-950">
                  3. Payment Method
                </h2>
                <span className="bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded">
                  Test Mode Safe Simulation
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'COD'
                      ? 'border-farm-600 bg-farm-50/50'
                      : 'border-earth-200 hover:border-earth-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleChange}
                    className="mt-1 text-farm-600 focus:ring-farm-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-earth-900 flex items-center gap-1.5">
                      <Banknote className="w-4 h-4 text-farm-700" /> Cash on Delivery (COD)
                    </span>
                    <p className="text-[11px] text-earth-500 mt-0.5">Pay in cash or UPI upon morning delivery.</p>
                  </div>
                </label>

                {/* Simulated Card Test Mode */}
                <label
                  className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    formData.paymentMethod === 'TEST_CARD'
                      ? 'border-farm-600 bg-farm-50/50'
                      : 'border-earth-200 hover:border-earth-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="TEST_CARD"
                    checked={formData.paymentMethod === 'TEST_CARD'}
                    onChange={handleChange}
                    className="mt-1 text-farm-600 focus:ring-farm-500"
                  />
                  <div>
                    <span className="text-xs font-bold text-earth-900 flex items-center gap-1.5">
                      <CreditCard className="w-4 h-4 text-farm-700" /> Card Simulation (Test Mode)
                    </span>
                    <p className="text-[11px] text-earth-500 mt-0.5">No actual card charges. Safe sandbox checkout.</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right: Order Review & Placement */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-earth-200 shadow-sm space-y-6 sticky top-24">
            <h3 className="text-base font-bold text-farm-950 pb-3 border-b border-earth-100">
              Basket Summary ({items.length} items)
            </h3>

            {/* List of items */}
            <div className="max-h-64 overflow-y-auto divide-y divide-earth-100 space-y-3 pr-1">
              {items.map((item) => (
                <div key={item.productId} className="pt-3 first:pt-0 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-earth-100 shrink-0 border border-earth-200">
                      <Image
                        src={item.product.images[0] || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=200'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    </div>
                    <div>
                      <strong className="text-earth-900 block truncate max-w-[170px]">
                        {item.product.name}
                      </strong>
                      <span className="text-earth-500">
                        {item.quantity} × ₹{item.product.price}
                      </span>
                    </div>
                  </div>
                  <span className="font-bold text-farm-950">
                    ₹{Math.round(item.product.price * item.quantity * 100) / 100}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 text-xs text-earth-600 border-t border-earth-100 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-bold text-earth-900">₹{totals.subtotal}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-farm-700 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{totals.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Delivery Charge</span>
                <span>
                  {totals.deliveryCharge === 0 ? (
                    <strong className="text-farm-700 font-bold">FREE</strong>
                  ) : (
                    `₹${totals.deliveryCharge}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-farm-950 border-t border-earth-200 pt-3">
                <span>Total Amount Payable</span>
                <span className="text-xl font-black text-farm-900">₹{totals.finalTotal}</span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-lift transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Placing your order securely...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Place Order • ₹{totals.finalTotal}</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-earth-400 space-y-1">
              <p>By placing this order, you agree to Farm_lit terms & delivery policies.</p>
              <p className="flex items-center justify-center gap-1 text-farm-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Direct farm fulfillment guaranteed
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

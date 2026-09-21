'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Check, Truck, ShieldCheck } from 'lucide-react';
import { FREE_DELIVERY_THRESHOLD } from '@/lib/cart-calculations';

export default function CartPage() {
  const {
    items,
    totals,
    appliedCoupon,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ text: string; isError: boolean } | null>(null);

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = await applyCoupon(couponCode);
    setCouponMsg({ text: res.message, isError: !res.success });
    if (res.success) setCouponCode('');
  };

  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - totals.subtotal);

  if (items.length === 0) {
    return (
      <div className="bg-earth-50/40 min-h-[70vh] flex items-center justify-center py-16">
        <div className="bg-white rounded-3xl border border-earth-200 p-8 sm:p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-farm-50 text-farm-700 flex items-center justify-center mx-auto">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-black text-farm-950">Your Farm Basket is Empty</h1>
          <p className="text-xs text-earth-500 leading-relaxed">
            You haven’t added any farm-fresh produce yet. Discover crisp spinach, ripe bananas, unpolished lentils, and raw honey today!
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-farm-800 text-white font-bold text-sm px-6 py-3 rounded-xl hover:bg-farm-900 transition-colors shadow-md"
          >
            Browse Fresh Produce <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-black text-farm-950">Shopping Cart</h1>
          <p className="text-xs sm:text-sm text-earth-600 mt-1">
            Review your selected farm items before proceeding to checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items Table */}
          <div className="lg:col-span-8 bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm">
            {/* Free Shipping Notification */}
            <div className="bg-farm-50 px-6 py-3 border-b border-farm-100 flex items-center gap-2 text-xs text-farm-900">
              <Truck className="w-4 h-4 text-farm-700 shrink-0" />
              {amountToFreeDelivery > 0 ? (
                <span>
                  Add <strong className="font-bold">₹{amountToFreeDelivery}</strong> more of fresh groceries to unlock <strong>FREE Delivery</strong>!
                </span>
              ) : (
                <strong className="text-farm-800">🎉 Congratulations! You have unlocked FREE Delivery.</strong>
              )}
            </div>

            <div className="divide-y divide-earth-100 p-6 space-y-4">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="pt-4 first:pt-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-earth-100 shrink-0 border border-earth-100">
                      <Image
                        src={item.product.images[0] || '/images/categories/vegetables.webp'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div>
                      <Link
                        href={`/shop/${item.product.slug}`}
                        className="text-base font-bold text-farm-950 hover:text-farm-700 transition-colors"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-xs text-earth-500 font-medium mt-0.5">
                        Unit: {item.product.unit} • ₹{item.product.price}/{item.product.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full sm:w-auto sm:gap-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-earth-300 rounded-xl bg-earth-50 p-1">
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="p-1.5 text-earth-700 hover:bg-white rounded-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-3 text-xs font-black text-earth-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.product.stockQuantity}
                        className="p-1.5 text-earth-700 hover:bg-white rounded-lg transition-colors disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Total Price */}
                    <div className="text-right min-w-[70px]">
                      <span className="text-base font-black text-farm-950">
                        ₹{Math.round(item.product.price * item.quantity * 100) / 100}
                      </span>
                    </div>

                    {/* Delete */}
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="p-2 text-earth-400 hover:text-red-600 transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-earth-50/60 p-4 px-6 border-t border-earth-100 flex items-center justify-between text-xs">
              <Link href="/shop" className="font-bold text-farm-800 hover:underline">
                &larr; Continue Shopping
              </Link>
              <button onClick={clearCart} className="text-earth-400 hover:text-red-500">
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-earth-200 p-6 space-y-6 shadow-sm sticky top-24">
            <h3 className="text-lg font-bold text-farm-950 pb-3 border-b border-earth-100">
              Order Summary
            </h3>

            {/* Coupon Application */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-earth-700">Have a Promo Coupon?</label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-harvest-50 border border-harvest-200 p-2.5 rounded-xl text-xs font-bold text-harvest-900">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-harvest-600" /> {appliedCoupon.code} (-₹{totals.discount})
                  </span>
                  <button onClick={removeCoupon} className="text-xs text-red-600 hover:underline font-bold">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full text-xs uppercase bg-earth-50 border border-earth-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                  <button
                    type="submit"
                    className="bg-earth-800 hover:bg-earth-900 text-white font-bold text-xs px-4 py-2 rounded-xl transition-colors shrink-0"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponMsg && (
                <p className={`text-[11px] ${couponMsg.isError ? 'text-red-600' : 'text-farm-700'}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2.5 text-xs text-earth-600 border-t border-earth-100 pt-4">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-earth-900">₹{totals.subtotal}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-farm-700 font-semibold">
                  <span>Promo Discount</span>
                  <span>-₹{totals.discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery</span>
                <span>
                  {totals.deliveryCharge === 0 ? (
                    <strong className="text-farm-700 font-bold">FREE</strong>
                  ) : (
                    `₹${totals.deliveryCharge}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-farm-950 border-t border-earth-200 pt-3">
                <span>Grand Total</span>
                <span className="text-xl font-extrabold text-farm-900">₹{totals.finalTotal}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <Link
              href="/checkout"
              className="w-full flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold text-sm py-4 px-6 rounded-2xl shadow-lift transition-all"
            >
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="flex items-center justify-center gap-2 text-[11px] text-earth-400 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-farm-600" />
              <span>Safe & Encrypted 256-Bit SSL Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

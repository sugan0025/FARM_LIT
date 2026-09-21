'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { FREE_DELIVERY_THRESHOLD } from '@/lib/cart-calculations';

export function CartDrawer() {
  const {
    items,
    totals,
    appliedCoupon,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  if (!isCartOpen) return null;

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setIsApplying(true);
    const result = await applyCoupon(couponInput);
    setIsApplying(false);
    if (!result.success) {
      setCouponError(result.message);
    } else {
      setCouponInput('');
    }
  };

  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - totals.subtotal);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-earth-200 flex items-center justify-between bg-earth-50/50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-farm-700" />
              <h2 className="text-lg font-bold text-farm-950">Your Farm Basket</h2>
              <span className="bg-farm-100 text-farm-800 text-xs font-extrabold px-2 py-0.5 rounded-full">
                {totals.itemCount} items
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-earth-500 hover:text-earth-800 hover:bg-earth-100 rounded-full transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Alert */}
          {totals.subtotal > 0 && (
            <div className="bg-farm-50 px-4 py-2.5 border-b border-farm-100 text-xs text-farm-900 flex items-center gap-2">
              <Truck className="w-4 h-4 text-farm-700 shrink-0" />
              {amountToFreeDelivery > 0 ? (
                <span>
                  Add <strong className="font-bold text-farm-800">₹{amountToFreeDelivery}</strong> more of fresh produce for <strong>FREE Delivery</strong>!
                </span>
              ) : (
                <span className="font-bold text-farm-800 flex items-center gap-1">
                  🎉 You’ve unlocked FREE Delivery on this order!
                </span>
              )}
            </div>
          )}

          {/* Body: Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-farm-50 text-farm-700 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-earth-900">Your basket is empty</h3>
                  <p className="text-xs text-earth-500 max-w-xs mt-1">
                    Explore our pesticide-free vegetables, fresh seasonal fruits, and organic grocery essentials.
                  </p>
                </div>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 bg-farm-800 text-white font-bold text-sm px-5 py-2.5 rounded-xl hover:bg-farm-900 transition-colors shadow-sm"
                >
                  Start Shopping <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-3.5 p-3 rounded-xl border border-earth-100 bg-white hover:border-earth-200 transition-all shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="relative w-18 h-18 rounded-lg overflow-hidden bg-earth-100 shrink-0 border border-earth-100">
                      <Image
                        src={item.product.images[0] || 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400'}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between min-w-0">
                      <div className="flex justify-between items-start gap-1">
                        <div>
                          <Link
                            href={`/shop/${item.product.slug}`}
                            onClick={closeCart}
                            className="text-sm font-bold text-farm-950 hover:text-farm-700 transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <span className="text-[11px] text-earth-500 font-medium">
                            Unit: {item.product.unit}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.productId)}
                          className="text-earth-400 hover:text-red-600 p-1 transition-colors"
                          aria-label={`Remove ${item.product.name} from basket`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Pricing and Quantity Buttons */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-earth-200 rounded-lg bg-earth-50">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="p-1 text-earth-600 hover:text-farm-800 hover:bg-white rounded-l-md transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-2.5 text-xs font-bold text-earth-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stockQuantity}
                            className="p-1 text-earth-600 hover:text-farm-800 hover:bg-white rounded-r-md transition-colors disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-black text-farm-950">
                            ₹{Math.round(item.product.price * item.quantity * 100) / 100}
                          </span>
                          <p className="text-[10px] text-earth-400">₹{item.product.price}/{item.product.unit}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={clearCart}
                  className="text-xs text-earth-400 hover:text-red-500 underline transition-colors pt-2 block text-center w-full"
                >
                  Clear all items from basket
                </button>
              </div>
            )}
          </div>

          {/* Footer: Totals & Checkout button */}
          {items.length > 0 && (
            <div className="border-t border-earth-200 p-4 sm:p-6 bg-earth-50/70 space-y-4">
              {/* Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-harvest-50 border border-harvest-200 text-harvest-900 text-xs px-3 py-2 rounded-lg">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Tag className="w-3.5 h-3.5 text-harvest-600" /> {appliedCoupon.code} applied (-₹{totals.discount})
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-bold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon (e.g. FARMFRESH10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="text-xs uppercase bg-white border border-earth-300 rounded-lg px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-farm-600"
                    />
                    <button
                      type="submit"
                      disabled={isApplying || !couponInput.trim()}
                      className="bg-earth-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg hover:bg-earth-900 transition-colors disabled:opacity-50"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              </div>

              {/* Cost Summary Breakdown */}
              <div className="space-y-1.5 text-xs text-earth-600 border-t border-earth-200 pt-3">
                <div className="flex justify-between">
                  <span>Basket Subtotal</span>
                  <span className="font-semibold text-earth-900">₹{totals.subtotal}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-farm-700 font-semibold">
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
                <div className="flex justify-between text-sm font-black text-farm-950 border-t border-earth-200 pt-2">
                  <span>Estimated Total</span>
                  <span className="text-base font-extrabold text-farm-900">₹{totals.finalTotal}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full flex items-center justify-center gap-2 bg-farm-700 hover:bg-farm-800 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

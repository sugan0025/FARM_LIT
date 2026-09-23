'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Truck, ShieldCheck, Sparkles } from 'lucide-react';
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

  // Close on Escape key & lock body scroll
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

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
  const freeDeliveryPercent = Math.min(100, Math.round((totals.subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Centered Modal Container */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-modal-title"
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-earth-200 overflow-hidden flex flex-col max-h-[90vh] my-auto animate-in fade-in-0 zoom-in-95 duration-200 z-10"
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-earth-100 flex items-center justify-between bg-gradient-to-r from-farm-50/60 via-white to-earth-50/40">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-farm-100 text-farm-800 flex items-center justify-center shadow-sm">
              <ShoppingBag className="w-5 h-5 text-farm-700" />
            </div>
            <div>
              <h2 id="cart-modal-title" className="text-lg font-black text-farm-950">
                Your Farm Basket
              </h2>
              <p className="text-[11px] text-earth-500 font-medium">
                Fresh produce harvested for your home
              </p>
            </div>
            <span className="ml-2 bg-farm-100 text-farm-800 text-xs font-black px-2.5 py-0.5 rounded-full shadow-xs">
              {totals.itemCount} {totals.itemCount === 1 ? 'item' : 'items'}
            </span>
          </div>

          <button
            onClick={closeCart}
            className="p-2 text-earth-400 hover:text-earth-800 hover:bg-earth-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Milestone Progress Bar */}
        {totals.subtotal > 0 && (
          <div className="bg-farm-50/80 px-5 py-3 border-b border-farm-100 text-xs text-farm-950">
            <div className="flex items-center justify-between font-semibold mb-1.5">
              <span className="flex items-center gap-1.5 text-farm-900">
                <Truck className="w-4 h-4 text-farm-700 shrink-0" />
                {amountToFreeDelivery > 0 ? (
                  <span>
                    Add <strong className="font-extrabold text-farm-800">₹{amountToFreeDelivery}</strong> more for <strong className="text-farm-800">FREE Delivery</strong>
                  </span>
                ) : (
                  <span className="text-farm-800 font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-harvest-500" /> You’ve unlocked FREE Express Delivery!
                  </span>
                )}
              </span>
              <span className="text-[11px] font-bold text-farm-700">
                {freeDeliveryPercent}%
              </span>
            </div>
            {/* Progress track */}
            <div className="w-full h-1.5 bg-earth-200/70 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-farm-500 to-farm-600 transition-all duration-500 rounded-full"
                style={{ width: `${freeDeliveryPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Modal Body: Scrollable Produce Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 space-y-3.5">
          {items.length === 0 ? (
            <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center py-10 space-y-4">
              <div className="w-20 h-20 rounded-3xl bg-farm-50 text-farm-700 flex items-center justify-center shadow-inner">
                <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-earth-900">Your basket is empty</h3>
                <p className="text-xs text-earth-500 max-w-sm mt-1 leading-relaxed">
                  Fill your basket with crisp farm vegetables, seasonal fruits, cold-pressed oils, and grocery essentials from local growers.
                </p>
              </div>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-flex items-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-2xl shadow-sm transition-all"
              >
                <span>Browse Produce</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-3.5 p-3 rounded-2xl border border-earth-200/80 bg-white hover:border-farm-300 transition-all shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-earth-100 shrink-0 border border-earth-100">
                    <Image
                      src={item.product.images[0] || '/images/categories/vegetables.webp'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="72px"
                    />
                  </div>

                  {/* Title & Unit */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/shop/${item.product.slug}`}
                      onClick={closeCart}
                      className="text-xs sm:text-sm font-bold text-farm-950 hover:text-farm-700 transition-colors line-clamp-1"
                    >
                      {item.product.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5 text-[11px] text-earth-500 font-medium">
                      <span>{item.product.unit}</span>
                      <span>•</span>
                      <span>₹{item.product.price} / unit</span>
                    </div>

                    {/* Stepper on Mobile */}
                    <div className="flex sm:hidden items-center justify-between mt-2">
                      <div className="flex items-center border border-earth-200 rounded-lg bg-earth-50">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-1 text-earth-600 hover:text-farm-800 rounded-l-md"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-earth-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stockQuantity}
                          className="p-1 text-earth-600 hover:text-farm-800 rounded-r-md disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-xs font-black text-farm-950">
                        ₹{Math.round(item.product.price * item.quantity * 100) / 100}
                      </span>
                    </div>
                  </div>

                  {/* Quantity Stepper on Desktop */}
                  <div className="hidden sm:flex items-center border border-earth-200 rounded-xl bg-earth-50 p-0.5">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="p-1.5 text-earth-600 hover:text-farm-800 hover:bg-white rounded-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-earth-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      disabled={item.quantity >= item.product.stockQuantity}
                      className="p-1.5 text-earth-600 hover:text-farm-800 hover:bg-white rounded-lg transition-colors disabled:opacity-30"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total & Remove button */}
                  <div className="hidden sm:flex flex-col items-end shrink-0 pl-2">
                    <span className="text-sm font-black text-farm-950">
                      ₹{Math.round(item.product.price * item.quantity * 100) / 100}
                    </span>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-earth-400 hover:text-red-600 p-1 mt-1 transition-colors"
                      aria-label={`Remove ${item.product.name} from basket`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Mobile delete button */}
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="sm:hidden text-earth-400 hover:text-red-600 p-1"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-2 flex justify-between items-center text-xs">
                <button
                  onClick={clearCart}
                  className="text-earth-400 hover:text-red-600 transition-colors"
                >
                  Clear all items
                </button>
                <Link
                  href="/shop"
                  onClick={closeCart}
                  className="text-farm-700 font-bold hover:underline"
                >
                  + Add more items
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer: Coupon + Summary + Checkout */}
        {items.length > 0 && (
          <div className="border-t border-earth-100 p-5 sm:p-6 bg-earth-50/70 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Promo Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-harvest-50 border border-harvest-200 text-harvest-950 text-xs px-3.5 py-2.5 rounded-xl">
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
                      placeholder="Promo code (e.g. FARMFRESH10)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="text-xs uppercase bg-white border border-earth-200 rounded-xl px-3.5 py-2.5 flex-1 focus:outline-none focus:ring-2 focus:ring-farm-600 shadow-xs"
                    />
                    <button
                      type="submit"
                      disabled={isApplying || !couponInput.trim()}
                      className="bg-farm-800 hover:bg-farm-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-50 shadow-xs"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-red-600 mt-1 pl-1">{couponError}</p>}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1 text-xs text-earth-600 bg-white/70 p-3 rounded-2xl border border-earth-200/60">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-earth-900">₹{totals.subtotal}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-farm-700 font-semibold">
                    <span>Discount</span>
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
                <div className="flex justify-between text-sm font-black text-farm-950 border-t border-earth-200/60 pt-1.5 mt-1">
                  <span>Total Amount</span>
                  <span className="text-base font-black text-farm-800">₹{totals.finalTotal}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button
                type="button"
                onClick={closeCart}
                className="order-2 sm:order-1 flex-1 py-3.5 px-4 rounded-2xl border border-earth-300 text-earth-700 hover:bg-earth-100 font-bold text-xs uppercase tracking-wider transition-colors text-center"
              >
                Continue Shopping
              </button>

              <Link
                href="/checkout"
                onClick={closeCart}
                className="order-1 sm:order-2 flex-1 sm:flex-[1.5] flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-700 text-white font-extrabold text-xs uppercase tracking-wider py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="flex items-center justify-center gap-4 text-[11px] text-earth-500 pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-farm-600" /> Secure Checkout
              </span>
              <span>•</span>
              <span>Direct Farm Fresh Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

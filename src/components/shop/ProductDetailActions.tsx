'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Zap, Check, Plus, Minus, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { trackEvent } from '@/lib/analytics';

interface ProductDetailActionsProps {
  product: Product;
}

export function ProductDetailActions({ product }: ProductDetailActionsProps) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const isOutOfStock = product.stockQuantity <= 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    if (isOutOfStock) return;
    addToCart(product, quantity);
    trackEvent('begin_checkout', {
      product_id: product.id,
      price: product.price,
      quantity,
    });
    router.push('/checkout');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      {/* Left: Gallery */}
      <div className="lg:col-span-6 space-y-4">
        {/* Main Display Image */}
        <div className="relative w-full pt-[85%] rounded-3xl overflow-hidden bg-earth-100 border border-earth-200 shadow-md">
          <Image
            src={product.images[selectedImage] || product.images[0]}
            alt={product.altText || product.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 550px"
            className="object-cover transition-all duration-300"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute top-4 left-4 bg-harvest-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow">
              {product.discountPercentage}% OFF
            </div>
          )}
        </div>

        {/* Thumbnail Carousel */}
        {product.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                  selectedImage === idx
                    ? 'border-farm-600 ring-2 ring-farm-600/30 shadow-md'
                    : 'border-earth-200 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={img} alt="Product view" fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Pricing, Specs, and Actions */}
      <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-farm-700 bg-farm-100 px-3 py-1 rounded-full">
              {product.category?.name || 'Farm Produce'}
            </span>
            <span className="text-xs font-bold text-earth-500 bg-earth-100 px-3 py-1 rounded-full">
              Unit: {product.unit}
            </span>
            <span className="text-xs text-earth-400">SKU: {product.SKU}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-farm-950 leading-tight">
            {product.name}
          </h1>

          {/* Pricing Block */}
          <div className="p-4 rounded-2xl bg-earth-50 border border-earth-200/80 flex items-baseline gap-3">
            <span className="text-3xl font-black text-farm-950">₹{product.price}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-base text-earth-400 line-through">
                ₹{product.compareAtPrice}
              </span>
            )}
            <span className="text-xs text-earth-500">
              (Includes all taxes & packaging)
            </span>
          </div>

          {/* Availability Badge */}
          <div className="flex items-center gap-2 text-xs font-semibold">
            {isOutOfStock ? (
              <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full">
                Out of Stock (Fresh batch harvesting tomorrow)
              </span>
            ) : (
              <span className="text-farm-800 bg-farm-100 px-3 py-1 rounded-full flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-farm-700" />
                In Stock ({product.stockQuantity} available for delivery today)
              </span>
            )}
          </div>

          <p className="text-sm text-earth-600 leading-relaxed">
            {product.description}
          </p>

          {/* Spec details */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-earth-700">
            {product.origin && (
              <div className="p-3 rounded-xl bg-white border border-earth-200">
                <span className="text-earth-400 block text-[10px] uppercase font-bold">Harvest Origin</span>
                <strong className="text-farm-900">{product.origin}</strong>
              </div>
            )}
            {product.shelfLife && (
              <div className="p-3 rounded-xl bg-white border border-earth-200">
                <span className="text-earth-400 block text-[10px] uppercase font-bold">Shelf Life</span>
                <strong className="text-farm-900">{product.shelfLife}</strong>
              </div>
            )}
            {product.storageNotes && (
              <div className="col-span-2 p-3 rounded-xl bg-white border border-earth-200">
                <span className="text-earth-400 block text-[10px] uppercase font-bold">Storage Advice</span>
                <span className="text-earth-700">{product.storageNotes}</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 pt-4 border-t border-earth-200">
          <div className="flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-earth-300 rounded-2xl bg-earth-50 p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-earth-700 hover:text-farm-900 font-bold hover:bg-white rounded-xl transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center text-base font-black text-earth-900">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stockQuantity, q + 1))}
                disabled={quantity >= product.stockQuantity}
                className="w-10 h-10 flex items-center justify-center text-earth-700 hover:text-farm-900 font-bold hover:bg-white rounded-xl transition-colors disabled:opacity-30"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Basket Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 flex items-center justify-center gap-2.5 text-base font-bold py-4 px-6 rounded-2xl shadow-lift transition-all ${
                added
                  ? 'bg-farm-600 text-white'
                  : 'bg-farm-800 hover:bg-farm-900 text-white active:scale-98 disabled:opacity-50'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Basket!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Basket</span>
                </>
              )}
            </button>
          </div>

          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            className="w-full flex items-center justify-center gap-2 bg-harvest-500 hover:bg-harvest-600 text-slate-950 font-black text-base py-3.5 px-6 rounded-2xl shadow-sm transition-colors disabled:opacity-50"
          >
            <Zap className="w-5 h-5 fill-current" />
            <span>Buy Now (Instant Checkout)</span>
          </button>

          {/* Guarantee Badges */}
          <div className="pt-2 flex items-center justify-center gap-6 text-xs text-earth-500 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-farm-600" /> Freshness Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-farm-600" /> Morning Doorstep Slot
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ShoppingBag, Check, Eye, Plus, Minus } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { QuickViewModal } from './QuickViewModal';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { items, addToCart, updateQuantity } = useCart();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const cartItem = items.find((i) => i.productId === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;
  const isOutOfStock = product.stockQuantity <= 0;
  const isLowStock = product.stockQuantity > 0 && product.stockQuantity <= 10;

  return (
    <>
      <div className="group bg-white rounded-2xl border border-earth-200 hover:border-farm-300 hover:shadow-lift transition-all duration-300 flex flex-col overflow-hidden relative">
        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.discountPercentage > 0 && (
            <span className="bg-harvest-500 text-slate-950 font-extrabold text-[10px] tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
          {isLowStock && (
            <span className="bg-amber-100 text-amber-900 font-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm">
              Only {product.stockQuantity} left
            </span>
          )}
        </div>

        {/* Quick View Button on Card Hover */}
        <button
          onClick={() => setQuickViewOpen(true)}
          className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-earth-700 hover:text-farm-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <Link
          href={`/shop/${product.slug}`}
          className="relative block w-full pt-[75%] bg-earth-50 overflow-hidden"
        >
          <Image
            src={product.images[0] || '/images/categories/vegetables.webp'}
            alt={product.altText || product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>

        {/* Card Content */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            {/* Category & Unit */}
            <div className="flex items-center justify-between text-[11px] font-semibold text-earth-500 mb-1">
              <span>{product.category?.name || 'Produce'}</span>
              <span className="bg-earth-100 px-2 py-0.5 rounded text-earth-700 font-bold">
                {product.unit}
              </span>
            </div>

            {/* Product Name */}
            <Link
              href={`/shop/${product.slug}`}
              className="text-sm sm:text-base font-bold text-farm-950 hover:text-farm-700 transition-colors line-clamp-1"
            >
              {product.name}
            </Link>

            {/* Short Description */}
            {product.shortDescription && (
              <p className="text-xs text-earth-500 line-clamp-2 mt-1 leading-relaxed">
                {product.shortDescription}
              </p>
            )}

            {/* Rating */}
            <div className="flex items-center gap-1.5 mt-2">
              <div className="flex items-center text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
              </div>
              <span className="text-xs font-bold text-earth-800">{product.rating}</span>
              <span className="text-[11px] text-earth-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Pricing & Add to Cart */}
          <div className="pt-2 border-t border-earth-100 flex items-center justify-between gap-2">
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-black text-farm-950">₹{product.price}</span>
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <span className="text-xs text-earth-400 line-through">
                    ₹{product.compareAtPrice}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-earth-400 block -mt-0.5">
                Inclusive of all taxes
              </span>
            </div>

            {/* Cart Actions */}
            {isOutOfStock ? (
              <span className="text-xs font-bold text-red-500 bg-red-50 px-3 py-1.5 rounded-lg">
                Sold Out
              </span>
            ) : currentQuantity > 0 ? (
              <div className="flex items-center border border-farm-600 rounded-xl bg-farm-50 shadow-sm">
                <button
                  onClick={() => updateQuantity(product.id, currentQuantity - 1)}
                  className="p-1.5 text-farm-800 hover:bg-farm-200 rounded-l-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-2.5 text-xs font-extrabold text-farm-950">
                  {currentQuantity}
                </span>
                <button
                  onClick={() => updateQuantity(product.id, currentQuantity + 1)}
                  disabled={currentQuantity >= product.stockQuantity}
                  className="p-1.5 text-farm-800 hover:bg-farm-200 rounded-r-lg transition-colors disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => addToCart(product, 1)}
                className="inline-flex items-center gap-1.5 bg-farm-800 hover:bg-farm-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition-all shadow-sm active:scale-95"
                aria-label={`Add ${product.name} to basket`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal product={product} onClose={() => setQuickViewOpen(false)} />
      )}
    </>
  );
}

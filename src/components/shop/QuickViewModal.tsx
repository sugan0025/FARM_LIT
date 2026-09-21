'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Star, ShoppingBag, Check, ShieldCheck, MapPin, Clock } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);

  const handleAdd = () => {
    addToCart(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-earth-200 z-10 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 text-earth-500 hover:text-earth-900 bg-white/80 hover:bg-white rounded-full shadow-sm"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Gallery */}
            <div className="p-6 bg-earth-50 flex flex-col justify-between">
              <div className="relative w-full pt-[85%] rounded-2xl overflow-hidden bg-white shadow-sm border border-earth-100">
                <Image
                  src={product.images[selectedImage] || product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 350px"
                />
              </div>

              {product.images.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative w-14 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === idx ? 'border-farm-600 shadow-md' : 'border-transparent opacity-70'
                      }`}
                    >
                      <Image src={img} alt="thumbnail" fill className="object-cover" sizes="60px" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info & Add */}
            <div className="p-6 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs text-earth-500 font-semibold mb-1">
                  <span>{product.category?.name || 'Produce'}</span>
                  <span className="bg-farm-100 text-farm-800 px-2.5 py-0.5 rounded-full font-bold">
                    {product.unit}
                  </span>
                </div>

                <h3 className="text-xl font-black text-farm-950">{product.name}</h3>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-xs font-bold text-earth-800">{product.rating}</span>
                  <span className="text-xs text-earth-400">({product.reviewCount} customer reviews)</span>
                </div>

                {/* Pricing */}
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-2xl font-black text-farm-900">₹{product.price}</span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-earth-400 line-through">
                      ₹{product.compareAtPrice}
                    </span>
                  )}
                  {product.discountPercentage > 0 && (
                    <span className="text-xs font-bold text-harvest-600 bg-harvest-50 px-2 py-0.5 rounded">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>

                <p className="text-xs text-earth-600 leading-relaxed mt-3 line-clamp-3">
                  {product.description}
                </p>

                {/* Highlights */}
                <div className="mt-4 pt-3 border-t border-earth-100 space-y-1.5 text-xs text-earth-600">
                  {product.origin && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-farm-600" />
                      <span>Origin: <strong>{product.origin}</strong></span>
                    </div>
                  )}
                  {product.shelfLife && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-farm-600" />
                      <span>Shelf Life: <strong>{product.shelfLife}</strong></span>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-earth-300 rounded-xl bg-earth-50">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      className="px-3 py-2 text-earth-700 hover:text-farm-900 font-bold"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-bold text-earth-900">{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(product.stockQuantity, q + 1))}
                      disabled={qty >= product.stockQuantity}
                      className="px-3 py-2 text-earth-700 hover:text-farm-900 font-bold disabled:opacity-30"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={handleAdd}
                    disabled={product.stockQuantity <= 0}
                    className="flex-1 flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-700 text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition-colors disabled:opacity-50"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Basket</span>
                  </button>
                </div>

                <div className="text-center">
                  <Link
                    href={`/shop/${product.slug}`}
                    onClick={onClose}
                    className="text-xs text-farm-700 hover:underline font-semibold"
                  >
                    View complete product details & nutrition →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

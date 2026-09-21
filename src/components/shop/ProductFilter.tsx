'use client';

import React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Category } from '@/types';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';

interface ProductFilterProps {
  categories: Category[];
  currentCategory?: string;
  currentSort?: string;
  currentInStock?: boolean;
}

export function ProductFilter({
  categories,
  currentCategory,
  currentSort = 'relevance',
  currentInStock = false,
}: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === '' || (key === 'sort' && value === 'relevance')) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('/shop');
  };

  return (
    <aside className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-earth-200">
        <div className="flex items-center gap-2 text-farm-950 font-bold text-sm">
          <SlidersHorizontal className="w-4 h-4 text-farm-700" />
          <span>Filters</span>
        </div>
        {(currentCategory || currentInStock || (currentSort && currentSort !== 'relevance')) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-xs text-earth-500 hover:text-red-600 transition-colors"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h4 className="text-xs font-black uppercase tracking-wider text-earth-700">Categories</h4>
        <div className="space-y-1 text-sm">
          <button
            onClick={() => updateParam('category', null)}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
              !currentCategory
                ? 'bg-farm-800 text-white font-bold'
                : 'text-earth-700 hover:bg-earth-100'
            }`}
          >
            <span>All Categories</span>
          </button>
          {categories.map((cat) => {
            const isSelected = currentCategory === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => updateParam('category', cat.slug)}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-farm-800 text-white font-bold'
                    : 'text-earth-700 hover:bg-earth-100'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-2 pt-4 border-t border-earth-200">
        <h4 className="text-xs font-black uppercase tracking-wider text-earth-700">Availability</h4>
        <label className="flex items-center gap-2 text-xs font-medium text-earth-800 cursor-pointer">
          <input
            type="checkbox"
            checked={currentInStock}
            onChange={(e) => updateParam('stock', e.target.checked ? 'in-stock' : null)}
            className="rounded border-earth-300 text-farm-700 focus:ring-farm-600"
          />
          <span>In Stock Only</span>
        </label>
      </div>

      {/* Quick Sort (if in sidebar) */}
      <div className="space-y-2 pt-4 border-t border-earth-200">
        <h4 className="text-xs font-black uppercase tracking-wider text-earth-700">Sort By</h4>
        <select
          value={currentSort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full bg-white border border-earth-300 rounded-lg text-xs p-2 focus:outline-none focus:ring-2 focus:ring-farm-600 text-earth-800"
        >
          <option value="relevance">Relevance</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
    </aside>
  );
}

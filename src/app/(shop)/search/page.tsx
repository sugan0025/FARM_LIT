import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProducts } from '@/lib/db';
import { ProductCard } from '@/components/shop/ProductCard';
import { Search as SearchIcon, ArrowLeft } from 'lucide-react';

interface SearchPageProps {
  searchParams: { q?: string };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || '';
  return {
    title: query ? `Search results for "${query}" | Farm_lit` : 'Search Produce | Farm_lit',
    robots: { index: false, follow: true }, // Don't index dynamic query search result pages
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q?.trim() || '';
  const products = query ? await getProducts({ search: query }) : [];

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-800 hover:underline mb-3"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
          </Link>
          <h1 className="text-3xl font-black text-farm-950 flex items-center gap-3">
            <SearchIcon className="w-8 h-8 text-farm-700" />
            {query ? (
              <span>
                Search results for <span className="text-farm-700">&ldquo;{query}&rdquo;</span>
              </span>
            ) : (
              <span>Search Farm Produce</span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-earth-600 mt-1">
            {products.length > 0
              ? `Found ${products.length} fresh produce item(s) matching your request.`
              : 'Enter a keyword such as "spinach", "apples", "basmati", or "ghee".'}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl border border-earth-200 p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-earth-100 text-earth-400 flex items-center justify-center mx-auto">
              <SearchIcon className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-farm-950">No farm items matched &ldquo;{query}&rdquo;</h3>
            <p className="text-xs text-earth-500 leading-relaxed">
              Check for spelling errors or try searching for general categories like vegetables, fruits, staples, or dairy.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-farm-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-farm-900 transition-colors shadow-sm"
            >
              Browse All Produce
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

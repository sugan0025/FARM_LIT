import React from 'react';
import Link from 'next/link';
import { Sprout, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-earth-50/50">
      <div className="bg-white rounded-3xl border border-earth-200 p-8 sm:p-12 max-w-md w-full text-center shadow-lg space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-earth-100 text-earth-500 flex items-center justify-center mx-auto">
          <Sprout className="w-8 h-8 text-farm-600" />
        </div>
        <span className="text-xs font-black uppercase tracking-wider text-earth-400">404 Error</span>
        <h1 className="text-2xl font-black text-farm-950">Produce Page Not Found</h1>
        <p className="text-xs text-earth-500 leading-relaxed">
          The vegetable, recipe, or category you were looking for might have been moved or is currently out of season.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/shop"
            className="flex-1 flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Shop</span>
          </Link>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-earth-100 hover:bg-earth-200 text-earth-800 text-xs font-bold py-3.5 px-4 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

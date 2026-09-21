'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to monitoring safely
    // eslint-disable-next-line no-console
    console.error('Handled application error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 bg-earth-50/50">
      <div className="bg-white rounded-3xl border border-earth-200 p-8 sm:p-12 max-w-md w-full text-center shadow-lg space-y-5">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-farm-950">Something went wrong</h1>
        <p className="text-xs text-earth-600 leading-relaxed">
          We encountered an unexpected issue while loading fresh produce information. Please try refreshing or return to the storefront.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-900 text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-sm transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-earth-100 hover:bg-earth-200 text-earth-800 text-xs font-bold py-3.5 px-4 rounded-xl transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

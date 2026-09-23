import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { CommunityView } from '@/components/community/CommunityView';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  title: 'Farm_lit Community | Healthy Recipes, Farming Tips & Sustainability in Sathyamangalam',
  description:
    'Explore farm-to-table culinary recipes, seasonal harvest calendars, natural organic farming practices, and zero-plastic sustainability stories from growers in Sathyamangalam and Erode.',
  alternates: {
    canonical: `${SITE_CONFIG.baseUrl}/community`,
  },
  openGraph: {
    title: 'Farm_lit Journal & Community',
    description: 'Fresh recipes, agroecology wisdom, and sustainable living stories.',
    url: `${SITE_CONFIG.baseUrl}/community`,
  },
};

export default function CommunityPage() {
  return (
    <div className="bg-earth-50/40 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-100 px-3 py-1 rounded-full">
            Farm_lit Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-farm-950">
            Community, Recipes & Sustainable Living
          </h1>
          <p className="text-sm text-earth-600 leading-relaxed">
            Discover seasonal recipe guides, practical kitchen storage tips, and stories from our local farming partners in Sathyamangalam and the Bhavani River basin.
          </p>
        </div>

        {/* Client-side Interactive Community View & Reader Modal */}
        <Suspense
          fallback={
            <div className="text-center py-12 text-earth-500 font-bold text-sm">
              Loading journal stories...
            </div>
          }
        >
          <CommunityView />
        </Suspense>
      </div>
    </div>
  );
}

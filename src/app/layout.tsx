import type { Metadata } from 'next';
import { Suspense } from 'react';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { UTMListener } from '@/components/ui/UTMListener';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/site-config';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.baseUrl),
  title: {
    default: 'Farm_lit | Fresh Vegetables, Fruits, Grains & Everyday Groceries',
    template: '%s | Farm_lit',
  },
  description:
    'Order fresh vegetables, fruits, stone-ground flours, and everyday grocery essentials online from Farm_lit. Harvested fresh from local farms with doorstep delivery.',
  keywords: [
    'fresh vegetables online',
    'fresh fruits delivery',
    'organic grocery store',
    'farm fresh groceries',
    'grains and staples',
    'healthy groceries',
    'grocery delivery near me',
    'Farm_lit',
    'farmlit',
  ],
  authors: [{ name: 'Farm_lit Produce Cooperative' }],
  creator: 'Farm_lit',
  publisher: 'Farm_lit Technologies',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.baseUrl,
    siteName: 'Farm_lit',
    title: 'Farm_lit | Fresh. Natural. Everyday.',
    description:
      'Farm fresh vegetables, seasonal fruits, stone-ground flour, and pantry staples straight from regional farms to your kitchen.',
    images: [
      {
        url: '/images/banners/hero-fresh.webp',
        width: 1200,
        height: 630,
        alt: 'Farm_lit Fresh Harvest Vegetables and Fruits',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farm_lit | Fresh Vegetables & Everyday Essentials',
    description: 'Fresh vegetables, fruits, and staples delivered directly from regional farms.',
    creator: '@farmlit',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || 'H9B-G6_XMCWWpvjJi2V8uHXwSDpBDJE6e32or8Z6x-U',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'GroceryStore',
    name: 'Farm_lit',
    url: SITE_CONFIG.baseUrl,
    logo: `${SITE_CONFIG.baseUrl}/images/categories/vegetables.webp`,
    image: `${SITE_CONFIG.baseUrl}/images/banners/hero-fresh.webp`,
    description:
      'B2C grocery e-commerce brand delivering fresh vegetables, fruits, grains, and pantry staples straight from regional farms.',
    priceRange: '₹₹',
    sameAs: [
      SITE_CONFIG.social.instagram,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8000-456-789',
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Green Valley Agro Logistics, Hinjawadi Phase 2',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411057',
      addressCountry: 'IN',
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Farm_lit',
    url: SITE_CONFIG.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="H9B-G6_XMCWWpvjJi2V8uHXwSDpBDJE6e32or8Z6x-U" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={websiteSchema} />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        <AuthProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <UTMListener />
            </Suspense>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

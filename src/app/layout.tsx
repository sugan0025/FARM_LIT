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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://farmlit.com'),
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
  ],
  authors: [{ name: 'Farm_lit Produce Cooperative' }],
  creator: 'Farm_lit',
  publisher: 'Farm_lit Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://farmlit.com',
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Farm_lit',
    url: 'https://farmlit.com',
    logo: 'https://farmlit.com/logo.png',
    description:
      'B2C grocery e-commerce brand delivering fresh vegetables, fruits, grains, and pantry staples.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8000-456-789',
      contactType: 'Customer Support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Farm_lit',
    url: 'https://farmlit.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://farmlit.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
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

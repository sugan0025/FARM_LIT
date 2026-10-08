import type { Metadata } from 'next';
import Script from 'next/script';
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
    default: 'Organic Vegetables Sathyamangalam | Farm_lit Fresh Produce & Grocery Delivery',
    template: '%s | Farm_lit',
  },
  description:
    'Buy fresh organic vegetables, seasonal fruits, stone-ground flours, and grocery essentials online in Sathyamangalam, Bhavani, and Erode from Farm_lit. Daily farm harvest with same-day doorstep delivery.',
  keywords: [
    'organic vegetables sathyamangalam',
    'fresh vegetables sathyamangalam',
    'farm lit sathyamangalam',
    'farmlit sathyamangalam',
    'farmlit',
    'Farm_lit',
    'grocery delivery sathyamangalam',
    'organic grocery store tamil nadu',
    'farm fresh produce sathyamangalam',
    'bhavani river farm vegetables',
    'sathyamangalam grocery store online',
    'fruits and vegetables erode',
    'erode grocery delivery',
    'gobichettipalayam organic groceries',
    'fresh vegetables online',
    'fresh fruits delivery',
    'farm fresh groceries',
    'grains and staples',
    'healthy groceries',
    'grocery delivery near me',
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
    title: 'Organic Vegetables Sathyamangalam | Farm_lit Fresh Produce',
    description:
      'Direct farm-to-table organic vegetables, seasonal fruits, cold-pressed oils, and grocery staples from local farmers in Sathyamangalam, Bhavani, and Erode.',
    images: [
      {
        url: '/images/banners/hero-fresh.webp',
        width: 1200,
        height: 630,
        alt: 'Farm_lit Organic Vegetables and Fresh Produce Sathyamangalam',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Organic Vegetables Sathyamangalam | Farm_lit',
    description: 'Fresh organic vegetables, fruits, and staples delivered directly from regional farms in Sathyamangalam & Erode.',
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: ['/favicon.ico'],
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
    alternateName: 'Farm_lit Organic Vegetables Sathyamangalam',
    url: SITE_CONFIG.baseUrl,
    logo: `${SITE_CONFIG.baseUrl}/images/categories/vegetables.webp`,
    image: `${SITE_CONFIG.baseUrl}/images/banners/hero-fresh.webp`,
    description:
      'Farm-to-table organic grocery platform delivering fresh vegetables, fruits, grains, and pantry essentials directly from regional farms in Sathyamangalam, Tamil Nadu.',
    priceRange: '₹₹',
    sameAs: [
      SITE_CONFIG.social.instagram,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-8000-456-789',
      contactType: 'customer support',
      areaServed: 'IN',
      availableLanguage: ['English', 'Tamil'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bhavani River Road',
      addressLocality: 'Sathyamangalam',
      addressRegion: 'Tamil Nadu',
      postalCode: '638401',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 11.5034,
      longitude: 77.2441,
    },
    areaServed: [
      { '@type': 'City', name: 'Sathyamangalam' },
      { '@type': 'City', name: 'Gobichettipalayam' },
      { '@type': 'City', name: 'Bhavanisagar' },
      { '@type': 'AdministrativeArea', name: 'Erode District' },
      { '@type': 'State', name: 'Tamil Nadu' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Organic Vegetables & Fresh Farm Groceries Sathyamangalam',
      itemListElement: [
        {
          '@type': 'OfferCatalog',
          name: 'Organic Vegetables Sathyamangalam',
        },
        {
          '@type': 'OfferCatalog',
          name: 'Seasonal Farm Fruits',
        },
        {
          '@type': 'OfferCatalog',
          name: 'A2 Desi Cow Ghee & Wildflower Honey',
        },
      ],
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

        {/* Google Analytics 4 (GA4) Tag */}
        {SITE_CONFIG.gaMeasurementId && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${SITE_CONFIG.gaMeasurementId}`}
            />
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${SITE_CONFIG.gaMeasurementId}', {
                    page_path: window.location.pathname,
                  });
                `,
              }}
            />
          </>
        )}
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

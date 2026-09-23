import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getProducts } from '@/lib/db';
import { ProductDetailActions } from '@/components/shop/ProductDetailActions';
import { ProductCard } from '@/components/shop/ProductCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChevronRight } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

interface ProductPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Product Not Found' };
  }

  const productUrl = `${SITE_CONFIG.baseUrl}/shop/${product.slug}`;

  return {
    title: `${product.name} (${product.unit}) | Farm_lit`,
    description: product.description.slice(0, 160),
    alternates: {
      canonical: productUrl,
    },
    openGraph: {
      title: `${product.name} | Farm_lit Fresh Produce`,
      description: product.description.slice(0, 160),
      url: productUrl,
      images: product.images[0] ? [{ url: product.images[0] }] : [],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }

  // Related products from same category
  const allRelated = await getProducts({ categorySlug: product.category?.slug });
  const related = allRelated.filter((p) => p.id !== product.id).slice(0, 4);

  const productUrl = `${SITE_CONFIG.baseUrl}/shop/${product.slug}`;

  // Schema.org Product Structured Data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: product.images.map((img) =>
      img.startsWith('http') ? img : `${SITE_CONFIG.baseUrl}${img}`
    ),
    description: product.description,
    sku: product.SKU,
    brand: {
      '@type': 'Brand',
      name: 'Farm_lit',
    },
    offers: {
      '@type': 'Offer',
      url: productUrl,
      priceCurrency: 'INR',
      price: product.price,
      priceValidUntil: '2026-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability:
        product.stockQuantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount || 1,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_CONFIG.baseUrl },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${SITE_CONFIG.baseUrl}/shop` },
      ...(product.category
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: product.category.name,
              item: `${SITE_CONFIG.baseUrl}/categories/${product.category.slug}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: product.category ? 4 : 3,
        name: product.name,
        item: productUrl,
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen py-10">
      <JsonLd data={productSchema} />
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-earth-500 font-semibold">
          <Link href="/" className="hover:text-farm-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-farm-700">Shop</Link>
          {product.category && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <Link
                href={`/categories/${product.category.slug}`}
                className="hover:text-farm-700"
              >
                {product.category.name}
              </Link>
            </>
          )}
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-farm-950 font-bold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Core Product Presentation */}
        <ProductDetailActions product={product} />

        {/* Related Products */}
        {related.length > 0 && (
          <section className="pt-12 border-t border-earth-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-farm-700">
                  Recommended For You
                </span>
                <h3 className="text-2xl font-black text-farm-950 mt-1">Related Produce</h3>
              </div>
              <Link
                href="/shop"
                className="text-xs font-bold text-farm-800 hover:text-farm-600 transition-colors"
              >
                Browse all &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

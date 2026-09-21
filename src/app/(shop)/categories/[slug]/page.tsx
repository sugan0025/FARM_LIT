import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getCategories, getProducts } from '@/lib/db';
import { ProductCard } from '@/components/shop/ProductCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const categories = await getCategories();
  const category = categories.find((c) => c.slug === params.slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} - Fresh Farm Produce | Farm_lit`,
    description: category.description || `Browse our fresh ${category.name} harvested directly from regional farms.`,
    alternates: {
      canonical: `https://farmlit.com/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.name} | Farm_lit`,
      description: category.description || '',
      images: category.image ? [{ url: category.image }] : [],
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts({ categorySlug: params.slug }),
  ]);

  const category = categories.find((c) => c.slug === params.slug);
  if (!category) {
    notFound();
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://farmlit.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Shop',
        item: 'https://farmlit.com/shop',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://farmlit.com/categories/${category.slug}`,
      },
    ],
  };

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <JsonLd data={breadcrumbSchema} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-earth-500 mb-6 font-semibold">
          <Link href="/" className="hover:text-farm-700">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-farm-700">Shop</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-farm-950 font-bold">{category.name}</span>
        </nav>

        {/* Hero Banner for Category */}
        <div className="relative rounded-3xl overflow-hidden bg-farm-900 text-white p-8 sm:p-12 mb-10 shadow-lg">
          <div className="absolute inset-0 opacity-20">
            {category.image && (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="100vw"
              />
            )}
          </div>
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-harvest-400 bg-white/10 px-3 py-1 rounded-full">
              Produce Category
            </span>
            <h1 className="text-3xl sm:text-5xl font-black">{category.name}</h1>
            <p className="text-sm sm:text-base text-farm-100 leading-relaxed">
              {category.description}
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-farm-950">
              Available Items ({products.length})
            </h2>
            <Link
              href="/shop"
              className="inline-flex items-center gap-1 text-xs font-bold text-farm-800 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> All Categories
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

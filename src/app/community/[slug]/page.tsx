import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar, ChefHat, Sparkles, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { COMMUNITY_ARTICLES } from '@/lib/articles-data';
import { INITIAL_PRODUCTS } from '@/lib/products-data';
import { SITE_CONFIG } from '@/lib/site-config';
import { JsonLd } from '@/components/seo/JsonLd';

interface ArticlePageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  return COMMUNITY_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const article = COMMUNITY_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: 'Article Not Found | Farm_lit' };
  }

  const url = `${SITE_CONFIG.baseUrl}/community/${article.slug}`;

  return {
    title: `${article.title} | Farm_lit Journal`,
    description: article.snippet,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: article.title,
      description: article.snippet,
      url,
      images: [{ url: article.image }],
      type: 'article',
      publishedTime: article.date,
      authors: [article.author.name],
    },
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const article = COMMUNITY_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  const relatedProduct = article.relatedProductSlug
    ? INITIAL_PRODUCTS.find((p) => p.slug === article.relatedProductSlug)
    : null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    image: [`${SITE_CONFIG.baseUrl}${article.image}`],
    datePublished: '2026-09-18T08:00:00+05:30',
    dateModified: '2026-09-24T00:00:00+05:30',
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Farm_lit',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.baseUrl}/icon.svg`,
      },
    },
    description: article.snippet,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <div className="bg-earth-50/50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Back Navigation */}
          <Link
            href="/community"
            className="inline-flex items-center gap-2 text-xs font-bold text-farm-800 hover:text-farm-900 bg-white border border-earth-200 px-3.5 py-2 rounded-xl transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Journal & Recipes</span>
          </Link>

          {/* Article Container */}
          <article className="bg-white rounded-3xl p-6 sm:p-10 border border-earth-200 shadow-sm space-y-8">
            {/* Title & Metadata */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-farm-100 text-farm-800 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-xs text-earth-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-farm-950 leading-tight">
                {article.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-b border-earth-100 pb-4">
                <div className="w-10 h-10 rounded-full bg-farm-100 text-farm-800 font-black text-sm flex items-center justify-center">
                  {article.author.name.charAt(0)}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-earth-900">{article.author.name}</p>
                  <p className="text-earth-500">{article.author.role} • {article.date}</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden bg-earth-100 shadow-md">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 850px"
              />
            </div>

            {/* Intro Lead */}
            <div className="p-5 rounded-2xl bg-earth-50 border border-earth-200 text-base text-earth-700 leading-relaxed font-medium italic">
              &ldquo;{article.intro}&rdquo;
            </div>

            {/* Sections */}
            <div className="space-y-6 pt-2">
              {article.sections.map((sec, idx) => (
                <div key={idx} className="space-y-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-farm-950">
                    {sec.heading}
                  </h2>
                  <p className="text-sm text-earth-600 leading-relaxed">
                    {sec.content}
                  </p>
                </div>
              ))}
            </div>

            {/* Recipe Details if applicable */}
            {article.recipeDetails && (
              <div className="p-6 sm:p-8 rounded-3xl bg-farm-50/70 border border-farm-200 space-y-6">
                <div className="flex items-center justify-between border-b border-farm-200/60 pb-3">
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-5 h-5 text-farm-700" />
                    <h3 className="text-lg font-bold text-farm-950">Farm Kitchen Recipe</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-farm-900 font-semibold">
                    <span>Prep: {article.recipeDetails.prepTime}</span>
                    <span>•</span>
                    <span>Cook: {article.recipeDetails.cookTime}</span>
                    <span>•</span>
                    <span>{article.recipeDetails.servings}</span>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-farm-800">
                    Ingredients Checklist
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-earth-700">
                    {article.recipeDetails.ingredients.map((ing, i) => (
                      <li key={i} className="flex items-start gap-2 bg-white/90 p-2.5 rounded-xl border border-farm-100">
                        <CheckCircle2 className="w-4 h-4 text-farm-600 shrink-0 mt-0.5" />
                        <span>{ing}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Steps */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-farm-800">
                    Step-by-Step Instructions
                  </h4>
                  <ol className="space-y-3 text-xs text-earth-700">
                    {article.recipeDetails.steps.map((st, i) => (
                      <li key={i} className="flex items-start gap-3 bg-white/90 p-3.5 rounded-xl border border-farm-100">
                        <span className="w-5 h-5 rounded-full bg-farm-700 text-white font-bold text-[11px] flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="leading-relaxed">{st}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            )}

            {/* Key Takeaways */}
            {article.keyTakeaways && (
              <div className="p-6 rounded-2xl bg-earth-50 border border-earth-200 space-y-3">
                <h3 className="text-xs font-black uppercase tracking-wider text-farm-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-harvest-600" /> Key Takeaways
                </h3>
                <ul className="space-y-2 text-xs text-earth-700">
                  {article.keyTakeaways.map((takeaway, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-farm-600 shrink-0 mt-1.5" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Featured Product */}
            {relatedProduct && (
              <div className="p-5 rounded-2xl bg-gradient-to-r from-farm-50 via-white to-earth-50 border border-farm-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative w-18 h-18 rounded-xl overflow-hidden bg-earth-100 shrink-0 border border-earth-200">
                    <Image
                      src={relatedProduct.images[0] || '/images/categories/vegetables.webp'}
                      alt={relatedProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-farm-700 block">
                      Featured in This Article
                    </span>
                    <Link
                      href={`/shop/${relatedProduct.slug}`}
                      className="text-base font-bold text-farm-950 hover:text-farm-700 transition-colors"
                    >
                      {relatedProduct.name}
                    </Link>
                    <p className="text-sm text-farm-900 font-extrabold mt-0.5">
                      ₹{relatedProduct.price} <span className="text-earth-400 font-normal text-xs">/ {relatedProduct.unit}</span>
                    </p>
                  </div>
                </div>

                <Link
                  href={`/shop/${relatedProduct.slug}`}
                  className="inline-flex items-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl shadow-sm transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Shop Produce</span>
                </Link>
              </div>
            )}
          </article>
        </div>
      </div>
    </>
  );
}

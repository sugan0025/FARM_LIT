'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, Clock, Calendar, User, ChefHat, Sparkles, CheckCircle2, ArrowRight, ShoppingBag, Share2 } from 'lucide-react';
import { CommunityArticle } from '@/lib/articles-data';
import { INITIAL_PRODUCTS } from '@/lib/products-data';
import { useCart } from '@/context/CartContext';

interface ArticleReaderModalProps {
  article: CommunityArticle | null;
  onClose: () => void;
}

export function ArticleReaderModal({ article, onClose }: ArticleReaderModalProps) {
  const { addToCart, openCart } = useCart();

  useEffect(() => {
    if (!article) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  const relatedProduct = article.relatedProductSlug
    ? INITIAL_PRODUCTS.find((p) => p.slug === article.relatedProductSlug)
    : null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.snippet,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* Reader Modal Card */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="article-title"
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-earth-200 overflow-hidden flex flex-col max-h-[92vh] my-auto z-10 animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {/* Floating Top Bar with Actions */}
        <div className="sticky top-0 z-20 px-5 py-3.5 bg-white/95 backdrop-blur-md border-b border-earth-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-farm-100 text-farm-800 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-earth-500 font-medium flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 text-earth-500 hover:text-earth-900 hover:bg-earth-100 rounded-full transition-colors"
              aria-label="Share article"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-earth-500 hover:text-earth-900 hover:bg-earth-100 rounded-full transition-colors"
              aria-label="Close article reader"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Content */}
        <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8 space-y-8">
          {/* Article Header & Image */}
          <div className="space-y-4">
            <h1 id="article-title" className="text-2xl sm:text-3xl md:text-4xl font-black text-farm-950 leading-tight">
              {article.title}
            </h1>

            {/* Author Byline */}
            <div className="flex items-center gap-3 pt-1 border-b border-earth-100 pb-4">
              <div className="w-10 h-10 rounded-full bg-farm-100 text-farm-800 font-black text-sm flex items-center justify-center">
                {article.author.name.charAt(0)}
              </div>
              <div className="text-xs">
                <p className="font-bold text-earth-900">{article.author.name}</p>
                <p className="text-earth-500">{article.author.role} • {article.date}</p>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden bg-earth-100 shadow-md">
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 750px"
              />
            </div>
          </div>

          {/* Intro Paragraph */}
          <div className="p-4 sm:p-5 rounded-2xl bg-earth-50/80 border border-earth-200 text-sm sm:text-base text-earth-700 leading-relaxed font-medium italic">
            &ldquo;{article.intro}&rdquo;
          </div>

          {/* Article Main Sections */}
          <div className="space-y-6">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h2 className="text-lg sm:text-xl font-bold text-farm-950">
                  {sec.heading}
                </h2>
                <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
                  {sec.content}
                </p>
              </div>
            ))}
          </div>

          {/* Recipe Details Box (If recipe article) */}
          {article.recipeDetails && (
            <div className="p-6 rounded-3xl bg-farm-50/70 border border-farm-200/80 space-y-6">
              <div className="flex items-center justify-between border-b border-farm-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-farm-700" />
                  <h3 className="text-base font-bold text-farm-950">Farm Kitchen Recipe</h3>
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
              <div className="space-y-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-farm-800">
                  Ingredients Checklist
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-earth-700">
                  {article.recipeDetails.ingredients.map((ing, i) => (
                    <li key={i} className="flex items-start gap-2 bg-white/80 p-2 rounded-xl border border-farm-100">
                      <CheckCircle2 className="w-4 h-4 text-farm-600 shrink-0 mt-0.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Steps */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-farm-800">
                  Preparation Instructions
                </h4>
                <ol className="space-y-2.5 text-xs text-earth-700">
                  {article.recipeDetails.steps.map((st, i) => (
                    <li key={i} className="flex items-start gap-3 bg-white/80 p-3 rounded-xl border border-farm-100">
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
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-5 rounded-2xl bg-earth-100/70 border border-earth-200 space-y-3">
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

          {/* Related Produce Card to Buy */}
          {relatedProduct && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-farm-50 via-white to-earth-50 border border-farm-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-earth-100 shrink-0 border border-earth-200">
                  <Image
                    src={relatedProduct.images[0] || '/images/categories/vegetables.webp'}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-farm-700 block">
                    Produce Featured in This Story
                  </span>
                  <Link
                    href={`/shop/${relatedProduct.slug}`}
                    onClick={onClose}
                    className="text-sm font-bold text-farm-950 hover:text-farm-700 transition-colors"
                  >
                    {relatedProduct.name}
                  </Link>
                  <p className="text-xs text-farm-900 font-extrabold mt-0.5">
                    ₹{relatedProduct.price} <span className="text-earth-400 font-normal">/ {relatedProduct.unit}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    addToCart(relatedProduct, 1);
                    onClose();
                    openCart();
                  }}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add to Basket</span>
                </button>
                <Link
                  href={`/shop/${relatedProduct.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center justify-center p-2.5 rounded-xl border border-earth-300 text-earth-700 hover:bg-earth-100 text-xs font-bold transition-colors"
                  aria-label="View product"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div className="p-4 bg-earth-50 border-t border-earth-200 flex items-center justify-between text-xs text-earth-600">
          <span>Farm_lit Journal • Wholesome Living</span>
          <button
            onClick={onClose}
            className="font-bold text-farm-800 hover:text-farm-900 hover:underline"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
}

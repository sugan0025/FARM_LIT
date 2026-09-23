'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ChefHat, Sprout, BookOpen, Recycle, ArrowRight, Clock, Sparkles } from 'lucide-react';
import { COMMUNITY_ARTICLES, CommunityArticle } from '@/lib/articles-data';
import { ArticleReaderModal } from './ArticleReaderModal';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Healthy Recipes': ChefHat,
  'Farming Tips': Sprout,
  'Seasonal Produce': BookOpen,
  'Sustainability Stories': Recycle,
};

export function CommunityView() {
  const searchParams = useSearchParams();
  const [selectedArticle, setSelectedArticle] = useState<CommunityArticle | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Check URL query param e.g. ?read=slug
  useEffect(() => {
    const slug = searchParams.get('read') || searchParams.get('article');
    if (slug) {
      const found = COMMUNITY_ARTICLES.find((a) => a.slug === slug);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [searchParams]);

  const categories = ['All', 'Healthy Recipes', 'Farming Tips', 'Seasonal Produce', 'Sustainability Stories'];

  const filteredArticles =
    activeCategory === 'All'
      ? COMMUNITY_ARTICLES
      : COMMUNITY_ARTICLES.filter((a) => a.category === activeCategory);

  return (
    <>
      {/* Category Pills Filter */}
      <div className="flex flex-wrap items-center justify-center gap-2 pt-2 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
              activeCategory === cat
                ? 'bg-farm-800 text-white shadow-sm'
                : 'bg-white text-earth-700 hover:bg-earth-100 border border-earth-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
        {filteredArticles.map((item) => {
          const Icon = CATEGORY_ICONS[item.category] || BookOpen;
          return (
            <article
              key={item.id}
              onClick={() => setSelectedArticle(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-earth-200 shadow-sm hover:border-farm-400 hover:-translate-y-2.5 hover:shadow-2xl hover:shadow-farm-900/15 transition-all duration-300 ease-out flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative pt-[60%] bg-earth-100 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-farm-950/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="absolute top-3 left-3 bg-white/95 group-hover:bg-white text-farm-900 text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow transition-all duration-200">
                  <Icon className="w-3.5 h-3.5 text-farm-700" />
                  <span>{item.category}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-earth-400 font-semibold mb-2">
                    <span>{item.date}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {item.readTime}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-farm-950 group-hover:text-farm-700 transition-colors leading-snug">
                    {item.title}
                  </h2>
                  <p className="text-xs text-earth-600 leading-relaxed mt-2 line-clamp-3">
                    {item.snippet}
                  </p>
                </div>

                <div className="pt-3 border-t border-earth-100 flex items-center justify-between text-xs font-bold text-farm-800 group-hover:text-farm-600">
                  <span className="underline decoration-farm-300 group-hover:decoration-farm-600">Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5 text-farm-600 group-hover:text-farm-700 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Interactive Article Reader Modal */}
      {selectedArticle && (
        <ArticleReaderModal
          article={selectedArticle}
          onClose={() => setSelectedArticle(null)}
        />
      )}
    </>
  );
}

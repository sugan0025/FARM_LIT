import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ChefHat, Sprout, Recycle, ArrowRight } from 'lucide-react';
import { COMMUNITY_ARTICLES } from '@/lib/articles-data';

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Healthy Recipes': ChefHat,
  'Farming Tips': Sprout,
  'Seasonal Produce': BookOpen,
  'Sustainability Stories': Recycle,
};

export function CommunityPreview() {
  const articles = COMMUNITY_ARTICLES.slice(0, 4);

  return (
    <section className="py-16 bg-earth-50/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <div>
            <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-100/70 px-3 py-1 rounded-full">
              Farm_lit Journal
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-farm-950 mt-2">
              Farm_lit Community & Living
            </h2>
            <p className="text-xs sm:text-sm text-earth-600 mt-1">
              Recipes, farming wisdom, seasonal produce guides, and sustainability updates from Sathyamangalam.
            </p>
          </div>
          <Link
            href="/community"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-farm-800 hover:text-farm-600 transition-colors mt-3 sm:mt-0"
          >
            Visit Community <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {articles.map((item) => {
            const Icon = CATEGORY_ICONS[item.category] || BookOpen;
            return (
              <Link
                key={item.id}
                href={`/community/${item.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-earth-200 hover:border-farm-400 hover:-translate-y-2 hover:shadow-2xl hover:shadow-farm-900/15 transition-all duration-300 ease-out flex flex-col cursor-pointer"
              >
                <div className="relative pt-[55%] bg-earth-100 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-farm-950/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <div className="absolute top-3 left-3 bg-white/95 group-hover:bg-white backdrop-blur-sm text-farm-900 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm transition-all duration-200">
                    <Icon className="w-3 h-3 text-farm-700" />
                    <span>{item.category}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-semibold text-earth-400">{item.readTime}</span>
                    <h3 className="text-sm font-bold text-farm-950 group-hover:text-farm-700 transition-colors line-clamp-2 mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-earth-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="inline-flex items-center text-xs font-bold text-farm-800 group-hover:text-farm-600 pt-2">
                    <span>Read Story</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-farm-600 group-hover:text-farm-700 group-hover:translate-x-1.5 transition-all duration-300" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

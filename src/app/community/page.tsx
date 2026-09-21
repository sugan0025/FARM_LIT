import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ChefHat, Sprout, BookOpen, Recycle, ArrowRight, Heart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Farm_lit Community | Healthy Recipes, Farming Tips & Sustainability',
  description:
    'Explore farm-to-table culinary recipes, seasonal harvest calendars, natural organic farming practices, and zero-plastic sustainability stories.',
};

export default function CommunityPage() {
  const articles = [
    {
      category: 'Healthy Recipes',
      icon: ChefHat,
      title: 'Crispy Palak & Dal Cheela with Fresh Mint Dip',
      snippet: 'A high-protein wholesome breakfast recipe highlighting hydro-washed baby spinach and stone-ground yellow lentils. Ready in under 15 minutes.',
      readTime: '4 min read',
      date: 'Sept 18, 2026',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700',
    },
    {
      category: 'Farming Tips',
      icon: Sprout,
      title: 'How Our Farmers Prevent Pests Using Organic Neem Sprays',
      snippet: 'Learn how traditional Companion Planting protects tomatoes and bell peppers without artificial synthetic chemicals or wax coatings.',
      readTime: '5 min read',
      date: 'Sept 14, 2026',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=700',
    },
    {
      category: 'Seasonal Produce',
      icon: BookOpen,
      title: 'The Autumn Harvest Calendar: What to Eat This Month',
      snippet: 'Why consuming regional produce according to seasonal cycles improves gut immunity, supports local flora, and maximizes micronutrient absorption.',
      readTime: '3 min read',
      date: 'Sept 10, 2026',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=700',
    },
    {
      category: 'Sustainability Stories',
      icon: Recycle,
      title: 'Zero Plastic: Our Biodegradable Jute & Cornstarch Packaging',
      snippet: 'How Farm_lit replaced single-use plastic crate liners with compostable plant materials to divert 4 tons of landfill waste this quarter.',
      readTime: '6 min read',
      date: 'Sept 05, 2026',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=700',
    },
    {
      category: 'Healthy Recipes',
      icon: ChefHat,
      title: 'Traditional Bilona Ghee Roasted Root Vegetables',
      snippet: 'Toss mountain russet potatoes, sweet carrots, and bell peppers in pure A2 bilona cow ghee with rock salt and crushed rosemary for a wholesome supper.',
      readTime: '5 min read',
      date: 'Aug 29, 2026',
      image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=700',
    },
    {
      category: 'Farming Tips',
      icon: Sprout,
      title: 'Why Wax-Free Apples Breathe Better and Stay Truly Crisp',
      snippet: 'Commercial supermarket apples are coated with petroleum-derived shellac. Here is why our Himachal orchard growers refuse wax treatments.',
      readTime: '4 min read',
      date: 'Aug 21, 2026',
      image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=700',
    },
  ];

  return (
    <div className="bg-earth-50/40 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-100 px-3 py-1 rounded-full">
            Farm_lit Journal
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-farm-950">
            Community, Recipes & Sustainable Living
          </h1>
          <p className="text-sm text-earth-600 leading-relaxed">
            Discover seasonal recipe guides, practical urban kitchen storage tips, and updates on our direct farm-to-table initiatives.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <article
                key={idx}
                className="bg-white rounded-3xl overflow-hidden border border-earth-200 shadow-sm hover:shadow-lift hover:border-farm-300 transition-all duration-300 flex flex-col"
              >
                <div className="relative pt-[60%] bg-earth-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/95 text-farm-900 text-[11px] font-black px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
                    <Icon className="w-3.5 h-3.5 text-farm-700" />
                    <span>{item.category}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-earth-400 font-semibold mb-2">
                      <span>{item.date}</span>
                      <span>{item.readTime}</span>
                    </div>
                    <h2 className="text-base font-bold text-farm-950 leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs text-earth-600 leading-relaxed mt-2 line-clamp-3">
                      {item.snippet}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-earth-100 flex items-center justify-between text-xs font-bold text-farm-800">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}

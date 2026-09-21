import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, ChefHat, Sprout, Recycle, ArrowRight } from 'lucide-react';

export function CommunityPreview() {
  const articles = [
    {
      category: 'Healthy Recipes',
      icon: ChefHat,
      title: 'Crispy Palak & Dal Cheela with Fresh Mint Dip',
      snippet: 'A high-protein breakfast recipe highlighting hydro-washed baby spinach and stone-ground yellow lentils.',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600',
    },
    {
      category: 'Farming Tips',
      icon: Sprout,
      title: 'How Our Farmers Prevent Pests Using Organic Neem Sprays',
      snippet: 'Learn how traditional Companion Planting protects tomatoes and bell peppers without artificial synthetic chemicals.',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600',
    },
    {
      category: 'Seasonal Produce',
      icon: BookOpen,
      title: 'The Autumn Harvest Calendar: What to Eat This Month',
      snippet: 'Why consuming regional produce according to seasonal cycles improves gut immunity and maximizes micronutrient absorption.',
      readTime: '3 min read',
      image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600',
    },
    {
      category: 'Sustainability Stories',
      icon: Recycle,
      title: 'Zero Plastic: Our Biodegradable Jute & Cornstarch Packaging',
      snippet: 'How Farm_lit replaced plastic crate liners with compostable plant materials to divert 4 tons of waste this quarter.',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600',
    },
  ];

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
              Recipes, farming wisdom, seasonal produce guides, and sustainability updates.
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
          {articles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl overflow-hidden border border-earth-200 hover:border-farm-300 hover:shadow-lift transition-all duration-300 flex flex-col"
              >
                <div className="relative pt-[55%] bg-earth-100">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-farm-900 text-[10px] font-black px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Icon className="w-3 h-3 text-farm-700" />
                    <span>{item.category}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <span className="text-[10px] font-semibold text-earth-400">{item.readTime}</span>
                    <h3 className="text-sm font-bold text-farm-950 hover:text-farm-700 transition-colors line-clamp-2 mt-1">
                      <Link href="/community">{item.title}</Link>
                    </h3>
                    <p className="text-xs text-earth-500 line-clamp-2 mt-1.5 leading-relaxed">
                      {item.snippet}
                    </p>
                  </div>

                  <Link
                    href="/community"
                    className="inline-flex items-center text-xs font-bold text-farm-800 hover:text-farm-600 pt-2"
                  >
                    Read Story <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

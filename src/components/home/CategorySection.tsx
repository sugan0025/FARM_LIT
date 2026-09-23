import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/types';
import { ArrowRight } from 'lucide-react';

interface CategorySectionProps {
  categories: Category[];
}

export function CategorySection({ categories }: CategorySectionProps) {
  return (
    <section id="categories" className="scroll-mt-20 py-14 bg-earth-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-farm-700">
              Fresh From Our Growers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-farm-950 mt-1">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-farm-800 hover:text-farm-600 transition-colors mt-2 sm:mt-0"
          >
            Explore all produce <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative rounded-2xl overflow-hidden bg-white border border-earth-200 shadow-sm hover:-translate-y-2 hover:shadow-2xl hover:shadow-farm-950/15 hover:border-farm-500 transition-all duration-300 ease-out flex flex-col cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative pt-[70%] bg-earth-100 overflow-hidden">
                <Image
                  src={category.image || '/images/categories/vegetables.webp'}
                  alt={category.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-farm-950/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Title & Description */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-farm-950 group-hover:text-farm-700 transition-colors duration-200">
                    {category.name}
                  </h3>
                  {category.description && (
                    <p className="text-xs text-earth-500 line-clamp-2 mt-1 leading-relaxed">
                      {category.description}
                    </p>
                  )}
                </div>
                <div className="mt-3 flex items-center text-xs font-bold text-farm-800 group-hover:text-farm-600">
                  <span>Browse Category</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-farm-600 group-hover:text-farm-700 group-hover:translate-x-2 transition-all duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

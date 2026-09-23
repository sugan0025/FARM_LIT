import React from 'react';
import { Leaf, Award, Smartphone, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export function ValueProps() {
  const values = [
    {
      icon: Leaf,
      title: 'Fresh Products',
      description:
        'Harvested at sunrise from pesticide-monitored regional farms and delivered fresh within 24 hours without cold storage loss.',
    },
    {
      icon: Award,
      title: 'Quality You Can Trust',
      description:
        'Every vegetable, fruit, grain, and dairy item passes multi-step moisture, freshness, and pesticide residue verification tests.',
    },
    {
      icon: Smartphone,
      title: 'Easy Ordering',
      description:
        'Seamless experience on mobile, tablet, and desktop with real-time stock availability, secure checkout, and instant tracking.',
    },
    {
      icon: Clock,
      title: 'Convenient Delivery',
      description:
        'Guaranteed next-morning slots delivered with temperature-controlled eco-packaging straight to your apartment or doorstep.',
    },
  ];

  return (
    <section className="py-16 bg-white border-y border-earth-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-50 px-3 py-1 rounded-full">
            Our Farm Promise
          </span>
          <h2 className="text-3xl font-black text-farm-950 mt-3">
            Why Choose Farm_lit?
          </h2>
          <p className="text-sm text-earth-600 mt-2">
            We bridge the gap between conscientious local farmers and everyday homes seeking authentic, wholesome, chemical-free nutrition.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-earth-50/70 border border-earth-200 hover:border-farm-400 hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-farm-900/10 transition-all duration-300 ease-out flex flex-col items-center text-center space-y-3 cursor-default"
              >
                <div className="w-12 h-12 rounded-2xl bg-farm-100 text-farm-800 group-hover:bg-farm-700 group-hover:text-white group-hover:scale-110 flex items-center justify-center shadow-sm transition-all duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-farm-950 group-hover:text-farm-700 transition-colors">{item.title}</h3>
                <p className="text-xs text-earth-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

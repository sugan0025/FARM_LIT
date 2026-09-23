import React from 'react';
import { Star, MessageSquareQuote, Info } from 'lucide-react';
import { DEMO_REVIEWS } from '@/lib/products-data';

export function DemoReviews() {
  return (
    <section id="reviews" className="scroll-mt-20 py-16 bg-white border-b border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 bg-earth-100 text-earth-700 text-[11px] font-semibold px-3 py-1 rounded-full mb-2">
            <Info className="w-3.5 h-3.5 text-farm-600" />
            <span>Demonstration Customer Testimonials</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-farm-950">
            What Our Community Says
          </h2>
          <p className="text-xs sm:text-sm text-earth-500 mt-1">
            Genuine experiences from neighborhood families across Sathyamangalam, Gobichettipalayam, and Erode.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="group p-6 rounded-2xl bg-earth-50/60 border border-earth-200 hover:border-farm-400 hover:bg-white hover:-translate-y-2 hover:shadow-xl hover:shadow-farm-900/10 transition-all duration-300 ease-out flex flex-col justify-between space-y-4 cursor-default"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  {review.isDemo && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-earth-400 bg-earth-200/60 px-2 py-0.5 rounded">
                      Demo Feedback
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-earth-700 leading-relaxed italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-earth-200 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-farm-950">{review.userName}</h4>
                  <p className="text-[11px] text-earth-500">Verified Buyer • {review.productName}</p>
                </div>
                <MessageSquareQuote className="w-6 h-6 text-farm-300 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

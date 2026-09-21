'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sprout, Mail, Phone, MapPin, CheckCircle2, ArrowRight, ShieldCheck, Heart } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [msg, setMsg] = useState('');

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setMsg(data.message || 'Subscribed successfully!');
        trackEvent('newsletter_signup', { email });
        setEmail('');
      } else {
        setStatus('error');
        setMsg(data.error || 'Failed to subscribe.');
      }
    } catch {
      setStatus('error');
      setMsg('Unable to connect. Please try again later.');
    }
  };

  return (
    <footer className="bg-earth-900 text-earth-200 pt-16 pb-12 border-t border-earth-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-earth-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-farm-700 text-harvest-400 flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                FARM<span className="text-farm-400">_LIT</span>
              </span>
            </Link>
            <p className="text-sm text-earth-400 leading-relaxed max-w-sm">
              Farm_lit delivers crisp, naturally harvested vegetables, seasonal fruits, stone-ground flours, and pure grocery essentials straight from regional farms to your doorstep.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-earth-300">
              <span className="flex items-center gap-1.5 bg-earth-800/80 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-farm-400" /> 100% Quality Assured
              </span>
              <span className="flex items-center gap-1.5 bg-earth-800/80 px-3 py-1.5 rounded-full">
                <Heart className="w-4 h-4 text-harvest-400" /> Direct-from-Farmer
              </span>
            </div>
          </div>

          {/* Categories Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">Shop Produce</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/vegetables" className="hover:text-farm-300 transition-colors">
                  Fresh Vegetables
                </Link>
              </li>
              <li>
                <Link href="/categories/fruits" className="hover:text-farm-300 transition-colors">
                  Seasonal Fruits
                </Link>
              </li>
              <li>
                <Link href="/categories/grains-staples" className="hover:text-farm-300 transition-colors">
                  Grains & Staples
                </Link>
              </li>
              <li>
                <Link href="/categories/grocery-essentials" className="hover:text-farm-300 transition-colors">
                  Grocery Essentials
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-harvest-400 hover:text-harvest-300 font-semibold transition-colors">
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Company Links */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-farm-300 transition-colors">
                  About Farm_lit
                </Link>
              </li>
              <li>
                <Link href="/community" className="hover:text-farm-300 transition-colors">
                  Community & Recipes
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-farm-300 transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-farm-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-farm-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-farm-300 transition-colors">
                  Refund & Return Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-farm-300 transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase">Farm Journal</h3>
            <p className="text-xs text-earth-400">
              Get seasonal produce guides, healthy recipes, and early access to weekend harvest discounts.
            </p>
            <form onSubmit={handleNewsletter} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-earth-800 text-white placeholder-earth-500 text-xs px-3 py-2.5 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-farm-500 w-full border border-earth-700"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="bg-farm-600 hover:bg-farm-500 text-white px-3.5 py-2.5 rounded-r-lg text-xs font-bold transition-colors flex items-center justify-center shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {status === 'success' && (
                <p className="text-xs text-farm-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {msg}
                </p>
              )}
              {status === 'error' && <p className="text-xs text-red-400">{msg}</p>}
            </form>

            <div className="pt-2 text-xs text-earth-400 space-y-1">
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-farm-400" /> support@farmlit.com
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-farm-400" /> +91 8000 456 789
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-farm-400" /> Green Valley Agro Hub, Pune, India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-earth-500 gap-4">
          <p>© {new Date().getFullYear()} FARM_LIT Technologies Pvt Ltd. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/shipping-policy" className="hover:underline">
              Shipping
            </Link>
            <Link href="/refund-policy" className="hover:underline">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

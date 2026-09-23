'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, AlertCircle, Send, Instagram } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/site-config';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setStatus('success');
        setFeedback(data.message || 'Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setFeedback(data.error || 'Failed to submit message.');
      }
    } catch {
      setLoading(false);
      setStatus('error');
      setFeedback('A network error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-earth-50/40 min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-black uppercase tracking-wider text-farm-700 bg-farm-100 px-3 py-1 rounded-full">
            Customer Care
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-farm-950">
            Get in Touch with Farm_lit
          </h1>
          <p className="text-xs sm:text-sm text-earth-600">
            Have questions about morning delivery slots, produce freshness, bulk orders, or farm partnerships? We’re here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-3xl border border-earth-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-lg font-bold text-farm-950">Contact Information</h3>
              <p className="text-xs text-earth-500 mt-1">
                Reach our team Monday through Sunday from 6:00 AM to 8:00 PM.
              </p>
            </div>

            <div className="space-y-4 text-xs text-earth-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-farm-100 text-farm-700 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-farm-950">Customer Support Phone</strong>
                  <span>+91 8000 456 789 (Toll Free)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-farm-100 text-farm-700 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-farm-950">Direct Email</strong>
                  <span>support@farmlit.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-farm-100 text-farm-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-farm-950">Fulfillment Hub & Dispatch</strong>
                  <span>Green Valley Agro Logistics, Hinjawadi Phase 2, Pune, Maharashtra 411057</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-farm-100 text-farm-700 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-farm-950">Dispatch Hours</strong>
                  <span>Early Morning Express: 6:00 AM – 9:00 AM</span>
                </div>
              </div>

              <div className="pt-2 border-t border-earth-100">
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-amber-50 border border-pink-100 hover:border-pink-300 transition-all group"
                  aria-label="Follow Farm_lit on Instagram"
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 via-pink-600 to-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="block text-xs font-bold text-farm-950">Follow on Instagram</span>
                    <span className="text-[11px] text-pink-700 font-semibold truncate block">@farm_lit • Farm Stories & Daily Harvests</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-earth-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-farm-950 pb-2 border-b border-earth-100">
              Send Us a Message
            </h3>

            {status === 'success' && (
              <div className="bg-farm-50 border border-farm-200 text-farm-800 text-xs p-3.5 rounded-xl flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-farm-600 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3.5 rounded-xl flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{feedback}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Anil Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="anil@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-earth-700 mb-1">Subject *</label>
                  <input
                    type="text"
                    required
                    placeholder="Delivery slot or order question"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-earth-700 mb-1">Your Message *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can our customer service team help you?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl px-3.5 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs py-3.5 px-6 rounded-xl shadow-md transition-all disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

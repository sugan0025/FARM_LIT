import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Farm_lit',
  description: 'Farm_lit privacy policy regarding personal data collection, order fulfillment, and marketing cookies.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-earth-800">
        <div className="border-b border-earth-200 pb-6">
          <span className="text-xs font-bold text-farm-700 uppercase tracking-wider">Legal Document</span>
          <h1 className="text-3xl font-black text-farm-950 mt-1">Privacy Policy</h1>
          <p className="text-xs text-earth-500 mt-1">Last Updated: September 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">1. Information We Collect</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            When you purchase from Farm_lit or create an account, we collect necessary transactional information: full name, delivery address, phone number, and email. We do not store raw card credentials or CVV numbers; all digital payment simulations are handled via PCI-compliant security practices.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">2. UTM & Campaign Tracking</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            We employ first-touch and last-touch attribution tracking using standard UTM parameters (source, medium, campaign). These parameters are stored to understand our marketing effectiveness and ensure that promotional discount codes are honored. No unnecessary personally identifiable information is transmitted to third-party analytics.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">3. Cookies & Local Storage</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            We use secure, HTTP-only session cookies to authenticate logged-in users and browser local storage to preserve guest shopping baskets. You can clear your browser storage or cookies at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-farm-950">4. Contact & Inquiries</h2>
          <p className="text-xs sm:text-sm text-earth-600 leading-relaxed">
            For data inquiries or account deletion requests, please contact our Data Protection Officer at privacy@farmlit.com.
          </p>
        </section>
      </div>
    </div>
  );
}

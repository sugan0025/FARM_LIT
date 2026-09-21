'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, User, Mail, Phone, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    } else if (user) {
      setName(user.name);
      setPhone(user.phone || '');
    }
  }, [user, isLoading, router]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xs text-earth-500 font-bold">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-800 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
          </Link>
          <h1 className="text-3xl font-black text-farm-950">Customer Profile</h1>
          <p className="text-xs sm:text-sm text-earth-600 mt-1">
            Manage your personal details and primary contact preferences.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-sm space-y-6">
          {saved && (
            <div className="bg-farm-50 border border-farm-200 text-farm-800 text-xs p-3 rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-farm-600" />
              <span>Profile details updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-earth-700 mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
                <User className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-earth-700 mb-1">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full bg-earth-100 border border-earth-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-earth-500 cursor-not-allowed"
                />
                <Mail className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
              </div>
              <span className="text-[10px] text-earth-400 mt-1 block">
                Email address cannot be changed directly for security reasons.
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold text-earth-700 mb-1">Contact Phone</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
                />
                <Phone className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs py-3 px-6 rounded-xl shadow-sm transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

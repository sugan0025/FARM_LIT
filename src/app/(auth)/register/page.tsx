'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sprout, Lock, Mail, User, Phone, AlertCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    const res = await register(
      formData.name,
      formData.email,
      formData.password,
      formData.phone
    );
    setLoading(false);

    if (res.success) {
      router.push('/account');
    } else {
      setError(res.error || 'Failed to create account.');
    }
  };

  return (
    <div className="bg-earth-50/50 min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl border border-earth-200 p-8 sm:p-10 max-w-md w-full shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-farm-800 text-harvest-400 flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-farm-950">Join Farm_lit</h1>
          <p className="text-xs text-earth-500">
            Create an account to save favorite items, synchronize carts, and track morning orders.
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-earth-700 mb-1">Full Name *</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Ramesh Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
              />
              <User className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-earth-700 mb-1">Email Address *</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
              />
              <Mail className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-earth-700 mb-1">Phone Number</label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+91 9876543210"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
              />
              <Phone className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-earth-700 mb-1">Password (Min 8 chars) *</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
              />
              <Lock className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-farm-800 hover:bg-farm-900 text-white font-bold text-xs py-3.5 px-4 rounded-xl shadow-lift transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? <span>Creating Account...</span> : <span>Create Account</span>}
          </button>
        </form>

        <div className="text-center text-xs text-earth-500 pt-2 border-t border-earth-100">
          <span>Already have an account? </span>
          <Link href="/login" className="font-bold text-farm-800 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sprout, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/account');
    } else {
      setError(res.error || 'Failed to login. Please check credentials.');
    }
  };

  return (
    <div className="bg-earth-50/50 min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-3xl border border-earth-200 p-8 sm:p-10 max-w-md w-full shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-farm-800 text-harvest-400 flex items-center justify-center mx-auto shadow-md">
            <Sprout className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-farm-950">Welcome Back</h1>
          <p className="text-xs text-earth-500">
            Sign in to access your persistent cart, saved addresses, and order history.
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
            <label className="block text-xs font-bold text-earth-700 mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-earth-50 border border-earth-200 rounded-xl pl-9 pr-3 py-2.5 text-xs text-earth-900 focus:outline-none focus:ring-2 focus:ring-farm-600"
              />
              <Mail className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-earth-700 mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            {loading ? <span>Signing In...</span> : <span>Sign In</span>}
          </button>
        </form>

        <div className="bg-earth-50 p-3 rounded-xl border border-earth-200 text-xs text-earth-600 space-y-1">
          <p className="font-bold text-earth-900 text-[11px]">Quick Demo Credentials:</p>
          <p className="text-[11px]">Customer: <code>demo@farmlit.com</code> / <code>FarmLit2026!</code></p>
          <p className="text-[11px]">Admin: <code>admin@farmlit.com</code> / <code>FarmLit2026!</code></p>
        </div>

        <div className="text-center text-xs text-earth-500 pt-2 border-t border-earth-100">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/register" className="font-bold text-farm-800 hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

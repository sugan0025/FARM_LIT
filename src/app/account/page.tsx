'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { User, Package, MapPin, ShieldCheck, LogOut, ArrowRight, Sprout } from 'lucide-react';

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xs text-earth-500 font-bold">Loading your farm account...</div>
      </div>
    );
  }

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl border border-earth-200 p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-farm-100 text-farm-800 font-black text-2xl flex items-center justify-center border-2 border-farm-200">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-farm-950">{user.name}</h1>
                {user.role === 'ADMIN' && (
                  <span className="bg-harvest-100 text-harvest-800 font-bold text-[10px] px-2.5 py-0.5 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-earth-500">{user.email}</p>
              {user.phone && <p className="text-xs text-earth-500 mt-0.5">{user.phone}</p>}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="bg-earth-800 hover:bg-earth-900 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-harvest-400" /> Admin Panel
              </Link>
            )}
            <button
              onClick={logout}
              className="bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Orders */}
          <Link
            href="/account/orders"
            className="group bg-white rounded-2xl border border-earth-200 p-6 shadow-sm hover:border-farm-300 hover:shadow-lift transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-farm-50 text-farm-700 flex items-center justify-center">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-farm-950 group-hover:text-farm-700 transition-colors">
                Order History
              </h3>
              <p className="text-xs text-earth-500 leading-relaxed">
                Check delivery status, past produce invoices, and track morning slots.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-bold text-farm-800 group-hover:translate-x-1 transition-transform">
              View orders &rarr;
            </span>
          </Link>

          {/* Profile Details */}
          <Link
            href="/account/profile"
            className="group bg-white rounded-2xl border border-earth-200 p-6 shadow-sm hover:border-farm-300 hover:shadow-lift transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-farm-50 text-farm-700 flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-farm-950 group-hover:text-farm-700 transition-colors">
                Customer Profile
              </h3>
              <p className="text-xs text-earth-500 leading-relaxed">
                Update your contact info, primary phone number, and default delivery details.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-bold text-farm-800 group-hover:translate-x-1 transition-transform">
              Manage profile &rarr;
            </span>
          </Link>

          {/* Shop Direct */}
          <Link
            href="/shop"
            className="group bg-gradient-to-br from-farm-800 to-farm-900 text-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-harvest-300 flex items-center justify-center">
                <Sprout className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Daily Farm Basket</h3>
              <p className="text-xs text-farm-100/90 leading-relaxed">
                Browse today’s morning harvest of fresh leafy vegetables and seasonal fruits.
              </p>
            </div>
            <span className="inline-flex items-center text-xs font-bold text-harvest-300 group-hover:translate-x-1 transition-transform">
              Order fresh produce &rarr;
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

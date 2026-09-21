'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Package, Truck, ArrowLeft, ArrowRight, Calendar, ShoppingBag } from 'lucide-react';

export default function OrderHistoryPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [orders, setOrders] = useState([
    {
      id: 'ord-demo-1',
      orderNumber: 'FL-2026-894215',
      date: '2026-09-20',
      total: 485,
      status: 'DELIVERED',
      paymentMethod: 'COD',
      items: [
        { name: 'Crisp Baby Spinach (Palak)', quantity: 2, price: 45, unit: '250g' },
        { name: 'Vine-Ripened Hybrid Tomatoes', quantity: 2, price: 42, unit: 'kg' },
        { name: 'Himachal Royal Gala Crisp Apples', quantity: 1, price: 180, unit: 'kg' },
        { name: 'Pure Raw Wildflower Honey', quantity: 1, price: 320, unit: '500g' },
      ],
    },
  ]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xs text-earth-500 font-bold">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="bg-earth-50/40 min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-800 hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Account
          </Link>
          <h1 className="text-3xl font-black text-farm-950">My Order History</h1>
          <p className="text-xs sm:text-sm text-earth-600 mt-1">
            Track previous orders, delivery windows, and item invoices.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-earth-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-farm-50 text-farm-700 flex items-center justify-center mx-auto">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-farm-950">No orders placed yet</h3>
            <p className="text-xs text-earth-500 max-w-sm mx-auto">
              You haven’t ordered any fresh farm produce with this account yet.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-farm-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm"
            >
              Start Shopping <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord.id}
                className="bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm"
              >
                {/* Header */}
                <div className="bg-earth-50/80 px-6 py-4 border-b border-earth-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-earth-400 block text-[10px] uppercase font-bold">Order ID</span>
                      <strong className="font-mono font-bold text-farm-950">{ord.orderNumber}</strong>
                    </div>
                    <div>
                      <span className="text-earth-400 block text-[10px] uppercase font-bold">Order Date</span>
                      <span className="text-earth-700 font-semibold">{ord.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="bg-farm-100 text-farm-800 font-bold px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" /> {ord.status}
                    </span>
                    <strong className="text-sm font-black text-farm-950">₹{ord.total}</strong>
                  </div>
                </div>

                {/* Items */}
                <div className="p-6 divide-y divide-earth-100">
                  {ord.items.map((item, i) => (
                    <div key={i} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-farm-50 text-farm-800 font-bold flex items-center justify-center text-[11px]">
                          {item.quantity}×
                        </span>
                        <span className="font-bold text-earth-900">{item.name}</span>
                        <span className="text-earth-400">({item.unit})</span>
                      </div>
                      <span className="font-bold text-farm-950">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '@/lib/products-data';
import { Product } from '@/types';
import {
  ShieldCheck,
  Package,
  ShoppingBag,
  TrendingUp,
  AlertTriangle,
  Plus,
  RefreshCw,
  Edit2,
  Trash2,
  CheckCircle2,
  BarChart3,
  ArrowLeft,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'attribution'>('products');
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [stockVal, setStockVal] = useState<number>(0);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Simulated recent orders with attribution
  const [orders, setOrders] = useState([
    {
      id: 'ord-101',
      orderNumber: 'FL-2026-904123',
      customer: 'Amit Patel',
      total: 620,
      status: 'PROCESSING',
      date: '2026-09-21 08:30 AM',
      campaign: 'weekend_harvest_2026',
      source: 'instagram',
    },
    {
      id: 'ord-102',
      orderNumber: 'FL-2026-894120',
      customer: 'Sunita Mehra',
      total: 380,
      status: 'SHIPPED',
      date: '2026-09-20 04:15 PM',
      campaign: 'google_organic_greens',
      source: 'google',
    },
    {
      id: 'ord-103',
      orderNumber: 'FL-2026-778231',
      customer: 'Karthik Raja',
      total: 1250,
      status: 'DELIVERED',
      date: '2026-09-19 11:00 AM',
      campaign: 'whatsapp_direct_promo',
      source: 'whatsapp',
    },
  ]);

  useEffect(() => {
    if (!isLoading && (!user || user.role !== 'ADMIN')) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-xs text-earth-500 font-bold">Verifying Administrator privileges...</div>
      </div>
    );
  }

  const handleUpdateStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, stockQuantity: stockVal } : p))
    );
    setEditingStockId(null);
    setActionSuccess('Stock quantity updated successfully');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleToggleActive = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, isActive: !p.isActive } : p))
    );
    setActionSuccess('Product active status changed');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    setActionSuccess(`Order status changed to ${newStatus}`);
    setTimeout(() => setActionSuccess(null), 3000);
  };

  return (
    <div className="bg-earth-50/50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-harvest-100 text-harvest-800 text-xs font-black px-3 py-1 rounded-full uppercase">
                Staff Control
              </span>
              <span className="text-xs text-earth-500">Authorized as {user.name}</span>
            </div>
            <h1 className="text-3xl font-black text-farm-950 mt-1 flex items-center gap-2.5">
              <ShieldCheck className="w-8 h-8 text-farm-700" />
              Farm_lit Store Operations
            </h1>
          </div>
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-farm-800 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Customer View
          </Link>
        </div>

        {actionSuccess && (
          <div className="bg-farm-50 border border-farm-200 text-farm-800 text-xs p-3 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-farm-600" />
            <span>{actionSuccess}</span>
          </div>
        )}

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-earth-200 shadow-sm">
            <span className="text-xs text-earth-400 font-bold uppercase">Total Products</span>
            <p className="text-2xl font-black text-farm-950 mt-1">{products.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-earth-200 shadow-sm">
            <span className="text-xs text-earth-400 font-bold uppercase">Low Stock Alerts</span>
            <p className="text-2xl font-black text-amber-600 mt-1">
              {products.filter((p) => p.stockQuantity <= 30).length} items
            </p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-earth-200 shadow-sm">
            <span className="text-xs text-earth-400 font-bold uppercase">Active Orders</span>
            <p className="text-2xl font-black text-farm-700 mt-1">{orders.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-earth-200 shadow-sm">
            <span className="text-xs text-earth-400 font-bold uppercase">Campaign Hits</span>
            <p className="text-2xl font-black text-purple-700 mt-1">3 Active UTMs</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-earth-200 text-xs font-bold gap-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'products'
                ? 'border-farm-700 text-farm-900'
                : 'border-transparent text-earth-500 hover:text-earth-800'
            }`}
          >
            Produce Catalog & Inventory
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'orders'
                ? 'border-farm-700 text-farm-900'
                : 'border-transparent text-earth-500 hover:text-earth-800'
            }`}
          >
            Orders Fulfillment
          </button>
          <button
            onClick={() => setActiveTab('attribution')}
            className={`pb-3 transition-colors border-b-2 ${
              activeTab === 'attribution'
                ? 'border-farm-700 text-farm-900'
                : 'border-transparent text-earth-500 hover:text-earth-800'
            }`}
          >
            Campaign & UTM Attribution
          </button>
        </div>

        {/* Tab 1: Products Inventory */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-earth-100 flex items-center justify-between text-xs">
              <span className="font-bold text-farm-950">Produce Inventory List</span>
              <span className="text-earth-400">Showing {products.length} catalog items</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-earth-50 text-earth-500 border-b border-earth-200">
                  <tr>
                    <th className="p-3">Product Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3">Stock Units</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-100">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-earth-50/50">
                      <td className="p-3 font-bold text-farm-950">
                        {p.name}
                        <span className="block text-[10px] text-earth-400 font-normal">
                          SKU: {p.SKU}
                        </span>
                      </td>
                      <td className="p-3 text-earth-600">{p.category?.name || 'Produce'}</td>
                      <td className="p-3 font-bold">₹{p.price}/{p.unit}</td>
                      <td className="p-3">
                        {editingStockId === p.id ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={stockVal}
                              onChange={(e) => setStockVal(Number(e.target.value))}
                              className="w-16 border border-earth-300 rounded px-1.5 py-0.5 text-xs"
                            />
                            <button
                              onClick={() => handleUpdateStock(p.id)}
                              className="bg-farm-700 text-white px-2 py-0.5 rounded text-[10px] font-bold"
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className={p.stockQuantity <= 15 ? 'text-red-600 font-bold' : ''}>
                              {p.stockQuantity} {p.unit}
                            </span>
                            <button
                              onClick={() => {
                                setEditingStockId(p.id);
                                setStockVal(p.stockQuantity);
                              }}
                              className="text-[10px] text-farm-700 hover:underline"
                            >
                              Edit
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.isActive ? 'bg-farm-100 text-farm-800' : 'bg-earth-200 text-earth-600'
                          }`}
                        >
                          {p.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleToggleActive(p.id)}
                          className="text-[11px] text-earth-500 hover:text-earth-900 font-semibold"
                        >
                          {p.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Orders Fulfillment */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-earth-200 overflow-hidden shadow-sm">
            <div className="p-4 border-b border-earth-100 text-xs font-bold text-farm-950">
              Customer Morning Delivery Orders
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-earth-50 text-earth-500 border-b border-earth-200">
                  <tr>
                    <th className="p-3">Order Number</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Total Amount</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Fulfillment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-earth-100">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-earth-50/50">
                      <td className="p-3 font-mono font-bold text-farm-950">{o.orderNumber}</td>
                      <td className="p-3 text-earth-800 font-medium">{o.customer}</td>
                      <td className="p-3 font-bold text-farm-950">₹{o.total}</td>
                      <td className="p-3 text-earth-500">{o.date}</td>
                      <td className="p-3">
                        <span className="bg-farm-100 text-farm-800 font-bold px-2 py-0.5 rounded text-[10px]">
                          {o.status}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        <select
                          value={o.status}
                          onChange={(e) => handleUpdateOrderStatus(o.id, e.target.value)}
                          className="bg-earth-50 border border-earth-200 rounded text-[11px] p-1 text-earth-800"
                        >
                          <option value="PENDING">PENDING</option>
                          <option value="PROCESSING">PROCESSING</option>
                          <option value="SHIPPED">SHIPPED</option>
                          <option value="DELIVERED">DELIVERED</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Campaign & UTM Attribution */}
        {activeTab === 'attribution' && (
          <div className="bg-white rounded-2xl border border-earth-200 p-6 space-y-6 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-farm-950">Marketing & Campaign Attribution</h3>
              <p className="text-xs text-earth-500 mt-0.5">
                First-touch and last-touch UTM parameters captured from visitor acquisition channels.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-200">
                <span className="font-bold text-purple-900 block">Instagram Bio Campaign</span>
                <span className="text-purple-600 block text-[11px]">utm_campaign=weekend_harvest_2026</span>
                <p className="text-xl font-black text-purple-950 mt-2">₹14,500 Revenue</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
                <span className="font-bold text-blue-900 block">Google Search Organic</span>
                <span className="text-blue-600 block text-[11px]">utm_source=google&utm_medium=cpc</span>
                <p className="text-xl font-black text-blue-950 mt-2">₹22,100 Revenue</p>
              </div>
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block">WhatsApp Direct Broadcast</span>
                <span className="text-emerald-600 block text-[11px]">utm_medium=chat&source=whatsapp</span>
                <p className="text-xl font-black text-emerald-950 mt-2">₹8,900 Revenue</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingBag,
  User as UserIcon,
  Search,
  Menu,
  X,
  Sprout,
  Percent,
  BookOpen,
  Phone,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Package,
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { trackEvent } from '@/lib/analytics';

export function Header() {
  const router = useRouter();
  const { totals, openCart } = useCart();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      trackEvent('search', { query: searchQuery.trim() });
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-farm-900 text-white text-xs py-1.5 px-4 text-center font-medium flex items-center justify-center gap-2">
        <span className="bg-harvest-500 text-slate-900 text-[10px] uppercase font-bold px-2 py-0.5 rounded-full">
          Fresh Harvest
        </span>
        <span>
          Free Delivery on all orders above ₹499! Use coupon{' '}
          <strong className="text-harvest-400 font-bold">FARMFRESH10</strong> for 10% OFF.
        </span>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-earth-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-farm-600 rounded-lg p-1"
            >
              <div className="w-10 h-10 rounded-xl bg-farm-800 text-harvest-400 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-farm-950 flex items-center">
                  FARM<span className="text-farm-600">_LIT</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-earth-500 font-semibold -mt-1">
                  Fresh • Natural • Daily
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-6 text-sm font-semibold text-earth-700">
              <Link
                href="/"
                className="px-3 py-2 rounded-md hover:text-farm-700 hover:bg-farm-50 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/shop"
                className="px-3 py-2 rounded-md hover:text-farm-700 hover:bg-farm-50 transition-colors"
              >
                Shop
              </Link>
              <div className="relative group">
                <button
                  type="button"
                  className="flex items-center gap-1 px-3 py-2 rounded-md hover:text-farm-700 hover:bg-farm-50 transition-colors"
                >
                  Categories <ChevronDown className="w-4 h-4 text-earth-400 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-earth-100 py-2 hidden group-hover:block transition-all z-50">
                  <Link
                    href="/categories/vegetables"
                    className="block px-4 py-2 text-sm text-earth-700 hover:bg-farm-50 hover:text-farm-800"
                  >
                    🥬 Fresh Vegetables
                  </Link>
                  <Link
                    href="/categories/fruits"
                    className="block px-4 py-2 text-sm text-earth-700 hover:bg-farm-50 hover:text-farm-800"
                  >
                    🍎 Seasonal Fruits
                  </Link>
                  <Link
                    href="/categories/grains-staples"
                    className="block px-4 py-2 text-sm text-earth-700 hover:bg-farm-50 hover:text-farm-800"
                  >
                    🌾 Grains & Staples
                  </Link>
                  <Link
                    href="/categories/grocery-essentials"
                    className="block px-4 py-2 text-sm text-earth-700 hover:bg-farm-50 hover:text-farm-800"
                  >
                    🍯 Grocery Essentials
                  </Link>
                </div>
              </div>
              <Link
                href="/offers"
                className="flex items-center gap-1 px-3 py-2 rounded-md text-harvest-600 hover:text-harvest-700 hover:bg-harvest-50 transition-colors"
              >
                <Percent className="w-3.5 h-3.5" /> Offers
              </Link>
              <Link
                href="/community"
                className="px-3 py-2 rounded-md hover:text-farm-700 hover:bg-farm-50 transition-colors"
              >
                Community
              </Link>
              <Link
                href="/contact"
                className="px-3 py-2 rounded-md hover:text-farm-700 hover:bg-farm-50 transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Search Bar (Desktop) */}
            <form
              onSubmit={handleSearch}
              className="hidden lg:flex items-center relative max-w-xs w-full"
            >
              <input
                type="text"
                placeholder="Search fresh greens, apples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-earth-100/80 border border-earth-200 text-earth-800 text-sm rounded-full pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-farm-600 focus:bg-white transition-all"
              />
              <Search className="w-4 h-4 text-earth-400 absolute left-3 pointer-events-none" />
            </form>

            {/* Right Action Icons: Account & Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Account Dropdown */}
              <div className="relative">
                {user ? (
                  <button
                    onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                    className="flex items-center gap-1.5 p-2 rounded-full hover:bg-farm-50 text-earth-700 hover:text-farm-800 transition-colors"
                    aria-label="User Account"
                  >
                    <div className="w-8 h-8 rounded-full bg-farm-100 text-farm-800 font-bold flex items-center justify-center text-xs">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="hidden sm:inline text-xs font-semibold max-w-[80px] truncate">
                      {user.name}
                    </span>
                    <ChevronDown className="w-3.5 h-3.5 text-earth-400" />
                  </button>
                ) : (
                  <Link
                    href="/login"
                    className="flex items-center gap-1.5 p-2 rounded-full hover:bg-farm-50 text-earth-700 hover:text-farm-800 transition-colors"
                    aria-label="Login or Register"
                  >
                    <UserIcon className="w-5 h-5" />
                    <span className="hidden sm:inline text-xs font-semibold">Sign In</span>
                  </Link>
                )}

                {/* Account Menu Popup */}
                {user && accountMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-earth-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-100"
                    onMouseLeave={() => setAccountMenuOpen(false)}
                  >
                    <div className="px-4 py-2 border-b border-earth-100">
                      <p className="text-xs font-medium text-earth-500">Signed in as</p>
                      <p className="text-sm font-bold text-farm-950 truncate">{user.email}</p>
                      {user.role === 'ADMIN' && (
                        <span className="inline-block bg-harvest-100 text-harvest-800 text-[10px] font-bold px-2 py-0.5 rounded mt-1">
                          Admin Staff
                        </span>
                      )}
                    </div>
                    <Link
                      href="/account"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-earth-700 hover:bg-farm-50 hover:text-farm-800"
                    >
                      <UserIcon className="w-4 h-4 text-earth-400" /> My Profile
                    </Link>
                    <Link
                      href="/account/orders"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-earth-700 hover:bg-farm-50 hover:text-farm-800"
                    >
                      <Package className="w-4 h-4 text-earth-400" /> My Orders
                    </Link>
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setAccountMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-earth-700 hover:bg-farm-50 hover:text-farm-800"
                      >
                        <ShieldCheck className="w-4 h-4 text-earth-400" /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <button
                id="cart-trigger-button"
                onClick={openCart}
                className="relative flex items-center gap-2 p-2 sm:px-3 sm:py-2 rounded-full bg-farm-50 text-farm-900 hover:bg-farm-100 hover:text-farm-950 transition-all group"
                aria-label={`Shopping cart with ${totals.itemCount} items`}
              >
                <ShoppingBag className="w-5 h-5 text-farm-700 group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline text-xs font-bold">
                  {totals.subtotal > 0 ? `₹${totals.subtotal}` : 'Cart'}
                </span>
                {totals.itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 sm:top-1 sm:right-1 bg-harvest-500 text-slate-900 font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow">
                    {totals.itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Hamburger Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 md:hidden text-earth-700 hover:text-farm-800 rounded-lg focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-earth-200 bg-white px-4 pt-3 pb-6 space-y-3">
            {/* Mobile Search Input */}
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="Search farm produce..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-earth-100 border border-earth-200 text-sm rounded-lg pl-9 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-farm-600"
              />
              <Search className="w-4 h-4 text-earth-400 absolute left-3 top-3 pointer-events-none" />
            </form>

            <div className="grid grid-cols-2 gap-2 pt-2 text-sm font-semibold">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-earth-50 hover:bg-farm-50 text-earth-800"
              >
                🌱 Home
              </Link>
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-earth-50 hover:bg-farm-50 text-earth-800"
              >
                🛍️ All Produce
              </Link>
              <Link
                href="/categories/vegetables"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-earth-50 hover:bg-farm-50 text-earth-800"
              >
                🥬 Vegetables
              </Link>
              <Link
                href="/categories/fruits"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-earth-50 hover:bg-farm-50 text-earth-800"
              >
                🍎 Fruits
              </Link>
              <Link
                href="/categories/grains-staples"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-earth-50 hover:bg-farm-50 text-earth-800"
              >
                🌾 Grains & Staples
              </Link>
              <Link
                href="/categories/grocery-essentials"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-earth-50 hover:bg-farm-50 text-earth-800"
              >
                🍯 Essentials
              </Link>
              <Link
                href="/offers"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-harvest-50 text-harvest-700 font-bold"
              >
                🏷️ Deals & Offers
              </Link>
              <Link
                href="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-earth-50 hover:bg-farm-50 text-earth-800"
              >
                📖 Community
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="p-2.5 rounded-lg bg-earth-50 hover:bg-farm-50 text-earth-800"
              >
                📞 Contact Us
              </Link>
              {user ? (
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-farm-100 text-farm-900 font-bold"
                >
                  👤 My Account
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2.5 rounded-lg bg-farm-800 text-white font-bold text-center"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}

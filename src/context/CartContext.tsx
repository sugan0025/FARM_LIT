'use client';

import React, { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { Product, CartItem, CartTotals, Coupon } from '@/types';
import { calculateCartTotals, isValidQuantity } from '@/lib/cart-calculations';
import { trackEvent } from '@/lib/analytics';
import { useAuth } from './AuthContext';

interface CartContextType {
  items: CartItem[];
  totals: CartTotals;
  appliedCoupon: Coupon | null;
  isCartOpen: boolean;
  isLoading: boolean;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCoupon: () => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = 'farmlit_guest_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Synchronize cart with server when user logs in
  const syncWithServer = useCallback(async (localItems: CartItem[]) => {
    try {
      const res = await fetch('/api/cart/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: localItems.map((i) => ({
            productId: i.productId,
            quantity: i.quantity,
          })),
        }),
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.items)) {
          setItems(data.items);
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      }
    } catch {
      // Keep local items if network fails
    }
  }, []);

  // Initial load
  useEffect(() => {
    const initCart = async () => {
      setIsLoading(true);
      if (user) {
        // Authenticated user: fetch cart from server
        try {
          const res = await fetch('/api/cart');
          if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.items) && data.items.length > 0) {
              setItems(data.items);
              setIsLoading(false);
              return;
            }
          }
        } catch {
          // Fallback to local
        }
      }

      // Guest or server fallback: read localStorage
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setItems(parsed);
          }
        }
      } catch {
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    initCart();
  }, [user]);

  // Listen for user login event to trigger immediate merge
  useEffect(() => {
    const handleLoginEvent = () => {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        const guestItems: CartItem[] = stored ? JSON.parse(stored) : items;
        syncWithServer(guestItems);
      } catch {
        syncWithServer(items);
      }
    };

    window.addEventListener('farmlit:user-login', handleLoginEvent);
    return () => window.removeEventListener('farmlit:user-login', handleLoginEvent);
  }, [items, syncWithServer]);

  // Persist items to localStorage (for guests) and debounced server sync (for auth)
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch {
        // LocalStorage quota or access issue
      }
    } else {
      // Sync active state with server
      const timer = setTimeout(() => {
        fetch('/api/cart', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
          }),
        }).catch(() => {});
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [items, user, isLoading]);

  // Calculate totals
  const totals = useMemo(() => {
    const rawItems = items.map((i) => ({
      price: i.product.price,
      quantity: i.quantity,
    }));
    return calculateCartTotals(rawItems, appliedCoupon);
  }, [items, appliedCoupon]);

  const addToCart = useCallback((product: Product, quantity = 1) => {
    if (!product || !product.id) return;
    if (product.stockQuantity <= 0) return;

    const safeQty = Math.max(1, Math.min(product.stockQuantity, Math.floor(quantity)));

    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.productId === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = Math.min(
          product.stockQuantity,
          updated[existingIndex].quantity + safeQty
        );
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        return [...prev, { productId: product.id, product, quantity: safeQty }];
      }
    });

    trackEvent('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      quantity: safeQty,
      category: product.category?.name || product.categoryId,
    });

    setIsCartOpen(true);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (!isValidQuantity(quantity)) {
      if (quantity <= 0) {
        removeFromCart(productId);
      }
      return;
    }

    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (!existing) return prev;

      // Bound by stock
      const safeQty = Math.min(existing.product.stockQuantity, quantity);
      return prev.map((item) =>
        item.productId === productId ? { ...item, quantity: safeQty } : item
      );
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        trackEvent('remove_from_cart', {
          product_id: productId,
          product_name: existing.product.name,
          price: existing.product.price,
          quantity: existing.quantity,
        });
      }
      return prev.filter((item) => item.productId !== productId);
    });
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
    if (!user) {
      localStorage.removeItem(CART_STORAGE_KEY);
    } else {
      fetch('/api/cart', { method: 'DELETE' }).catch(() => {});
    }
  }, [user]);

  const applyCoupon = useCallback(
    async (code: string): Promise<{ success: boolean; message: string }> => {
      const cleanCode = code.trim().toUpperCase();
      if (!cleanCode) {
        return { success: false, message: 'Please enter a coupon code' };
      }

      try {
        const res = await fetch('/api/coupons/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code: cleanCode, subtotal: totals.subtotal }),
        });

        const data = await res.json();
        if (!res.ok || !data.valid) {
          return { success: false, message: data.message || 'Invalid or expired coupon' };
        }

        setAppliedCoupon(data.coupon);
        return { success: true, message: `Coupon applied: ${data.coupon.description}` };
      } catch {
        return { success: false, message: 'Could not validate coupon code' };
      }
    },
    [totals.subtotal]
  );

  const removeCoupon = useCallback(() => {
    setAppliedCoupon(null);
  }, []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  return (
    <CartContext.Provider
      value={{
        items,
        totals,
        appliedCoupon,
        isCartOpen,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyCoupon,
        removeCoupon,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

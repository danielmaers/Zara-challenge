"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem } from "@/types";

interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartId">) => void;
  removeItem: (cartId: string) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "zara-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // localStorage not available
    }
  }, []);

  const persist = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
    } catch {
      // localStorage not available
    }
  }, []);

  const addItem = useCallback(
    (item: Omit<CartItem, "cartId">) => {
      const cartId = `${item.phoneId}-${item.colorName}-${item.storageCapacity}-${Date.now()}`;
      persist([...items, { ...item, cartId }]);
    },
    [items, persist]
  );

  const removeItem = useCallback(
    (cartId: string) => {
      persist(items.filter((i) => i.cartId !== cartId));
    },
    [items, persist]
  );

  const totalItems = items.length;
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

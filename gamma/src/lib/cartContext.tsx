import type React from "react";
import { createContext, useContext, useState } from "react";

export type CartItem = {
  name: string;
  price: string;
  img: string;
  qty: number;
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (name: string) => void;
  updateQty: (name: string, qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  function addToCart(item: Omit<CartItem, "qty">) {
    setItems((prev) => {
      const found = prev.find((i) => i.name === item.name);
      if (found) {
        return prev.map((i) => i.name === item.name ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }
  function removeFromCart(name: string) {
    setItems(items => items.filter(i => i.name !== name));
  }
  function updateQty(name: string, qty: number) {
    setItems(items => items.map(i => i.name === name ? { ...i, qty } : i));
  }
  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

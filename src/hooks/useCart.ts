import { useMemo, useState, useCallback } from "react";
import { MenuItem } from "@/data/menu";

export type CartItem = MenuItem & { qty: number };

export const useCart = () => {
  const [items, setItems] = useState<CartItem[]>([]);

  const add = useCallback((item: MenuItem, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) return prev.map((p) => (p.id === item.id ? { ...p, qty: p.qty + qty } : p));
      return [...prev, { ...item, qty }];
    });
  }, []);

  const inc = useCallback((id: string) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  }, []);

  const dec = useCallback((id: string) => {
    setItems((prev) =>
      prev.flatMap((p) => (p.id === id ? (p.qty > 1 ? [{ ...p, qty: p.qty - 1 }] : []) : [p]))
    );
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);

  return { items, add, inc, dec, remove, clear, total, count };
};

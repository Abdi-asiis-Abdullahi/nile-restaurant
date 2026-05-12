import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { menu as defaultMenu, MenuItem } from "@/data/menu";

const STORAGE_KEY = "nile_menu_v2";

type Ctx = {
  items: MenuItem[];
  addItem: (item: Omit<MenuItem, "id"> & { id?: string }) => void;
  updateItem: (id: string, patch: Partial<MenuItem>) => void;
  deleteItem: (id: string) => void;
  /** Cascade: rename group on all items */
  renameGroupOnItems: (oldName: string, newName: string) => void;
  /** Cascade: rename category on all items */
  renameCategoryOnItems: (groupName: string, oldName: string, newName: string) => void;
  /** Cascade: delete all items in a group */
  deleteItemsInGroup: (groupName: string) => void;
  /** Cascade: delete all items in a category */
  deleteItemsInCategory: (groupName: string, categoryName: string) => void;
  resetToDefault: () => void;
};

const MenuContext = createContext<Ctx | null>(null);

export const MenuProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<MenuItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return defaultMenu;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem: Ctx["addItem"] = useCallback((item) => {
    const id = item.id || `custom-${Date.now()}`;
    setItems((prev) => [{ ...item, id } as MenuItem, ...prev]);
  }, []);

  const updateItem: Ctx["updateItem"] = useCallback((id, patch) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const deleteItem: Ctx["deleteItem"] = useCallback((id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const renameGroupOnItems = useCallback((oldName: string, newName: string) => {
    setItems((prev) => prev.map((p) => (p.group === oldName ? { ...p, group: newName } : p)));
  }, []);

  const renameCategoryOnItems = useCallback((groupName: string, oldName: string, newName: string) => {
    setItems((prev) =>
      prev.map((p) => (p.group === groupName && p.category === oldName ? { ...p, category: newName } : p))
    );
  }, []);

  const deleteItemsInGroup = useCallback((groupName: string) => {
    setItems((prev) => prev.filter((p) => p.group !== groupName));
  }, []);

  const deleteItemsInCategory = useCallback((groupName: string, categoryName: string) => {
    setItems((prev) => prev.filter((p) => !(p.group === groupName && p.category === categoryName)));
  }, []);

  const resetToDefault = useCallback(() => setItems(defaultMenu), []);

  return (
    <MenuContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        deleteItem,
        renameGroupOnItems,
        renameCategoryOnItems,
        deleteItemsInGroup,
        deleteItemsInCategory,
        resetToDefault,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error("useMenu must be used within MenuProvider");
  return ctx;
};

export type { MenuItem };

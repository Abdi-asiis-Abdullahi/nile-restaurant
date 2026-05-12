import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { defaultTaxonomy, TaxonomyGroup } from "@/data/menu";

const STORAGE_KEY = "nile_taxonomy_v1";

type Ctx = {
  groups: TaxonomyGroup[];
  addGroup: (name: string) => void;
  renameGroup: (id: string, name: string) => string | null; // returns oldName for cascading
  deleteGroup: (id: string) => string | null; // returns name for cascade
  reorderGroup: (id: string, dir: -1 | 1) => void;
  addCategory: (groupId: string, name: string) => void;
  renameCategory: (groupId: string, catId: string, name: string) => { oldName: string; groupName: string } | null;
  deleteCategory: (groupId: string, catId: string) => { name: string; groupName: string } | null;
  reorderCategory: (groupId: string, catId: string, dir: -1 | 1) => void;
  reset: () => void;
};

const TaxonomyContext = createContext<Ctx | null>(null);

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const TaxonomyProvider = ({ children }: { children: ReactNode }) => {
  const [groups, setGroups] = useState<TaxonomyGroup[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch {}
    return defaultTaxonomy;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(groups));
    } catch {}
  }, [groups]);

  const addGroup = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setGroups((prev) => [...prev, { id: `g-${slug(trimmed)}-${Date.now()}`, name: trimmed, categories: [] }]);
  }, []);

  const renameGroup = useCallback((id: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    let oldName: string | null = null;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== id) return g;
        oldName = g.name;
        return { ...g, name: trimmed };
      })
    );
    return oldName;
  }, []);

  const deleteGroup = useCallback((id: string) => {
    let name: string | null = null;
    setGroups((prev) => {
      const found = prev.find((g) => g.id === id);
      if (found) name = found.name;
      return prev.filter((g) => g.id !== id);
    });
    return name;
  }, []);

  const reorderGroup = useCallback((id: string, dir: -1 | 1) => {
    setGroups((prev) => {
      const idx = prev.findIndex((g) => g.id === id);
      const next = idx + dir;
      if (idx < 0 || next < 0 || next >= prev.length) return prev;
      const arr = [...prev];
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return arr;
    });
  }, []);

  const addCategory = useCallback((groupId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, categories: [...g.categories, { id: `c-${slug(trimmed)}-${Date.now()}`, name: trimmed }] }
          : g
      )
    );
  }, []);

  const renameCategory = useCallback((groupId: string, catId: string, name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    let result: { oldName: string; groupName: string } | null = null;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        return {
          ...g,
          categories: g.categories.map((c) => {
            if (c.id !== catId) return c;
            result = { oldName: c.name, groupName: g.name };
            return { ...c, name: trimmed };
          }),
        };
      })
    );
    return result;
  }, []);

  const deleteCategory = useCallback((groupId: string, catId: string) => {
    let result: { name: string; groupName: string } | null = null;
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const cat = g.categories.find((c) => c.id === catId);
        if (cat) result = { name: cat.name, groupName: g.name };
        return { ...g, categories: g.categories.filter((c) => c.id !== catId) };
      })
    );
    return result;
  }, []);

  const reorderCategory = useCallback((groupId: string, catId: string, dir: -1 | 1) => {
    setGroups((prev) =>
      prev.map((g) => {
        if (g.id !== groupId) return g;
        const idx = g.categories.findIndex((c) => c.id === catId);
        const next = idx + dir;
        if (idx < 0 || next < 0 || next >= g.categories.length) return g;
        const arr = [...g.categories];
        [arr[idx], arr[next]] = [arr[next], arr[idx]];
        return { ...g, categories: arr };
      })
    );
  }, []);

  const reset = useCallback(() => setGroups(defaultTaxonomy), []);

  return (
    <TaxonomyContext.Provider
      value={{
        groups,
        addGroup,
        renameGroup,
        deleteGroup,
        reorderGroup,
        addCategory,
        renameCategory,
        deleteCategory,
        reorderCategory,
        reset,
      }}
    >
      {children}
    </TaxonomyContext.Provider>
  );
};

export const useTaxonomy = () => {
  const ctx = useContext(TaxonomyContext);
  if (!ctx) throw new Error("useTaxonomy must be used within TaxonomyProvider");
  return ctx;
};

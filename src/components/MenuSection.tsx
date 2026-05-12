import { useEffect, useMemo, useState } from "react";
import { MenuItem } from "@/data/menu";
import { useMenu } from "@/hooks/useMenu";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import MenuCard from "./MenuCard";
import { cn } from "@/lib/utils";

interface Props {
  onAdd: (item: MenuItem, qty: number) => void;
}

const ALL = "All";

const MenuSection = ({ onAdd }: Props) => {
  const { groups } = useTaxonomy();
  const { items: menu } = useMenu();
  const [group, setGroup] = useState<string>(ALL);
  const [active, setActive] = useState<string>(ALL);

  // Reset sub-filter when group changes or when group no longer exists
  useEffect(() => {
    if (group !== ALL && !groups.find((g) => g.name === group)) {
      setGroup(ALL);
      setActive(ALL);
    }
  }, [groups, group]);

  const groupTabs = [ALL, ...groups.map((g) => g.name)];

  const subFilters = useMemo(() => {
    if (group === ALL) return [];
    const g = groups.find((x) => x.name === group);
    if (!g) return [];
    return [ALL, ...g.categories.map((c) => c.name)];
  }, [group, groups]);

  const items = useMemo(() => {
    let list = menu;
    if (group !== ALL) list = list.filter((m) => m.group === group);
    if (active !== ALL) list = list.filter((m) => m.category === active);
    return list;
  }, [group, active, menu]);

  const handleGroup = (g: string) => {
    setGroup(g);
    setActive(ALL);
  };

  return (
    <section id="menu" className="py-24 md:py-32">
      <div className="container">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.3em] text-primary text-xs mb-3">Our Menu</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Crafted with <span className="text-gradient-gold">Passion</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Browse our handpicked selection of foods, drinks and desserts.
          </p>
        </div>

        {/* Main group tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {groupTabs.map((g) => (
            <button
              key={g}
              onClick={() => handleGroup(g)}
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-semibold border transition-smooth",
                group === g
                  ? "gradient-gold text-primary-foreground border-transparent shadow-gold"
                  : "border-border text-muted-foreground hover:text-primary hover:border-primary/40"
              )}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Sub-category filters */}
        {subFilters.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-12 animate-float-in">
            {subFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={cn(
                  "px-4 py-1.5 rounded-full text-xs font-medium border transition-smooth",
                  active === f
                    ? "bg-primary/10 text-primary border-primary/40"
                    : "border-border/60 text-muted-foreground hover:text-primary hover:border-primary/30"
                )}
              >
                {f}
              </button>
            ))}
          </div>
        )}

        {subFilters.length === 0 && <div className="mb-6" />}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} onAdd={onAdd} />
          ))}
        </div>

        {items.length === 0 && (
          <p className="text-center text-muted-foreground mt-10">No items found in this category.</p>
        )}
      </div>
    </section>
  );
};

export default MenuSection;

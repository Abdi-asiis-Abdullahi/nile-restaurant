import { useState } from "react";
import { Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MenuItem } from "@/data/menu";

interface Props {
  item: MenuItem;
  onAdd: (item: MenuItem, qty: number) => void;
}

const MenuCard = ({ item, onAdd }: Props) => {
  const [qty, setQty] = useState(1);

  return (
    <article className="group relative gradient-card rounded-2xl overflow-hidden border border-border/50 shadow-card hover:shadow-gold transition-smooth hover:-translate-y-2">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width={800}
          height={600}
          className="w-full h-full object-cover transition-smooth group-hover:scale-110"
        />
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs uppercase tracking-wider text-primary border border-primary/30">
          {item.category}
        </div>
        <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full gradient-gold text-primary-foreground text-sm font-bold shadow-gold">
          ${item.price.toFixed(2)}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-1.5">{item.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 min-h-[2.5rem]">{item.description}</p>

        <div className="flex items-center gap-2">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              type="button"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-primary transition-smooth"
              aria-label="Decrease quantity"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{qty}</span>
            <button
              type="button"
              onClick={() => setQty((q) => q + 1)}
              className="h-9 w-9 flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-primary transition-smooth"
              aria-label="Increase quantity"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <Button
            onClick={() => {
              onAdd(item, qty);
              setQty(1);
            }}
            className="flex-1 gradient-gold text-primary-foreground hover:opacity-90 font-semibold"
          >
            <ShoppingBag className="h-4 w-4 mr-1" /> Order Now
          </Button>
        </div>
      </div>
    </article>
  );
};

export default MenuCard;

import { ShoppingCart, UtensilsCrossed, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

const links = [
  { href: "#menu", label: "Menu" },
];

const Navbar = ({ cartCount, onCartClick }: NavbarProps) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <nav className="container flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2">
          <UtensilsCrossed className="h-6 w-6 text-primary" />
          <span className="font-display text-xl md:text-2xl font-bold text-gradient-gold" style={{ fontFamily: "Playfair Display, serif" }}>
            Nile Restaurant
          </span>
        </a>
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          {/* Hidden Admin link — reveals on hover */}
          <Link
            to="/admin"
            aria-label="Admin"
            className="group relative inline-flex items-center h-9 rounded-md text-muted-foreground hover:text-primary transition-smooth overflow-hidden"
          >
            <span className="inline-flex h-9 w-9 items-center justify-center opacity-30 group-hover:opacity-100 transition-smooth">
              <Shield className="h-4 w-4" />
            </span>
            <span className="max-w-0 group-hover:max-w-[80px] overflow-hidden whitespace-nowrap text-xs font-semibold transition-[max-width,padding] duration-300 ease-out group-hover:pr-3">
              Admin
            </span>
          </Link>
          <Button
            onClick={onCartClick}
            variant="outline"
            size="sm"
            className="relative border-primary/40 hover:bg-primary hover:text-primary-foreground"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline ml-2">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full gradient-gold text-primary-foreground text-xs font-bold flex items-center justify-center animate-pulse-gold">
                {cartCount}
              </span>
            )}
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

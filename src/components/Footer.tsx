import { UtensilsCrossed } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-8 mt-12">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-4 w-4 text-primary" />
          <span className="font-semibold text-gradient-gold" style={{ fontFamily: "Playfair Display, serif" }}>
            Nile Restaurant
          </span>
        </div>
        <p>© {new Date().getFullYear()} Nile Restaurant. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

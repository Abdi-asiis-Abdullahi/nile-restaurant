import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import Footer from "@/components/Footer";
import CartSheet from "@/components/CartSheet";
import { useCart } from "@/hooks/useCart";
import { MenuItem } from "@/data/menu";
import { toast } from "sonner";

const Index = () => {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", table: "" });

  const handleAdd = (item: MenuItem, qty: number) => {
    cart.add(item, qty);
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartCount={cart.count} onCartClick={() => setCartOpen(true)} />
      <main>
        <Hero />
        <MenuSection onAdd={handleAdd} />
      </main>
      <Footer />
      <CartSheet
        open={cartOpen}
        onOpenChange={setCartOpen}
        items={cart.items}
        inc={cart.inc}
        dec={cart.dec}
        remove={cart.remove}
        clear={cart.clear}
        total={cart.total}
        customer={customer}
        setCustomer={setCustomer}
      />
    </div>
  );
};

export default Index;

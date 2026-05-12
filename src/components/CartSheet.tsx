import { Minus, Plus, Trash2, Send } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/hooks/useCart";
import { WHATSAPP_NUMBER } from "@/data/menu";
import { toast } from "sonner";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CartItem[];
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: number;
  customer: { name: string; table: string };
  setCustomer: (c: { name: string; table: string }) => void;
}

const CartSheet = ({ open, onOpenChange, items, inc, dec, remove, clear, total, customer, setCustomer }: Props) => {
  const handleOrder = () => {
    if (!customer.name.trim() || !customer.table.trim()) {
      toast.error("Please enter your name and table number");
      return;
    }
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    const lines = items.map((i) => `- ${i.name} x${i.qty}`).join("\n");
    const message = `Name: ${customer.name}\nTable: ${customer.table}\nOrder:\n${lines}\nTotal: $${total.toFixed(2)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    toast.success("Opening WhatsApp to send your order...");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md flex flex-col bg-card border-border">
        <SheetHeader>
          <SheetTitle className="text-2xl" style={{ fontFamily: "Playfair Display, serif" }}>
            Your <span className="text-gradient-gold">Order</span>
          </SheetTitle>
          <SheetDescription>Review your selection and send via WhatsApp.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto -mx-6 px-6 py-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">Your cart is empty</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 rounded-xl gradient-card border border-border/50">
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-semibold truncate">{item.name}</p>
                    <button onClick={() => remove(item.id)} className="text-muted-foreground hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-primary font-bold">${(item.price * item.qty).toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => dec(item.id)} className="h-7 w-7 rounded-md border border-border hover:border-primary flex items-center justify-center">
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-6 text-center text-sm font-medium">{item.qty}</span>
                    <button onClick={() => inc(item.id)} className="h-7 w-7 rounded-md border border-border hover:border-primary flex items-center justify-center">
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="border-t border-border pt-4 space-y-4">
          <div className="space-y-3">
            <div>
              <Label htmlFor="cust-name">Your Name</Label>
              <Input
                id="cust-name"
                value={customer.name}
                onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                placeholder="Full name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cust-table">Table Number</Label>
              <Input
                id="cust-table"
                value={customer.table}
                onChange={(e) => setCustomer({ ...customer, table: e.target.value })}
                placeholder="e.g. 5"
                className="mt-1"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-lg">
            <span className="text-muted-foreground">Total</span>
            <span className="font-bold text-primary text-2xl">${total.toFixed(2)}</span>
          </div>

          <Button onClick={handleOrder} size="lg" className="w-full gradient-gold text-primary-foreground hover:opacity-90 shadow-gold font-semibold">
            <Send className="h-4 w-4 mr-2" /> Send Order via WhatsApp
          </Button>
          {items.length > 0 && (
            <button onClick={clear} className="w-full text-xs text-muted-foreground hover:text-destructive">
              Clear cart
            </button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

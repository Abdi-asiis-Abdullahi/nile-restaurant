import { useState, useRef, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  LogOut,
  Plus,
  Pencil,
  Trash2,
  ImagePlus,
  Shield,
  ArrowLeft,
  RotateCcw,
  ChevronUp,
  ChevronDown,
  FolderTree,
  UtensilsCrossed,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { useMenu } from "@/hooks/useMenu";
import { useTaxonomy } from "@/hooks/useTaxonomy";
import { MenuItem } from "@/data/menu";
import { toast } from "sonner";

const emptyForm = (defaultGroup: string, defaultCategory: string): Omit<MenuItem, "id"> => ({
  name: "",
  description: "",
  price: 0,
  image: "",
  category: defaultCategory,
  group: defaultGroup,
});

/* ============ LOGIN ============ */
const LoginScreen = () => {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      toast.success("Welcome back");
    } else {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <Card className="w-full max-w-md border-primary/20 shadow-gold">
        <CardHeader className="text-center space-y-3">
          <div className="mx-auto h-14 w-14 rounded-full gradient-gold flex items-center justify-center">
            <Shield className="h-7 w-7 text-primary-foreground" />
          </div>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <p className="text-sm text-muted-foreground">Sign in to manage your restaurant menu</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full gradient-gold text-primary-foreground">
              Sign In
            </Button>
            <Button asChild type="button" variant="ghost" className="w-full">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Back to website
              </Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

/* ============ ITEMS MANAGER ============ */
const ItemsManager = () => {
  const { items, addItem, updateItem, deleteItem, resetToDefault } = useMenu();
  const { groups } = useTaxonomy();
  const firstGroup = groups[0];
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<MenuItem, "id">>(
    emptyForm(firstGroup?.name ?? "", firstGroup?.categories[0]?.name ?? "")
  );
  const fileRef = useRef<HTMLInputElement>(null);
  const [filterGroup, setFilterGroup] = useState<string>("All");
  const [confirm, setConfirm] = useState<{ id: string; name: string } | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const currentGroup = groups.find((g) => g.name === form.group);
  const categories = currentGroup?.categories ?? [];

  const openNew = () => {
    if (!firstGroup || firstGroup.categories.length === 0) {
      toast.error("Create a category first under the Categories tab");
      return;
    }
    setEditingId(null);
    setForm(emptyForm(firstGroup.name, firstGroup.categories[0].name));
    setDialogOpen(true);
  };

  const openEdit = (item: MenuItem) => {
    setEditingId(item.id);
    const { id, ...rest } = item;
    setForm(rest);
    setDialogOpen(true);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be smaller than 2MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image || form.price <= 0) {
      toast.error("Please fill all required fields (Name, Image, Price)");
      return;
    }
    if (editingId) {
      updateItem(editingId, form);
      toast.success("Item updated successfully");
    } else {
      addItem(form);
      toast.success("New item added");
    }
    setDialogOpen(false);
  };

  const handleGroupChange = (groupName: string) => {
    const g = groups.find((x) => x.name === groupName);
    const cats = g?.categories ?? [];
    setForm((f) => ({
      ...f,
      group: groupName,
      category: cats.find((c) => c.name === f.category)?.name ?? cats[0]?.name ?? "",
    }));
  };

  const visible = filterGroup === "All" ? items : items.filter((i) => i.group === filterGroup);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Menu Items</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {items.length} items — Add, edit or remove dishes, drinks and desserts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setConfirmReset(true)}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
          <Button onClick={openNew} className="gradient-gold text-primary-foreground">
            <Plus className="h-4 w-4" /> New Item
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {(["All", ...groups.map((g) => g.name)]).map((g) => (
          <button
            key={g}
            onClick={() => setFilterGroup(g)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium border transition-smooth ${
              filterGroup === g
                ? "bg-primary/10 text-primary border-primary/40"
                : "border-border/60 text-muted-foreground hover:text-primary"
            }`}
          >
            {g}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((item) => (
          <Card key={item.id} className="overflow-hidden border-border/60">
            <div className="aspect-video overflow-hidden bg-muted">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <CardContent className="p-4 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">
                    {item.group} · {item.category}
                  </p>
                </div>
                <span className="text-primary font-bold">${item.price}</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1" onClick={() => openEdit(item)}>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1 text-destructive border-destructive/40 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => setConfirm({ id: item.id, name: item.name })}
                >
                  <Trash2 className="h-3.5 w-3.5" /> Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No items found.</p>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Item" : "Add New Item"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Image</Label>
              <div
                className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary/50 transition-smooth"
                onClick={() => fileRef.current?.click()}
              >
                {form.image ? (
                  <img src={form.image} alt="preview" className="mx-auto h-32 w-auto rounded object-cover" />
                ) : (
                  <div className="py-6 text-muted-foreground">
                    <ImagePlus className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">Click to upload an image</p>
                  </div>
                )}
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.5"
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Group</Label>
                <Select value={form.group} onValueChange={handleGroupChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {groups.map((g) => (
                      <SelectItem key={g.id} value={g.name}>
                        {g.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm({ ...form, category: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-gold text-primary-foreground">
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!confirm} onOpenChange={(o) => !o && setConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this item?</AlertDialogTitle>
            <AlertDialogDescription>
              "{confirm?.name}" will be permanently removed from the menu.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirm) {
                  deleteItem(confirm.id);
                  toast.success("Item deleted");
                }
                setConfirm(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset menu to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              This will replace all current items with the original menu. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                resetToDefault();
                toast.success("Menu reset to defaults");
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

/* ============ CATEGORIES MANAGER ============ */
type EditTarget =
  | { kind: "group"; id: string; name: string }
  | { kind: "category"; groupId: string; id: string; name: string };

type DeleteTarget =
  | { kind: "group"; id: string; name: string }
  | { kind: "category"; groupId: string; id: string; name: string; groupName: string };

const CategoriesManager = () => {
  const {
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
  } = useTaxonomy();
  const { renameGroupOnItems, renameCategoryOnItems, deleteItemsInGroup, deleteItemsInCategory } = useMenu();

  const [groupDialog, setGroupDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");

  const [catDialog, setCatDialog] = useState<{ groupId: string; groupName: string } | null>(null);
  const [newCatName, setNewCatName] = useState("");

  const [editing, setEditing] = useState<EditTarget | null>(null);
  const [editingValue, setEditingValue] = useState("");

  const [confirmDel, setConfirmDel] = useState<DeleteTarget | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const submitNewGroup = (e: FormEvent) => {
    e.preventDefault();
    if (!newGroupName.trim()) return;
    addGroup(newGroupName);
    toast.success("Category created");
    setNewGroupName("");
    setGroupDialog(false);
  };

  const submitNewCategory = (e: FormEvent) => {
    e.preventDefault();
    if (!catDialog || !newCatName.trim()) return;
    addCategory(catDialog.groupId, newCatName);
    toast.success("Sub-tab created");
    setNewCatName("");
    setCatDialog(null);
  };

  const submitEdit = (e: FormEvent) => {
    e.preventDefault();
    if (!editing || !editingValue.trim()) return;
    if (editing.kind === "group") {
      const oldName = renameGroup(editing.id, editingValue);
      if (oldName && oldName !== editingValue.trim()) {
        renameGroupOnItems(oldName, editingValue.trim());
      }
      toast.success("Category renamed");
    } else {
      const result = renameCategory(editing.groupId, editing.id, editingValue);
      if (result && result.oldName !== editingValue.trim()) {
        renameCategoryOnItems(result.groupName, result.oldName, editingValue.trim());
      }
      toast.success("Sub-tab renamed");
    }
    setEditing(null);
  };

  const handleConfirmDelete = () => {
    if (!confirmDel) return;
    if (confirmDel.kind === "group") {
      const name = deleteGroup(confirmDel.id);
      if (name) deleteItemsInGroup(name);
      toast.success("Category deleted");
    } else {
      const result = deleteCategory(confirmDel.groupId, confirmDel.id);
      if (result) deleteItemsInCategory(result.groupName, result.name);
      toast.success("Sub-tab deleted");
    }
    setConfirmDel(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Categories & Tabs</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage main categories and sub-tabs that appear on the menu.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setConfirmReset(true)}>
            <RotateCcw className="h-4 w-4" /> Reset
          </Button>
          <Button onClick={() => setGroupDialog(true)} className="gradient-gold text-primary-foreground">
            <Plus className="h-4 w-4" /> New Category
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {groups.map((g, gi) => (
          <Card key={g.id} className="border-border/60">
            <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0 pb-3">
              <CardTitle className="text-lg">{g.name}</CardTitle>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  disabled={gi === 0}
                  onClick={() => reorderGroup(g.id, -1)}
                  aria-label="Move up"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  disabled={gi === groups.length - 1}
                  onClick={() => reorderGroup(g.id, 1)}
                  aria-label="Move down"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8"
                  onClick={() => {
                    setEditing({ kind: "group", id: g.id, name: g.name });
                    setEditingValue(g.name);
                  }}
                  aria-label="Edit"
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-destructive hover:text-destructive"
                  onClick={() => setConfirmDel({ kind: "group", id: g.id, name: g.name })}
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {g.categories.length === 0 && (
                <p className="text-xs text-muted-foreground py-2">No sub-tabs yet.</p>
              )}
              {g.categories.map((c, ci) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between gap-2 rounded-md border border-border/50 px-3 py-2 bg-secondary/30"
                >
                  <span className="text-sm font-medium">{c.name}</span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      disabled={ci === 0}
                      onClick={() => reorderCategory(g.id, c.id, -1)}
                      aria-label="Move up"
                    >
                      <ChevronUp className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      disabled={ci === g.categories.length - 1}
                      onClick={() => reorderCategory(g.id, c.id, 1)}
                      aria-label="Move down"
                    >
                      <ChevronDown className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7"
                      onClick={() => {
                        setEditing({ kind: "category", groupId: g.id, id: c.id, name: c.name });
                        setEditingValue(c.name);
                      }}
                      aria-label="Edit"
                    >
                      <Pencil className="h-3 w-3" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() =>
                        setConfirmDel({
                          kind: "category",
                          groupId: g.id,
                          id: c.id,
                          name: c.name,
                          groupName: g.name,
                        })
                      }
                      aria-label="Delete"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-2"
                onClick={() => {
                  setNewCatName("");
                  setCatDialog({ groupId: g.id, groupName: g.name });
                }}
              >
                <Plus className="h-3.5 w-3.5" /> Add Sub-tab
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add group */}
      <Dialog open={groupDialog} onOpenChange={setGroupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Category</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitNewGroup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="g-name">Category name</Label>
              <Input
                id="g-name"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="e.g. Specials"
                autoFocus
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setGroupDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-gold text-primary-foreground">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Add category */}
      <Dialog open={!!catDialog} onOpenChange={(o) => !o && setCatDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Sub-tab in "{catDialog?.groupName}"</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitNewCategory} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="c-name">Sub-tab name</Label>
              <Input
                id="c-name"
                value={newCatName}
                onChange={(e) => setNewCatName(e.target.value)}
                placeholder="e.g. Pizza"
                autoFocus
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setCatDialog(null)}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-gold text-primary-foreground">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Rename */}
      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Rename {editing?.kind === "group" ? "Category" : "Sub-tab"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={submitEdit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="e-name">New name</Label>
              <Input
                id="e-name"
                value={editingValue}
                onChange={(e) => setEditingValue(e.target.value)}
                autoFocus
                required
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-gold text-primary-foreground">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <AlertDialog open={!!confirmDel} onOpenChange={(o) => !o && setConfirmDel(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete{" "}
              {confirmDel?.kind === "group" ? "category" : "sub-tab"} "{confirmDel?.name}"?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmDel?.kind === "group"
                ? "All sub-tabs and items in this category will also be removed."
                : "All items under this sub-tab will be removed."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleConfirmDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={confirmReset} onOpenChange={setConfirmReset}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset categories to defaults?</AlertDialogTitle>
            <AlertDialogDescription>
              All custom categories and sub-tabs will be replaced.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                reset();
                toast.success("Categories reset");
              }}
            >
              Reset
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

/* ============ DASHBOARD ============ */
const Dashboard = () => {
  const { logout } = useAdminAuth();
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            <span className="font-display text-lg font-bold text-gradient-gold">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" /> Site
              </Link>
            </Button>
            <Button onClick={logout} variant="outline" size="sm">
              <LogOut className="h-4 w-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container py-8">
        <Tabs defaultValue="items">
          <TabsList className="mb-6">
            <TabsTrigger value="items">
              <UtensilsCrossed className="h-4 w-4 mr-2" />
              Items
            </TabsTrigger>
            <TabsTrigger value="categories">
              <FolderTree className="h-4 w-4 mr-2" />
              Categories
            </TabsTrigger>
          </TabsList>
          <TabsContent value="items">
            <ItemsManager />
          </TabsContent>
          <TabsContent value="categories">
            <CategoriesManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const Admin = () => {
  const { isAuthed } = useAdminAuth();
  return isAuthed ? <Dashboard /> : <LoginScreen />;
};

export default Admin;

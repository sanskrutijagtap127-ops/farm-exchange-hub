import { useState } from "react";
import { Search, Plus, Wheat, Apple, Carrot, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

type Listing = {
  id: number;
  crop: string;
  quantity: string;
  farmer: string;
  location: string;
  credits: number;
  category: string;
};

const iconMap: Record<string, React.ElementType> = {
  Grain: Wheat,
  Fruit: Apple,
  Vegetable: Carrot,
  Other: Leaf,
};

const initialListings: Listing[] = [
  { id: 1, crop: "Organic Rice", quantity: "200 kg", farmer: "Amara K.", location: "Kaduna", credits: 120, category: "Grain" },
  { id: 2, crop: "Fresh Tomatoes", quantity: "80 kg", farmer: "Ibrahim M.", location: "Jos", credits: 55, category: "Vegetable" },
  { id: 3, crop: "Sweet Oranges", quantity: "150 kg", farmer: "Grace O.", location: "Benue", credits: 90, category: "Fruit" },
  { id: 4, crop: "Dried Maize", quantity: "300 kg", farmer: "Sani B.", location: "Kano", credits: 180, category: "Grain" },
  { id: 5, crop: "Cassava Tubers", quantity: "250 kg", farmer: "Ngozi A.", location: "Enugu", credits: 100, category: "Vegetable" },
  { id: 6, crop: "Groundnuts", quantity: "100 kg", farmer: "Yusuf D.", location: "Sokoto", credits: 75, category: "Other" },
];

const Marketplace = () => {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newCrop, setNewCrop] = useState({ crop: "", quantity: "", location: "", category: "Grain" });

  const filtered = listings.filter(
    (l) =>
      l.crop.toLowerCase().includes(search.toLowerCase()) ||
      l.farmer.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    if (!newCrop.crop || !newCrop.quantity) return;
    const listing: Listing = {
      id: Date.now(),
      crop: newCrop.crop,
      quantity: newCrop.quantity,
      farmer: "You",
      location: newCrop.location || "Unknown",
      credits: Math.floor(Math.random() * 150) + 30,
      category: newCrop.category,
    };
    setListings([listing, ...listings]);
    setNewCrop({ crop: "", quantity: "", location: "", category: "Grain" });
    setDialogOpen(false);
  };

  return (
    <div className="container py-10 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Marketplace</h1>
          <p className="text-muted-foreground mt-1">Browse and list crops available for trade.</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> List a Crop
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-display">List Your Crop</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>Crop Name</Label>
                <Input
                  placeholder="e.g. Organic Millet"
                  value={newCrop.crop}
                  onChange={(e) => setNewCrop({ ...newCrop, crop: e.target.value })}
                />
              </div>
              <div>
                <Label>Quantity</Label>
                <Input
                  placeholder="e.g. 100 kg"
                  value={newCrop.quantity}
                  onChange={(e) => setNewCrop({ ...newCrop, quantity: e.target.value })}
                />
              </div>
              <div>
                <Label>Location</Label>
                <Input
                  placeholder="e.g. Abuja"
                  value={newCrop.location}
                  onChange={(e) => setNewCrop({ ...newCrop, location: e.target.value })}
                />
              </div>
              <div>
                <Label>Category</Label>
                <div className="flex gap-2 mt-1">
                  {["Grain", "Vegetable", "Fruit", "Other"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setNewCrop({ ...newCrop, category: cat })}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        newCrop.category === cat
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full">Add Listing</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search crops or farmers..."
          className="pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((listing) => {
          const Icon = iconMap[listing.category] || Leaf;
          return (
            <div
              key={listing.id}
              className="bg-card rounded-xl p-6 shadow-card hover:shadow-elevated transition-all border border-border group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{listing.crop}</h3>
                    <p className="text-xs text-muted-foreground">{listing.farmer} · {listing.location}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-accent/15 text-accent border-0 font-semibold">
                  {listing.credits} credits
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Quantity: {listing.quantity}</p>
              <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                Propose Trade
              </Button>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-12">No listings found. Try a different search.</p>
      )}
    </div>
  );
};

export default Marketplace;

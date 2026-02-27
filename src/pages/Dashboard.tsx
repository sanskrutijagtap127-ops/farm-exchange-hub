import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sprout, MapPin, Phone, Wheat, LogOut, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Profile {
  full_name: string;
  village: string;
  phone_number: string;
  crops_grown: string;
  value_credits: number;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, village, phone_number, crops_grown, value_credits")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        toast({ title: "Error loading profile", description: error.message, variant: "destructive" });
      } else {
        setProfile(data);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [navigate, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Sprout className="w-8 h-8 text-primary animate-pulse" />
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="container py-10 space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Welcome, {profile.full_name}!
          </h1>
          <p className="text-muted-foreground mt-1">Your farmer dashboard</p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-1" /> Logout
        </Button>
      </div>

      {/* Value Credits */}
      <Card className="shadow-card border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Coins className="w-4 h-4 text-primary" /> Value Credits Balance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <span className="text-5xl font-display font-bold text-primary">{profile.value_credits}</span>
          <span className="text-lg text-muted-foreground ml-2">VC</span>
        </CardContent>
      </Card>

      {/* Profile Info */}
      <div className="grid sm:grid-cols-2 gap-5">
        <Card className="shadow-card border-border">
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Farmer Name</p>
              <p className="text-lg font-semibold text-foreground">{profile.full_name}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Village</p>
              <p className="text-lg font-semibold text-foreground">{profile.village}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Phone Number</p>
              <p className="text-lg font-semibold text-foreground">{profile.phone_number}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardContent className="pt-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Wheat className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Crops Grown</p>
              <p className="text-lg font-semibold text-foreground">{profile.crops_grown}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

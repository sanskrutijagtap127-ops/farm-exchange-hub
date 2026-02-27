import { Link } from "react-router-dom";
import { ArrowRight, Repeat, BarChart3, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-farm.jpg";

const features = [
  {
    icon: Repeat,
    title: "Cashless Trading",
    description: "Trade your surplus crops directly with other farmers — no money needed.",
  },
  {
    icon: BarChart3,
    title: "Value Credits",
    description: "Earn credits for every trade. Track your balance and trading history.",
  },
  {
    icon: ShieldCheck,
    title: "Fair & Transparent",
    description: "Market-based crop valuations ensure every trade is equitable.",
  },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <img
          src={heroImage}
          alt="Lush green farmland with golden wheat fields at sunrise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="relative container py-20">
          <div className="max-w-2xl space-y-6 animate-fade-up">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Trade Crops,
              <br />
              Grow Together
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/85 max-w-lg">
              A smart barter marketplace connecting farmers to trade surplus produce using value-based credits — no cash required.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
                <Link to="/marketplace">
                  Browse Marketplace <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 font-semibold text-base px-8"
              >
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-md mx-auto">
            AgriSwap makes it simple to barter your harvest with fellow farmers.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="bg-card rounded-xl p-8 shadow-card hover:shadow-elevated transition-shadow text-center"
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-5">
                  <f.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-foreground mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Ready to Start Trading?</h2>
          <p className="text-primary-foreground/80 max-w-md mx-auto">
            List your crops and connect with farmers in your region today.
          </p>
          <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-base px-8">
            <Link to="/marketplace">
              Go to Marketplace <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;

import { TrendingUp, ArrowUpRight, ArrowDownLeft, Sprout } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const recentTrades = [
  { id: 1, type: "earned", description: "Sold 200kg Organic Rice to Ibrahim M.", credits: 120, date: "Feb 24" },
  { id: 2, type: "spent", description: "Acquired 80kg Fresh Tomatoes from Grace O.", credits: 55, date: "Feb 22" },
  { id: 3, type: "earned", description: "Sold 100kg Groundnuts to Ngozi A.", credits: 75, date: "Feb 20" },
  { id: 4, type: "spent", description: "Acquired 50kg Sweet Oranges from Sani B.", credits: 45, date: "Feb 18" },
  { id: 5, type: "earned", description: "Sold 150kg Dried Maize to Yusuf D.", credits: 180, date: "Feb 15" },
];

const Dashboard = () => {
  const totalCredits = 475;
  const totalEarned = 375;
  const totalSpent = 100;
  const tradeCount = 5;

  return (
    <div className="container py-10 space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Track your value credits and trade activity.</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Available Credits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-display font-bold text-primary">{totalCredits}</span>
              <span className="text-xs text-muted-foreground mb-1">credits</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Credits Earned</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-display font-bold text-accent">{totalEarned}</span>
              <TrendingUp className="w-4 h-4 text-accent mb-1" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Credits Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-display font-bold text-secondary">{totalSpent}</span>
              <span className="text-xs text-muted-foreground mb-1">on trades</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-display font-bold text-foreground">{tradeCount}</span>
              <Sprout className="w-4 h-4 text-primary mb-1" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Credit bar */}
      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-display">Credit Utilization</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Spent: {totalSpent} credits</span>
            <span>Earned: {totalEarned} credits</span>
          </div>
          <Progress value={(totalSpent / totalEarned) * 100} className="h-3 bg-muted [&>div]:bg-primary" />
          <p className="text-xs text-muted-foreground">
            You've used {Math.round((totalSpent / totalEarned) * 100)}% of your earned credits.
          </p>
        </CardContent>
      </Card>

      {/* Recent Trades */}
      <Card className="shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg font-display">Recent Trades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTrades.map((trade) => (
              <div key={trade.id} className="flex items-center gap-4 py-3 border-b border-border last:border-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    trade.type === "earned"
                      ? "bg-primary/10 text-primary"
                      : "bg-secondary/10 text-secondary"
                  }`}
                >
                  {trade.type === "earned" ? (
                    <ArrowDownLeft className="w-4 h-4" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{trade.description}</p>
                  <p className="text-xs text-muted-foreground">{trade.date}</p>
                </div>
                <span
                  className={`text-sm font-semibold ${
                    trade.type === "earned" ? "text-primary" : "text-secondary"
                  }`}
                >
                  {trade.type === "earned" ? "+" : "-"}{trade.credits}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;

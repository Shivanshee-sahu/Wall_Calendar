import { Home, ArrowRight, Zap, BarChart3, Users } from "lucide-react";

const stats = [
  { label: "Tasks Completed", value: "24", icon: Zap, change: "+12%" },
  { label: "Meetings Today", value: "5", icon: BarChart3, change: "+3" },
  { label: "Team Members", value: "8", icon: Users, change: "Active" },
];

export default function HomePage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome */}
      <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-card to-card p-8 shadow-card">
        <div className="flex items-center gap-3 mb-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
            <Home className="h-5 w-5 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground">Welcome back!</h2>
        </div>
        <p className="text-muted-foreground max-w-lg">
          Here's a quick overview of your day. You have tasks to complete and meetings coming up.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="group rounded-2xl bg-card p-5 shadow-card transition-all duration-300 hover:shadow-elevated hover:-translate-y-1"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="h-5 w-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <h3 className="text-sm font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {["Schedule a meeting", "Create a new task", "Review pending items"].map((action) => (
            <button
              key={action}
              className="group flex w-full items-center justify-between rounded-xl border border-border px-4 py-3 text-sm text-foreground transition-all duration-200 hover:bg-secondary hover:border-primary/30 active:scale-[0.99]"
            >
              {action}
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

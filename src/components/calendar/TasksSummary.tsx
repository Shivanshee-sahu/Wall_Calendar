import React from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

export interface TaskCategory {
  name: string;
  count: number;
  color: string;
}

interface TasksSummaryProps {
  categories: TaskCategory[];
  goalPercent: number;
}

export const TasksSummary: React.FC<TasksSummaryProps> = ({ categories, goalPercent }) => {
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (goalPercent / 100) * circumference;
  const totalTasks = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className="space-y-5">
      {/* Daily Goal — prominent */}
      <div className="flex items-center gap-5">
        <div className="relative w-20 h-20 shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="7"
            />
            <circle
              cx="50" cy="50" r="40"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-all duration-1000 ease-out"
              style={{ filter: "drop-shadow(0 0 6px hsl(var(--primary) / 0.35))" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-base font-bold text-foreground">{goalPercent}%</span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">Daily Goal</p>
          <p className="text-xs text-muted-foreground mt-0.5">{totalTasks} tasks total</p>
          <div className="flex items-center gap-1 mt-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">On track</span>
          </div>
        </div>
      </div>

      {/* Task categories */}
      <div>
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">Categories</h4>
        <div className="space-y-2">
          {categories.map((cat, i) => {
            const percent = totalTasks > 0 ? (cat.count / totalTasks) * 100 : 0;
            return (
              <div
                key={cat.name}
                className="group animate-fade-in"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center gap-2">
                    <span className={cn("w-2.5 h-2.5 rounded-full shrink-0", cat.color)} />
                    <span className="text-foreground text-xs font-medium">{cat.name}</span>
                  </div>
                  <span className="text-xs text-muted-foreground font-medium">{cat.count}</span>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden ml-[18px]">
                  <div
                    className={cn("h-full rounded-full transition-all duration-700 ease-out", cat.color)}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

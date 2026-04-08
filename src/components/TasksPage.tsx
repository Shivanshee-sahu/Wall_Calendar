import { CheckSquare, Circle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const initialTasks = [
  { id: "1", title: "Review design mockups", done: false },
  { id: "2", title: "Update project documentation", done: true },
  { id: "3", title: "Prepare sprint retrospective", done: false },
  { id: "4", title: "Fix navigation bug on mobile", done: false },
  { id: "5", title: "Send weekly status report", done: true },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState(initialTasks);

  const toggle = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const done = tasks.filter((t) => t.done).length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="rounded-2xl bg-card p-6 shadow-card">
        <div className="flex items-center gap-3 mb-4">
          <CheckSquare className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold text-foreground">Tasks</h2>
          <span className="ml-auto text-sm text-muted-foreground">
            {done}/{tasks.length} completed
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 rounded-full bg-secondary mb-6 overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
            style={{ width: `${(done / tasks.length) * 100}%` }}
          />
        </div>

        <div className="space-y-2">
          {tasks.map((task) => (
            <button
              key={task.id}
              onClick={() => toggle(task.id)}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-secondary active:scale-[0.99]",
                task.done && "opacity-60"
              )}
            >
              {task.done ? (
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 transition-transform duration-300 group-hover:scale-110" />
              ) : (
                <Circle className="h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:text-primary" />
              )}
              <span
                className={cn(
                  "text-sm text-foreground transition-all duration-200",
                  task.done && "line-through text-muted-foreground"
                )}
              >
                {task.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

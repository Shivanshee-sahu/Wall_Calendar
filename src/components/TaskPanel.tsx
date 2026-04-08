import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, X, Clock } from "lucide-react";
import type { CalendarTask } from "@/hooks/useCalendar";

interface TaskPanelProps {
  selectedDate: Date | null;
  tasks: CalendarTask[];
  note: string;
  onNoteChange: (text: string) => void;
  onAddTask: (task: Omit<CalendarTask, "id">) => void;
  onRemoveTask: (id: string) => void;
  allTasks: CalendarTask[];
}

const CATEGORIES: CalendarTask["category"][] = ["meeting", "research", "design", "review"];

const CATEGORY_COLORS: Record<CalendarTask["category"], string> = {
  meeting: "bg-task-meeting/20 border-task-meeting text-task-meeting",
  research: "bg-task-research/20 border-task-research text-task-research",
  design: "bg-task-design/20 border-task-design text-task-design",
  review: "bg-task-review/20 border-task-review text-task-review",
};

const CATEGORY_LABELS: Record<CalendarTask["category"], string> = {
  meeting: "Meetings",
  research: "UX Researches",
  design: "UI Design",
  review: "UI/UX Reviews",
};

const CATEGORY_DOT: Record<CalendarTask["category"], string> = {
  meeting: "bg-task-meeting",
  research: "bg-task-research",
  design: "bg-task-design",
  review: "bg-task-review",
};

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function TaskPanel({
  selectedDate,
  tasks,
  note,
  onNoteChange,
  onAddTask,
  onRemoveTask,
  allTasks,
}: TaskPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newTime, setNewTime] = useState("09:00");
  const [newCategory, setNewCategory] = useState<CalendarTask["category"]>("meeting");

  if (!selectedDate) return null;

  const dateStr = selectedDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const handleAdd = () => {
    if (!newTitle.trim()) return;
    onAddTask({
      date: formatDateKey(selectedDate),
      title: newTitle,
      time: newTime,
      category: newCategory,
    });
    setNewTitle("");
    setShowAddForm(false);
  };

  // Task summary counts
  const taskCounts = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = allTasks.filter((t) => t.category === cat).length;
    return acc;
  }, {} as Record<string, number>);

  // Daily goal percentage
  const totalToday = tasks.length;
  const goalPercent = Math.min(100, Math.round((totalToday / 5) * 100));

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Mini Calendar Header */}
      <div className="rounded-2xl bg-card p-5 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {MONTH_NAMES[selectedDate.getMonth()]} {selectedDate.getFullYear()}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground">{dateStr}</p>
      </div>

      {/* Tasks Summary */}
      <div className="rounded-2xl bg-card p-5 shadow-card">
        <h3 className="mb-3 text-sm font-bold text-foreground">Tasks</h3>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={cn("h-3 w-3 rounded-sm", CATEGORY_DOT[cat])} />
                <span className="text-sm text-foreground">{CATEGORY_LABELS[cat]}</span>
              </div>
              <span className="text-sm font-semibold text-primary">{taskCounts[cat]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Goal */}
      <div className="rounded-2xl bg-card p-5 shadow-card">
        <h3 className="mb-3 text-sm font-bold text-foreground">Daily Goal</h3>
        <div className="flex items-center justify-center">
          <div className="relative h-28 w-28">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
              <circle
                cx="50" cy="50" r="40" fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${goalPercent * 2.51} 251`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">{goalPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Day's Tasks */}
      <div className="rounded-2xl bg-card p-5 shadow-card">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground">Today's Tasks</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95"
          >
            <Plus className="h-3 w-3" /> Add Task
          </button>
        </div>

        {showAddForm && (
          <div className="mb-3 space-y-2 rounded-xl border border-border p-3 animate-scale-in">
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task title..."
              className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <div className="flex gap-2">
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as CalendarTask["category"])}
                className="flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAdd}
              className="w-full rounded-lg bg-primary py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
            >
              Add
            </button>
          </div>
        )}

        {tasks.length === 0 ? (
          <p className="text-sm text-muted-foreground">No tasks for this day</p>
        ) : (
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={cn(
                  "flex items-center justify-between rounded-xl border-l-4 px-3 py-2.5 transition-all hover:shadow-soft",
                  CATEGORY_COLORS[task.category]
                )}
              >
                <div>
                  <p className="text-sm font-medium text-foreground">{task.title}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {task.time}
                  </div>
                </div>
                <button
                  onClick={() => onRemoveTask(task.id)}
                  className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-destructive"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="rounded-2xl bg-card p-5 shadow-card">
        <h3 className="mb-2 text-sm font-bold text-foreground">Notes</h3>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="Add notes for this day..."
          className="w-full resize-none rounded-lg border border-input bg-background p-3 text-sm outline-none transition-all focus:ring-2 focus:ring-ring"
          rows={3}
        />
      </div>
    </div>
  );
}

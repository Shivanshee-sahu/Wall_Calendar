import { cn } from "@/lib/utils";
import { MoreHorizontal, Clock } from "lucide-react";
import type { CalendarTask } from "@/hooks/useCalendar";

interface DayScheduleProps {
  selectedDate: Date | null;
  tasks: CalendarTask[];
}

const CATEGORY_BG: Record<CalendarTask["category"], string> = {
  meeting: "bg-task-meeting/10 border-l-task-meeting",
  research: "bg-task-research/10 border-l-task-research",
  design: "bg-task-design/10 border-l-task-design",
  review: "bg-task-review/10 border-l-task-review",
};

const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7:00 - 18:00

export default function DaySchedule({ selectedDate, tasks }: DayScheduleProps) {
  if (!selectedDate) return null;

  const dateStr = selectedDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  // Map tasks to hour slots
  const tasksByHour = tasks.reduce((acc, task) => {
    const hour = parseInt(task.time.split(":")[0], 10);
    if (!acc[hour]) acc[hour] = [];
    acc[hour].push(task);
    return acc;
  }, {} as Record<number, CalendarTask[]>);

  // Current time indicator
  const now = new Date();
  const isToday =
    selectedDate.getDate() === now.getDate() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getFullYear() === now.getFullYear();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  return (
    <div className="rounded-2xl bg-card shadow-card animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">{dateStr}</h2>
        <div className="flex gap-1 rounded-lg border border-border p-0.5">
          <button className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
            Day
          </button>
          <button className="rounded-md px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            Week
          </button>
          <button className="rounded-md px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
            Month
          </button>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative max-h-[500px] overflow-y-auto px-6 py-2">
        {HOURS.map((hour) => {
          const hourTasks = tasksByHour[hour] || [];
          const isCurrentHour = isToday && hour === currentHour;

          return (
            <div key={hour} className="relative flex min-h-[60px]">
              {/* Time label */}
              <div className="w-14 shrink-0 pt-1 text-xs text-muted-foreground">
                {String(hour).padStart(2, "0")}:00
              </div>

              {/* Content area */}
              <div className="relative flex-1 border-t border-border py-1">
                {/* Current time indicator */}
                {isCurrentHour && (
                  <div
                    className="absolute left-0 right-0 z-10 flex items-center"
                    style={{ top: `${(currentMinute / 60) * 100}%` }}
                  >
                    <span className="mr-1 text-[10px] font-semibold text-primary">
                      {String(currentHour).padStart(2, "0")}:{String(currentMinute).padStart(2, "0")}
                    </span>
                    <div className="h-px flex-1 bg-primary" />
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                )}

                {/* Tasks */}
                {hourTasks.map((task) => (
                  <div
                    key={task.id}
                    className={cn(
                      "mb-1 flex items-center justify-between rounded-xl border-l-4 px-4 py-3 transition-all hover:shadow-soft",
                      CATEGORY_BG[task.category]
                    )}
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">{task.title}</p>
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" /> {task.time}
                      </p>
                    </div>
                    <button className="rounded-lg p-1 text-muted-foreground transition-colors hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

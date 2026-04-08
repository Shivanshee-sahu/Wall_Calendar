import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import calendarHero from "@/assets/calendar-hero.jpg";

interface CalendarGridProps {
  currentMonth: Date;
  slideDirection: "left" | "right";
  days: (Date | null)[];
  onPrev: () => void;
  onNext: () => void;
  onDateClick: (date: Date) => void;
  isToday: (date: Date) => boolean;
  isSelected: (date: Date) => boolean;
  isInRange: (date: Date) => boolean;
  isRangeStart: (date: Date) => boolean;
  isRangeEnd: (date: Date) => boolean;
  isCurrentMonth: (date: Date) => boolean;
  hasNote: (date: Date) => boolean;
  hasTask: (date: Date) => boolean;
}

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function CalendarGrid({
  currentMonth,
  slideDirection,
  days,
  onPrev,
  onNext,
  onDateClick,
  isToday,
  isSelected,
  isInRange,
  isRangeStart,
  isRangeEnd,
  isCurrentMonth,
  hasNote,
  hasTask,
}: CalendarGridProps) {
  const animKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl bg-card shadow-card">
      {/* Hero Image */}
      <div className="relative h-48 overflow-hidden sm:h-56 lg:h-64">
        <img
          src={calendarHero}
          alt="Calendar hero"
          className="h-full w-full object-cover"
          width={1280}
          height={640}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent" />
        {/* Month/Year overlay */}
        <div className="absolute bottom-4 right-6 text-right">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            {currentMonth.getFullYear()}
          </p>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
            {MONTH_NAMES[currentMonth.getMonth()]}
          </h2>
        </div>
        {/* Diagonal accent */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1280 80" preserveAspectRatio="none">
          <path d="M0 80 L0 40 L400 80 Z" fill="hsl(var(--primary))" opacity="0.7" />
          <path d="M350 80 L500 20 L700 80 Z" fill="hsl(var(--primary))" opacity="0.4" />
        </svg>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onPrev}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-all hover:bg-secondary active:scale-95"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={onNext}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border transition-all hover:bg-secondary active:scale-95"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground">
          Click to select range
        </p>
      </div>

      {/* Notes area */}
      <div className="border-t border-border px-6 py-3">
        <p className="text-xs font-medium text-muted-foreground">Notes</p>
        <div className="mt-1 h-px bg-border" />
        <div className="mt-1 h-px bg-border" />
        <div className="mt-1 h-px bg-border" />
      </div>

      {/* Calendar Grid */}
      <div className="px-6 pb-6">
        {/* Weekday headers */}
        <div className="calendar-grid mb-2">
          {WEEKDAYS.map((day) => (
            <div
              key={day}
              className={cn(
                "py-2 text-center text-xs font-semibold uppercase tracking-wider",
                day === "SAT" || day === "SUN"
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {day}
            </div>
          ))}
        </div>

        {/* Days */}
        <div
          key={animKey}
          className={cn(
            "calendar-grid",
            slideDirection === "left" ? "animate-month-slide-left" : "animate-month-slide-right"
          )}
        >
          {days.map((date, i) => {
            if (!date) return <div key={i} />;
            const current = isCurrentMonth(date);
            const today = isToday(date);
            const selected = isSelected(date);
            const inRange = isInRange(date);
            const rangeStart = isRangeStart(date);
            const rangeEnd = isRangeEnd(date);
            const dayOfWeek = (date.getDay() + 6) % 7; // Monday=0
            const isWeekend = dayOfWeek >= 5;
            const noteExists = hasNote(date);
            const taskExists = hasTask(date);

            return (
              <button
                key={i}
                onClick={() => onDateClick(date)}
                className={cn(
                  "relative flex h-10 w-full items-center justify-center rounded-lg text-sm transition-all duration-150",
                  !current && "text-muted-foreground/40",
                  current && !selected && !today && !inRange && "hover:bg-secondary",
                  current && isWeekend && !selected && !today && !inRange && "text-primary",
                  today && !selected && "bg-primary text-primary-foreground font-bold",
                  selected && "bg-primary text-primary-foreground font-semibold shadow-sm",
                  inRange && !rangeStart && !rangeEnd && "bg-primary/15 text-foreground",
                  rangeStart && "rounded-r-none bg-primary text-primary-foreground",
                  rangeEnd && "rounded-l-none bg-primary text-primary-foreground",
                  inRange && !rangeStart && !rangeEnd && "rounded-none",
                  "active:scale-95"
                )}
              >
                {date.getDate()}
                {(noteExists || taskExists) && current && (
                  <span className={cn(
                    "absolute bottom-1 h-1 w-1 rounded-full",
                    selected || today ? "bg-primary-foreground" : "bg-primary"
                  )} />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

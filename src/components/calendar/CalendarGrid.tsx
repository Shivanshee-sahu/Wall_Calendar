import React from "react";
import { cn } from "@/lib/utils";
import {
  getCalendarDays,
  isInRange,
  isRangeStart,
  isRangeEnd,
  getHoliday,
  isSameMonth,
  isSameDay,
  DateRange,
} from "@/lib/calendar-data";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WEEKDAYS = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface CalendarGridProps {
  currentMonth: Date;
  dateRange: DateRange;
  onDayClick: (day: Date) => void;
  today: Date;
  mondayStart?: boolean;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentMonth,
  dateRange,
  onDayClick,
  today,
}) => {
  const days = getCalendarDays(currentMonth);

  return (
    <div className="select-none">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-border/60 mb-1">
        {WEEKDAYS.map((wd, i) => {
          const isWeekend = i >= 5;
          return (
            <div
              key={wd}
              className={cn(
                "text-center text-[11px] font-bold uppercase tracking-wider py-2.5",
                isWeekend ? "text-primary" : "text-foreground/70"
              )}
            >
              {wd}
            </div>
          );
        })}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7">
        {days.map((day, idx) => {
          const inMonth = isSameMonth(day, currentMonth);
          const isToday = isSameDay(day, today);
          const inRange = isInRange(day, dateRange);
          const isStart = isRangeStart(day, dateRange);
          const isEnd = isRangeEnd(day, dateRange);
          const holiday = getHoliday(day);
          const isEndpoint = isStart || isEnd;
          const dayOfWeek = day.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          const dayContent = (
            <button
              onClick={() => onDayClick(day)}
              className={cn(
                "relative w-full aspect-square flex items-center justify-center text-sm transition-all duration-200 cursor-pointer border-b border-border/20",
                !inMonth && "text-muted-foreground/25",
                inMonth && !isWeekend && "text-foreground",
                inMonth && isWeekend && "text-primary font-medium",
                inRange && !isEndpoint && "bg-primary/10",
                isEndpoint && "bg-primary text-primary-foreground font-bold rounded-full shadow-md shadow-primary/30 z-10 scale-110",
                isToday && !isEndpoint && "font-bold",
                !isEndpoint && inMonth && "hover:bg-accent rounded-md"
              )}
            >
              <span className="relative z-10">{day.getDate()}</span>

              {/* Today indicator */}
              {isToday && !isEndpoint && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-pulse" />
              )}

              {/* Holiday dot */}
              {holiday && !isEndpoint && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-destructive" />
              )}
            </button>
          );

          if (holiday) {
            return (
              <Tooltip key={idx}>
                <TooltipTrigger asChild>{dayContent}</TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {holiday}
                </TooltipContent>
              </Tooltip>
            );
          }

          return <React.Fragment key={idx}>{dayContent}</React.Fragment>;
        })}
      </div>
    </div>
  );
};

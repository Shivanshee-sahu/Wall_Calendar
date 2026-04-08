import React from "react";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Clock } from "lucide-react";

export interface CalendarEvent {
  id: string;
  title: string;
  time: string;
  color: "teal" | "yellow" | "purple" | "rose";
  attendees: number;
}

const COLOR_MAP: Record<CalendarEvent["color"], { bg: string; border: string; dot: string }> = {
  teal: { bg: "bg-accent", border: "border-l-[3px] border-l-primary", dot: "bg-primary" },
  yellow: { bg: "bg-yellow-50 dark:bg-yellow-900/10", border: "border-l-[3px] border-l-yellow-500", dot: "bg-yellow-500" },
  purple: { bg: "bg-purple-50 dark:bg-purple-900/10", border: "border-l-[3px] border-l-purple-500", dot: "bg-purple-500" },
  rose: { bg: "bg-rose-50 dark:bg-rose-900/10", border: "border-l-[3px] border-l-rose-500", dot: "bg-rose-500" },
};

interface EventsTimelineProps {
  events: CalendarEvent[];
}

export const EventsTimeline: React.FC<EventsTimelineProps> = ({ events }) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-3">
          <Clock className="w-5 h-5 text-muted-foreground" />
        </div>
        <p className="text-sm text-muted-foreground">No events scheduled</p>
        <p className="text-xs text-muted-foreground/60 mt-1">Select a date to view events</p>
      </div>
    );
  }

  return (
    <div className="space-y-2.5">
      {events.map((event, i) => {
        const colors = COLOR_MAP[event.color];
        return (
          <div
            key={event.id}
            className={cn(
              "rounded-xl px-4 py-3 flex items-center justify-between group",
              "transition-all duration-300 hover:shadow-md hover:translate-x-0.5",
              "animate-fade-in cursor-pointer",
              colors.bg,
              colors.border
            )}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="min-w-0 flex items-start gap-3">
              <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", colors.dot)} />
              <div>
                <p className="text-sm font-medium text-foreground truncate">{event.title}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{event.time}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-3 shrink-0">
              {event.attendees > 0 && (
                <div className="flex -space-x-1.5">
                  {Array.from({ length: Math.min(event.attendees, 3) }).map((_, j) => (
                    <div
                      key={j}
                      className="w-5 h-5 rounded-full bg-muted border-2 border-card flex items-center justify-center"
                    >
                      <span className="text-[8px] font-bold text-muted-foreground">
                        {String.fromCharCode(65 + j)}
                      </span>
                    </div>
                  ))}
                  {event.attendees > 3 && (
                    <div className="w-5 h-5 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center">
                      <span className="text-[8px] font-bold text-primary">
                        +{event.attendees - 3}
                      </span>
                    </div>
                  )}
                </div>
              )}
              <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 p-0.5">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

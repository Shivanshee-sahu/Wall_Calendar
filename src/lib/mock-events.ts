import type { CalendarEvent } from "@/components/calendar/EventsTimeline";
import type { TaskCategory } from "@/components/calendar/TasksSummary";

export function getEventsForDate(day: Date): CalendarEvent[] {
  const d = day.getDate();
  const colorCycle: CalendarEvent["color"][] = ["teal", "yellow", "purple", "rose"];

  // Generate some mock events based on the day
  const events: CalendarEvent[] = [];
  if (d % 3 === 0 || d % 5 === 0) {
    events.push({
      id: `${d}-1`,
      title: "Team Standup",
      time: "09:00 - 09:30",
      color: colorCycle[d % 4],
      attendees: (d % 7) + 3,
    });
  }
  if (d % 2 === 0) {
    events.push({
      id: `${d}-2`,
      title: "Design Review",
      time: `${10 + (d % 3)}:00 - ${11 + (d % 3)}:30`,
      color: colorCycle[(d + 1) % 4],
      attendees: (d % 5) + 2,
    });
  }
  if (d % 4 === 0) {
    events.push({
      id: `${d}-3`,
      title: "Sprint Planning",
      time: "14:00 - 15:30",
      color: "purple",
      attendees: 12,
    });
  }
  if (d > 10 && d < 20) {
    events.push({
      id: `${d}-4`,
      title: "Client Check-in",
      time: "16:00 - 16:45",
      color: "rose",
      attendees: (d % 4) + 1,
    });
  }
  return events;
}

export const TASK_CATEGORIES: TaskCategory[] = [
  { name: "Meetings", count: 14, color: "bg-primary" },
  { name: "UX Research", count: 7, color: "bg-purple-500" },
  { name: "UI Design", count: 5, color: "bg-yellow-500" },
  { name: "Reviews", count: 5, color: "bg-rose-400" },
];

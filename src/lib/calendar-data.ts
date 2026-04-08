import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay, isWithinInterval, addMonths, subMonths } from "date-fns";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface CalendarNote {
  id: string;
  text: string;
  rangeStart?: string;
  rangeEnd?: string;
  createdAt: string;
}

export interface SeasonalTheme {
  name: string;
  heroImage: string;
  accentHue: number;
  accentSat: number;
  accentLight: number;
}

export const SEASONAL_THEMES: Record<number, SeasonalTheme> = {
  0: { name: "Winter", heroImage: "https://images.unsplash.com/photo-1491002052546-bf38f186af56?w=800&q=80", accentHue: 210, accentSat: 50, accentLight: 55 },
  1: { name: "Winter", heroImage: "https://images.unsplash.com/photo-1457269449834-928af64c684d?w=800&q=80", accentHue: 200, accentSat: 45, accentLight: 55 },
  2: { name: "Spring", heroImage: "https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=800&q=80", accentHue: 140, accentSat: 40, accentLight: 45 },
  3: { name: "Spring", heroImage: "https://plus.unsplash.com/premium_photo-1720794774013-12946b37fc3b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", accentHue: 330, accentSat: 50, accentLight: 55 },
  4: { name: "Spring", heroImage: "https://images.unsplash.com/photo-1494949360228-4e9bde560065?w=800&q=80", accentHue: 120, accentSat: 40, accentLight: 40 },
  5: { name: "Summer", heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", accentHue: 40, accentSat: 80, accentLight: 50 },
  6: { name: "Summer", heroImage: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800&q=80", accentHue: 195, accentSat: 70, accentLight: 50 },
  7: { name: "Summer", heroImage: "https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=800&q=80", accentHue: 35, accentSat: 75, accentLight: 55 },
  8: { name: "Autumn", heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80", accentHue: 25, accentSat: 70, accentLight: 50 },
  9: { name: "Autumn", heroImage: "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?w=800&q=80", accentHue: 20, accentSat: 75, accentLight: 45 },
  10: { name: "Autumn", heroImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", accentHue: 15, accentSat: 60, accentLight: 45 },
  11: { name: "Winter", heroImage: "https://images.unsplash.com/photo-1482442120256-9c03866de390?w=800&q=80", accentHue: 220, accentSat: 50, accentLight: 55 },
};

export const US_HOLIDAYS: Record<string, string> = {
  "01-01": "New Year's Day",
  "01-20": "MLK Day",
  "02-14": "Valentine's Day",
  "02-17": "Presidents' Day",
  "03-17": "St. Patrick's Day",
  "05-26": "Memorial Day",
  "06-19": "Juneteenth",
  "07-04": "Independence Day",
  "09-01": "Labor Day",
  "10-13": "Columbus Day",
  "10-31": "Halloween",
  "11-11": "Veterans Day",
  "11-27": "Thanksgiving",
  "12-25": "Christmas",
  "12-31": "New Year's Eve",
};

export function getCalendarDays(currentMonth: Date) {
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const days: Date[] = [];
  let day = calStart;
  while (day <= calEnd) {
    days.push(day);
    day = addDays(day, 1);
  }
  return days;
}

export function isInRange(day: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false;
  const start = range.start < range.end ? range.start : range.end;
  const end = range.start < range.end ? range.end : range.start;
  return isWithinInterval(day, { start, end });
}

export function isRangeStart(day: Date, range: DateRange): boolean {
  if (!range.start) return false;
  const start = range.end && range.end < range.start ? range.end : range.start;
  return isSameDay(day, start);
}

export function isRangeEnd(day: Date, range: DateRange): boolean {
  if (!range.end) return false;
  const end = range.end < range.start! ? range.start! : range.end;
  return isSameDay(day, end);
}

export function getHoliday(day: Date): string | undefined {
  const key = format(day, "MM-dd");
  return US_HOLIDAYS[key];
}

export function loadNotes(monthKey: string): CalendarNote[] {
  try {
    const raw = localStorage.getItem(`cal-notes-${monthKey}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveNotes(monthKey: string, notes: CalendarNote[]) {
  localStorage.setItem(`cal-notes-${monthKey}`, JSON.stringify(notes));
}

export { format, addMonths, subMonths, isSameMonth, isSameDay, startOfMonth };

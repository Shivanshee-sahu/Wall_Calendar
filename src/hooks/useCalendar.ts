import { useState, useCallback, useEffect } from "react";

export interface CalendarNote {
  date: string; // YYYY-MM-DD
  text: string;
}

export interface CalendarTask {
  id: string;
  date: string;
  title: string;
  time: string;
  category: "meeting" | "research" | "design" | "review";
}

const NOTES_KEY = "calendar-notes";
const TASKS_KEY = "calendar-tasks";

function getStoredNotes(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
  } catch {
    return {};
  }
}

function getStoredTasks(): CalendarTask[] {
  try {
    return JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
  } catch {
    return [];
  }
}

function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [notes, setNotes] = useState<Record<string, string>>(getStoredNotes);
  const [tasks, setTasks] = useState<CalendarTask[]>(getStoredTasks);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const goToPrevMonth = useCallback(() => {
    setSlideDirection("right");
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setSlideDirection("left");
    setCurrentMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  }, []);

  const handleDateClick = useCallback((date: Date) => {
    setSelectedDate(date);
    if (!rangeStart || (rangeStart && rangeEnd)) {
      setRangeStart(date);
      setRangeEnd(null);
    } else {
      if (date < rangeStart) {
        setRangeEnd(rangeStart);
        setRangeStart(date);
      } else {
        setRangeEnd(date);
      }
    }
  }, [rangeStart, rangeEnd]);

  const isInRange = useCallback((date: Date) => {
    if (!rangeStart || !rangeEnd) return false;
    return date >= rangeStart && date <= rangeEnd;
  }, [rangeStart, rangeEnd]);

  const isRangeStart = useCallback((date: Date) => {
    if (!rangeStart) return false;
    return formatDateKey(date) === formatDateKey(rangeStart);
  }, [rangeStart]);

  const isRangeEnd = useCallback((date: Date) => {
    if (!rangeEnd) return false;
    return formatDateKey(date) === formatDateKey(rangeEnd);
  }, [rangeEnd]);

  const isToday = useCallback((date: Date) => {
    const today = new Date();
    return formatDateKey(date) === formatDateKey(today);
  }, []);

  const isSelected = useCallback((date: Date) => {
    if (!selectedDate) return false;
    return formatDateKey(date) === formatDateKey(selectedDate);
  }, [selectedDate]);

  const setNote = useCallback((date: Date, text: string) => {
    const key = formatDateKey(date);
    setNotes((prev) => {
      if (!text.trim()) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: text };
    });
  }, []);

  const getNote = useCallback((date: Date) => {
    return notes[formatDateKey(date)] || "";
  }, [notes]);

  const addTask = useCallback((task: Omit<CalendarTask, "id">) => {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }]);
  }, []);

  const removeTask = useCallback((id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getTasksForDate = useCallback((date: Date) => {
    const key = formatDateKey(date);
    return tasks.filter((t) => t.date === key);
  }, [tasks]);

  const getDaysInMonth = useCallback(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = (firstDay.getDay() + 6) % 7; // Monday start
    const days: (Date | null)[] = [];

    for (let i = 0; i < startPadding; i++) {
      const prevDate = new Date(year, month, -startPadding + i + 1);
      days.push(prevDate);
    }
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push(new Date(year, month + 1, i));
    }
    return days;
  }, [currentMonth]);

  const isCurrentMonth = useCallback((date: Date) => {
    return date.getMonth() === currentMonth.getMonth();
  }, [currentMonth]);

  return {
    currentMonth,
    selectedDate,
    rangeStart,
    rangeEnd,
    slideDirection,
    goToPrevMonth,
    goToNextMonth,
    handleDateClick,
    isInRange,
    isRangeStart,
    isRangeEnd,
    isToday,
    isSelected,
    setNote,
    getNote,
    addTask,
    removeTask,
    getTasksForDate,
    getDaysInMonth,
    isCurrentMonth,
    notes,
    tasks,
    formatDateKey,
  };
}

export { formatDateKey };

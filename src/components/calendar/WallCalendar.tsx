import React, { useState, useEffect, useMemo, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  DateRange,
  CalendarNote,
  SEASONAL_THEMES,
  format,
  addMonths,
  subMonths,
  isSameDay,
  loadNotes,
  saveNotes,
} from "@/lib/calendar-data";

const generateId = () => {
  if (typeof window !== 'undefined' && window.crypto?.randomUUID) {
    return window.crypto.randomUUID();
  }
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { HeroImage } from "./HeroImage";
import { SpiralBinding } from "./SpiralBinding";
import { SearchBar } from "./SearchBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sun, Moon } from "lucide-react";

export const WallCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [dateRange, setDateRange] = useState<DateRange>({ start: null, end: null });
  const [notes, setNotes] = useState<CalendarNote[]>([]);
  const [dark, setDark] = useState(false);
  const [flipPhase, setFlipPhase] = useState<"idle" | "out" | "in">("idle");
  const [flipDir, setFlipDir] = useState<"next" | "prev" | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const today = useMemo(() => new Date(), []);
  const monthKey = format(currentMonth, "yyyy-MM");
  const theme = SEASONAL_THEMES[currentMonth.getMonth()];

  const filteredNotes = useMemo(() => {
    if (!searchQuery.trim()) return notes;
    const q = searchQuery.toLowerCase();
    return notes.filter((n) => n.text.toLowerCase().includes(q));
  }, [notes, searchQuery]);

  useEffect(() => { setNotes(loadNotes(monthKey)); }, [monthKey]);
  useEffect(() => { document.documentElement.classList.toggle("dark", dark); }, [dark]);
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--cal-accent", `${theme.accentHue} ${theme.accentSat}% ${theme.accentLight}%`);
  }, [theme]);

  const navigateMonth = useCallback((dir: "next" | "prev") => {
    if (isNavigating) return;
    setIsNavigating(true);
    setFlipDir(dir);
    setFlipPhase("out");
    setTimeout(() => {
      setCurrentMonth((m) => (dir === "next" ? addMonths(m, 1) : subMonths(m, 1)));
      setDateRange({ start: null, end: null });
      setFlipPhase("in");
      setTimeout(() => {
        setFlipPhase("idle");
        setFlipDir(null);
        setIsNavigating(false);
      }, 500);
    }, 500);
  }, [isNavigating]);

  const handleDayClick = useCallback((day: Date) => {
    setDateRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) return { start: day, end: null };
      if (isSameDay(day, prev.start)) return { start: day, end: day };
      return { start: prev.start, end: day };
    });
  }, []);

  const handleAddNote = useCallback((text: string, range: DateRange) => {
    const note: CalendarNote = {
      id: generateId(),
      text,
      rangeStart: range.start ? format(range.start, "MMM d") : undefined,
      rangeEnd: range.end ? format(range.end, "MMM d") : undefined,
      createdAt: new Date().toISOString(),
    };
    const updated = [note, ...notes];
    setNotes(updated);
    saveNotes(monthKey, updated);
  }, [notes, monthKey]);

  const handleDeleteNote = useCallback((id: string) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveNotes(monthKey, updated);
  }, [notes, monthKey]);

  const yearStr = format(currentMonth, "yyyy");
  const monthStr = format(currentMonth, "MMMM");
  const monthLabel = `${monthStr} ${yearStr}`;

  return (
    <div className="min-h-screen bg-background transition-colors duration-500 flex flex-col items-center justify-start py-6 sm:py-10 px-4">
      {/* Top controls - Widened to match calendar */}
      <div className="w-full max-w-3xl flex items-center justify-between mb-4 animate-fade-in">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-border/60 hover:bg-accent transition-all duration-200"
            onClick={() => navigateMonth("prev")}
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full border-border/60 hover:bg-accent transition-all duration-200"
            onClick={() => navigateMonth("next")}
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setDark(!dark)}
          className="rounded-full h-9 w-9 hover:bg-accent transition-all duration-200"
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      {/* Search bar - Widened */}
      <div className="w-full max-w-4xl mb-6 animate-fade-in" style={{ animationDelay: "50ms" }}>
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search notes…" />
      </div>

      {/* Wall Calendar Card - Increased max-width to 4xl */}
      <div
        className="w-full max-w-4xl bg-card rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden animate-slide-up calendar-perspective border border-border/50"
        style={{ animationDelay: "100ms" }}
      >
        {/* Spiral binding - increased count for wider span */}
        <SpiralBinding count={20} />

        {/* Flip container */}
        <div
          className={cn(
            "calendar-page bg-card",
            flipPhase === "out" && flipDir === "next" && "animate-page-out-next",
            flipPhase === "out" && flipDir === "prev" && "animate-page-out-prev",
            flipPhase === "in" && flipDir === "next" && "animate-page-in-next",
            flipPhase === "in" && flipDir === "prev" && "animate-page-in-prev",
          )}
        >
          {/* Hero Image — Full width, slightly taller */}
          <div className="relative h-[300px] sm:h-[400px] overflow-hidden">
            <HeroImage
              src={theme.heroImage}
              monthLabel={monthLabel}
              year={yearStr}
              month={monthStr}
              seasonName={theme.name}
            />
          </div>

          {/* Bottom half — Balanced proportions */}
          <div className="flex flex-col md:flex-row min-h-[450px]">
            {/* Notes section — 30% width */}
            <div className="md:w-[30%] border-r border-border/20 p-6 bg-secondary/5">
              <NotesPanel
                notes={filteredNotes}
                onAddNote={handleAddNote}
                onDeleteNote={handleDeleteNote}
                dateRange={dateRange}
              />
            </div>

            {/* Calendar grid — 70% width for better visibility */}
            <div className="md:w-[70%] p-6 flex flex-col justify-center">
              <CalendarGrid
                currentMonth={currentMonth}
                dateRange={dateRange}
                onDayClick={handleDayClick}
                today={today}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
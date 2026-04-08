import { useState, useMemo } from "react";
import Sidebar from "@/components/Sidebar";
import CalendarGrid from "@/components/CalendarGrid";
import TaskPanel from "@/components/TaskPanel";
import DaySchedule from "@/components/DaySchedule";
import PageTransition from "@/components/PageTransition";
import HomePage from "@/components/HomePage";
import TasksPage from "@/components/TasksPage";
import ContactsPage from "@/components/ContactsPage";
import SettingsPage from "@/components/SettingsPage";
import { useCalendar } from "@/hooks/useCalendar";
import { Search, Bell, Settings, Plus } from "lucide-react";

const PAGE_TITLES: Record<string, string> = {
  home: "Home",
  calendar: "Calendar",
  tasks: "Tasks",
  contacts: "Contacts",
  settings: "Settings",
};

export default function Index() {
  const [activeNav, setActiveNav] = useState("calendar");
  const calendar = useCalendar();

  const days = calendar.getDaysInMonth();
  const selectedTasks = calendar.selectedDate
    ? calendar.getTasksForDate(calendar.selectedDate)
    : [];
  const selectedNote = calendar.selectedDate
    ? calendar.getNote(calendar.selectedDate)
    : "";

  const pageContent = useMemo(() => {
    switch (activeNav) {
      case "home":
        return <HomePage />;
      case "tasks":
        return <TasksPage />;
      case "contacts":
        return <ContactsPage />;
      case "settings":
        return <SettingsPage />;
      case "calendar":
      default:
        return (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
            <div className="space-y-6">
              <CalendarGrid
                currentMonth={calendar.currentMonth}
                slideDirection={calendar.slideDirection}
                days={days}
                onPrev={calendar.goToPrevMonth}
                onNext={calendar.goToNextMonth}
                onDateClick={calendar.handleDateClick}
                isToday={calendar.isToday}
                isSelected={calendar.isSelected}
                isInRange={calendar.isInRange}
                isRangeStart={calendar.isRangeStart}
                isRangeEnd={calendar.isRangeEnd}
                isCurrentMonth={calendar.isCurrentMonth}
                hasNote={(d) => !!calendar.getNote(d)}
                hasTask={(d) => calendar.getTasksForDate(d).length > 0}
              />
              <DaySchedule
                selectedDate={calendar.selectedDate}
                tasks={selectedTasks}
              />
            </div>
            <div className="hidden xl:block">
              <div className="sticky top-24">
                <TaskPanel
                  selectedDate={calendar.selectedDate}
                  tasks={selectedTasks}
                  note={selectedNote}
                  onNoteChange={(text) =>
                    calendar.selectedDate && calendar.setNote(calendar.selectedDate, text)
                  }
                  onAddTask={calendar.addTask}
                  onRemoveTask={calendar.removeTask}
                  allTasks={calendar.tasks}
                />
              </div>
            </div>
            <div className="mt-6 xl:hidden col-span-full">
              <TaskPanel
                selectedDate={calendar.selectedDate}
                tasks={selectedTasks}
                note={selectedNote}
                onNoteChange={(text) =>
                  calendar.selectedDate && calendar.setNote(calendar.selectedDate, text)
                }
                onAddTask={calendar.addTask}
                onRemoveTask={calendar.removeTask}
                allTasks={calendar.tasks}
              />
            </div>
          </div>
        );
    }
  }, [activeNav, calendar, days, selectedTasks, selectedNote]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeItem={activeNav} onItemClick={setActiveNav} />

      <div className="ml-16 flex flex-1 flex-col lg:ml-20">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-background/80 px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <h1
              key={activeNav}
              className="text-2xl font-bold text-foreground animate-fade-in"
            >
              {PAGE_TITLES[activeNav] || "Calendar"}
            </h1>
            <div className="ml-4 hidden items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2 sm:flex">
              <Search className="h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search"
                className="w-40 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-border transition-all hover:bg-secondary active:scale-95">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-primary animate-pulse-dot" />
            </button>
            <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-border transition-all hover:bg-secondary active:scale-95">
              <Settings className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 active:scale-95">
              <Plus className="h-4 w-4" />
              Add Task
            </button>
          </div>
        </header>

        {/* Content with page transition */}
        <main className="flex-1 p-4 lg:p-6">
          <PageTransition activeKey={activeNav}>
            {pageContent}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}

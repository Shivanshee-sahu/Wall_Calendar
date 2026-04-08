import { Calendar, Home, CheckSquare, Users, Settings, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "tasks", icon: CheckSquare, label: "Tasks" },
  { id: "contacts", icon: Users, label: "Contacts" },
  { id: "settings", icon: Settings, label: "Settings" },
];

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-16 flex-col items-center bg-sidebar py-6 lg:w-20">
      {/* Logo */}
      <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
        <Calendar className="h-5 w-5 text-primary-foreground" />
      </div>

      {/* Nav Items */}
      <nav className="flex flex-1 flex-col items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={cn(
                "group relative flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-200",
                isActive
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              title={item.label}
            >
              <Icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              {isActive && (
                <span className="absolute -left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-primary transition-all" />
              )}
              {/* Tooltip */}
              <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium text-background opacity-0 shadow-elevated transition-opacity group-hover:opacity-100 lg:block">
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Notification */}
      <button className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-sidebar-foreground transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
        <Bell className="h-5 w-5" />
        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-primary" />
      </button>
    </aside>
  );
}

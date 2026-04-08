import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search events, tasks, notes…",
}) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div
      className={cn(
        "relative flex items-center gap-2.5 rounded-xl border bg-card px-4 py-2.5 transition-all duration-300",
        focused
          ? "border-primary/40 shadow-lg shadow-primary/10 ring-4 ring-primary/5"
          : "border-border hover:border-muted-foreground/30 hover:shadow-sm"
      )}
    >
      <Search
        className={cn(
          "w-4 h-4 shrink-0 transition-colors duration-200",
          focused ? "text-primary" : "text-muted-foreground/60"
        )}
      />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/50 outline-none"
      />
      {value ? (
        <button
          onClick={() => onChange("")}
          className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-lg hover:bg-muted"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : (
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-lg border bg-muted/80 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
          ⌘K
        </kbd>
      )}
    </div>
  );
};

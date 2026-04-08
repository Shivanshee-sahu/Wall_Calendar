import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarNote, DateRange, format } from "@/lib/calendar-data";
import { ClipboardCopy, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface NotesPanelProps {
  notes: CalendarNote[];
  onAddNote: (text: string, range: DateRange) => void;
  onDeleteNote: (id: string) => void;
  dateRange: DateRange;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
  dateRange,
}) => {
  const [draft, setDraft] = useState("");

  const handleAdd = () => {
    if (!draft.trim()) return;
    onAddNote(draft.trim(), dateRange);
    setDraft("");
  };

  const handleExport = () => {
    const text = notes
      .map((n) => {
        const range = n.rangeStart && n.rangeEnd ? `[${n.rangeStart} – ${n.rangeEnd}] ` : "";
        return `${range}${n.text}`;
      })
      .join("\n");
    navigator.clipboard.writeText(text);
    toast.success("Notes copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Notes</h3>
        {notes.length > 0 && (
          <Button variant="ghost" size="sm" onClick={handleExport} className="h-6 px-2 text-[10px] rounded hover:bg-accent">
            <ClipboardCopy className="w-3 h-3 mr-1" />
            Copy
          </Button>
        )}
      </div>

      {/* Lined note area */}
      <div className="flex-1 space-y-0">
        {/* Existing notes displayed on lines */}
        {notes.map((note, i) => (
          <div
            key={note.id}
            className="group relative border-b border-border/40 py-2 px-1 animate-fade-in"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            {note.rangeStart && note.rangeEnd && (
              <span className="text-[9px] text-primary font-semibold mr-1">
                [{note.rangeStart}–{note.rangeEnd}]
              </span>
            )}
            <span className="text-xs text-foreground leading-relaxed">{note.text}</span>
            <button
              onClick={() => onDeleteNote(note.id)}
              className="absolute top-2 right-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive p-0.5"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        ))}

        {/* Empty lines for visual effect */}
        {Array.from({ length: Math.max(0, 5 - notes.length) }).map((_, i) => (
          <div key={`empty-${i}`} className="border-b border-border/30 py-2.5" />
        ))}
      </div>

      {/* Add note input */}
      <div className="mt-3 space-y-2">
        <Textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a note…"
          className="min-h-[40px] text-xs resize-none rounded border-border/50 bg-transparent focus:border-primary/40"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleAdd();
          }}
        />
        <Button onClick={handleAdd} size="sm" className="w-full h-7 text-xs rounded" disabled={!draft.trim()}>
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>
    </div>
  );
};

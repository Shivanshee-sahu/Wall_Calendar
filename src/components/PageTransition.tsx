import { useState, useRef, useEffect, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageTransitionProps {
  activeKey: string;
  children: ReactNode;
}

export default function PageTransition({ activeKey, children }: PageTransitionProps) {
  const [displayedKey, setDisplayedKey] = useState(activeKey);
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [phase, setPhase] = useState<"idle" | "exit" | "enter">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (activeKey === displayedKey) return;

    // Start exit
    setPhase("exit");
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      setDisplayedKey(activeKey);
      setDisplayedChildren(children);
      setPhase("enter");

      timeoutRef.current = setTimeout(() => {
        setPhase("idle");
      }, 350);
    }, 200);

    return () => clearTimeout(timeoutRef.current);
  }, [activeKey]);

  // Keep children updated when same key
  useEffect(() => {
    if (activeKey === displayedKey && phase === "idle") {
      setDisplayedChildren(children);
    }
  }, [children, activeKey, displayedKey, phase]);

  return (
    <div
      className={cn(
        "transition-all duration-300 ease-out",
        phase === "exit" && "translate-y-3 opacity-0 scale-[0.98]",
        phase === "enter" && "animate-page-enter",
        phase === "idle" && "translate-y-0 opacity-100 scale-100"
      )}
    >
      {displayedChildren}
    </div>
  );
}

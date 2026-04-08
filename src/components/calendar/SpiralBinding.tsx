import React from "react";

interface SpiralBindingProps {
  count?: number;
}

export const SpiralBinding: React.FC<SpiralBindingProps> = ({ count = 15 }) => {
  return (
    <div className="relative w-full h-8 flex items-center justify-center z-20">
      {/* Shadow line behind the rings */}
      <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-border/50 -translate-y-1/2 rounded-full" />
      
      {/* Spiral rings */}
      <div className="flex items-center justify-between w-full px-6">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="relative w-3 h-6 flex items-center justify-center"
          >
            {/* Ring */}
            <div className="w-3 h-5 rounded-full border-2 border-muted-foreground/40 bg-background shadow-sm" />
          </div>
        ))}
      </div>
    </div>
  );
};

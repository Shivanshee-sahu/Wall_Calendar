import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface HeroImageProps {
  src: string;
  monthLabel: string;
  year: string;
  month: string;
  seasonName: string;
}

export const HeroImage: React.FC<HeroImageProps> = ({ src, monthLabel, year, month, seasonName }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-full h-full overflow-hidden bg-muted">
      <img
        src={src}
        alt={`${seasonName} - ${monthLabel}`}
        onLoad={() => setLoaded(true)}
        className={cn(
          "absolute inset-0 w-full h-full object-cover transition-all duration-700",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-muted-foreground/20 border-t-primary rounded-full animate-spin" />
        </div>
      )}

      {/* Diagonal accent wave at bottom-right */}
      <svg
        className="absolute bottom-0 right-0 w-[55%] h-[45%]"
        viewBox="0 0 300 200"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M300 0 C220 30, 180 80, 0 200 L300 200 Z"
          fill="hsl(var(--primary))"
          opacity="0.85"
        />
        <path
          d="M300 40 C230 65, 200 110, 60 200 L300 200 Z"
          fill="hsl(var(--primary))"
          opacity="0.6"
        />
      </svg>

      {/* Year + Month text overlay on the wave */}
      <div className="absolute bottom-4 right-5 sm:bottom-6 sm:right-8 text-right z-10">
        <p className="text-lg sm:text-xl font-light tracking-wider text-primary-foreground/90">{year}</p>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-primary-foreground">{month}</h2>
      </div>
    </div>
  );
};

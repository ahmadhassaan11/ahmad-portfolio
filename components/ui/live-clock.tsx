"use client";

// useEffect for the interval; uses Intl.DateTimeFormat — both browser-only.

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

interface LiveClockProps {
  /** IANA timezone, e.g. "Asia/Karachi". */
  timezone: string;
  /** City label rendered after the time, separated by "·". Optional. */
  city?: string;
  className?: string;
}

function format(timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(new Date());
}

/**
 * Live local timestamp in the spec's format: `HH:MM TZ · City`.
 *
 * Server renders the static placeholder `--:-- ··· City` so layout doesn't
 * shift on hydration, then the client takes over and updates every 30s.
 */
export function LiveClock({ timezone, city, className }: LiveClockProps) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    setTime(format(timezone));
    const interval = setInterval(() => setTime(format(timezone)), 30_000);
    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <span
      className={cn("font-mono text-xs tabular-nums text-mute", className)}
      suppressHydrationWarning
    >
      {time ?? "--:-- ···"}
      {city ? ` · ${city}` : null}
    </span>
  );
}

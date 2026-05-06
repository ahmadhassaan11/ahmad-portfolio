"use client";

// Reads/writes data-theme + localStorage; uses Motion to animate an SVG
// mask that morphs a sun into a crescent moon. Browser APIs + state — must
// run on the client.

import { motion } from "motion/react";
import { useEffect, useId, useState } from "react";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

interface ThemeToggleProps {
  className?: string;
}

const SPRING = { type: "spring" as const, stiffness: 280, damping: 22 };

// Sun rays: eight short lines around a center disc.
const RAY_LENGTH = 4.5;
const RAYS = Array.from({ length: 8 }, (_, i) => {
  const angle = (Math.PI / 4) * i;
  const inner = 7;
  const outer = inner + RAY_LENGTH;
  return {
    x1: 12 + Math.cos(angle) * inner,
    y1: 12 + Math.sin(angle) * inner,
    x2: 12 + Math.cos(angle) * outer,
    y2: 12 + Math.sin(angle) * outer,
  };
});

export function ThemeToggle({ className }: ThemeToggleProps) {
  const maskId = useId();
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(readTheme());
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // localStorage unavailable — toggle still works for the session.
    }
    setTheme(next);
  }

  // SSR placeholder: empty button — server can't read the user's theme.
  if (theme === null) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={cn(
          "inline-flex size-9 items-center justify-center rounded-md text-fg",
          className,
        )}
      />
    );
  }

  const isDark = theme === "dark";
  const label = `Switch to ${isDark ? "light" : "dark"} theme`;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-md text-fg",
        "transition-colors duration-150 hover:bg-surface",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        "focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
        <defs>
          <mask id={maskId}>
            <rect width="24" height="24" fill="white" />
            {/* This circle, when visible, "bites" a crescent out of the body
             * disc. We slide it offscreen in light mode and into position
             * (top-right) in dark mode. */}
            <motion.circle
              r="9"
              fill="black"
              initial={false}
              animate={{ cx: isDark ? 18 : 28, cy: isDark ? 6 : -6 }}
              transition={SPRING}
            />
          </mask>
        </defs>

        {/* Body disc. Slightly larger in dark mode (moon) than light (sun
         * core) so the mask read clean. */}
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask={`url(#${maskId})`}
          initial={false}
          animate={{ r: isDark ? 9 : 5 }}
          transition={SPRING}
        />

        {/* Sun rays — each fades+scales when switching to light. */}
        <motion.g
          initial={false}
          animate={{ opacity: isDark ? 0 : 1, scale: isDark ? 0.6 : 1 }}
          transition={{ ...SPRING, stiffness: 320 }}
          style={{ transformOrigin: "12px 12px" }}
        >
          {RAYS.map((ray) => (
            <line
              key={`${ray.x1}-${ray.y1}`}
              x1={ray.x1}
              y1={ray.y1}
              x2={ray.x2}
              y2={ray.y2}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          ))}
        </motion.g>
      </svg>
    </button>
  );
}

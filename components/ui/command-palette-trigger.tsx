"use client";

// Just an event-dispatching button — keeps the footer/server tree free of
// the cmdk runtime; the palette listens for the custom event globally.

import { Search } from "lucide-react";
import { cn } from "@/lib/cn";

interface CommandPaletteTriggerProps {
  className?: string;
}

export function CommandPaletteTrigger({ className }: CommandPaletteTriggerProps) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
      // Visible "Search" text serves as the accessible name; aria-label that
      // doesn't include the visible text would trigger
      // label-content-name-mismatch.
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-md border border-line bg-surface px-3 font-mono text-xs text-mute transition-colors duration-150 hover:border-fg/30 hover:text-fg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
        className,
      )}
    >
      <Search className="size-3.5" aria-hidden="true" />
      <span>Search</span>
      <kbd className="ml-1 hidden rounded border border-line bg-canvas px-1 py-0.5 text-[10px] uppercase tracking-wider sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}

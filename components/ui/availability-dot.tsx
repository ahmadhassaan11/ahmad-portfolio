import { cn } from "@/lib/cn";

interface AvailabilityDotProps {
  /** When false, the dot stops pulsing and dims. */
  available?: boolean;
  className?: string;
  /** If set, the dot announces itself as a status. Without a label it's
   * treated as a decorative glyph (aria-hidden) — pair it with adjacent
   * text that already conveys the meaning. */
  label?: string;
}

/**
 * Pulsing accent dot for the "currently available" indicator. CSS keyframe
 * pulse is allowed for this case (CLAUDE.md §5: "the simplest cases — loading
 * dot pulse, etc."). Honors prefers-reduced-motion via the global reset in
 * globals.css.
 */
export function AvailabilityDot({ available = true, className, label }: AvailabilityDotProps) {
  const wrapperClass = cn("relative inline-flex size-2 shrink-0", className);
  const inner = (
    <>
      {available && (
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-accent opacity-75"
        />
      )}
      <span
        aria-hidden="true"
        className={cn(
          "relative inline-flex size-2 rounded-full",
          available ? "bg-accent" : "bg-mute",
        )}
      />
    </>
  );

  if (label) {
    return (
      <span className={wrapperClass} role="status" aria-label={label}>
        {inner}
      </span>
    );
  }

  return (
    <span className={wrapperClass} aria-hidden="true">
      {inner}
    </span>
  );
}

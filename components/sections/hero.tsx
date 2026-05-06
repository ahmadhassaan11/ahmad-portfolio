import { AvailabilityDot } from "@/components/ui/availability-dot";
import { LiveClock } from "@/components/ui/live-clock";
import type { HomeStatus } from "@/lib/home";

interface HeroProps {
  tagline: string;
  status: HomeStatus;
}

/**
 * Above-the-fold hero. Three things only — name, one-liner, status row —
 * per SPEC §7.1.1. No big CTA button; the work below is the CTA.
 */
export function Hero({ tagline, status }: HeroProps) {
  return (
    <section className="space-y-6">
      <h1 className="text-balance font-semibold tracking-tight text-5xl md:text-6xl">
        Ahmad Hassaan Ullah
      </h1>

      <p className="max-w-prose text-balance text-lg text-fg/85 md:text-xl md:leading-relaxed">
        {tagline}
      </p>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-mute">
        <span className="inline-flex items-center gap-2">
          <AvailabilityDot
            available={status.available}
            label={status.available ? status.message : "Currently unavailable"}
          />
          {status.message}
        </span>
        <span aria-hidden="true">·</span>
        <LiveClock timezone={status.timezone} city={status.city} />
      </div>
    </section>
  );
}

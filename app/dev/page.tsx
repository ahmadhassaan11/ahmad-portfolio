import type { ReactNode } from "react";
import { AvailabilityDot } from "@/components/ui/availability-dot";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "@/components/ui/link";
import { LiveClock } from "@/components/ui/live-clock";
import { MetaStrip } from "@/components/ui/meta-strip";
import { MetricsGrid } from "@/components/ui/metrics-grid";
import { Tag } from "@/components/ui/tag";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Manual review surface — Phase 2 gate per CLAUDE.md §9. Each primitive shown
// in its variants on a single page so Ahmad can scan the whole system in one
// pass. Removed at Phase 8 handoff (or kept behind an env flag).

export const metadata = {
  title: "Design system primitives — /dev",
  robots: { index: false, follow: false },
};

interface SectionProps {
  title: string;
  note?: string;
  children: ReactNode;
}

function Section({ title, note, children }: SectionProps) {
  return (
    <section className="border-line border-t pt-10">
      <div className="mb-5">
        <h2 className="font-mono text-xs uppercase tracking-widest text-mute">{title}</h2>
        {note ? <p className="mt-1 text-sm text-mute">{note}</p> : null}
      </div>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </section>
  );
}

export default function DevPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-10 px-6 py-16">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="font-mono text-xs uppercase tracking-widest text-mute">/dev</p>
          <h1 className="text-4xl font-semibold tracking-tight">Design system primitives</h1>
          <p className="max-w-prose text-mute">
            Manual review surface for Phase 2. Each primitive is shown in its variants. Verify these
            feel right before composing pages on top.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Section title="Button" note="Primary + ghost. Server component; CSS hover transitions only.">
        <Button>Primary</Button>
        <Button size="sm">Primary sm</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost" size="sm">
          Ghost sm
        </Button>
        <Button disabled>Disabled</Button>
      </Section>

      <Section
        title="Link"
        note="Internal vs external auto-detected; arrow shown on external by default."
      >
        <Link href="/work">Internal link</Link>
        <Link href="https://linear.app">External link</Link>
        <Link href="https://vercel.com" appearance="subtle">
          Subtle (no underline)
        </Link>
      </Section>

      <Section title="Tag" note="Small mono chips for tech stack and metadata.">
        <Tag>TypeScript</Tag>
        <Tag>React</Tag>
        <Tag>Next.js</Tag>
        <Tag size="md">Larger size</Tag>
      </Section>

      <Section title="AvailabilityDot" note="Pulses on; dims off. Honors prefers-reduced-motion.">
        <AvailabilityDot />
        <AvailabilityDot available={false} />
        <span className="inline-flex items-center gap-2 font-mono text-xs text-mute">
          <AvailabilityDot label="Available for select consulting work" />
          Available for select consulting work — Q3 2026
        </span>
      </Section>

      <Section title="LiveClock" note="Updates every 30 seconds. SSR-safe placeholder.">
        <LiveClock timezone="Asia/Karachi" city="Lahore" />
        <LiveClock timezone="America/New_York" city="New York" />
      </Section>

      <Section title="ThemeToggle" note="Sun/moon swap, spring physics, persists to localStorage.">
        <ThemeToggle />
      </Section>

      <Section
        title="MetaStrip"
        note="Single-line metadata for case-study heads. Wraps gracefully."
      >
        <MetaStrip
          client="Advaita Bio"
          position="Software Engineer"
          year={2025}
          stack={["TypeScript", "React", "Meteor", "Node.js", "Python", "R", "AWS"]}
          liveUrl="https://iscanguide.advaitabio.com"
        />
      </Section>

      <Section title="MetricsGrid" note="Auto-renders from project frontmatter `metrics`.">
        <div className="w-full">
          <MetricsGrid
            metrics={[
              { label: "Cells supported", value: "10M+" },
              { label: "Browser memory reduction", value: "50%+" },
              { label: "Instrument formats", value: "5" },
              { label: "Unit tests / format", value: "~20" },
            ]}
          />
        </div>
      </Section>

      <Section title="Card" note="Project card. Spring-lift on hover, hero scale, CTA crossfade.">
        <div className="grid w-full gap-6 sm:grid-cols-2">
          <Card
            href="/work/iscanguide"
            title="iScanGuide — Single-Cell & Spatial Genomics Analysis Platform"
            client="Advaita Bio"
            position="Software Engineer"
            year={2025}
            summary="Scaled single-cell visualization from 100K to 10M+ cells; integrated five instrument platforms."
            stack={["TypeScript", "React", "Meteor", "Node.js", "Python", "R", "AWS"]}
          />
          <Card
            href="/work/nozl"
            title="Nozl — Distributed Rate Limiter"
            client="Personal / open-source"
            position="Author"
            year={2023}
            summary="Distributed rate limiter with smart schema validation, improving reliability of cloud APIs."
            stack={["Node.js", "Redis", "Distributed systems"]}
          />
        </div>
      </Section>
    </main>
  );
}

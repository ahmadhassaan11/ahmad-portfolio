import { Link } from "@/components/ui/link";
import type { ExperienceEntry } from "@/content/experience";
import { formatDateRange } from "@/lib/dates";

interface ExperienceListProps {
  entries: ExperienceEntry[];
}

/**
 * Selected experience. Compact list — company, role, dates per row, one
 * sentence below. No bullets, no logos. SPEC §7.1.3.
 */
export function ExperienceList({ entries }: ExperienceListProps) {
  return (
    <section className="space-y-8">
      <h2 className="font-mono text-xs uppercase tracking-widest text-mute">Selected experience</h2>

      <ol className="space-y-7">
        {entries.map((entry) => (
          <li key={`${entry.company}-${entry.start}`} className="space-y-1.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="font-medium text-fg">{entry.company}</span>
                <span className="text-mute">{entry.role}</span>
              </div>
              <span className="font-mono text-xs text-mute tabular-nums">
                {formatDateRange(entry.start, entry.end)}
              </span>
            </div>
            <p className="text-mute">{entry.summary}</p>
          </li>
        ))}
      </ol>

      <Link href="/about" appearance="subtle" showArrow>
        Full work history on /about
      </Link>
    </section>
  );
}

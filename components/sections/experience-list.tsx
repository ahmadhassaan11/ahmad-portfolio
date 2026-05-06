import { Link } from "@/components/ui/link";
import type { ExperienceEntry } from "@/content/experience";
import { formatDateRange } from "@/lib/dates";

interface ExperienceListProps {
  entries: ExperienceEntry[];
  /** Section heading. Defaults to "Selected experience". */
  title?: string;
  /** Render a "Full work history on /about" trailing link (home only). */
  showAllLink?: boolean;
}

/**
 * Compact list — company, role, dates per row, one sentence below. No
 * bullets, no logos. Used on home (top 3 + see-more link) and on /about
 * (full history, no trailing link). SPEC §7.1.3 / §7.4.
 */
export function ExperienceList({
  entries,
  title = "Selected experience",
  showAllLink = false,
}: ExperienceListProps) {
  return (
    <section className="space-y-8">
      <h2 className="font-mono text-xs uppercase tracking-widest text-mute">{title}</h2>

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

      {showAllLink ? (
        <Link href="/about" appearance="subtle" showArrow>
          Full work history on /about
        </Link>
      ) : null}
    </section>
  );
}

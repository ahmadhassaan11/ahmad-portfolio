import type { HomeCurrentlyEntry } from "@/lib/home";

interface CurrentlyBlockProps {
  entries: HomeCurrentlyEntry[];
}

/**
 * NOW / READ / NEXT triplet. Three lines, mono, two-column dl: short label
 * left, prose right. The most-loved section on most senior portfolios — it
 * signals a thinking engineer, not a CV. Keep it breathing. SPEC §7.1.4.
 */
export function CurrentlyBlock({ entries }: CurrentlyBlockProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-mono text-xs uppercase tracking-widest text-mute">Currently</h2>

      <dl className="space-y-2 font-mono text-sm">
        {entries.map((entry) => (
          <div key={entry.label} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-3">
            <dt className="text-mute">{entry.label}</dt>
            <dd className="text-fg/90">{entry.text}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

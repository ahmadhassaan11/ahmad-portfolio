import type { ProjectMetric } from "@/lib/projects";

interface MetricsGridProps {
  metrics: ProjectMetric[];
}

/**
 * Auto-renders a grid from a project's `metrics` frontmatter array. Two
 * columns on small screens, four on medium+. Borders read as faint hairlines
 * because we use `gap-px` over the `bg-line` colour beneath.
 *
 * Returns null if the array is empty so the case-study layout doesn't get a
 * dangling section.
 */
export function MetricsGrid({ metrics }: MetricsGridProps) {
  if (metrics.length === 0) return null;

  return (
    <dl className="my-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-canvas p-5">
          <dd className="text-3xl font-semibold tracking-tight tabular-nums">{m.value}</dd>
          <dt className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-mute">
            {m.label}
          </dt>
        </div>
      ))}
    </dl>
  );
}

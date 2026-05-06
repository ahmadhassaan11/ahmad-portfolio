"use client";

// Filter chips need useState + onClick — must run on the client. Cards
// rendered inside are also client components (Motion-driven hover lift).

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";
import type { ProjectFrontmatter } from "@/lib/projects";

interface WorkGridProps {
  projects: ProjectFrontmatter[];
}

export function WorkGrid({ projects }: WorkGridProps) {
  // Compute the union of every stack across all projects, sorted alphabetically.
  // useMemo because projects is stable per render but stack arrays are
  // multi-megabytes... no, it's tiny — useMemo is for clarity, not perf.
  const allTechs = useMemo(() => {
    const set = new Set<string>();
    for (const p of projects) for (const t of p.stack) set.add(t);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const [active, setActive] = useState<Set<string>>(() => new Set());

  // OR semantics: a project is visible if it has *any* of the active techs.
  // No active filters = everything visible.
  const visible = useMemo(() => {
    if (active.size === 0) return projects;
    return projects.filter((p) => p.stack.some((t) => active.has(t)));
  }, [projects, active]);

  function toggle(tech: string) {
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(tech)) next.delete(tech);
      else next.add(tech);
      return next;
    });
  }

  function clear() {
    setActive(new Set());
  }

  return (
    <div className="space-y-8">
      <fieldset className="flex flex-wrap items-center gap-1.5 border-0 p-0">
        <legend className="sr-only">Filter projects by tech</legend>
        {allTechs.map((tech) => {
          const isActive = active.has(tech);
          return (
            <button
              key={tech}
              type="button"
              onClick={() => toggle(tech)}
              aria-pressed={isActive}
              className={cn(
                "inline-flex h-7 items-center rounded border px-2.5 font-mono text-[10px] uppercase tracking-wider transition-colors duration-150",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas",
                isActive
                  ? "border-accent bg-accent text-accent-fg"
                  : "border-line bg-surface text-mute hover:border-fg/30 hover:text-fg",
              )}
            >
              {tech}
            </button>
          );
        })}
        {active.size > 0 ? (
          <button
            type="button"
            onClick={clear}
            className="ml-1 inline-flex h-7 items-center px-1.5 font-mono text-[10px] uppercase tracking-wider text-mute transition-colors hover:text-fg focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            Clear
          </button>
        ) : null}
      </fieldset>

      <p className="font-mono text-xs text-mute" aria-live="polite">
        {visible.length} of {projects.length}
        {active.size > 0 ? ` · matching ${Array.from(active).join(", ")}` : null}
      </p>

      {visible.length === 0 ? (
        <p className="py-12 text-center font-mono text-sm text-mute">
          No projects match the current filter.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {visible.map((p) => (
            <Card
              key={p.slug}
              href={`/work/${p.slug}`}
              title={p.title}
              client={p.client}
              position={p.role}
              year={p.year}
              summary={p.summary}
              stack={p.stack}
              heroImage={p.heroImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}

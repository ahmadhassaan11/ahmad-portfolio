import { Card } from "@/components/ui/card";
import type { ProjectFrontmatter } from "@/lib/projects";

interface FeaturedWorkProps {
  projects: ProjectFrontmatter[];
}

/**
 * The most important section of the home page. Curate brutally — three to
 * four projects, no more (SPEC §7.1.2). Single-column stack to keep a
 * deliberate reading rhythm; we resist the urge to grid for visual interest.
 */
export function FeaturedWork({ projects }: FeaturedWorkProps) {
  return (
    <section className="space-y-8">
      <h2 className="font-mono text-xs uppercase tracking-widest text-mute">Selected work</h2>
      <div className="space-y-6">
        {projects.map((p) => (
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
    </section>
  );
}

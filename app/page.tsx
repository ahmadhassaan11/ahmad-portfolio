import { getAllProjects } from "@/lib/projects";

export default async function HomePage() {
  // Server Component — runs on the server, reads MDX frontmatter at build time.
  // The real home composition lands in Phase 4; this is the scaffold's proof
  // that adding a new MDX file under content/projects/ is auto-detected.
  const projects = await getAllProjects();

  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Ahmad Hassaan Ullah</h1>
      <p className="mt-4 text-lg text-mute">
        Senior software engineer. I build and scale production web platforms — currently shipping at
        Advaita Bioinformatics.
      </p>

      <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-mute">
        <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
        scaffold v0.3 — mdx pipeline online · {projects.length} projects detected
      </div>

      <section className="mt-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-mute">content/projects/</h2>
        <ul className="mt-4 divide-y divide-line border-line border-t border-b">
          {projects.map((p) => (
            <li
              key={p.slug}
              className="flex items-baseline justify-between gap-6 py-3 font-mono text-sm"
            >
              <span className="text-fg">{p.slug}.mdx</span>
              <span className="truncate text-mute">{p.title}</span>
              <span className="shrink-0 text-mute">{p.year}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

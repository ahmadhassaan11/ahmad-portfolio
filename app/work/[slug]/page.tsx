import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { FadeIn } from "@/components/motion/fade-in";
import { MetaStrip } from "@/components/ui/meta-strip";
import { MetricsGrid } from "@/components/ui/metrics-grid";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Ahmad Hassaan Ullah`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  // Dynamic MDX import — Next bundles all matching files at build time, so
  // adding a new content/projects/*.mdx is auto-picked-up without code edits.
  const { default: Content } = await import(`@/content/projects/${slug}.mdx`);

  // Bind frontmatter metrics to the <MetricsGrid /> shortcode used in MDX
  // bodies. The mdx-components.tsx map provides typography defaults; this
  // per-render override threads project-specific data into the prose flow.
  const BoundMetricsGrid = () => <MetricsGrid metrics={project.metrics ?? []} />;

  // Prev/next based on the chronological project list (most recent first).
  const all = await getAllProjects();
  const idx = all.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? (all[idx - 1] ?? null) : null;
  const next = idx < all.length - 1 ? (all[idx + 1] ?? null) : null;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <FadeIn>
        <header className="mb-12 space-y-5">
          <NextLink
            href="/work"
            className="group inline-flex items-center gap-1.5 font-mono text-xs text-mute transition-colors hover:text-fg focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <ArrowLeft
              className="size-3 transition-transform group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
            All work
          </NextLink>

          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            {project.title}
          </h1>

          <MetaStrip
            client={project.client}
            position={project.role}
            year={project.year}
            stack={project.stack}
            liveUrl={project.liveUrl}
          />
        </header>

        {project.heroImage ? (
          <div className="relative mb-16 aspect-[16/9] overflow-hidden rounded-lg border border-line bg-surface">
            <Image
              src={project.heroImage}
              alt={`${project.title} — hero visual`}
              fill
              priority
              sizes="(min-width: 768px) 672px, 100vw"
              className="object-cover"
            />
          </div>
        ) : null}
      </FadeIn>

      <article>
        <Content components={{ MetricsGrid: BoundMetricsGrid }} />
      </article>

      <nav className="mt-24 grid grid-cols-1 gap-3 border-line border-t pt-8 sm:grid-cols-2">
        {prev ? (
          <NextLink
            href={`/work/${prev.slug}`}
            className="group flex flex-col gap-1 rounded-md border border-line bg-surface p-5 transition-colors hover:border-fg/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
              ← Previous
            </span>
            <span className="font-medium text-fg">{prev.title}</span>
          </NextLink>
        ) : (
          <div aria-hidden="true" />
        )}
        {next ? (
          <NextLink
            href={`/work/${next.slug}`}
            className="group flex flex-col gap-1 rounded-md border border-line bg-surface p-5 transition-colors hover:border-fg/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas sm:items-end sm:text-right"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Next →</span>
            <span className="font-medium text-fg">{next.title}</span>
          </NextLink>
        ) : (
          <div aria-hidden="true" />
        )}
      </nav>
    </main>
  );
}

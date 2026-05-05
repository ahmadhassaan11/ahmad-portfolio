/**
 * Project loader — single source of truth for project metadata.
 *
 * Reads every `*.mdx` file under `content/projects/` at build time, parses
 * the YAML frontmatter via gray-matter, and returns typed objects.
 *
 * Self-edit promise: dropping a new MDX file under `content/projects/` is
 * picked up automatically on the next build. No code edits required.
 *
 * Frontmatter is treated as `ProjectFrontmatter` after a minimal sanity check.
 * If a required field is missing, the loader throws with the offending file
 * name so the error is obvious during preview deploys.
 */

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type ProjectStatus = "ongoing" | "shipped";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectFrontmatter {
  slug: string;
  title: string;
  client: string;
  role: string;
  year: number;
  status: ProjectStatus;
  featured: boolean;
  order?: number;
  stack: string[];
  heroImage?: string;
  liveUrl?: string;
  metrics?: ProjectMetric[];
  /** One-sentence outcome shown on home/work cards. */
  summary: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const REQUIRED_FIELDS: ReadonlyArray<keyof ProjectFrontmatter> = [
  "slug",
  "title",
  "client",
  "role",
  "year",
  "status",
  "featured",
  "stack",
  "summary",
];

function assertProjectFrontmatter(
  data: Record<string, unknown>,
  filename: string,
): asserts data is ProjectFrontmatter & Record<string, unknown> {
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null) {
      throw new Error(
        `[content/projects/${filename}] missing required frontmatter field: ${field}`,
      );
    }
  }
}

export async function getAllProjects(): Promise<ProjectFrontmatter[]> {
  const files = await fs.readdir(PROJECTS_DIR);
  const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

  const projects = await Promise.all(
    mdxFiles.map(async (file) => {
      const raw = await fs.readFile(path.join(PROJECTS_DIR, file), "utf-8");
      const { data } = matter(raw);
      assertProjectFrontmatter(data, file);
      return data;
    }),
  );

  return projects.sort((a, b) => {
    if (b.year !== a.year) return b.year - a.year;
    return (a.order ?? 99) - (b.order ?? 99);
  });
}

export async function getFeaturedProjects(): Promise<ProjectFrontmatter[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.featured).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export async function getProjectBySlug(slug: string): Promise<ProjectFrontmatter | null> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug) ?? null;
}

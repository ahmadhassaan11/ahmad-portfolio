/**
 * Home-page content loader. Reads `content/home.mdx` frontmatter — the
 * single source of truth for hero tagline, availability status, the
 * NOW/READ/NEXT triplet, trust signals, and contact links.
 *
 * Editable copy lives in MDX. The body of the file is intentionally empty;
 * everything is structured frontmatter so Ahmad can edit one file and have
 * the home page change without touching React.
 */

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface HomeStatus {
  available: boolean;
  message: string;
  /** IANA timezone identifier, e.g. "Asia/Karachi". */
  timezone: string;
  city: string;
}

export interface HomeCurrentlyEntry {
  /** Three-letter mono label: NOW / READ / NEXT (or whatever Ahmad chooses). */
  label: string;
  text: string;
}

export interface HomeContact {
  email: string;
  github?: string;
  /** Public repo URL for the "view source" footer link. */
  repoUrl?: string;
  linkedin?: string;
  upwork?: string;
  x?: string;
}

export interface HomeContent {
  tagline: string;
  status: HomeStatus;
  currently: HomeCurrentlyEntry[];
  trust: string[];
  contact: HomeContact;
}

const HOME_PATH = path.join(process.cwd(), "content", "home.mdx");

const REQUIRED_FIELDS: ReadonlyArray<keyof HomeContent> = [
  "tagline",
  "status",
  "currently",
  "trust",
  "contact",
];

function assertHomeContent(
  data: Record<string, unknown>,
): asserts data is HomeContent & Record<string, unknown> {
  for (const field of REQUIRED_FIELDS) {
    if (data[field] === undefined || data[field] === null) {
      throw new Error(`[content/home.mdx] missing required frontmatter field: ${field}`);
    }
  }
}

export async function getHomeContent(): Promise<HomeContent> {
  const raw = await fs.readFile(HOME_PATH, "utf-8");
  const { data } = matter(raw);
  assertHomeContent(data);
  return data;
}

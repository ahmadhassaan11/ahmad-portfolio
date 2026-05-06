/**
 * About-page frontmatter loader. The bulk of /about is prose in
 * `content/about.mdx`; this loader exposes only the structured frontmatter
 * (title, photo path) for the page header.
 */

import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface AboutContent {
  title: string;
  /** Path under /public; omit/comment-out in MDX if no asset is yet provided. */
  photo?: string;
  photoAlt?: string;
}

const ABOUT_PATH = path.join(process.cwd(), "content", "about.mdx");

export async function getAboutContent(): Promise<AboutContent> {
  const raw = await fs.readFile(ABOUT_PATH, "utf-8");
  const { data } = matter(raw);
  if (typeof data.title !== "string") {
    throw new Error("[content/about.mdx] missing required frontmatter field: title");
  }
  return data as AboutContent;
}

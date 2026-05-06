import { SITE_URL } from "./site";

interface OgImageParams {
  title: string;
  subtitle?: string;
  /** Optional small mono eyebrow (e.g. "Case study", "/work"). */
  eyebrow?: string;
}

/**
 * Builds an absolute URL pointing at the runtime OG generator. Each page's
 * `generateMetadata` calls this with its own title/subtitle so social cards
 * render the right preview when shared. Output is always absolute — required
 * by Open Graph crawlers (Slack, LinkedIn, Twitter, iMessage).
 */
export function buildOgImageUrl({ title, subtitle, eyebrow }: OgImageParams): string {
  const params = new URLSearchParams({ title });
  if (subtitle) params.set("subtitle", subtitle);
  if (eyebrow) params.set("eyebrow", eyebrow);
  return `${SITE_URL}/og?${params.toString()}`;
}

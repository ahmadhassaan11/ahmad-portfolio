import { SITE_URL } from "./site";

interface OgImageParams {
  title: string;
  subtitle?: string;
  eyebrow?: string;
}

/**
 * Static OG image for GitHub Pages export.
 * Dynamic /og route removed because GitHub Pages cannot run Edge functions.
 */
export function buildOgImageUrl(_: OgImageParams): string {
  return `${SITE_URL}/og.png`;
}
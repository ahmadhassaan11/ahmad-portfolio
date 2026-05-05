/**
 * Canonical site URL. Used for OG metadata, canonical links, sitemap, RSS, etc.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL — set this once a custom domain is purchased.
 *   2. VERCEL_URL — auto-injected on Vercel preview/production deployments.
 *   3. http://localhost:3000 — local dev fallback.
 *
 * Never hard-code a domain anywhere in the codebase. Reference SITE_URL.
 */

function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const SITE_URL = resolveSiteUrl();

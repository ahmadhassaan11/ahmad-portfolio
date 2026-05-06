/**
 * Build-time timestamp. Captured at module evaluation, which on Vercel runs
 * once per build (not per request) — so this stays stable for the lifetime
 * of a deployment and is a useful "last deployed" signal in the footer.
 *
 * On local dev with hot reload it's the time the module was first loaded;
 * doesn't matter, that text is for production.
 */
export const BUILD_TIME = new Date();

import type { MDXComponents } from "mdx/types";

// Required by @next/mdx — maps MDX elements to React components. Phase 3 will
// add typography overrides (custom <h2>, <p>, <code>, <blockquote>) for the
// case-study reading experience. For now, defaults are good enough.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  };
}

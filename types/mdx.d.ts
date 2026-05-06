declare module "*.mdx" {
  import type { MDXComponents } from "mdx/types";
  import type { ComponentType } from "react";

  // Compiled MDX modules export a default React component that optionally
  // accepts a per-render `components` map (we use this to bind <MetricsGrid />
  // to project-specific frontmatter on the case-study page).
  const Content: ComponentType<{ components?: MDXComponents }>;
  export default Content;
}

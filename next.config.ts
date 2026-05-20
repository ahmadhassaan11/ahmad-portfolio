import createMDX from "@next/mdx";
import type { NextConfig } from "next";

// Turbopack's MDX loader serializes plugin config — pass plugin specifiers
// as strings (with optional [name, options] tuples), not as imported functions.

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      // Recognize YAML frontmatter (`---...---`) so it's stripped from the
      // rendered output. We parse frontmatter separately via gray-matter in
      // lib/projects.ts; this plugin just keeps it from leaking as content.
      "remark-frontmatter",
      "remark-gfm",
    ],
    rehypePlugins: [
      [
        "@shikijs/rehype",
        {
          // Dual themes — globals.css flips between them via `data-theme`.
          // defaultColor:false leaves token coloring to CSS variables only.
          themes: { light: "github-light", dark: "github-dark-default" },
          defaultColor: false,
          cssVariablePrefix: "--shiki-",
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  // Wrap client-side navigations in document.startViewTransition so the CSS
  // @view-transition rules in globals.css fire on link clicks (not just full
  // reloads). Browsers without the API fall back gracefully.
  experimental: {
    viewTransition: true,
  },
};

export default withMDX(nextConfig);
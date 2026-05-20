import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-gfm",
    ],
    rehypePlugins: [
      [
        "@shikijs/rehype",
        {
          themes: { light: "github-light", dark: "github-dark-default" },
          defaultColor: false,
          cssVariablePrefix: "--shiki-",
        },
      ],
    ],
  },
});

const nextConfig: NextConfig = {
  output: "export",           // ← required for GitHub Pages
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    unoptimized: true,        // ← required for static export (no image server)
  },
  experimental: {
    viewTransition: true,
  },
  // ↓ Tell Turbopack how to handle .mdx files
  turbopack: {
    rules: {
      "*.mdx": {
        loaders: ["@mdx-js/loader"],
        as: "*.tsx",
      },
    },
  },
};

export default withMDX(nextConfig);

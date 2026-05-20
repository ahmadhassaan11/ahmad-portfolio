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
  output: "export",            // ← GitHub Pages static export
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    unoptimized: true,         // ← no image server on GitHub Pages
  },
  experimental: {
    viewTransition: true,
  },
  turbopack: {
    rules: {
      "*.mdx": {
        loaders: ["@mdx-js/loader"],
        as: "*.js",            // ← '*.js' not '*.tsx' — avoids double TS pipeline
      },
    },
  },
};

export default withMDX(nextConfig);

import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const withMDX = createMDX({
  // No plugins yet; Phase 3 will add remark-gfm and rehype-shiki for the
  // case-study typography pass.
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "mdx"],
};

export default withMDX(nextConfig);

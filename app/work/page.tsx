import type { Metadata } from "next";
import { FadeIn } from "@/components/motion/fade-in";
import { SiteFooter } from "@/components/sections/site-footer";
import { WorkGrid } from "@/components/sections/work-grid";
import { getHomeContent } from "@/lib/home";
import { getAllProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work — Ahmad Hassaan Ullah",
  description:
    "Selected projects across React, Vue, Node.js, Python, and AWS — from single-cell genomics platforms to distributed-systems primitives.",
};

export default async function WorkPage() {
  const [projects, home] = await Promise.all([getAllProjects(), getHomeContent()]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <FadeIn>
        <header className="mb-12 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-mute">/work</p>
          <h1 className="text-balance font-semibold tracking-tight text-4xl md:text-5xl">
            All work
          </h1>
          <p className="max-w-prose text-mute">
            Selected projects, most recent first. Filter by tech to find specific stacks.
          </p>
        </header>
      </FadeIn>

      <WorkGrid projects={projects} />

      <SiteFooter contact={home.contact} />
    </main>
  );
}

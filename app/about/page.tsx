import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/motion/fade-in";
import { ExperienceList } from "@/components/sections/experience-list";
import { SiteFooter } from "@/components/sections/site-footer";
import { experience } from "@/content/experience";
import { getAboutContent } from "@/lib/about";
import { getHomeContent } from "@/lib/home";

export const metadata: Metadata = {
  title: "About — Ahmad Hassaan Ullah",
  description:
    "Senior software engineer based in Lahore. Eight years across startups; currently shipping a single-cell genomics platform at Advaita Bioinformatics.",
};

export default async function AboutPage() {
  const [about, home] = await Promise.all([getAboutContent(), getHomeContent()]);
  const { default: Content } = await import("@/content/about.mdx");

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <FadeIn>
        <header className="mb-12 space-y-6">
          <p className="font-mono text-xs uppercase tracking-widest text-mute">/about</p>
          <h1 className="text-balance font-semibold tracking-tight text-4xl md:text-5xl">
            {about.title}
          </h1>

          {about.photo ? (
            <div className="relative aspect-[4/5] w-40 overflow-hidden rounded-md border border-line bg-surface">
              <Image
                src={about.photo}
                alt={about.photoAlt ?? "Portrait"}
                fill
                priority
                sizes="160px"
                className="object-cover"
              />
            </div>
          ) : null}
        </header>
      </FadeIn>

      <article>
        <Content />
      </article>

      <div className="mt-24">
        <ExperienceList entries={experience} title="Full work history" />
      </div>

      <SiteFooter contact={home.contact} />
    </main>
  );
}

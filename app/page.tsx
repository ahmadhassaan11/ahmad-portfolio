import { FadeIn } from "@/components/motion/fade-in";
import { CurrentlyBlock } from "@/components/sections/currently-block";
import { ExperienceList } from "@/components/sections/experience-list";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { SiteFooter } from "@/components/sections/site-footer";
import { TrustStrip } from "@/components/sections/trust-strip";
import { experience } from "@/content/experience";
import { getHomeContent } from "@/lib/home";
import { getFeaturedProjects } from "@/lib/projects";

export default async function HomePage() {
  // Server Component — every read happens at build time, then the page is
  // pre-rendered to static HTML. Zero client-side data fetching.
  const [home, featured] = await Promise.all([getHomeContent(), getFeaturedProjects()]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <div className="space-y-24 md:space-y-28">
        <FadeIn>
          <Hero tagline={home.tagline} status={home.status} />
        </FadeIn>

        <FeaturedWork projects={featured} />

        <ExperienceList entries={experience} />

        <CurrentlyBlock entries={home.currently} />

        <TrustStrip items={home.trust} />
      </div>

      <SiteFooter contact={home.contact} />
    </main>
  );
}

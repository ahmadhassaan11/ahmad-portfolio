import type { Metadata } from "next";
import type { ReactNode } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { SiteFooter } from "@/components/sections/site-footer";
import { Link } from "@/components/ui/link";
import { getHomeContent } from "@/lib/home";

export const metadata: Metadata = {
  title: "Contact — Ahmad Hassaan Ullah",
  description: "For project work, Upwork, and everything else.",
};

interface ContactRowProps {
  label: string;
  href: string;
  children: ReactNode;
  external?: boolean;
}

function ContactRow({ label, href, children, external }: ContactRowProps) {
  return (
    <div className="grid grid-cols-1 gap-1 border-line border-b py-5 sm:grid-cols-[12rem_1fr] sm:items-baseline sm:gap-6">
      <span className="font-mono text-xs uppercase tracking-wider text-mute">{label}</span>
      <Link href={href} appearance="default" external={external}>
        {children}
      </Link>
    </div>
  );
}

export default async function ContactPage() {
  const home = await getHomeContent();
  const { contact } = home;

  return (
    <main className="mx-auto max-w-2xl px-6 py-16 md:py-24">
      <FadeIn>
        <header className="mb-12 space-y-4">
          <p className="font-mono text-xs uppercase tracking-widest text-mute">/contact</p>
          <h1 className="text-balance font-semibold tracking-tight text-4xl md:text-5xl">
            Get in touch
          </h1>
          <p className="max-w-prose text-mute">
            I respond within 24 hours, typically same-day during the week.
          </p>
        </header>
      </FadeIn>

      <div className="border-line border-t">
        <ContactRow label="For project work" href={`mailto:${contact.email}`}>
          {contact.email}
        </ContactRow>

        {contact.upwork ? (
          <ContactRow label="For Upwork" href={contact.upwork} external>
            View profile
          </ContactRow>
        ) : null}

        {contact.linkedin ? (
          <ContactRow label="For everything else" href={contact.linkedin} external>
            LinkedIn
          </ContactRow>
        ) : null}

        {contact.github ? (
          <ContactRow label="Code & open-source" href={contact.github} external>
            GitHub
          </ContactRow>
        ) : null}
      </div>

      <SiteFooter contact={contact} />
    </main>
  );
}

import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import NextLink from "next/link";
import { FadeIn } from "@/components/motion/fade-in";

export const metadata: Metadata = {
  title: "Off the map — Ahmad Hassaan Ullah",
  description: "There's nothing at this URL.",
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-start justify-center px-6 py-16">
      <FadeIn>
        <p className="font-mono text-xs uppercase tracking-widest text-mute">/404</p>
        <h1 className="mt-4 text-balance font-semibold tracking-tight text-6xl md:text-7xl">
          Off the map.
        </h1>
        <p className="mt-6 max-w-prose text-lg text-mute">
          There's nothing at this URL. If you arrived via a link, it's broken — let me know at{" "}
          <a
            href="mailto:ahmadhassaanu@gmail.com"
            className="text-fg underline decoration-line decoration-1 underline-offset-4 transition-colors hover:decoration-fg"
          >
            ahmadhassaanu@gmail.com
          </a>{" "}
          and I'll fix it.
        </p>
        <NextLink
          href="/"
          className="group mt-12 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:text-accent focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
        >
          <ArrowLeft
            className="size-3 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          Back home
        </NextLink>
      </FadeIn>
    </main>
  );
}

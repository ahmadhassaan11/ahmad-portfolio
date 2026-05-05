"use client";

// Motion drives the hover lift; the primitive itself is interactive
// (next/link wrapper). Must run on the client.

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import NextLink from "next/link";
import { Tag } from "./tag";

interface CardProps {
  href: string;
  title: string;
  client: string;
  position: string;
  year: number;
  summary: string;
  stack: string[];
  heroImage?: string;
  heroAlt?: string;
  /** Cap on stack chips shown; the rest are folded into a "+N" chip. */
  stackLimit?: number;
}

/**
 * Project card for the home page's featured-work section and the /work index.
 * Whole card is one big link target. On hover/focus: subtle lift + a
 * "Read the case study →" line crossfades in. Spring physics, never linear.
 */
export function Card({
  href,
  title,
  client,
  position,
  year,
  summary,
  stack,
  heroImage,
  heroAlt,
  stackLimit = 5,
}: CardProps) {
  const visible = stack.slice(0, stackLimit);
  const hidden = stack.length - visible.length;

  return (
    <motion.article
      whileHover={{ y: -3 }}
      whileFocus={{ y: -3 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative overflow-hidden rounded-lg border border-line bg-surface"
    >
      <NextLink
        href={href}
        className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
      >
        {heroImage ? (
          <div className="relative aspect-[16/10] overflow-hidden bg-canvas">
            <Image
              src={heroImage}
              alt={heroAlt ?? ""}
              fill
              sizes="(min-width: 1024px) 600px, 100vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
            />
          </div>
        ) : null}

        <div className="space-y-3 p-6">
          <div className="font-mono text-[10px] uppercase tracking-wider text-mute">
            {client} · {position} · {year}
          </div>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-mute">{summary}</p>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {visible.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
            {hidden > 0 ? <Tag>+{hidden}</Tag> : null}
          </div>

          <div className="flex items-center gap-1 pt-2 font-mono text-xs text-fg opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
            Read the case study
            <ArrowRight
              className="size-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </div>
        </div>
      </NextLink>
    </motion.article>
  );
}

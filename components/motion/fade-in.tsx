"use client";

// Motion is a client-only library (uses React context + DOM refs). This file
// stays small on purpose — it's the entrance primitive used by hero sections
// and any other element that wants a polite fade-up on first paint.

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  /** Pixels of upward travel during the entrance. Default 12. */
  y?: number;
  className?: string;
}

// Custom-tuned ease-out — feels deliberate without being slow. Borrowed from
// the wider editorial-Web aesthetic (rauno.me, paco.me).
const easing = [0.16, 1, 0.3, 1] as const;

export function FadeIn({ children, delay = 0, y = 12, className }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: easing, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

"use client";

// MotionConfig is a React context provider; it must run on the client.
// reducedMotion="user" makes Motion respect the OS-level prefers-reduced-motion
// preference globally, so individual components don't each have to opt in.

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

interface MotionProviderProps {
  children: ReactNode;
}

export function MotionProvider({ children }: MotionProviderProps) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditional className helper. clsx for branches, tailwind-merge to resolve
 * conflicts when callers pass `className` overrides into a primitive.
 *
 * Use this everywhere — never string-concatenate class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TagSize = "sm" | "md";

interface TagProps {
  children: ReactNode;
  size?: TagSize;
  className?: string;
}

const sizes: Record<TagSize, string> = {
  sm: "h-5 px-1.5 text-[10px]",
  md: "h-6 px-2 text-xs",
};

export function Tag({ children, size = "sm", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border border-line bg-surface text-mute",
        "font-mono uppercase tracking-wider",
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}

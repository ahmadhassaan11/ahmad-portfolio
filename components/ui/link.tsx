import { ArrowUpRight } from "lucide-react";
import NextLink from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  /** Force external behavior. Auto-detected from `https?://` if omitted. */
  external?: boolean;
  /** Render the up-right arrow. Defaults to `external`. */
  showArrow?: boolean;
  /** "subtle" omits the underline and animates a soft color shift on hover. */
  appearance?: "default" | "subtle";
}

const base =
  "inline-flex items-baseline gap-0.5 transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:rounded-sm " +
  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas";

const appearances = {
  default: "text-fg underline decoration-line decoration-1 underline-offset-4 hover:decoration-fg",
  subtle: "text-mute hover:text-fg",
} as const;

export function Link({
  href,
  children,
  external,
  showArrow,
  appearance = "default",
  className,
  ...rest
}: LinkProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);
  const arrow = showArrow ?? isExternal;

  const content = (
    <>
      {children}
      {arrow && (
        <ArrowUpRight
          className="size-3.5 translate-y-[1px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-px"
          aria-hidden="true"
        />
      )}
    </>
  );

  const merged = cn("group", base, appearances[appearance], className);

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={merged} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <NextLink href={href} className={merged} {...rest}>
      {content}
    </NextLink>
  );
}

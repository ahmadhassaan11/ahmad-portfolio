import type { MDXComponents } from "mdx/types";
import { Link } from "@/components/ui/link";
import { cn } from "@/lib/cn";

/**
 * Typography rhythm for case-study prose. Edit values here; do not override
 * inside individual MDX files. The whole reading experience flows from this
 * single file.
 *
 * Vertical rhythm: section headings (`##`) get a generous top margin to
 * visually separate phases of the case study. Sub-headings (`###`) get a
 * smaller cushion. Paragraphs use `leading-relaxed` (~1.625) which reads
 * well at the prose width (~720px).
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-16 mb-5 scroll-mt-24 text-2xl font-semibold tracking-tight text-fg",
          className,
        )}
        {...props}
      />
    ),

    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-10 mb-3 scroll-mt-24 text-lg font-semibold tracking-tight text-fg",
          className,
        )}
        {...props}
      />
    ),

    p: ({ className, ...props }) => (
      <p className={cn("my-5 leading-relaxed text-fg/90", className)} {...props} />
    ),

    a: ({ href, children, ...props }) => (
      <Link href={href ?? "#"} {...props}>
        {children}
      </Link>
    ),

    strong: ({ className, ...props }) => (
      <strong className={cn("font-semibold text-fg", className)} {...props} />
    ),

    em: ({ className, ...props }) => <em className={cn("italic", className)} {...props} />,

    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "my-8 border-l-2 border-accent pl-6 text-fg italic",
          "[&>p]:my-2 [&>p]:text-fg",
          className,
        )}
        {...props}
      />
    ),

    ul: ({ className, ...props }) => (
      <ul className={cn("my-5 list-disc space-y-2 pl-6 text-fg/90", className)} {...props} />
    ),

    ol: ({ className, ...props }) => (
      <ol className={cn("my-5 list-decimal space-y-2 pl-6 text-fg/90", className)} {...props} />
    ),

    li: ({ className, ...props }) => (
      <li className={cn("leading-relaxed marker:text-mute", className)} {...props} />
    ),

    hr: ({ className, ...props }) => (
      <hr className={cn("my-12 border-line", className)} {...props} />
    ),

    // Inline `<code>` — one-line snippets within prose. Fenced code blocks
    // (```ts) are highlighted by Shiki at build time and bypass this map.
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "rounded border border-line bg-surface px-1.5 py-0.5 font-mono text-[0.92em] text-fg",
          className,
        )}
        {...props}
      />
    ),

    // Shiki wraps fenced blocks in <pre class="shiki ..."><code>. The styling
    // for the highlighted tokens lives in globals.css; here we just give the
    // pre block our editorial frame.
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "my-6 overflow-x-auto rounded-lg border border-line bg-surface p-4 text-sm leading-relaxed",
          "[&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0",
          className,
        )}
        {...props}
      />
    ),

    table: ({ className, ...props }) => (
      <div className="my-6 overflow-x-auto">
        <table className={cn("w-full border-collapse font-mono text-sm", className)} {...props} />
      </div>
    ),

    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border-b border-line px-3 py-2 text-left text-xs font-medium uppercase tracking-wider text-mute",
          className,
        )}
        {...props}
      />
    ),

    td: ({ className, ...props }) => (
      <td className={cn("border-b border-line px-3 py-2 text-fg/90", className)} {...props} />
    ),
  };
}

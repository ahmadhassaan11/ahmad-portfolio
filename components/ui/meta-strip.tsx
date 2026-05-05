import { Link } from "./link";

interface MetaStripProps {
  client: string;
  position: string;
  year: number;
  stack: string[];
  liveUrl?: string;
  /** Cap on stack items shown inline; the rest are folded into "+N". */
  stackLimit?: number;
}

function Sep() {
  return (
    <span aria-hidden="true" className="text-mute">
      ·
    </span>
  );
}

function hostname(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}

/**
 * `Client · Role · Year · Stack · live-url` — single-line mono metadata strip
 * for case-study pages and elsewhere. Wraps gracefully on narrow viewports.
 */
export function MetaStrip({
  client,
  position,
  year,
  stack,
  liveUrl,
  stackLimit = 5,
}: MetaStripProps) {
  const visibleStack = stack.slice(0, stackLimit);
  const hidden = stack.length - visibleStack.length;
  const stackText =
    hidden > 0 ? `${visibleStack.join(" / ")} +${hidden}` : visibleStack.join(" / ");

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-mute">
      <span>{client}</span>
      <Sep />
      <span>{position}</span>
      <Sep />
      <span>{year}</span>
      <Sep />
      <span className="text-fg/80">{stackText}</span>
      {liveUrl ? (
        <>
          <Sep />
          <Link href={liveUrl} appearance="subtle" showArrow>
            {hostname(liveUrl)}
          </Link>
        </>
      ) : null}
    </div>
  );
}

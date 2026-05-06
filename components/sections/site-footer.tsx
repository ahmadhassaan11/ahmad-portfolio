import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/brand-icons";
import { Link } from "@/components/ui/link";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { BUILD_TIME } from "@/lib/build-time";
import { formatBuildTime } from "@/lib/dates";
import type { HomeContact } from "@/lib/home";

interface SiteFooterProps {
  contact: HomeContact;
}

interface SocialIconProps {
  href: string;
  label: string;
  icon: typeof GithubIcon;
}

function SocialIcon({ href, label, icon: Icon }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-md text-mute transition-colors duration-150 hover:bg-surface hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
    >
      <Icon className="size-4" aria-hidden="true" />
    </a>
  );
}

/**
 * Global footer — rendered by every main-site page (home + case studies).
 * Email, socials, last-deployed mono timestamp, view-source, theme toggle.
 * SPEC §7.1.6.
 */
export function SiteFooter({ contact }: SiteFooterProps) {
  const lastDeployed = formatBuildTime(BUILD_TIME);

  return (
    <footer className="mt-32 border-line border-t pt-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <Link href={`mailto:${contact.email}`} appearance="default">
          {contact.email}
        </Link>

        <div className="flex items-center gap-1">
          {contact.github ? (
            <SocialIcon href={contact.github} label="GitHub" icon={GithubIcon} />
          ) : null}
          {contact.linkedin ? (
            <SocialIcon href={contact.linkedin} label="LinkedIn" icon={LinkedinIcon} />
          ) : null}
          {contact.x ? <SocialIcon href={contact.x} label="X" icon={XIcon} /> : null}
          <ThemeToggle />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-wider text-mute">
        <span>Last deployed · {lastDeployed}</span>
        {contact.repoUrl ? (
          <Link href={contact.repoUrl} appearance="subtle" showArrow>
            View source
          </Link>
        ) : null}
      </div>
    </footer>
  );
}

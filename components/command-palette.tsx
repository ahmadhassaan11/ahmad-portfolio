"use client";

// cmdk + keyboard listener + router push — all browser-only.

import { Command } from "cmdk";
import { ArrowRight, FileText, Home, Mail, Search, SunMoon, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface CommandPaletteProject {
  slug: string;
  title: string;
}

interface CommandPaletteProps {
  projects: CommandPaletteProject[];
}

const NAV_ITEMS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Work", href: "/work", icon: FileText },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/contact", icon: Mail },
] as const;

const OPEN_EVENT = "open-command-palette";

/**
 * Cmd+K (Ctrl+K elsewhere) toggles. Anywhere can also dispatch
 * `window.dispatchEvent(new CustomEvent("open-command-palette"))` to open
 * — the SiteFooter exposes a tap target so mobile users get the same path.
 */
export function CommandPalette({ projects }: CommandPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
    }
    function onCustomOpen() {
      setOpen(true);
    }
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener(OPEN_EVENT, onCustomOpen);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(OPEN_EVENT, onCustomOpen);
    };
  }, []);

  // Reset query whenever the palette closes so re-opens start fresh.
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const navigate = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  const toggleTheme = useCallback(() => {
    setOpen(false);
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // localStorage unavailable — toggle still works for the session.
    }
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command palette"
      className="fixed inset-0 top-[15vh] z-50 mx-auto h-fit max-w-xl rounded-lg border border-line bg-surface shadow-2xl data-[state=closed]:hidden"
    >
      <div className="relative w-full overflow-hidden rounded-lg">
        <div className="flex items-center gap-3 border-line border-b px-4">
          <Search className="size-4 shrink-0 text-mute" aria-hidden="true" />
          <Command.Input
            value={query}
            onValueChange={setQuery}
            placeholder="Type a page, a project, or 'theme'…"
            className="h-12 w-full bg-transparent text-base text-fg placeholder:text-mute focus:outline-none"
          />
          <kbd className="hidden shrink-0 rounded border border-line bg-canvas px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mute sm:inline-block">
            Esc
          </kbd>
        </div>

        <Command.List className="max-h-[60vh] overflow-y-auto p-2">
          <Command.Empty className="py-12 text-center font-mono text-xs text-mute">
            No results.
          </Command.Empty>

          <Command.Group
            heading="Navigate"
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-mute"
          >
            {NAV_ITEMS.map((item) => (
              <Command.Item
                key={item.href}
                value={`navigate ${item.label} ${item.href}`}
                onSelect={() => navigate(item.href)}
                className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 text-sm text-fg/90 aria-selected:bg-surface aria-selected:text-fg"
              >
                <item.icon className="size-4 text-mute" aria-hidden="true" />
                <span className="flex-1">{item.label}</span>
                <span className="font-mono text-[10px] text-mute">{item.href}</span>
              </Command.Item>
            ))}
          </Command.Group>

          {projects.length > 0 ? (
            <Command.Group
              heading="Projects"
              className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-mute"
            >
              {projects.map((project) => (
                <Command.Item
                  key={project.slug}
                  value={`project ${project.title}`}
                  onSelect={() => navigate(`/work/${project.slug}`)}
                  className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 text-sm text-fg/90 aria-selected:bg-surface aria-selected:text-fg"
                >
                  <ArrowRight className="size-4 text-mute" aria-hidden="true" />
                  <span className="flex-1 truncate">{project.title}</span>
                  <span className="font-mono text-[10px] text-mute">/work/{project.slug}</span>
                </Command.Item>
              ))}
            </Command.Group>
          ) : null}

          <Command.Group
            heading="Actions"
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-mute"
          >
            <Command.Item
              value="toggle theme dark light"
              onSelect={toggleTheme}
              className="flex cursor-pointer items-center gap-3 rounded px-2 py-2 text-sm text-fg/90 aria-selected:bg-surface aria-selected:text-fg"
            >
              <SunMoon className="size-4 text-mute" aria-hidden="true" />
              <span className="flex-1">Toggle theme</span>
              <span className="font-mono text-[10px] text-mute">light · dark</span>
            </Command.Item>
          </Command.Group>
        </Command.List>

        <div className="flex items-center justify-between border-line border-t px-4 py-2 font-mono text-[10px] text-mute">
          <span>↑↓ to navigate · ↵ to select</span>
          <span>esc to close</span>
        </div>
      </div>
    </Command.Dialog>
  );
}

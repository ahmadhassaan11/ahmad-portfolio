import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { CommandPalette } from "@/components/command-palette";
import { MotionProvider } from "@/components/providers/motion-provider";
import { buildOgImageUrl } from "@/lib/og-image";
import { getAllProjects } from "@/lib/projects";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

const SITE_TITLE = "Ahmad Hassaan Ullah";
const SITE_DESCRIPTION =
  "Senior software engineer. I build and scale production web platforms — currently shipping at Advaita Bioinformatics.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: `%s — ${SITE_TITLE}` },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_TITLE,
    type: "website",
    images: [
      {
        url: buildOgImageUrl({ title: SITE_TITLE, subtitle: "Senior software engineer" }),
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [buildOgImageUrl({ title: SITE_TITLE, subtitle: "Senior software engineer" })],
  },
};

// Synchronously sets data-theme before paint so the user's saved theme is
// applied without a flash on cold load. Safe — fully static, no interpolation.
const themeInitScript = `(function(){try{var s=localStorage.getItem("theme");var t=s||(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.setAttribute("data-theme",t);}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  // Project list for the command palette. Server-loaded once at build time;
  // zero client fetch.
  const projects = await getAllProjects();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: static script, no interpolation */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <MotionProvider>
          {children}
          <CommandPalette projects={projects.map((p) => ({ slug: p.slug, title: p.title }))} />
        </MotionProvider>
      </body>
    </html>
  );
}

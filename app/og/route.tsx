import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

// Runtime OG image generator. Each main route's generateMetadata builds an
// absolute /og?title=...&subtitle=... URL via lib/og-image.ts so social
// crawlers (Slack, LinkedIn, X, iMessage) get a per-page preview card.

export const runtime = "edge";

const CANVAS = "#0a0a0b";
const FG = "#ededed";
const MUTE = "#8b8b91";
const LINE = "#1f1f22";
const ACCENT = "#6366f1";

export function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "Ahmad Hassaan Ullah";
  const subtitle = searchParams.get("subtitle") ?? "Senior software engineer";
  const eyebrow = searchParams.get("eyebrow");

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: CANVAS,
        color: FG,
        padding: "80px",
        position: "relative",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* accent dot — top right */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 80,
          width: 14,
          height: 14,
          borderRadius: 999,
          backgroundColor: ACCENT,
        }}
      />

      {/* mono URL — top left */}
      <div
        style={{
          fontSize: 22,
          color: MUTE,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        ahmadhassaanullah.dev
      </div>

      {/* spacer */}
      <div style={{ flex: 1 }} />

      {/* eyebrow / subtitle ribbon */}
      {eyebrow ? (
        <div
          style={{
            fontSize: 22,
            color: MUTE,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: 28,
          }}
        >
          {eyebrow}
        </div>
      ) : null}

      {/* title — display weight */}
      <div
        style={{
          fontSize: 76,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          lineHeight: 1.05,
          maxWidth: 980,
          color: FG,
        }}
      >
        {title}
      </div>

      {/* subtitle */}
      <div
        style={{
          fontSize: 30,
          color: MUTE,
          marginTop: 28,
          lineHeight: 1.4,
          maxWidth: 980,
        }}
      >
        {subtitle}
      </div>

      {/* hairline at bottom */}
      <div
        style={{
          position: "absolute",
          left: 80,
          right: 80,
          bottom: 78,
          height: 1,
          backgroundColor: LINE,
        }}
      />

      {/* bottom row: byline */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 48,
          fontSize: 20,
          color: MUTE,
          letterSpacing: "0.04em",
        }}
      >
        <span style={{ color: FG, fontWeight: 500 }}>Ahmad Hassaan Ullah</span>
        <span style={{ margin: "0 12px", color: LINE }}>·</span>
        <span>Senior software engineer</span>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto min-h-dvh max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight">Ahmad Hassaan Ullah</h1>
      <p className="mt-4 text-lg text-mute">
        Senior software engineer. I build and scale production web platforms — currently shipping at
        Advaita Bioinformatics.
      </p>
      <div className="mt-12 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-xs text-mute">
        <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
        scaffold v0.2 — tokens, fonts, theme strategy online
      </div>
    </main>
  );
}

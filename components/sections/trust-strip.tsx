interface TrustStripProps {
  items: string[];
}

/**
 * Three lines, mono, no badges or logos. Trust signals as facts, not boasts
 * — they appear once each, in small text, near work that earns them. SPEC §7.1.5.
 */
export function TrustStrip({ items }: TrustStripProps) {
  return (
    <section className="space-y-4">
      <h2 className="font-mono text-xs uppercase tracking-widest text-mute">Recognition</h2>
      <ul className="space-y-1.5 font-mono text-xs text-mute">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

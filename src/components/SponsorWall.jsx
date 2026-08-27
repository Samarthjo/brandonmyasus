const format = (n) => '₹' + n.toLocaleString('en-IN');

export default function SponsorWall({ slots }) {
  const sold = slots.filter(s => s.sponsor);

  return (
    <section className="border-b border-white/5 bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-4">
          Section 08 · The wall
        </div>
        <h2 className="display text-[40px] md:text-[64px] leading-[1] mb-12 max-w-3xl tracking-tightest">
          The people putting their logos on my laptop.
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sold.map(s => (
            <div key={s.id} className="rounded-2xl border border-white/5 bg-panel p-6 hover:border-white/20 transition">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-muted font-mono">
                <span>Sponsor</span>
                <span>#{String(s.id).padStart(2, '0')}</span>
              </div>
              <div className="mt-6 h-14 flex items-center justify-center border-b border-white/5 pb-4">
                <div className="font-display text-xl md:text-2xl">{s.sponsor.name}</div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted">Winning bid</span>
                <span className="mono text-sm">{format(s.currentBid)}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-xs text-muted">Position</span>
                <span className="text-xs text-soft">{s.label}</span>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-acid font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-acid" /> Won
              </div>
            </div>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted max-w-2xl">
          Logos above are demo placeholders. Real winners get their actual mark rendered
          here — printed on the laptop and pictured on this wall.
        </p>
      </div>
    </section>
  );
}

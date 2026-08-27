export default function LoudSection() {
  return (
    <section className="relative border-b border-white/5 bg-black overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-live/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-acid/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-5 md:px-8 py-28 md:py-40">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-6">
          Section 04 · Presence
        </div>
        <h2 className="display text-[64px] sm:text-[92px] md:text-[128px] leading-[0.9] tracking-tightest">
          It gets loud.
        </h2>
        <h3 className="display mt-2 text-[48px] sm:text-[72px] md:text-[104px] leading-[0.9] text-acid tracking-tightest">
          People look.
        </h3>

        <div className="mt-16 grid md:grid-cols-2 gap-8 md:gap-14 max-w-5xl">
          <p className="text-soft leading-relaxed">
            This is not a silent productivity laptop. This is a gaming laptop.
            When I'm rendering, editing, gaming, exporting, or doing something
            unnecessarily computational, the fans make themselves known.
          </p>
          <p className="text-soft leading-relaxed">
            Which is great for your logo. Because your ad isn't sitting quietly
            on a desk. It's attached to the machine making the noise.
          </p>
        </div>

        <div className="mt-16 flex items-center gap-6 flex-wrap">
          <StatChip label="Fan mode" value="Turbo" />
          <StatChip label="Room reaction" value="Noticeable" />
          <StatChip label="Ambient nap probability" value="0%" />
        </div>

        <div className="mt-10 text-[10px] uppercase tracking-widest text-muted/70 font-mono max-w-md">
          * No scientific claims about decibel levels. It's just noticeably loud sometimes.
        </div>
      </div>
    </section>
  );
}

function StatChip({ label, value }) {
  return (
    <div className="rounded-full border border-white/10 bg-panel/40 px-4 py-2 flex items-center gap-3">
      <span className="text-[10px] uppercase tracking-widest text-muted font-mono">{label}</span>
      <span className="text-sm text-chalk font-display">{value}</span>
    </div>
  );
}

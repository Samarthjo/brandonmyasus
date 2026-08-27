export default function RecognitionBand() {
  return (
    <section className="border-b border-white/5 bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-4">
          Section 02 · Recognition
        </div>
        <h2 className="display text-[44px] sm:text-[56px] md:text-[80px] leading-[0.98] tracking-tightest">
          Everyone recognises the TUF.
        </h2>
        <h3 className="display mt-2 text-[32px] sm:text-[40px] md:text-[56px] leading-[1] text-muted tracking-tightest">
          Now put your logo next to it.
        </h3>

        <div className="mt-12 grid md:grid-cols-2 gap-8 md:gap-14 items-start max-w-5xl">
          <p className="text-soft leading-relaxed">
            MacBooks have one tiny little Apple logo and somehow everyone treats the
            surrounding four inches like prime real estate.
          </p>
          <p className="text-soft leading-relaxed">
            I have a TUF. It's bigger. And when the fans start screaming, everyone
            knows where it is.
          </p>
        </div>

        <div className="mt-14">
          <a
            href="#auction"
            className="inline-flex items-center gap-2 text-sm font-semibold text-chalk border-b border-acid pb-1 hover:border-white transition"
          >
            See the available spots ↓
          </a>
        </div>
      </div>
    </section>
  );
}

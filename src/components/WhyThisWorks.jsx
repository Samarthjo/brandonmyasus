const cards = [
  { title: 'Physical', body: 'Your brand exists in the real world. It occupies actual coordinates.' },
  { title: 'Portable', body: 'The billboard comes with me. Cafés, flights, meetings, occasional queues.' },
  { title: 'Weird', body: "People remember weird. That's the entire thesis of your marketing career." },
];

export default function WhyThisWorks() {
  return (
    <section className="border-b border-white/5 bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-4">
          Section 09 · The thesis
        </div>

        <div className="grid md:grid-cols-[1.2fr_1fr] gap-14 items-start">
          <div>
            <h2 className="display text-[40px] md:text-[64px] leading-[1] mb-8 tracking-tightest">
              Why would anyone advertise on a laptop?
            </h2>
            <div className="space-y-5 text-soft leading-relaxed max-w-[52ch]">
              <p>Because people ignore most digital ads. They don't necessarily ignore the giant object sitting on a table in front of them.</p>
              <p>This isn't another impression. It's a physical object with your brand attached to it.</p>
              <p>And unlike a billboard, it moves.</p>
            </div>
          </div>

          <div className="grid gap-4">
            {cards.map(c => (
              <div key={c.title} className="rounded-2xl border border-white/5 bg-panel p-6 hover:border-acid/30 transition">
                <div className="mono text-[10px] uppercase tracking-widest text-acid">{c.title}</div>
                <div className="mt-2 text-soft leading-relaxed">{c.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

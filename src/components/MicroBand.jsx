import { MICRO_LINES } from '../data/mockData.js';

export default function MicroBand() {
  const doubled = [...MICRO_LINES, ...MICRO_LINES];
  return (
    <div className="border-y border-white/5 overflow-hidden bg-black/40">
      <div className="flex gap-16 py-5 whitespace-nowrap w-max animate-marquee font-display text-sm uppercase tracking-[0.2em] text-muted">
        {doubled.map((line, i) => (
          <span key={i} className="flex items-center gap-16">
            <span>{line}</span>
            <span className="text-acid">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

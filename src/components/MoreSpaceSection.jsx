export default function MoreSpaceSection() {
  return (
    <section className="border-b border-white/5 bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-4">
              Section 03 · The math
            </div>
            <h2 className="display text-[44px] md:text-[72px] leading-[1] tracking-tightest">
              More laptop.
              <br />
              More real estate.
            </h2>
            <p className="mt-6 text-soft leading-relaxed max-w-[46ch]">
              Why fight for a tiny corner next to an Apple logo? My laptop gives your
              brand considerably more room to exist.
            </p>
            <ul className="mt-6 space-y-2 text-soft">
              <li className="flex gap-3"><span className="text-acid font-mono w-6">01</span> More surface.</li>
              <li className="flex gap-3"><span className="text-acid font-mono w-6">02</span> More sticker.</li>
              <li className="flex gap-3"><span className="text-acid font-mono w-6">03</span> More stupid.</li>
            </ul>
            <p className="mt-6 text-xs text-muted max-w-[46ch]">
              This is a conceptual comparison, not a laser-measured whitepaper. But
              the TUF is objectively larger than a 13" MacBook. Trust me. I've held
              them both.
            </p>
            <a
              href="#auction"
              className="mt-10 inline-block rounded-md bg-acid text-ink px-5 py-3 font-semibold text-sm hover:bg-acid/90 transition"
            >
              I want the big one →
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <SilhouetteCard
              label="MacBook"
              sub="Tidy little corners"
              areaLabel="1×"
            >
              <svg viewBox="0 0 300 210" className="w-full">
                <rect x="40" y="30" width="220" height="140" rx="14" fill="#1a1a1d" stroke="#2a2a2e" />
                <circle cx="150" cy="95" r="16" fill="#38383d" />
                <path d="M 154 79 Q 158 77 158 73" stroke="#38383d" strokeWidth="2" fill="none" />
                <rect x="40" y="170" width="220" height="10" rx="3" fill="#0f1114" />
                <rect x="140" y="30" width="20" height="4" fill="#0f1114" opacity="0.4" />
              </svg>
            </SilhouetteCard>
            <SilhouetteCard
              label="My TUF"
              sub='15.6" of canvas'
              areaLabel="~1.6×"
              highlight
            >
              <svg viewBox="0 0 300 210" className="w-full">
                <rect x="12" y="15" width="276" height="167" rx="10" fill="#22262b" stroke="#38383d" />
                {[[30,32],[270,32],[30,165],[270,165]].map(([cx,cy],i)=>(
                  <circle key={i} cx={cx} cy={cy} r="3" fill="#0f1114" />
                ))}
                <g transform="translate(150 100) scale(0.32)">
                  <path
                    d="M -140 -40 L -60 -40 L -30 -70 L -30 -10 L -60 -10 L -40 30 Q -20 50 0 45 Q 20 50 40 30 L 60 -10 L 30 -10 L 30 -70 L 60 -40 L 140 -40 L 100 20 L 80 30 Q 40 90 0 90 Q -40 90 -80 30 L -100 20 Z"
                    fill="#0f1114"
                  />
                </g>
                <rect x="12" y="182" width="276" height="10" rx="3" fill="#0f1114" />
                <rect x="130" y="15" width="40" height="4" fill="#0f1114" opacity="0.4" />
              </svg>
            </SilhouetteCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function SilhouetteCard({ label, sub, areaLabel, highlight, children }) {
  return (
    <div className={`rounded-2xl border p-4 md:p-6 ${highlight ? 'border-acid/30 bg-panel' : 'border-white/5 bg-panel/50'}`}>
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted font-mono">Model</div>
          <div className="font-display text-lg md:text-xl mt-0.5">{label}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-muted font-mono">Rel. surface</div>
          <div className="mono text-lg md:text-xl mt-0.5">{areaLabel}</div>
        </div>
      </div>
      {children}
      <div className="mt-3 text-xs text-muted">{sub}</div>
    </div>
  );
}

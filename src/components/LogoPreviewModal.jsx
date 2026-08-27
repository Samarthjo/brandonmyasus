import { useState, useEffect } from 'react';

const format = (n) => '₹' + n.toLocaleString('en-IN');

export default function LogoPreviewModal({ slot, slots, onClose, onBid }) {
  const [brand, setBrand] = useState('YOUR BRAND');

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const previewText = (brand || 'YOUR BRAND').toUpperCase().slice(0, 14);
  const fontSize = Math.max(14, Math.min(28, (slot.w * 1.9) / Math.max(previewText.length, 4)));

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 md:p-8 flex items-center justify-center overflow-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-5xl rounded-2xl border border-white/10 bg-panel p-6 md:p-10 shadow-2xl animate-rise"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-6 gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-muted font-mono">Preview</div>
            <h3 className="font-display text-2xl md:text-3xl mt-1">
              Slot #{String(slot.id).padStart(2, '0')} · {slot.label}
            </h3>
            <div className="text-sm text-soft mt-1">
              This is roughly where your logo would live.
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-muted hover:text-chalk text-2xl leading-none"
            aria-label="Close"
          >×</button>
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
          <div className="rounded-2xl border border-white/5 bg-gradient-to-br from-[#141416] to-[#0b0b0d] p-4">
            <svg viewBox="0 0 1200 780" className="w-full">
              <defs>
                <linearGradient id="lidBgPreview" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#3d4750" />
                  <stop offset="0.5" stopColor="#232830" />
                  <stop offset="1" stopColor="#151a1f" />
                </linearGradient>
              </defs>
              <rect x="20" y="20" width="1160" height="740" rx="18" fill="url(#lidBgPreview)" />
              <rect x="20" y="730" width="1160" height="30" fill="#0a0c0e" />
              <text x="600" y="750" textAnchor="middle" fontSize="10" fill="#5c6168" letterSpacing="5" fontFamily="JetBrains Mono, monospace">
                TUF  GAMING
              </text>
              <g transform="translate(600 350)">
                <path
                  d="M -140 -40 L -60 -40 L -30 -70 L -30 -12 L -60 -12 L -40 30 Q -20 52 0 46 Q 20 52 40 30 L 60 -12 L 30 -12 L 30 -70 L 60 -40 L 140 -40 L 100 22 L 82 32 Q 40 92 0 92 Q -40 92 -82 32 L -100 22 Z"
                  fill="#0b0d10"
                  opacity="0.92"
                />
              </g>

              {slots.map(s => {
                const isTarget = s.id === slot.id;
                const opacity = isTarget ? 1 : 0.28;
                return (
                  <g key={s.id} opacity={opacity}>
                    <rect
                      x={s.x} y={s.y} width={s.w} height={s.h}
                      rx="4"
                      fill={isTarget ? '#ffd21f' : 'rgba(30,30,34,0.9)'}
                      stroke={isTarget ? '#ffd21f' : '#38383d'}
                      strokeWidth={isTarget ? 2 : 1}
                    />
                    {isTarget ? (
                      <text
                        x={s.x + s.w / 2}
                        y={s.y + s.h / 2 + fontSize / 3}
                        textAnchor="middle"
                        fontSize={fontSize}
                        fontFamily="Space Grotesk, sans-serif"
                        fontWeight="700"
                        fill="#0b0b0d"
                        letterSpacing="0.5"
                      >
                        {previewText}
                      </text>
                    ) : s.sponsor ? (
                      <text
                        x={s.x + s.w / 2}
                        y={s.y + s.h / 2 + 5}
                        textAnchor="middle"
                        fontSize="14"
                        fontFamily="Space Grotesk, sans-serif"
                        fill="#8a8a90"
                        fontWeight="500"
                      >
                        {s.sponsor.name}
                      </text>
                    ) : null}
                  </g>
                );
              })}
            </svg>
          </div>

          <div>
            <label className="block">
              <div className="text-[10px] uppercase tracking-widest text-muted font-mono mb-1.5">
                Your brand name
              </div>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value.slice(0, 14))}
                placeholder="YOUR BRAND"
                className="w-full rounded-md border border-white/10 bg-ink px-3 py-3 text-lg font-display text-chalk focus:outline-none focus:border-acid transition"
                autoFocus
              />
              <div className="text-[10px] text-muted mt-1">
                Up to 14 characters. Uppercase looks best.
              </div>
            </label>

            <div className="mt-6 rounded-xl border border-white/5 bg-ink p-5">
              <div className="text-[10px] uppercase tracking-widest text-muted font-mono">
                Snapshot
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-muted text-xs">Current bid</div>
                  <div className="mono">{format(slot.currentBid)}</div>
                </div>
                <div>
                  <div className="text-muted text-xs">Bidders</div>
                  <div className="mono">{slot.bidders}</div>
                </div>
                <div>
                  <div className="text-muted text-xs">Sticker size</div>
                  <div className="mono">{slot.sizeMm} mm</div>
                </div>
                <div>
                  <div className="text-muted text-xs">Visibility</div>
                  <div className="mono capitalize">{slot.visibility}</div>
                </div>
              </div>
            </div>

            <div className="mt-6 font-display text-2xl">Looks good.</div>

            {slot.status === 'sold' ? (
              <div className="mt-2 text-sm text-muted">
                Already sold to {slot.sponsor?.name}.
              </div>
            ) : (
              <button
                onClick={() => onBid(slot)}
                className="mt-4 w-full rounded-md bg-acid text-ink py-3 font-semibold text-sm hover:bg-acid/90 transition"
              >
                Bid for this spot →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

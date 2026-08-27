import { useMemo } from 'react';

const format = (n) => '₹' + n.toLocaleString('en-IN');

const BRAND_MARKS = {
  cred: (
    <div className="w-full h-full flex items-center justify-center bg-black rounded-lg">
      <div className="font-display font-bold text-white tracking-tight text-2xl md:text-[30px]">CRED</div>
    </div>
  ),
  emergent: (
    <div className="w-full h-full flex items-center justify-center bg-[#0b0b0b] rounded-lg relative">
      <span
        className="text-white text-5xl md:text-6xl font-black italic leading-none"
        style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
      >
        e
      </span>
    </div>
  ),
  sarvam: (
    <div className="w-full h-full flex items-center justify-center gap-2 bg-white rounded-lg px-3">
      <svg viewBox="0 0 40 40" className="w-6 h-6 md:w-8 md:h-8 shrink-0">
        <g stroke="#0a0a0a" strokeWidth="1.8" fill="none" strokeLinejoin="round">
          <path d="M20 4 L28 12 L24 20 L28 28 L20 36 L12 28 L16 20 L12 12 Z" />
          <path d="M20 10 L26 15 L23 20 L26 25 L20 30 L14 25 L17 20 L14 15 Z" />
        </g>
      </svg>
      <div className="text-black font-display font-bold text-lg md:text-2xl tracking-tight">
        sarvam
      </div>
    </div>
  ),
  firstclub: (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#0f4a35] rounded-lg gap-0.5">
      <div
        className="text-[#f4e9d4] font-black leading-[0.95] text-lg md:text-2xl tracking-tight"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        FIRST
      </div>
      <div
        className="text-[#f4e9d4] font-black leading-[0.95] text-lg md:text-2xl tracking-tight"
        style={{ fontFamily: '"Playfair Display", Georgia, serif' }}
      >
        CLUB
      </div>
    </div>
  ),
  swish: (
    <div className="w-full h-full flex items-center justify-center gap-1.5 bg-[#22c55e] rounded-lg">
      <span className="text-white text-lg md:text-2xl leading-none">✦</span>
      <span className="text-white font-black text-xl md:text-3xl tracking-tight leading-none">
        swish
      </span>
    </div>
  ),
  dodo: (
    <div className="w-full h-full flex items-center justify-center bg-[#c6f24e] rounded-lg">
      <svg viewBox="0 0 60 52" className="w-10 h-10 md:w-14 md:h-14">
        <g fill="#0a0a0a">
          <ellipse cx="24" cy="26" rx="17" ry="19" />
          <path d="M 9 20 L 3 12 L 12 16 Z" />
          <path d="M 40 22 Q 56 24 58 32 Q 55 34 48 32 Q 42 30 40 28 Z" />
          <circle cx="30" cy="20" r="2.6" fill="#c6f24e" />
        </g>
      </svg>
    </div>
  ),
};

function BrandCard({ slot, span, onBid }) {
  if (!slot) return null;
  const mark = slot.sponsor?.brandKey ? BRAND_MARKS[slot.sponsor.brandKey] : null;
  const isTaken = !!slot.sponsor;
  const label = isTaken ? 'Outbid' : 'Bid';
  const colClass =
    span === 'wide'
      ? 'col-span-2 md:col-span-2'
      : 'col-span-1 md:col-span-1';

  return (
    <button
      onClick={() => onBid(slot)}
      className={`${colClass} relative rounded-2xl border ${
        isTaken ? 'border-white/10' : 'border-white/10 border-dashed'
      } bg-white/[0.02] p-2 md:p-2.5 flex flex-col group cursor-pointer hover:border-white/25 hover:bg-white/[0.04] transition overflow-hidden text-left focus:outline-none focus:ring-2 focus:ring-acid/60 min-h-[140px] md:min-h-0`}
      aria-label={`${label} ${slot.label}`}
    >
      <div className="flex-1 min-h-0 flex items-center justify-center rounded-xl overflow-hidden transition-[filter,opacity] duration-300 group-hover:blur-[6px] group-hover:opacity-30">
        {mark || (
          <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 text-center px-2 py-3">
            <div className="mono text-[9px] uppercase tracking-widest text-muted">
              Slot open
            </div>
            <div className="text-soft text-base md:text-lg font-display leading-tight">
              Your logo here
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 flex items-center justify-center gap-2 text-[11px] mono transition-opacity duration-300 group-hover:opacity-30">
        <span className="text-soft">{format(slot.currentBid)}</span>
        {slot.bidders > 0 && (
          <span className="text-muted/70">· {slot.bidders} {slot.bidders === 1 ? 'bidder' : 'bidders'}</span>
        )}
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 rounded-full bg-[#2b74ff] text-white px-6 py-2 font-semibold text-sm shadow-[0_10px_30px_rgba(43,116,255,0.4)]">
          {label}
        </span>
      </div>
    </button>
  );
}

function TufCenter({ mobile }) {
  return (
    <div
      className={`${
        mobile
          ? 'col-span-2 flex items-center justify-center py-6'
          : 'col-span-2 flex items-center justify-center relative'
      }`}
    >
      <svg viewBox="-140 -90 280 190" className="w-full h-full max-h-[160px] md:max-h-full">
        <g>
          <path
            d="M -100 -30 L -45 -30 L -22 -50 L -22 -8 L -45 -8 L -30 22 Q -14 38 0 34 Q 14 38 30 22 L 45 -8 L 22 -8 L 22 -50 L 45 -30 L 100 -30 L 72 16 L 58 24 Q 28 66 0 66 Q -28 66 -58 24 L -72 16 Z"
            fill="#f5f5f4"
          />
          <text
            y="90"
            textAnchor="middle"
            fontSize="14"
            fill="#f5f5f4"
            letterSpacing="8"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
          >
            TUF
          </text>
        </g>
      </svg>
    </div>
  );
}

export default function LaptopShowcase({ slots, onBid }) {
  const byId = useMemo(
    () => Object.fromEntries(slots.map((s) => [s.id, s])),
    [slots]
  );

  return (
    <div id="showcase" className="rounded-3xl border border-white/10 bg-white/[0.02] p-2.5 md:p-4">
      {/* Desktop grid: 6 columns × 3 rows */}
      <div className="hidden md:grid grid-cols-6 grid-rows-[210px_170px_210px] gap-3">
        <BrandCard slot={byId[1]} span="wide"   onBid={onBid} />
        <BrandCard slot={byId[2]} span="wide"   onBid={onBid} />
        <BrandCard slot={byId[3]} span="wide"   onBid={onBid} />

        <BrandCard slot={byId[4]} span="narrow" onBid={onBid} />
        <BrandCard slot={byId[5]} span="narrow" onBid={onBid} />
        <TufCenter />
        <BrandCard slot={byId[6]} span="narrow" onBid={onBid} />
        <BrandCard slot={byId[7]} span="narrow" onBid={onBid} />

        <BrandCard slot={byId[8]}  span="wide" onBid={onBid} />
        <BrandCard slot={byId[9]}  span="wide" onBid={onBid} />
        <BrandCard slot={byId[10]} span="wide" onBid={onBid} />
      </div>

      {/* Mobile: 2 columns, TUF as a centered header */}
      <div className="grid md:hidden grid-cols-2 gap-2">
        <TufCenter mobile />
        {[1,2,3,4,5,6,7,8,9,10].map((id) => (
          <BrandCard key={id} slot={byId[id]} span="narrow" onBid={onBid} />
        ))}
      </div>
    </div>
  );
}

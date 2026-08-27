import { useMemo } from 'react';

const format = (n) => '₹' + Number(n).toLocaleString('en-IN');

const BRAND_MARKS = {
  emergent: (
    <div className="w-full h-full flex items-center justify-center rounded-xl bg-[#0b0b0b]">
      <span
        className="text-white text-[38%] italic font-black leading-none"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        e
      </span>
    </div>
  ),
  sarvam: (
    <div className="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-[#7c6fe8] via-[#c96fb0] to-[#f0a95c]">
      <span
        className="text-white text-[17%] italic tracking-tight"
        style={{ fontFamily: 'Georgia, serif' }}
      >
        sarvam
      </span>
    </div>
  ),
  firstclub: (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-[#0f4a35] gap-0.5">
      <span className="text-[#f4e9d4] font-black leading-[0.95] text-[17%] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
        FIRST
      </span>
      <span className="text-[#f4e9d4] font-black leading-[0.95] text-[17%] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
        CLUB
      </span>
    </div>
  ),
  swish: (
    <div className="w-full h-full flex items-center justify-center gap-[3%] rounded-xl bg-[#22c55e]">
      <span className="text-white text-[14%] leading-none">✦</span>
      <span className="text-white font-black text-[17%] tracking-tight leading-none italic">swish</span>
    </div>
  ),
  dodo: (
    <div className="w-full h-full flex items-center justify-center rounded-full bg-[#c6f24e]">
      <svg viewBox="0 0 60 52" className="w-[56%] h-[56%]">
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

function OpenTile() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-white/95 border border-dashed border-textSecondary/40 gap-[4%]">
      <span className="text-[10%] font-bold tracking-widest text-textSecondary/80">OPEN</span>
      <span className="text-[8%] text-textSecondary/70">from ₹800</span>
    </div>
  );
}

function PendingTile() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-[3%] rounded-xl bg-yellow-50 border border-dashed border-yellow-400/60">
      <span className="text-[15%] leading-none">⏳</span>
      <span className="text-[8%] font-semibold text-yellow-700/80 tracking-widest text-center leading-tight px-[6%]">
        VERIFYING
      </span>
    </div>
  );
}

function SponsorTile({ sponsor }) {
  if (sponsor.logoUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center rounded-xl bg-white overflow-hidden p-[8%]">
        <img src={sponsor.logoUrl} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
      </div>
    );
  }
  if (sponsor.brandKey && BRAND_MARKS[sponsor.brandKey]) {
    return BRAND_MARKS[sponsor.brandKey];
  }
  return (
    <div className="w-full h-full flex items-center justify-center rounded-xl bg-textPrimary">
      <span className="text-white font-bold text-[22%]">{sponsor.name?.[0] || '?'}</span>
    </div>
  );
}

function HourglassBadge() {
  return (
    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-accentBlue/15 flex items-center justify-center">
      <span className="text-accentBlue text-[9px] leading-none">⧗</span>
    </div>
  );
}

/* Positions as % of the container. Uniform sizing keeps the layout
   calm; 5 primary spots in corners + bottom-center, 2 quieter open
   spots flanking the TUF logo at mid-height. */
/* Bigger tiles (18%), packed tight. Top row = 3 adjacent above the
   TUF logo. Middle row = 2 flanking the wings. Bottom row = 2
   adjacent, centered under the logo. All uniform size. */
const TILE = 18;
const POSITIONS = [
  { id: 1, left: 20,   top: 14 },  // top row, left
  { id: 2, left: 40.5, top: 14 },  // top row, center
  { id: 3, left: 61,   top: 14 },  // top row, right
  { id: 4, left: 3,    top: 39 },  // mid, flanking left of TUF
  { id: 5, left: 79,   top: 39 },  // mid, flanking right of TUF
  { id: 6, left: 30.5, top: 58 },  // bottom row, left-adjacent
  { id: 7, left: 51,   top: 58 },  // bottom row, right-adjacent
];

function TufLid() {
  return (
    <img
      src="/tuf-laptop.png"
      alt="ASUS TUF Gaming F15 back view"
      className="w-full h-auto block select-none"
      draggable={false}
    />
  );
}

export default function LogoGrid({ slots, onBid }) {
  const byId = useMemo(
    () => Object.fromEntries(slots.map((s) => [s.id, s])),
    [slots]
  );

  return (
    <section id="logos" className="py-[60px] max-w-[1200px] mx-auto px-6">
      {/* Grey gradient outer frame, echoes the brandmymac reference feel */}
      <div className="w-full max-w-[1060px] mx-auto rounded-[32px] p-4 md:p-6 bg-gradient-to-b from-[#f2f3f5] to-[#e2e4e8]">
        <div
          className="relative w-full rounded-[24px] overflow-hidden bg-white"
          style={{ filter: 'drop-shadow(0 18px 40px rgba(30, 40, 60, 0.14))' }}
        >
          <TufLid />
          {POSITIONS.map((pos) => {
            const slot = byId[pos.id];
            if (!slot) return null;
            const hasBidder = slot.bidders > 0;
            const label = hasBidder ? 'Outbid' : 'Bid';
            const tileSize = TILE;
            return (
              <div
                key={pos.id}
                className="absolute flex flex-col items-center"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  width: `${tileSize}%`,
                }}
              >
                <button
                  onClick={() => onBid(slot)}
                  aria-label={`${label} on ${slot.label}`}
                  className="relative w-full aspect-square rounded-xl group cursor-pointer transition-transform duration-150 hover:scale-[1.05] focus:outline-none focus:ring-2 focus:ring-accentBlue"
                  style={{ boxShadow: '0 6px 16px rgba(20,30,50,0.20)' }}
                >
                  <div className="w-full h-full relative rounded-xl overflow-hidden">
                    {slot.sponsor
                      ? <SponsorTile sponsor={slot.sponsor} />
                      : hasBidder
                        ? <PendingTile />
                        : <OpenTile />}
                    {hasBidder && <HourglassBadge />}
                    <div className="absolute inset-0 bg-black/72 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center rounded-xl">
                      <span className="text-white rounded-full bg-accentBlue px-3 py-1 text-[11px] md:text-xs font-semibold whitespace-nowrap">
                        {label}
                      </span>
                    </div>
                  </div>
                </button>
                {/* Price chip below sticker, styled like brandmymac's price labels */}
                <div className="mt-1.5 px-2 py-0.5 rounded-full bg-black/55 backdrop-blur-sm text-white text-[9px] md:text-[10px] font-semibold tabular-nums">
                  {hasBidder ? format(slot.currentBid) : `from ${format(slot.currentBid)}`}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-textSecondary max-w-[560px] mx-auto">
        Click any sticker to bid on that spot. Minimum ₹800. Pay via UPI. I verify manually.
      </p>
    </section>
  );
}

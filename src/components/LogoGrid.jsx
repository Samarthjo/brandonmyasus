import { useMemo } from 'react';

const format = (n) => '₹' + Number(n).toLocaleString('en-IN');

const BRAND_MARKS = {
  emergent: (
    <div className="w-full h-full flex items-center justify-center rounded-md bg-[#0b0b0b]">
      <span className="text-white text-[48%] italic font-black leading-none" style={{ fontFamily: 'Georgia, serif' }}>e</span>
    </div>
  ),
  sarvam: (
    <div className="w-full h-full flex items-center justify-center rounded-md bg-gradient-to-br from-[#7c6fe8] via-[#c96fb0] to-[#f0a95c]">
      <span className="text-white text-[22%] italic tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>sarvam</span>
    </div>
  ),
  firstclub: (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-md bg-[#0f4a35] gap-0.5">
      <span className="text-[#f4e9d4] font-black leading-[0.95] text-[22%] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>FIRST</span>
      <span className="text-[#f4e9d4] font-black leading-[0.95] text-[22%] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>CLUB</span>
    </div>
  ),
  swish: (
    <div className="w-full h-full flex items-center justify-center gap-[3%] rounded-md bg-[#22c55e]">
      <span className="text-white text-[18%] leading-none">✦</span>
      <span className="text-white font-black text-[22%] tracking-tight leading-none italic">swish</span>
    </div>
  ),
  dodo: (
    <div className="w-full h-full flex items-center justify-center rounded-full bg-[#c6f24e]">
      <svg viewBox="0 0 60 52" className="w-[58%] h-[58%]">
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

function SponsorLogo({ sponsor }) {
  if (sponsor.logoUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-white rounded-md p-1">
        <img src={sponsor.logoUrl} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
      </div>
    );
  }
  if (sponsor.brandKey && BRAND_MARKS[sponsor.brandKey]) {
    return BRAND_MARKS[sponsor.brandKey];
  }
  return (
    <div className="w-full h-full flex items-center justify-center rounded-md bg-textPrimary">
      <span className="text-white font-bold text-[28%]">{sponsor.name?.[0] || '?'}</span>
    </div>
  );
}

function OpenLogo() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span className="text-[11%] font-bold tracking-widest text-textSecondary/60">OPEN</span>
    </div>
  );
}

function PendingLogo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
      <span className="text-[16%] leading-none">⏳</span>
    </div>
  );
}

function StickerCard({ slot, onClick }) {
  const hasBidder = slot.bidders > 0;
  const label = hasBidder ? 'Outbid' : 'Bid';
  const isOpen = !slot.sponsor && !hasBidder;

  return (
    <button
      onClick={onClick}
      aria-label={`${label} on ${slot.label}`}
      className="relative w-full aspect-square rounded-xl group cursor-pointer transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accentBlue"
    >
      <div
        className={`absolute inset-0 rounded-xl bg-white flex flex-col items-stretch justify-between p-[6%] transition-shadow duration-200 shadow-[0_4px_10px_rgba(20,30,50,0.18)] group-hover:shadow-[0_10px_22px_rgba(20,30,50,0.28)] ${
          isOpen
            ? 'border border-dashed border-textSecondary/30'
            : 'border border-borderLight'
        }`}
      >
        {hasBidder && (
          <div className="absolute top-[6%] right-[6%] w-[16%] aspect-square rounded bg-accentBlue/15 flex items-center justify-center z-10">
            <span className="text-accentBlue text-[45%] leading-none font-bold">⧗</span>
          </div>
        )}

        <div className="flex-1 w-full flex items-center justify-center min-h-0">
          {slot.sponsor ? (
            <SponsorLogo sponsor={slot.sponsor} />
          ) : hasBidder ? (
            <PendingLogo />
          ) : (
            <OpenLogo />
          )}
        </div>

        <div className="text-center text-textSecondary font-medium tabular-nums leading-none mt-[4%]" style={{ fontSize: 'clamp(8px, 1.05vw, 12px)' }}>
          {hasBidder ? format(slot.currentBid) : `from ${format(slot.currentBid)}`}
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl bg-textPrimary/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
        <span className="text-white bg-accentBlue rounded-full px-3 py-1 font-semibold shadow-lg whitespace-nowrap" style={{ fontSize: 'clamp(9px, 1vw, 13px)' }}>
          {label}
        </span>
      </div>
    </button>
  );
}

/* Sticker positions calibrated to the actual TUF F15 photo.
   Bigger cards (20%) packed adjacent — 3 top row above TUF logo,
   2 flanking mid-height, 2 adjacent below. */
const TILE = 20;
const POSITIONS = [
  { id: 1, left: 15, top: 8  },   // top row, left
  { id: 2, left: 40, top: 8  },   // top row, center-top (above TUF)
  { id: 3, left: 65, top: 8  },   // top row, right
  { id: 4, left: 2,  top: 38 },   // mid, flanking left of TUF
  { id: 5, left: 78, top: 38 },   // mid, flanking right of TUF
  { id: 6, left: 27, top: 57 },   // bottom row, left-adjacent
  { id: 7, left: 52, top: 57 },   // bottom row, right-adjacent
];

export default function LogoGrid({ slots, onBid }) {
  const byId = useMemo(
    () => Object.fromEntries(slots.map((s) => [s.id, s])),
    [slots]
  );

  return (
    <section id="logos" className="py-14 max-w-[1200px] mx-auto px-6">
      <div className="w-full max-w-[1000px] mx-auto rounded-[28px] p-3 sm:p-4 md:p-6 bg-gradient-to-b from-[#eef0f3] to-[#dfe2e7] shadow-[0_20px_50px_rgba(30,40,60,0.10)]">
        <div className="relative w-full rounded-[20px] overflow-hidden bg-white">
          <img
            src="/tuf-laptop.png"
            alt="ASUS TUF Gaming F15 back view"
            className="w-full h-auto block select-none"
            draggable={false}
          />
          {POSITIONS.map((pos) => {
            const slot = byId[pos.id];
            if (!slot) return null;
            return (
              <div
                key={pos.id}
                className="absolute"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  width: `${TILE}%`,
                }}
              >
                <StickerCard slot={slot} onClick={() => onBid(slot)} />
              </div>
            );
          })}
        </div>
      </div>
      <p className="mt-5 text-center text-sm text-textSecondary max-w-[560px] mx-auto">
        Click any sticker card to bid on that spot. Minimum ₹800. Pay via UPI. I verify manually.
      </p>
    </section>
  );
}

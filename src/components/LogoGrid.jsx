import { useMemo } from 'react';

const format = (n) => '₹' + Number(n).toLocaleString('en-IN');

const BRAND_MARKS = {
  emergent: (
    <div className="w-full h-full flex items-center justify-center rounded-lg bg-[#0b0b0b]">
      <span className="text-white text-[52%] italic font-black leading-none" style={{ fontFamily: 'Georgia, serif' }}>e</span>
    </div>
  ),
  sarvam: (
    <div className="w-full h-full flex items-center justify-center rounded-lg bg-gradient-to-br from-[#7c6fe8] via-[#c96fb0] to-[#f0a95c]">
      <span className="text-white text-[22%] italic tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>sarvam</span>
    </div>
  ),
  firstclub: (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-lg bg-[#0f4a35] gap-0.5">
      <span className="text-[#f4e9d4] font-black leading-[0.95] text-[22%] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>FIRST</span>
      <span className="text-[#f4e9d4] font-black leading-[0.95] text-[22%] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>CLUB</span>
    </div>
  ),
  swish: (
    <div className="w-full h-full flex items-center justify-center gap-[3%] rounded-lg bg-[#22c55e]">
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
      <div className="w-full h-full flex items-center justify-center bg-white rounded-lg p-2">
        <img src={sponsor.logoUrl} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
      </div>
    );
  }
  if (sponsor.brandKey && BRAND_MARKS[sponsor.brandKey]) {
    return BRAND_MARKS[sponsor.brandKey];
  }
  return (
    <div className="w-full h-full flex items-center justify-center rounded-lg bg-textPrimary">
      <span className="text-white font-bold text-[28%]">{sponsor.name?.[0] || '?'}</span>
    </div>
  );
}

function OpenLogo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
      <span className="text-[11%] font-bold tracking-widest text-textSecondary/70">OPEN</span>
    </div>
  );
}

function PendingLogo() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-1">
      <span className="text-[18%] leading-none">⏳</span>
      <span className="text-[9%] font-semibold text-yellow-700/70 tracking-widest">VERIFYING</span>
    </div>
  );
}

function HourglassBadge() {
  return (
    <div className="absolute top-2 right-2 w-5 h-5 rounded-md bg-accentBlue/15 flex items-center justify-center z-10">
      <span className="text-accentBlue text-[10px] leading-none">⧗</span>
    </div>
  );
}

function Card({ slot, onClick }) {
  const hasBidder = slot.bidders > 0;
  const label = hasBidder ? 'Outbid' : 'Bid';
  const isOpen = !slot.sponsor && !hasBidder;

  return (
    <button
      onClick={onClick}
      aria-label={`${label} on ${slot.label}`}
      className="relative aspect-square w-full rounded-2xl group cursor-pointer transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-accentBlue"
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-white flex flex-col items-center justify-between p-3 transition-shadow duration-200 shadow-[0_1px_2px_rgba(20,30,50,0.06)] group-hover:shadow-[0_8px_24px_rgba(20,30,50,0.12)] ${
          isOpen
            ? 'border border-dashed border-textSecondary/30'
            : 'border border-borderLight'
        }`}
      >
        {hasBidder && <HourglassBadge />}

        <div className="flex-1 w-full flex items-center justify-center min-h-0 py-1">
          {slot.sponsor ? (
            <SponsorLogo sponsor={slot.sponsor} />
          ) : hasBidder ? (
            <PendingLogo />
          ) : (
            <OpenLogo />
          )}
        </div>

        <div className="text-[11px] md:text-xs text-textSecondary font-medium tabular-nums">
          {hasBidder
            ? format(slot.currentBid)
            : `from ${format(slot.currentBid)}`}
        </div>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 rounded-2xl bg-textPrimary/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
        <span className="text-white bg-accentBlue rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold shadow-lg whitespace-nowrap">
          {label}
        </span>
      </div>
    </button>
  );
}

function TufCenter() {
  return (
    <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-br from-white to-[#eef0f3] border border-borderLight shadow-[0_2px_6px_rgba(20,30,50,0.06)] flex flex-col items-center justify-center gap-2">
      <svg viewBox="-200 -100 400 240" className="w-[72%] h-auto" preserveAspectRatio="xMidYMid meet">
        <path
          d="M -180 -30 L -110 -30 L -70 -74 L -70 -18 L -102 -18 L -60 26 Q -32 56 0 46 Q 32 56 60 26 L 102 -18 L 70 -18 L 70 -74 L 110 -30 L 180 -30 L 122 30 L 96 46 Q 50 108 0 108 Q -50 108 -96 46 L -122 30 Z"
          fill="#161a20"
        />
      </svg>
      <span className="text-[9px] font-bold tracking-[0.28em] text-textSecondary/70">
        ASUS · TUF
      </span>
    </div>
  );
}

function EmptyPlaceholder() {
  return (
    <div className="relative aspect-square w-full rounded-2xl border border-dashed border-textSecondary/25 bg-white/40 flex flex-col items-center justify-center gap-1">
      <span className="text-[11px] font-bold tracking-widest text-textSecondary/50">
        BULK
      </span>
      <span className="text-[9px] text-textSecondary/50">email me</span>
    </div>
  );
}

export default function LogoGrid({ slots, onBid }) {
  const byId = useMemo(
    () => Object.fromEntries(slots.map((s) => [s.id, s])),
    [slots]
  );

  return (
    <section id="logos" className="py-14 max-w-[1200px] mx-auto px-6">
      <div className="max-w-[880px] mx-auto rounded-[28px] p-3 sm:p-4 md:p-5 bg-gradient-to-b from-[#eef0f3] to-[#dfe2e7] shadow-[0_20px_50px_rgba(30,40,60,0.10)]">
        <div className="grid grid-cols-3 gap-2 md:gap-3">
          {/* Row 1 */}
          {byId[1] && <Card slot={byId[1]} onClick={() => onBid(byId[1])} />}
          {byId[2] && <Card slot={byId[2]} onClick={() => onBid(byId[2])} />}
          {byId[3] && <Card slot={byId[3]} onClick={() => onBid(byId[3])} />}

          {/* Row 2 — TUF centerpiece */}
          {byId[4] && <Card slot={byId[4]} onClick={() => onBid(byId[4])} />}
          <TufCenter />
          {byId[5] && <Card slot={byId[5]} onClick={() => onBid(byId[5])} />}

          {/* Row 3 */}
          {byId[6] && <Card slot={byId[6]} onClick={() => onBid(byId[6])} />}
          {byId[7] && <Card slot={byId[7]} onClick={() => onBid(byId[7])} />}
          <EmptyPlaceholder />
        </div>
      </div>
      <p className="mt-5 text-center text-sm text-textSecondary max-w-[560px] mx-auto">
        Click any card to bid on that spot. Minimum ₹800. Pay via UPI. I verify manually.
      </p>
    </section>
  );
}

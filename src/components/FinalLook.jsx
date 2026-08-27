import { useMemo } from 'react';

const format = (n) => '₹' + Number(n).toLocaleString('en-IN');

const BRAND_MARKS = {
  emergent: (
    <div className="w-full h-full flex items-center justify-center rounded-xl bg-[#0b0b0b]">
      <span className="text-white text-[38%] italic font-black leading-none" style={{ fontFamily: 'Georgia, serif' }}>e</span>
    </div>
  ),
  sarvam: (
    <div className="w-full h-full flex items-center justify-center rounded-xl bg-gradient-to-br from-[#7c6fe8] via-[#c96fb0] to-[#f0a95c]">
      <span className="text-white text-[17%] italic tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>sarvam</span>
    </div>
  ),
  firstclub: (
    <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-[#0f4a35] gap-0.5">
      <span className="text-[#f4e9d4] font-black leading-[0.95] text-[17%] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>FIRST</span>
      <span className="text-[#f4e9d4] font-black leading-[0.95] text-[17%] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>CLUB</span>
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

function OpenGhost() {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-xl bg-white/12 border border-dashed border-white/30">
      <span className="text-[10%] font-bold tracking-widest text-white/50">OPEN</span>
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

const TILE = 18;
const POSITIONS = [
  { id: 1, left: 20,   top: 14 },
  { id: 2, left: 40.5, top: 14 },
  { id: 3, left: 61,   top: 14 },
  { id: 4, left: 3,    top: 39 },
  { id: 5, left: 79,   top: 39 },
  { id: 6, left: 30.5, top: 58 },
  { id: 7, left: 51,   top: 58 },
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

export default function FinalLook({ slots }) {
  const byId = useMemo(
    () => Object.fromEntries(slots.map((s) => [s.id, s])),
    [slots]
  );

  const claimed = slots.filter((s) => s.sponsor).length;

  return (
    <section className="relative overflow-hidden bg-textPrimary text-surfaceLight py-[100px]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 -left-40 h-[400px] w-[400px] rounded-full bg-accentBlue/15 blur-3xl" />
        <div className="absolute bottom-0 -right-40 h-[400px] w-[400px] rounded-full bg-accentGreen/10 blur-3xl" />
      </div>

      <div className="relative max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-mono">
            The final look
          </div>
          <h2 className="text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight max-w-[720px] mx-auto">
            Your logo. Actually there.
          </h2>
          <p className="mt-5 text-lg text-gray-300 max-w-[560px] mx-auto">
            This is what people see across cafés in Koramangala, Indiranagar, and every other place I open this laptop.
          </p>
        </div>

        {/* Angled 3D preview */}
        <div
          className="mx-auto max-w-[1000px] relative"
          style={{ perspective: '1800px' }}
        >
          <div
            className="relative w-full rounded-[24px] overflow-hidden bg-white"
            style={{
              transform: 'rotateX(14deg) rotateY(-10deg) rotateZ(-1deg)',
              transformStyle: 'preserve-3d',
              boxShadow: '0 40px 90px rgba(0,0,0,0.55), 0 15px 40px rgba(0,0,0,0.4)',
            }}
          >
            <TufLid />
            {POSITIONS.map((pos) => {
              const slot = byId[pos.id];
              if (!slot) return null;
              const tileSize = TILE;
              return (
                <div
                  key={pos.id}
                  className="absolute rounded-xl overflow-hidden aspect-square"
                  style={{
                    left: `${pos.left}%`,
                    top: `${pos.top}%`,
                    width: `${tileSize}%`,
                    boxShadow: '0 6px 16px rgba(0,0,0,0.35)',
                    transform: 'translateZ(6px)',
                  }}
                >
                  {slot.sponsor
                    ? <SponsorTile sponsor={slot.sponsor} />
                    : <OpenGhost />}
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 flex-wrap text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-accentGreen animate-pulse" />
            {claimed} of {slots.length} spots confirmed
          </div>
          <span className="text-gray-600">·</span>
          <a href="#logos" className="text-accentBlue font-semibold hover:underline">
            Grab an open spot →
          </a>
        </div>
      </div>
    </section>
  );
}

export default function SocialProofBanner() {
  return (
    <section className="bg-textPrimary text-surfaceLight py-[100px] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accentBlue/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accentGreen/10 blur-3xl" />
      </div>
      <div className="relative max-w-[1200px] mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-400 mb-6 font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-accentGreen" />
          The whole pitch
        </div>
        <h2 className="text-4xl md:text-6xl font-bold mb-6 max-w-[820px] mx-auto leading-[1.05] tracking-tight">
          Everyone hears the ASUS.<br />
          <span className="text-accentBlue">Then they look at it.</span>
        </h2>
        <p className="text-lg text-gray-300 max-w-[600px] mx-auto">
          This is not a silent MacBook. This is a gaming laptop. When it opens, the room notices — and your logo is exactly where their eyes land.
        </p>
        <div className="mt-10 flex items-center justify-center gap-6 flex-wrap text-sm">
          <span className="text-gray-400">🔊 Loud fans</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-400">🎯 Guaranteed attention</span>
          <span className="text-gray-500">·</span>
          <span className="text-gray-400">📱 Portable billboard</span>
        </div>
      </div>
    </section>
  );
}

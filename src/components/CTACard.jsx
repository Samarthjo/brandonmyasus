export default function CTACard() {
  return (
    <section className="py-[80px] max-w-[1200px] mx-auto px-6">
      <div className="bg-gradient-to-br from-textPrimary to-[#2a2f3a] text-surfaceLight rounded-3xl p-12 md:p-16 max-w-[880px] mx-auto shadow-2xl text-center relative overflow-hidden">
        <div className="absolute -top-32 -right-32 h-[400px] w-[400px] rounded-full bg-accentBlue/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-accentGreen/10 blur-3xl pointer-events-none" />
        <div className="relative">
          <div className="text-xs uppercase tracking-widest text-gray-400 mb-4 font-mono">Take a spot</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Help me quit my day job.
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-[520px] mx-auto">
            Stick your logo on my ASUS TUF Gaming F15 for six months. Every ₹800+ bid brings me closer to two months of full-time café building.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a
              href="#logos"
              className="bg-accentBlue text-surfaceLight rounded-full px-8 py-3 font-semibold hover:opacity-90 transition"
            >
              Place a bid →
            </a>
            <a
              href="mailto:samarth.joshi2004@gmail.com"
              className="border border-white/30 text-surfaceLight rounded-full px-8 py-3 font-semibold hover:bg-white/10 transition"
            >
              Email me directly
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

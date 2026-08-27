const format = (n) => '₹' + n.toLocaleString('en-IN');

export default function Hero({ stats }) {
  return (
    <section className="pt-[110px] pb-[40px] max-w-[1200px] mx-auto px-6 text-center">
      <div className="inline-flex items-center gap-2 rounded-full bg-white border border-borderLight px-4 py-1.5 mb-6 shadow-sm">
        <span className="text-lg leading-none">🔊</span>
        <span className="text-xs font-semibold text-textPrimary">Fans included. Attention guaranteed.</span>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] mb-5 max-w-[720px] mx-auto tracking-tight">
        Your brand, on my ASUS.
      </h1>
      <p className="text-lg text-textSecondary max-w-[620px] mx-auto mb-8 leading-relaxed">
        I'm renting out the back of my ASUS TUF Gaming F15 to help me leave my day job and survive two months in Bengaluru while I try to build my own thing.
      </p>
      <div className="flex items-center justify-center gap-8 mb-10 flex-wrap">
        <div>
          <div className="text-3xl font-bold text-accentGreen">{format(stats.totalRaised)}</div>
          <div className="text-sm text-textSecondary">Raised of {format(stats.goalAmount)}</div>
        </div>
        <div className="w-px h-12 bg-borderLight hidden sm:block" />
        <div>
          <div className="text-3xl font-bold">{stats.percentFunded}%</div>
          <div className="text-sm text-textSecondary">to my quit-day-job goal</div>
        </div>
        <div className="w-px h-12 bg-borderLight hidden sm:block" />
        <div>
          <div className="text-3xl font-bold">
            {stats.claimed}<span className="text-textSecondary">/{stats.spotsTotal}</span>
          </div>
          <div className="text-sm text-textSecondary">sticker slots claimed</div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <a
          href="#logos"
          className="inline-block bg-accentBlue text-surfaceLight rounded-full px-8 py-3 font-semibold hover:opacity-90 transition"
        >
          See the lid
        </a>
        <a
          href="#how"
          className="inline-block border border-textPrimary text-textPrimary rounded-full px-8 py-3 font-semibold hover:bg-textPrimary hover:text-surfaceLight transition"
        >
          How it works
        </a>
      </div>
    </section>
  );
}

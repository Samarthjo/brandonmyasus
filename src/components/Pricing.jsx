const format = (n) => '₹' + n.toLocaleString('en-IN');

export default function Pricing({ stats }) {
  const remaining = Math.max(0, stats.goalAmount - stats.totalRaised);

  return (
    <section id="pricing" className="py-[100px] max-w-[1200px] mx-auto px-6">
      <div className="mb-12">
        <div className="text-xs uppercase tracking-widest text-textSecondary mb-3 font-mono">
          The goal
        </div>
        <h2 className="text-4xl font-bold">Why I'm doing this.</h2>
        <p className="mt-3 text-textSecondary max-w-[620px] leading-relaxed">
          I want to quit my day job and spend two months building my own thing full-time from a café in Bengaluru. This is what that costs — down to the rice.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_1.1fr] gap-8">
        <div className="bg-surfaceLight rounded-3xl p-8 border border-borderLight shadow-sm">
          <div className="text-xs uppercase tracking-widest text-textSecondary mb-2 font-mono">Two months in Bengaluru</div>
          <h3 className="font-bold text-2xl mb-1">Total runway</h3>
          <p className="text-textSecondary text-sm mb-6">Rent, food, coffee, wifi, one flight home if it goes badly.</p>
          <div className="grid gap-3 mb-6">
            <Row label="Rent (2 months, Koramangala)" v="₹70,000" />
            <Row label="Food + groceries" v="₹30,000" />
            <Row label="Cafés + coffee (working spots)" v="₹20,000" />
            <Row label="Wifi + phone + utilities" v="₹10,000" />
            <Row label="Health buffer + misc" v="₹25,000" />
            <Row label="Just-in-case flight home" v="₹15,000" />
            <Row label="Runway padding" v="₹10,000" />
          </div>
          <div className="pt-6 border-t border-borderLight">
            <div className="text-4xl font-bold text-accentGreen">{format(stats.goalAmount)}</div>
            <div className="text-sm text-textSecondary mt-1">Total needed</div>
          </div>
        </div>

        <div className="bg-surfaceLight rounded-3xl p-8 border border-borderLight shadow-sm">
          <div className="text-xs uppercase tracking-widest text-textSecondary mb-6 font-mono">Funding progress</div>

          <div className="mb-6">
            <div className="flex items-baseline justify-between mb-2">
              <span className="font-mono text-lg">{format(stats.totalRaised)}</span>
              <span className="font-mono text-sm text-textSecondary">{stats.percentFunded}%</span>
            </div>
            <div className="h-3 rounded-full bg-borderLight overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accentBlue to-accentGreen transition-all duration-700"
                style={{ width: `${stats.percentFunded}%` }}
              />
            </div>
            <div className="text-xs text-textSecondary mt-1.5">{format(remaining)} still needed</div>
          </div>

          <div className="divide-y divide-borderLight mt-6">
            <Row label="Runway goal" v={format(stats.goalAmount)} />
            <Row label="Raised from sponsors" v={format(stats.totalRaised)} accent />
            <Row label="Remaining to reach goal" v={format(remaining)} />
            <Row label="Sponsors on the lid" v={String(stats.claimed)} />
            <Row label="Sticker duration" v="6 months min." />
            <Row label="Notice period at day job" v={stats.percentFunded >= 100 ? 'Filed' : 'Pending'} accent={stats.percentFunded >= 100} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ label, v, accent }) {
  return (
    <div className="flex items-center justify-between py-3 text-sm">
      <span className="text-textSecondary">{label}</span>
      <span className={`font-semibold ${accent ? 'text-accentGreen' : 'text-textPrimary'}`}>{v}</span>
    </div>
  );
}

const format = (n) => '₹' + n.toLocaleString('en-IN');

export default function AuctionTable({ slots, stats, onBid }) {
  const sorted = [...slots].sort((a, b) => b.currentBid - a.currentBid);

  return (
    <section className="py-[100px] max-w-[1200px] mx-auto px-6">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-widest text-textSecondary mb-3 font-mono">
            Live auction
          </div>
          <h2 className="text-4xl font-bold">The auction flow</h2>
          <p className="mt-3 text-textSecondary max-w-[560px] leading-relaxed">
            Ranked by current bid. All bids pending until I confirm the UPI payment. Every rupee goes toward the {format(stats.goalAmount)} runway I need to leave my day job.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-textSecondary font-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-accentGreen animate-pulse" />
          Auction live
        </div>
      </div>

      <div className="bg-surfaceLight rounded-3xl overflow-hidden shadow-sm border border-borderLight">
        <div className="grid grid-cols-[70px_1fr_140px_100px_140px] px-6 py-4 text-xs uppercase tracking-widest text-textSecondary font-mono border-b border-borderLight">
          <div>Rank</div>
          <div>Spot</div>
          <div>Bid</div>
          <div>Bidders</div>
          <div className="text-right">Action</div>
        </div>
        {sorted.map((slot, i) => {
          const hasBidder = slot.bidders > 0;
          return (
            <div
              key={slot.id}
              className="grid grid-cols-[70px_1fr_140px_100px_140px] px-6 py-4 items-center border-b border-borderLight last:border-b-0 hover:bg-bgLight transition"
            >
              <div className="font-mono text-textSecondary font-semibold">#{i + 1}</div>
              <div>
                <div className="font-semibold">{hasBidder && slot.sponsor ? slot.sponsor.name : slot.label}</div>
                <div className="text-xs text-textSecondary">
                  {slot.sizeMm} mm · Slot {slot.id}
                </div>
              </div>
              <div className="font-mono font-semibold">{format(slot.currentBid)}</div>
              <div className="font-mono text-textSecondary">{slot.bidders}</div>
              <div className="text-right">
                <button
                  onClick={() => onBid(slot)}
                  className="border border-textPrimary text-textPrimary rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-textPrimary hover:text-surfaceLight transition"
                >
                  {hasBidder ? 'Outbid' : 'Place bid'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 grid md:grid-cols-3 gap-4">
        <StatBox label="Goal" value={format(stats.goalAmount)} sub="Two months in Bengaluru" />
        <StatBox label="Raised" value={format(stats.totalRaised)} sub={`${stats.percentFunded}% of goal`} accent />
        <StatBox label="Remaining" value={format(Math.max(0, stats.goalAmount - stats.totalRaised))} sub={`${stats.spotsTotal - stats.claimed} open spots`} />
      </div>
    </section>
  );
}

function StatBox({ label, value, sub, accent }) {
  return (
    <div className="rounded-2xl border border-borderLight bg-surfaceLight p-5">
      <div className="text-xs uppercase tracking-widest text-textSecondary font-mono">{label}</div>
      <div className={`text-2xl font-bold mt-1 ${accent ? 'text-accentGreen' : ''}`}>{value}</div>
      <div className="text-xs text-textSecondary mt-1">{sub}</div>
    </div>
  );
}

import { useMemo, useState, useEffect } from 'react';
import { AUCTION_END } from '../data/mockData.js';

const format = (n) => '₹' + n.toLocaleString('en-IN');

function useCountdown(endTime) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, endTime - now);
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { d, h, m, s };
}

export default function AuctionSection({ slots, onBid }) {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('position');
  const cd = useCountdown(AUCTION_END);

  const rows = useMemo(() => {
    let list = slots.slice();
    if (filter === 'available') list = list.filter(s => s.status === 'available');
    if (filter === 'live')      list = list.filter(s => s.status === 'live');
    if (filter === 'sold')      list = list.filter(s => s.status === 'sold');
    if (sort === 'highest')     list.sort((a, b) => b.currentBid - a.currentBid);
    if (sort === 'lowest')      list.sort((a, b) => a.currentBid - b.currentBid);
    if (sort === 'popular')     list.sort((a, b) => b.bidders - a.bidders);
    if (sort === 'position')    list.sort((a, b) => a.id - b.id);
    return list;
  }, [slots, filter, sort]);

  return (
    <section id="auction" className="border-b border-white/5 bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-3">
              Section 05 · The marketplace
            </div>
            <h2 className="display text-[44px] md:text-[72px] leading-[1] tracking-tightest">
              The auction, live.
            </h2>
            <p className="mt-4 text-soft max-w-[52ch]">
              There are only a limited number of spots on this laptop. Once they're
              gone, they're gone.
            </p>
          </div>
          <div className="flex items-end gap-3 sm:gap-4">
            <CountBox label="Days" value={cd.d} />
            <span className="text-muted font-mono text-3xl mb-1.5">:</span>
            <CountBox label="Hrs" value={cd.h} />
            <span className="text-muted font-mono text-3xl mb-1.5">:</span>
            <CountBox label="Min" value={cd.m} />
            <span className="text-muted font-mono text-3xl mb-1.5">:</span>
            <CountBox label="Sec" value={cd.s} live />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex gap-1 rounded-lg border border-white/5 bg-panel p-1">
            {[
              ['all', 'All spots'],
              ['available', 'Available'],
              ['live', 'Live'],
              ['sold', 'Sold'],
            ].map(([k, l]) => (
              <button
                key={k}
                onClick={() => setFilter(k)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition ${
                  filter === k ? 'bg-raised text-chalk' : 'text-muted hover:text-chalk'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-muted font-mono uppercase tracking-widest">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-md border border-white/10 bg-panel px-2 py-1.5 text-chalk focus:outline-none focus:border-acid"
            >
              <option value="position">Position</option>
              <option value="highest">Highest bid</option>
              <option value="lowest">Lowest bid</option>
              <option value="popular">Most popular</option>
            </select>
          </div>
        </div>

        <div className="rounded-2xl border border-white/5 bg-panel/50 overflow-hidden">
          <div className="hidden md:grid grid-cols-[70px_1fr_140px_120px_170px_100px_120px] px-5 py-3 text-[10px] uppercase tracking-widest text-muted font-mono border-b border-white/5">
            <div>Pos.</div>
            <div>Spot</div>
            <div>Current bid</div>
            <div>Bidders</div>
            <div>Time left</div>
            <div>Status</div>
            <div className="text-right">Action</div>
          </div>
          {rows.length === 0 ? (
            <div className="p-10 text-center text-muted text-sm">
              Nothing here. Try a different filter.
            </div>
          ) : (
            rows.map(slot => (
              <AuctionRow key={slot.id} slot={slot} onBid={onBid} cd={cd} />
            ))
          )}
        </div>

        <div className="mt-6 text-[10px] text-muted font-mono uppercase tracking-widest">
          Demo timings. Real auction opens when there's a real auction to open.
        </div>
      </div>
    </section>
  );
}

function CountBox({ label, value, live }) {
  return (
    <div className="text-center">
      <div
        className={`mono text-3xl md:text-4xl tabular-nums leading-none ${
          live ? 'text-acid' : 'text-chalk'
        }`}
      >
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-[10px] uppercase tracking-widest text-muted mt-1.5">{label}</div>
    </div>
  );
}

function AuctionRow({ slot, onBid, cd }) {
  const status = slot.status;
  return (
    <div className="grid grid-cols-2 md:grid-cols-[70px_1fr_140px_120px_170px_100px_120px] px-5 py-4 items-center border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition text-sm">
      <div className="mono text-muted">#{String(slot.id).padStart(2, '0')}</div>
      <div>
        <div className="text-chalk">{slot.label}</div>
        <div className="text-[11px] text-muted mt-0.5 md:hidden">
          {status === 'sold' ? `Sold to ${slot.sponsor?.name}` : `${format(slot.currentBid)} · ${slot.bidders} bidders`}
        </div>
      </div>
      <div className="hidden md:block mono">{format(slot.currentBid)}</div>
      <div className="hidden md:block mono text-soft">{slot.bidders}</div>
      <div className="hidden md:block mono text-soft tabular-nums">
        {status === 'sold'
          ? '—'
          : `${String(cd.d).padStart(2,'0')}d ${String(cd.h).padStart(2,'0')}:${String(cd.m).padStart(2,'0')}:${String(cd.s).padStart(2,'0')}`}
      </div>
      <div className="hidden md:block">
        {status === 'live' && (
          <span className="inline-flex items-center gap-1.5 text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-live animate-pulseDot" /> Live
          </span>
        )}
        {status === 'sold' && <span className="text-xs text-muted">Sold</span>}
        {status === 'available' && <span className="text-xs text-soft">Open</span>}
      </div>
      <div className="text-right col-span-2 md:col-span-1 mt-3 md:mt-0">
        {status === 'sold' ? (
          <span className="text-xs text-muted">{slot.sponsor?.name}</span>
        ) : (
          <button
            onClick={() => onBid(slot)}
            className="rounded-md border border-white/10 hover:border-acid hover:text-acid text-chalk px-3 py-1.5 text-xs font-semibold transition"
          >
            Bid
          </button>
        )}
      </div>
    </div>
  );
}

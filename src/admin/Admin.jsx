import { useState, useEffect, useCallback } from 'react';
import { supabase, supabaseReady } from '../lib/supabase.js';

const format = (n) => '₹' + Number(n).toLocaleString('en-IN');

function timeAgo(iso) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

function LoginGate({ onLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (err) { setError(err.message); return; }
    onLoggedIn();
  };

  return (
    <div className="min-h-screen bg-bgLight flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm bg-surfaceLight rounded-2xl border border-borderLight p-8 shadow-sm">
        <div className="text-xs uppercase tracking-widest text-textSecondary font-mono mb-2">brandonmyasus.in</div>
        <h1 className="text-2xl font-bold mb-6">Admin login</h1>
        <label className="block mb-4">
          <div className="text-sm font-semibold mb-1.5">Email</div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-borderLight bg-bgLight px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accentBlue"
            autoFocus
            required
          />
        </label>
        <label className="block mb-6">
          <div className="text-sm font-semibold mb-1.5">Password</div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-borderLight bg-bgLight px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accentBlue"
            required
          />
        </label>
        {error && (
          <div className="mb-4 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-accentBlue text-surfaceLight py-3 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
        <p className="mt-4 text-xs text-textSecondary text-center">
          Create your login in Supabase → Authentication → Users → Add user.
        </p>
      </form>
    </div>
  );
}

function BidCard({ bid, onConfirm, onReject, busy }) {
  return (
    <div className="bg-surfaceLight rounded-2xl border border-borderLight p-5 flex gap-4">
      <img
        src={bid.logo_url}
        alt={bid.brand_name}
        className="w-16 h-16 rounded-lg object-contain bg-bgLight border border-borderLight shrink-0"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <div className="font-bold text-lg">{bid.brand_name}</div>
            <div className="text-sm text-textSecondary font-mono">{bid.email}</div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold text-accentGreen">{format(bid.amount)}</div>
            <div className="text-xs text-textSecondary">{timeAgo(bid.created_at)}</div>
          </div>
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-textSecondary">
          <span>Slot #{bid.slot_id}</span>
          {bid.utr && <span>UTR: <span className="font-mono">{bid.utr}</span></span>}
          <span className={
            bid.status === 'confirmed' ? 'text-accentGreen font-semibold' :
            bid.status === 'rejected' ? 'text-red-500 font-semibold' :
            'text-yellow-600 font-semibold'
          }>
            {bid.status}
          </span>
        </div>

        {bid.status === 'pending' && (
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => onConfirm(bid)}
              disabled={busy}
              className="rounded-full bg-accentGreen text-white px-4 py-1.5 text-xs font-semibold hover:opacity-90 transition disabled:opacity-50"
            >
              ✓ Confirm payment
            </button>
            <button
              onClick={() => onReject(bid)}
              disabled={busy}
              className="rounded-full border border-borderLight px-4 py-1.5 text-xs font-semibold hover:border-red-400 hover:text-red-500 transition disabled:opacity-50"
            >
              Reject
            </button>
            <a
              href={bid.logo_url}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-borderLight px-4 py-1.5 text-xs font-semibold hover:border-accentBlue transition"
            >
              View full logo
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(undefined); // undefined = loading
  const [bids, setBids] = useState([]);
  const [loadingBids, setLoadingBids] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [filter, setFilter] = useState('pending');

  useEffect(() => {
    if (!supabaseReady) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_evt, sess) => setSession(sess));
    return () => sub.subscription.unsubscribe();
  }, []);

  const loadBids = useCallback(async () => {
    if (!session) return;
    setLoadingBids(true);
    const { data } = await supabase.from('bids').select('*').order('created_at', { ascending: false });
    setBids(data || []);
    setLoadingBids(false);
  }, [session]);

  useEffect(() => { loadBids(); }, [loadBids]);

  const updateStatus = async (bid, status) => {
    setBusyId(bid.id);
    await supabase.from('bids').update({ status }).eq('id', bid.id);
    await loadBids();
    setBusyId(null);
  };

  if (!supabaseReady) {
    return (
      <div className="min-h-screen bg-bgLight flex items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-3">Backend not configured</h1>
          <p className="text-textSecondary text-sm">
            Set <code className="bg-borderLight px-1 rounded">VITE_SUPABASE_URL</code> and{' '}
            <code className="bg-borderLight px-1 rounded">VITE_SUPABASE_ANON_KEY</code> in your{' '}
            <code className="bg-borderLight px-1 rounded">.env</code> file, then restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  if (session === undefined) {
    return <div className="min-h-screen bg-bgLight flex items-center justify-center text-textSecondary">Loading…</div>;
  }

  if (!session) {
    return <LoginGate onLoggedIn={() => {}} />;
  }

  const filtered = bids.filter((b) => filter === 'all' || b.status === filter);
  const pendingCount = bids.filter((b) => b.status === 'pending').length;

  return (
    <div className="min-h-screen bg-bgLight">
      <header className="border-b border-borderLight bg-surfaceLight sticky top-0 z-10">
        <div className="max-w-[900px] mx-auto px-6 h-16 flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-textSecondary font-mono">brandonmyasus.in</div>
            <div className="font-bold">Bid admin</div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-textSecondary">{session.user.email}</span>
            <button
              onClick={() => supabase.auth.signOut()}
              className="text-xs font-semibold text-textSecondary hover:text-textPrimary"
            >
              Log out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-[900px] mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex gap-1 rounded-lg border border-borderLight bg-surfaceLight p-1">
            {['pending', 'confirmed', 'rejected', 'all'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold capitalize transition ${
                  filter === f ? 'bg-accentBlue text-white' : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                {f} {f === 'pending' && pendingCount > 0 && `(${pendingCount})`}
              </button>
            ))}
          </div>
          <button
            onClick={loadBids}
            className="text-xs font-semibold text-accentBlue hover:underline"
          >
            ↻ Refresh
          </button>
        </div>

        {loadingBids ? (
          <div className="text-textSecondary text-sm">Loading bids…</div>
        ) : filtered.length === 0 ? (
          <div className="text-textSecondary text-sm bg-surfaceLight border border-borderLight rounded-2xl p-10 text-center">
            No {filter === 'all' ? '' : filter} bids yet.
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((bid) => (
              <BidCard
                key={bid.id}
                bid={bid}
                busy={busyId === bid.id}
                onConfirm={(b) => updateStatus(b, 'confirmed')}
                onReject={(b) => updateStatus(b, 'rejected')}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

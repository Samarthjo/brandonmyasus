import { useState, useMemo, useCallback, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import LogoGrid from './components/LogoGrid.jsx';
import FinalLook from './components/FinalLook.jsx';
import SocialProofBanner from './components/SocialProofBanner.jsx';
import AuctionTable from './components/AuctionTable.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import Pricing from './components/Pricing.jsx';
import FAQ from './components/FAQ.jsx';
import CTACard from './components/CTACard.jsx';
import AboutSamarth from './components/AboutSamarth.jsx';
import Footer from './components/Footer.jsx';
import BidModal from './components/BidModal.jsx';
import { INITIAL_SLOTS, GOAL_AMOUNT, STARTING_BID } from './data/mockData.js';
import { supabase, supabaseReady } from './lib/supabase.js';

// Base geometry/labels for the 7 lid positions. When the backend is
// configured, real bid data (from Supabase) overrides sponsor/bid
// info per slot; the mock sponsor fills used for local design preview
// are dropped so a freshly-launched site starts empty and honest.
const BASE_SLOTS = INITIAL_SLOTS.map((s) => ({
  ...s,
  ...(supabaseReady ? { sponsor: null, currentBid: STARTING_BID, bidders: 0 } : {}),
}));

function mergeBidsIntoSlots(baseSlots, bids) {
  const bySlot = new Map();
  for (const bid of bids) {
    const list = bySlot.get(bid.slot_id) || [];
    list.push(bid);
    bySlot.set(bid.slot_id, list);
  }

  return baseSlots.map((slot) => {
    const slotBids = bySlot.get(slot.id);
    if (!slotBids || slotBids.length === 0) return slot;

    const topBid = slotBids.reduce((a, b) => (b.amount > a.amount ? b : a));
    const confirmed = slotBids
      .filter((b) => b.status === 'confirmed')
      .reduce((a, b) => (!a || b.amount > a.amount ? b : a), null);

    return {
      ...slot,
      currentBid: topBid.amount,
      bidders: slotBids.length,
      sponsor: confirmed
        ? { name: confirmed.brand_name, logoUrl: confirmed.logo_url }
        : slot.sponsor,
    };
  });
}

export default function App() {
  const [slots, setSlots] = useState(BASE_SLOTS);
  const [bidTarget, setBidTarget] = useState(null);

  const refreshFromBackend = useCallback(async () => {
    if (!supabaseReady) return;
    const { data } = await supabase
      .from('bids')
      .select('*')
      .in('status', ['pending', 'confirmed']);
    setSlots(mergeBidsIntoSlots(BASE_SLOTS, data || []));
  }, []);

  useEffect(() => {
    refreshFromBackend();
  }, [refreshFromBackend]);

  const stats = useMemo(() => {
    const totalRaised = slots.reduce((s, x) => s + (x.bidders > 0 ? x.currentBid : 0), 0);
    const claimed = slots.filter((x) => x.sponsor).length;
    const percentFunded = Math.min(100, Math.round((totalRaised / GOAL_AMOUNT) * 100));
    return {
      totalRaised,
      claimed,
      spotsTotal: slots.length,
      percentFunded,
      goalAmount: GOAL_AMOUNT,
    };
  }, [slots]);

  const handleBidSubmitted = useCallback(() => {
    // Bid is now safely in Supabase as 'pending'. Refresh so the
    // auction table / bid counts reflect it immediately (sponsor logo
    // on the lid only appears once Samarth confirms it in /admin).
    refreshFromBackend();
  }, [refreshFromBackend]);

  return (
    <div className="min-h-screen bg-bgLight text-textPrimary">
      <Navbar />
      <Hero stats={stats} />
      <LogoGrid slots={slots} onBid={setBidTarget} />
      <FinalLook slots={slots} />
      <SocialProofBanner />
      <Pricing stats={stats} />
      <AuctionTable slots={slots} stats={stats} onBid={setBidTarget} />
      <HowItWorks />
      <FAQ />
      <CTACard />
      <AboutSamarth />
      <Footer />

      {bidTarget && (
        <BidModal
          slot={bidTarget}
          onClose={() => setBidTarget(null)}
          onSubmitPayment={handleBidSubmitted}
        />
      )}
    </div>
  );
}

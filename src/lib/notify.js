// Fires a plain POST to a Formspree endpoint so Samarth gets an email
// the instant someone submits a bid. This is best-effort — if it fails
// or isn't configured, the bid is still safely stored in Supabase and
// visible on /admin, so nothing is lost.
const FORMSPREE_ENDPOINT = import.meta.env.VITE_FORMSPREE_ENDPOINT;

export async function notifyNewBid({ slotLabel, slotId, brandName, email, amount, utr }) {
  if (!FORMSPREE_ENDPOINT) return;
  try {
    await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        subject: `New bid: ₹${amount} on ${slotLabel} (Slot #${slotId})`,
        brandName,
        email,
        amount,
        slotId,
        slotLabel,
        utr: utr || '(not provided)',
        message: `${brandName} bid ₹${amount} on ${slotLabel} (Slot #${slotId}). Bidder email: ${email}. Go confirm it at /admin once the UPI payment lands.`,
      }),
    });
  } catch {
    // Silent — the bid itself already made it into Supabase.
  }
}

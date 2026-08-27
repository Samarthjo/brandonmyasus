import { useState, useEffect, useRef } from 'react';
import { supabase, supabaseReady } from '../lib/supabase.js';
import { notifyNewBid } from '../lib/notify.js';

const format = (n) => '₹' + Number(n).toLocaleString('en-IN');
const STARTING_BID = 800;
const MIN_INCREMENT = 200;
const UPI_ID = 'samarth.joshi2004@okhdfcbank';
const UPI_LINK = `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent('Samarth Joshi')}&cu=INR`;
const QR_SRC = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&margin=8&data=${encodeURIComponent(UPI_LINK)}`;

export default function BidModal({ slot, onClose, onSubmitPayment }) {
  const minNext = slot.bidders > 0 ? slot.currentBid + MIN_INCREMENT : STARTING_BID;
  const [stage, setStage] = useState('bid'); // bid | payment | confirmed
  const [amountStr, setAmountStr] = useState(String(minNext));
  const [bidError, setBidError] = useState('');
  const [amount, setAmount] = useState(minNext);

  const [brandName, setBrandName] = useState('');
  const [email, setEmail] = useState('');
  const [utr, setUtr] = useState('');
  const [logoFile, setLogoFile] = useState(null);
  const [logoDataUrl, setLogoDataUrl] = useState('');
  const [logoName, setLogoName] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const submitBid = (e) => {
    e.preventDefault();
    const n = Number(amountStr);
    if (!amountStr || Number.isNaN(n)) { setBidError('Enter a valid number.'); return; }
    if (n < minNext) { setBidError(`Minimum bid is ${format(minNext)}.`); return; }
    setBidError('');
    setAmount(n);
    setStage('payment');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setPaymentError('Logo file too large (5 MB max).');
      return;
    }
    setLogoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setLogoDataUrl(reader.result);
      setLogoName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const submitPayment = async (e) => {
    e.preventDefault();
    if (!brandName.trim()) { setPaymentError('Add your brand name.'); return; }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) { setPaymentError('Enter a valid email.'); return; }
    if (!logoFile) { setPaymentError('Upload your logo image.'); return; }

    if (!supabaseReady) {
      setPaymentError('Backend not configured yet. Ask the site owner to set VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY.');
      return;
    }

    setPaymentError('');
    setSubmitting(true);

    try {
      const ext = logoFile.name.split('.').pop() || 'png';
      const path = `slot-${slot.id}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from('logos')
        .upload(path, logoFile, { contentType: logoFile.type });
      if (uploadError) throw uploadError;

      const { data: pub } = supabase.storage.from('logos').getPublicUrl(path);
      const logoUrl = pub?.publicUrl || '';

      const { error: insertError } = await supabase.from('bids').insert({
        slot_id: slot.id,
        brand_name: brandName.trim(),
        email: email.trim(),
        amount,
        utr: utr.trim() || null,
        logo_url: logoUrl,
        status: 'pending',
      });
      if (insertError) throw insertError;

      notifyNewBid({
        slotLabel: slot.label,
        slotId: slot.id,
        brandName: brandName.trim(),
        email: email.trim(),
        amount,
        utr: utr.trim(),
      });

      onSubmitPayment?.({ slotId: slot.id, amount, email: email.trim(), brandName: brandName.trim(), logoUrl, utr: utr.trim() });
      setStage('confirmed');
    } catch (err) {
      setPaymentError(err.message || 'Something went wrong submitting your bid. Try again, or email samarth.joshi2004@gmail.com directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const copyUpi = async () => {
    try {
      await navigator.clipboard.writeText(UPI_ID);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm p-4 flex items-center justify-center overflow-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="w-full max-w-2xl rounded-3xl bg-surfaceLight shadow-2xl overflow-hidden max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 border-b border-borderLight sticky top-0 bg-surfaceLight z-10">
          <div>
            <div className="text-xs uppercase tracking-widest text-textSecondary font-mono">
              {stage === 'bid' && 'Step 1 · Place bid'}
              {stage === 'payment' && 'Step 2 · Payment'}
              {stage === 'confirmed' && 'Done'}
            </div>
            <h3 className="text-2xl font-bold mt-1">{slot.label} · Slot #{slot.id}</h3>
            <div className="text-sm text-textSecondary mt-0.5">
              {slot.sizeMm} mm · Current bid {format(slot.currentBid)}
              {slot.bidders > 0 && ` · ${slot.bidders} bidder${slot.bidders === 1 ? '' : 's'}`}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-textSecondary hover:text-textPrimary text-3xl leading-none"
            aria-label="Close"
          >×</button>
        </div>

        <div className="p-6">
          {stage === 'bid' && (
            <form onSubmit={submitBid}>
              <label className="block mb-4">
                <div className="text-sm font-semibold mb-2">Your bid (INR)</div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textSecondary font-mono">₹</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={amountStr}
                    onChange={(e) => {
                      const v = e.target.value.replace(/[^\d]/g, '');
                      setAmountStr(v);
                      if (bidError) setBidError('');
                    }}
                    className="w-full rounded-xl border border-borderLight bg-bgLight px-4 py-3 pl-8 text-lg font-mono text-textPrimary focus:outline-none focus:ring-2 focus:ring-accentBlue"
                    autoFocus
                    placeholder={String(minNext)}
                  />
                </div>
                <div className="mt-2 text-xs text-textSecondary flex items-center justify-between">
                  <span>Minimum bid: <span className="font-semibold text-textPrimary">{format(minNext)}</span></span>
                  <span className="text-textSecondary">Starting price ₹800 · Increment ₹200</span>
                </div>
              </label>

              <div className="flex flex-wrap gap-2 mb-4">
                {[minNext, minNext + 200, minNext + 500, minNext + 1000].map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setAmountStr(String(v))}
                    className="rounded-full border border-borderLight px-3 py-1 text-xs font-semibold hover:border-accentBlue hover:text-accentBlue transition"
                  >
                    {format(v)}
                  </button>
                ))}
              </div>

              {bidError && (
                <div className="mb-4 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
                  {bidError}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-full border border-borderLight py-3 text-sm font-semibold hover:bg-bgLight transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-accentBlue text-surfaceLight py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  Continue to payment →
                </button>
              </div>
            </form>
          )}

          {stage === 'payment' && (
            <form onSubmit={submitPayment}>
              <div className="grid md:grid-cols-[280px_1fr] gap-6">
                <div>
                  <div className="rounded-2xl border border-borderLight bg-bgLight p-4 flex flex-col items-center">
                    <img
                      src={QR_SRC}
                      alt="Scan to pay with any UPI app"
                      className="w-full max-w-[220px] rounded-lg bg-white"
                    />
                    <div className="mt-3 text-center">
                      <div className="text-xs uppercase tracking-widest text-textSecondary font-mono mb-1">Amount</div>
                      <div className="text-2xl font-bold text-accentGreen">{format(amount)}</div>
                    </div>
                    <button
                      type="button"
                      onClick={copyUpi}
                      className="mt-3 w-full rounded-full border border-borderLight px-3 py-2 text-xs font-semibold hover:border-accentBlue transition flex items-center justify-center gap-2"
                    >
                      <span className="font-mono truncate">{UPI_ID}</span>
                      <span className="text-accentBlue text-[10px] shrink-0">{copied ? '✓ COPIED' : 'COPY'}</span>
                    </button>
                    <a
                      href={UPI_LINK}
                      className="mt-2 w-full rounded-full bg-textPrimary text-surfaceLight px-3 py-2 text-xs font-semibold text-center hover:bg-accentBlue transition"
                    >
                      Open UPI app
                    </a>
                    <p className="mt-3 text-[10px] text-textSecondary text-center leading-relaxed">
                      Scan with any UPI app. Pay {format(amount)} to samarth.joshi2004@okhdfcbank.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block">
                    <div className="text-sm font-semibold mb-1.5">Brand name</div>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g. Acme Inc."
                      className="w-full rounded-xl border border-borderLight bg-bgLight px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accentBlue"
                      required
                    />
                  </label>
                  <label className="block">
                    <div className="text-sm font-semibold mb-1.5">Your email</div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-borderLight bg-bgLight px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accentBlue"
                      required
                    />
                  </label>
                  <label className="block">
                    <div className="text-sm font-semibold mb-1.5">Logo image</div>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/png,image/jpeg,image/svg+xml,image/webp"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => fileRef.current?.click()}
                        className="rounded-full border border-borderLight px-4 py-2 text-sm font-semibold hover:border-accentBlue transition"
                      >
                        {logoDataUrl ? 'Change file' : 'Upload logo'}
                      </button>
                      {logoDataUrl && (
                        <div className="flex items-center gap-2 min-w-0">
                          <img src={logoDataUrl} alt="preview" className="w-8 h-8 rounded object-contain bg-bgLight border border-borderLight" />
                          <span className="text-xs text-textSecondary truncate">{logoName}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-[10px] text-textSecondary mt-1.5">PNG, JPG, SVG, or WEBP. Max 5 MB.</div>
                  </label>
                  <label className="block">
                    <div className="text-sm font-semibold mb-1.5">UPI reference (UTR) — optional</div>
                    <input
                      type="text"
                      value={utr}
                      onChange={(e) => setUtr(e.target.value)}
                      placeholder="Transaction reference from your UPI app"
                      className="w-full rounded-xl border border-borderLight bg-bgLight px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accentBlue"
                    />
                  </label>
                </div>
              </div>

              {paymentError && (
                <div className="mt-4 rounded-lg border border-red-300 bg-red-50 text-red-700 text-sm px-4 py-3">
                  {paymentError}
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStage('bid')}
                  disabled={submitting}
                  className="rounded-full border border-borderLight px-6 py-3 text-sm font-semibold hover:bg-bgLight transition disabled:opacity-50"
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 rounded-full bg-accentBlue text-surfaceLight py-3 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                  {submitting ? 'Submitting…' : "I've paid — notify Samarth"}
                </button>
              </div>
              <p className="mt-3 text-xs text-textSecondary text-center">
                Your bid is <strong>pending</strong> until I manually verify the UPI payment.
              </p>
            </form>
          )}

          {stage === 'confirmed' && (
            <div className="text-center py-6">
              <div className="w-14 h-14 rounded-full bg-accentGreen/15 text-accentGreen flex items-center justify-center mx-auto mb-4 text-3xl">
                ✓
              </div>
              <h4 className="text-2xl font-bold mb-2">Bid submitted for review.</h4>
              <p className="text-textSecondary mb-6 max-w-md mx-auto">
                Thanks! Your bid of <strong>{format(amount)}</strong> on {slot.label} is submitted.
                I'll verify the UPI payment and put <strong>{brandName}</strong> on the lid within 24 hours.
                Confirmation will be sent to <span className="font-mono text-textPrimary">{email}</span>.
              </p>
              <div className="grid gap-2 text-sm text-textSecondary mb-6 max-w-sm mx-auto text-left">
                <div className="flex justify-between border-b border-borderLight pb-2">
                  <span>Slot</span><span className="font-semibold text-textPrimary">#{slot.id} {slot.label}</span>
                </div>
                <div className="flex justify-between border-b border-borderLight pb-2">
                  <span>Amount</span><span className="font-semibold text-textPrimary">{format(amount)}</span>
                </div>
                <div className="flex justify-between border-b border-borderLight pb-2">
                  <span>Brand</span><span className="font-semibold text-textPrimary">{brandName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-semibold text-yellow-600">Payment pending verification</span>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full bg-accentBlue text-surfaceLight px-8 py-3 font-semibold hover:opacity-90 transition"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

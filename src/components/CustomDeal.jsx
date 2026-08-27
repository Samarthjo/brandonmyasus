import { useState } from 'react';

export default function CustomDeal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    offer: '',
    message: '',
  });
  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <section className="border-b border-white/5 bg-surface">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-20 md:py-28">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-3">
              Section 12 · Custom deal
            </div>
            <h2 className="display text-[36px] md:text-[56px] leading-[1] tracking-tightest">
              Want something bigger?
            </h2>
            <div className="mt-5 text-soft leading-relaxed max-w-[48ch]">
              <p>If you're thinking:</p>
              <p className="mt-3 text-chalk font-display text-xl md:text-2xl">
                "Can I just buy the whole damn thing?"
              </p>
              <p className="mt-3">Probably. Send me an offer.</p>
            </div>
            <button
              onClick={() => setOpen(!open)}
              className="mt-8 rounded-md border border-white/10 hover:border-acid hover:text-acid px-5 py-3 font-semibold text-sm transition"
            >
              {open ? 'Close' : 'Make an offer →'}
            </button>
          </div>

          {open && (
            submitted ? (
              <div className="rounded-2xl border border-acid/30 bg-acid/5 p-6">
                <div className="font-display text-2xl">Noted.</div>
                <p className="mt-2 text-soft">
                  I'll get back to you at <span className="mono text-chalk">{form.email}</span>.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                className="rounded-2xl border border-white/5 bg-panel p-6 grid grid-cols-2 gap-3"
              >
                <FieldC label="Name"    value={form.name}    onChange={upd('name')}    required />
                <FieldC label="Company" value={form.company} onChange={upd('company')} required />
                <FieldC label="Email"   type="email" value={form.email} onChange={upd('email')} required span={2} />
                <FieldC label="Offer"   value={form.offer}   onChange={upd('offer')}   placeholder="₹" span={2} />
                <label className="col-span-2 block">
                  <div className="text-[10px] uppercase tracking-widest text-muted font-mono mb-1.5">
                    Message
                  </div>
                  <textarea
                    value={form.message}
                    onChange={upd('message')}
                    rows={3}
                    className="w-full rounded-md border border-white/10 bg-ink px-3 py-2.5 text-sm text-chalk placeholder:text-muted/60 focus:outline-none focus:border-acid resize-none"
                    placeholder="What do you want?"
                  />
                </label>
                <div className="col-span-2">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-acid text-ink py-3 font-semibold text-sm hover:bg-acid/90 transition"
                  >
                    Send offer →
                  </button>
                </div>
              </form>
            )
          )}
        </div>
      </div>
    </section>
  );
}

function FieldC({ label, value, onChange, type = 'text', required, placeholder, span = 1 }) {
  return (
    <label className={`block ${span === 2 ? 'col-span-2' : ''}`}>
      <div className="text-[10px] uppercase tracking-widest text-muted font-mono mb-1.5">{label}</div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-white/10 bg-ink px-3 py-2.5 text-sm text-chalk placeholder:text-muted/60 focus:outline-none focus:border-acid transition"
      />
    </label>
  );
}

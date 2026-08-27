import { useState } from 'react';

export default function BigCTA({ stats }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company: '',
    email: '',
    website: '',
    spot: '',
    budget: '',
  });

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="bid" className="border-b border-white/5 bg-ink">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-24 md:py-32">
        <div className="rounded-3xl border border-white/5 bg-panel p-6 md:p-14 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-[400px] w-[400px] rounded-full bg-acid/5 blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 md:gap-14 items-start relative">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted font-mono mb-4">
                Section 11 · Take the spot
              </div>
              <h2 className="display text-[36px] md:text-[60px] leading-[1] tracking-tightest">
                Want to put your logo on my laptop?
              </h2>
              <p className="mt-6 text-soft leading-relaxed max-w-[46ch]">
                Pick a spot. Place a bid. Become part of the world's most
                unnecessarily branded laptop.
              </p>
              <p className="mt-4 text-xs text-muted max-w-[46ch]">
                I'll get back to you with availability and next steps.
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                <Stat label="Total spots" value={String(stats.spotsTotal)} />
                <Stat label="Sold" value={String(stats.sold)} />
                <Stat label="Cities visited weekly" value="~3" />
              </div>
            </div>

            {submitted ? (
              <div className="rounded-2xl border border-acid/30 bg-acid/5 p-8">
                <div className="font-display text-3xl">You're in.</div>
                <p className="mt-3 text-soft">
                  I have your interest for{' '}
                  <span className="text-chalk">{form.spot || 'a spot'}</span>. I'll follow up at{' '}
                  <span className="text-chalk mono">{form.email || 'your inbox'}</span>{' '}
                  within a day or so.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-sm text-acid hover:underline"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="grid grid-cols-2 gap-3">
                <Field label="Name"    value={form.name}    onChange={upd('name')}    required />
                <Field label="Company" value={form.company} onChange={upd('company')} required />
                <Field label="Email"   type="email" value={form.email} onChange={upd('email')} required />
                <Field label="Website" value={form.website} onChange={upd('website')} />
                <Field label="Preferred spot" value={form.spot} onChange={upd('spot')} placeholder="e.g. Slot 06" />
                <Field label="Budget"  value={form.budget} onChange={upd('budget')} placeholder="₹" />
                <div className="col-span-2 mt-3">
                  <button
                    type="submit"
                    className="w-full rounded-md bg-acid text-ink py-3 font-semibold text-sm hover:bg-acid/90 transition"
                  >
                    I want a spot →
                  </button>
                </div>
                <div className="col-span-2 text-[10px] text-muted text-center mt-1">
                  Demo form. No emails go anywhere yet.
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type = 'text', required, placeholder }) {
  return (
    <label className="block">
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

function Stat({ label, value }) {
  return (
    <div>
      <div className="mono text-3xl">{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted mt-1">{label}</div>
    </div>
  );
}

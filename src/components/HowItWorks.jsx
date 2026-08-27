export default function HowItWorks() {
  const steps = [
    {
      n: 1,
      title: 'Place a bid',
      body: 'Pick a sticker spot on the lid. Minimum bid ₹800. Bid higher than the current top offer to outbid it.',
    },
    {
      n: 2,
      title: 'Pay via UPI',
      body: "Scan the QR or pay to samarth.joshi2004@okhdfcbank. Upload your logo and email. I'll get the notification.",
    },
    {
      n: 3,
      title: 'I verify → your logo goes live',
      body: 'I manually confirm the payment within 24 hours. Your logo appears on the site and the sticker goes on the physical laptop.',
    },
  ];

  return (
    <section id="how" className="py-[100px] max-w-[1200px] mx-auto px-6">
      <div className="mb-14">
        <div className="text-xs uppercase tracking-widest text-textSecondary mb-3 font-mono">
          The mechanic
        </div>
        <h2 className="text-4xl font-bold">How it works</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div
            key={s.n}
            className="bg-surfaceLight rounded-3xl p-8 border border-borderLight hover:border-accentBlue transition group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accentBlue text-surfaceLight font-bold text-lg mb-6 group-hover:scale-110 transition">
              {s.n}
            </div>
            <h3 className="font-bold text-xl mb-3">{s.title}</h3>
            <p className="text-textSecondary leading-relaxed text-sm">{s.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-textSecondary">
        Because I verify each payment manually, expect a short delay before your logo shows up.
      </p>
    </section>
  );
}

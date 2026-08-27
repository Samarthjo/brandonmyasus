import { useState } from 'react';

const FAQS = [
  { q: 'Is this actually a real ASUS?', a: 'Yes. ASUS TUF Gaming F15. I bought it. I actually use it. Fans and all.' },
  { q: 'Do the fans really get that loud?', a: "Yes. Not jet-engine loud, but noticeably loud. When it kicks in, heads turn. That's the whole product." },
  { q: "What's the minimum bid?", a: '₹800 for any open sticker slot. Each subsequent bid on the same slot must be at least ₹200 higher.' },
  { q: 'How does payment work?', a: "You pay via UPI to samarth.joshi2004@okhdfcbank. I verify the payment manually and only then does your logo go up on the site and on the physical laptop." },
  { q: "How do I know my payment went through?", a: "You'll get a confirmation email at the address you provided during bidding. I aim to verify within 24 hours." },
  { q: 'Where will you actually take this laptop?', a: 'Bengaluru cafés — mostly Koramangala and Indiranagar. Also client meetings, flights, trains. Basically everywhere I go.' },
  { q: 'How long does my sticker stay on?', a: 'Six months minimum from placement. Renewable if you want to stay longer.' },
  { q: 'Can I pick the exact spot?', a: 'Yes. Each of the 7 sticker positions is bid on individually. Pick the rectangle you want, bid on that one.' },
  { q: 'What happens if someone outbids me?', a: 'You get outbid. You can bid again, or move to another available sticker position.' },
  { q: 'Can I sponsor the entire lid?', a: 'Probably. Send an offer. Full-lid wraps are a separate conversation.' },
  { q: 'Why are you doing this?', a: "I want to leave my day job and try building my own thing full-time from a café. This funds two months of Bengaluru rent, coffee, and rice while I do that." },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="py-[100px] max-w-[1200px] mx-auto px-6">
      <div className="grid md:grid-cols-[1fr_1.6fr] gap-12">
        <div>
          <div className="text-xs uppercase tracking-widest text-textSecondary mb-3 font-mono">
            Questions
          </div>
          <h2 className="text-4xl font-bold leading-tight">Yes, but really?</h2>
          <p className="mt-6 text-textSecondary max-w-[380px]">
            Honest answers for anyone thinking about putting their logo on a loud gaming laptop.
          </p>
        </div>
        <div className="divide-y divide-borderLight border-t border-b border-borderLight">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <button
                key={i}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full text-left py-5 group"
                aria-expanded={isOpen}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className={`font-semibold text-lg transition ${isOpen ? 'text-accentBlue' : 'text-textPrimary group-hover:text-accentBlue'}`}>
                    {item.q}
                  </div>
                  <div className={`text-accentBlue text-2xl leading-none pt-1 transition-transform ${isOpen ? 'rotate-45' : ''}`}>
                    +
                  </div>
                </div>
                <div className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] mt-3' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden text-textSecondary leading-relaxed text-sm">
                    {item.a}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

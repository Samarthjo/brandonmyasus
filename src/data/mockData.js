export const GOAL_AMOUNT = 180000;
export const STARTING_BID = 800;
export const MIN_INCREMENT = 200;

export const AUCTION_END = Date.now() + 3 * 86400000 + 41 * 60000 + 12000;

export const INITIAL_SLOTS = [
  { id: 1, label: 'Top Left',      sizeMm: '110 × 110', visibility: 'high',   status: 'live',      currentBid: 2600, bidders: 4, sponsor: { name: 'Emergent',  brandKey: 'emergent'  } },
  { id: 2, label: 'Top Right',     sizeMm: '110 × 110', visibility: 'high',   status: 'live',      currentBid: 1800, bidders: 2, sponsor: { name: 'Sarvam AI', brandKey: 'sarvam'    } },
  { id: 3, label: 'Middle Left',   sizeMm: '90 × 90',   visibility: 'medium', status: 'available', currentBid:  800, bidders: 0, sponsor: null },
  { id: 4, label: 'Middle Right',  sizeMm: '90 × 90',   visibility: 'medium', status: 'available', currentBid:  800, bidders: 0, sponsor: null },
  { id: 5, label: 'Bottom Left',   sizeMm: '110 × 110', visibility: 'medium', status: 'live',      currentBid: 2000, bidders: 3, sponsor: { name: 'FirstClub', brandKey: 'firstclub' } },
  { id: 6, label: 'Bottom Center', sizeMm: '110 × 110', visibility: 'medium', status: 'live',      currentBid: 1400, bidders: 1, sponsor: { name: 'Dodo Payments', brandKey: 'dodo'  } },
  { id: 7, label: 'Bottom Right',  sizeMm: '110 × 110', visibility: 'medium', status: 'live',      currentBid: 1200, bidders: 1, sponsor: { name: 'Swish',    brandKey: 'swish'     } },
];

export const FAQ_ITEMS = [
  { q: 'Is this actually a real ASUS?', a: 'Yes. ASUS TUF Gaming F15. I bought it. I actually use it. Fans and all.' },
  { q: 'Do the fans really get that loud?', a: "Yes. Not jet-engine loud, but noticeably loud. When it kicks in, heads turn. That's the whole product." },
  { q: 'Where will you actually take this laptop?', a: 'Bangalore cafés — mostly Koramangala and Indiranagar. Also client meetings, flights, trains, conferences. Basically anywhere I go, which is a lot.' },
  { q: 'How long does my sticker stay on?', a: 'Six months minimum from placement. Renewable if you want to stay longer.' },
  { q: 'Can I pick the exact spot?', a: 'Yes. Each sticker position is bid on individually. Pick the rectangle you want, bid on that one.' },
  { q: 'What happens if someone outbids me?', a: 'You get outbid. You can bid again, or pivot to another available sticker position. It is an auction.' },
  { q: 'Can I sponsor the entire lid?', a: 'Probably. Send an offer. Full-lid wraps are a separate conversation.' },
  { q: 'How does payment work?', a: 'UPI to my personal ID. I manually verify the payment on my end within 24 hours. Only then does your logo go live on the site.' },
  { q: 'Why are you doing this?', a: "Because I want to leave my day job and try building my own thing full-time from a café. This funds two months of Bengaluru rent, coffee, and rice while I do that." },
];

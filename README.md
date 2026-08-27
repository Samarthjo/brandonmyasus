# Sponsor My TUF

Interactive landing page + auction marketplace for selling advertising real estate on the lid of an ASUS TUF Gaming F15.

React + Vite + Tailwind. All data is local mock — no backend, no real bids, no payments.

## Run

```bash
cd sponsor-my-tuf
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Structure

```
src/
  App.jsx                 orchestrates state, slots, modals
  main.jsx                React entry
  index.css               Tailwind + globals
  data/mockData.js        slots, sponsors, FAQ, microcopy
  components/
    Navbar.jsx            sticky top nav
    Hero.jsx              headline + laptop side-by-side
    LaptopShowcase.jsx    interactive SVG laptop with 12 slots
    RecognitionBand.jsx   "Everyone recognises the TUF"
    MoreSpaceSection.jsx  MacBook vs TUF silhouettes
    LoudSection.jsx       "It gets loud. People look."
    MicroBand.jsx         scrolling microcopy marquee
    AuctionSection.jsx    live auction table, filter, sort, countdown
    HowItWorks.jsx        3-step mechanic
    FundingBreakdown.jsx  transparency + progress bar
    SponsorWall.jsx       grid of "sold" sponsor plaques
    WhyThisWorks.jsx      3 pillars — physical, portable, weird
    FAQ.jsx               accordion
    BigCTA.jsx            application form
    CustomDeal.jsx        "buy the whole laptop" offer form
    Footer.jsx            minimal footer
    BidModal.jsx          bid dialog with validation + share
    LogoPreviewModal.jsx  preview brand name on the lid
```

## Notes

- Laptop is drawn as SVG (no external image). Slot positions live in `mockData.js`.
- Countdown timer is frontend-only.
- Forms don't POST anywhere — success states are UI stubs.
- Sponsor logos are text placeholders. Real logos would slot in as `<image>` refs.
- Not affiliated with or endorsed by ASUS.

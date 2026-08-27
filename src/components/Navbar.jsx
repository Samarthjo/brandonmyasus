export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-surfaceLight/95 backdrop-blur border-b border-borderLight z-40">
      <div className="h-full max-w-[1200px] mx-auto px-6 flex items-center justify-between">
        <a href="#top" className="font-mono font-semibold text-sm tracking-tight">
          brandmyasus<span className="text-accentBlue">.in</span>
        </a>
        <nav className="hidden md:flex gap-8 text-sm">
          <a href="#how" className="hover:text-accentBlue transition">How it works</a>
          <a href="#pricing" className="hover:text-accentBlue transition">Pricing</a>
          <a href="#faq" className="hover:text-accentBlue transition">Questions</a>
        </nav>
        <a
          href="#logos"
          className="bg-textPrimary text-surfaceLight rounded-full px-5 py-2 text-sm font-semibold hover:bg-accentBlue transition"
        >
          Bid on a spot
        </a>
      </div>
    </header>
  );
}

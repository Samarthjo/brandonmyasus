export default function Footer() {
  return (
    <footer className="border-t border-borderLight bg-bgLight py-8">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-start md:items-center gap-3 justify-between text-xs text-textSecondary">
        <div>© {new Date().getFullYear()} brandmyasus.in · Not affiliated with ASUS.</div>
        <div className="flex gap-4">
          <a
            href="https://x.com/SamarthJoshiSJ"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accentBlue transition"
          >
            @SamarthJoshiSJ
          </a>
          <a
            href="mailto:samarth.joshi2004@gmail.com"
            className="hover:text-accentBlue transition"
          >
            samarth.joshi2004@gmail.com
          </a>
        </div>
        <div>Built in a weekend · no cookies, no trackers.</div>
      </div>
    </footer>
  );
}

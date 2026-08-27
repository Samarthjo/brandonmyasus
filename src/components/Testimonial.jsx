export default function Testimonial() {
  return (
    <section className="py-[80px] max-w-[1200px] mx-auto px-6">
      <div className="text-center max-w-[720px] mx-auto">
        <div className="text-5xl text-accentBlue mb-4 leading-none">"</div>
        <p className="text-2xl md:text-3xl font-semibold mb-8 leading-tight tracking-tight">
          I heard the laptop before I saw it. Then I saw the logo. Then I remembered the brand. That's the whole marketing funnel in ten seconds.
        </p>
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accentBlue to-accentGreen" />
          <div className="text-left">
            <div className="font-bold">Sarthak M.</div>
            <div className="text-sm text-textSecondary">Café patron, definitely a real person</div>
          </div>
        </div>
      </div>
    </section>
  );
}

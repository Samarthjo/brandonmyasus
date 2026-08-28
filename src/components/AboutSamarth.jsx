export default function AboutSamarth() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 pb-12">
      <div className="bg-surfaceLight rounded-3xl border border-borderLight p-8 md:p-10 shadow-sm">
        <div className="flex items-start gap-5">
          <img
            src="/samarth.webp"
            alt="Samarth Joshi"
            className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover shrink-0 border border-borderLight shadow-sm"
            draggable={false}
          />
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-2">Hey, I'm Samarth.</h3>
            <p className="text-textSecondary leading-relaxed max-w-3xl">
              I make things on the internet from a coffee shop in Bengaluru — usually{' '}
              <span className="text-textPrimary font-medium">Koramangala</span> or{' '}
              <span className="text-textPrimary font-medium">Indiranagar</span>,
              next to a laptop that's louder than the espresso machine.{' '}
              If you want to sponsor a slot, chat about the auction, or just say hi — you'll find me on X{' '}
              <a
                href="https://x.com/SamarthJoshiSJ"
                target="_blank"
                rel="noreferrer"
                className="text-accentBlue font-medium hover:underline"
              >
                @SamarthJoshiSJ
              </a>{' '}
              or email{' '}
              <a
                href="mailto:samarth.joshi2004@gmail.com"
                className="text-accentBlue font-medium hover:underline"
              >
                samarth.joshi2004@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

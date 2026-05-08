import { useReveal } from "../hooks/useReveal";

export default function CTA() {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-8 sm:py-16 lg:py-24 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto relative rounded-3xl sm:rounded-[40px] overflow-hidden min-h-[380px] sm:min-h-[500px] flex items-center justify-center text-center">
        <img
          src="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600&auto=format&fit=crop"
          alt="Mountain Landscape"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative z-10 p-6 sm:p-8 max-w-2xl reveal">
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3 sm:mb-4">
            SMALL COMPANY
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 headline-3d">
            Ready To Start Saving With Clean Energy?
          </h2>
          <p className="text-white/80 mb-6 sm:mb-10 text-sm sm:text-base">
            We provide reliable, efficient, and affordable solar energy
            solutions designed to power Nigerian homes and communities with
            clean, sustainable energy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <a
              href="https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+setting-fairly&type=phone_number&app_absent=0"
              target="_blank"
              className="bg-primary text-black px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold w-full sm:w-auto hover:scale-105 transition-transform icon-3d text-sm sm:text-base"
            >
              Get Started
            </a>
            {/* <button className="glass-effect text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold w-full sm:w-auto hover:bg-white/20 transition-colors text-sm sm:text-base">
              WhatsApp Us
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}

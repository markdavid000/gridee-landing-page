import { useEffect, useState } from "react";

const slides = [
  {
    line1: "Prepaid Solar.",
    line2: "For Every",
    line3: "Nigerian Home.",
    sub: "Reliable solar energy managed entirely on WhatsApp and USSD. No apps. No jargon. No generator wahala.",
  },
  {
    line1: "No More",
    line2: "Generator",
    line3: "Wahala.",
    sub: "Buy energy tokens in Naira. Top up anytime via WhatsApp or by dialling *384*0#. Power on in seconds.",
  },
  {
    line1: "Landlords Earn.",
    line2: "Tenants",
    line3: "Save.",
    sub: "Landlords earn revenue share on every kWh tenants purchase. Tenants pay only for what they use.",
  },
  {
    line1: "1 GRD =",
    line2: "1 kWh of",
    line3: "Clean Power.",
    sub: "Every token purchase is transparent, on-chain, and instant. No hidden fees. No flat rates. Just energy.",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setCurrent((c) => (c + 1) % slides.length);
        setAnimating(false);
      }, 600);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-12 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&auto=format&fit=crop"
          alt="Solar Farm"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
        {/* Ghost watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="text-white font-bold whitespace-nowrap"
            style={{
              fontSize: "clamp(48px, 12vw, 160px)",
              opacity: 0.1,
              letterSpacing: "0.3em",
            }}
          >
            SOLAR ENERGY
          </span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="text-white">
          {/* Stars */}
          <div className="flex items-center gap-2 mb-5 mt-10 sm:mt-0">
            <span className="text-primary text-sm">★★★★★</span>
            <span className="text-xs sm:text-sm font-medium text-white/90">
              Rated 4.9/5 by 10k+ Customers
            </span>
          </div>

          {/* Animated headline */}
          <div
            className="mb-6 overflow-hidden"
            style={{
              transition: "all 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <h1
              className="font-bold leading-[1.05] headline-3d"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                opacity: animating ? 0 : 1,
                transform: animating ? "translateY(-24px)" : "translateY(0)",
                transition:
                  "opacity 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {slide.line1}
              <br />
              {slide.line2}
              <br />
              <span className="italic font-light">{slide.line3}</span>
            </h1>
          </div>

          <p
            className="text-sm sm:text-base lg:text-lg text-white/80 max-w-lg mb-8"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(12px)" : "translateY(0)",
              transition:
                "opacity 0.5s ease 0.1s, transform 0.5s cubic-bezier(0.16,1,0.3,1) 0.1s",
            }}
          >
            {slide.sub}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href="https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+book-entire&type=phone_number&app_absent=0"
              target="_blank"
              className="bg-primary text-black px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold flex items-center justify-center gap-3 hover:gap-5 transition-all icon-3d text-sm sm:text-base"
            >
              Get Started
              <svg
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
            <a
              href="#how-it-works"
              className="glass-effect text-center text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold hover:bg-white/20 transition-colors text-sm sm:text-base"
            >
              How It Works
            </a>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {["AM", "CO", "TF", "BK"].map((init, idx) => (
                <div
                  key={init}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] sm:text-xs font-bold"
                  style={{
                    marginLeft: idx > 0 ? "-8px" : "0",
                    background: ["#1B3F20", "#C6FF2E", "#1A5A50", "#3B2F8F"][
                      idx
                    ],
                    color: idx === 1 ? "#000" : "#fff",
                  }}
                >
                  {init}
                </div>
              ))}
            </div>
            <span className="text-white/70 text-xs sm:text-sm font-medium">
              12M+ Nigerians need clean power
            </span>
          </div>

          {/* Slide indicators */}
          <div className="flex gap-2 mt-6">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setAnimating(true);
                  setTimeout(() => {
                    setCurrent(i);
                    setAnimating(false);
                  }, 300);
                }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? "24px" : "6px",
                  height: "6px",
                  background:
                    i === current ? "#C6FF2E" : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4 lg:mt-0">
          <div className="glass-effect p-4 sm:p-6 rounded-2xl text-white">
            <div className="text-2xl sm:text-4xl font-bold mb-1">&lt;12hrs</div>
            <p className="text-xs sm:text-sm text-white/70">
              Grid electricity per day in most Nigerian states
            </p>
          </div>
          <div className="glass-effect p-4 sm:p-6 rounded-2xl text-white">
            <div className="text-2xl sm:text-4xl font-bold mb-1">₦200k</div>
            <p className="text-xs sm:text-sm text-white/70">
              Average annual generator spend per compound
            </p>
          </div>
          <div className="col-span-2 glass-effect p-4 sm:p-6 rounded-2xl text-white flex justify-between items-center">
            <div>
              <div className="text-lg sm:text-2xl font-bold">84%</div>
              <p className="text-[10px] sm:text-xs text-white/60">
                Mobile Penetration
              </p>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold">1 GRD</div>
              <p className="text-[10px] sm:text-xs text-white/60">
                = 1 kWh Energy
              </p>
            </div>
            <div>
              <div className="text-lg sm:text-2xl font-bold">100%</div>
              <p className="text-[10px] sm:text-xs text-white/60">
                Clean Solar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

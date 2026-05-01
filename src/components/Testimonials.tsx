import { useRef } from "react";
import { useReveal } from "../hooks/useReveal";

// const stats = [
//   { label: "Landlords Registered", value: "100+" },
//   { label: "Cities Covered", value: "15+" },
//   { label: "Revenue Shares Paid Out", value: "₦32M+" },
//   { label: "Customer Satisfaction", value: "98%" },
// ];

const socialProof = [
  {
    initials: "AM",
    bg: "#1B3F20",
    name: "Alhaji Musa",
    role: "Landlord, Lagos",
    quote:
      '"The revenue share lands in my wallet automatically. No disputes with tenants anymore."',
  },
  {
    initials: "CO",
    bg: "#C6FF2E",
    color: "#000",
    name: "Chidinma Obi",
    role: "Tenant, Ibadan",
    quote:
      '"I type BUY 2000 and I\'m powered for days. No wahala, no hidden fees."',
  },
  {
    initials: "TF",
    bg: "#1A5A50",
    name: "Taiwo Falola",
    role: "Landlord, Abuja",
    quote:
      '"My tenants stopped complaining the moment I registered on Gridee."',
  },
  {
    initials: "BK",
    bg: "#3B2F8F",
    name: "Blessing Kalu",
    role: "Tenant, Port Harcourt",
    quote:
      '"Even on my basic Nokia I can check my balance and top up instantly."',
  },
  {
    initials: "EO",
    bg: "#7C3AED",
    name: "Emeka Okafor",
    role: "Landlord, Enugu",
    quote:
      '"Six months in — the ROI on my solar installation is ahead of schedule."',
  },
  {
    initials: "FA",
    bg: "#B45309",
    name: "Funmi Adeyemi",
    role: "Tenant, Lagos",
    quote:
      '"The low-balance alert saved me — topped up before the lights went out."',
  },
];

export default function TrustProof() {
  const ref = useReveal();
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 sm:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Upper — credentials (Image 5 pattern) */}
        {/* <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16 sm:mb-20">
          <div className="reveal-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight headline-3d text-slate-900 mb-4 sm:mb-5">
              Trusted by Landlords and Tenants Across Nigeria.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 sm:mb-8 max-w-sm text-sm sm:text-base">
              Built to solve Nigeria's residential electricity crisis, Gridee is
              pioneering the transition to clean, prepaid solar — through
              technology Nigerians already use.
            </p>
            <button className="bg-primary text-black px-6 sm:px-7 py-3 rounded-full font-bold flex items-center gap-3 hover:gap-5 transition-all icon-3d text-sm">
              Learn More →
            </button>
          </div>

          <div className="reveal-right delay-100">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`flex items-center justify-between py-4 sm:py-6 ${
                  i < stats.length - 1 ? "border-b border-gray-200" : ""
                }`}
              >
                <span className="text-sm sm:text-lg font-medium text-gray-500">
                  {s.label}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-900">
                  {s.value}
                </span>
              </div>
            ))}
          </div>
        </div> */}

        {/* Atmospheric photo CTA */}
        {/* <div className="rounded-3xl sm:rounded-[40px] overflow-hidden relative h-64 sm:h-80 mb-16 sm:mb-20 reveal">
          <img
            src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1600&auto=format&fit=crop"
            alt="Aerial solar view"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-6">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-5 headline-3d">
              Ready To Start Saving With Solar?
            </h3>
            <div className="flex flex-col sm:flex-row gap-3 flex-wrap justify-center">
              <button className="bg-primary text-black px-6 sm:px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform icon-3d text-sm sm:text-base">
                Get Your Free Quote
              </button>
              <button className="glass-effect text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors text-sm sm:text-base">
                WhatsApp Us
              </button>
            </div>
          </div>
        </div> */}

        {/* Lower — auto-scrolling social proof carousel */}
        <div className="reveal">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="inline-block bg-primary text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3">
                Real Stories
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 headline-3d">
                Real Stories From Real Customers
              </h3>
            </div>
          </div>

          {/* Carousel with auto-scroll + pause on hover */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => {
              if (trackRef.current)
                trackRef.current.style.animationPlayState = "paused";
            }}
            onMouseLeave={() => {
              if (trackRef.current)
                trackRef.current.style.animationPlayState = "running";
            }}
          >
            <div
              ref={trackRef}
              className="flex gap-4 sm:gap-5"
              style={{
                animation: "ticker 32s linear infinite",
                width: "max-content",
              }}
            >
              {[...socialProof, ...socialProof].map((p, i) => (
                <div
                  key={i}
                  className="bg-surface rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex-shrink-0 w-[300px] sm:w-[340px] group cursor-default transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-1"
                  style={{ border: "1px solid transparent" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border =
                      "1px solid #C6FF2E";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.border =
                      "1px solid transparent";
                  }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center font-bold icon-3d flex-shrink-0 text-sm"
                      style={{
                        background: p.bg,
                        color: (p as { color?: string }).color ?? "#fff",
                      }}
                    >
                      {p.initials}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-slate-900">
                        {p.name}
                      </h5>
                      <p className="text-xs text-gray-500">{p.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic">
                    {p.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

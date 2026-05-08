import { useReveal } from "../hooks/useReveal";

const serviceCards = [
  {
    label: "Landlord Compounds",
    img: "/Landlord_Compound.png",
    span: "col-span-2",
    height: "h-52",
    overlay: "absolute top-0 left-0 w-full h-full bg-black/20",
  },
  {
    label: "Prepaid Tenant Tokens",
    img: "/SOLAR_METER.png",
    span: "col-span-1",
    height: "h-44",
  },
  {
    label: "USSD Access",
    img: "/USSD_CODE.jpg",
    span: "col-span-1",
    height: "h-44",
  },
];

export default function DualAudience() {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 bg-surface"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image 3 "Clean and Affordable" left column */}
          <div className="reveal-left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight headline-3d text-slate-900 mb-5">
              Clean and Affordable Solar Energy For Landlords and Tenants.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-5 text-sm max-w-sm">
              Smart solar technology designed to significantly reduce
              electricity bills while safeguarding the environment. By combining
              advanced smart metering, high-efficiency panels, and transparent
              on-chain management, we make energy affordable for everyone.
            </p>
            <div className="flex">
              <a
                href="https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+setting-fairly&type=phone_number&app_absent=0"
                target="_blank"
                className="bg-primary text-black px-7 py-3 w-auto rounded-full font-bold flex items-center gap-3 hover:gap-5 transition-all icon-3d text-sm"
              >
                Get Started
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                  <svg
                    className="h-3 w-3 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </a>
            </div>
          </div>

          {/* Right — 3-card photo grid (1 wide + 2 equal), Image 3 pattern */}
          <div className="grid grid-cols-2 gap-3 reveal-right delay-100">
            {serviceCards.map((card) => (
              <div
                key={card.label}
                className={`${card.span} ${card.height} rounded-2xl overflow-hidden relative group tactile-3d`}
              >
                <div className={`${card.overlay}`}></div>
                <img
                  src={card.img}
                  alt={card.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Yellow label banner — Image 3's yellow label treatment */}
                <div
                  className="absolute bottom-0 left-0 right-0 px-4 py-3"
                  style={{ background: "#C6FF2E" }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-black font-bold text-sm">
                      {card.label}
                    </span>
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <svg
                        className="h-3 w-3 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

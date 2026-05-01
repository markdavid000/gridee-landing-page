import { useReveal } from "../hooks/useReveal";

const problems = [
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "No Stable Grid Power",
    desc: "Most Nigerian states receive less than 12 hours of electricity per day. Blackouts last 48–72 hours with zero warning or recourse for tenants.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "Generator Costs Are Crushing",
    desc: "The average compound spends ₦50,000–₦200,000 per year on generator fuel — a fixed cost regardless of how much electricity each tenant actually uses.",
  },
  {
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    title: "Zero Transparency on Bills",
    desc: "Tenants never know what they are paying for. Fuel costs are split arbitrarily, causing constant disputes between landlords and tenants with no resolution.",
  },
];

export default function Problem() {
  const ref = useReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 sm:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left — stacked problem cards */}
          <div className="space-y-4 sm:space-y-5 order-2 lg:order-1">
            {problems.map((p, i) => (
              <div
                key={p.title}
                className={`flex items-start gap-4 sm:gap-5 p-5 sm:p-7 rounded-2xl bg-white tactile-3d reveal delay-${
                  (i + 1) * 100
                }`}
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 icon-3d"
                  style={{ background: "#C6FF2E" }}
                >
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2 text-slate-900">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right — heading + body + photo */}
          <div className="reveal-right delay-100 order-1 lg:order-2">
            <span className="inline-block bg-primary text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-5 sm:mb-6">
              The Problem
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 sm:mb-5 headline-3d text-slate-900">
              The Nigerian
              <br />
              Electricity Problem.
            </h2>
            <p className="text-gray-500 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base">
              Nigeria's electricity crisis is not new — but it has never been
              solved for the people who feel it most: residential tenants.
              Gridee changes that by replacing the generator with prepaid solar
              energy that is transparent, instant, and controlled from your
              phone.
            </p>
            <div className="rounded-2xl overflow-hidden h-48 sm:h-56 w-full tactile-3d">
              <img
                src="/ELECTRICITY_ISSUE.jpg"
                alt="Nigerian residential compound"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

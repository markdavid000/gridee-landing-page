import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const features = [
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
    title: "Prepaid Tokens",
    desc: "Pay only for what you use. No flat fees, no disputes.",
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
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707.707M6.343 6.343l-.707.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: "High-Efficiency Solar",
    desc: "1 GRD = 1 kWh. Instant credit on payment.",
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
    title: "Revenue for Landlords",
    desc: "Earn passive income on every tenant top-up.",
    col: "col-span-2",
  },
];

const gallery = [
  "/SOLAR_METER.png",
  "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=900&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=900&auto=format&fit=crop",
];

export default function WhyChoose() {
  const ref = useReveal();
  const [activeImg, setActiveImg] = useState(0);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 sm:py-24 bg-surface"
      id="services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-3 gap-10 lg:gap-12 items-start">
          {/* Left */}
          <div className="reveal-left col-span-1 md:col-span-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-4 headline-3d text-slate-900">
              Why Choose Gridee's Solar Solutions
            </h2>
            <p className="text-gray-500 mb-6 max-w-md text-sm leading-relaxed">
              High-performance prepaid solar for Nigerian residential
              communities — maximum savings, zero complexity, on WhatsApp and
              USSD.
            </p>

            <button className="bg-primary text-black px-6 sm:px-7 py-3 rounded-full font-bold flex items-center gap-3 hover:gap-5 transition-all mb-8 sm:mb-10 icon-3d text-sm">
              Get Started
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-black rounded-full flex items-center justify-center flex-shrink-0">
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
            </button>

            {/* Mini feature cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              {features.map((f) => (
                <div
                  key={f.title}
                  className={`bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 tactile-3d ${f.col} md:col-span-1`}
                >
                  <div
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3 icon-3d"
                    style={{ background: "#C6FF2E" }}
                  >
                    {f.icon}
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold mb-1 text-slate-900">
                    {f.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Thumbnail strip — click to change main image */}
            <div className="flex gap-2 sm:gap-3">
              {gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 h-14 sm:h-16 rounded-lg sm:rounded-xl overflow-hidden transition-all duration-200 ${
                    activeImg === i
                      ? "ring-2 ring-primary ring-offset-2 scale-105"
                      : "opacity-60 hover:opacity-90"
                  }`}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right — main image changes on thumb click */}
          <div className="reveal-right delay-100 order-1 lg:order-2 w-full">
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden h-72 sm:h-96 lg:h-[520px] w-full tactile-3d">
              <img
                key={activeImg}
                src={gallery[activeImg]}
                alt="Solar panels"
                className="w-full h-full object-cover"
                style={{ animation: "imgFadeIn 0.45s ease" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

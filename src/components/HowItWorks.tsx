import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const steps = [
  {
    num: "01",
    title: "Register Your Compound",
    desc: 'Message the Gridee bot or dial *384*0# and select "Landlord." Verify your phone with OTP and enter your property address and flat count. Done in under 2 minutes.',
    cmd: "ADD PROPERTY",
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
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Share Your Property Code",
    desc: "You receive a unique code like GRD-LAG-0042 that links tenants to your solar system. Share it with anyone moving in — they use it to register under your compound.",
    cmd: "GRD-LAG-0042",
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
          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
        />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Buy Tokens in Naira",
    desc: "Tenants type BUY 2000 to spend ₦2,000 — receiving 4.5 GRD (~10 hours of power). Pay via bank transfer, OPay, PalmPay, or crypto. Tokens arrive in seconds.",
    cmd: "BUY 2000",
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
          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Power Your Flat Instantly",
    desc: "GRD tokens mint on-chain to the tenant wallet. The smart meter reads the balance and restores power immediately. Landlord revenue share distributes automatically.",
    cmd: "BALANCE",
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
  },
];

export default function HowItWorks() {
  const ref = useReveal();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 sm:py-24 bg-white"
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <div className="reveal">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight headline-3d text-slate-900">
              From Registration To Power-On In 4 Simple Steps
            </h2>
          </div>
          <div className="flex flex-col justify-end reveal delay-100">
            <p className="text-gray-500 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Whether landlord or tenant, Gridee gives you a straightforward
              path to clean, prepaid solar — managed entirely on the phone you
              already have.
            </p>
            <a
              href="https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+setting-fairly&type=phone_number&app_absent=0"
              target="_blank"
              className="inline-flex items-center gap-2 font-bold text-sm border-b-2 border-primary pb-1 w-fit hover:text-primary transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>

        {/* Steps */}
        <div>
          {steps.map((step, i) => {
            const isHovered = hovered === i;
            return (
              <div
                key={step.num}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className={`flex items-start gap-3 sm:gap-0 border-t border-gray-200 cursor-pointer px-3 sm:px-5 -mx-3 sm:-mx-5 rounded-xl transition-all ${
                  isHovered ? "scale-[1.015] sm:scale-[1.02] shadow-lg" : ""
                } delay-${(i + 1) * 100}`}
                style={{
                  background: isHovered ? "#C6FF2E" : "transparent",
                  padding: isHovered ? "20px 20px" : "28px 20px",
                  paddingTop: "28px",
                  paddingBottom: "28px",
                }}
              >
                {/* Large number */}
                <span
                  className="text-5xl sm:text-6xl font-bold w-20 sm:w-28 flex-shrink-0 leading-none pt-1 transition-all duration-300"
                  style={{
                    color: isHovered ? "#000" : "#C6FF2E",
                    opacity: isHovered ? 1 : 0.9,
                  }}
                >
                  {step.num}
                </span>

                {/* Icon + title + command */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 sm:mb-2">
                    <div
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center transition-colors duration-300 flex-shrink-0"
                      style={{
                        background: isHovered ? "rgba(0,0,0,0.1)" : "#C6FF2E",
                        color: isHovered ? "#000" : "#000",
                      }}
                    >
                      {step.icon}
                    </div>
                    <h3
                      className="text-lg sm:text-2xl font-bold transition-colors duration-300 truncate"
                      style={{ color: isHovered ? "#000" : "#0f172a" }}
                    >
                      {step.title}
                    </h3>
                  </div>
                  <span
                    className="inline-block font-mono text-xs font-bold px-2 sm:px-3 py-1 rounded-lg mb-2 sm:mb-3 transition-all duration-300"
                    style={{
                      background: isHovered ? "rgba(0,0,0,0.15)" : "#C6FF2E",
                      color: "#000",
                    }}
                  >
                    {step.cmd}
                  </span>
                  {/* Mobile: desc shows below */}
                  <p
                    className="md:hidden text-xs leading-relaxed transition-colors duration-300"
                    style={{ color: isHovered ? "rgba(0,0,0,0.7)" : "#6b7280" }}
                  >
                    {step.desc}
                  </p>
                </div>

                {/* Description — right side on desktop */}
                <p
                  className="hidden md:block max-w-xs text-sm leading-relaxed text-right transition-colors duration-300 pl-4"
                  style={{ color: isHovered ? "rgba(0,0,0,0.75)" : "#6b7280" }}
                >
                  {step.desc}
                </p>
              </div>
            );
          })}
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

export default function TokenEconomics() {
  const ref = useReveal();
  const [spend, setSpend] = useState("");
  const [flats, setFlats] = useState("");
  const [calculated, setCalculated] = useState(false);

  const spendNum = parseFloat(spend) || 2000;
  const flatsNum = parseFloat(flats) || 1;
  const grd = (spendNum / 444).toFixed(1);
  const kwh = grd;
  const annual = Math.round(spendNum * 12 * 0.6 * flatsNum).toLocaleString(
    "en-NG"
  );

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-16 sm:py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-12 reveal">
          <span className="inline-block bg-primary text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 sm:mb-5">
            Token Economics
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight headline-3d text-slate-900 max-w-2xl">
            See How Much Your Energy Tokens Are Worth
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-start">
          {/* Left — lime calculator card */}
          <div
            className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 tactile-3d reveal-left delay-100"
            style={{ background: "#C6FF2E" }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-2">
              Your monthly energy spend (₦)
            </p>
            <input
              type="number"
              value={spend}
              onChange={(e) => {
                setSpend(e.target.value);
                setCalculated(false);
              }}
              placeholder="e.g. 2000"
              className="w-full bg-white rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg font-bold text-slate-900 mb-5 sm:mb-6 outline-none focus:ring-2 focus:ring-black/20 placeholder:text-gray-400"
            />
            <p className="text-xs font-bold uppercase tracking-widest text-black/50 mb-2">
              Number of flats / units
            </p>
            <input
              type="number"
              value={flats}
              onChange={(e) => {
                setFlats(e.target.value);
                setCalculated(false);
              }}
              placeholder="e.g. 12"
              className="w-full bg-white rounded-xl sm:rounded-2xl px-4 sm:px-5 py-3 sm:py-4 text-base sm:text-lg font-bold text-slate-900 mb-6 sm:mb-8 outline-none focus:ring-2 focus:ring-black/20 placeholder:text-gray-400"
            />
            <button
              onClick={() => setCalculated(true)}
              className="w-full bg-black text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base hover:bg-slate-800 transition-colors icon-3d"
            >
              Calculate My Savings →
            </button>
          </div>

          {/* Right — results card */}
          <div className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-gray-100 bg-white tactile-3d reveal-right delay-200">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <p className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-widest">
                Your Estimated Savings
              </p>
              {calculated && (
                <span className="bg-primary text-black text-xs font-bold px-3 py-1 rounded-full">
                  Calculated ✓
                </span>
              )}
            </div>

            {[
              {
                label: "GRD Tokens You Receive",
                value: `${grd} GRD`,
                sub: "per ₦2,000 spent",
              },
              {
                label: "kWh Energy Equivalent",
                value: `${kwh} kWh`,
                sub: "≈ 10 hours average usage",
              },
              {
                label: "Annual Savings vs Generator",
                value: `₦${annual}`,
                sub: "vs ₦200k–₦450k generator cost",
              },
            ].map((row, i) => (
              <div
                key={row.label}
                className={
                  i < 2
                    ? "border-b border-gray-100 pb-5 sm:pb-7 mb-5 sm:mb-7"
                    : ""
                }
              >
                <p className="text-xs sm:text-sm text-gray-400 font-medium mb-1">
                  {row.label}
                </p>
                <div
                  className="font-bold text-slate-900 transition-all duration-500"
                  style={{
                    fontSize: calculated
                      ? "clamp(24px, 4vw, 36px)"
                      : "clamp(18px, 3vw, 24px)",
                    lineHeight: 1.1,
                  }}
                >
                  {row.value}
                </div>
                <p className="text-xs text-gray-400 mt-1">{row.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment pills */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mt-6 sm:mt-10 reveal delay-300">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest self-center mr-1 sm:mr-2">
            Pay via
          </p>
          {[
            "Bank Transfer",
            "OPay",
            "PalmPay",
            "Moniepoint",
            "Crypto (USDT)",
          ].map((p) => (
            <span
              key={p}
              className="px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-gray-200 text-xs sm:text-sm font-semibold text-slate-700 bg-white tactile-3d"
            >
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

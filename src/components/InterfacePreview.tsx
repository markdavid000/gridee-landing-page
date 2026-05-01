import { useState } from "react";
import { useReveal } from "../hooks/useReveal";

const tickerItems = [
  "Works on WhatsApp",
  "Works on USSD *384*0#",
  "No App Required",
  "No Internet for USSD",
  "Any GSM Phone",
  "Instant Token Delivery",
  "Bank Transfer · OPay · PalmPay · Crypto",
  "Live in Lagos · Ibadan · Abuja",
];

type ModalType = "whatsapp" | "ussd" | null;

const caseData = {
  whatsapp: {
    title: "WhatsApp Bot — Full Purchase Flow",
    desc: "Every interaction happens in a familiar WhatsApp thread. The bot guides users through registration, token purchase, balance checks, and alerts — without ever leaving the chat.",
    steps: [
      {
        user: false,
        msg: "🌿 Welcome to Gridee! Are you a (1) Landlord or (2) Tenant?",
      },
      { user: true, msg: "2" },
      { user: false, msg: "Enter the Property Code your landlord gave you." },
      { user: true, msg: "GRD-LAG-0042" },
      {
        user: false,
        msg: "Welcome, Chidinma! You're at Surulere Block A. Type BUY 2000 to purchase tokens.",
      },
      { user: true, msg: "BUY 2000" },
      {
        user: false,
        msg: "✅ Payment confirmed! +4.5 GRD added. New balance: 6.2 GRD (≈ 13.7 hrs) ⚡",
      },
    ],
    stats: [
      "< 2 min registration",
      "Instant token delivery",
      "Works on any Android/iOS",
    ],
  },
  ussd: {
    title: "USSD *384*0# — Works on Any Phone",
    desc: "Dial a short code. No smartphone required. No data. No Wi-Fi. A feature phone from 2008 works just as well as the latest iPhone. Full Gridee access for every Nigerian.",
    steps: [
      {
        user: false,
        msg: "GRIDEE ENERGY\n\n1. Buy Tokens\n2. Check Balance\n3. Transaction History\n4. My Property\n\nEnter choice:",
      },
      { user: true, msg: "1" },
      { user: false, msg: "Enter amount in Naira (e.g. 2000):" },
      { user: true, msg: "2000" },
      {
        user: false,
        msg: "You will receive 4.5 GRD for ₦2,000.\nPay to: Wema Bank 0123456789\nRef: GRD-TXN-9981\n\n1. Confirm  2. Cancel",
      },
      { user: true, msg: "1" },
      {
        user: false,
        msg: "Payment initiated. You will receive an SMS confirmation within 60 seconds.",
      },
    ],
    stats: [
      "No internet needed",
      "Works on feature phones",
      "SMS confirmation",
    ],
  },
};

function Modal({ type, onClose }: { type: ModalType; onClose: () => void }) {
  if (!type) return null;
  const data = caseData[type];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "modalIn 0.35s cubic-bezier(0.16,1,0.3,1)" }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 pb-0">
          <div>
            <span className="inline-block bg-primary text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Case Study
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              {data.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors flex-shrink-0 ml-4"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-gray-500 text-sm leading-relaxed mb-6">
            {data.desc}
          </p>

          {/* Chat / USSD simulation */}
          <div
            className="rounded-2xl overflow-hidden mb-6"
            style={{ background: type === "whatsapp" ? "#ECE5DD" : "#1a1a1a" }}
          >
            {/* Header bar */}
            <div
              style={{ background: type === "whatsapp" ? "#128C7E" : "#222" }}
              className="px-4 py-3 flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-black">
                G
              </div>
              <div>
                <div className="text-white text-sm font-bold">
                  {type === "whatsapp" ? "Gridee Bot" : "USSD Session"}
                </div>
                <div className="text-white/60 text-xs">
                  {type === "whatsapp" ? "online" : "*384*0#"}
                </div>
              </div>
            </div>
            {/* Messages */}
            <div className="p-4 space-y-3">
              {data.steps.map((s, i) => (
                <div
                  key={i}
                  className={`flex ${s.user ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="px-3 py-2 rounded-xl max-w-[80%] whitespace-pre-line"
                    style={{
                      background: s.user
                        ? type === "whatsapp"
                          ? "#DCF8C6"
                          : "#C6FF2E"
                        : type === "whatsapp"
                        ? "#fff"
                        : "#2a2a2a",
                      color: type === "ussd" && !s.user ? "#00FF00" : "#000",
                      fontSize: "12px",
                      lineHeight: 1.5,
                    }}
                  >
                    {s.msg}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {data.stats.map((s) => (
              <div key={s} className="bg-surface rounded-xl p-3 text-center">
                <svg
                  className="w-4 h-4 text-primary mx-auto mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <p className="text-xs font-semibold text-slate-700">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InterfacePreview() {
  const ref = useReveal();
  const [modal, setModal] = useState<ModalType>(null);

  return (
    <>
      <Modal type={modal} onClose={() => setModal(null)} />

      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="py-16 sm:py-24 bg-surface"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="mb-10 sm:mb-12 reveal">
            <span className="inline-block bg-primary text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 sm:mb-5">
              The Interface
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight headline-3d text-slate-900">
              Works on Every Nigerian Phone.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
            {/* WhatsApp card */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative h-72 sm:h-80 lg:h-96 tactile-3d reveal-left delay-100 group">
              <img
                src="/WhatsApp_User.jpg"
                alt="Person using WhatsApp on smartphone"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-5 sm:p-7">
                <span className="inline-block bg-primary text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  WhatsApp Bot
                </span>
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  BUY 2000 → 4.5 GRD instantly
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-1 mb-3">
                  Full token purchase flow via WhatsApp chat
                </p>
                <button
                  onClick={() => setModal("whatsapp")}
                  className="text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View Case Study →
                </button>
              </div>
            </div>

            {/* USSD card */}
            <div className="rounded-2xl sm:rounded-3xl overflow-hidden relative h-72 sm:h-80 lg:h-96 tactile-3d reveal-right delay-200 group">
              <img
                src="/USSD_CODE.jpg"
                alt="Feature phone USSD interface"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent p-5 sm:p-7">
                <span className="inline-block bg-white text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
                  USSD *384*0#
                </span>
                <h3 className="text-white font-bold text-lg sm:text-xl">
                  Works on any GSM phone
                </h3>
                <p className="text-white/60 text-xs sm:text-sm mt-1 mb-3">
                  No data, no internet, no smartphone needed
                </p>
                <button
                  onClick={() => setModal("ussd")}
                  className="text-primary text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
                >
                  View Case Study →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Moving ticker strip */}
        <div className="overflow-hidden bg-black py-3 sm:py-4">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "ticker 28s linear infinite" }}
          >
            {[...tickerItems, ...tickerItems, ...tickerItems].map((item, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 sm:gap-3 text-white font-medium text-xs sm:text-sm px-4 sm:px-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

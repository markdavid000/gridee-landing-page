const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const icons = require("react-icons/fa");
const mdIcons = require("react-icons/md");
const hiIcons = require("react-icons/hi");

// ─── PALETTE ────────────────────────────────────────────────────────────────
const C = {
  dark:    "071A0D",   // near-black forest — title / conclusion bg
  forest:  "0B3D2E",   // deep forest — primary
  mid:     "166534",   // mid green — secondary
  lime:    "C6FF2E",   // Gridee lime accent
  green:   "22C55E",   // vibrant green highlights
  white:   "FFFFFF",
  offWhite:"F7FDF9",   // very light green-white — card bg
  softGray:"F0F4F2",   // soft gray-green — alt bg
  textDark:"111827",
  textMed: "374151",
  textSoft:"6B7280",
  border:  "D1FAE5",   // light green border
};

// ─── ICON HELPER ─────────────────────────────────────────────────────────────
async function icon(IconComp, color = C.forest, size = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(IconComp, { color: `#${color}`, size: String(size) })
  );
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ─── SHARED HELPERS ──────────────────────────────────────────────────────────
function card(slide, x, y, w, h, fill = C.offWhite) {
  slide.addShape("rect", {
    x, y, w, h,
    fill: { color: fill },
    shadow: { type: "outer", blur: 8, offset: 2, angle: 135, color: "000000", opacity: 0.07 },
    line: { color: C.border, width: 0.5 },
  });
}

function sectionLabel(slide, text, x = 0.55, y = 0.3) {
  slide.addText(text.toUpperCase(), {
    x, y, w: 3, h: 0.25,
    fontSize: 9, bold: true, color: C.mid,
    charSpacing: 3, margin: 0,
  });
}

function slideTitle(slide, text, x = 0.55, y = 0.62, w = 9) {
  slide.addText(text, {
    x, y, w, h: 0.8,
    fontSize: 30, bold: true, color: C.textDark,
    fontFace: "Calibri", margin: 0,
  });
}

function body(slide, textArr, x, y, w, h, opts = {}) {
  slide.addText(textArr, { x, y, w, h, fontSize: 13, color: C.textMed, fontFace: "Calibri", valign: "top", ...opts });
}

// ─── BUILD PRESENTATION ──────────────────────────────────────────────────────
async function build() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Gridee — Final Capstone Presentation";

  // ════════════════════════════════════════════════════════════════
  // SLIDE 1 — COVER
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.dark };

    // Lime accent rectangle left edge
    s.addShape("rect", { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.lime }, line: { width: 0 } });

    // Subtle grid overlay
    s.addShape("rect", { x: 0, y: 0, w: 10, h: 5.625,
      fill: { color: C.forest, transparency: 80 }, line: { width: 0 } });

    // Big logo wordmark
    s.addText("Gridee", {
      x: 0.5, y: 1.2, w: 9, h: 1.4,
      fontSize: 72, bold: true, color: C.lime, fontFace: "Calibri",
      align: "center", margin: 0,
    });

    // Tagline
    s.addText("Decentralised Solar Energy Access for Nigerian Residential Communities", {
      x: 0.8, y: 2.8, w: 8.4, h: 0.6,
      fontSize: 17, color: "AAFFCC", fontFace: "Calibri",
      align: "center", margin: 0,
    });

    // Divider line
    s.addShape("rect", { x: 3.5, y: 3.5, w: 3, h: 0.03, fill: { color: C.lime }, line: { width: 0 } });

    // Sub-label
    s.addText("Web3Bridge Cohort Capstone  ·  2025  ·  Team Gridee", {
      x: 1, y: 3.65, w: 8, h: 0.35,
      fontSize: 11, color: "66BB88", fontFace: "Calibri",
      align: "center", margin: 0, italic: true,
    });

    // Three pillars
    const pillars = ["⚡ Energy Tokenization", "📱 WhatsApp Interface", "🔗 Base Blockchain"];
    pillars.forEach((p, i) => {
      s.addShape("rect", {
        x: 1.3 + i * 2.7, y: 4.35, w: 2.3, h: 0.55,
        fill: { color: C.forest }, line: { color: C.lime, width: 0.8 },
      });
      s.addText(p, {
        x: 1.3 + i * 2.7, y: 4.35, w: 2.3, h: 0.55,
        fontSize: 10.5, bold: true, color: C.lime, align: "center", valign: "middle", margin: 0,
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 2 — ABOUT GRIDEE
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "About the Project");
    slideTitle(s, "What is Gridee?");

    // Left text block
    s.addText([
      { text: "Gridee is a decentralised energy access platform built for Nigerian residential communities. ", options: { bold: false } },
      { text: "It connects landlords who own solar infrastructure with tenants who need reliable, affordable electricity.", options: { bold: false } },
    ], {
      x: 0.55, y: 1.55, w: 4.4, h: 1.5,
      fontSize: 13.5, color: C.textMed, fontFace: "Calibri", valign: "top",
    });

    s.addText("Everything is managed through WhatsApp or a USSD dial code — no apps, no crypto wallets, no seed phrases. Users simply chat with a bot to fund their wallet, buy energy tokens, and track their usage in real time.", {
      x: 0.55, y: 3.15, w: 4.4, h: 1.5,
      fontSize: 12.5, color: C.textSoft, fontFace: "Calibri", valign: "top",
    });

    // Right: 4 stat cards
    const stats = [
      { num: "1 GRD",   label: "= 1 kWh of solar energy" },
      { num: "2 Roles", label: "Landlords & Tenants" },
      { num: "Base L2", label: "Blockchain infrastructure" },
      { num: "USDC",    label: "Stablecoin for payments" },
    ];
    stats.forEach((st, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 5.3 + col * 2.3, y = 1.45 + row * 1.7;
      card(s, x, y, 2.1, 1.5, C.offWhite);
      s.addShape("rect", { x, y, w: 2.1, h: 0.12, fill: { color: C.lime }, line: { width: 0 } });
      s.addText(st.num, { x, y: y + 0.2, w: 2.1, h: 0.65, fontSize: 22, bold: true, color: C.forest, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(st.label, { x, y: y + 0.85, w: 2.1, h: 0.5, fontSize: 10.5, color: C.textSoft, align: "center", fontFace: "Calibri", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 3 — NIGERIA ENERGY CONTEXT
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Context");
    slideTitle(s, "Nigeria's Electricity Reality");

    // 3 big stat callouts
    const stats3 = [
      { num: "<12", unit: "hrs/day", desc: "Average grid electricity supply across most Nigerian states" },
      { num: "₦200k", unit: "per year", desc: "Average compound spends on generator fuel annually" },
      { num: "84%", unit: "mobile", desc: "Mobile penetration — WhatsApp & USSD already familiar to everyone" },
    ];
    stats3.forEach((st, i) => {
      const x = 0.4 + i * 3.2;
      card(s, x, 1.52, 2.95, 2.3, i === 0 ? C.dark : i === 1 ? C.forest : C.offWhite);
      const textColor = i < 2 ? C.white : C.textDark;
      const unitColor = i < 2 ? "AAFFCC" : C.mid;
      s.addText(st.num, { x, y: 1.72, w: 2.95, h: 0.95, fontSize: 46, bold: true, color: i < 2 ? C.lime : C.forest, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(st.unit, { x, y: 2.65, w: 2.95, h: 0.3, fontSize: 12, bold: true, color: unitColor, align: "center", fontFace: "Calibri", margin: 0 });
      s.addText(st.desc, { x: x + 0.15, y: 3.0, w: 2.65, h: 0.75, fontSize: 10.5, color: i < 2 ? "AAFFCC" : C.textSoft, align: "center", fontFace: "Calibri", margin: 0 });
    });

    // Context note at bottom
    card(s, 0.4, 4.0, 9.2, 0.95, C.offWhite);
    s.addText("Nigeria's national grid delivers far less power than its 220 million people need. Most households rely on expensive, polluting petrol generators. Solar energy is increasingly affordable — but landlords have no clear way to make money from installing it, and tenants have no transparent way to pay only for what they use. Gridee solves both sides of this problem.", {
      x: 0.6, y: 4.08, w: 8.8, h: 0.8,
      fontSize: 11.5, color: C.textMed, fontFace: "Calibri", valign: "middle",
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 4 — PROBLEM STATEMENT
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Problem Statement");
    slideTitle(s, "Four Core Problems We Set Out to Solve");

    const problems = [
      {
        title: "1. No Stable Power + No Transparency",
        body: "Tenants have no way to see their real-time energy usage or spending. Bills are split arbitrarily by landlords, causing constant disputes. There is no record, no proof, and no fairness.",
      },
      {
        title: "2. Generator Costs Are Crushing Tenants",
        body: "Tenants are forced to pay flat generator fees of ₦5,000–₦20,000 per month regardless of how much electricity they use. Those who use less still pay the same as those who use more.",
      },
      {
        title: "3. Blockchain Is Too Complex for Everyday Users",
        body: "Traditional Web3 solutions demand MetaMask, seed phrases, gas fees in ETH, and technical knowledge most Nigerians do not have. The friction kills adoption before it starts.",
      },
      {
        title: "4. The Gap Between Hardware and Digital Finance",
        body: "Even where solar panels are installed, there is no software layer that connects physical energy meters to digital payments. Landlords cannot monetise the infrastructure they have installed.",
      },
    ];

    problems.forEach((p, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.4 + col * 4.75, y = 1.55 + row * 1.9;
      card(s, x, y, 4.45, 1.75, C.offWhite);
      // Lime top border
      s.addShape("rect", { x, y, w: 4.45, h: 0.07, fill: { color: C.lime }, line: { width: 0 } });
      s.addText(p.title, { x: x + 0.2, y: y + 0.15, w: 4.05, h: 0.45, fontSize: 12.5, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });
      s.addText(p.body, { x: x + 0.2, y: y + 0.62, w: 4.05, h: 1.0, fontSize: 11, color: C.textMed, fontFace: "Calibri", valign: "top", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 5 — THE SOLUTION
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "The Solution");
    slideTitle(s, "How Gridee Solves It");

    // Left: Overview text
    s.addText("Gridee combines blockchain technology, stablecoin payments, and a WhatsApp chatbot to make solar energy access simple, transparent, and fair — for both landlords and tenants.", {
      x: 0.55, y: 1.55, w: 4.2, h: 1.2,
      fontSize: 13.5, color: C.textMed, fontFace: "Calibri", valign: "top",
    });

    s.addText("Users never see a wallet address or seed phrase. They just chat with a bot. Under the hood, everything is on the blockchain — auditable, transparent, and automatic.", {
      x: 0.55, y: 2.85, w: 4.2, h: 1.0,
      fontSize: 12, color: C.textSoft, fontFace: "Calibri", valign: "top", italic: true,
    });

    // Divider
    s.addShape("rect", { x: 0.55, y: 3.95, w: 3.8, h: 0.03, fill: { color: C.border }, line: { width: 0 } });
    s.addText("Built on Base L2  ·  Powered by USDC  ·  Delivered via WhatsApp & USSD", {
      x: 0.55, y: 4.05, w: 4.2, h: 0.4,
      fontSize: 10, color: C.mid, fontFace: "Calibri", italic: true, margin: 0,
    });

    // Right: 4 solution pillars
    const solutions = [
      { label: "Invisible Web3", desc: "Non-custodial wallets via Turnkey. No seed phrases, no MetaMask." },
      { label: "GRD Energy Tokens", desc: "1 GRD = 1 kWh on Base blockchain. Buy with Naira, use for power." },
      { label: "WhatsApp + USSD Bot", desc: "Full platform via chat. Check balance, fund wallet, buy tokens." },
      { label: "Smart Escrow Contract", desc: "USDC locked on-chain. Landlords earn automatically on purchase." },
    ];
    solutions.forEach((sol, i) => {
      const y = 1.48 + i * 1.0;
      card(s, 5.0, y, 4.6, 0.87, C.offWhite);
      s.addShape("rect", { x: 5.0, y, w: 0.09, h: 0.87, fill: { color: C.lime }, line: { width: 0 } });
      s.addText(sol.label, { x: 5.2, y: y + 0.06, w: 4.2, h: 0.3, fontSize: 12.5, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });
      s.addText(sol.desc, { x: 5.2, y: y + 0.42, w: 4.2, h: 0.38, fontSize: 10.5, color: C.textSoft, fontFace: "Calibri", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 6 — PROBLEM → SOLUTION MAPPING
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Solution Detail");
    slideTitle(s, "How Each Problem Gets Solved");

    const rows = [
      { prob: "No transparency on energy usage or bills", sol: "Every purchase and usage event is recorded on the Base blockchain. Any tenant can view their own transaction history by typing HISTORY in the bot." },
      { prob: "Generator costs are flat and unfair", sol: "Tenants only pay for tokens they buy. No flat fees. The bot shows the exact Naira cost and kWh equivalent before every purchase." },
      { prob: "Web3 is too complex for regular users", sol: "Turnkey creates a non-custodial wallet linked to their phone number. They never see a private key. They interact only via WhatsApp or USSD." },
      { prob: "No bridge between hardware and payments", sol: "The Hardware Abstraction Layer (HAL) connects smart meters to the blockchain. In MVP it is simulated; when real meters ship, they plug in without code changes." },
    ];

    rows.forEach((row, i) => {
      const y = 1.48 + i * 0.96;
      // Problem column
      card(s, 0.4, y, 4.1, 0.83, "FFF0F0");
      s.addShape("rect", { x: 0.4, y, w: 0.09, h: 0.83, fill: { color: "EF4444" }, line: { width: 0 } });
      s.addText(row.prob, { x: 0.6, y: y + 0.08, w: 3.75, h: 0.67, fontSize: 10.5, color: "7F1D1D", fontFace: "Calibri", valign: "middle", margin: 0 });
      // Arrow
      s.addText("→", { x: 4.6, y: y + 0.23, w: 0.7, h: 0.37, fontSize: 20, bold: true, color: C.lime, align: "center", fontFace: "Calibri", margin: 0 });
      // Solution column
      card(s, 5.4, y, 4.2, 0.83, C.offWhite);
      s.addShape("rect", { x: 5.4, y, w: 0.09, h: 0.83, fill: { color: C.lime }, line: { width: 0 } });
      s.addText(row.sol, { x: 5.6, y: y + 0.08, w: 3.85, h: 0.67, fontSize: 10.5, color: C.textMed, fontFace: "Calibri", valign: "middle", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 7 — PROJECT APPROACH
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Our Approach");
    slideTitle(s, "From Idea to Implementation");

    const phases = [
      { phase: "Ideation", time: "Week 1", desc: "Identified Nigeria's energy problem. Defined landlord and tenant personas. Validated the WhatsApp-first approach with potential users." },
      { phase: "PRD & Architecture", time: "Week 1–2", desc: "Wrote the full Product Requirements Document. Defined smart contract architecture, bot command structure, and payment flows." },
      { phase: "7-Day Sprint", time: "Week 3", desc: "Parallel tracks: smart contracts, backend APIs, bot flows, and payment integration. Daily standups. Shared TypeScript interface package." },
      { phase: "Web3 Pivot", time: "Mid-Sprint", desc: "Mentor feedback: moved from custodial to self-custodial wallets (Turnkey), and from Web2 payment to on-chain USDC via Yellow Card onramp." },
      { phase: "Integration & Testing", time: "Week 4", desc: "End-to-end testing on Base Sepolia testnet. Fixed Twilio timeout issues. Validated the full fund → buy → power flow." },
      { phase: "Final Presentation", time: "Today", desc: "Production-ready system. All flows working on Base Sepolia. Demo-ready on WhatsApp and USSD." },
    ];

    // Draw connecting line
    s.addShape("rect", { x: 0.7, y: 1.6, w: 0.04, h: 3.5, fill: { color: C.border }, line: { width: 0 } });

    phases.forEach((ph, i) => {
      const y = 1.52 + i * 0.62;
      // Dot
      s.addShape("oval", { x: 0.55, y: y + 0.08, w: 0.3, h: 0.3, fill: { color: i === 3 ? C.lime : C.mid }, line: { width: 0 } });
      // Phase label
      s.addText(ph.phase, { x: 1.05, y: y + 0.02, w: 1.8, h: 0.25, fontSize: 12, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });
      s.addText(ph.time, { x: 2.85, y: y + 0.02, w: 1.2, h: 0.22, fontSize: 9, bold: true, color: C.mid, fontFace: "Calibri", italic: true, margin: 0 });
      s.addText(ph.desc, { x: 1.05, y: y + 0.3, w: 8.5, h: 0.27, fontSize: 10, color: C.textMed, fontFace: "Calibri", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 8 — ARCHITECTURE OVERVIEW
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Implementation");
    slideTitle(s, "System Architecture — Four Layers");

    const layers = [
      { name: "Interface Layer", color: C.lime, textColor: C.dark, items: "WhatsApp Bot (Twilio)  ·  USSD Gateway (Africa's Talking)" },
      { name: "Application Layer", color: "1D6A4E", textColor: C.white, items: "Node.js / Express / TypeScript  ·  Redis Session Engine  ·  PostgreSQL  ·  Notification Service" },
      { name: "Blockchain Layer", color: C.forest, textColor: C.white, items: "Base L2 (EVM)  ·  GRD Token (ERC-20)  ·  TenantEscrow.sol  ·  EnergyLedger.sol  ·  Turnkey Wallets  ·  USDC  ·  Yellow Card On/Off-Ramp" },
      { name: "Hardware Abstraction Layer (HAL)", color: C.dark, textColor: "AAFFCC", items: "Simulated in MVP (MockSmartMeter)  ·  Real IoT meters connect here in v2  ·  Zero code changes required" },
    ];

    layers.forEach((layer, i) => {
      const y = 1.48 + i * 0.98;
      s.addShape("rect", { x: 0.4, y, w: 9.2, h: 0.85, fill: { color: layer.color }, line: { width: 0 } });
      s.addText(layer.name, { x: 0.55, y: y + 0.08, w: 2.6, h: 0.3, fontSize: 11.5, bold: true, color: layer.textColor, fontFace: "Calibri", margin: 0 });
      s.addText(layer.items, { x: 3.2, y: y + 0.08, w: 6.2, h: 0.65, fontSize: 11, color: layer.textColor, fontFace: "Calibri", valign: "middle", margin: 0, italic: true });
      // Layer number badge
      s.addShape("oval", { x: 9.15, y: y + 0.2, w: 0.42, h: 0.42, fill: { color: layer.textColor === C.dark ? C.dark : "FFFFFF", transparency: 20 }, line: { width: 0 } });
      s.addText(String(i + 1), { x: 9.15, y: y + 0.2, w: 0.42, h: 0.42, fontSize: 12, bold: true, color: layer.color, align: "center", valign: "middle", fontFace: "Calibri", margin: 0 });
    });

    // Caption
    s.addText("Each layer is independently swappable. Real smart meters plug into HAL without changing any other code.", {
      x: 0.55, y: 5.25, w: 9.0, h: 0.25,
      fontSize: 10, color: C.textSoft, fontFace: "Calibri", italic: true, margin: 0,
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 9 — IMPLEMENTATION: BACKEND & BOT
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Implementation Details");
    slideTitle(s, "Backend, Bot & Communication Stack");

    const items = [
      {
        cat: "Runtime & Framework",
        detail: "Node.js + TypeScript + Express. TypeScript enforces strict type safety across all modules. Clean folder structure: /routes, /controllers, /services, /models, /hal.",
      },
      {
        cat: "State Management",
        detail: "Redis stores every user's conversation state (e.g. AWAITING_OTP, AWAITING_PROPERTY_CODE) with a 30-minute TTL. This makes the stateless HTTP server behave like a stateful chat session.",
      },
      {
        cat: "WhatsApp Integration",
        detail: "Twilio Sandbox (WhatsApp Business API). Incoming messages hit a POST /webhook endpoint. Twilio enforces a 15-second response timeout — a key challenge given blockchain operations take 15s+.",
      },
      {
        cat: "SMS Fallback",
        detail: "Termii handles SMS delivery when WhatsApp fails. A notification service tries WhatsApp first, falls back to SMS automatically. All events are logged to a notification_log table for debugging.",
      },
      {
        cat: "USSD Gateway",
        detail: "Africa's Talking USSD. Incoming sessions hit POST /webhook/ussd. The accumulated input string (e.g. 1*2000*1) is parsed to determine menu depth. Sessions expire after 15 minutes of inactivity.",
      },
      {
        cat: "Database",
        detail: "PostgreSQL for persistent data: users, properties, transactions, wallet_fundings, revenue_events, otp_codes, notification_log, meter_status. Phone numbers never stored on-chain — only keccak256 hashes.",
      },
    ];

    items.forEach((item, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.4 + col * 4.75, y = 1.48 + row * 1.32;
      card(s, x, y, 4.45, 1.18, C.offWhite);
      s.addShape("rect", { x, y, w: 0.09, h: 1.18, fill: { color: C.lime }, line: { width: 0 } });
      s.addText(item.cat, { x: x + 0.2, y: y + 0.08, w: 4.1, h: 0.28, fontSize: 11.5, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });
      s.addText(item.detail, { x: x + 0.2, y: y + 0.4, w: 4.1, h: 0.72, fontSize: 10, color: C.textMed, fontFace: "Calibri", valign: "top", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 10 — IMPLEMENTATION: SMART CONTRACTS & BLOCKCHAIN
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Implementation Details");
    slideTitle(s, "Smart Contracts & Blockchain");

    // Left: Contract list
    const contracts = [
      { name: "GrideeToken.sol (GRD)", desc: "ERC-20 token. 1 GRD = 1 kWh. Transfer restricted — tenants can only transfer to EnergyLedger. Minted on purchase, burned on consumption." },
      { name: "TenantEscrow.sol", desc: "NEW contract. Holds tenant USDC. Has NO withdraw() function by design. Only allows purchaseTokens() — tenants physically cannot retrieve their funds." },
      { name: "EnergyLedger.sol", desc: "Core logic contract. On purchaseWithUSDC(): splits USDC (landlord share → landlord wallet, platform fee → treasury), then mints GRD to tenant." },
      { name: "PropertyRegistry.sol", desc: "Stores property records on-chain. Property codes like GRD-LAG-0042 are stored as bytes32. Landlord wallet is linked to each property." },
    ];

    contracts.forEach((c, i) => {
      const y = 1.48 + i * 0.98;
      card(s, 0.4, y, 5.35, 0.85, C.offWhite);
      s.addShape("rect", { x: 0.4, y, w: 0.09, h: 0.85, fill: { color: C.lime }, line: { width: 0 } });
      s.addText(c.name, { x: 0.6, y: y + 0.06, w: 5.0, h: 0.28, fontSize: 11.5, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });
      s.addText(c.desc, { x: 0.6, y: y + 0.38, w: 5.0, h: 0.42, fontSize: 10, color: C.textMed, fontFace: "Calibri", margin: 0 });
    });

    // Right: Chain info
    card(s, 6.0, 1.48, 3.6, 3.95, C.dark);
    s.addText("Chain Details", { x: 6.15, y: 1.6, w: 3.3, h: 0.35, fontSize: 12, bold: true, color: C.lime, fontFace: "Calibri", margin: 0 });

    const chainDetails = [
      ["Network", "Base L2 (Coinbase)"],
      ["Testnet", "Base Sepolia"],
      ["Native USDC", "0x8335...a029"],
      ["Gas", "< $0.001 per tx"],
      ["Block Time", "~2 seconds"],
      ["Dev Tools", "Hardhat + ethers.js v6"],
      ["AA / Wallets", "Turnkey (TEE-based)"],
      ["On/Off Ramp", "Yellow Card API"],
    ];
    chainDetails.forEach((row, i) => {
      s.addText(row[0], { x: 6.15, y: 2.05 + i * 0.41, w: 1.5, h: 0.3, fontSize: 10, color: "88DDAA", fontFace: "Calibri", margin: 0 });
      s.addText(row[1], { x: 7.7, y: 2.05 + i * 0.41, w: 1.75, h: 0.3, fontSize: 10, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 11 — IMPLEMENTATION: WALLET & PAYMENTS
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Implementation Details");
    slideTitle(s, "Wallets, Payments & the USDC Flow");

    // Flow diagram: NGN → USDC → GRD → Power
    const steps = [
      { label: "Tenant pays NGN", sub: "Flutterwave virtual account", color: "E8F5E9" },
      { label: "NGN → USDC", sub: "Yellow Card onramp\n(under the hood)", color: C.offWhite },
      { label: "USDC locked", sub: "TenantEscrow.sol\n(no withdraw)", color: "FFF9C4" },
      { label: "BUY command", sub: "purchaseTokens()\ncalled on-chain", color: C.offWhite },
      { label: "GRD minted", sub: "Landlord gets USDC\nautomatically", color: "E8F5E9" },
    ];

    steps.forEach((st, i) => {
      const x = 0.35 + i * 1.88;
      card(s, x, 1.52, 1.7, 1.5, st.color);
      s.addShape("rect", { x, y: 1.52, w: 1.7, h: 0.09, fill: { color: C.lime }, line: { width: 0 } });
      s.addText(st.label, { x: x + 0.08, y: 1.66, w: 1.55, h: 0.42, fontSize: 11, bold: true, color: C.forest, fontFace: "Calibri", align: "center", margin: 0 });
      s.addText(st.sub, { x: x + 0.08, y: 2.1, w: 1.55, h: 0.8, fontSize: 9.5, color: C.textSoft, fontFace: "Calibri", align: "center", margin: 0 });
      if (i < 4) {
        s.addText("→", { x: x + 1.73, y: 2.0, w: 0.22, h: 0.35, fontSize: 16, bold: true, color: C.lime, align: "center", margin: 0 });
      }
    });

    // Key tools
    s.addText("Key Tools", { x: 0.4, y: 3.2, w: 2, h: 0.3, fontSize: 12, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });

    const tools = [
      { name: "Turnkey", role: "Non-custodial wallet infrastructure. Users authenticate via SMS OTP. Private keys in secure TEE enclaves. Neither Turnkey nor Gridee can access user funds." },
      { name: "Yellow Card API", role: "Africa's largest licensed stablecoin on/off-ramp. Accepts NGN (bank transfer, mobile money) and delivers USDC to any wallet. Also handles USDC → NGN for landlord withdrawals." },
      { name: "Flutterwave", role: "Collects NGN from tenants via virtual accounts. Existing integration, unchanged. Webhook fires → triggers Yellow Card onramp → USDC lands in TenantEscrow." },
    ];

    tools.forEach((t, i) => {
      const y = 3.6 + i * 0.62;
      card(s, 0.4, y, 9.2, 0.5, C.offWhite);
      s.addShape("rect", { x: 0.4, y, w: 0.09, h: 0.5, fill: { color: C.lime }, line: { width: 0 } });
      s.addText(t.name, { x: 0.6, y: y + 0.04, w: 1.6, h: 0.38, fontSize: 11, bold: true, color: C.forest, fontFace: "Calibri", valign: "middle", margin: 0 });
      s.addText(t.role, { x: 2.2, y: y + 0.04, w: 7.25, h: 0.38, fontSize: 10, color: C.textMed, fontFace: "Calibri", valign: "middle", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 12 — CHALLENGES: TECHNICAL
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Challenges Faced");
    slideTitle(s, "Technical Challenges");

    const challenges = [
      {
        title: "Twilio's 15-Second Timeout vs Blockchain Latency",
        impact: "High",
        body: "Twilio's webhook expects a response within 15 seconds or it marks the message as failed. Blockchain transactions — especially with wallet signing, contract calls, and block confirmation waits — regularly exceeded 15 seconds. Solution: Immediately acknowledge the webhook with a 'processing' message, then run the blockchain operation in the background and send the final result as a new message when it completes.",
      },
      {
        title: "Schema Evolution for Self-Custodial Model",
        impact: "High",
        body: "The original database schema was built for a custodial model (platform owns the keys). Migrating to Turnkey required adding turnkey_sub_org_id, restructuring the wallet_fundings table, and separating the fund flow from the buy flow entirely. Legacy records had to be carefully migrated without breaking active sessions.",
      },
      {
        title: "Provider Rate Limits and Sandbox Restrictions",
        impact: "Medium",
        body: "Twilio WhatsApp Sandbox limits outbound messages to pre-approved numbers. Yellow Card's production API required a business approval process — we worked with their sandbox throughout. Africa's Talking has per-second SMS limits. Required building a queue-based notification system with retry logic to avoid dropped messages.",
      },
      {
        title: "State Management in Stateless HTTP",
        impact: "Medium",
        body: "WhatsApp bot conversations are multi-step (e.g. registration takes 5 back-and-forth messages). But each incoming message is an independent HTTP request with no context. Redis session state with 30-minute TTLs solved this, but required careful design to handle edge cases: user abandons mid-flow, duplicate messages, concurrent bot sessions.",
      },
    ];

    challenges.forEach((ch, i) => {
      const y = 1.48 + i * 0.97;
      card(s, 0.4, y, 9.2, 0.84, C.offWhite);
      s.addShape("rect", { x: 0.4, y, w: 0.09, h: 0.84, fill: { color: i < 2 ? "EF4444" : "F59E0B" }, line: { width: 0 } });
      const impactColor = i < 2 ? "DC2626" : "B45309";
      const impactBg = i < 2 ? "FEE2E2" : "FEF3C7";
      // Impact badge
      s.addShape("rect", { x: 9.05, y: y + 0.12, w: 0.4, h: 0.22, fill: { color: impactBg }, line: { width: 0 } });
      s.addText(ch.impact, { x: 9.05, y: y + 0.12, w: 0.4, h: 0.22, fontSize: 7, bold: true, color: impactColor, align: "center", valign: "middle", fontFace: "Calibri", margin: 0 });

      s.addText(ch.title, { x: 0.6, y: y + 0.05, w: 8.3, h: 0.28, fontSize: 11.5, bold: true, color: C.textDark, fontFace: "Calibri", margin: 0 });
      s.addText(ch.body, { x: 0.6, y: y + 0.36, w: 8.45, h: 0.44, fontSize: 9.5, color: C.textMed, fontFace: "Calibri", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 13 — CHALLENGES: TEAM & PROCESS
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Challenges Faced");
    slideTitle(s, "Team, Process & External Challenges");

    const teamChallenges = [
      {
        area: "Communication Gaps",
        detail: "In the early sprint days, team members were building in silos without syncing on shared interfaces. This caused integration conflicts — the bot was calling endpoints that the backend had renamed, and the smart contract emitted events the backend was not listening for. Resolution: Introduced a shared TypeScript /types package and mandatory daily standups.",
      },
      {
        area: "Unclear Direction on Wallet Architecture",
        detail: "The initial roadmap specified custodial wallets. The mentor's feedback in the middle of the sprint required a significant architectural pivot to self-custodial wallets using Turnkey. This happened when half the team had already built flows assuming the old model — requiring them to rewrite wallet creation and transaction signing logic mid-sprint.",
      },
      {
        area: "Third-Party API Access Delays",
        detail: "Yellow Card's B2B Payments API requires a business approval process. Getting sandbox access took longer than anticipated, which delayed integration testing of the onramp/offramp flows. The team had to build mock implementations of the Yellow Card webhook to continue testing other parts of the system.",
      },
      {
        area: "Scope Creep and Priority Conflicts",
        detail: "The team frequently debated adding new features (e.g. a landlord analytics dashboard, P2P energy trading) during the sprint. This diverted attention from getting the core flows production-ready. Strict feature-freeze after Day 4 of the sprint helped maintain focus on the MVP scope.",
      },
    ];

    teamChallenges.forEach((tc, i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.4 + col * 4.75, y = 1.48 + row * 1.75;
      card(s, x, y, 4.45, 1.6, C.offWhite);
      s.addShape("rect", { x, y, w: 4.45, h: 0.08, fill: { color: C.mid }, line: { width: 0 } });
      s.addText(tc.area, { x: x + 0.15, y: y + 0.16, w: 4.15, h: 0.35, fontSize: 12, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });
      s.addText(tc.detail, { x: x + 0.15, y: y + 0.55, w: 4.15, h: 0.98, fontSize: 9.5, color: C.textMed, fontFace: "Calibri", valign: "top", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 14 — LESSONS LEARNT
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Lessons Learnt");
    slideTitle(s, "What This Project Taught Us");

    const lessons = [
      {
        num: "01",
        title: "UX First, Web3 Second",
        body: "Users care about paying their electricity bill, not about blockchain architecture. Hiding the complexity behind a familiar chat interface is not a compromise — it is the product. The best Web3 app is one where the user never knows Web3 is involved.",
      },
      {
        num: "02",
        title: "Resiliency is Not Optional in Fintech",
        body: "When real money is involved, transactions must never disappear silently. We learnt to build background processing pipelines, proactive notifications for every state change, and idempotency guards on every payment webhook. A user who pays and hears nothing is a churned user.",
      },
      {
        num: "03",
        title: "Modular Architecture Pays Dividends",
        body: "The Hardware Abstraction Layer (HAL) design — where a MockSmartMeter can be swapped for a RealSmartMeter without any other code changes — is the kind of decision that seems over-engineered early but saves the entire project when requirements change. Same for the shared TypeScript types package.",
      },
      {
        num: "04",
        title: "Communication is Infrastructure",
        body: "The biggest delays in the sprint were not technical — they were human. Ambiguous interface contracts between backend and bot, undocumented changes, and assumptions about scope caused more rework than any bug. Shared types, daily standups, and a feature-freeze discipline are as important as any library.",
      },
      {
        num: "05",
        title: "Architect for the Mentor's Feedback You Don't Know Yet",
        body: "The pivot from custodial to self-custodial wallets mid-sprint was painful precisely because the original architecture baked in custodial assumptions at every layer. Future projects should design with clear separation of concerns from day one so that architectural pivots affect one module, not all of them.",
      },
      {
        num: "06",
        title: "Test Third-Party APIs Early and in Parallel",
        body: "We underestimated the time required to get access to production/sandbox APIs (Yellow Card, Twilio WhatsApp Business). These should be applied for on Day 1, with mock implementations built in parallel so the rest of the team is not blocked.",
      },
    ];

    lessons.forEach((l, i) => {
      const col = i % 3, row = Math.floor(i / 2);
      const x = 0.35 + col * 3.1, y = 1.48 + row * 1.75;
      card(s, x, y, 2.9, 1.58, C.offWhite);
      s.addText(l.num, { x: x + 0.15, y: y + 0.1, w: 0.6, h: 0.42, fontSize: 22, bold: true, color: C.lime, fontFace: "Calibri", margin: 0 });
      s.addText(l.title, { x: x + 0.15, y: y + 0.52, w: 2.62, h: 0.38, fontSize: 11, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });
      s.addText(l.body, { x: x + 0.15, y: y + 0.93, w: 2.62, h: 0.6, fontSize: 9, color: C.textMed, fontFace: "Calibri", valign: "top", margin: 0 });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 15 — FUTURE IMPROVEMENTS
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    sectionLabel(s, "Future Improvements");
    slideTitle(s, "Gridee v2.0 — What Comes Next");

    const improvements = [
      {
        phase: "Near-Term",
        phaseColor: C.mid,
        items: [
          { title: "Real IoT Meter Integration", body: "Connect physical smart meters via MQTT or LoRaWAN. The HAL is already designed for this — only the RealSmartMeter class needs to be written and registered." },
          { title: "Automated Meter Sync", body: "Real-time consumption deduction triggered by actual hardware readings rather than a simulated cron job." },
        ]
      },
      {
        phase: "Medium-Term",
        phaseColor: C.lime,
        items: [
          { title: "P2P Energy Trading", body: "Allow tenants within the same compound to trade unused GRD tokens with each other, creating an internal energy market." },
          { title: "Landlord Analytics Dashboard", body: "A web dashboard showing revenue earned per property, per tenant, and per month. Token price history and energy usage trends." },
        ]
      },
      {
        phase: "Long-Term",
        phaseColor: C.dark,
        items: [
          { title: "AI Energy Insights", body: "AI-powered monthly cost prediction based on historical consumption. Personalised recommendations for tenants on when to top up." },
          { title: "Multi-Chain Expansion", body: "Deploy on Celo for additional Africa-specific integrations (Kotani Pay, mobile money rails). Possibly USDC on multiple chains via Circle's CCTP bridge." },
        ]
      }
    ];

    improvements.forEach((group, gi) => {
      const x = 0.4 + gi * 3.1;

      // Phase header
      s.addShape("rect", { x, y: 1.48, w: 2.9, h: 0.38, fill: { color: group.phaseColor }, line: { width: 0 } });
      s.addText(group.phase, { x, y: 1.48, w: 2.9, h: 0.38, fontSize: 12, bold: true, color: group.phaseColor === C.lime ? C.dark : C.white, align: "center", valign: "middle", fontFace: "Calibri", margin: 0 });

      group.items.forEach((item, ii) => {
        const y = 1.95 + ii * 1.68;
        card(s, x, y, 2.9, 1.55, C.offWhite);
        s.addShape("rect", { x, y, w: 2.9, h: 0.07, fill: { color: group.phaseColor }, line: { width: 0 } });
        s.addText(item.title, { x: x + 0.15, y: y + 0.14, w: 2.62, h: 0.38, fontSize: 11, bold: true, color: C.forest, fontFace: "Calibri", margin: 0 });
        s.addText(item.body, { x: x + 0.15, y: y + 0.55, w: 2.62, h: 0.94, fontSize: 9.5, color: C.textMed, fontFace: "Calibri", valign: "top", margin: 0 });
      });
    });
  }

  // ════════════════════════════════════════════════════════════════
  // SLIDE 16 — CONCLUSION
  // ════════════════════════════════════════════════════════════════
  {
    const s = pres.addSlide();
    s.background = { color: C.dark };

    // Lime left bar
    s.addShape("rect", { x: 0, y: 0, w: 0.18, h: 5.625, fill: { color: C.lime }, line: { width: 0 } });

    s.addText("Conclusion", {
      x: 0.5, y: 0.4, w: 4, h: 0.35,
      fontSize: 10, bold: true, color: "66BB88", charSpacing: 3, fontFace: "Calibri", margin: 0,
    });

    s.addText("Gridee is production-ready\nWeb3 infrastructure.", {
      x: 0.5, y: 0.85, w: 6.5, h: 1.55,
      fontSize: 38, bold: true, color: C.white, fontFace: "Calibri", margin: 0, lineSpacingMultiple: 1.2,
    });

    s.addText("By combining self-custodial wallets with a familiar WhatsApp interface, we have built a scalable, transparent, and genuinely useful platform for the future of energy management in Nigeria.", {
      x: 0.5, y: 2.55, w: 6.3, h: 1.05,
      fontSize: 13.5, color: "AAFFCC", fontFace: "Calibri", valign: "top", margin: 0,
    });

    // 4 takeaway pills
    const takeaways = [
      "Real problem. Real users.",
      "Blockchain does the work invisibly.",
      "Ready for real smart meters.",
      "Built to scale.",
    ];
    takeaways.forEach((t, i) => {
      s.addShape("rect", { x: 0.5, y: 3.75 + i * 0.37, w: 4.0, h: 0.3, fill: { color: C.forest }, line: { color: C.lime, width: 0.5 } });
      s.addText(t, { x: 0.6, y: 3.75 + i * 0.37, w: 3.8, h: 0.3, fontSize: 10.5, color: C.lime, bold: true, fontFace: "Calibri", valign: "middle", margin: 0 });
    });

    // Right: Stats summary box
    card(s, 7.0, 1.15, 2.65, 4.1, C.forest);
    s.addText("Built With", { x: 7.15, y: 1.28, w: 2.35, h: 0.3, fontSize: 11, bold: true, color: C.lime, fontFace: "Calibri", margin: 0 });

    const builtWith = [
      "Base Blockchain (L2)",
      "USDC Stablecoin",
      "Turnkey Wallets (TEE)",
      "Yellow Card On/Off-Ramp",
      "Flutterwave NGN Collection",
      "Twilio WhatsApp Business",
      "Africa's Talking USSD + SMS",
      "Termii SMS Fallback",
      "Node.js + TypeScript",
      "PostgreSQL + Redis",
      "Hardhat + ethers.js v6",
    ];
    builtWith.forEach((item, i) => {
      s.addText("• " + item, { x: 7.15, y: 1.65 + i * 0.32, w: 2.4, h: 0.28, fontSize: 9.5, color: "AAFFCC", fontFace: "Calibri", margin: 0 });
    });

    // Footer
    s.addText("Thank you  ·  Web3Bridge 2025  ·  Team Gridee", {
      x: 0.5, y: 5.25, w: 9, h: 0.25,
      fontSize: 9.5, color: "336644", align: "center", fontFace: "Calibri", italic: true, margin: 0,
    });
  }

  // ─── WRITE ───────────────────────────────────────────────────────────────
  const out = "/home/claude/gridee-deck/Gridee_Presentation.pptx";
  await pres.writeFile({ fileName: out });
  console.log("✅ Written:", out);
}

build().catch(err => { console.error(err); process.exit(1); });

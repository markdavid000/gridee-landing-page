import "./index.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhoWeAre from "./components/WhoWeAre";
import Problem from "./components/Problem";
import WhyChoose from "./components/WhyChoose";
import InterfacePreview from "./components/InterfacePreview";
import HowItWorks from "./components/HowItWorks";
// import TokenEconomics from "./components/TokenEconomics";
import DualAudience from "./components/DualAudience";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-white font-sans text-slate-900 overflow-x-hidden">
      {/* ── Unchanged from original ── */}
      <Navbar />
      <Hero />

      {/* ── New Gridee sections — same aesthetic ── */}
      <WhoWeAre />
      <Problem />
      <WhyChoose />
      <InterfacePreview />
      <HowItWorks />
      {/* <TokenEconomics /> */}
      <DualAudience />

      {/* ── Unchanged from original ── */}
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

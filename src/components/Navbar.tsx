import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "About", href: "#about" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Services", href: "#services" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4">
      <nav
        className={`max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 rounded-full transition-all duration-300 ${
          scrolled
            ? "bg-white shadow-xl border border-gray-100"
            : "glass-effect shadow-lg"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary text-black font-bold text-[20px] rounded-full flex items-center justify-center icon-3d">
            G
          </div>
          <span
            className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-slate-900" : "text-white"
            }`}
          >
            Gridee
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium text-sm">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-slate-700" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* CTA + mobile hamburger */}
        <div className="flex items-center gap-3">
          <a
            href="https://api.whatsapp.com/send/?phone=%2B14155238886&text=join+book-entire&type=phone_number&app_absent=0"
            target="_blank"
            className="hidden md:block bg-primary text-black px-4 sm:px-6 py-2 rounded-full font-bold text-xs sm:text-sm hover:scale-105 transition-transform icon-3d"
          >
            Get Started
          </a>
          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-slate-900" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-slate-900" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                scrolled ? "bg-slate-900" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden mx-3 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[330px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-4 text-sm font-semibold text-slate-700 hover:bg-surface hover:text-primary border-b border-gray-50 last:border-0 transition-colors"
          >
            {l.label}
          </a>
        ))}
        {/* <button className="bg-primary text-black px-4 sm:px-6 py-4 w-[300px] rounded-full font-bold text-xs sm:text-sm hover:scale-105 transition-transform icon-3d">
          Get Started
        </button> */}
      </div>
    </header>
  );
}

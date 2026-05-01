export default function Footer() {
  return (
    <footer className="relative py-20 px-6 bg-[#0a0c0c] text-white">
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden
      >
        <span
          className="text-white font-bold whitespace-nowrap"
          style={{
            fontSize: "clamp(48px, 12vw, 160px)",
            opacity: 0.03,
            letterSpacing: "0.3em",
            rotate: "-10deg",
          }}
        >
          SOLAR ENERGY
        </span>
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary text-black font-bold text-[20px] rounded-full flex items-center justify-center icon-3d">
                G
              </div>
              <span className="text-xl font-bold tracking-tight">Gridee</span>
            </div>
            <p className="text-gray-400 max-w-xs mb-8 leading-relaxed">
              Powering Tomorrow Today. Nigeria's leading decentralised solar
              energy platform — built on blockchain, delivered on WhatsApp.
            </p>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h6 className="font-bold mb-6">Quick Links</h6>
            <ul className="space-y-4 text-sm">
              {['About Us', 'How It Works', 'Services', 'Tokenomics', 'Testimonials', 'Contact'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Services */}
          {/* <div>
            <h6 className="font-bold mb-6">Services</h6>
            <ul className="space-y-4 text-sm">
              {['Landlord Registration', 'Tenant Tokens', 'USSD Access', 'WhatsApp Bot', 'Revenue Share', 'Smart Metering'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Legal */}
          {/* <div>
            <h6 className="font-bold mb-6">Legal</h6>
            <ul className="space-y-4 text-sm">
              {['Privacy Policy', 'Terms of Service', 'NDPR Compliance', 'CBN Guidelines', 'Cookie Settings'].map((l) => (
                <li key={l}>
                  <a href="#" className="text-gray-400 hover:text-primary transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div> */}
        </div>

        {/* Bottom bar */}
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Gridee · All rights reserved
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <span className="text-gray-500">EVM · ERC-20</span>
            {/* <span className="text-gray-500">NDPR Compliant</span> */}
          </div>
          <div className="flex gap-4">
            {["𝕏", "f", "in"].map((icon) => (
              <div
                key={icon}
                className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary hover:text-black transition-colors cursor-pointer text-gray-400 text-sm"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

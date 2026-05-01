import { useReveal } from '../hooks/useReveal'

export default function WhoWeAre() {
  const ref = useReveal()

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="py-20 bg-white border-b border-gray-100" id="about">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Tag */}
          <div className="md:w-64 flex-shrink-0 reveal">
            <span className="inline-block bg-primary text-black text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
              Who We Are
            </span>
          </div>

          {/* Body text — editorial, no heading */}
          <div className="flex-1 reveal delay-100">
            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium max-w-3xl">
              We are Nigeria's first decentralised solar energy access platform — connecting landlords
              who have solar infrastructure with tenants who need reliable, affordable power. Everything
              is managed via WhatsApp or USSD. No new apps. No learning curve. No jargon.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mt-6 max-w-2xl">
              Landlords register their compounds, share a Property Code, and earn a revenue share on
              every kWh their tenants purchase. Tenants buy Gridee tokens (GRD) in Naira — via bank
              transfer, OPay, or crypto — and power their flats instantly. All blockchain complexity
              is hidden. You only ever see tokens, naira, and hours of power.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

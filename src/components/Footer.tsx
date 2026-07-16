export default function Footer() {
  return (
    <footer className="bg-ink border-t border-line/10 py-12 md:py-16 text-[#FAF8F4]/60 text-xs font-sans mt-12">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        
        {/* Equal Housing Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-line/10 pb-10">
          <div className="md:col-span-3 flex flex-col gap-4">
            {/* Equal Housing Logo Drawing */}
            <div className="flex items-center gap-3">
              <svg className="w-12 h-12 text-[#FAF8F4]/80" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="44" height="44" rx="4" stroke="currentColor" strokeWidth="2.5" />
                {/* House roof */}
                <path d="M12 28V20L24 10L36 20V28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                {/* Equal symbol inside house */}
                <path d="M18 20H30M18 24H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
              <div className="flex flex-col">
                <span className="font-bold text-white tracking-widest text-[10px] uppercase font-mono">EQUAL HOUSING</span>
                <span className="text-white font-extrabold tracking-widest text-xs uppercase font-sans">OPPORTUNITY</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-9 space-y-3 font-sans text-[11px] leading-relaxed">
            <p>
              <strong>Equal Housing Opportunity Statement:</strong> We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Nation. We encourage and support an affirmative advertising and marketing program in which there are no barriers to obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.
            </p>
            <p>
              All properties are subject to prior sale, change, or withdrawal. Neither Beachfront Realty nor Konrad Schultz shall be held responsible for any typographical errors, misinformation, or misprints. Real estate listings held by other brokerage firms are marked with the IDX logo.
            </p>
          </div>
        </div>

        {/* Fiduciary and Statutory Disclaimers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-[11px] leading-relaxed text-[#FAF8F4]/50">
          <div className="space-y-2">
            <h5 className="font-bold text-white font-mono uppercase tracking-wider text-[10px]">
              Fiduciary & Statutory Underwriting Disclaimers
            </h5>
            <p>
              <strong>Not Legal or Financial Advice:</strong> The calculations, risk ratios, opportunity scores, and AI-generated assessments parsed by Brickell Property Intelligence are simulated models prepared for general informational purposes. Underwriting analyses do not represent guaranteed equity performance or tax outcomes. Standard Subject-To mortgage assumptions, wrapping, or creative finance convey intrinsic risk of acceleration under lender "due on sale" clauses. Past performance is not indicative of future returns.
            </p>
            <p>
              All transaction participants are strongly advised to seek legal counsel under Florida Statute Chapter 718 (Condominiums), Dodd-Frank Consumer Protection provisions, and the Garn-St. Germain Depository Institutions Act of 1982 prior to executing contract addendums.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h5 className="font-bold text-white font-mono uppercase tracking-wider text-[10px] mb-2">
                Brokerage Licensure & Regulatory Oversight
              </h5>
              <p>
                Brickell Property Intelligence is an educational and analytical underwriting application operated by 
                <strong> Konrad Schultz</strong>, a Licensed Florida Real Estate Associate (License #3188541, Active), in association with 
                <strong> Beachfront Realty Brokerage Office</strong>, Miami-Dade, FL. Any contracts drafted or negotiated are subject to managing broker oversight and legal clearance.
              </p>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-[10px] font-mono">
              <span className="text-[#FAF8F4]/40">© 2026 Brickell Property Intelligence.</span>
              <span className="text-brass">Active Florida License: 3188541</span>
              <span className="text-white">Powered by Gemini 3.5 Server-Side Engine</span>
            </div>
          </div>
        </div>

        {/* Links bar */}
        <div className="border-t border-line/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-[#FAF8F4]/30">
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="#property-explorer" className="hover:text-white transition-colors">Buildings</a>
            <a href="#rate-simulator" className="hover:text-white transition-colors">Rate Analyzer</a>
            <a href="#deal-calculator" className="hover:text-white transition-colors">Calculator</a>
            <a href="#ai-parser" className="hover:text-white transition-colors">AI Assistant</a>
            <a href="#lead-form" className="hover:text-white transition-colors">Broker Desk</a>
          </div>
          <div>
            All rights reserved. Beachfront Realty, LLC.
          </div>
        </div>

      </div>
    </footer>
  );
}

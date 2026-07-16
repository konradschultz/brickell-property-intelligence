import { UserCheck } from "lucide-react";

interface HeaderHeroProps {
  viewMode: "underwriter" | "portfolio";
  setViewMode: (v: "underwriter" | "portfolio") => void;
}

export default function HeaderHero({ viewMode, setViewMode }: HeaderHeroProps) {
  const scrollToSection = (id: string) => {
    if (viewMode !== "underwriter") {
      setViewMode("underwriter");
      // Wait for React to re-render underwriter workspace before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className="w-full">
      {/* 2026 Floating Market Indicator Strip */}
      <div className="bg-ink text-surface border-b border-line px-4 py-2 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
            <span className="flex items-center gap-1.5 font-medium text-[#FAF8F4]/90">
              <span className="h-2 w-2 rounded-full bg-brass animate-pulse"></span>
              FL Brokerage Association: <strong className="text-white font-semibold">3188541 (Active)</strong>
            </span>
            <span className="hidden md:inline text-line/40">|</span>
            <span className="text-[#FAF8F4]/80">
              10-Yr Treasury: <strong className="text-brass font-bold">4.25%</strong>
            </span>
            <span className="hidden md:inline text-line/40">|</span>
            <span className="text-[#FAF8F4]/80">
              Projected 2026 Mortgage Range: <strong className="text-brass font-bold">5.70% - 6.40%</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#FAF8F4]/60">
            <span className="px-2 py-0.5 rounded bg-bay/20 text-brass border border-brass/30 font-semibold text-[10px] tracking-wide">
              SB-4 Condo Compliance Active
            </span>
            <span className="hidden sm:inline">Local Time: 2026-07-16 UTC</span>
          </div>
        </div>
      </div>

      {/* Sticky Top Nav */}
      <nav id="sticky-nav" className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-line shadow-sm px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo Brand left */}
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif italic text-lg md:text-xl font-bold text-ink">Brickell</span>
                <span className="font-sans font-extrabold tracking-widest text-xs text-brass uppercase pt-0.5">
                  Property Intelligence
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono tracking-tight uppercase">
                Licensed FL Real Estate Opportunity Engine
              </span>
            </div>
          </div>

          {/* Nav Links center */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-ink/80">
            <button
              onClick={() => scrollToSection("property-explorer")}
              className="hover:text-bay transition-colors cursor-pointer font-semibold uppercase tracking-wider"
            >
              Buildings
            </button>
            <button
              onClick={() => scrollToSection("rate-simulator")}
              className="hover:text-bay transition-colors cursor-pointer font-semibold uppercase tracking-wider"
            >
              Rate Simulator
            </button>
            <button
              onClick={() => scrollToSection("deal-calculator")}
              className="hover:text-bay transition-colors cursor-pointer font-semibold uppercase tracking-wider"
            >
              Deal Calculator
            </button>
            <button
              onClick={() => scrollToSection("ai-parser")}
              className="hover:text-bay transition-colors cursor-pointer font-semibold uppercase tracking-wider"
            >
              AI Underwriter
            </button>
            <button
              onClick={() => scrollToSection("lead-form")}
              className="hover:text-bay transition-colors cursor-pointer font-semibold uppercase tracking-wider"
            >
              Contact
            </button>
          </div>

          {/* Toggle Tab Button right (View mode) */}
          <div className="flex items-center gap-1 p-1 bg-surface border border-line rounded-lg">
            <button
              id="nav-tab-underwriter"
              onClick={() => setViewMode("underwriter")}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer ${
                viewMode === "underwriter"
                  ? "bg-ink text-white shadow-sm"
                  : "text-slate-500 hover:text-ink"
              }`}
            >
              Workspace
            </button>
            <button
              id="nav-tab-portfolio"
              onClick={() => setViewMode("portfolio")}
              className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center gap-1 ${
                viewMode === "portfolio"
                  ? "bg-ink text-white shadow-sm"
                  : "text-slate-500 hover:text-ink"
              }`}
            >
              Resources
              <span className="bg-brass/20 text-brass text-[9px] px-1.5 py-0.5 rounded font-mono font-bold">
                QMD
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Editorial Hero Section */}
      <header className="relative bg-gradient-to-br from-ink via-[#11354A] to-[#1D5675] text-surface overflow-hidden py-16 md:py-24 px-6">
        {/* Subtle architectural overlay mesh using grid */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#FAF8F4_1px,transparent_1px),linear-gradient(to_bottom,#FAF8F4_1px,transparent_1px)] bg-[size:40px_40px]"></div>

        <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
              <span className="h-1.5 w-1.5 rounded-full bg-brass"></span>
              <span className="text-[10px] font-bold tracking-widest text-[#FAF8F4] uppercase font-mono">
                Miami-Dade Underwriting Workspace · v3.0
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-tight leading-[1.1]">
              Know which Brickell buildings are opportunities—
              <span className="italic text-brass block mt-1">before the market does.</span>
            </h1>

            <p className="text-[#FAF8F4]/80 text-base md:text-lg max-w-2xl leading-relaxed font-sans">
              Data-driven condo investment analysis for the Miami-Dade real estate sector. 
              Formulated under the post-Surfside safety bill guidelines (SB-4) to segment, 
              score, and underwrite distressed assets using state-of-the-art predictive metrics.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button
                onClick={() => scrollToSection("property-explorer")}
                className="px-6 py-3 bg-brass hover:bg-brass/90 text-white font-semibold rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Analyze a Building
              </button>
              <button
                onClick={() => scrollToSection("rate-simulator")}
                className="px-6 py-3 bg-white/15 hover:bg-white/25 border border-white/20 text-white font-semibold rounded-lg text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                How scoring works
              </button>
            </div>
          </div>

          {/* Credential strip side block */}
          <div className="lg:col-span-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-brass/25 rounded-xl text-brass border border-brass/40 shadow-sm">
                <UserCheck className="h-6 w-6 text-brass" />
              </div>
              <div>
                <span className="text-[10px] text-slate-300 font-mono uppercase tracking-widest block">
                  Licensed Professional
                </span>
                <h4 className="text-base font-bold text-white font-sans leading-snug">
                  Konrad Schultz
                </h4>
                <p className="text-xs text-brass font-medium">
                  FL License #3188541 (Active)
                </p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2.5 text-xs text-[#FAF8F4]/90 font-sans">
              <div className="flex justify-between">
                <span className="text-[#FAF8F4]/50">Brokerage Office</span>
                <span className="font-semibold text-white">Beachfront Realty</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FAF8F4]/50">Broker Email</span>
                <span className="font-mono text-white text-[11px]">konrad.schultz001@mymdc.net</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#FAF8F4]/50">Coverage Area</span>
                <span className="font-semibold text-white">Miami-Dade County, FL</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

import { useState, useMemo } from "react";
import { 
  Building2, 
  MapPin, 
  Search, 
  Flame, 
  Coins, 
  ShieldCheck, 
  AlertTriangle 
} from "lucide-react";
import { BrickellTower, PropertyLead } from "../types";

interface BuildingExplorerProps {
  activeStrategy: "hunter" | "farmer";
  setActiveStrategy: (s: "hunter" | "farmer") => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTower: BrickellTower;
  setSelectedTower: (t: BrickellTower) => void;
  selectedLead: PropertyLead;
  setSelectedLead: (l: PropertyLead) => void;
  filteredTowers: BrickellTower[];
  filteredLeads: PropertyLead[];
}

export default function BuildingExplorer({
  activeStrategy,
  setActiveStrategy,
  searchQuery,
  setSearchQuery,
  selectedTower,
  setSelectedTower,
  selectedLead,
  setSelectedLead,
  filteredTowers,
  filteredLeads,
}: BuildingExplorerProps) {
  // Local filter states
  const [recertFilter, setRecertFilter] = useState<string>("all");
  const [scoreFilter, setScoreFilter] = useState<string>("all");

  // Apply extra filters to filteredTowers
  const fullyFilteredTowers = useMemo(() => {
    return filteredTowers.filter((tower) => {
      const recertMatch = recertFilter === "all" || tower.recertificationStatus.toLowerCase() === recertFilter.toLowerCase();
      const scoreMatch =
        scoreFilter === "all" ||
        (scoreFilter === "high" && tower.healthScore >= 80) ||
        (scoreFilter === "distressed" && tower.healthScore < 50);
      return recertMatch && scoreMatch;
    });
  }, [filteredTowers, recertFilter, scoreFilter]);

  // Apply extra filters to filteredLeads
  const fullyFilteredLeads = useMemo(() => {
    return filteredLeads.filter((lead) => {
      const isPreForeclosure = lead.lisPendensMortgage || lead.lisPendensHOA;
      const recertMatch = recertFilter === "all" || (recertFilter === "distressed" && isPreForeclosure);
      const scoreMatch =
        scoreFilter === "all" ||
        (scoreFilter === "high" && lead.ownerTenureYears >= 10) ||
        (scoreFilter === "distressed" && isPreForeclosure);
      return recertMatch && scoreMatch;
    });
  }, [filteredLeads, recertFilter, scoreFilter]);

  // Brass Ring Gauge for Opportunity Score
  const renderRingGauge = (score: number) => {
    const radius = 22;
    const strokeWidth = 4;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    // Opportunity color categorization
    const strokeColor = score >= 80 ? "stroke-sage" : score >= 50 ? "stroke-brass" : "stroke-coral";
    const bgRingColor = "stroke-line/50";
    const scoreColorClass = score >= 80 ? "text-sage" : score >= 50 ? "text-brass" : "text-coral";

    return (
      <div className="flex flex-col items-center shrink-0">
        <div className="relative h-14 w-14 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 54 54">
            <circle
              cx="27"
              cy="27"
              r={radius}
              className={`${bgRingColor}`}
              strokeWidth={strokeWidth}
              fill="transparent"
            />
            <circle
              cx="27"
              cy="27"
              r={radius}
              className={`${strokeColor} transition-all duration-500`}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <span className={`absolute font-mono font-bold text-xs ${scoreColorClass}`}>
            {score}
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1 font-mono">OPP SCORE</span>
      </div>
    );
  };

  return (
    <section id="property-explorer" className="space-y-6">
      {/* Tab Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-1.5 bg-surface border border-line rounded-xl">
        <button
          id="tab-strategy-hunter"
          onClick={() => {
            setActiveStrategy("hunter");
            setSearchQuery("");
            setRecertFilter("all");
            setScoreFilter("all");
          }}
          className={`flex items-center justify-center gap-3 py-3.5 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
            activeStrategy === "hunter"
              ? "bg-ink text-white font-bold shadow-md"
              : "text-slate-500 hover:text-ink hover:bg-white/50"
          }`}
        >
          <Flame className="h-4 w-4 text-brass" />
          <div className="text-left">
            <div className="font-bold text-xs uppercase tracking-wider">Acquisition Opportunities</div>
            <div className="text-[10px] opacity-80 font-normal">Assessment-Impacted High-Rise Condos</div>
          </div>
        </button>

        <button
          id="tab-strategy-farmer"
          onClick={() => {
            setActiveStrategy("farmer");
            setSearchQuery("");
            setRecertFilter("all");
            setScoreFilter("all");
          }}
          className={`flex items-center justify-center gap-3 py-3.5 rounded-lg font-medium transition-all duration-300 cursor-pointer ${
            activeStrategy === "farmer"
              ? "bg-ink text-white font-bold shadow-md"
              : "text-slate-500 hover:text-ink hover:bg-white/50"
          }`}
        >
          <Coins className="h-4 w-4 text-brass" />
          <div className="text-left">
            <div className="font-bold text-xs uppercase tracking-wider">Income & Stability Portfolio</div>
            <div className="text-[10px] opacity-80 font-normal">Little Havana Multifamily Section 8 Hub</div>
          </div>
        </button>
      </div>

      {/* Explorer Content Base Card */}
      <div className="bg-card border border-line rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h3 className="text-lg font-serif text-ink font-bold flex items-center gap-2">
              <Building2 className="h-5 w-5 text-bay" />
              {activeStrategy === "hunter" ? "Brickell High-Rise Directory" : "Multifamily Asset Directory"}
            </h3>
            <p className="text-xs text-slate-500">
              {activeStrategy === "hunter"
                ? "Scored condo towers subject to SB-4 regulatory structural liabilities"
                : "Qualified high-yield low-basis rental properties with Section 8 HUD parameters"}
            </p>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 bg-surface border border-line rounded text-slate-600">
            {activeStrategy === "hunter"
              ? `${fullyFilteredTowers.length} of ${filteredTowers.length} Buildings`
              : `${fullyFilteredLeads.length} of ${filteredLeads.length} Leads`}
          </span>
        </div>

        {/* Filter & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Field */}
          <div className="relative md:col-span-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="property-search-input"
              type="text"
              placeholder={
                activeStrategy === "hunter"
                  ? "Search by building name or address..."
                  : "Search by address or neighborhood..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-line rounded-lg text-xs text-ink placeholder:text-slate-400 focus:outline-none focus:border-bay focus:ring-1 focus:ring-bay transition-all"
            />
          </div>

          {/* Recertification Filter */}
          <div className="md:col-span-3">
            <select
              value={recertFilter}
              onChange={(e) => setRecertFilter(e.target.value)}
              className="w-full bg-white border border-line rounded-lg px-2.5 py-2 text-xs text-ink focus:outline-none focus:border-bay"
            >
              <option value="all">Status: All</option>
              {activeStrategy === "hunter" ? (
                <>
                  <option value="looming">Status: Looming</option>
                  <option value="in-progress">Status: In-Progress</option>
                  <option value="overdue">Status: Overdue</option>
                  <option value="completed">Status: Completed</option>
                </>
              ) : (
                <>
                  <option value="distressed">Status: Distressed / Pre-Foreclosure</option>
                </>
              )}
            </select>
          </div>

          {/* Opportunity score range Filter */}
          <div className="md:col-span-3">
            <select
              value={scoreFilter}
              onChange={(e) => setScoreFilter(e.target.value)}
              className="w-full bg-white border border-line rounded-lg px-2.5 py-2 text-xs text-ink focus:outline-none focus:border-bay"
            >
              <option value="all">Opportunity: All</option>
              <option value="high">Premium (High Score / Tenure)</option>
              <option value="distressed">Assessment Risk / High Default</option>
            </select>
          </div>
        </div>

        {/* Directory Grid View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[520px] overflow-y-auto pr-1">
          {activeStrategy === "hunter" ? (
            fullyFilteredTowers.length > 0 ? (
              fullyFilteredTowers.map((tower) => {
                const isSelected = selectedTower.id === tower.id;
                const recertBadgeColor =
                  tower.recertificationStatus === "Looming" || tower.recertificationStatus === "Overdue"
                    ? "bg-coral/10 text-coral border-coral/25"
                    : tower.recertificationStatus === "In-Progress"
                    ? "bg-brass/10 text-brass border-brass/25"
                    : "bg-sage/10 text-sage border-sage/25";

                return (
                  <div
                    key={tower.id}
                    id={`tower-card-${tower.id}`}
                    onClick={() => setSelectedTower(tower)}
                    className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                      isSelected
                        ? "bg-surface border-ink ring-1 ring-ink shadow-md"
                        : "bg-white border-line hover:border-slate-400 hover:shadow-sm"
                    }`}
                  >
                    <div>
                      {/* Architectural Vector header */}
                      <div className="w-full h-16 bg-gradient-to-r from-ink/90 to-bay/80 relative rounded-lg overflow-hidden mb-3 border border-line/40">
                        <svg className="absolute bottom-0 left-0 w-full h-12 opacity-15 text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
                          <rect x="10" y="30" width="10" height="70" fill="currentColor" />
                          <rect x="25" y="10" width="16" height="90" fill="currentColor" />
                          <rect x="46" y="50" width="8" height="50" fill="currentColor" />
                          <rect x="58" y="20" width="14" height="80" fill="currentColor" />
                          <rect x="76" y="40" width="15" height="60" fill="currentColor" />
                        </svg>
                        <div className="absolute top-2 left-3 text-[8px] font-mono tracking-widest text-[#FAF8F4]/80">
                          BUILT {tower.builtYear}
                        </div>
                        <div className="absolute bottom-2 left-3 text-[#FAF8F4] font-serif italic text-xs">
                          Brickell Corridor High-Rise
                        </div>
                      </div>

                      <div className="flex justify-between items-start gap-3 mb-2">
                        <div>
                          <h4 className="font-bold text-ink text-sm font-sans line-clamp-1">
                            {tower.name}
                          </h4>
                          <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                            <MapPin className="h-3 w-3 shrink-0 text-slate-400" /> {tower.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-end pt-3 border-t border-line mt-3">
                      <div className="space-y-1.5">
                        <div className="text-[9px] text-slate-400 uppercase font-mono">Recertification</div>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-semibold border ${recertBadgeColor}`}>
                          {tower.recertificationStatus}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-slate-400 uppercase font-mono block">Liability</span>
                        <span className="font-mono text-xs font-bold text-coral">
                          {tower.assessmentAmount > 0 ? `$${tower.assessmentAmount.toLocaleString()}` : "Fully Funded"}
                        </span>
                      </div>
                      {renderRingGauge(tower.healthScore)}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-2 text-center py-12 text-slate-400 text-xs border border-dashed border-line rounded-xl">
                No luxury towers matching your active search/filter guidelines.
              </div>
            )
          ) : fullyFilteredLeads.length > 0 ? (
            fullyFilteredLeads.map((lead) => {
              const isSelected = selectedLead.id === lead.id;
              const isPreForeclosure = lead.lisPendensMortgage || lead.lisPendensHOA;
              const dynamicScore = lead.ownerTenureYears >= 10 ? 88 : 45;

              return (
                <div
                  key={lead.id}
                  id={`lead-card-${lead.id}`}
                  onClick={() => setSelectedLead(lead)}
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                    isSelected
                      ? "bg-surface border-ink ring-1 ring-ink shadow-md"
                      : "bg-white border-line hover:border-slate-400 hover:shadow-sm"
                  }`}
                >
                  <div>
                    {/* Architectural Vector header */}
                    <div className="w-full h-16 bg-gradient-to-r from-ink/90 to-brass/70 relative rounded-lg overflow-hidden mb-3 border border-line/40">
                      <svg className="absolute bottom-0 left-0 w-full h-12 opacity-15 text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <rect x="5" y="50" width="20" height="50" fill="currentColor" />
                        <rect x="30" y="40" width="25" height="60" fill="currentColor" />
                        <rect x="60" y="55" width="18" height="45" fill="currentColor" />
                        <rect x="82" y="30" width="15" height="70" fill="currentColor" />
                      </svg>
                      <div className="absolute top-2 left-3 text-[8px] font-mono tracking-widest text-[#FAF8F4]/80">
                        TENURE {lead.ownerTenureYears} YEARS
                      </div>
                      <div className="absolute bottom-2 left-3 text-[#FAF8F4] font-serif italic text-xs">
                        Little Havana Residential Multi-family
                      </div>
                    </div>

                    <div className="flex justify-between items-start gap-3 mb-2">
                      <div>
                        <h4 className="font-bold text-ink text-sm font-sans line-clamp-1">
                          {lead.address}
                        </h4>
                        <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="h-3 w-3 shrink-0 text-slate-400" /> {lead.neighborhood} • {lead.units}-Units
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {isPreForeclosure && (
                        <span className="text-[9px] bg-coral/10 text-coral border border-coral/20 px-2 py-0.5 rounded font-mono font-medium">
                          Pre-Foreclosure (Lis Pendens)
                        </span>
                      )}
                      {lead.isOpportunityZone && (
                        <span className="text-[9px] bg-bay/10 text-bay border border-bay/20 px-2 py-0.5 rounded font-mono font-medium">
                          Opportunity Zone
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-end pt-3 border-t border-line mt-3">
                    <div className="space-y-1.5">
                      <div className="text-[9px] text-slate-400 uppercase font-mono">Assumable Rate</div>
                      <span className="font-mono text-xs font-semibold text-ink">
                        {lead.currentLoanRate ? `${lead.currentLoanRate}% Fixed` : "N/A"}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] text-slate-400 uppercase font-mono block">FMR Rental Income</span>
                      <span className="font-mono text-xs font-bold text-sage">
                        ${lead.section8FMR}/mo
                      </span>
                    </div>
                    {renderRingGauge(dynamicScore)}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-2 text-center py-12 text-slate-400 text-xs border border-dashed border-line rounded-xl">
              No residential multifamilies matching your criteria.
            </div>
          )}
        </div>

        {/* Informational Regulation/Context Panel */}
        <div className="border-t border-line pt-4 flex flex-col sm:flex-row items-start gap-4 text-xs">
          <div className="p-3 bg-[#FAF8F4] border border-[#E4DED2] rounded-xl text-ink leading-relaxed">
            {activeStrategy === "hunter" ? (
              <>
                <div className="flex items-center gap-1.5 text-coral font-bold uppercase text-[10px] tracking-wider mb-1">
                  <AlertTriangle className="h-4 w-4 text-coral" />
                  Regulatory Milestone Inspection SB-4
                </div>
                <p className="text-[11px] text-slate-600">
                  SB-4 mandates full structural inspections for multi-story residential towers older than 30 years. 
                  Unfunded concrete and seawall restoration triggers substantial special board assessments, motivating individual condo owners to sell. This forms the strategic backdrop for <strong>Assessment Arbitrage</strong> opportunities.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5 text-sage font-bold uppercase text-[10px] tracking-wider mb-1">
                  <ShieldCheck className="h-4 w-4 text-sage" />
                  Guaranteed Rental Yield (HUD Section 8)
                </div>
                <p className="text-[11px] text-slate-600">
                  With mortgage rates peaking in the 2026 economic landscape, traditional buy-and-holds faces negative margins. 
                  By targeting low-cost multifamilies from tired property landlords and qualifying them for HUD rent voucher payments, 
                  you unlock reliable government-backed returns.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

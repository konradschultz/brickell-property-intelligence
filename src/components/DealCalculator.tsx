import { 
  Calculator, 
  SlidersHorizontal, 
  ShieldCheck, 
  CheckSquare, 
  Square 
} from "lucide-react";

interface DealCalculatorProps {
  activeStrategy: "hunter" | "farmer";
  customARV: number;
  setCustomARV: (v: number) => void;
  customPurchase: number;
  setCustomPurchase: (v: number) => void;
  customAssessment: number;
  setCustomAssessment: (v: number) => void;
  customLoanBalance: number;
  setCustomLoanBalance: (v: number) => void;
  customLoanRate: number;
  setCustomLoanRate: (v: number) => void;
  customMonthsBehind: number;
  setCustomMonthsBehind: (v: number) => void;
  completedSteps: Record<string, boolean>;
  toggleStep: (step: string) => void;
  calculatedMetrics: {
    reinstatementCost: number;
    equityCaptureRaw: number;
  };
}

export default function DealCalculator({
  activeStrategy,
  customARV,
  setCustomARV,
  customPurchase,
  setCustomPurchase,
  customAssessment,
  setCustomAssessment,
  customLoanBalance,
  setCustomLoanBalance,
  customLoanRate,
  setCustomLoanRate,
  customMonthsBehind,
  setCustomMonthsBehind,
  completedSteps,
  toggleStep,
  calculatedMetrics,
}: DealCalculatorProps) {
  const isFarmer = activeStrategy === "farmer";

  // Calculate Cash-to-Close
  const cashToClose = isFarmer
    ? Math.max(0, calculatedMetrics.reinstatementCost + (customPurchase - customLoanBalance))
    : Math.max(0, customPurchase - customLoanBalance);

  return (
    <section id="deal-calculator" className="bg-card border border-line rounded-2xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-ink flex items-center gap-2">
            <Calculator className="h-5 w-5 text-bay" />
            Creative Finance & Underwriting Engine
          </h3>
          <p className="text-xs text-slate-500">
            Structure complex purchase positions, Subject-To assumptions, and cash flow contingencies
          </p>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-bay/10 text-bay border border-bay/20 font-bold uppercase">
          License-Grade
        </span>
      </div>

      {/* Control Inputs */}
      <div className="bg-surface border border-line rounded-xl p-5 space-y-4">
        <h4 className="text-xs font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 font-mono">
          <SlidersHorizontal className="h-3.5 w-3.5 text-bay" />
          Deal Underwriting Parameters
        </h4>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">After Repair Value (ARV)</label>
            <input
              id="calc-input-arv"
              type="number"
              value={customARV}
              onChange={(e) => setCustomARV(parseInt(e.target.value) || 0)}
              className="w-full bg-white border border-line rounded px-3 py-1.5 text-xs text-ink font-mono font-semibold focus:outline-none focus:border-bay"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Target Purchase Price</label>
            <input
              id="calc-input-buy"
              type="number"
              value={customPurchase}
              onChange={(e) => setCustomPurchase(parseInt(e.target.value) || 0)}
              className="w-full bg-white border border-line rounded px-3 py-1.5 text-xs text-ink font-mono font-semibold focus:outline-none focus:border-bay"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Special Assessment / Rehab</label>
            <input
              id="calc-input-assessment"
              type="number"
              value={customAssessment}
              onChange={(e) => setCustomAssessment(parseInt(e.target.value) || 0)}
              className="w-full bg-white border border-line rounded px-3 py-1.5 text-xs text-ink font-mono font-semibold focus:outline-none focus:border-bay"
            />
          </div>

          {isFarmer && (
            <>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Assumable Loan Balance</label>
                <input
                  id="calc-input-loan"
                  type="number"
                  value={customLoanBalance}
                  onChange={(e) => setCustomLoanBalance(parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-line rounded px-3 py-1.5 text-xs text-ink font-mono font-semibold focus:outline-none focus:border-bay"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Assumable Interest Rate</label>
                <input
                  id="calc-input-loan-rate"
                  type="number"
                  step="0.1"
                  value={customLoanRate}
                  onChange={(e) => setCustomLoanRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white border border-line rounded px-3 py-1.5 text-xs text-ink font-mono font-semibold focus:outline-none focus:border-bay"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Months Behind (Arrears)</label>
                <input
                  id="calc-input-arrears"
                  type="number"
                  value={customMonthsBehind}
                  onChange={(e) => setCustomMonthsBehind(parseInt(e.target.value) || 0)}
                  className="w-full bg-white border border-line rounded px-3 py-1.5 text-xs text-ink font-mono font-semibold focus:outline-none focus:border-bay"
                />
              </div>
            </>
          )}
        </div>

        {/* Calculation Outputs Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-line text-xs font-sans">
          <div className="space-y-0.5">
            <span className="text-slate-400 block text-[9px] uppercase font-mono">Cash-to-Close (Estimated)</span>
            <span className="font-mono font-bold text-bay text-sm">
              ${cashToClose.toLocaleString()}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400 block text-[9px] uppercase font-mono">Arrears Reinstatement Cost</span>
            <span className="font-mono text-ink font-semibold">
              {isFarmer ? `$${Math.round(calculatedMetrics.reinstatementCost).toLocaleString()}` : "N/A (Standard purchase)"}
            </span>
          </div>

          <div className="space-y-0.5">
            <span className="text-slate-400 block text-[9px] uppercase font-mono">Projected Equity Capture</span>
            <span className={`font-mono font-bold text-sm ${calculatedMetrics.equityCaptureRaw > 0 ? "text-sage" : "text-coral"}`}>
              ${calculatedMetrics.equityCaptureRaw.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Due Diligence Checklist */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-semibold text-ink border-b border-line pb-2.5">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-5 w-5 text-bay" />
            Licensed Fiduciary Due Diligence Checklist
          </span>
          <span className="text-slate-400 font-mono text-[10px]">FL Regulatory Oversight</span>
        </div>

        <div className="space-y-2.5">
          {[
            {
              id: "dd-1",
              text: "Verify Title records for Florida Statute 718.116 joint-and-several liability COA/HOA liens.",
              desc: "Buyers inherit outstanding structural assessments immediately. Check Clerk of Courts filings prior to contract."
            },
            {
              id: "dd-2",
              text: "Assess active mortgage covenants for the standard 'Due on Sale' clause (Garn-St. Germain Act).",
              desc: "For Subject-To creative finance structures, analyze lender risk aversion postures before funding reinstatements."
            },
            {
              id: "dd-3",
              text: "Confirm Dodd-Frank Section 1411 compliance and seller-financing safe harbor parameters.",
              desc: "Ensure non-owner developer limits are strictly validated; deploy Registered Mortgage Loan Originator (RMLO) if needed."
            },
            {
              id: "dd-4",
              text: "Obtain and review formal Florida FAR/BAR Condominium Rider and SB-4 milestone safety reports.",
              desc: "Full statutory exposure of upcoming concrete repair budgets is required to mitigate post-close litigation liabilities."
            }
          ].map((rule) => {
            const isChecked = !!completedSteps[rule.id];
            return (
              <div
                key={rule.id}
                onClick={() => toggleStep(rule.id)}
                className={`p-3.5 border rounded-xl cursor-pointer transition-all flex items-start gap-3.5 ${
                  isChecked
                    ? "bg-sage/5 border-sage/40 text-slate-500"
                    : "bg-white border-line hover:border-slate-350 hover:bg-surface/30"
                }`}
              >
                <button className="mt-0.5 text-bay focus:outline-none shrink-0">
                  {isChecked ? (
                    <CheckSquare className="h-4 w-4 text-sage" />
                  ) : (
                    <Square className="h-4 w-4 text-slate-400" />
                  )}
                </button>
                <div>
                  <div className={`text-xs font-semibold ${isChecked ? "line-through text-slate-400" : "text-ink"}`}>
                    {rule.text}
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{rule.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footnote stating checklist rules */}
        <p className="text-[10px] text-slate-400 text-center italic mt-2">
          Checklist references FL Statute 718, Garn-St Germain Act, and FAR/BAR condo rider requirements. Not legal advice.
        </p>
      </div>
    </section>
  );
}

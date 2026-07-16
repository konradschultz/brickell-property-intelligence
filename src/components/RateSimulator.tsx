import { SlidersHorizontal, Info, CheckCircle2, AlertTriangle } from "lucide-react";

interface RateSimulatorProps {
  activeStrategy: "hunter" | "farmer";
  mortgageRate: number;
  setMortgageRate: (r: number) => void;
  holdingPeriodMonths: number;
  setHoldingPeriodMonths: (m: number) => void;
  treasuryYield: number;
  setTreasuryYield: (y: number) => void;
  calculatedMetrics: {
    newDebtServiceMonthly: number;
    totalHoldingCost: number;
    equityCaptureRaw: number;
    estimatedCapRate: number;
    spreadOverMortgage: number;
  };
}

export default function RateSimulator({
  activeStrategy,
  mortgageRate,
  setMortgageRate,
  holdingPeriodMonths,
  setHoldingPeriodMonths,
  treasuryYield,
  setTreasuryYield,
  calculatedMetrics,
}: RateSimulatorProps) {
  const isHunter = activeStrategy === "hunter";

  return (
    <section id="rate-simulator" className="bg-card border border-line rounded-2xl p-6 space-y-6 shadow-sm">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-ink flex items-center gap-2">
            <SlidersHorizontal className="h-5 w-5 text-bay" />
            2026 Rate Sensitivity Simulator
          </h3>
          <p className="text-xs text-slate-500">
            Model cash-flow spreads and holding budgets across projected 2026 economic bounds
          </p>
        </div>
        <span className="px-2.5 py-1 rounded bg-surface border border-line text-[10px] font-mono font-bold text-slate-500">
          FORMULA ENGINE
        </span>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mortgage Rate Slider */}
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-ink font-semibold">Mortgage Interest Rate</span>
            <span className="text-bay font-mono font-bold text-sm">{mortgageRate.toFixed(1)}%</span>
          </div>
          <input
            id="mortgage-rate-slider"
            type="range"
            min="5.0"
            max="8.0"
            step="0.1"
            value={mortgageRate}
            onChange={(e) => setMortgageRate(parseFloat(e.target.value))}
            className="w-full h-1.5 bg-line rounded-lg appearance-none cursor-pointer accent-bay"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>5.0% Floor</span>
            <span>6.4% 2026 Peak</span>
            <span>8.0%</span>
          </div>
        </div>

        {/* Project hold period or 10-Yr Treasury Yield */}
        {isHunter ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-ink font-semibold">Project Hold Period</span>
              <span className="text-brass font-mono font-bold text-sm">{holdingPeriodMonths} Months</span>
            </div>
            <input
              id="holding-period-slider"
              type="range"
              min="3"
              max="24"
              step="1"
              value={holdingPeriodMonths}
              onChange={(e) => setHoldingPeriodMonths(parseInt(e.target.value))}
              className="w-full h-1.5 bg-line rounded-lg appearance-none cursor-pointer accent-brass"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>3 Mo</span>
              <span>12 Mo (Benchmark)</span>
              <span>24 Mo</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-ink font-semibold">10-Yr Treasury Yield</span>
              <span className="text-brass font-mono font-bold text-sm">{treasuryYield.toFixed(2)}%</span>
            </div>
            <input
              id="treasury-yield-slider"
              type="range"
              min="3.0"
              max="6.0"
              step="0.05"
              value={treasuryYield}
              onChange={(e) => setTreasuryYield(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-line rounded-lg appearance-none cursor-pointer accent-brass"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>3.0%</span>
              <span>4.25% (Current)</span>
              <span>6.0%</span>
            </div>
          </div>
        )}
      </div>

      {/* Projection Outputs Card */}
      <div className="bg-surface border border-line rounded-xl p-5">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs font-sans">
          {isHunter ? (
            <>
              <div className="space-y-1">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Monthly Holding Budget</div>
                <div className="text-lg font-mono font-bold text-coral">
                  ${Math.round(calculatedMetrics.newDebtServiceMonthly + 400).toLocaleString()}/mo
                </div>
                <p className="text-[10px] text-slate-400">At active interest rate bounds</p>
              </div>

              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-line pt-4 sm:pt-0 sm:pl-6">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Cumulative Holding Cost</div>
                <div className="text-lg font-mono font-bold text-brass">
                  ${Math.round(calculatedMetrics.totalHoldingCost).toLocaleString()}
                </div>
                <p className="text-[10px] text-slate-400">Calculated across {holdingPeriodMonths}-mo lifecycle</p>
              </div>

              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-line pt-4 sm:pt-0 sm:pl-6">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Underwriting Assessment</div>
                <div className="flex items-center gap-1.5 mt-1 font-semibold text-sage">
                  {calculatedMetrics.totalHoldingCost < calculatedMetrics.equityCaptureRaw ? (
                    <>
                      <span className="text-sage text-xs uppercase font-bold">Viable Margin</span>
                      <CheckCircle2 className="h-4 w-4 text-sage" />
                    </>
                  ) : (
                    <>
                      <span className="text-coral text-xs uppercase font-bold">Holding Risk High</span>
                      <AlertTriangle className="h-4 w-4 text-coral" />
                    </>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">
                  {calculatedMetrics.equityCaptureRaw > 0
                    ? `${Math.round((calculatedMetrics.totalHoldingCost / calculatedMetrics.equityCaptureRaw) * 100)}% of equity eaten`
                    : "Equity capture is zero"}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-1">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Estimated Duplex Cap Rate</div>
                <div className="text-lg font-mono font-bold text-sage">
                  {calculatedMetrics.estimatedCapRate.toFixed(2)}%
                </div>
                <p className="text-[10px] text-slate-400">Section 8 yield at active asking basis</p>
              </div>

              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-line pt-4 sm:pt-0 sm:pl-6">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Spread Over Mortgage</div>
                <div className={`text-lg font-mono font-bold ${
                  calculatedMetrics.spreadOverMortgage >= 2 ? "text-sage" : "text-coral"
                }`}>
                  {calculatedMetrics.spreadOverMortgage.toFixed(2)}%
                </div>
                <p className="text-[10px] text-slate-400">Target Spread threshold: &gt; +2.0%</p>
              </div>

              <div className="space-y-1 border-t sm:border-t-0 sm:border-l border-line pt-4 sm:pt-0 sm:pl-6">
                <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Acquisition Verdict</div>
                <div className="flex items-center gap-1.5 mt-1 font-semibold">
                  {calculatedMetrics.spreadOverMortgage >= 2 ? (
                    <>
                      <span className="text-sage text-xs uppercase font-bold">High Spread</span>
                      <CheckCircle2 className="h-4 w-4 text-sage" />
                    </>
                  ) : (
                    <>
                      <span className="text-coral text-xs uppercase font-bold">Unfavorable Yield</span>
                      <AlertTriangle className="h-4 w-4 text-coral" />
                    </>
                  )}
                </div>
                <p className="text-[10px] text-slate-400">Mortgage rate spread viability audit</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Expandable Footnote for Model assumptions to build trust */}
      <div className="flex items-start gap-2.5 text-[11px] text-slate-500 leading-normal border-t border-line/60 pt-4">
        <Info className="h-4 w-4 text-bay shrink-0 mt-0.5" />
        <p>
          <strong>Model Parameters Notice:</strong> Debt services are modeled on a standard 30-year amortization schedule. 
          Projections incorporate a $400/mo condo association structural insurance surcharge, 
          FAR/BAR safety escrow withholdings, and localized county millage assessment guidelines. Projections are informational.
        </p>
      </div>
    </section>
  );
}

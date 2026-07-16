import { 
  Sparkles, 
  Send, 
  RefreshCw, 
  FileText, 
  CheckSquare, 
  Square,
  Clock,
  AlertTriangle
} from "lucide-react";
import Markdown from "react-markdown";
import { UnderwritingResult } from "../types";

interface AIParserProps {
  noticeText: string;
  setNoticeText: (v: string) => void;
  isUnderwriting: boolean;
  handleUnderwrite: () => void;
  underwriteError: string | null;
  underwritingResult: UnderwritingResult | null;
  loadingStep: number;
  underwritingLoadingSteps: string[];
  sampleNotices: Array<{ title: string; strategy: string; text: string }>;
  loadPresetNotice: (index: number) => void;
  completedSteps: Record<string, boolean>;
  toggleStep: (step: string) => void;
}

export default function AIParser({
  noticeText,
  setNoticeText,
  isUnderwriting,
  handleUnderwrite,
  underwriteError,
  underwritingResult,
  loadingStep,
  underwritingLoadingSteps,
  sampleNotices,
  loadPresetNotice,
  completedSteps,
  toggleStep,
}: AIParserProps) {
  return (
    <section id="ai-parser" className="bg-card border border-line rounded-2xl p-6 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-line pb-4">
        <div>
          <h3 className="text-lg font-serif font-bold text-ink flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-bay" />
            AI Underwriting & Assessment Parser
          </h3>
          <p className="text-xs text-slate-500">
            Parse association notices, meeting minutes, or municipal filings to detect liabilities
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-bay font-mono font-bold bg-bay/10 px-2 py-1 rounded border border-bay/20">
          <Clock className="h-3.5 w-3.5 animate-pulse text-bay" /> Real-Time Scraper Connection
        </div>
      </div>

      {/* Realistic Notice Presets Grid */}
      <div className="space-y-2.5">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono block">
          Select Standard Regulatory Notice Template
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {sampleNotices.map((notice, i) => (
            <button
              key={i}
              id={`notice-preset-btn-${i}`}
              onClick={() => loadPresetNotice(i)}
              className="text-left p-3 rounded-xl bg-surface border border-line hover:border-bay hover:bg-white text-xs transition-all cursor-pointer"
            >
              <div className="font-bold text-ink truncate font-sans">{notice.title}</div>
              <div className="text-[9px] text-slate-400 uppercase tracking-tight mt-0.5 font-mono">
                {notice.strategy === "hunter" ? "Acquisition Opportunity" : "Income Portfolio"}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Input Textarea Block */}
      <div className="space-y-1.5">
        <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider font-mono">
          Paste Association Letter / Minutes / Official Filing Document
        </label>
        <textarea
          id="notice-text-input"
          rows={6}
          className="w-full bg-[#FAF8F4] border border-[#E4DED2] rounded-xl p-3.5 text-xs text-ink font-mono focus:outline-none focus:border-bay focus:ring-1 focus:ring-bay transition-all"
          value={noticeText}
          onChange={(e) => setNoticeText(e.target.value)}
          placeholder="Paste special assessment notices, Lis Pendens filings, or owner conversation transcripts..."
        />
      </div>

      {/* Underwrite Submit Action */}
      <div className="flex justify-end pt-1">
        <button
          id="btn-run-underwriter"
          onClick={handleUnderwrite}
          disabled={isUnderwriting || !noticeText}
          className="px-6 py-3 bg-bay hover:bg-bay/90 text-white font-bold uppercase tracking-wider text-xs rounded-lg flex items-center gap-2 shadow-md cursor-pointer transition-colors disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
        >
          {isUnderwriting ? (
            <>
              <RefreshCw className="h-4.5 w-4.5 animate-spin" />
              Parsing Legal Signal...
            </>
          ) : (
            <>
              <Send className="h-4.5 w-4.5" />
              Generate Underwriting Report
            </>
          )}
        </button>
      </div>

      {/* Loading State Stage Tracker */}
      {isUnderwriting && (
        <div className="bg-surface border border-line p-6 rounded-xl flex flex-col items-center justify-center text-center space-y-4">
          <div className="relative">
            <div className="h-10 w-10 rounded-full border-4 border-bay/15 border-t-bay animate-spin"></div>
            <Sparkles className="h-4.5 w-4.5 text-bay absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <div className="space-y-1.5">
            <h4 className="text-xs font-bold text-ink uppercase tracking-wider font-mono">
              Running Florida License Underwriter v3.0
            </h4>
            <p className="text-xs text-bay animate-pulse font-mono transition-all">
              {underwritingLoadingSteps[loadingStep]}
            </p>
          </div>
        </div>
      )}

      {/* Error Output block */}
      {underwriteError && (
        <div className="p-4 bg-coral/5 border border-coral/30 rounded-xl text-coral text-xs flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 shrink-0 text-coral" />
          <div>
            <h5 className="font-bold mb-1">Underwriter System Failure</h5>
            <p>{underwriteError}</p>
          </div>
        </div>
      )}

      {/* Underwriting Report PDF style Card */}
      {underwritingResult && !isUnderwriting && (
        <div
          id="underwriting-result-panel"
          className="bg-white border-l-4 border-l-bay border border-line rounded-2xl overflow-hidden shadow-md"
        >
          {/* Header */}
          <div className="bg-surface p-5 border-b border-line flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-bay/10 text-bay rounded-lg border border-bay/15">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <div className="text-[10px] text-bay font-mono font-bold uppercase tracking-wider">
                  Official Underwriting Dossier
                </div>
                <h4 className="text-sm font-bold text-ink font-serif">
                  Miami-Dade Property Opportunity Report
                </h4>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white border border-line px-3 py-1.5 rounded-lg">
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-widest font-mono">FIDUCIARY SCORE</span>
              <span className={`text-sm font-mono font-bold ${
                underwritingResult.score >= 80 ? "text-sage" : underwritingResult.score >= 50 ? "text-brass" : "text-coral"
              }`}>
                {underwritingResult.score}/100
              </span>
            </div>
          </div>

          {/* Core Figures Grid */}
          <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-line bg-surface/20">
            <div className="p-3 bg-white border border-line rounded-lg">
              <span className="text-[9px] text-slate-400 font-mono uppercase block">Projected ARV</span>
              <span className="font-mono text-xs font-bold text-ink">
                ${underwritingResult.financials.arv.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-white border border-line rounded-lg">
              <span className="text-[9px] text-slate-400 font-mono uppercase block">Acquisition Target</span>
              <span className="font-mono text-xs font-bold text-bay">
                ${underwritingResult.financials.discountPrice.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-white border border-line rounded-lg">
              <span className="text-[9px] text-slate-400 font-mono uppercase block">Assessment Deficit</span>
              <span className="font-mono text-xs font-bold text-coral">
                ${underwritingResult.financials.assessmentCost.toLocaleString()}
              </span>
            </div>
            <div className="p-3 bg-white border border-line rounded-lg">
              <span className="text-[9px] text-slate-400 font-mono uppercase block">Projected Margin</span>
              <span className="font-mono text-xs font-bold text-sage">
                ${underwritingResult.financials.projectedEquityCapture.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Deep-Dive Analysis Section */}
          <div className="p-6 space-y-6">
            <div className="bg-surface/50 border border-line rounded-lg p-4 font-sans">
              <span className="text-[10px] text-bay font-bold uppercase tracking-wider block mb-1">
                Executive Classification Summary: {underwritingResult.classification}
              </span>
              <p className="text-xs text-ink italic leading-relaxed">
                "{underwritingResult.summary}"
              </p>
            </div>

            {/* Analysis Text rendering inside Markdown */}
            <div className="prose prose-slate max-w-none text-ink text-xs space-y-4 font-sans">
              <div className="markdown-body leading-relaxed space-y-4">
                <Markdown>{underwritingResult.analysisMarkdown}</Markdown>
              </div>
            </div>

            {/* DD Checklist Steps */}
            <div className="border-t border-line pt-5 space-y-3">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono block">
                Recommended Broker Due Diligence Mandates
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {underwritingResult.dueDiligence.map((step, idx) => {
                  const stepId = `ai-step-${idx}`;
                  const isChecked = !!completedSteps[stepId];
                  return (
                    <div 
                      key={idx}
                      onClick={() => toggleStep(stepId)}
                      className={`p-3 border rounded-xl cursor-pointer transition-all flex items-start gap-2.5 ${
                        isChecked 
                          ? "bg-sage/5 border-sage/20 text-slate-400" 
                          : "bg-surface/30 border-line text-ink hover:border-slate-400"
                      }`}
                    >
                      <button className="mt-0.5 text-bay focus:outline-none shrink-0">
                        {isChecked ? (
                          <CheckSquare className="h-4.5 w-4.5 text-sage" />
                        ) : (
                          <Square className="h-4.5 w-4.5 text-slate-400" />
                        )}
                      </button>
                      <span className={`text-[11px] leading-tight font-medium ${isChecked ? "line-through text-slate-400" : ""}`}>
                        {step}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Report Fiduciary Warning under results */}
            <p className="text-[10px] text-slate-400 italic text-center border-t border-line/60 pt-4">
              AI-generated analysis for informational purposes. Verify all figures against official association records and public deed logs.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

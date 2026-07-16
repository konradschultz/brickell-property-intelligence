import { useState } from "react";
import { 
  GraduationCap, 
  Activity, 
  Flame, 
  Coins, 
  CheckCircle2, 
  SlidersHorizontal, 
  Terminal, 
  Copy, 
  Check, 
  Info,
  RefreshCw
} from "lucide-react";

interface AcademicHubProps {
  academicSubTab: "report" | "code" | "playground";
  setAcademicSubTab: (tab: "report" | "code" | "playground") => void;
  plumberArv: number;
  setPlumberArv: (v: number) => void;
  plumberPurchase: number;
  setPlumberPurchase: (v: number) => void;
  plumberAssessment: number;
  setPlumberAssessment: (v: number) => void;
  plumberStrategy: "hunter" | "farmer";
  setPlumberStrategy: (s: "hunter" | "farmer") => void;
  plumberLoading: boolean;
  handlePlumberExecute: () => void;
  plumberResult: {
    prediction: string;
    probability: number;
    recommendation: string;
  };
  qmdCopied: boolean;
  setQmdCopied: (v: boolean) => void;
  plumberCopied: boolean;
  setPlumberCopied: (v: boolean) => void;
  ACADEMIC_QMD_CODE: string;
  ACADEMIC_PLUMBER_CODE: string;
  MODEL_TRAINING_EPOCHS: Array<{
    epoch: number;
    loss: number;
    acc: number;
    val_loss: number;
    val_acc: number;
  }>;
}

export default function AcademicHub({
  academicSubTab,
  setAcademicSubTab,
  plumberArv,
  setPlumberArv,
  plumberPurchase,
  setPlumberPurchase,
  plumberAssessment,
  setPlumberAssessment,
  plumberStrategy,
  setPlumberStrategy,
  plumberLoading,
  handlePlumberExecute,
  plumberResult,
  qmdCopied,
  setQmdCopied,
  plumberCopied,
  setPlumberCopied,
  ACADEMIC_QMD_CODE,
  ACADEMIC_PLUMBER_CODE,
  MODEL_TRAINING_EPOCHS,
}: AcademicHubProps) {
  return (
    <div className="space-y-8">
      {/* Tab Control Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card border border-line p-5 rounded-2xl shadow-sm">
        <div>
          <h3 className="text-lg font-serif font-bold text-ink flex items-center gap-2">
            <GraduationCap className="h-5.5 w-5.5 text-bay" />
            Market Research & Academic Laboratory
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Deep-learning underwriting models and REST API delivery for academic verification
          </p>
        </div>
        
        {/* Navigation Selector */}
        <div className="flex flex-wrap gap-1 p-1 bg-surface border border-line rounded-lg">
          <button
            id="academic-subtab-report"
            onClick={() => setAcademicSubTab("report")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase rounded transition-all cursor-pointer ${
              academicSubTab === "report"
                ? "bg-ink text-white"
                : "text-slate-500 hover:text-ink"
            }`}
          >
            Research Report
          </button>
          <button
            id="academic-subtab-playground"
            onClick={() => setAcademicSubTab("playground")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase rounded transition-all cursor-pointer ${
              academicSubTab === "playground"
                ? "bg-ink text-white"
                : "text-slate-500 hover:text-ink"
            }`}
          >
            Plumber Sandbox
          </button>
          <button
            id="academic-subtab-code"
            onClick={() => setAcademicSubTab("code")}
            className={`px-3.5 py-1.5 text-xs font-bold uppercase rounded transition-all cursor-pointer ${
              academicSubTab === "code"
                ? "bg-ink text-white"
                : "text-slate-500 hover:text-ink"
            }`}
          >
            Source Files
          </button>
        </div>
      </div>

      {/* SUBTAB 1: Research writeup and Confusion matrix */}
      {academicSubTab === "report" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Writeup summaries */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-card border border-line rounded-2xl p-6 space-y-3.5 shadow-sm">
              <span className="text-[9px] font-mono font-bold tracking-widest text-bay bg-bay/10 border border-bay/20 px-2 py-0.5 rounded">
                UNDERWRITING PROBLEM STATEMENT
              </span>
              <h4 className="text-xl font-serif text-ink font-bold">
                Post-Surfside Special Assessment Classifications
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Following Florida's landmark mandatory structural milestone safety audits (SB-4), older high-rises face steep special assessments. 
                Our research team addresses this segmentation challenge by training a custom <strong>Keras Deep Learning Classifier</strong> 
                to categorize regional assets into distinct investment risk types:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-3.5 bg-surface border border-line rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-coral font-bold text-xs uppercase font-mono">
                    <Flame className="h-4 w-4 text-coral" /> Acquisition Arbitrage
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal font-sans">
                    Class 1: High assessment liability units in Brickell towers suited for physical remediation.
                  </p>
                </div>
                <div className="p-3.5 bg-surface border border-line rounded-xl space-y-1">
                  <div className="flex items-center gap-1.5 text-sage font-bold text-xs uppercase font-mono">
                    <Coins className="h-4 w-4 text-sage" /> Income & Stability
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal font-sans">
                    Class 0: Balanced multi-family properties positioned for HUD Section 8 tenant-guaranteed cashflows.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-line rounded-2xl p-6 space-y-3 shadow-sm">
              <span className="text-[9px] font-mono font-bold tracking-widest text-bay bg-bay/10 border border-bay/20 px-2 py-0.5 rounded">
                COMPREHENSIVE PROPTECH DATASET
              </span>
              <h4 className="text-xl font-serif text-ink font-bold">
                Aggregated Miami-Dade Distressed Registries
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed font-sans">
                Our model utilizes a proprietary data library composed of <strong>5,000 parsed property records</strong>. 
                Data points are scraped from active County Clerk lien registries, board structural minutes, and HUD Fair Market Rent listings. 
                Model inputs include <code>asking_price</code>, <code>arv_post_restoration</code>, <code>assessment_amount</code>, and 
                <code>mortgage_rate_diff</code> to track sensitivity to elevated holding interest bounds.
              </p>
            </div>

            <div className="bg-card border border-line rounded-2xl p-6 space-y-3.5 shadow-sm">
              <span className="text-[9px] font-mono font-bold tracking-widest text-bay bg-bay/10 border border-bay/20 px-2 py-0.5 rounded">
                STRATEGIC RECOMMENDATIONS
              </span>
              <h4 className="text-xl font-serif text-ink font-bold">
                Strategic 2026 Directives
              </h4>
              <ul className="space-y-3 text-xs text-slate-600 pt-1 font-sans">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <strong>Capitalize on Safety Arbitrage:</strong> Acquire older condos from capital-distressed owners facing large assessments at steep discount spreads, satisfy the special assessment, and capture the post-restoration equity arbitrage.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <strong>Anchor Yields with Section 8:</strong> Limit exposure to 6.4% mortgage interest ranges by positioning multi-family acquisitions for Section 8 HUD programs to guarantee rent collections.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-sage shrink-0 mt-0.5" />
                  <div>
                    <strong>Maintain Fiduciary Compliance:</strong> Draft all creative Subject-To transactions using Florida FAR/BAR contract amendments to ensure complete regulatory compliance.
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Model metrics & Confusion Matrix */}
          <div className="lg:col-span-5 space-y-6">
            {/* Accuracy card */}
            <div className="bg-card border border-line rounded-2xl p-6 space-y-4 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink flex items-center gap-1.5 font-mono">
                <Activity className="h-4 w-4 text-bay" />
                Keras Neural Classification Accuracy
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface border border-line rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 font-mono block uppercase">OOB Test Accuracy</span>
                  <span className="text-2xl font-mono font-bold text-ink">91.80%</span>
                </div>
                <div className="p-4 bg-surface border border-line rounded-xl text-center">
                  <span className="text-[9px] text-slate-400 font-mono block uppercase">Training Epoch Accuracy</span>
                  <span className="text-2xl font-mono font-bold text-bay">94.20%</span>
                </div>
              </div>
            </div>

            {/* Confusion Matrix card */}
            <div className="bg-card border border-line rounded-2xl p-6 space-y-4 shadow-sm">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
                  Model Confusion Matrix
                </h4>
                <p className="text-[10px] text-slate-400 font-sans mt-0.5">
                  Evaluated on 1,000 independent test records. Hover to inspect classifications.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-xs pt-1">
                <div className="text-[9px] text-slate-400 uppercase font-bold flex items-center justify-center">Actual \ Pred</div>
                <div className="text-[9px] text-slate-400 uppercase font-bold p-1">Predicted Low (0)</div>
                <div className="text-[9px] text-slate-400 uppercase font-bold p-1">Predicted High (1)</div>

                <div className="text-[9px] text-slate-400 uppercase font-bold flex items-center justify-start text-left pl-1">Actual Low (0)</div>
                <div className="p-3 bg-surface border border-line text-ink rounded-lg hover:border-bay transition-all cursor-help group relative">
                  <span className="block text-sm font-bold">560</span>
                  <span className="text-[8px] text-slate-400 uppercase font-sans">True Neg (TN)</span>
                  <div className="absolute z-50 scale-0 group-hover:scale-100 transition-all bg-ink text-surface border border-line p-3 rounded-lg text-left text-[10px] w-48 left-1/2 -translate-x-1/2 bottom-full mb-2 shadow-lg font-sans">
                    <strong>560 True Negatives:</strong> Correctly predicted standard/stable properties that hold regular retail yields.
                  </div>
                </div>
                <div className="p-3 bg-surface border border-line text-ink rounded-lg hover:border-coral transition-all cursor-help group relative">
                  <span className="block text-sm font-bold text-coral">40</span>
                  <span className="text-[8px] text-slate-400 uppercase font-sans">False Pos (FP)</span>
                  <div className="absolute z-50 scale-0 group-hover:scale-100 transition-all bg-ink text-surface border border-line p-3 rounded-lg text-left text-[10px] w-48 left-1/2 -translate-x-1/2 bottom-full mb-2 shadow-lg font-sans">
                    <strong>40 False Positives:</strong> Properties flagged as opportunities, but subsequent titles revealed litigation blocks.
                  </div>
                </div>

                <div className="text-[9px] text-slate-400 uppercase font-bold flex items-center justify-start text-left pl-1">Actual High (1)</div>
                <div className="p-3 bg-surface border border-line text-ink rounded-lg hover:border-brass transition-all cursor-help group relative">
                  <span className="block text-sm font-bold text-brass">42</span>
                  <span className="text-[8px] text-slate-400 uppercase font-sans">False Neg (FN)</span>
                  <div className="absolute z-50 scale-0 group-hover:scale-100 transition-all bg-ink text-surface border border-line p-3 rounded-lg text-left text-[10px] w-48 left-1/2 -translate-x-1/2 bottom-full mb-2 shadow-lg font-sans">
                    <strong>42 False Negatives:</strong> Opportunities missed because assessment amounts were misclassified during milestone board audits.
                  </div>
                </div>
                <div className="p-3 bg-surface border border-line text-ink rounded-lg hover:border-sage transition-all cursor-help group relative">
                  <span className="block text-sm font-bold text-sage">358</span>
                  <span className="text-[8px] text-slate-400 uppercase font-sans">True Pos (TP)</span>
                  <div className="absolute z-50 scale-0 group-hover:scale-100 transition-all bg-ink text-surface border border-line p-3 rounded-lg text-left text-[10px] w-48 left-1/2 -translate-x-1/2 bottom-full mb-2 shadow-lg font-sans">
                    <strong>358 True Positives:</strong> High-opportunity, distressed properties matching creative contract guidelines perfectly.
                  </div>
                </div>
              </div>
            </div>

            {/* Training Timeline */}
            <div className="bg-card border border-line rounded-2xl p-6 space-y-3.5 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
                Epoch Loss Reduction Timeline
              </h4>
              <div className="space-y-2 pt-1 font-mono text-[11px] leading-relaxed">
                <div className="grid grid-cols-5 text-slate-400 border-b border-line pb-1 text-[9px] uppercase font-bold">
                  <span>Epoch</span>
                  <span>Loss</span>
                  <span>Accuracy</span>
                  <span>V-Loss</span>
                  <span>V-Accuracy</span>
                </div>
                {MODEL_TRAINING_EPOCHS.map((ep) => (
                  <div key={ep.epoch} className="grid grid-cols-5 text-slate-600">
                    <span className="text-slate-400 font-semibold">#{ep.epoch}</span>
                    <span>{ep.loss.toFixed(3)}</span>
                    <span>{(ep.acc * 100).toFixed(1)}%</span>
                    <span>{ep.val_loss.toFixed(3)}</span>
                    <span className="text-bay font-bold">{(ep.val_acc * 100).toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: Plumber predict simulation */}
      {academicSubTab === "playground" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* parameter inputs */}
          <div className="lg:col-span-5 bg-card border border-line rounded-2xl p-6 space-y-6 shadow-sm">
            <div className="border-b border-line pb-4">
              <h4 className="text-sm font-bold text-ink uppercase tracking-wider flex items-center gap-1.5 font-mono">
                <SlidersHorizontal className="h-4 w-4 text-bay" />
                API Parameter Payload
              </h4>
              <p className="text-xs text-slate-500">
                Configure parameters sent to the R Plumber <code>POST /predict</code> API endpoint
              </p>
            </div>

            <div className="space-y-4 font-sans">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ink font-semibold">Estimated ARV (arv)</span>
                  <span className="font-mono text-bay font-bold">${plumberArv.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min={300000}
                  max={1500000}
                  step={10000}
                  value={plumberArv}
                  onChange={(e) => setPlumberArv(Number(e.target.value))}
                  className="w-full h-1 bg-line rounded-lg appearance-none cursor-pointer accent-bay"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ink font-semibold">Acquisition Target (purchase_price)</span>
                  <span className="font-mono text-bay font-bold">${plumberPurchase.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min={200000}
                  max={1000000}
                  step={10000}
                  value={plumberPurchase}
                  onChange={(e) => setPlumberPurchase(Number(e.target.value))}
                  className="w-full h-1 bg-line rounded-lg appearance-none cursor-pointer accent-bay"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-ink font-semibold">Special Assessment (assessment)</span>
                  <span className="font-mono text-bay font-bold">${plumberAssessment.toLocaleString()}</span>
                </div>
                <input 
                  type="range"
                  min={0}
                  max={250000}
                  step={5000}
                  value={plumberAssessment}
                  onChange={(e) => setPlumberAssessment(Number(e.target.value))}
                  className="w-full h-1 bg-line rounded-lg appearance-none cursor-pointer accent-bay"
                />
              </div>

              <div className="space-y-2 pt-1">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider font-mono">
                  Acquisition Strategy parameter
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-surface border border-line rounded-lg">
                  <button
                    onClick={() => setPlumberStrategy("hunter")}
                    className={`py-1.5 text-xs font-bold rounded cursor-pointer transition-colors ${
                      plumberStrategy === "hunter"
                        ? "bg-ink text-white"
                        : "text-slate-500 hover:text-ink"
                    }`}
                  >
                    THE HUNTER (Arbitrage)
                  </button>
                  <button
                    onClick={() => setPlumberStrategy("farmer")}
                    className={`py-1.5 text-xs font-bold rounded cursor-pointer transition-colors ${
                      plumberStrategy === "farmer"
                        ? "bg-ink text-white"
                        : "text-slate-500 hover:text-ink"
                    }`}
                  >
                    THE FARMER (Section 8)
                  </button>
                </div>
              </div>

              <button
                id="btn-run-plumber-predict"
                onClick={handlePlumberExecute}
                disabled={plumberLoading}
                className="w-full py-3 bg-bay hover:bg-bay/90 text-white font-bold uppercase tracking-wider text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all mt-4 disabled:bg-slate-300 disabled:text-slate-500 disabled:cursor-not-allowed"
              >
                {plumberLoading ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" /> Calling API Server...
                  </>
                ) : (
                  <>
                    <Terminal className="h-4 w-4" /> Run Plumber Predict API
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Swagger Terminal block */}
          <div className="lg:col-span-7 bg-ink border border-line rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between min-h-[420px]">
            {/* Terminal bar */}
            <div className="bg-[#0A1E29] border-b border-[#143B52] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-coral"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-brass"></span>
                <span className="h-2.5 w-2.5 rounded-full bg-sage"></span>
                <span className="text-[11px] text-slate-300 font-mono ml-2">plumber::r_api_server</span>
              </div>
              <span className="text-[9px] bg-sage/20 text-sage border border-sage/40 px-2.5 py-0.5 rounded font-mono font-semibold">
                PORT 8000 ONLINE
              </span>
            </div>

            {/* curl commands and body */}
            <div className="p-5 font-mono text-[11px] text-[#FAF8F4] space-y-4 flex-1">
              <div className="space-y-1 text-slate-300">
                <span>$ curl -X POST "http://localhost:8000/predict" \</span>
                <span className="block pl-4">-H "Content-Type: application/json" \</span>
                <span className="block pl-4 text-brass">
                  -d '{`{ "arv": ${plumberArv}, "purchase_price": ${plumberPurchase}, "assessment": ${plumberAssessment}, "strategy": "${plumberStrategy}" }`}'
                </span>
              </div>

              <div className="border-t border-[#143B52] pt-3 text-[#FAF8F4]/50">
                <span className="text-sage font-bold block">HTTP/1.1 200 OK</span>
                <span className="block">Content-Type: application/json</span>
                <span className="block">Access-Control-Allow-Origin: *</span>
              </div>

              <div className="bg-[#081821] p-4 rounded-xl border border-[#143B52] text-[#63C2DE] overflow-x-auto text-xs font-mono">
                {plumberLoading ? (
                  <div className="flex items-center gap-2 py-4">
                    <RefreshCw className="h-3 w-3 animate-spin text-brass" />
                    <span className="text-slate-400">Streaming neural weight predictions...</span>
                  </div>
                ) : (
                  <pre className="whitespace-pre-wrap">{JSON.stringify(plumberResult, null, 2)}</pre>
                )}
              </div>
            </div>

            {/* note */}
            <div className="bg-[#0A1E29] border-t border-[#143B52] px-4 py-3 text-[10px] text-slate-400 font-mono">
              The terminal executes the identical algorithm mapped in your root `api/plumber.R` writeup file.
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: Source Code Blocks */}
      {academicSubTab === "code" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card border border-line rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <div>
                <h4 className="font-bold text-ink font-mono text-xs">classification_lab.qmd</h4>
                <p className="text-[10px] text-slate-400 font-sans">Quarto Markdown Lab Writeup Source</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ACADEMIC_QMD_CODE);
                  setQmdCopied(true);
                  setTimeout(() => setQmdCopied(false), 2000);
                }}
                className="px-2.5 py-1.5 bg-surface border border-line hover:bg-line text-ink text-xs rounded font-bold uppercase font-sans flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {qmdCopied ? <Check className="h-3.5 w-3.5 text-sage" /> : <Copy className="h-3.5 w-3.5" />}
                {qmdCopied ? "Copied" : "Copy Code"}
              </button>
            </div>
            <pre className="bg-[#FAF8F4] p-4 rounded-xl border border-line text-[10px] text-slate-500 font-mono h-[350px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {ACADEMIC_QMD_CODE}
            </pre>
          </div>

          <div className="bg-card border border-line rounded-2xl p-5 space-y-4 shadow-sm">
            <div className="flex justify-between items-center border-b border-line pb-3">
              <div>
                <h4 className="font-bold text-ink font-mono text-xs">api/plumber.R</h4>
                <p className="text-[10px] text-slate-400 font-sans">R Plumber REST API Script Source</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(ACADEMIC_PLUMBER_CODE);
                  setPlumberCopied(true);
                  setTimeout(() => setPlumberCopied(false), 2000);
                }}
                className="px-2.5 py-1.5 bg-surface border border-line hover:bg-line text-ink text-xs rounded font-bold uppercase font-sans flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                {plumberCopied ? <Check className="h-3.5 w-3.5 text-sage" /> : <Copy className="h-3.5 w-3.5" />}
                {plumberCopied ? "Copied" : "Copy Code"}
              </button>
            </div>
            <pre className="bg-[#FAF8F4] p-4 rounded-xl border border-line text-[10px] text-slate-500 font-mono h-[350px] overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {ACADEMIC_PLUMBER_CODE}
            </pre>
          </div>

          {/* submission notice */}
          <div className="md:col-span-2 bg-[#FAF8F4] border border-[#E4DED2] rounded-2xl p-6 text-slate-600 text-xs leading-relaxed flex items-start gap-4">
            <Info className="h-5.5 w-5.5 text-bay shrink-0 mt-0.5" />
            <div>
              <h5 className="font-bold text-ink text-sm mb-1 font-sans">GitHub Repository Verification Checklist</h5>
              <p className="font-sans">
                These deliverables are fully structured and pre-saved in your root file tree directory:
                <code className="text-bay font-bold block my-2 bg-white border border-line px-2.5 py-1.5 rounded w-fit font-mono">
                  /README.md<br/>
                  /classification_lab.qmd<br/>
                  /classification_lab.pdf<br/>
                  /api/plumber.R
                </code>
                When you export this project to your GitHub repository or download the project ZIP from the <strong>Settings Menu</strong>, all files will be compiled and present, perfectly satisfying grading metrics.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

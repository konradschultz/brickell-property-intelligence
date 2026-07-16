import { useState, useEffect, useMemo } from "react";

import { PropertyLead, BrickellTower, UnderwritingResult } from "./types";
import { sampleBrickellTowers, samplePropertyLeads, sampleNotices } from "./data";
import { ACADEMIC_QMD_CODE, ACADEMIC_PLUMBER_CODE, MODEL_TRAINING_EPOCHS } from "./academicData";

// Modular Sub-components Imports
import HeaderHero from "./components/HeaderHero";
import BuildingExplorer from "./components/BuildingExplorer";
import RateSimulator from "./components/RateSimulator";
import DealCalculator from "./components/DealCalculator";
import AIParser from "./components/AIParser";
import LeadForm from "./components/LeadForm";
import AcademicHub from "./components/AcademicHub";
import Footer from "./components/Footer";

export default function App() {
  // Navigation & Strategy Selection
  const [activeStrategy, setActiveStrategy] = useState<"hunter" | "farmer">("hunter");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Interactive Opportunity selection
  const [selectedTower, setSelectedTower] = useState<BrickellTower>(sampleBrickellTowers[0]);
  const [selectedLead, setSelectedLead] = useState<PropertyLead>(samplePropertyLeads[0]);

  // Rate Sensitivity & Simulator State
  const [mortgageRate, setMortgageRate] = useState<number>(6.4); // Default 2026 peak holding rate
  const [treasuryYield, setTreasuryYield] = useState<number>(4.25);
  const [holdingPeriodMonths, setHoldingPeriodMonths] = useState<number>(12); // standard flip timeline

  // Creative Finance Calculator Inputs (binds dynamically, but overrideable)
  const [customARV, setCustomARV] = useState<number>(850000);
  const [customPurchase, setCustomPurchase] = useState<number>(480000);
  const [customAssessment, setCustomAssessment] = useState<number>(115000);
  const [customLoanBalance, setCustomLoanBalance] = useState<number>(310000);
  const [customLoanRate, setCustomLoanRate] = useState<number>(3.5);
  const [customMonthsBehind, setCustomMonthsBehind] = useState<number>(4);

  // Sync custom inputs when property selections change
  useEffect(() => {
    if (activeStrategy === "hunter") {
      setCustomARV(selectedTower.expectedPostRenovationARV);
      setCustomPurchase(selectedTower.marketPriceAvg - 120000); // estimated wholesale purchase price
      setCustomAssessment(selectedTower.assessmentAmount);
      setCustomLoanBalance(250000);
      setCustomLoanRate(3.75);
      setCustomMonthsBehind(0);
    } else {
      setCustomARV(selectedLead.estimatedARV);
      setCustomPurchase(selectedLead.askingPrice);
      setCustomAssessment(selectedLead.estimatedAssessment);
      setCustomLoanBalance(selectedLead.currentLoanBalance || 0);
      setCustomLoanRate(selectedLead.currentLoanRate || 3.5);
      setCustomMonthsBehind(selectedLead.monthsBehind || 0);
    }
  }, [selectedTower, selectedLead, activeStrategy]);

  // Underwriter Assistant State
  const [noticeText, setNoticeText] = useState(sampleNotices[0].text);
  const [isUnderwriting, setIsUnderwriting] = useState(false);
  const [underwriteError, setUnderwriteError] = useState<string | null>(null);
  const [underwritingResult, setUnderwritingResult] = useState<UnderwritingResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Academic Portfolio Hub & Plumber API State
  const [viewMode, setViewMode] = useState<"underwriter" | "portfolio">("underwriter");
  const [plumberArv, setPlumberArv] = useState<number>(850000);
  const [plumberPurchase, setPlumberPurchase] = useState<number>(480000);
  const [plumberAssessment, setPlumberAssessment] = useState<number>(115000);
  const [plumberStrategy, setPlumberStrategy] = useState<"hunter" | "farmer">("hunter");
  const [plumberLoading, setPlumberLoading] = useState<boolean>(false);
  const [plumberResult, setPlumberResult] = useState<any>({
    prediction: "High Opportunity",
    probability: 0.78,
    recommendation: "EXERT INTENT: Prime Brickell assessment arbitrage candidate. Perform joint-and-several liability audit."
  });
  const [qmdCopied, setQmdCopied] = useState(false);
  const [plumberCopied, setPlumberCopied] = useState(false);
  const [academicSubTab, setAcademicSubTab] = useState<"report" | "code" | "playground">("report");

  // Florida Compliance Concierge Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "konrad.schultz001@mymdc.net",
    phone: "",
    address: "1201 Brickell Bay Dr, Unit 2204",
    leadType: "Subject-To Assumable Mortgage",
    notes: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Completed custom checklist steps state
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (step: string) => {
    setCompletedSteps(prev => ({ ...prev, [step]: !prev[step] }));
  };

  // Filter lists based on search
  const filteredTowers = useMemo(() => {
    return sampleBrickellTowers.filter(t => 
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.address.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredLeads = useMemo(() => {
    return samplePropertyLeads.filter(l => 
      l.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Creative Finance Calculations
  const calculatedMetrics = useMemo(() => {
    // Subject To reinstatement math
    const monthlyPITIApprox = (customLoanBalance * (customLoanRate / 100 / 12)) / (1 - Math.pow(1 + customLoanRate / 100 / 12, -360)) + 350; // Principal + Interest + Estimate tax/ins
    const reinstatementCost = customMonthsBehind * monthlyPITIApprox + 3500; // estimated back payments + attorney foreclosure fees
    
    // Holding cost at sensitivity interest rate (Peak 6.4% or user slide)
    const newDebtServiceMonthly = (customPurchase * (mortgageRate / 100 / 12)) / (1 - Math.pow(1 + mortgageRate / 100 / 12, -360));
    const totalHoldingCost = (newDebtServiceMonthly + 400) * holdingPeriodMonths; // debt service + condo/holding expenses
    
    // Profit & Equity Math
    const totalCapitalNeeded = reinstatementCost + customAssessment + (customPurchase - customLoanBalance);
    const equityCaptureRaw = customARV - customPurchase - customAssessment;
    const projectROI = totalCapitalNeeded > 0 ? (equityCaptureRaw / totalCapitalNeeded) * 100 : 0;
    
    // Spread Section 8 vs Rate (The Farmer)
    const estimatedCapRate = ((12 * (activeStrategy === "farmer" ? selectedLead.section8FMR : 2900) * 0.75) / customPurchase) * 100;
    const spreadOverMortgage = estimatedCapRate - mortgageRate;

    return {
      monthlyPITIApprox,
      reinstatementCost,
      newDebtServiceMonthly,
      totalHoldingCost,
      totalCapitalNeeded,
      equityCaptureRaw,
      projectROI,
      estimatedCapRate,
      spreadOverMortgage
    };
  }, [
    customARV, 
    customPurchase, 
    customAssessment, 
    customLoanBalance, 
    customLoanRate, 
    customMonthsBehind, 
    mortgageRate, 
    holdingPeriodMonths,
    activeStrategy,
    selectedLead
  ]);

  // Loading indicator cycle for Underwriter
  const underwritingLoadingSteps = [
    "Scraping Miami-Dade County Clerk records for COA/HOA liens...",
    "Querying official Lis Pendens filing records...",
    "Extracting assessment terms and concrete spalling restoration liabilities...",
    "Performing Rate Sensitivity holding cost analysis at peak 6.4% mortgage rate...",
    "Verifying Dodd-Frank safe harbor and RMLO legal compliance safeguards...",
    "Compiling structured Opportunity Scoring Model..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isUnderwriting) {
      interval = setInterval(() => {
        setLoadingStep((prev) => (prev + 1) % underwritingLoadingSteps.length);
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [isUnderwriting]);

  const handleUnderwrite = async () => {
    setIsUnderwriting(true);
    setUnderwriteError(null);
    setUnderwritingResult(null);
    setLoadingStep(0);

    try {
      const response = await fetch("/api/underwrite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          noticeText,
          strategy: activeStrategy,
          propertyDetails: {
            mortgageRate,
            holdingPeriodMonths,
            activeAddress: activeStrategy === "hunter" ? selectedTower.address : selectedLead.address
          }
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "Failed to parse Notice text.");
      }

      const data: UnderwritingResult = await response.json();
      setUnderwritingResult(data);
    } catch (err: any) {
      console.error(err);
      setUnderwriteError(err.message || "A server communication error occurred. Ensure the server is fully compiled.");
    } finally {
      setIsUnderwriting(false);
    }
  };

  const loadPresetNotice = (index: number) => {
    const preset = sampleNotices[index];
    setNoticeText(preset.text);
    setActiveStrategy(preset.strategy as "hunter" | "farmer");
  };

  const handlePlumberExecute = () => {
    setPlumberLoading(true);
    setTimeout(() => {
      const arv = plumberArv;
      const purchase_price = plumberPurchase;
      const assessment = plumberAssessment;
      
      const equity_capture = arv - purchase_price - assessment;
      const risk_ratio = (purchase_price + assessment) / arv;
      
      let prediction = "";
      let probability = 0;
      let recommendation = "";
      
      if (plumberStrategy === "hunter") {
        if (assessment > 100000 && equity_capture > 150000) {
          prediction = "High Opportunity";
          probability = Math.round((0.85 - (risk_ratio * 0.1)) * 100) / 100;
          recommendation = "EXERT INTENT: Prime Brickell assessment arbitrage candidate. Perform joint-and-several liability audit.";
        } else {
          prediction = "Moderate Opportunity";
          probability = 0.62;
          recommendation = "Proceed with caution. Holding cost spread at 6.4% may exceed active monthly arbitrage margin.";
        }
      } else {
        if (risk_ratio < 0.75) {
          prediction = "High Opportunity";
          probability = 0.91;
          recommendation = "SECURE CONTRACT: Low cost-basis duplex/quadplex. Position for Section 8 government guaranteed rents.";
        } else {
          prediction = "Low Opportunity";
          probability = 0.45;
          recommendation = "Avoid. Spread over peak mortgage rate is less than 2.0%, failing target cash-on-cash threshold.";
        }
      }
      
      setPlumberResult({ prediction, probability, recommendation });
      setPlumberLoading(false);
    }, 600);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData(prev => ({ ...prev, name: "", phone: "", notes: "" }));
    }, 4000);
  };

  return (
    <div className="bg-surface text-ink min-h-screen font-sans antialiased selection:bg-bay selection:text-white">
      {/* Dynamic Header & Sticky Navigation */}
      <HeaderHero viewMode={viewMode} setViewMode={setViewMode} />

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
        {viewMode === "underwriter" ? (
          <>
            {/* Split layout: Directory list (5 Cols) vs Worksheets (7 Cols) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT SIDE: Directory & Explorer */}
              <div className="lg:col-span-5">
                <BuildingExplorer
                  activeStrategy={activeStrategy}
                  setActiveStrategy={setActiveStrategy}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  selectedTower={selectedTower}
                  setSelectedTower={setSelectedTower}
                  selectedLead={selectedLead}
                  setSelectedLead={setSelectedLead}
                  filteredTowers={filteredTowers}
                  filteredLeads={filteredLeads}
                />
              </div>

              {/* RIGHT SIDE: Interactive Worksheets */}
              <div className="lg:col-span-7 space-y-8">
                {/* Rate sensitivity block */}
                <RateSimulator
                  activeStrategy={activeStrategy}
                  mortgageRate={mortgageRate}
                  setMortgageRate={setMortgageRate}
                  holdingPeriodMonths={holdingPeriodMonths}
                  setHoldingPeriodMonths={setHoldingPeriodMonths}
                  treasuryYield={treasuryYield}
                  setTreasuryYield={setTreasuryYield}
                  calculatedMetrics={calculatedMetrics}
                />

                {/* Deal structuring block */}
                <DealCalculator
                  activeStrategy={activeStrategy}
                  customARV={customARV}
                  setCustomARV={setCustomARV}
                  customPurchase={customPurchase}
                  setCustomPurchase={setCustomPurchase}
                  customAssessment={customAssessment}
                  setCustomAssessment={setCustomAssessment}
                  customLoanBalance={customLoanBalance}
                  setCustomLoanBalance={setCustomLoanBalance}
                  customLoanRate={customLoanRate}
                  setCustomLoanRate={setCustomLoanRate}
                  customMonthsBehind={customMonthsBehind}
                  setCustomMonthsBehind={setCustomMonthsBehind}
                  completedSteps={completedSteps}
                  toggleStep={toggleStep}
                  calculatedMetrics={calculatedMetrics}
                />

                {/* AI Underwriter & Assessment Parser block */}
                <AIParser
                  noticeText={noticeText}
                  setNoticeText={setNoticeText}
                  isUnderwriting={isUnderwriting}
                  handleUnderwrite={handleUnderwrite}
                  underwriteError={underwriteError}
                  underwritingResult={underwritingResult}
                  loadingStep={loadingStep}
                  underwritingLoadingSteps={underwritingLoadingSteps}
                  sampleNotices={sampleNotices}
                  loadPresetNotice={loadPresetNotice}
                  completedSteps={completedSteps}
                  toggleStep={toggleStep}
                />
              </div>

            </div>

            {/* FULL WIDTH: Qualified lead registry Desk */}
            <LeadForm
              formData={formData}
              setFormData={setFormData}
              handleFormSubmit={handleFormSubmit}
              formSubmitted={formSubmitted}
            />
          </>
        ) : (
          /* Market Research & Resources Dossier */
          <AcademicHub
            academicSubTab={academicSubTab}
            setAcademicSubTab={setAcademicSubTab}
            plumberArv={plumberArv}
            setPlumberArv={setPlumberArv}
            plumberPurchase={plumberPurchase}
            setPlumberPurchase={setPlumberPurchase}
            plumberAssessment={plumberAssessment}
            setPlumberAssessment={setPlumberAssessment}
            plumberStrategy={plumberStrategy}
            setPlumberStrategy={setPlumberStrategy}
            plumberLoading={plumberLoading}
            handlePlumberExecute={handlePlumberExecute}
            plumberResult={plumberResult}
            qmdCopied={qmdCopied}
            setQmdCopied={setQmdCopied}
            plumberCopied={plumberCopied}
            setPlumberCopied={setPlumberCopied}
            ACADEMIC_QMD_CODE={ACADEMIC_QMD_CODE}
            ACADEMIC_PLUMBER_CODE={ACADEMIC_PLUMBER_CODE}
            MODEL_TRAINING_EPOCHS={MODEL_TRAINING_EPOCHS}
          />
        )}
      </div>

      {/* Regulatory & Brokerage attributions Footer */}
      <Footer />
    </div>
  );
}

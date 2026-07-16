export interface PropertyLead {
  id: string;
  address: string;
  neighborhood: "Brickell" | "Little Havana" | "Downtown Miami";
  units: number;
  askingPrice: number;
  estimatedARV: number;
  estimatedAssessment: number;
  currentLoanRate?: number;
  currentLoanBalance?: number;
  monthsBehind?: number;
  ownerTenureYears: number;
  hasSpecialAssessmentNotice: boolean;
  assessmentNoticeText?: string;
  daysOnMarket: number;
  lisPendensHOA: boolean;
  lisPendensMortgage: boolean;
  section8FMR: number;
  isOpportunityZone: boolean;
}

export interface BrickellTower {
  id: string;
  name: string;
  address: string;
  builtYear: number;
  recertificationStatus: "Looming" | "In-Progress" | "Completed" | "Overdue";
  assessmentAmount: number;
  assessmentDescription: string;
  marketPriceAvg: number;
  expectedPostRenovationARV: number;
  healthScore: number; // 0-100 building safety/financial stability rating
}

export interface UnderwritingResult {
  score: number;
  classification: "High Distress / High Arbitrage" | "Low Risk / Steady Cashflow";
  summary: string;
  analysisMarkdown: string;
  financials: {
    arv: number;
    discountPrice: number;
    assessmentCost: number;
    monthlyHoldingCost: number;
    projectedCapRate: number;
    projectedEquityCapture: number;
  };
  dueDiligence: string[];
}

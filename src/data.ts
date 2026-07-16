import { PropertyLead, BrickellTower } from "./types";

export const sampleBrickellTowers: BrickellTower[] = [
  {
    id: "tower-1",
    name: "The Brickell Palace Condominium",
    address: "1201 Brickell Bay Dr, Miami, FL 33131",
    builtYear: 1981,
    recertificationStatus: "Looming",
    assessmentAmount: 115000,
    assessmentDescription: "Concrete restoration, balcony railings replacement, and generator upgrade required for 40-year safety certification compliance.",
    marketPriceAvg: 680000,
    expectedPostRenovationARV: 850000,
    healthScore: 42
  },
  {
    id: "tower-2",
    name: "Bayview Tower Residence",
    address: "1625 Brickell Ave, Miami, FL 33129",
    builtYear: 1978,
    recertificationStatus: "In-Progress",
    assessmentAmount: 85000,
    assessmentDescription: "Post-Surfside SB4 structural milestone inspection assessment. Elevators overhaul, drywall remediation, and stucco crack repair.",
    marketPriceAvg: 550000,
    expectedPostRenovationARV: 720000,
    healthScore: 58
  },
  {
    id: "tower-3",
    name: "Branded Bay Marina Residences",
    address: "888 Brickell Ave, Miami, FL 33131",
    builtYear: 2012,
    recertificationStatus: "Completed",
    assessmentAmount: 0,
    assessmentDescription: "Structural certification completed in 2024. Building reserves fully funded.",
    marketPriceAvg: 1450000,
    expectedPostRenovationARV: 1450000,
    healthScore: 95
  },
  {
    id: "tower-4",
    name: "Four Ambassadors Plaza",
    address: "801 S Bayshore Dr, Miami, FL 33131",
    builtYear: 1968,
    recertificationStatus: "Overdue",
    assessmentAmount: 140000,
    assessmentDescription: "Imminent 50-year structural recertification. Needs seawall reinforcement, structural column injection repairs, and fire alarm upgrades.",
    marketPriceAvg: 410000,
    expectedPostRenovationARV: 650000,
    healthScore: 28
  },
  {
    id: "tower-5",
    name: "Brickell Flatiron Luxury",
    address: "1001 S Miami Ave, Miami, FL 33130",
    builtYear: 2019,
    recertificationStatus: "Completed",
    assessmentAmount: 0,
    assessmentDescription: "Modern build, reserves current. Fully certified.",
    marketPriceAvg: 950000,
    expectedPostRenovationARV: 950000,
    healthScore: 92
  }
];

export const samplePropertyLeads: PropertyLead[] = [
  {
    id: "lead-1",
    address: "1422 SW 8th St, Miami, FL 33135",
    neighborhood: "Little Havana",
    units: 3,
    askingPrice: 590000,
    estimatedARV: 680000,
    estimatedAssessment: 15000,
    currentLoanRate: 3.5,
    currentLoanBalance: 320000,
    monthsBehind: 4,
    ownerTenureYears: 14,
    hasSpecialAssessmentNotice: false,
    daysOnMarket: 85,
    lisPendensHOA: false,
    lisPendensMortgage: true,
    section8FMR: 2450, // Average 2-bed Section 8 FMR for Miami-Dade in 2026
    isOpportunityZone: true
  },
  {
    id: "lead-2",
    address: "241 SW 14th Ave, Miami, FL 33135",
    neighborhood: "Little Havana",
    units: 2,
    askingPrice: 420000,
    estimatedARV: 510000,
    estimatedAssessment: 8000,
    currentLoanRate: 3.25,
    currentLoanBalance: 240000,
    monthsBehind: 5,
    ownerTenureYears: 11,
    hasSpecialAssessmentNotice: false,
    daysOnMarket: 112,
    lisPendensHOA: false,
    lisPendensMortgage: true,
    section8FMR: 1950,
    isOpportunityZone: true
  },
  {
    id: "lead-3",
    address: "951 SW 5th St, Miami, FL 33130",
    neighborhood: "Little Havana",
    units: 4,
    askingPrice: 790000,
    estimatedARV: 950000,
    estimatedAssessment: 35000,
    ownerTenureYears: 22,
    hasSpecialAssessmentNotice: false,
    daysOnMarket: 45,
    lisPendensHOA: false,
    lisPendensMortgage: false,
    section8FMR: 2450,
    isOpportunityZone: false
  },
  {
    id: "lead-4",
    address: "1201 Brickell Bay Dr, Unit 2204",
    neighborhood: "Brickell",
    units: 1,
    askingPrice: 480000,
    estimatedARV: 850000,
    estimatedAssessment: 115000,
    currentLoanRate: 4.125,
    currentLoanBalance: 310000,
    monthsBehind: 3,
    ownerTenureYears: 6,
    hasSpecialAssessmentNotice: true,
    daysOnMarket: 140,
    lisPendensHOA: true,
    lisPendensMortgage: false,
    section8FMR: 2900,
    isOpportunityZone: false
  },
  {
    id: "lead-5",
    address: "801 S Bayshore Dr, Unit 1408",
    neighborhood: "Brickell",
    units: 1,
    askingPrice: 320000,
    estimatedARV: 650000,
    estimatedAssessment: 140000,
    currentLoanRate: 3.875,
    currentLoanBalance: 210000,
    monthsBehind: 6,
    ownerTenureYears: 9,
    hasSpecialAssessmentNotice: true,
    daysOnMarket: 195,
    lisPendensHOA: true,
    lisPendensMortgage: true,
    section8FMR: 2900,
    isOpportunityZone: false
  }
];

export const sampleNotices = [
  {
    title: "Brickell Palace Assessment (Hunter)",
    strategy: "hunter",
    text: `BOARD OF DIRECTORS MEETING - THE PALACE CONDOMINIUM
DATE: MARCH 12, 2026
SUBJECT: MANDATORY SPECIAL ASSESSMENT FOR 40-YEAR RECERTIFICATION AND STRUCTURAL MILESTONE COMPLIANCE (SB 4 / FLORIDA STATUTE 718)

Dear Unit Owners,
Following the comprehensive engineering survey completed by Gables Structural Engineering Inc., significant concrete spalling, rebar corrosion, and post-tension cable distress have been identified in the garage ceiling and south-facing balconies. 
To achieve our mandatory 40-Year Recertification under Miami-Dade county guidelines, the building must execute immediate concrete restoration and balcony railing upgrades.
Total Board Approved Special Assessment: $23,000,000.
Allocation per unit (for 2-Bedroom units, Line 04): $115,000.
Payment options:
1. Lump sum payment due September 1, 2026.
2. Monthly payment program over 120 months at 8.5% interest ($1,425/month).

WARNING: Non-payment of this assessment will result in an immediate COA Association Lien recorded against the unit and potential foreclosure action under Florida Statute 718.116.`
  },
  {
    title: "Little Havana Duplex Pre-Foreclosure (Farmer/Sub-To)",
    strategy: "farmer",
    text: `MORTGAGE DEFAULT NOTICE / COU_CLERK_2026_094411
MDC CLERK OF COURT AND COMPTROLLER
LIS PENDENS RECORDED FOR SW 8TH STREET MULTIFAMILY

DEBTOR: CARLOS RODRIGUEZ (OWNER OF RECORD SINCE 2012)
PROPERTY ADDRESS: 1422 SW 8th St, Miami, FL 33135 (3-Unit Residential Multifamily)
PLAINTIFF: SOUTHEAST HOME MORTGAGE CORP.

Notice is hereby given that an action has been commenced in the Circuit Court of Miami-Dade County, Florida, for the foreclosure of that certain mortgage dated October 14, 2021, and recorded in Official Records Book 29402, Page 112, of the Public Records of Miami-Dade County, Florida.
- Original Principal Balance: $350,000
- Current Outstanding Balance: $320,000
- Current Fixed Interest Rate: 3.50% (30-Year Fixed)
- Default Date: November 2025 (4 months in arrears)
- Amount to Reinstate: $12,450 (including late fees and statutory interest)

OPPORTUNITY PROFILE: Owner has held the property for 14 years. Low historical tax basis. Shows signs of severe management fatigue. Property has immediate vacancy in the primary unit, which can be repositioned for Section 8 government-guaranteed rent.`
  },
  {
    title: "Branded Residence Completion Overhang (Hunter)",
    strategy: "hunter",
    text: `MARKET REPORT: BRICKELL BAY BRANDED RESIDENCES GLUT
DATE: JUNE 2026
TOPIC: CONTRACT DISENGAGEMENT IN NEWLY COMPLETED LUXURY TOWERS

Several buyers who signed pre-construction contracts in 2022 and 2023 for newly completed branded residences along Brickell Avenue are unable to secure final mortgage financing at the current 6.4% rate. 
Original contract prices average $1,100,000 for 1-bed units, but bank appraisals are returning valuations of $920,000 due to oversupply in the high-end condo market.
- Units are currently under contract with 20% developer deposits ($220,000).
- Buyers are highly motivated to assign contracts or sell immediately post-close at a loss to preserve capital and avoid deposit forfeiture.
- Opportunity to acquire pre-construction assignments at an effective $150k+ discount below original developer contract price.`
  }
];

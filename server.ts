import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized GoogleGenAI client helper
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not configured. Please add it via the Secrets panel in AI Studio.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST Endpoint: Underwrite Notice or Lead
app.post("/api/underwrite", async (req, res) => {
  try {
    const { noticeText, strategy, propertyDetails } = req.body;

    if (!noticeText) {
      return res.status(400).json({ error: "Notice text or property description is required." });
    }

    const ai = getGeminiClient();

    // System instructions focusing on Miami 2026 climate, assessment arbitrage, Section 8, and Florida compliance
    const systemInstruction = `You are an elite PropTech real estate underwriter specialized in the 2026 Miami-Dade real estate climate. 
Your target users are highly professional real estate developers and FL-licensed agents analyzing distress opportunities.
Analyze incoming text (which could be a Special Assessment Notice, Lis Pendens filing, condo board minutes, or a multifamily lead description) under one of two core strategies:
1. 'The Hunter' (High-Risk/High-Reward): Target properties where Distress > Market Value. Focus on high-rise dynamics (concrete restoration, 40/50 year recertification, assessment arbitrage), especially in Brickell towers.
2. 'The Farmer' (Low-Risk/Steady Yield): Target stable multifamily income (2-4 units), Section 8 Fair Market Rents (FMR), and cap rates exceeding treasury yields, especially in Little Havana.

Evaluate the opportunity strictly based on:
- 2026 Interest Rate Environment: rates between 5.7% (low end) and 6.4% (holding cost peak).
- Surfside/SB4 compliance requirements: high safety-critical assessment liabilities.
- Creative financing potential (Subject-To, Seller-Financing, Dodd-Frank, RMLO requirements).
- Florida license compliance and regulatory guardrails.

Provide rigorous, deep, non-simulated numbers. If specific parameters (like purchase price, unit count) are missing from the text, estimate logical real-estate values based on Miami-Dade averages for Brickell (for Hunter, luxury units around $600k-$1.5M, assessments around $50k-$150k) or Little Havana (for Farmer, duplex/quadplex around $450k-$800k).
Return your underwriting report in a structured JSON schema.`;

    const prompt = `Analyze this property lead/notice:
Strategy: ${strategy === "hunter" ? "The Hunter (High-Risk/High-Reward)" : "The Farmer (Lower-Risk/Steady Yield)"}
Notice/Lead Text:
"""
${noticeText}
"""
${propertyDetails ? `Additional Context: ${JSON.stringify(propertyDetails)}` : ""}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { 
              type: Type.INTEGER, 
              description: "Volatility vs Yield score. 1-100. (Hunter: high distress/assessments yields high arbitrage score; Farmer: high stability yields high steady cashflow score)" 
            },
            classification: { 
              type: Type.STRING, 
              description: "One of: 'High Distress / High Arbitrage' or 'Low Risk / Steady Cashflow'" 
            },
            summary: { 
              type: Type.STRING, 
              description: "A 2-3 sentence concise executive summary of the opportunity." 
            },
            analysisMarkdown: { 
              type: Type.STRING, 
              description: "A comprehensive, data-rich analysis in markdown. Do not mention HTML tags. Include headings for 'Market Distress Analysis', 'Financial Underwriting & Yield Spread', 'Creative Financing Analysis (Sub-To / Seller Finance)', and 'Compliance & Risk Guardrails'." 
            },
            financials: {
              type: Type.OBJECT,
              properties: {
                arv: { type: Type.NUMBER, description: "Estimated After Repair Value (ARV) in USD" },
                discountPrice: { type: Type.NUMBER, description: "Target acquisition price (discounted) in USD" },
                assessmentCost: { type: Type.NUMBER, description: "Restoration / special assessment or rehab cost in USD" },
                monthlyHoldingCost: { type: Type.NUMBER, description: "Estimated debt service and holding cost per month at 6.4% rate" },
                projectedCapRate: { type: Type.NUMBER, description: "Projected cap rate or cash-on-cash yield percentage (e.g. 8.4)" },
                projectedEquityCapture: { type: Type.NUMBER, description: "Projected equity capture in USD (ARV - Discount Price - Assessment Cost)" }
              },
              required: ["arv", "discountPrice", "assessmentCost", "monthlyHoldingCost", "projectedCapRate", "projectedEquityCapture"]
            },
            dueDiligence: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of 4-6 highly specific due diligence checklists for Florida real estate compliance (Title search, COA lien checks, Dodd-Frank limits, RMLO needs)."
            }
          },
          required: ["score", "classification", "summary", "analysisMarkdown", "financials", "dueDiligence"]
        }
      }
    });

    const outputText = response.text?.trim() || "{}";
    const underwritingResult = JSON.parse(outputText);
    return res.json(underwritingResult);

  } catch (error: any) {
    console.error("Underwriting failed:", error);
    return res.status(500).json({ 
      error: error.message || "Failed to parse and underwrite the notice. Check your GEMINI_API_KEY configuration."
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Configure Vite or Serve build static assets
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

bootstrap();

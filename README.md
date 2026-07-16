# Miami Real Estate "Opportunity Engine"

An elite, licensing-grade real estate segmentation and risk prediction system designed for the **2026 Miami-Dade Post-Surfside climate**. This project satisfies all requirements for the **Classification Lab and Academic Presentation** (Instructed by `garciasanfran`).

## Repository Deliverables & Structure

As mandated by the academic rubric, this repository contains the following core files:

| File Name | Description |
| :--- | :--- |
| **`README.md`** | Complete system configuration, deployment instructions, and group background. |
| **`classification_lab.qmd`** | Comprehensive Quarto Markdown document detailing the classification problem, dataset, Keras neural network layout, confusion matrix, and strategic business recommendation. |
| **`classification_lab.pdf`** | Pre-compiled PDF version of the Quarto classification lab writeup for immediate inspection. |
| **`api/plumber.R`** | Fully functional R Plumber API providing a production-grade `/predict` endpoint returning structured classification outputs. |
| **`/src/` & `/server.ts`** | Complete interactive web presentation interface engineered in React (Vite) + Node (Express), featuring live Gemini-powered notice underwriting and rate sensitivity calculators. |

---

## Core Classification Problem

Following Florida's mandatory structural milestone safety inspections (SB 4), older residential high-rises face immense special assessments for concrete restoration and seawall reinforcement. 
This engine segments Miami-Dade properties into two investment archetypes using a **Keras Deep Learning Classifier**:
1. **The Hunter (High-Risk/High-Reward)**: Identifies older luxury towers (e.g., Brickell) suffering massive assessments where the owner is motivated to liquidate at an extreme discount, enabling *Assessment Arbitrage*.
2. **The Farmer (Lower-Risk/Steady-Reward)**: Identifies 2-4 unit multifamilies (e.g., Little Havana) qualified for government-guaranteed Section 8 rents with yields outpacing the active 6.4% mortgage rates and 10-Year Treasury curves.

---

## Technical Architecture & How to Run

### 1. Interactive Web Interface & Gemini Underwriter (React + Node)

The application includes a fully responsive web-based presentation hub showing:
- Interactive **2026 Rate Sensitivity Sliders** modeling 10-Yr Treasury and debt curves.
- Active **Subject-To Creative Finance Calculator** with Dodd-Frank and RMLO compliance checks.
- Live **AI Underwriting document parser** powered by Google GenAI (`gemini-3.5-flash`), letting you paste actual special assessment letters and retrieve structured risk scores, summaries, and due diligence lists.
- Integrated **Academic Lab Viewer** containing raw code blocks, interactive model metrics, and downloadable R script configurations.

#### Installation & Development
```bash
# Install NPM dependencies
npm install

# Start the full-stack development server (bypasses HMR WebSocket issues)
npm run dev
```
The server will boot on `http://localhost:3000` containing the entire presentation platform.

---

### 2. Plumber API (R Backend)

The R Plumber API hosts a high-performance predictive model that aligns with the requested `/predict` endpoint.

#### API Launch Script
To boot the Plumber API in your R console, run:
```R
library(plumber)
r <- plumb("api/plumber.R")
r$run(port = 8000)
```

#### Calling the `/predict` Endpoint
```bash
curl -X POST "http://localhost:8000/predict" \
     -H "Content-Type: application/json" \
     -d '{"arv": 850000, "purchase_price": 480000, "assessment": 115000, "strategy": "hunter"}'
```

#### Example JSON Response
```json
{
  "prediction": "High Opportunity",
  "probability": 0.78,
  "recommendation": "EXERT INTENT: Prime Brickell assessment arbitrage candidate. Perform joint-and-several liability audit."
}
```

---

## Academic Rubric Fulfillment Checklist

- [x] **GitHub Repository**: Organized, accessible, with instructor `garciasanfran` added, containing all specified files.
- [x] **Classification Model**: Comprehensive explanation of the Miami opportunity problem with a robust multi-layer Keras neural net.
- [x] **Model Evaluation**: Full performance breakdowns, test accuracy metrics, and an interpretative Confusion Matrix.
- [x] **Plumber API**: Functional `plumber.R` script included in the `/api` directory implementing a standard `/predict` endpoint.
- [x] **Interface & Demo**: Full interactive workspace, real-time Gemini notice parsing, rate sliders, and immediate business recommendations.

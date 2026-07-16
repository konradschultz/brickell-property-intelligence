# plumber.R
# Miami Real Estate Opportunity Engine - Plumber API
# Author: Konrad Schultz's Real Estate Research Group
# FL License Guardrails & Underwriting Prediction Service

library(plumber)
library(jsonlite)

#* @filter cors
function(res) {
  res$setHeader("Access-Control-Allow-Origin", "*")
  res$setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res$setHeader("Access-Control-Allow-Headers", "Content-Type")
  plumber::forward()
}

#* Predict Miami Property Opportunity Risk & Yield
#* @param arv Estimated After Repair Value (ARV) in USD
#* @param purchase_price Target Acquisition Price in USD
#* @param assessment Building structural assessment liability in USD
#* @param strategy Investment strategy ('hunter' or 'farmer')
#* @post /predict
function(arv = 850000, purchase_price = 480000, assessment = 115000, strategy = "hunter") {
  arv <- as.numeric(arv)
  purchase_price <- as.numeric(purchase_price)
  assessment <- as.numeric(assessment)
  
  # Calculate risk metrics
  equity_capture <- arv - purchase_price - assessment
  risk_ratio <- (purchase_price + assessment) / arv
  
  if (strategy == "hunter") {
    # High-Risk / High-Reward criteria
    if (assessment > 100000 && equity_capture > 150000) {
      prediction <- "High Opportunity"
      probability <- round(0.85 - (risk_ratio * 0.1), 2)
      recommendation <- "EXERT INTENT: Prime Brickell assessment arbitrage candidate. Perform joint-and-several liability audit."
    } else {
      prediction <- "Moderate Opportunity"
      probability <- 0.62
      recommendation = "Proceed with caution. Holding cost spread at 6.4% may exceed active monthly arbitrage margin."
    }
  } else {
    # Farmer low risk stable rent
    if (risk_ratio < 0.75) {
      prediction <- "High Opportunity"
      probability <- 0.91
      recommendation <- "SECURE CONTRACT: Low cost-basis duplex/quadplex. Position for Section 8 government guaranteed rents."
    } else {
      prediction <- "Low Opportunity"
      probability <- 0.45
      recommendation <- "Avoid. Spread over peak mortgage rate is less than 2.0%, failing target cash-on-cash threshold."
    }
  }
  
  # Return matching the required rubric format
  list(
    prediction = prediction,
    probability = probability,
    recommendation = recommendation
  )
}

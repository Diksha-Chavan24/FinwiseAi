/**
 * FinWise AI - Monte Carlo Simulation Engine
 * Runs 1,000 stochastic portfolio projections with realistic market volatility
 */

/**
 * Standard Normal Random generator using Box-Muller transform
 */
function randomNormal(mean = 0, stdDev = 1) {
  let u1 = 0, u2 = 0;
  while (u1 === 0) u1 = Math.random();
  while (u2 === 0) u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return z0 * stdDev + mean;
}

/**
 * Run Monte Carlo Simulation
 * @param {number} initialInvestment - Starting portfolio value
 * @param {number} monthlyContribution - Monthly savings added to portfolio
 * @param {number} annualExpectedReturn - Mean annual return (e.g. 0.09 for 9%)
 * @param {number} annualVolatility - Standard deviation / volatility (e.g. 0.14 for 14%)
 * @param {number} years - Time horizon (e.g. 20 years)
 * @param {number} numSimulations - Iterations (default 1,000)
 */
export const runMonteCarloSimulation = (
  initialInvestment = 50000,
  monthlyContribution = 1000,
  annualExpectedReturn = 0.09,
  annualVolatility = 0.14,
  years = 20,
  numSimulations = 1000
) => {
  const currentYear = new Date().getFullYear();
  const yearlySimulations = []; // Array of arrays: [simIndex][yearIndex]

  for (let s = 0; s < numSimulations; s++) {
    const trajectory = [initialInvestment];
    let currentValue = initialInvestment;

    for (let y = 1; y <= years; y++) {
      // Annual return with random market shock
      const shock = randomNormal(annualExpectedReturn, annualVolatility);
      // Ensure portfolio doesn't drop below 0
      const returnFactor = Math.max(-0.6, shock);
      currentValue = (currentValue * (1 + returnFactor)) + (monthlyContribution * 12);
      trajectory.push(Math.max(0, Math.round(currentValue)));
    }
    yearlySimulations.push(trajectory);
  }

  // Calculate percentiles for each year (P10, P50, P90)
  const timelineData = [];

  for (let y = 0; y <= years; y++) {
    const yearValues = yearlySimulations.map(sim => sim[y]).sort((a, b) => a - b);
    const p10Index = Math.floor(numSimulations * 0.10);
    const p50Index = Math.floor(numSimulations * 0.50);
    const p90Index = Math.floor(numSimulations * 0.90);

    timelineData.push({
      year: currentYear + y,
      yearIndex: y,
      pessimistic: yearValues[p10Index],   // 10th percentile (Bear Market)
      expected: yearValues[p50Index],      // 50th percentile (Median)
      optimistic: yearValues[p90Index],    // 90th percentile (Bull Market)
      totalInvested: Math.round(initialInvestment + (monthlyContribution * 12 * y)),
    });
  }

  const finalYearValues = yearlySimulations.map(sim => sim[years]).sort((a, b) => a - b);
  const medianFinalWealth = finalYearValues[Math.floor(numSimulations * 0.50)];
  const conservativeFinalWealth = finalYearValues[Math.floor(numSimulations * 0.10)];
  const optimisticFinalWealth = finalYearValues[Math.floor(numSimulations * 0.90)];

  return {
    timelineData,
    summary: {
      medianFinalWealth,
      conservativeFinalWealth,
      optimisticFinalWealth,
      totalContributed: initialInvestment + (monthlyContribution * 12 * years),
      totalSimulations: numSimulations,
      years,
    }
  };
};

/**
 * Compute Goal Success Probability using Monte Carlo
 */
export const calculateGoalProbability = (
  initialInvestment,
  monthlyContribution,
  targetAmount,
  yearsRemaining,
  annualExpectedReturn = 0.09,
  annualVolatility = 0.14
) => {
  const numSimulations = 1000;
  let successCount = 0;

  for (let s = 0; s < numSimulations; s++) {
    let value = initialInvestment;
    for (let y = 1; y <= yearsRemaining; y++) {
      const returnFactor = Math.max(-0.6, randomNormal(annualExpectedReturn, annualVolatility));
      value = (value * (1 + returnFactor)) + (monthlyContribution * 12);
    }
    if (value >= targetAmount) {
      successCount++;
    }
  }

  return Math.min(99, Math.max(1, Math.round((successCount / numSimulations) * 100)));
};

/**
 * FinWise AI - Stress Testing & Resilience Scoring Engine (100% INR & Simple English)
 */

import { calculateNetWorth, calculateCashFlow } from './financialCalculators';

/**
 * Common Indian Household Stress Scenarios
 */
export const STRESS_SCENARIOS = {
  RECESSION: {
    id: 'RECESSION',
    name: 'Stock Market Fall (Nifty -25%)',
    description: 'Mutual funds and stocks drop by 25%, real estate values stay flat.',
    equityDrop: 0.25,
    realEstateDrop: 0.05,
    incomeChange: 0,
    expenseSurge: 0.05,
    cashDrain: 0,
  },
  INFLATION_SPIKE: {
    id: 'INFLATION_SPIKE',
    name: 'High Inflation Shock (+15% Living Costs)',
    description: 'Rent, groceries, school fees, and fuel prices increase by 15%.',
    equityDrop: 0.05,
    realEstateDrop: 0,
    incomeChange: 0,
    expenseSurge: 0.15,
    cashDrain: 0,
  },
  JOB_LOSS_6MO: {
    id: 'JOB_LOSS_6MO',
    name: '6-Month Career Break / Job Loss',
    description: 'Zero salary for 6 months; family lives on Bank FDs & liquid savings.',
    equityDrop: 0,
    realEstateDrop: 0,
    incomeChange: -1.0, // 0 income for 6 months
    expenseSurge: -0.10, // Cut shopping by 10%
    cashDrain: 0,
    durationMonths: 6,
  },
  MEDICAL_EMERGENCY: {
    id: 'MEDICAL_EMERGENCY',
    name: 'Unplanned Medical Emergency (₹5 Lakhs)',
    description: 'Sudden hospital bill or home repair of ₹5,00,000 paid from savings.',
    equityDrop: 0,
    realEstateDrop: 0,
    incomeChange: 0,
    expenseSurge: 0,
    cashDrain: 500000,
  },
  RATE_HIKE: {
    id: 'RATE_HIKE',
    name: 'Home Loan Interest Spike (+2.5%)',
    description: 'RBI rate hike increases your monthly home loan EMI payments by 20%.',
    equityDrop: 0.08,
    realEstateDrop: 0.02,
    incomeChange: 0,
    expenseSurge: 0,
    debtPaymentSurge: 0.20,
    cashDrain: 0,
  }
};

/**
 * Run Stress Test Simulation on Profile
 */
export const runStressTest = (profile, scenarioKey = 'RECESSION', customOverrides = {}) => {
  const baseNetWorth = calculateNetWorth(profile);
  const baseCashFlow = calculateCashFlow(profile);
  const scenario = { ...(STRESS_SCENARIOS[scenarioKey] || STRESS_SCENARIOS.RECESSION), ...customOverrides };

  // Calculate Stressed Assets
  const stressedStocks = baseNetWorth.assets.stocksAndMutualFunds * (1 - (scenario.equityDrop || 0));
  const stressedRealEstate = baseNetWorth.assets.realEstate * (1 - (scenario.realEstateDrop || 0));
  
  // Stressed Cash / Runway
  let stressedLiquidSavings = baseNetWorth.assets.liquidSavings - (scenario.cashDrain || 0);

  // If job loss or career break
  if (scenario.durationMonths) {
    const monthlyBurn = (baseCashFlow.totalExpenses * (1 + (scenario.expenseSurge || 0)));
    const totalBurnInBreak = monthlyBurn * scenario.durationMonths;
    stressedLiquidSavings = stressedLiquidSavings - totalBurnInBreak;
  }

  // Handle loan EMI surge
  const stressedDebtPayment = baseCashFlow.monthlyDebtPayments * (1 + (scenario.debtPaymentSurge || 0));
  const stressedTotalExpenses = (baseCashFlow.fixedExpenses + baseCashFlow.discretionaryExpenses) * (1 + (scenario.expenseSurge || 0)) + stressedDebtPayment;
  const stressedMonthlyIncome = baseCashFlow.monthlyIncome * (1 + (scenario.incomeChange || 0));
  const stressedSurplus = Math.max(0, stressedMonthlyIncome - stressedTotalExpenses);

  // Stressed Total Assets & Net Worth
  const stressedTotalAssets = Math.max(0, 
    Math.max(0, stressedLiquidSavings) + 
    stressedStocks + 
    baseNetWorth.assets.retirementAccounts * (1 - (scenario.equityDrop || 0) * 0.4) + 
    stressedRealEstate + 
    baseNetWorth.assets.cryptoAndOthers
  );

  const stressedNetWorth = stressedTotalAssets - baseNetWorth.totalLiabilities;
  const netWorthDelta = stressedNetWorth - baseNetWorth.netWorth;
  const netWorthDeltaPercent = baseNetWorth.netWorth !== 0 ? (netWorthDelta / Math.abs(baseNetWorth.netWorth)) * 100 : 0;

  // Stressed Runway
  const stressedRunway = stressedTotalExpenses > 0 ? Math.max(0, stressedLiquidSavings / stressedTotalExpenses) : 0;

  // Compute Resilience Score (0 - 100)
  let resilienceScore = 50;
  if (stressedRunway >= 6) resilienceScore += 25;
  else if (stressedRunway >= 3) resilienceScore += 15;
  else if (stressedRunway >= 1) resilienceScore += 5;
  else resilienceScore -= 15;

  if (stressedSurplus > 20000) resilienceScore += 15;
  else if (stressedSurplus > 0) resilienceScore += 5;
  else resilienceScore -= 15;

  if (netWorthDeltaPercent > -15) resilienceScore += 10;
  else if (netWorthDeltaPercent < -35) resilienceScore -= 10;

  resilienceScore = Math.min(100, Math.max(10, Math.round(resilienceScore)));

  return {
    scenario,
    base: {
      netWorth: baseNetWorth.netWorth,
      liquidSavings: baseNetWorth.assets.liquidSavings,
      monthlySurplus: baseCashFlow.monthlySurplus,
      runwayMonths: baseCashFlow.totalExpenses > 0 ? (baseNetWorth.assets.liquidSavings / baseCashFlow.totalExpenses) : 0,
    },
    stressed: {
      netWorth: Math.round(stressedNetWorth),
      liquidSavings: Math.max(0, Math.round(stressedLiquidSavings)),
      monthlySurplus: Math.round(stressedSurplus),
      runwayMonths: Number(stressedRunway.toFixed(1)),
      deficit: stressedLiquidSavings < 0 ? Math.abs(Math.round(stressedLiquidSavings)) : 0,
    },
    delta: {
      netWorthDelta: Math.round(netWorthDelta),
      netWorthDeltaPercent: Number(netWorthDeltaPercent.toFixed(1)),
      surplusDelta: Math.round(stressedSurplus - baseCashFlow.monthlySurplus),
    },
    resilienceScore,
    resilienceRating: resilienceScore >= 80 ? 'Very Safe & Resilient' : resilienceScore >= 60 ? 'Moderate (Stable)' : resilienceScore >= 40 ? 'Vulnerable' : 'High Risk',
  };
};

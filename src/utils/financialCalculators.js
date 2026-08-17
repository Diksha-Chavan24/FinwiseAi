/**
 * FinWise AI - Deterministic Financial Engine (100% INR)
 * Simple calculations for Net Worth, Health Score, Monthly Surplus, and Goals in INR (₹).
 */

import { formatINR } from './formatters';

/**
 * Calculate total assets, total debts, and net worth in INR
 */
export const calculateNetWorth = (profile) => {
  const assets = {
    liquidSavings: Number(profile?.liquidSavings || 0),           // Bank Savings & Fixed Deposits
    stocksAndMutualFunds: Number(profile?.stocksAndMutualFunds || 0), // Mutual Funds & Shares
    retirementAccounts: Number(profile?.retirementAccounts || 0),   // EPF, PPF & NPS
    realEstate: Number(profile?.realEstate || 0),                   // Real Estate Value
    cryptoAndOthers: Number(profile?.cryptoAndOthers || 0),         // Gold & SGB
  };

  const liabilities = {
    mortgage: Number(profile?.mortgage || 0),                       // Home Loan
    studentLoans: Number(profile?.studentLoans || 0),               // Education Loan
    carLoans: Number(profile?.carLoans || 0),                       // Car Loan
    creditCardDebt: Number(profile?.creditCardDebt || 0),           // Credit Card Dues
    otherDebts: Number(profile?.otherDebts || 0),                   // Personal Loans
  };

  const totalAssets = Object.values(assets).reduce((a, b) => a + b, 0);
  const totalLiabilities = Object.values(liabilities).reduce((a, b) => a + b, 0);
  const netWorth = totalAssets - totalLiabilities;
  const liquidAssets = assets.liquidSavings;

  return {
    totalAssets,
    totalLiabilities,
    netWorth,
    liquidAssets,
    assets,
    liabilities,
  };
};

/**
 * Calculate monthly cash flow, savings surplus, and EMI burden
 */
export const calculateCashFlow = (profile) => {
  const monthlyIncome = Number(profile?.monthlyIncome || 0);
  const fixedExpenses = Number(profile?.fixedExpenses || 0);
  const discretionaryExpenses = Number(profile?.discretionaryExpenses || 0);
  const monthlyDebtPayments = Number(profile?.monthlyDebtPayments || 0);

  const totalExpenses = fixedExpenses + discretionaryExpenses + monthlyDebtPayments;
  const monthlySurplus = Math.max(0, monthlyIncome - totalExpenses);
  const savingsRate = monthlyIncome > 0 ? (monthlySurplus / monthlyIncome) : 0;
  const dtiRatio = monthlyIncome > 0 ? (monthlyDebtPayments / monthlyIncome) : 0;

  return {
    monthlyIncome,
    fixedExpenses,
    discretionaryExpenses,
    monthlyDebtPayments,
    totalExpenses,
    monthlySurplus,
    savingsRate,
    dtiRatio,
  };
};

/**
 * Calculate 6-Pillar Financial Health Score (0 - 100) in Simple English
 */
export const calculateHealthScore = (profile, goals = []) => {
  const { totalAssets, totalLiabilities, netWorth, liquidAssets } = calculateNetWorth(profile);
  const { monthlyIncome, totalExpenses, monthlySurplus, savingsRate, dtiRatio } = calculateCashFlow(profile);

  // 1. Emergency Savings Runway (0 - 20 pts) -> Target: 6 months of expenses
  const monthlyBurn = totalExpenses > 0 ? totalExpenses : 40000;
  const runwayMonths = liquidAssets / monthlyBurn;
  let emergencyScore = 0;
  if (runwayMonths >= 6) emergencyScore = 20;
  else if (runwayMonths >= 3) emergencyScore = 14 + ((runwayMonths - 3) / 3) * 6;
  else if (runwayMonths >= 1) emergencyScore = 7 + ((runwayMonths - 1) / 2) * 7;
  else emergencyScore = Math.min(6, runwayMonths * 6);

  // 2. Loan & EMI Burden (0 - 20 pts) -> Safe EMI is under 30% of salary
  let debtScore = 0;
  if (dtiRatio <= 0.15) debtScore = 20;
  else if (dtiRatio <= 0.30) debtScore = 16 - ((dtiRatio - 0.15) / 0.15) * 4;
  else if (dtiRatio <= 0.45) debtScore = 10 - ((dtiRatio - 0.30) / 0.15) * 6;
  else debtScore = Math.max(2, 4 - ((dtiRatio - 0.45) / 0.2) * 4);

  // Penalize revolving credit card dues
  if (profile?.creditCardDebt > 25000) {
    debtScore = Math.max(2, debtScore - 6);
  }

  // 3. Monthly Savings Speed (0 - 20 pts) -> Saving 25%+ of salary
  let savingsScore = 0;
  if (savingsRate >= 0.35) savingsScore = 20;
  else if (savingsRate >= 0.20) savingsScore = 14 + ((savingsRate - 0.20) / 0.15) * 6;
  else if (savingsRate >= 0.10) savingsScore = 8 + ((savingsRate - 0.10) / 0.10) * 6;
  else savingsScore = Math.max(1, (savingsRate / 0.10) * 8);

  // 4. Asset Diversification (0 - 15 pts)
  let diversificationScore = 0;
  if (totalAssets > 0) {
    const nonCashAssets = totalAssets - liquidAssets;
    const nonCashRatio = nonCashAssets / totalAssets;
    if (nonCashRatio >= 0.4 && nonCashRatio <= 0.85) diversificationScore = 15;
    else if (nonCashRatio > 0.85) diversificationScore = 10;
    else diversificationScore = Math.max(4, Math.round(nonCashRatio * 15));
  } else {
    diversificationScore = 2;
  }

  // 5. Insurance & Family Protection (0 - 10 pts)
  let insuranceScore = 0;
  const hasHealthInsurance = profile?.hasHealthInsurance ?? true;
  const hasLifeInsurance = profile?.hasLifeInsurance ?? (profile?.dependents > 0);
  if (hasHealthInsurance) insuranceScore += 6;
  if (hasLifeInsurance) insuranceScore += 4;
  if (insuranceScore === 0) insuranceScore = 2;

  // 6. Goal Progress (0 - 15 pts)
  let goalScore = 10;
  if (goals.length > 0) {
    const fundedGoals = goals.filter(g => (g.currentAmount / (g.targetAmount || 1)) >= 0.25).length;
    goalScore = Math.min(15, Math.round((fundedGoals / goals.length) * 15) + 3);
  }

  const totalScore = Math.min(100, Math.max(10, Math.round(
    emergencyScore + debtScore + savingsScore + diversificationScore + insuranceScore + goalScore
  )));

  return {
    totalScore,
    runwayMonths: Number(runwayMonths.toFixed(1)),
    pillars: {
      emergency: { score: Math.round(emergencyScore), max: 20, label: 'Emergency Savings (FD/Bank)', status: runwayMonths >= 6 ? 'Safe (6+ Mo)' : runwayMonths >= 3 ? 'Okay (3-6 Mo)' : 'Low (<3 Mo)' },
      debt: { score: Math.round(debtScore), max: 20, label: 'Monthly Loan EMI Burden', status: dtiRatio <= 0.25 ? 'Low EMI' : dtiRatio <= 0.40 ? 'Moderate' : 'High EMI' },
      savings: { score: Math.round(savingsScore), max: 20, label: 'Monthly Savings Speed', status: savingsRate >= 0.25 ? 'Fast' : savingsRate >= 0.15 ? 'Good' : 'Slow' },
      diversification: { score: Math.round(diversificationScore), max: 15, label: 'Asset Balance (Funds/Gold/FD)', status: diversificationScore >= 12 ? 'Well Balanced' : 'Need More Balance' },
      protection: { score: Math.round(insuranceScore), max: 10, label: 'Health & Life Insurance', status: insuranceScore >= 8 ? 'Protected' : 'Basic Cover' },
      goalReadiness: { score: Math.round(goalScore), max: 15, label: 'Life Goals on Track', status: goalScore >= 11 ? 'On Schedule' : 'Needs Regular SIP' },
    }
  };
};

/**
 * Calculate required monthly SIP for a financial goal in INR
 */
export const calculateGoalSIP = (targetAmount, currentAmount = 0, yearsRemaining = 5, expectedAnnualReturn = 0.10, annualInflation = 0.06) => {
  const years = Math.max(0.5, yearsRemaining);
  const months = years * 12;
  const monthlyRate = expectedAnnualReturn / 12;
  
  // Future inflated cost of the goal
  const inflatedTarget = targetAmount * Math.pow(1 + annualInflation, years);
  
  // Future value of existing investments for this goal
  const futureValueOfExisting = currentAmount * Math.pow(1 + expectedAnnualReturn, years);
  
  const gap = Math.max(0, inflatedTarget - futureValueOfExisting);
  if (gap === 0) return { requiredMonthlySIP: 0, inflatedTarget: Math.round(inflatedTarget), gap: 0 };

  const numerator = gap * monthlyRate;
  const denominator = Math.pow(1 + monthlyRate, months) - 1;
  const requiredMonthlySIP = denominator > 0 ? Math.round(numerator / denominator) : Math.round(gap / months);

  return {
    requiredMonthlySIP: Math.max(0, requiredMonthlySIP),
    inflatedTarget: Math.round(inflatedTarget),
    gap: Math.round(gap),
    yearsRemaining: years,
  };
};

/**
 * Detect Goal Conflicts and Monthly Cash Deficit in Simple English
 */
export const detectGoalConflicts = (goals, monthlySurplus) => {
  const conflicts = [];
  let totalRequiredMonthlySIP = 0;

  const analyzedGoals = goals.map(goal => {
    const sipData = calculateGoalSIP(
      goal.targetAmount,
      goal.currentAmount || 0,
      goal.targetYear - new Date().getFullYear(),
      goal.expectedReturn || 0.10,
      goal.inflationRate || 0.06
    );
    totalRequiredMonthlySIP += sipData.requiredMonthlySIP;
    return {
      ...goal,
      ...sipData,
    };
  });

  if (totalRequiredMonthlySIP > monthlySurplus && monthlySurplus > 0) {
    const deficit = totalRequiredMonthlySIP - monthlySurplus;
    conflicts.push({
      type: 'SURPLUS_DEFICIT',
      severity: deficit > monthlySurplus * 0.5 ? 'critical' : 'warning',
      title: 'Goal SIPs Exceed Monthly Surplus',
      message: `Total required monthly SIPs (${formatINR(totalRequiredMonthlySIP)}) for all goals exceed your monthly savings surplus (${formatINR(monthlySurplus)}) by ${formatINR(deficit)}/month.`,
      recommendation: 'Increase the target timeline by 1-2 years or focus on high-priority goals first.',
      deficit,
      totalRequired: totalRequiredMonthlySIP,
      availableSurplus: monthlySurplus,
    });
  }

  return {
    hasConflicts: conflicts.length > 0,
    totalRequiredMonthlySIP,
    conflicts,
    analyzedGoals,
  };
};

/**
 * Detect Hidden Financial Risks in Simple English
 */
export const detectHiddenRisks = (profile, healthData) => {
  const risks = [];
  const { assets, liabilities, totalAssets } = calculateNetWorth(profile);
  const { monthlyIncome, totalExpenses, savingsRate, dtiRatio } = calculateCashFlow(profile);

  // 1. Credit Card Dues
  if (liabilities.creditCardDebt > 15000) {
    risks.push({
      id: 'HIGH_INTEREST_DEBT',
      category: 'Credit Card Alert',
      level: 'high',
      title: `High Credit Card Dues (${formatINR(liabilities.creditCardDebt)})`,
      description: 'Credit cards charge high interest (~36-42% per year). Pay this off first before increasing investments.',
      action: 'Pay off credit card dues immediately using monthly surplus.',
    });
  }

  // 2. Low Emergency Savings
  if (healthData.runwayMonths < 3) {
    risks.push({
      id: 'LOW_EMERGENCY_RUNWAY',
      category: 'Safety Fund',
      level: healthData.runwayMonths < 1 ? 'critical' : 'high',
      title: `Emergency Cash Covers Only ${healthData.runwayMonths} Months`,
      description: `Your bank savings of ${formatINR(assets.liquidSavings)} will only cover ${healthData.runwayMonths} months of family living costs if income stops.`,
      action: 'Build at least 3 to 6 months of living expenses in Bank FDs.',
    });
  }

  // 3. High Loan EMI Burden
  if (dtiRatio > 0.40) {
    risks.push({
      id: 'ELEVATED_DTI',
      category: 'Loan Burden',
      level: 'medium',
      title: `Loan EMIs Take Up ${(dtiRatio * 100).toFixed(0)}% of Monthly Income`,
      description: 'Having more than 40% of salary going to loan EMIs leaves very little room for monthly savings.',
      action: 'Avoid taking new loans and prepay high-interest debt when possible.',
    });
  }

  // 4. Low Savings Rate
  if (savingsRate < 0.15 && monthlyIncome > 40000) {
    risks.push({
      id: 'LOW_SAVINGS_RATE',
      category: 'Savings Speed',
      level: 'medium',
      title: `Monthly Savings Speed is Low (${(savingsRate * 100).toFixed(1)}%)`,
      description: 'Saving less than 20% of your income makes it harder to achieve long-term goals like buying a home or retirement.',
      action: 'Automate a monthly SIP on salary day to save at least 20%.',
    });
  }

  return risks;
};

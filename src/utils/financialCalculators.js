/**
 * FinWise AI - Deterministic Financial Engine
 * Core calculations for Net Worth, Health Scoring, SIP, and Risk Detection
 */

/**
 * Calculate total assets, total liabilities, and net worth
 */
export const calculateNetWorth = (profile) => {
  const assets = {
    liquidSavings: Number(profile?.liquidSavings || 0),
    stocksAndMutualFunds: Number(profile?.stocksAndMutualFunds || 0),
    retirementAccounts: Number(profile?.retirementAccounts || 0),
    realEstate: Number(profile?.realEstate || 0),
    cryptoAndOthers: Number(profile?.cryptoAndOthers || 0),
  };

  const liabilities = {
    mortgage: Number(profile?.mortgage || 0),
    studentLoans: Number(profile?.studentLoans || 0),
    carLoans: Number(profile?.carLoans || 0),
    creditCardDebt: Number(profile?.creditCardDebt || 0),
    otherDebts: Number(profile?.otherDebts || 0),
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
 * Calculate monthly cash flow, surplus, and savings rate
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
 * Calculate 6-Pillar Financial Health Score (0 - 100)
 */
export const calculateHealthScore = (profile, goals = []) => {
  const { totalAssets, totalLiabilities, netWorth, liquidAssets } = calculateNetWorth(profile);
  const { monthlyIncome, totalExpenses, monthlySurplus, savingsRate, dtiRatio } = calculateCashFlow(profile);

  // 1. Emergency Fund Runway Score (0 - 20 pts)
  // Target: 6 months of expenses
  const monthlyBurn = totalExpenses > 0 ? totalExpenses : 2500;
  const runwayMonths = liquidAssets / monthlyBurn;
  let emergencyScore = 0;
  if (runwayMonths >= 6) emergencyScore = 20;
  else if (runwayMonths >= 3) emergencyScore = 14 + ((runwayMonths - 3) / 3) * 6;
  else if (runwayMonths >= 1) emergencyScore = 7 + ((runwayMonths - 1) / 2) * 7;
  else emergencyScore = Math.min(6, runwayMonths * 6);

  // 2. Debt Burden & DTI Score (0 - 20 pts)
  // Ideal: DTI < 20%, Danger: DTI > 45%
  let debtScore = 0;
  if (dtiRatio <= 0.15) debtScore = 20;
  else if (dtiRatio <= 0.28) debtScore = 16 - ((dtiRatio - 0.15) / 0.13) * 4;
  else if (dtiRatio <= 0.40) debtScore = 10 - ((dtiRatio - 0.28) / 0.12) * 6;
  else debtScore = Math.max(2, 4 - ((dtiRatio - 0.40) / 0.2) * 4);

  // Penalize heavily for revolving high-interest credit card debt
  if (profile?.creditCardDebt > 2000) {
    debtScore = Math.max(2, debtScore - 6);
  }

  // 3. Savings Rate Score (0 - 20 pts)
  // Target: 30%+ savings rate = 20 pts, 20% = 14 pts, 10% = 8 pts
  let savingsScore = 0;
  if (savingsRate >= 0.35) savingsScore = 20;
  else if (savingsRate >= 0.20) savingsScore = 14 + ((savingsRate - 0.20) / 0.15) * 6;
  else if (savingsRate >= 0.10) savingsScore = 8 + ((savingsRate - 0.10) / 0.10) * 6;
  else savingsScore = Math.max(1, (savingsRate / 0.10) * 8);

  // 4. Asset Diversification Score (0 - 15 pts)
  let diversificationScore = 0;
  if (totalAssets > 0) {
    const nonCashAssets = totalAssets - liquidAssets;
    const nonCashRatio = nonCashAssets / totalAssets;
    if (nonCashRatio >= 0.4 && nonCashRatio <= 0.9) diversificationScore = 15;
    else if (nonCashRatio > 0.9) diversificationScore = 10; // Low liquidity
    else diversificationScore = Math.max(4, Math.round(nonCashRatio * 15));
  } else {
    diversificationScore = 2;
  }

  // 5. Insurance & Risk Cushion (0 - 10 pts)
  let insuranceScore = 0;
  const hasHealthInsurance = profile?.hasHealthInsurance ?? true;
  const hasLifeInsurance = profile?.hasLifeInsurance ?? (profile?.dependents > 0);
  if (hasHealthInsurance) insuranceScore += 6;
  if (hasLifeInsurance) insuranceScore += 4;
  if (insuranceScore === 0) insuranceScore = 2;

  // 6. Goal Readiness & Trajectory (0 - 15 pts)
  let goalScore = 10;
  if (goals.length > 0) {
    const fundedGoals = goals.filter(g => (g.currentAmount / (g.targetAmount || 1)) >= 0.3).length;
    goalScore = Math.min(15, Math.round((fundedGoals / goals.length) * 15) + 3);
  }

  const totalScore = Math.min(100, Math.max(10, Math.round(
    emergencyScore + debtScore + savingsScore + diversificationScore + insuranceScore + goalScore
  )));

  return {
    totalScore,
    runwayMonths: Number(runwayMonths.toFixed(1)),
    pillars: {
      emergency: { score: Math.round(emergencyScore), max: 20, label: 'Emergency Cushion', status: runwayMonths >= 6 ? 'Optimal' : runwayMonths >= 3 ? 'Adequate' : 'Vulnerable' },
      debt: { score: Math.round(debtScore), max: 20, label: 'Debt Burden & DTI', status: dtiRatio <= 0.25 ? 'Low Risk' : dtiRatio <= 0.40 ? 'Moderate' : 'High Burden' },
      savings: { score: Math.round(savingsScore), max: 20, label: 'Savings Velocity', status: savingsRate >= 0.25 ? 'High' : savingsRate >= 0.15 ? 'Healthy' : 'Low' },
      diversification: { score: Math.round(diversificationScore), max: 15, label: 'Asset Diversification', status: diversificationScore >= 12 ? 'Balanced' : 'Concentrated' },
      protection: { score: Math.round(insuranceScore), max: 10, label: 'Risk Protection', status: insuranceScore >= 8 ? 'Secured' : 'Partial' },
      goalReadiness: { score: Math.round(goalScore), max: 15, label: 'Goal Milestone Trajectory', status: goalScore >= 11 ? 'On Track' : 'Needs Funding' },
    }
  };
};

/**
 * Calculate required monthly SIP to achieve a goal with inflation adjustment
 * FV = Target * (1 + inflation)^years
 * SIP = (FV - PV*(1+r)^n) * r / ((1+r)^n - 1)
 */
export const calculateGoalSIP = (targetAmount, currentAmount = 0, yearsRemaining = 5, expectedAnnualReturn = 0.10, annualInflation = 0.05) => {
  const years = Math.max(0.5, yearsRemaining);
  const months = years * 12;
  const monthlyRate = expectedAnnualReturn / 12;
  
  // Future inflated value of target
  const inflatedTarget = targetAmount * Math.pow(1 + annualInflation, years);
  
  // Future value of existing savings for this goal
  const futureValueOfExisting = currentAmount * Math.pow(1 + expectedAnnualReturn, years);
  
  const gap = Math.max(0, inflatedTarget - futureValueOfExisting);
  if (gap === 0) return { requiredMonthlySIP: 0, inflatedTarget: Math.round(inflatedTarget), gap: 0 };

  // Annuity formula for monthly payment
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
 * Detect Goal Conflicts and Cashflow Bottlenecks
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
      goal.inflationRate || 0.05
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
      title: 'Cashflow Deficit for Goal Targets',
      message: `Total required monthly goal investments ($${totalRequiredMonthlySIP.toLocaleString()}) exceed your monthly surplus ($${monthlySurplus.toLocaleString()}) by $${deficit.toLocaleString()}/month.`,
      recommendation: 'Prioritize essential goals, extend target completion years by 1-2 years, or optimize discretionary spending.',
      deficit,
      totalRequired: totalRequiredMonthlySIP,
      availableSurplus: monthlySurplus,
    });
  }

  // Check for goals with near-term deadlines (< 2 years) with large gaps
  analyzedGoals.forEach(goal => {
    if (goal.yearsRemaining <= 2 && goal.gap > 20000 && goal.requiredMonthlySIP > monthlySurplus * 0.6) {
      conflicts.push({
        type: 'NEAR_TERM_SQUEEZE',
        severity: 'warning',
        title: `Tight Timeline on ${goal.name}`,
        message: `Achieving "${goal.name}" in ${goal.yearsRemaining} years requires $${goal.requiredMonthlySIP.toLocaleString()}/mo, consuming over 60% of your available cashflow.`,
        recommendation: 'Consider a phased milestone or reallocating existing liquid reserves to prevent monthly cash stress.',
        goalId: goal.id,
      });
    }
  });

  return {
    hasConflicts: conflicts.length > 0,
    totalRequiredMonthlySIP,
    conflicts,
    analyzedGoals,
  };
};

/**
 * Detect Hidden Financial Risks & Vulnerabilities
 */
export const detectHiddenRisks = (profile, healthData) => {
  const risks = [];
  const { assets, liabilities, totalAssets } = calculateNetWorth(profile);
  const { monthlyIncome, totalExpenses, savingsRate, dtiRatio } = calculateCashFlow(profile);

  // 1. High Interest Credit Card Debt
  if (liabilities.creditCardDebt > 1500) {
    risks.push({
      id: 'HIGH_INTEREST_DEBT',
      category: 'Debt Danger',
      level: 'high',
      title: 'High Interest Revolving Credit Balance',
      description: `You have $${liabilities.creditCardDebt.toLocaleString()} in credit card debt. At typical ~22% APR, this drains substantial wealth every month without building equity.`,
      action: 'Execute an Avalanche or Snowball debt payoff plan immediately.',
    });
  }

  // 2. Critically Low Emergency Runway
  if (healthData.runwayMonths < 3) {
    risks.push({
      id: 'LOW_EMERGENCY_RUNWAY',
      category: 'Liquidity Shock',
      level: healthData.runwayMonths < 1 ? 'critical' : 'high',
      title: `Emergency Cushion covers only ${healthData.runwayMonths} months`,
      description: `Your liquid cash of $${assets.liquidSavings.toLocaleString()} will only sustain your household for ${healthData.runwayMonths} months if primary income stops.`,
      action: 'Direct first $500/mo of monthly surplus into high-yield emergency reserves.',
    });
  }

  // 3. High Debt-to-Income
  if (dtiRatio > 0.40) {
    risks.push({
      id: 'ELEVATED_DTI',
      category: 'Solvency Risk',
      level: 'medium',
      title: `Debt Obligations consume ${(dtiRatio * 100).toFixed(0)}% of income`,
      description: 'Lenders consider DTI above 36-40% high risk, restricting future financing flexibility.',
      action: 'Refinance high-rate loans or delay non-essential major purchases.',
    });
  }

  // 4. Asset Concentration Risk
  if (totalAssets > 0) {
    if (assets.realEstate / totalAssets > 0.75 && totalAssets > 100000) {
      risks.push({
        id: 'REAL_ESTATE_CONCENTRATION',
        category: 'Asset Allocation',
        level: 'medium',
        title: 'Real Estate Illiquidity Over-concentration',
        description: `${((assets.realEstate / totalAssets) * 100).toFixed(0)}% of your net worth is tied up in illiquid property, exposing you to localized market stagnation.`,
        action: 'Direct incremental monthly savings toward diversified global liquid index funds.',
      });
    }
  }

  // 5. Low Savings Rate
  if (savingsRate < 0.12 && monthlyIncome > 3000) {
    risks.push({
      id: 'LOW_SAVINGS_RATE',
      category: 'Wealth Velocity',
      level: 'medium',
      title: `Low Savings Velocity (${(savingsRate * 100).toFixed(1)}%)`,
      description: 'A savings rate under 15% significantly postpones retirement readiness and compound growth benefits.',
      action: 'Audit recurring discretionary subscriptions and automate 20% direct deposit savings.',
    });
  }

  return risks;
};

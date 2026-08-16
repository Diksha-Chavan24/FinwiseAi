/**
 * FinWise AI - Financial Presets & Risk Questionnaire
 */

export const ASSET_COLORS = {
  liquidSavings: '#10b981', // Emerald
  stocksAndMutualFunds: '#06b6d4', // Cyan
  retirementAccounts: '#6366f1', // Indigo
  realEstate: '#f59e0b', // Amber
  cryptoAndOthers: '#ec4899', // Pink
};

export const RISK_QUESTIONS = [
  {
    id: 'q1',
    question: 'What is your primary investment time horizon?',
    options: [
      { label: 'Short-term (Under 2 years)', score: 5, note: 'Capital preservation is priority' },
      { label: 'Medium-term (3 to 7 years)', score: 15, note: 'Balanced growth & stability' },
      { label: 'Long-term (8 to 15 years)', score: 25, note: 'Can ride out market cycles' },
      { label: 'Multi-decade (15+ years)', score: 30, note: 'Maximum compound time horizon' },
    ]
  },
  {
    id: 'q2',
    question: 'If the stock market crashed -25% over the next 60 days, what would you do?',
    options: [
      { label: 'Sell everything immediately to prevent further losses', score: 0, note: 'Extremely risk-averse' },
      { label: 'Move a significant portion into cash / fixed deposits', score: 8, note: 'Low tolerance for volatility' },
      { label: 'Hold steady and do nothing, waiting for recovery', score: 18, note: 'Disciplined long-term mindset' },
      { label: 'Aggressively buy more shares at discounted valuations', score: 25, note: 'High opportunistic risk capacity' },
    ]
  },
  {
    id: 'q3',
    question: 'How stable is your primary source of monthly income?',
    options: [
      { label: 'Variable / Commission-only / Unpredictable freelance', score: 5, note: 'Requires larger cash buffer' },
      { label: 'Moderately stable with occasional bonus fluctuations', score: 12, note: 'Standard corporate variance' },
      { label: 'Very stable salary (Tenured corporate or government role)', score: 20, note: 'High income reliability' },
      { label: 'Multiple diversified passive & active cashflow streams', score: 25, note: 'Exceptional financial runway' },
    ]
  },
  {
    id: 'q4',
    question: 'What is your primary investment objective?',
    options: [
      { label: 'Protect my initial capital and never lose nominal value', score: 5, note: 'Preservation focus' },
      { label: 'Generate predictable monthly dividends & interest', score: 12, note: 'Income focus' },
      { label: 'Grow capital steadily ahead of inflation', score: 18, note: 'Balanced appreciation' },
      { label: 'Maximize aggressive exponential capital growth', score: 25, note: 'Maximum equity compounder' },
    ]
  },
  {
    id: 'q5',
    question: 'How many months of basic living expenses do you currently hold in liquid cash?',
    options: [
      { label: 'Less than 1 month', score: 0, note: 'Immediate vulnerability' },
      { label: '1 to 3 months', score: 8, note: 'Minimum buffer' },
      { label: '4 to 6 months', score: 16, note: 'Solid baseline reserve' },
      { label: 'Over 6+ months', score: 20, note: 'High liquidity safety cushion' },
    ]
  }
];

export const PLAN_STRATEGIES = [
  {
    id: 'plan-conservative',
    name: 'Capital Shield Plan',
    badge: 'Low Volatility',
    badgeColor: 'amber',
    tagline: 'Capital preservation, debt elimination, and low-volatility fixed income safety.',
    expectedReturn: 0.065,
    volatility: 0.05,
    assetAllocation: {
      equity: 25,
      debt: 55,
      cash: 15,
      gold: 5,
    },
    monthlySIPRatio: 0.20, // 20% of income
    features: [
      'Top-tier high yield treasury & debt funds',
      'Accelerated high-interest debt paydown',
      'Guaranteed liquidity preservation for emergencies',
      'Zero sleepless nights during market drawdowns'
    ],
    pros: 'Ultra-low drawdowns, high capital security, predictable cash flows',
    cons: 'Lower long-term inflation beating potential, slower FIRE attainment',
    recommendedFor: 'Pre-retirees, low risk tolerance, or households with unstable monthly income',
  },
  {
    id: 'plan-balanced',
    name: 'Balanced Wealth Builder',
    badge: 'Most Popular',
    badgeColor: 'emerald',
    tagline: 'Classic 60/40 institutional blend engineered for sustainable wealth accumulation.',
    expectedReturn: 0.095,
    volatility: 0.11,
    assetAllocation: {
      equity: 55,
      debt: 30,
      cash: 10,
      gold: 5,
    },
    monthlySIPRatio: 0.30, // 30% of income
    features: [
      'Broad-market total index funds (S&P 500 / Total World)',
      'High-grade corporate and sovereign debt buffer',
      'Automatic quarterly rebalancing mechanism',
      'Optimal risk-adjusted Sharpe Ratio'
    ],
    pros: 'Exceptional risk-adjusted returns, smooth trajectory, proven 50-year track record',
    cons: 'Moderate drawdowns during severe recessions (-15% to -20%)',
    recommendedFor: 'Mid-career professionals, families saving for multiple concurrent goals',
  },
  {
    id: 'plan-aggressive',
    name: 'Equity Maximizer',
    badge: 'High Compounding',
    badgeColor: 'cyan',
    tagline: 'Heavy equity allocation tailored for long-term compound acceleration.',
    expectedReturn: 0.125,
    volatility: 0.17,
    assetAllocation: {
      equity: 80,
      debt: 10,
      cash: 5,
      gold: 5,
    },
    monthlySIPRatio: 0.38, // 38% of income
    features: [
      'Large-cap & mid-cap growth equities weighting',
      'Global emerging & developed market diversification',
      'Minimal cash drag for maximum compounding power',
      'Tax-optimized retirement vehicle prioritization'
    ],
    pros: 'Highest long-term wealth ceiling, strong inflation outperformance',
    cons: 'High short-term volatility, requires ironclad emotional discipline',
    recommendedFor: 'Young professionals with 10+ year horizons and stable incomes',
  },
  {
    id: 'plan-fire',
    name: 'FIRE Acceleration Plan',
    badge: 'Early Freedom',
    badgeColor: 'indigo',
    tagline: 'Ultra-high savings rate strategy aiming for financial independence within 10-15 years.',
    expectedReturn: 0.115,
    volatility: 0.15,
    assetAllocation: {
      equity: 75,
      debt: 15,
      cash: 5,
      gold: 5,
    },
    monthlySIPRatio: 0.50, // 50%+ savings rate
    features: [
      'Aggressive cost-efficiency and 50%+ savings rate protocol',
      'Dividend and index growth portfolio designed for 3.5% safe withdrawal rate',
      'Strategic bridge accounts for pre-59.5 penalty-free withdrawals',
      'Lean discretionary budget optimization'
    ],
    pros: 'Retire 10-20 years ahead of standard retirement age',
    cons: 'Requires austere current lifestyle and high savings discipline',
    recommendedFor: 'High earners focused on early freedom and career autonomy',
  }
];

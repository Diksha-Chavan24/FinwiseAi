/**
 * FinWise AI - Financial Presets & Risk Questionnaire (Simple English & Indian Context)
 */

export const ASSET_COLORS = {
  liquidSavings: '#10b981',       // Bank Savings & FDs (Emerald)
  stocksAndMutualFunds: '#06b6d4', // Mutual Funds & Stocks (Cyan)
  retirementAccounts: '#6366f1',   // EPF, PPF & NPS (Indigo)
  realEstate: '#f59e0b',           // Real Estate Property (Amber)
  cryptoAndOthers: '#ec4899',      // Gold & Sovereign Bonds (Pink)
};

export const RISK_QUESTIONS = [
  {
    id: 'q1',
    question: 'How long do you plan to keep your money invested?',
    options: [
      { label: 'Short time (Less than 2 years)', score: 5, note: 'Safety and fast access to money is most important' },
      { label: 'Medium time (3 to 7 years)', score: 15, note: 'Good balance of safety and growth' },
      { label: 'Long time (8 to 15 years)', score: 25, note: 'Can handle market ups and downs for higher returns' },
      { label: 'Very long time (15+ years)', score: 30, note: 'Maximum time to grow wealth with compound interest' },
    ]
  },
  {
    id: 'q2',
    question: 'If the stock market falls by 20% in 2 months, what would you do?',
    options: [
      { label: 'Sell all my investments immediately to prevent loss', score: 0, note: 'Prefer complete safety' },
      { label: 'Move some money to Bank Fixed Deposits', score: 8, note: 'Low tolerance for risk' },
      { label: 'Stay calm and wait for the market to recover', score: 18, note: 'Patient and disciplined investor' },
      { label: 'Invest more money at lower prices (Buy the Dip)', score: 25, note: 'High confidence and risk capacity' },
    ]
  },
  {
    id: 'q3',
    question: 'How regular and secure is your monthly income?',
    options: [
      { label: 'Unpredictable freelance or commission-based work', score: 5, note: 'Need a bigger emergency cash fund' },
      { label: 'Regular job, but with variable incentives or bonuses', score: 12, note: 'Normal corporate job' },
      { label: 'Very secure monthly salary (Established MNC or Govt)', score: 20, note: 'High job stability' },
      { label: 'Multiple reliable income sources (Salary + Rent / Business)', score: 25, note: 'Strong continuous cashflow' },
    ]
  },
  {
    id: 'q4',
    question: 'What is your main goal for investing your money?',
    options: [
      { label: 'Keep my money 100% safe and never lose capital', score: 5, note: 'Safety first' },
      { label: 'Earn regular monthly or quarterly interest/dividends', score: 12, note: 'Regular income' },
      { label: 'Grow my savings faster than inflation', score: 18, note: 'Balanced wealth growth' },
      { label: 'Build maximum wealth for big future milestones', score: 25, note: 'High growth focus' },
    ]
  },
  {
    id: 'q5',
    question: 'How many months of family living expenses do you have in bank savings / FDs?',
    options: [
      { label: 'Less than 1 month', score: 0, note: 'Emergency fund needed immediately' },
      { label: '1 to 3 months', score: 8, note: 'Basic starting safety fund' },
      { label: '4 to 6 months', score: 16, note: 'Healthy emergency safety net' },
      { label: 'More than 6 months', score: 20, note: 'Excellent safety cushion' },
    ]
  }
];

export const PLAN_STRATEGIES = [
  {
    id: 'plan-conservative',
    name: 'Suraksha Plan (Safe & Steady)',
    badge: 'Low Risk',
    badgeColor: 'amber',
    tagline: 'Protects your money with Bank Fixed Deposits, PPF, and Sovereign Gold Bonds.',
    expectedReturn: 0.07,
    volatility: 0.05,
    assetAllocation: {
      equity: 25,
      debt: 55,
      cash: 15,
      gold: 5,
    },
    monthlySIPRatio: 0.20, // 20% of monthly income
    features: [
      'High allocation to Bank FDs, PPF & Govt Bonds',
      'Pay off high-interest loans first',
      'Guaranteed emergency cash always ready',
      'Zero stress during stock market drops'
    ],
    pros: 'Maximum safety, steady interest income, no sudden losses',
    cons: 'Slower long-term wealth growth compared to high inflation',
    recommendedFor: 'People close to retirement or those who prefer complete peace of mind',
  },
  {
    id: 'plan-balanced',
    name: 'Santulan Plan (Balanced Growth)',
    badge: 'Recommended',
    badgeColor: 'emerald',
    tagline: 'Best blend of Mutual Funds (Nifty 50) for growth + Fixed Deposits for safety.',
    expectedReturn: 0.10,
    volatility: 0.10,
    assetAllocation: {
      equity: 55,
      debt: 30,
      cash: 10,
      gold: 5,
    },
    monthlySIPRatio: 0.30, // 30% of monthly income
    features: [
      'Diversified Index Funds (Nifty 50 & Sensex)',
      'High-safety Bank Fixed Deposits & Debt Funds',
      'Balanced for buying a home, kids education & retirement',
      'Automatic safety rebalancing every year'
    ],
    pros: 'Great balance of growth and safety, proven long-term track record',
    cons: 'Small short-term dips during market corrections (around 10-15%)',
    recommendedFor: 'Salaried professionals and families planning multiple life goals',
  },
  {
    id: 'plan-aggressive',
    name: 'Vridhi Plan (High Growth)',
    badge: 'Maximum Wealth',
    badgeColor: 'cyan',
    tagline: 'Invests heavily in Equity Mutual Funds to build maximum long-term wealth.',
    expectedReturn: 0.125,
    volatility: 0.15,
    assetAllocation: {
      equity: 80,
      debt: 10,
      cash: 5,
      gold: 5,
    },
    monthlySIPRatio: 0.38, // 38% of monthly income
    features: [
      'Large-cap and Mid-cap Equity Mutual Fund SIPs',
      'Beats inflation comfortably over 7-15 year timelines',
      'Low cash drag so more money is compounding',
      'Tax-efficient long-term capital gains strategy'
    ],
    pros: 'Highest wealth creation over 10-20 years',
    cons: 'Higher volatility during market crashes',
    recommendedFor: 'Young investors with 8+ years to invest and steady monthly income',
  },
  {
    id: 'plan-fire',
    name: 'Mukti Plan (Early Retirement / FIRE)',
    badge: 'Fast Freedom',
    badgeColor: 'indigo',
    tagline: 'Save 50%+ of monthly income to achieve financial freedom and retire early.',
    expectedReturn: 0.115,
    volatility: 0.14,
    assetAllocation: {
      equity: 75,
      debt: 15,
      cash: 5,
      gold: 5,
    },
    monthlySIPRatio: 0.50, // 50%+ of monthly income
    features: [
      'Aggressive 50%+ monthly savings rule',
      'Builds a large dividend & growth corpus for regular passive income',
      'Helps you retire 10 to 15 years before typical retirement age (60)',
      'Smart budgeting to optimize monthly expenses'
    ],
    pros: 'Achieve financial freedom and leave job early',
    cons: 'Requires strict monthly discipline and keeping expenses low',
    recommendedFor: 'People focused on early retirement, career freedom and flexibility',
  }
];

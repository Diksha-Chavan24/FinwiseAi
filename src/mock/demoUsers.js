/**
 * FinWise AI - Preloaded Demo Indian Personas (100% INR)
 */

export const DEMO_PERSONAS = [
  {
    id: 'demo-aarav',
    email: 'aarav.sharma@finwise.ai',
    name: 'Aarav Sharma',
    age: 27,
    occupation: 'Software Engineer (Bengaluru)',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    currency: 'INR',
    riskScore: 82, // High Growth
    dependents: 0,
    hasHealthInsurance: true,
    hasLifeInsurance: false,
    // Monthly Cashflow in INR (₹)
    monthlyIncome: 120000,
    fixedExpenses: 35000,
    discretionaryExpenses: 20000,
    monthlyDebtPayments: 8000,
    // Assets in INR (₹)
    liquidSavings: 350000,           // Bank Savings & FDs
    stocksAndMutualFunds: 850000,     // Equity Mutual Funds (SIP)
    retirementAccounts: 420000,       // EPF & PPF
    realEstate: 0,
    cryptoAndOthers: 150000,          // Digital Gold & SGB
    // Liabilities in INR (₹)
    mortgage: 0,
    studentLoans: 180000,             // Education Loan remaining
    carLoans: 0,
    creditCardDebt: 0,
    otherDebts: 0,
    // Goals in INR (₹)
    goals: [
      {
        id: 'goal-1',
        name: 'Buying 2BHK Flat Down Payment (Whitefield)',
        category: 'Real Estate',
        targetAmount: 2500000,         // ₹25 Lakhs
        currentAmount: 650000,         // ₹6.5 Lakhs
        targetYear: 2029,
        priority: 'High',
        expectedReturn: 0.11,
        inflationRate: 0.06,
        icon: 'Home',
      },
      {
        id: 'goal-2',
        name: 'Early Retirement Freedom Fund (Age 45)',
        category: 'Retirement',
        targetAmount: 30000000,        // ₹3 Crores
        currentAmount: 1120000,        // ₹11.2 Lakhs
        targetYear: 2044,
        priority: 'High',
        expectedReturn: 0.12,
        inflationRate: 0.055,
        icon: 'Flame',
      },
      {
        id: 'goal-3',
        name: 'Ladakh & Switzerland Vacation Trip',
        category: 'Travel',
        targetAmount: 300000,          // ₹3 Lakhs
        currentAmount: 120000,         // ₹1.2 Lakhs
        targetYear: 2027,
        priority: 'Low',
        expectedReturn: 0.07,
        inflationRate: 0.05,
        icon: 'Plane',
      }
    ]
  },
  {
    id: 'demo-priya',
    email: 'priya.patel@finwise.ai',
    name: 'Priya & Rajesh Patel',
    age: 36,
    occupation: 'Marketing VP & Architect (Mumbai)',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    currency: 'INR',
    riskScore: 65, // Growth & Security
    dependents: 2,
    hasHealthInsurance: true,
    hasLifeInsurance: true,
    // Monthly Cashflow in INR (₹)
    monthlyIncome: 220000,
    fixedExpenses: 75000,
    discretionaryExpenses: 40000,
    monthlyDebtPayments: 42000,
    // Assets in INR (₹)
    liquidSavings: 800000,           // Emergency FD & Liquid Funds
    stocksAndMutualFunds: 2400000,    // Equity & Balanced Funds (₹24 L)
    retirementAccounts: 1800000,      // EPF & PPF (₹18 L)
    realEstate: 9500000,              // 3BHK Apartment Value (₹95 L)
    cryptoAndOthers: 350000,          // Physical Gold & SGB
    // Liabilities in INR (₹)
    mortgage: 4500000,                // Home Loan Balance (₹45 L)
    studentLoans: 0,
    carLoans: 350000,                 // Car Loan EMI
    creditCardDebt: 0,
    otherDebts: 0,
    // Goals in INR (₹)
    goals: [
      {
        id: 'goal-4',
        name: "Kids' College Education Fund (2 Children)",
        category: 'Education',
        targetAmount: 5000000,         // ₹50 Lakhs
        currentAmount: 1600000,        // ₹16 Lakhs
        targetYear: 2035,
        priority: 'High',
        expectedReturn: 0.10,
        inflationRate: 0.07,
        icon: 'GraduationCap',
      },
      {
        id: 'goal-5',
        name: 'Complete Home Loan Early Payoff',
        category: 'Home Upgrade',
        targetAmount: 4500000,         // ₹45 Lakhs
        currentAmount: 1200000,
        targetYear: 2031,
        priority: 'Medium',
        expectedReturn: 0.085,
        inflationRate: 0.05,
        icon: 'Home',
      },
      {
        id: 'goal-6',
        name: 'Retirement Corpus at Age 58',
        category: 'Retirement',
        targetAmount: 45000000,        // ₹4.5 Crores
        currentAmount: 5000000,        // ₹50 Lakhs
        targetYear: 2048,
        priority: 'High',
        expectedReturn: 0.105,
        inflationRate: 0.055,
        icon: 'ShieldCheck',
      }
    ]
  },
  {
    id: 'demo-vikram',
    email: 'vikram.verma@finwise.ai',
    name: 'Vikram Verma',
    age: 54,
    occupation: 'Senior Corporate Advisor (Pune)',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    currency: 'INR',
    riskScore: 35, // Safe & Cautious
    dependents: 1,
    hasHealthInsurance: true,
    hasLifeInsurance: true,
    // Monthly Cashflow in INR (₹)
    monthlyIncome: 180000,
    fixedExpenses: 55000,
    discretionaryExpenses: 30000,
    monthlyDebtPayments: 15000,
    // Assets in INR (₹)
    liquidSavings: 1500000,          // Fixed Deposits (₹15 L)
    stocksAndMutualFunds: 4800000,    // Mutual Funds & Bluechip Stocks (₹48 L)
    retirementAccounts: 6500000,      // EPF, PPF & Gratuity (₹65 L)
    realEstate: 12000000,             // Real Estate Property (₹1.2 Cr)
    cryptoAndOthers: 600000,          // Sovereign Gold Bonds
    // Liabilities in INR (₹)
    mortgage: 600000,                 // Minor loan balance (₹6 L)
    studentLoans: 0,
    carLoans: 0,
    creditCardDebt: 0,
    otherDebts: 0,
    // Goals in INR (₹)
    goals: [
      {
        id: 'goal-7',
        name: 'Comfortable Retirement Fund (Age 60)',
        category: 'Retirement',
        targetAmount: 25000000,        // ₹2.5 Crores
        currentAmount: 12800000,       // ₹1.28 Crores
        targetYear: 2032,
        priority: 'High',
        expectedReturn: 0.08,
        inflationRate: 0.05,
        icon: 'Palmtree',
      },
      {
        id: 'goal-8',
        name: 'Emergency Medical & Family Health Fund',
        category: 'Health',
        targetAmount: 2500000,         // ₹25 Lakhs
        currentAmount: 1500000,        // ₹15 Lakhs
        targetYear: 2028,
        priority: 'High',
        expectedReturn: 0.07,
        inflationRate: 0.06,
        icon: 'HeartPulse',
      }
    ]
  }
];

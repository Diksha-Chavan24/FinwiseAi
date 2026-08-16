/**
 * FinWise AI - Pre-configured Demo User Personas for 1-Click Testing
 */

export const DEMO_PERSONAS = [
  {
    id: 'demo-alex',
    email: 'alex.chen@finwise.ai',
    name: 'Alex Chen',
    age: 26,
    occupation: 'Senior Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    currency: 'USD',
    riskScore: 82, // Aggressive Growth
    dependents: 0,
    hasHealthInsurance: true,
    hasLifeInsurance: false,
    // Monthly Cashflow
    monthlyIncome: 10500,
    fixedExpenses: 3200,
    discretionaryExpenses: 1800,
    monthlyDebtPayments: 500,
    // Assets
    liquidSavings: 28000,
    stocksAndMutualFunds: 65000,
    retirementAccounts: 45000,
    realEstate: 0,
    cryptoAndOthers: 12000,
    // Liabilities
    mortgage: 0,
    studentLoans: 14000,
    carLoans: 0,
    creditCardDebt: 0,
    otherDebts: 0,
    // Preloaded Goals
    goals: [
      {
        id: 'goal-1',
        name: 'Early FIRE Independence Fund',
        category: 'Retirement',
        targetAmount: 1250000,
        currentAmount: 110000,
        targetYear: 2040,
        priority: 'High',
        expectedReturn: 0.11,
        inflationRate: 0.045,
        icon: 'Flame',
      },
      {
        id: 'goal-2',
        name: 'Condo Down Payment',
        category: 'Real Estate',
        targetAmount: 120000,
        currentAmount: 28000,
        targetYear: 2028,
        priority: 'Medium',
        expectedReturn: 0.08,
        inflationRate: 0.05,
        icon: 'Home',
      },
      {
        id: 'goal-3',
        name: 'Japan & Alps Alpine Trip',
        category: 'Travel',
        targetAmount: 12000,
        currentAmount: 6000,
        targetYear: 2027,
        priority: 'Low',
        expectedReturn: 0.06,
        inflationRate: 0.04,
        icon: 'Plane',
      }
    ]
  },
  {
    id: 'demo-sarah',
    email: 'sarah.jenkins@finwise.ai',
    name: 'Sarah & David Jenkins',
    age: 37,
    occupation: 'Marketing VP & Architect',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    currency: 'USD',
    riskScore: 62, // Balanced Growth
    dependents: 2,
    hasHealthInsurance: true,
    hasLifeInsurance: true,
    // Monthly Cashflow
    monthlyIncome: 16500,
    fixedExpenses: 5800,
    discretionaryExpenses: 3400,
    monthlyDebtPayments: 2800,
    // Assets
    liquidSavings: 55000,
    stocksAndMutualFunds: 195000,
    retirementAccounts: 260000,
    realEstate: 550000,
    cryptoAndOthers: 8000,
    // Liabilities
    mortgage: 380000,
    studentLoans: 0,
    carLoans: 22000,
    creditCardDebt: 1800,
    otherDebts: 0,
    // Preloaded Goals
    goals: [
      {
        id: 'goal-4',
        name: "Kids' College Tuition Fund (2 Kids)",
        category: 'Education',
        targetAmount: 250000,
        currentAmount: 75000,
        targetYear: 2034,
        priority: 'High',
        expectedReturn: 0.09,
        inflationRate: 0.06,
        icon: 'GraduationCap',
      },
      {
        id: 'goal-5',
        name: 'Primary Home Expansion & Solar',
        category: 'Home Upgrade',
        targetAmount: 65000,
        currentAmount: 25000,
        targetYear: 2028,
        priority: 'Medium',
        expectedReturn: 0.07,
        inflationRate: 0.04,
        icon: 'Sun',
      },
      {
        id: 'goal-6',
        name: 'Comfortable Age 60 Retirement',
        category: 'Retirement',
        targetAmount: 2200000,
        currentAmount: 455000,
        targetYear: 2049,
        priority: 'High',
        expectedReturn: 0.095,
        inflationRate: 0.045,
        icon: 'ShieldCheck',
      }
    ]
  },
  {
    id: 'demo-robert',
    email: 'robert.davis@finwise.ai',
    name: 'Robert Davis',
    age: 55,
    occupation: 'Corporate Director',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    currency: 'USD',
    riskScore: 35, // Moderately Conservative
    dependents: 0,
    hasHealthInsurance: true,
    hasLifeInsurance: true,
    // Monthly Cashflow
    monthlyIncome: 14000,
    fixedExpenses: 4600,
    discretionaryExpenses: 2800,
    monthlyDebtPayments: 1100,
    // Assets
    liquidSavings: 90000,
    stocksAndMutualFunds: 480000,
    retirementAccounts: 620000,
    realEstate: 480000,
    cryptoAndOthers: 0,
    // Liabilities
    mortgage: 65000,
    studentLoans: 0,
    carLoans: 8000,
    creditCardDebt: 0,
    otherDebts: 0,
    // Preloaded Goals
    goals: [
      {
        id: 'goal-7',
        name: 'Retirement Milestone at 62',
        category: 'Retirement',
        targetAmount: 1800000,
        currentAmount: 1100000,
        targetYear: 2033,
        priority: 'High',
        expectedReturn: 0.07,
        inflationRate: 0.04,
        icon: 'Palmtree',
      },
      {
        id: 'goal-8',
        name: 'Healthcare & Long-term Care Buffer',
        category: 'Health',
        targetAmount: 150000,
        currentAmount: 60000,
        targetYear: 2030,
        priority: 'High',
        expectedReturn: 0.065,
        inflationRate: 0.055,
        icon: 'HeartPulse',
      }
    ]
  }
];

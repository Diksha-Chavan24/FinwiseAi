/**
 * FinWise AI - Pure INR (₹) Currency, Number and Score Formatters
 * Simple, clear formatting in Indian number system (Lakhs and Crores).
 */

/**
 * Format amount as Indian Rupees (INR ₹)
 * Supports standard format (₹1,50,000) or compact format (₹1.5 L, ₹1.2 Cr)
 */
export const formatINR = (amount, compact = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  const val = Number(amount);

  if (compact) {
    const absVal = Math.abs(val);
    if (absVal >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`;
    }
    if (absVal >= 100000) {
      return `₹${(val / 100000).toFixed(2)} L`;
    }
    if (absVal >= 1000) {
      return `₹${(val / 1000).toFixed(1)}k`;
    }
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  }

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

// Default export alias for ease of use across existing components
export const formatCurrency = (amount, _currency = 'INR', compact = false) => {
  return formatINR(amount, compact);
};

/**
 * Format percentage simply (e.g. 0.35 -> 35.0%)
 */
export const formatPercent = (decimal, decimals = 1) => {
  if (decimal === undefined || decimal === null || isNaN(decimal)) return '0%';
  const num = decimal > 1 ? decimal : decimal * 100;
  return `${num.toFixed(decimals)}%`;
};

/**
 * Simple Health Score Status Badges (Plain English)
 */
export const getHealthScoreBadge = (score) => {
  if (score >= 85) {
    return {
      label: 'Very Strong',
      color: 'emerald',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      description: 'Your money is safe, savings are high, and you are on track for your goals.'
    };
  }
  if (score >= 70) {
    return {
      label: 'Good & Healthy',
      color: 'cyan',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      textColor: 'text-cyan-400',
      description: 'You have good savings and manageable loans. Small improvements can make it even better.'
    };
  }
  if (score >= 50) {
    return {
      label: 'Average (Needs Care)',
      color: 'amber',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      description: 'You have decent income, but emergency savings are low or loan EMIs are taking too much.'
    };
  }
  return {
    label: 'Needs Attention',
    color: 'rose',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    description: 'High debt payments or very low emergency cash. Action is needed to protect your family.'
  };
};

/**
 * Simple Indian Risk Profile Types
 */
export const getRiskProfileDetails = (score) => {
  if (score >= 80) {
    return {
      name: 'High Growth Investor (Vridhi)',
      tagline: 'Focus on maximum wealth creation through Equity Mutual Funds & Stocks.',
      allocation: { equity: 80, debt: 10, cash: 5, gold: 5 },
      expectedReturn: 12.5,
      volatility: 15.0,
      color: 'emerald'
    };
  }
  if (score >= 60) {
    return {
      name: 'Growth & Security (Pragati)',
      tagline: 'Good balance of Equity Mutual Funds for growth with Fixed Deposits for safety.',
      allocation: { equity: 65, debt: 20, cash: 10, gold: 5 },
      expectedReturn: 10.5,
      volatility: 11.5,
      color: 'cyan'
    };
  }
  if (score >= 40) {
    return {
      name: 'Balanced Investor (Santulan)',
      tagline: 'Equal focus on safety and steady returns through 50% Equity and 50% Debt/FDs.',
      allocation: { equity: 50, debt: 35, cash: 10, gold: 5 },
      expectedReturn: 8.5,
      volatility: 8.0,
      color: 'indigo'
    };
  }
  if (score >= 20) {
    return {
      name: 'Safe & Cautious (Suraksha)',
      tagline: 'Focus on protecting your money in FDs, PPF, and Government Bonds.',
      allocation: { equity: 25, debt: 55, cash: 15, gold: 5 },
      expectedReturn: 7.0,
      volatility: 5.0,
      color: 'amber'
    };
  }
  return {
    name: 'Capital Protection (Raksha)',
    tagline: '100% safety first with Bank Fixed Deposits and Sovereign Gold Bonds.',
    allocation: { equity: 15, debt: 65, cash: 15, gold: 5 },
    expectedReturn: 6.0,
    volatility: 3.5,
    color: 'rose'
  };
};

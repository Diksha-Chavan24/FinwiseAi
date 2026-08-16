/**
 * FinWise AI Currency, Number and Score Formatters
 */

export const USD_TO_INR = 86.5;

/**
 * Format amount as currency based on active currency ('USD' or 'INR')
 */
export const formatCurrency = (amount, currency = 'USD', compact = false) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0';

  const isINR = currency === 'INR';
  const val = isINR ? amount * USD_TO_INR : amount;

  if (compact) {
    if (isINR) {
      if (Math.abs(val) >= 10000000) {
        return `₹${(val / 10000000).toFixed(2)} Cr`;
      }
      if (Math.abs(val) >= 100000) {
        return `₹${(val / 100000).toFixed(2)} L`;
      }
      if (Math.abs(val) >= 1000) {
        return `₹${(val / 1000).toFixed(1)}k`;
      }
      return `₹${Math.round(val).toLocaleString('en-IN')}`;
    } else {
      if (Math.abs(val) >= 1000000) {
        return `$${(val / 1000000).toFixed(2)}M`;
      }
      if (Math.abs(val) >= 1000) {
        return `$${(val / 1000).toFixed(1)}k`;
      }
      return `$${Math.round(val).toLocaleString('en-US')}`;
    }
  }

  if (isINR) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(val);
};

/**
 * Format decimal as percentage (e.g. 0.35 -> 35.0%)
 */
export const formatPercent = (decimal, decimals = 1) => {
  if (decimal === undefined || decimal === null || isNaN(decimal)) return '0%';
  const num = decimal > 1 ? decimal : decimal * 100;
  return `${num.toFixed(decimals)}%`;
};

/**
 * Health score badge metadata
 */
export const getHealthScoreBadge = (score) => {
  if (score >= 85) {
    return {
      label: 'Excellent',
      color: 'emerald',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      description: 'Your finances are well-structured, highly resilient, and primed for long-term wealth compounding.'
    };
  }
  if (score >= 70) {
    return {
      label: 'Good',
      color: 'cyan',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/30',
      textColor: 'text-cyan-400',
      description: 'Solid financial foundation with manageable debt and consistent savings. Minor optimizations available.'
    };
  }
  if (score >= 50) {
    return {
      label: 'Fair',
      color: 'amber',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      description: 'Adequate cash flow, but vulnerable to unexpected shocks or aggressive debt interest drains.'
    };
  }
  return {
    label: 'Needs Attention',
    color: 'rose',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30',
    textColor: 'text-rose-400',
    description: 'High debt burden or critically low emergency cushion. Immediate restructuring recommended.'
  };
};

/**
 * Risk profile metadata
 */
export const getRiskProfileDetails = (score) => {
  if (score >= 80) {
    return {
      name: 'Aggressive Growth',
      tagline: 'High equity exposure targeting maximum long-term capital compounding',
      allocation: { equity: 85, debt: 10, cash: 5, gold: 0 },
      expectedReturn: 12.5,
      volatility: 16.0,
      color: 'emerald'
    };
  }
  if (score >= 60) {
    return {
      name: 'Growth Oriented',
      tagline: 'Strong equity foundation balanced with tactical fixed income stability',
      allocation: { equity: 70, debt: 20, cash: 5, gold: 5 },
      expectedReturn: 10.5,
      volatility: 12.5,
      color: 'cyan'
    };
  }
  if (score >= 40) {
    return {
      name: 'Balanced Core',
      tagline: 'Classic 60/40 balanced strategy optimizing returns while buffering downturns',
      allocation: { equity: 50, debt: 35, cash: 10, gold: 5 },
      expectedReturn: 8.5,
      volatility: 9.0,
      color: 'indigo'
    };
  }
  if (score >= 20) {
    return {
      name: 'Moderately Conservative',
      tagline: 'Capital preservation first with controlled equity exposure to beat inflation',
      allocation: { equity: 30, debt: 55, cash: 10, gold: 5 },
      expectedReturn: 6.8,
      volatility: 6.5,
      color: 'amber'
    };
  }
  return {
    name: 'Conservative Shield',
    tagline: 'Maximum safety, liquidity preservation, and low-volatility fixed income',
    allocation: { equity: 15, debt: 65, cash: 15, gold: 5 },
    expectedReturn: 5.2,
    volatility: 4.0,
    color: 'rose'
  };
};

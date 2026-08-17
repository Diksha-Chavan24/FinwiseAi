/**
 * FinWise AI - CSV Benchmark & Data Service (100% INR)
 * Loads 100 Indian benchmark profiles and compares peer rankings.
 */

import Papa from 'papaparse';

let cachedProfiles = null;

/**
 * Load and parse the 100 benchmark profiles from public CSV
 */
export const loadBenchmarkData = async () => {
  if (cachedProfiles && cachedProfiles.length > 0) {
    return cachedProfiles;
  }

  try {
    const response = await fetch('/data/finwise_final_100_entries.csv');
    const csvText = await response.text();

    return new Promise((resolve, reject) => {
      Papa.parse(csvText, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          cachedProfiles = results.data;
          resolve(results.data);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          reject(error);
        }
      });
    });
  } catch (err) {
    console.error('Failed to fetch benchmark CSV:', err);
    return [];
  }
};

/**
 * Calculate user percentile ranking against the 100 Indian peer dataset
 */
export const calculatePeerPercentile = async (userValue, key = 'net_worth') => {
  const dataset = await loadBenchmarkData();
  if (!dataset || dataset.length === 0) return { percentile: 50, median: userValue, total: 100 };

  const values = dataset.map(d => Number(d[key] || 0)).sort((a, b) => a - b);
  const countBelow = values.filter(v => v < userValue).length;
  const percentile = Math.min(99, Math.max(1, Math.round((countBelow / values.length) * 100)));
  const median = values[Math.floor(values.length / 2)];

  return {
    percentile,
    median,
    total: values.length,
    min: values[0],
    max: values[values.length - 1],
  };
};

/**
 * Filter peers by age bracket (e.g. ±5 years)
 */
export const getCohortComparison = async (userAge = 30, userIncome = 1200000) => {
  const dataset = await loadBenchmarkData();
  if (!dataset || dataset.length === 0) return null;

  const ageCohort = dataset.filter(d => Math.abs(d.age - userAge) <= 6);
  const cohortToUse = ageCohort.length >= 8 ? ageCohort : dataset;

  const avgNetWorth = Math.round(cohortToUse.reduce((sum, d) => sum + (d.net_worth || 0), 0) / cohortToUse.length);
  const avgSavingsRate = Number((cohortToUse.reduce((sum, d) => sum + (d.savings_rate || 0), 0) / cohortToUse.length).toFixed(2));
  const avgHealthScore = Math.round(cohortToUse.reduce((sum, d) => sum + (d.health_score || 0), 0) / cohortToUse.length);

  return {
    cohortSize: cohortToUse.length,
    ageRange: `${Math.max(20, userAge - 5)} - ${userAge + 5} years`,
    avgNetWorth,
    avgSavingsRate,
    avgHealthScore,
  };
};

/**
 * Export active financial profile as downloadable CSV in INR
 */
export const exportProfileToCSV = (profile) => {
  const data = [
    { Item: 'Monthly Income (₹)', Value: profile.monthlyIncome },
    { Item: 'Fixed Living Needs (₹)', Value: profile.fixedExpenses },
    { Item: 'Discretionary Lifestyle Spend (₹)', Value: profile.discretionaryExpenses },
    { Item: 'Monthly Loan EMIs (₹)', Value: profile.monthlyDebtPayments },
    { Item: 'Bank Savings & Fixed Deposits (₹)', Value: profile.liquidSavings },
    { Item: 'Mutual Funds & Equity Stocks (₹)', Value: profile.stocksAndMutualFunds },
    { Item: 'EPF, PPF & NPS (₹)', Value: profile.retirementAccounts },
    { Item: 'Real Estate Property Value (₹)', Value: profile.realEstate },
    { Item: 'Physical Gold & Sovereign Gold Bonds (₹)', Value: profile.cryptoAndOthers },
    { Item: 'Home Loan Balance (₹)', Value: profile.mortgage },
    { Item: 'Education Loan Balance (₹)', Value: profile.studentLoans },
    { Item: 'Car Loan Balance (₹)', Value: profile.carLoans },
    { Item: 'Credit Card Dues (₹)', Value: profile.creditCardDebt },
    { Item: 'Risk Score (0-100)', Value: profile.riskScore }
  ];

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `FinWise_India_Profile_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

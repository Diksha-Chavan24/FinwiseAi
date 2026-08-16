/**
 * FinWise AI - CSV Benchmark & Data Service
 * Loads 100 benchmark entries and performs peer percentile rankings
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
 * Calculate user percentile ranking against the 100 peer dataset
 * @param {number} userValue - User's net worth or savings rate or health score
 * @param {string} key - 'net_worth' | 'savings_rate' | 'health_score' | 'annual_income'
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
 * Filter peers by demographic cohort (e.g. similar age bracket ±5 years)
 */
export const getCohortComparison = async (userAge = 30, userIncome = 100000) => {
  const dataset = await loadBenchmarkData();
  if (!dataset || dataset.length === 0) return null;

  const ageCohort = dataset.filter(d => Math.abs(d.age - userAge) <= 6);
  const incomeCohort = dataset.filter(d => Math.abs(d.annual_income - userIncome) <= 35000);

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
 * Export active financial profile as downloadable CSV
 */
export const exportProfileToCSV = (profile) => {
  const data = [
    {
      Metric: 'Monthly Income',
      Value: profile.monthlyIncome,
    },
    {
      Metric: 'Fixed Expenses',
      Value: profile.fixedExpenses,
    },
    {
      Metric: 'Discretionary Expenses',
      Value: profile.discretionaryExpenses,
    },
    {
      Metric: 'Liquid Savings',
      Value: profile.liquidSavings,
    },
    {
      Metric: 'Stocks & Mutual Funds',
      Value: profile.stocksAndMutualFunds,
    },
    {
      Metric: 'Retirement Accounts',
      Value: profile.retirementAccounts,
    },
    {
      Metric: 'Real Estate Value',
      Value: profile.realEstate,
    },
    {
      Metric: 'Mortgage Outstanding',
      Value: profile.mortgage,
    },
    {
      Metric: 'Student Loans',
      Value: profile.studentLoans,
    },
    {
      Metric: 'Credit Card Debt',
      Value: profile.creditCardDebt,
    },
    {
      Metric: 'Risk Score (0-100)',
      Value: profile.riskScore,
    }
  ];

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `FinWise_Profile_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

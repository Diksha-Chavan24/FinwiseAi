/**
 * FinWise AI - Financial State & Deterministic Engine Context
 */

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { 
  calculateNetWorth, 
  calculateCashFlow, 
  calculateHealthScore, 
  detectGoalConflicts, 
  detectHiddenRisks 
} from '../utils/financialCalculators';
import { PLAN_STRATEGIES } from '../mock/financialPresets';

const FinancialContext = createContext();

export const FinancialProvider = ({ children }) => {
  const { user, updateUserProfile } = useAuth();

  // Currency selection: 'USD' ($) or 'INR' (₹)
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('finwise_currency') || 'USD';
  });

  // Profile data
  const [profile, setProfile] = useState(() => {
    return user || {
      monthlyIncome: 10000,
      fixedExpenses: 3500,
      discretionaryExpenses: 1500,
      monthlyDebtPayments: 500,
      liquidSavings: 30000,
      stocksAndMutualFunds: 60000,
      retirementAccounts: 40000,
      realEstate: 0,
      cryptoAndOthers: 5000,
      mortgage: 0,
      studentLoans: 12000,
      carLoans: 0,
      creditCardDebt: 0,
      otherDebts: 0,
      riskScore: 75,
      dependents: 0,
      hasHealthInsurance: true,
      hasLifeInsurance: true,
    };
  });

  // Goals
  const [goals, setGoals] = useState(() => {
    return user?.goals || [];
  });

  // Active Selected Plan
  const [activePlan, setActivePlan] = useState(() => {
    return localStorage.getItem('finwise_active_plan') || 'plan-balanced';
  });

  // Synchronize when user changes persona
  useEffect(() => {
    if (user) {
      setProfile(user);
      setGoals(user.goals || []);
      if (user.currency) setCurrency(user.currency);
    }
  }, [user?.id]);

  // Persist currency
  const toggleCurrency = () => {
    const next = currency === 'USD' ? 'INR' : 'USD';
    setCurrency(next);
    localStorage.setItem('finwise_currency', next);
  };

  // Update profile handler
  const updateProfile = (newValues) => {
    setProfile(prev => {
      const updated = { ...prev, ...newValues };
      updateUserProfile(updated);
      return updated;
    });
  };

  // Goal operations
  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: 'goal-' + Date.now(),
      currentAmount: Number(goal.currentAmount || 0),
      targetAmount: Number(goal.targetAmount || 10000),
      targetYear: Number(goal.targetYear || new Date().getFullYear() + 5),
      expectedReturn: Number(goal.expectedReturn || 0.09),
      inflationRate: Number(goal.inflationRate || 0.05),
    };
    const updated = [...goals, newGoal];
    setGoals(updated);
    updateUserProfile({ goals: updated });
  };

  const updateGoal = (goalId, updatedFields) => {
    const updated = goals.map(g => g.id === goalId ? { ...g, ...updatedFields } : g);
    setGoals(updated);
    updateUserProfile({ goals: updated });
  };

  const deleteGoal = (goalId) => {
    const updated = goals.filter(g => g.id !== goalId);
    setGoals(updated);
    updateUserProfile({ goals: updated });
  };

  const selectPlan = (planId) => {
    setActivePlan(planId);
    localStorage.setItem('finwise_active_plan', planId);
  };

  // Memoized Deterministic Calculations
  const netWorthData = useMemo(() => calculateNetWorth(profile), [profile]);
  const cashFlowData = useMemo(() => calculateCashFlow(profile), [profile]);
  const healthData = useMemo(() => {
    const baseHealth = calculateHealthScore(profile, goals);
    return {
      ...baseHealth,
      ...netWorthData,
      ...cashFlowData,
    };
  }, [profile, goals, netWorthData, cashFlowData]);

  const goalConflicts = useMemo(() => {
    return detectGoalConflicts(goals, cashFlowData.monthlySurplus);
  }, [goals, cashFlowData.monthlySurplus]);

  const hiddenRisks = useMemo(() => {
    return detectHiddenRisks(profile, healthData);
  }, [profile, healthData]);

  const plans = useMemo(() => {
    return PLAN_STRATEGIES;
  }, []);

  return (
    <FinancialContext.Provider
      value={{
        profile,
        updateProfile,
        goals,
        addGoal,
        updateGoal,
        deleteGoal,
        activePlan,
        selectPlan,
        currency,
        setCurrency,
        toggleCurrency,
        netWorthData,
        cashFlowData,
        healthData,
        goalConflicts,
        hiddenRisks,
        plans,
      }}
    >
      {children}
    </FinancialContext.Provider>
  );
};

export const useFinancial = () => useContext(FinancialContext);

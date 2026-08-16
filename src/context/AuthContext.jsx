/**
 * FinWise AI - Authentication & Persona Context
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_PERSONAS } from '../mock/demoUsers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('finwise_auth_user');
    return saved ? JSON.parse(saved) : DEMO_PERSONAS[0]; // Default to Alex Chen demo
  });

  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    if (user) {
      localStorage.setItem('finwise_auth_user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('finwise_auth_user');
      setIsAuthenticated(false);
    }
  }, [user]);

  const login = (email, password) => {
    const matched = DEMO_PERSONAS.find(p => p.email.toLowerCase() === email.toLowerCase()) || {
      id: 'custom-user-' + Date.now(),
      name: email.split('@')[0],
      email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      currency: 'USD',
      riskScore: 65,
      dependents: 0,
      hasHealthInsurance: true,
      hasLifeInsurance: true,
      monthlyIncome: 9500,
      fixedExpenses: 3000,
      discretionaryExpenses: 1500,
      monthlyDebtPayments: 400,
      liquidSavings: 25000,
      stocksAndMutualFunds: 50000,
      retirementAccounts: 40000,
      realEstate: 0,
      cryptoAndOthers: 5000,
      mortgage: 0,
      studentLoans: 10000,
      carLoans: 0,
      creditCardDebt: 0,
      otherDebts: 0,
      goals: []
    };
    setUser(matched);
    return true;
  };

  const register = (userData) => {
    const newUser = {
      id: 'user-' + Date.now(),
      name: userData.name || 'New Member',
      email: userData.email,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      currency: userData.currency || 'USD',
      riskScore: 60,
      dependents: Number(userData.dependents || 0),
      hasHealthInsurance: true,
      hasLifeInsurance: false,
      monthlyIncome: Number(userData.monthlyIncome || 8000),
      fixedExpenses: Number(userData.fixedExpenses || 2800),
      discretionaryExpenses: Number(userData.discretionaryExpenses || 1200),
      monthlyDebtPayments: Number(userData.monthlyDebtPayments || 300),
      liquidSavings: Number(userData.liquidSavings || 15000),
      stocksAndMutualFunds: Number(userData.stocksAndMutualFunds || 20000),
      retirementAccounts: Number(userData.retirementAccounts || 15000),
      realEstate: Number(userData.realEstate || 0),
      cryptoAndOthers: 0,
      mortgage: 0,
      studentLoans: 0,
      carLoans: 0,
      creditCardDebt: 0,
      otherDebts: 0,
      goals: []
    };
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const switchDemoPersona = (personaId) => {
    const found = DEMO_PERSONAS.find(p => p.id === personaId) || DEMO_PERSONAS[0];
    setUser(found);
    // Clear financial local storage overrides to refresh clean state
    localStorage.removeItem('finwise_financial_profile');
    localStorage.removeItem('finwise_goals');
    localStorage.removeItem('finwise_active_plan');
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({
      ...prev,
      ...updatedFields,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        switchDemoPersona,
        updateUserProfile,
        demoPersonas: DEMO_PERSONAS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

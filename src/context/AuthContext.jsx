/**
 * FinWise AI - Authentication & Persona Context (Pure INR & Indian Personas)
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_PERSONAS } from '../mock/demoUsers';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('finwise_auth_user');
    return saved ? JSON.parse(saved) : DEMO_PERSONAS[0]; // Default to Aarav Sharma
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
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      currency: 'INR',
      riskScore: 65,
      dependents: 0,
      hasHealthInsurance: true,
      hasLifeInsurance: true,
      monthlyIncome: 100000,
      fixedExpenses: 35000,
      discretionaryExpenses: 20000,
      monthlyDebtPayments: 10000,
      liquidSavings: 300000,
      stocksAndMutualFunds: 600000,
      retirementAccounts: 400000,
      realEstate: 0,
      cryptoAndOthers: 100000,
      mortgage: 0,
      studentLoans: 100000,
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
      name: userData.name || 'Aarav Sharma',
      email: userData.email,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      currency: 'INR',
      riskScore: 65,
      dependents: Number(userData.dependents || 0),
      hasHealthInsurance: true,
      hasLifeInsurance: false,
      monthlyIncome: Number(userData.monthlyIncome || 90000),
      fixedExpenses: Number(userData.fixedExpenses || 30000),
      discretionaryExpenses: Number(userData.discretionaryExpenses || 15000),
      monthlyDebtPayments: Number(userData.monthlyDebtPayments || 5000),
      liquidSavings: Number(userData.liquidSavings || 200000),
      stocksAndMutualFunds: Number(userData.stocksAndMutualFunds || 300000),
      retirementAccounts: Number(userData.retirementAccounts || 200000),
      realEstate: Number(userData.realEstate || 0),
      cryptoAndOthers: Number(userData.cryptoAndOthers || 50000),
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

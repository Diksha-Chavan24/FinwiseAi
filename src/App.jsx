import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Sidebar from './components/common/Sidebar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import FinancialProfile from './pages/FinancialProfile';
import RiskAssessment from './pages/RiskAssessment';
import FinancialGoals from './pages/FinancialGoals';
import PersonalizedPlans from './pages/PersonalizedPlans';
import WhatIfSimulator from './pages/WhatIfSimulator';
import AIAssistant from './pages/AIAssistant';
import { useAuth } from './context/AuthContext';

function AppLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 lg:pl-64 min-w-0 transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const isPublicRoute = ['/', '/login', '/register'].includes(location.pathname);

  if (isPublicRoute) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <AppLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<FinancialProfile />} />
        <Route path="/risk-assessment" element={<RiskAssessment />} />
        <Route path="/goals" element={<FinancialGoals />} />
        <Route path="/plans" element={<PersonalizedPlans />} />
        <Route path="/simulator" element={<WhatIfSimulator />} />
        <Route path="/ai-assistant" element={<AIAssistant />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AppLayout>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Sliders, 
  Bot, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  PieChart as PieIcon,
  Users,
  Activity,
  DollarSign
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatCurrency } from '../utils/formatters';

export default function Landing() {
  const { switchDemoPersona } = useAuth();
  const navigate = useNavigate();

  // Interactive Mini Calculator on Landing Hero
  const [calcIncome, setCalcIncome] = useState(9000);
  const [calcExpenses, setCalcExpenses] = useState(4000);
  const [calcSavings, setCalcSavings] = useState(30000);

  const calcSurplus = Math.max(0, calcIncome - calcExpenses);
  const calcRunway = calcExpenses > 0 ? (calcSavings / calcExpenses).toFixed(1) : '0';
  const calcSavingsRate = calcIncome > 0 ? ((calcSurplus / calcIncome) * 100).toFixed(0) : '0';

  const handleLaunchDemo = (personaId = 'demo-alex') => {
    switchDemoPersona(personaId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-navy-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-glow-sm">
              <Sparkles className="w-5 h-5 text-navy-950 stroke-[2.5]" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              FinWise <span className="text-emerald-400 font-extrabold">AI</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-900 transition-colors"
            >
              Sign In
            </Link>
            <button
              onClick={() => handleLaunchDemo('demo-alex')}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold text-xs shadow-glow-sm transition-all flex items-center gap-1.5"
            >
              <span>Instant Live Demo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="ambient-glow-emerald top-10 left-1/4 opacity-30" />
        <div className="ambient-glow-cyan top-40 right-1/4 opacity-25" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Strictly Deterministic Financial Engine + Grounded AI Copilot</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Personalized Finance Planning <br />
              <span className="gradient-text-emerald">Powered by Math & AI</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Generate multiple customized financial plans tailored to your net worth, risk capacity, and goals. 
              Stress-test with Monte Carlo simulations with zero financial hallucinations.
            </p>

            {/* Quick Demo Switcher Hero CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleLaunchDemo('demo-alex')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-navy-950 font-extrabold text-sm shadow-glow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <Link
                to="/register"
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all"
              >
                Create Free Account
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Math</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>1,000 Monte Carlo Iterations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Hallucination Guardrails</span>
              </div>
            </div>
          </div>

          {/* Interactive Mini Sandbox on Landing */}
          <div className="mt-14 max-w-4xl mx-auto rounded-3xl glass-panel p-6 sm:p-8 border border-slate-700 shadow-2xl relative">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">Live Preview</span>
                <h3 className="text-xl font-bold text-white mt-1">Instant Cashflow & Health Calculator</h3>
              </div>
              <span className="text-xs text-slate-400">Move sliders to see real-time calculation</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {/* Slider 1: Income */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Monthly Income</span>
                  <span className="text-emerald-400 font-mono">${calcIncome.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="25000"
                  step="500"
                  value={calcIncome}
                  onChange={(e) => setCalcIncome(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
                />
              </div>

              {/* Slider 2: Expenses */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Monthly Living Costs</span>
                  <span className="text-rose-400 font-mono">${calcExpenses.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="15000"
                  step="250"
                  value={calcExpenses}
                  onChange={(e) => setCalcExpenses(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-rose-400"
                />
              </div>

              {/* Slider 3: Savings */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Liquid Cash Buffer</span>
                  <span className="text-cyan-400 font-mono">${calcSavings.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="2000"
                  max="100000"
                  step="2000"
                  value={calcSavings}
                  onChange={(e) => setCalcSavings(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>
            </div>

            {/* Calculated Output Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-slate-800 font-mono text-center">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Monthly Surplus</span>
                <p className="text-xl font-extrabold text-emerald-400 mt-0.5">${calcSurplus.toLocaleString()}/mo</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Savings Velocity</span>
                <p className="text-xl font-extrabold text-cyan-400 mt-0.5">{calcSavingsRate}%</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase">Emergency Runway</span>
                <p className="text-xl font-extrabold text-amber-400 mt-0.5">{calcRunway} Months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights Section */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-wider">Features</span>
            <h2 className="text-3xl font-extrabold text-white mt-2">Comprehensive Financial Command</h2>
            <p className="text-sm text-slate-400 mt-2">
              Engineered with institutional-grade risk models and personalized AI explanations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">6-Pillar Health Score</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Audits emergency runway, debt-to-income, asset diversification, and cashflow velocity to give you a single objective score.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">4 AI Generated Plans</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose between Conservative Shield, Balanced Wealth Builder, Equity Maximizer, and FIRE Acceleration strategies.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Sliders className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">What-If Stress Simulator</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Simulate 25% stock market crashes, 8.5% stagflation spikes, 6-month job losses, and calculate your Resilience Score.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Conflict Detector & SIP</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Calculates inflation-adjusted monthly savings needed for house, education, or retirement and flags cashflow deficits.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Grounded AI Copilot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                AI assistant strictly grounded in your verified financial facts. Explains trade-offs and plans without inventing figures.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-6 rounded-2xl glass-panel border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">100-Profile Benchmark</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compare your net worth and savings rate against demographic peer cohorts from the integrated benchmark dataset.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-12 border-t border-slate-800 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-bold text-white">FinWise AI</span>
            <span className="text-xs text-slate-500">© 2026. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <Link to="/login" className="hover:text-white">Sign In</Link>
            <Link to="/register" className="hover:text-white">Register</Link>
            <button onClick={() => handleLaunchDemo('demo-alex')} className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Live Demo
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

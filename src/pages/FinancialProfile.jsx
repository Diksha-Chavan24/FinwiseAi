import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { useAuth } from '../context/AuthContext';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { exportProfileToCSV } from '../services/csvService';
import { 
  UserCircle2, 
  Wallet, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  FileSpreadsheet, 
  Save, 
  CheckCircle2,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';

export default function FinancialProfile() {
  const { profile, updateProfile, currency, healthData, netWorthData, cashFlowData } = useFinancial();
  const { switchDemoPersona } = useAuth();

  const [activeTab, setActiveTab] = useState('cashflow'); // 'cashflow' | 'assets' | 'liabilities' | 'protection'
  const [formData, setFormData] = useState({ ...profile });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleChange = (field, val) => {
    const num = isNaN(Number(val)) ? val : Number(val);
    setFormData(prev => ({
      ...prev,
      [field]: num
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleExportCSV = () => {
    exportProfileToCSV(formData);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <UserCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Financial Profile & Balances</h1>
            <p className="text-xs text-slate-400">
              Audit and calibrate your deterministic income, asset registry, and liabilities.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Financial profile balances successfully saved and recalculated across all models!</span>
        </div>
      )}

      {/* Live Calculated Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-900/60 border border-slate-800 font-mono text-center">
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Calculated Net Worth</span>
          <p className="text-lg font-extrabold text-emerald-400 mt-0.5">
            {formatCurrency(netWorthData.netWorth, currency)}
          </p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Monthly Surplus</span>
          <p className="text-lg font-extrabold text-cyan-400 mt-0.5">
            {formatCurrency(cashFlowData.monthlySurplus, currency)}/mo
          </p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Savings Velocity</span>
          <p className="text-lg font-extrabold text-amber-400 mt-0.5">
            {formatPercent(cashFlowData.savingsRate)}
          </p>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase">Emergency Runway</span>
          <p className="text-lg font-extrabold text-white mt-0.5">
            {healthData.runwayMonths} Months
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2">
        <button
          onClick={() => setActiveTab('cashflow')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'cashflow'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>Income & Expenses</span>
        </button>

        <button
          onClick={() => setActiveTab('assets')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'assets'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>Assets & Investments</span>
        </button>

        <button
          onClick={() => setActiveTab('liabilities')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'liabilities'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Liabilities & Debts</span>
        </button>

        <button
          onClick={() => setActiveTab('protection')}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'protection'
              ? 'border-emerald-400 text-emerald-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Family & Risk</span>
        </button>
      </div>

      {/* Main Profile Form */}
      <form onSubmit={handleSave} className="rounded-2xl glass-panel p-6 sm:p-8 border border-slate-800 space-y-6">
        {/* Tab 1: Cashflow */}
        {activeTab === 'cashflow' && (
          <div className="space-y-5 animate-in fade-in">
            <h3 className="text-sm font-bold text-white">Monthly Cash Inflows and Outflows</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Gross Monthly Income</label>
                <input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Total take-home salary, rental income & dividends</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Fixed Living Needs (Rent, Utilities, Food)</label>
                <input
                  type="number"
                  value={formData.fixedExpenses}
                  onChange={(e) => handleChange('fixedExpenses', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Essential non-negotiable living baseline</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Discretionary Lifestyle Spend</label>
                <input
                  type="number"
                  value={formData.discretionaryExpenses}
                  onChange={(e) => handleChange('discretionaryExpenses', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Dining out, entertainment, shopping & vacations</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Monthly Debt EMIs / Loan Payments</label>
                <input
                  type="number"
                  value={formData.monthlyDebtPayments}
                  onChange={(e) => handleChange('monthlyDebtPayments', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Mortgage, car loan & credit card minimums</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Assets */}
        {activeTab === 'assets' && (
          <div className="space-y-5 animate-in fade-in">
            <h3 className="text-sm font-bold text-white">Asset Registry & Investment Portfolio</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Liquid Bank Savings & High Yield Cash</label>
                <input
                  type="number"
                  value={formData.liquidSavings}
                  onChange={(e) => handleChange('liquidSavings', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Accessible within 24 hours for emergency liquidity</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Stocks, ETFs & Mutual Funds</label>
                <input
                  type="number"
                  value={formData.stocksAndMutualFunds}
                  onChange={(e) => handleChange('stocksAndMutualFunds', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Taxable brokerage accounts and index funds</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Retirement Accounts (401k, IRA, EPF, NPS)</label>
                <input
                  type="number"
                  value={formData.retirementAccounts}
                  onChange={(e) => handleChange('retirementAccounts', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Dedicated tax-deferred retirement vehicles</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Real Estate Equity Market Value</label>
                <input
                  type="number"
                  value={formData.realEstate}
                  onChange={(e) => handleChange('realEstate', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Primary home value or commercial properties</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Crypto & Alternative Assets</label>
                <input
                  type="number"
                  value={formData.cryptoAndOthers}
                  onChange={(e) => handleChange('cryptoAndOthers', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Digital assets, physical gold & angel investments</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Liabilities */}
        {activeTab === 'liabilities' && (
          <div className="space-y-5 animate-in fade-in">
            <h3 className="text-sm font-bold text-white">Liabilities & Outstanding Debt</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mortgage Principal Remaining</label>
                <input
                  type="number"
                  value={formData.mortgage}
                  onChange={(e) => handleChange('mortgage', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Student Loans</label>
                <input
                  type="number"
                  value={formData.studentLoans}
                  onChange={(e) => handleChange('studentLoans', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Auto / Vehicle Loans</label>
                <input
                  type="number"
                  value={formData.carLoans}
                  onChange={(e) => handleChange('carLoans', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Credit Card Debt (High-Interest Revolving)</label>
                <input
                  type="number"
                  value={formData.creditCardDebt}
                  onChange={(e) => handleChange('creditCardDebt', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-rose-400 mt-1">Carries highest penalty in health score audit</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Family & Risk */}
        {activeTab === 'protection' && (
          <div className="space-y-5 animate-in fade-in">
            <h3 className="text-sm font-bold text-white">Dependents & Insurance Safeguards</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Number of Financial Dependents</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.dependents}
                  onChange={(e) => handleChange('dependents', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
                <p className="text-[10px] text-slate-500 mt-1">Children, non-working spouse, or dependent parents</p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Age</label>
                <input
                  type="number"
                  min="18"
                  max="90"
                  value={formData.age || 30}
                  onChange={(e) => handleChange('age', e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 space-y-3">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasHealthInsurance ?? true}
                  onChange={(e) => handleChange('hasHealthInsurance', e.target.checked)}
                  className="w-4 h-4 accent-emerald-400 rounded"
                />
                <div>
                  <span className="text-xs font-semibold text-white">Comprehensive Health Insurance Policy Active</span>
                  <p className="text-[10px] text-slate-400">Protects against emergency hospitalization out-of-pocket shocks</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.hasLifeInsurance ?? false}
                  onChange={(e) => handleChange('hasLifeInsurance', e.target.checked)}
                  className="w-4 h-4 accent-emerald-400 rounded"
                />
                <div>
                  <span className="text-xs font-semibold text-white">Term Life Insurance Policy Active</span>
                  <p className="text-[10px] text-slate-400">Recommended if you have 1+ dependents</p>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Form Action Footer */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-mono">
            Deterministic Engine v1.2 Auto-Recalibrate
          </span>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-navy-950 font-bold text-xs shadow-glow-sm transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>Save & Recalculate Plans</span>
          </button>
        </div>
      </form>
    </div>
  );
}

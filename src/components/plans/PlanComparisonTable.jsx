import React from 'react';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Check, X, Shield, TrendingUp, Zap } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

export default function PlanComparisonTable({ plans, activePlan, onSelectPlan }) {
  const { currency, healthData } = useFinancial();
  const currentNetWorth = healthData?.netWorth || 50000;
  const currentSurplus = healthData?.monthlySurplus || 2000;

  return (
    <div className="rounded-2xl glass-panel border border-slate-800 overflow-hidden">
      <div className="p-5 border-b border-slate-800">
        <h3 className="text-base font-bold text-white">Side-by-Side Strategy Comparison</h3>
        <p className="text-xs text-slate-400">Deterministic metrics projected over 20-year investment horizon.</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-900/80 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
            <tr>
              <th className="p-4">Strategy Feature</th>
              {plans.map((p) => (
                <th key={p.id} className={`p-4 ${p.id === activePlan ? 'text-emerald-400 font-bold bg-emerald-500/5' : ''}`}>
                  {p.name}
                  {p.id === activePlan && <span className="block text-[9px] text-emerald-400">Active</span>}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
            <tr>
              <td className="p-4 font-sans font-semibold text-white">Expected Annual Return</td>
              {plans.map((p) => (
                <td key={p.id} className={`p-4 font-bold ${p.id === activePlan ? 'bg-emerald-500/5 text-emerald-400' : 'text-white'}`}>
                  {formatPercent(p.expectedReturn)}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-sans font-semibold text-white">Volatility / Risk Rating</td>
              {plans.map((p) => (
                <td key={p.id} className={`p-4 ${p.id === activePlan ? 'bg-emerald-500/5' : ''}`}>
                  {formatPercent(p.volatility)} (Std Dev)
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-sans font-semibold text-white">Asset Allocation (Eq / Debt / Cash)</td>
              {plans.map((p) => (
                <td key={p.id} className={`p-4 ${p.id === activePlan ? 'bg-emerald-500/5' : ''}`}>
                  {p.assetAllocation.equity}% / {p.assetAllocation.debt}% / {p.assetAllocation.cash}%
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-sans font-semibold text-white">Monthly Savings Ratio</td>
              {plans.map((p) => (
                <td key={p.id} className={`p-4 ${p.id === activePlan ? 'bg-emerald-500/5' : ''}`}>
                  {(p.monthlySIPRatio * 100).toFixed(0)}% of income
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 font-sans font-semibold text-white">Projected 20-Yr Wealth (Median)</td>
              {plans.map((p) => {
                // Compound calculation
                let fv = currentNetWorth;
                const monthly = currentSurplus * (p.monthlySIPRatio / 0.3);
                for (let y = 1; y <= 20; y++) {
                  fv = (fv * (1 + p.expectedReturn)) + (monthly * 12);
                }
                return (
                  <td key={p.id} className={`p-4 font-bold text-white ${p.id === activePlan ? 'bg-emerald-500/5 text-cyan-400' : ''}`}>
                    {formatCurrency(Math.round(fv), currency, true)}
                  </td>
                );
              })}
            </tr>
            <tr>
              <td className="p-4 font-sans font-semibold text-white">Action</td>
              {plans.map((p) => (
                <td key={p.id} className={`p-4 ${p.id === activePlan ? 'bg-emerald-500/5' : ''}`}>
                  {p.id === activePlan ? (
                    <span className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-[11px]">
                      Selected
                    </span>
                  ) : (
                    <button
                      onClick={() => onSelectPlan(p.id)}
                      className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors"
                    >
                      Select
                    </button>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

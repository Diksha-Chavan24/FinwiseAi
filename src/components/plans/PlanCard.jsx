import React from 'react';
import { Sparkles, Check, ArrowRight, ShieldCheck, TrendingUp, Info } from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { useFinancial } from '../../context/FinancialContext';

export default function PlanCard({ plan, isSelected, onSelect, onViewDetails }) {
  const { cashFlowData, currency } = useFinancial();

  const badgeColors = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
  }[plan.badgeColor] || 'bg-slate-800 text-slate-300 border-slate-700';

  const monthlySIP = Math.round((cashFlowData?.monthlyIncome || 10000) * plan.monthlySIPRatio);

  return (
    <div
      className={`relative rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
        isSelected
          ? 'glass-card-emerald border-emerald-500 shadow-glow-md'
          : 'glass-panel hover:border-slate-700'
      }`}
    >
      {isSelected && (
        <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full bg-emerald-500 text-navy-950 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 shadow-glow-sm">
          <Check className="w-3 h-3 stroke-[3]" />
          <span>Active Strategy</span>
        </div>
      )}

      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold font-mono border ${badgeColors}`}>
              {plan.badge}
            </span>
            <h3 className="text-lg font-extrabold text-white mt-2">{plan.name}</h3>
          </div>
          <div className="text-right font-mono">
            <span className="text-xl font-black text-emerald-400">
              {formatPercent(plan.expectedReturn)}
            </span>
            <span className="block text-[10px] text-slate-400">Exp. Return</span>
          </div>
        </div>

        <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">
          {plan.tagline}
        </p>

        {/* Allocation Bar */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5 font-mono">
            <span>Asset Allocation</span>
            <span className="text-slate-300">
              {plan.assetAllocation.equity}% Eq / {plan.assetAllocation.debt}% Debt
            </span>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-800">
            <div style={{ width: `${plan.assetAllocation.equity}%` }} className="bg-emerald-400" title="Equity" />
            <div style={{ width: `${plan.assetAllocation.debt}%` }} className="bg-cyan-400" title="Debt" />
            <div style={{ width: `${plan.assetAllocation.cash}%` }} className="bg-amber-400" title="Cash" />
            <div style={{ width: `${plan.assetAllocation.gold}%` }} className="bg-pink-400" title="Gold" />
          </div>
        </div>

        {/* Monthly Allocation Number */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/70 border border-slate-800 text-xs font-mono flex items-center justify-between">
          <span className="text-slate-400">Target Monthly SIP:</span>
          <span className="font-bold text-white">
            {formatCurrency(monthlySIP, currency)}/mo
            <span className="text-slate-500 text-[10px] ml-1">({(plan.monthlySIPRatio * 100).toFixed(0)}% income)</span>
          </span>
        </div>

        {/* Feature bullets */}
        <ul className="mt-4 space-y-2 text-xs text-slate-300">
          {plan.features.slice(0, 3).map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2">
        <button
          onClick={() => onSelect(plan.id)}
          className={`flex-1 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-1.5 ${
            isSelected
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 cursor-default'
              : 'bg-emerald-500 hover:bg-emerald-600 text-navy-950 shadow-glow-sm'
          }`}
        >
          {isSelected ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Current Selection</span>
            </>
          ) : (
            <>
              <span>Adopt Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>

        <button
          onClick={() => onViewDetails(plan)}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          title="View In-Depth Rationale"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

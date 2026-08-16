import React from 'react';
import { X, Sparkles, Check, ShieldAlert, TrendingUp } from 'lucide-react';
import { formatPercent } from '../../utils/formatters';

export default function PlanDetailModal({ plan, isOpen, onClose, onSelect, isSelected }) {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-emerald-400 border border-emerald-500/20 font-bold">
              {plan.badge}
            </span>
            <h2 className="text-xl font-bold text-white mt-1">{plan.name}</h2>
          </div>
        </div>

        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          {plan.tagline}
        </p>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center mb-6">
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Exp. Return</span>
            <p className="text-base font-bold text-emerald-400 mt-0.5">{formatPercent(plan.expectedReturn)}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Volatility</span>
            <p className="text-base font-bold text-cyan-400 mt-0.5">{formatPercent(plan.volatility)}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Equity / Debt</span>
            <p className="text-base font-bold text-white mt-0.5">{plan.assetAllocation.equity}% / {plan.assetAllocation.debt}%</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase">Savings Ratio</span>
            <p className="text-base font-bold text-amber-400 mt-0.5">{(plan.monthlySIPRatio * 100).toFixed(0)}%</p>
          </div>
        </div>

        {/* Key Pillars */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold text-white uppercase font-mono tracking-wider mb-2">
              Core Strategy Pillars:
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {plan.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/50 border border-slate-800/80">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200">
            <strong className="block text-emerald-300 font-bold mb-1">Fiduciary Context:</strong>
            {plan.recommendedFor}
          </div>
        </div>

        {/* Modal Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSelect(plan.id);
              onClose();
            }}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isSelected
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-emerald-500 hover:bg-emerald-600 text-navy-950 shadow-glow-sm'
            }`}
          >
            {isSelected ? 'Currently Selected' : 'Adopt This Strategy'}
          </button>
        </div>
      </div>
    </div>
  );
}

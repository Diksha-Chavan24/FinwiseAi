import React from 'react';
import { Scale, CheckCircle, AlertTriangle, ShieldCheck, Flame } from 'lucide-react';

export default function TradeOffMatrix({ plans }) {
  return (
    <div className="rounded-2xl glass-panel p-6 border border-slate-800 space-y-4">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
          <Scale className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-bold text-white">Strategic Trade-Off Analysis</h3>
          <p className="text-xs text-slate-400">Understanding the core compromise and risk-reward equation of each model.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3"
          >
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">{plan.name}</h4>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {plan.badge}
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2 text-emerald-400">
                <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span><strong>Advantage:</strong> {plan.pros}</span>
              </div>
              <div className="flex items-start gap-2 text-amber-400">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <span><strong>Trade-off / Risk:</strong> {plan.cons}</span>
              </div>
              <div className="pt-2 border-t border-slate-800 text-slate-400 text-[11px]">
                <strong>Ideal Fit:</strong> {plan.recommendedFor}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

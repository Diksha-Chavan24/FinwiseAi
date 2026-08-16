import React from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HiddenRiskAlerts() {
  const { hiddenRisks } = useFinancial();

  if (!hiddenRisks || hiddenRisks.length === 0) {
    return (
      <div className="rounded-2xl glass-panel p-5 border border-emerald-500/30 bg-emerald-500/5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">No Critical Hidden Risks Detected</h3>
            <p className="text-xs text-slate-400">Your debt ratios, emergency runway, and asset allocations are within safe parameters.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl glass-panel p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Hidden Financial Risks ({hiddenRisks.length})</h3>
        </div>
        <span className="text-[11px] font-mono text-slate-400">Deterministic Audit</span>
      </div>

      <div className="space-y-3">
        {hiddenRisks.map((risk) => {
          const isCritical = risk.level === 'critical' || risk.level === 'high';
          return (
            <div
              key={risk.id}
              className={`p-3.5 rounded-xl border transition-all ${
                isCritical 
                  ? 'bg-rose-500/10 border-rose-500/30 text-slate-200' 
                  : 'bg-amber-500/10 border-amber-500/30 text-slate-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                    isCritical ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {risk.category}
                  </span>
                  <h4 className="text-xs font-bold text-white">{risk.title}</h4>
                </div>
              </div>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {risk.description}
              </p>
              <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-[11px] text-emerald-400 font-medium">
                  <strong>Fix:</strong> {risk.action}
                </span>
                <Link to="/simulator" className="text-slate-400 hover:text-white flex items-center text-[11px]">
                  <span>Stress Test</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

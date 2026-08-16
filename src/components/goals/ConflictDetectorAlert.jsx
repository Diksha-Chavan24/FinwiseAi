import React from 'react';
import { ShieldAlert, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { Link } from 'react-router-dom';

export default function ConflictDetectorAlert({ goalConflicts, currency = 'USD' }) {
  if (!goalConflicts || !goalConflicts.hasConflicts) return null;

  return (
    <div className="space-y-3">
      {goalConflicts.conflicts.map((conflict, idx) => {
        const isCritical = conflict.severity === 'critical';
        return (
          <div
            key={idx}
            className={`rounded-2xl p-4.5 border transition-all ${
              isCritical
                ? 'bg-rose-500/10 border-rose-500/30'
                : 'bg-amber-500/10 border-amber-500/30'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-xl shrink-0 ${
                isCritical ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                    isCritical ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    Conflict Detected
                  </span>
                  <h4 className="text-xs font-bold text-white">{conflict.title}</h4>
                </div>
                <p className="text-xs text-slate-200 mt-1.5 leading-relaxed">
                  {conflict.message}
                </p>
                <div className="mt-3 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
                  <span className="text-[11px] text-emerald-300">
                    <strong>Fiduciary Recommendation:</strong> {conflict.recommendation}
                  </span>
                  <Link
                    to="/plans"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 shrink-0"
                  >
                    <span>Optimize with Multi-Plans</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

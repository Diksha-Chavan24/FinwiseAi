import React from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Target, Plus, ChevronRight, CheckCircle2, Flame, Home, GraduationCap, Plane, Palmtree, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

const GOAL_ICONS = {
  Flame: Flame,
  Home: Home,
  GraduationCap: GraduationCap,
  Plane: Plane,
  Palmtree: Palmtree,
  HeartPulse: HeartPulse,
};

export default function GoalProgressList() {
  const { goals, currency, goalConflicts } = useFinancial();

  if (!goals || goals.length === 0) {
    return (
      <div className="rounded-2xl glass-panel p-6 border border-slate-800 text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-slate-800/80 text-emerald-400 flex items-center justify-center mx-auto">
          <Target className="w-6 h-6" />
        </div>
        <h3 className="text-sm font-bold text-white">No Financial Goals Defined</h3>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Set up milestone targets like a House Down Payment, Retirement, or College Fund to calculate required monthly investments.
        </p>
        <Link
          to="/goals"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold text-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add First Goal</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl glass-panel p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
            <Target className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Active Financial Goals ({goals.length})</h3>
        </div>
        <Link to="/goals" className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1">
          <span>Manage Goals</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => {
          const current = Number(goal.currentAmount || 0);
          const target = Number(goal.targetAmount || 1);
          const progress = Math.min(100, Math.round((current / target) * 100));
          const analyzed = goalConflicts?.analyzedGoals?.find(g => g.id === goal.id);
          const IconComponent = GOAL_ICONS[goal.icon] || Target;

          return (
            <div
              key={goal.id}
              className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-800 text-cyan-400">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{goal.name}</h4>
                    <p className="text-[11px] text-slate-400 font-mono">Target: {goal.targetYear} • {goal.category}</p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="text-xs font-bold text-white">
                    {formatCurrency(current, currency, true)}
                  </span>
                  <span className="text-[11px] text-slate-500"> / {formatCurrency(target, currency, true)}</span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1 font-mono">
                  <span>Progress</span>
                  <span className="font-semibold text-emerald-400">{progress}% funded</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {analyzed && (
                <div className="mt-2.5 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-slate-400">Required Monthly SIP:</span>
                  <span className="font-bold text-cyan-400">
                    {formatCurrency(analyzed.requiredMonthlySIP, currency)}/mo
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

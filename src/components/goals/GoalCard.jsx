import React, { useState } from 'react';
import { 
  Target, 
  Trash2, 
  Edit3, 
  Flame, 
  Home, 
  GraduationCap, 
  Plane, 
  Palmtree, 
  HeartPulse,
  TrendingUp,
  AlertTriangle,
  Plus
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { calculateGoalSIP } from '../../utils/financialCalculators';
import { useFinancial } from '../../context/FinancialContext';

const GOAL_ICONS = {
  Flame: Flame,
  Home: Home,
  GraduationCap: GraduationCap,
  Plane: Plane,
  Palmtree: Palmtree,
  HeartPulse: HeartPulse,
  Target: Target,
};

export default function GoalCard({ goal, onEdit, onDelete }) {
  const { currency, updateGoal } = useFinancial();
  const [fundingAmount, setFundingAmount] = useState('');
  const [showFundInput, setShowFundInput] = useState(false);

  const current = Number(goal.currentAmount || 0);
  const target = Number(goal.targetAmount || 1);
  const currentYear = new Date().getFullYear();
  const yearsRemaining = Math.max(0.5, goal.targetYear - currentYear);
  const progress = Math.min(100, Math.round((current / target) * 100));

  const sipAnalysis = calculateGoalSIP(
    target,
    current,
    yearsRemaining,
    goal.expectedReturn || 0.09,
    goal.inflationRate || 0.05
  );

  const IconComponent = GOAL_ICONS[goal.icon] || Target;

  const handleQuickFund = (e) => {
    e.preventDefault();
    const val = Number(fundingAmount);
    if (!isNaN(val) && val > 0) {
      updateGoal(goal.id, { currentAmount: current + val });
      setFundingAmount('');
      setShowFundInput(false);
    }
  };

  return (
    <div className="rounded-2xl glass-panel p-5 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800/90 text-cyan-400 flex items-center justify-center border border-slate-700">
              <IconComponent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                {goal.category}
              </span>
              <h3 className="text-sm font-bold text-white mt-1">{goal.name}</h3>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(goal)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              title="Edit Goal"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(goal.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
              title="Delete Goal"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Amount Progress */}
        <div className="mt-4">
          <div className="flex items-baseline justify-between font-mono">
            <span className="text-lg font-extrabold text-white">
              {formatCurrency(current, currency)}
            </span>
            <span className="text-xs text-slate-400">
              Target: {formatCurrency(target, currency)}
            </span>
          </div>

          <div className="mt-2 w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5 font-mono">
            <span>{progress}% Completed</span>
            <span>Target Year: {goal.targetYear} ({yearsRemaining.toFixed(0)} yrs)</span>
          </div>
        </div>

        {/* Inflation & SIP Calculations */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Required Monthly SIP:</span>
            <span className="font-bold text-cyan-400">
              {formatCurrency(sipAnalysis.requiredMonthlySIP, currency)}/mo
            </span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Inflated Target Cost:</span>
            <span>{formatCurrency(sipAnalysis.inflatedTarget, currency)}</span>
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Assumed Return / Infl:</span>
            <span>{formatPercent(goal.expectedReturn || 0.09)} / {formatPercent(goal.inflationRate || 0.05)}</span>
          </div>
        </div>
      </div>

      {/* Quick Funding Action */}
      <div className="mt-4 pt-3 border-t border-slate-800">
        {!showFundInput ? (
          <button
            onClick={() => setShowFundInput(true)}
            className="w-full py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Deposit / Fund Goal</span>
          </button>
        ) : (
          <form onSubmit={handleQuickFund} className="flex gap-2">
            <input
              type="number"
              value={fundingAmount}
              onChange={(e) => setFundingAmount(e.target.value)}
              placeholder="Add amount..."
              className="flex-1 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold text-xs"
            >
              Add
            </button>
            <button
              type="button"
              onClick={() => setShowFundInput(false)}
              className="px-2 py-1.5 rounded-xl bg-slate-800 text-slate-400 text-xs"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

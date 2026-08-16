import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { formatCurrency } from '../utils/formatters';
import GoalCard from '../components/goals/GoalCard';
import AddGoalModal from '../components/goals/AddGoalModal';
import ConflictDetectorAlert from '../components/goals/ConflictDetectorAlert';
import { 
  Target, 
  Plus, 
  Sparkles, 
  ShieldAlert, 
  TrendingUp, 
  PiggyBank,
  Calendar
} from 'lucide-react';

export default function FinancialGoals() {
  const { goals, currency, cashFlowData, goalConflicts, deleteGoal } = useFinancial();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const totalTargetAmount = goals.reduce((sum, g) => sum + Number(g.targetAmount || 0), 0);
  const totalSavedAmount = goals.reduce((sum, g) => sum + Number(g.currentAmount || 0), 0);
  const totalRequiredSIP = goalConflicts?.totalRequiredMonthlySIP || 0;
  const availableSurplus = cashFlowData?.monthlySurplus || 0;

  const handleEdit = (goal) => {
    setEditingGoal(goal);
    setIsModalOpen(true);
  };

  const handleOpenAdd = () => {
    setEditingGoal(null);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Financial Milestone Goals</h1>
            <p className="text-xs text-slate-400">
              Inflation-adjusted goal funding, SIP calculation, and timeline conflict detection.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-navy-950 font-bold text-xs shadow-glow-sm transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Goal</span>
        </button>
      </div>

      {/* Goal Conflict Detection Alert */}
      {goalConflicts?.hasConflicts && (
        <ConflictDetectorAlert goalConflicts={goalConflicts} currency={currency} />
      )}

      {/* Goal Aggregates Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">Total Target Milestone</span>
          <p className="text-xl font-extrabold text-white">
            {formatCurrency(totalTargetAmount, currency, true)}
          </p>
          <span className="text-[11px] text-slate-500">{goals.length} Active Goals</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">Current Funds Accumulated</span>
          <p className="text-xl font-extrabold text-emerald-400">
            {formatCurrency(totalSavedAmount, currency, true)}
          </p>
          <span className="text-[11px] text-slate-500">
            {totalTargetAmount > 0 ? Math.round((totalSavedAmount / totalTargetAmount) * 100) : 0}% of Total
          </span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">Total Required Monthly SIP</span>
          <p className="text-xl font-extrabold text-cyan-400">
            {formatCurrency(totalRequiredSIP, currency)}/mo
          </p>
          <span className="text-[11px] text-slate-500">Compound Annuity Formula</span>
        </div>

        <div className="p-4 rounded-2xl glass-panel border border-slate-800 space-y-1">
          <span className="text-[10px] text-slate-400 uppercase">Available Monthly Cashflow</span>
          <p className="text-xl font-extrabold text-amber-400">
            {formatCurrency(availableSurplus, currency)}/mo
          </p>
          <span className={`text-[11px] ${availableSurplus >= totalRequiredSIP ? 'text-emerald-400' : 'text-rose-400'}`}>
            {availableSurplus >= totalRequiredSIP ? '✅ Fully Funded Buffer' : '⚠️ Deficit Gap'}
          </span>
        </div>
      </div>

      {/* Goal Cards Grid */}
      {goals.length === 0 ? (
        <div className="rounded-2xl glass-panel p-12 text-center border border-slate-800 space-y-4">
          <Target className="w-12 h-12 text-emerald-400 mx-auto opacity-60" />
          <h3 className="text-lg font-bold text-white">No Financial Goals Defined Yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Add goals such as Home Purchase, Retirement Freedom, Education, or Travel to compute exact monthly contributions.
          </p>
          <button
            onClick={handleOpenAdd}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold text-xs transition-colors"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleEdit}
              onDelete={deleteGoal}
            />
          ))}
        </div>
      )}

      {/* Add / Edit Goal Modal */}
      <AddGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingGoal={editingGoal}
      />
    </div>
  );
}

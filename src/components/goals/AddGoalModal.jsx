import React, { useState } from 'react';
import { X, Target, Sparkles } from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

const PRESET_GOAL_TEMPLATES = [
  { name: 'Home Down Payment', category: 'Real Estate', targetAmount: 120000, targetYears: 5, icon: 'Home', expectedReturn: 0.08, inflationRate: 0.05 },
  { name: 'Retirement Freedom Fund', category: 'Retirement', targetAmount: 1500000, targetYears: 20, icon: 'Flame', expectedReturn: 0.10, inflationRate: 0.045 },
  { name: "Child's Higher Education", category: 'Education', targetAmount: 180000, targetYears: 12, icon: 'GraduationCap', expectedReturn: 0.09, inflationRate: 0.06 },
  { name: 'Emergency 6-Month Reserve', category: 'Emergency', targetAmount: 35000, targetYears: 2, icon: 'ShieldCheck', expectedReturn: 0.055, inflationRate: 0.04 },
  { name: 'Dream World Tour', category: 'Travel', targetAmount: 15000, targetYears: 3, icon: 'Plane', expectedReturn: 0.06, inflationRate: 0.04 },
];

export default function AddGoalModal({ isOpen, onClose, editingGoal = null }) {
  const { addGoal, updateGoal } = useFinancial();
  const currentYear = new Date().getFullYear();

  const [formData, setFormData] = useState(() => {
    if (editingGoal) return editingGoal;
    return {
      name: '',
      category: 'General',
      targetAmount: 50000,
      currentAmount: 5000,
      targetYear: currentYear + 5,
      priority: 'Medium',
      expectedReturn: 0.09,
      inflationRate: 0.05,
      icon: 'Target',
    };
  });

  if (!isOpen) return null;

  const handleApplyTemplate = (tpl) => {
    setFormData({
      ...formData,
      name: tpl.name,
      category: tpl.category,
      targetAmount: tpl.targetAmount,
      targetYear: currentYear + tpl.targetYears,
      icon: tpl.icon,
      expectedReturn: tpl.expectedReturn,
      inflationRate: tpl.inflationRate,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingGoal) {
      updateGoal(editingGoal.id, formData);
    } else {
      addGoal(formData);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl rounded-2xl bg-slate-900 border border-slate-700 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white">
              {editingGoal ? 'Edit Financial Goal' : 'Create New Financial Goal'}
            </h2>
            <p className="text-xs text-slate-400">Define milestone, target timeline, and inflation expectations.</p>
          </div>
        </div>

        {/* Quick Templates */}
        {!editingGoal && (
          <div className="mb-5">
            <p className="text-[11px] font-semibold text-slate-400 uppercase font-mono mb-2">
              Quick Goal Presets:
            </p>
            <div className="flex flex-wrap gap-2">
              {PRESET_GOAL_TEMPLATES.map((tpl) => (
                <button
                  key={tpl.name}
                  type="button"
                  onClick={() => handleApplyTemplate(tpl)}
                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>{tpl.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Goal Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Dream House Down Payment"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="Real Estate">Real Estate</option>
                <option value="Retirement">Retirement / FIRE</option>
                <option value="Education">Education</option>
                <option value="Emergency">Emergency Cushion</option>
                <option value="Travel">Travel & Lifestyle</option>
                <option value="General">General Wealth</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="High">High (Essential)</option>
                <option value="Medium">Medium (Important)</option>
                <option value="Low">Low (Discretionary)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Amount ($ / ₹)</label>
              <input
                type="number"
                required
                min="1000"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Saved Amount</label>
              <input
                type="number"
                min="0"
                value={formData.currentAmount}
                onChange={(e) => setFormData({ ...formData, currentAmount: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Year</label>
              <input
                type="number"
                min={currentYear + 1}
                max={currentYear + 50}
                value={formData.targetYear}
                onChange={(e) => setFormData({ ...formData, targetYear: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Expected Return (%)</label>
              <input
                type="number"
                step="0.5"
                value={(formData.expectedReturn * 100).toFixed(1)}
                onChange={(e) => setFormData({ ...formData, expectedReturn: Number(e.target.value) / 100 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Annual Inflation (%)</label>
              <input
                type="number"
                step="0.5"
                value={(formData.inflationRate * 100).toFixed(1)}
                onChange={(e) => setFormData({ ...formData, inflationRate: Number(e.target.value) / 100 })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-navy-950 font-bold text-xs shadow-glow-sm transition-all"
            >
              {editingGoal ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

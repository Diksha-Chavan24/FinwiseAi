import React, { useState } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { RISK_QUESTIONS } from '../mock/financialPresets';
import { getRiskProfileDetails, formatPercent } from '../utils/formatters';
import { 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  HelpCircle, 
  RotateCcw,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RiskAssessment() {
  const { profile, updateProfile } = useFinancial();

  // Selected options state: { q1: 15, q2: 18, ... }
  const [answers, setAnswers] = useState(() => {
    return {
      q1: 25,
      q2: 18,
      q3: 20,
      q4: 18,
      q5: 16,
    };
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSelect = (questionId, score) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: score
    }));
  };

  // Compute total score out of 100
  const calculatedRiskScore = Math.min(100, Math.max(10, 
    Object.values(answers).reduce((sum, s) => sum + s, 0)
  ));

  const profileDetails = getRiskProfileDetails(calculatedRiskScore);

  const handleApplyScore = () => {
    updateProfile({ riskScore: calculatedRiskScore });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Dynamic Risk Profiler</h1>
            <p className="text-xs text-slate-400">
              Evaluates Psychological Loss Aversion and Financial Shock Capacity.
            </p>
          </div>
        </div>

        <button
          onClick={handleApplyScore}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-navy-950 font-bold text-xs shadow-glow-sm transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Apply to Personalized Plans</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4" />
          <span>Risk Score ({calculatedRiskScore}/100) successfully saved and applied to your Multi-Plan generator!</span>
        </div>
      )}

      {/* Live Computed Risk Archetype Card */}
      <div className="p-6 rounded-2xl glass-card-cyan border border-cyan-500/30 space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">
              Calibrated Archetype
            </span>
            <h2 className="text-2xl font-black text-white mt-1">{profileDetails.name}</h2>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">{profileDetails.tagline}</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 uppercase">Risk Score</span>
              <p className="text-2xl font-extrabold text-cyan-400 mt-0.5">{calculatedRiskScore}<span className="text-xs text-slate-500">/100</span></p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-400 uppercase">Exp. Return</span>
              <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">{profileDetails.expectedReturn}%</p>
            </div>
          </div>
        </div>

        {/* Recommended Target Allocation */}
        <div className="pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs text-slate-300 mb-2 font-mono">
            <span className="font-semibold">Recommended Strategic Asset Mix:</span>
            <span>
              {profileDetails.allocation.equity}% Equity • {profileDetails.allocation.debt}% Debt • {profileDetails.allocation.cash}% Cash
            </span>
          </div>

          <div className="w-full h-3 rounded-full overflow-hidden flex bg-slate-800">
            <div style={{ width: `${profileDetails.allocation.equity}%` }} className="bg-emerald-400" title="Equity" />
            <div style={{ width: `${profileDetails.allocation.debt}%` }} className="bg-cyan-400" title="Debt" />
            <div style={{ width: `${profileDetails.allocation.cash}%` }} className="bg-amber-400" title="Cash" />
            <div style={{ width: `${profileDetails.allocation.gold}%` }} className="bg-pink-400" title="Gold" />
          </div>
        </div>
      </div>

      {/* Questionnaire List */}
      <div className="space-y-6">
        {RISK_QUESTIONS.map((q, qIndex) => {
          const selectedScore = answers[q.id];

          return (
            <div
              key={q.id}
              className="rounded-2xl glass-panel p-6 border border-slate-800 space-y-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center font-mono text-xs font-bold">
                  {qIndex + 1}
                </span>
                <h3 className="text-sm font-bold text-white">{q.question}</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedScore === opt.score;
                  return (
                    <button
                      key={optIndex}
                      type="button"
                      onClick={() => handleSelect(q.id, opt.score)}
                      className={`p-3.5 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-cyan-500/15 border-cyan-500/50 text-white shadow-glow-cyan/20'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold">{opt.label}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 font-mono">{opt.note}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Save action footer */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Ready to calibrate your plans?</h4>
          <p className="text-xs text-slate-400">Saving will align multi-plan projections to your {calculatedRiskScore}/100 score.</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/plans"
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-navy-950 font-bold text-xs shadow-glow-sm transition-all flex items-center gap-1.5"
            onClick={handleApplyScore}
          >
            <span>Save & View Personalized Plans</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

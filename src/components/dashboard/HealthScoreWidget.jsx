import React from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { getHealthScoreBadge } from '../../utils/formatters';
import { ShieldCheck, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HealthScoreWidget() {
  const { healthData } = useFinancial();
  const score = healthData?.totalScore || 75;
  const badge = getHealthScoreBadge(score);
  const pillars = healthData?.pillars || {};

  return (
    <div className="rounded-2xl glass-panel p-6 border border-slate-800 relative overflow-hidden">
      {/* Background ambient gradient */}
      <div className="ambient-glow-emerald -top-20 -right-20 opacity-30" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Deterministic Engine
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              6 Pillars Audited
            </span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">Financial Health Score</h2>
        </div>

        {/* Big Score Circular Badge */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <svg className="w-20 h-20 transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#1e293b"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#10b981"
                strokeWidth="6"
                strokeDasharray={200}
                strokeDashoffset={200 - (200 * score) / 100}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold font-mono-num text-white">{score}</span>
              <span className="text-[9px] text-slate-400 -mt-1 font-mono">/ 100</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${badge.bgColor} ${badge.textColor} border ${badge.borderColor}`}>
              {badge.label}
            </span>
            <p className="text-[11px] text-slate-400 max-w-[180px] leading-tight">
              {badge.description}
            </p>
          </div>
        </div>
      </div>

      {/* 6 Pillar Breakdown Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-5">
        {Object.entries(pillars).map(([key, p]) => {
          const percent = Math.round((p.score / p.max) * 100);
          const isHigh = percent >= 75;
          const isMedium = percent >= 50;

          return (
            <div key={key} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium truncate">{p.label}</span>
                <span className="font-mono font-bold text-white">
                  {p.score}<span className="text-slate-500 text-[10px]">/{p.max}</span>
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    isHigh ? 'bg-emerald-400' : isMedium ? 'bg-cyan-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1.5 font-mono">
                <span>{p.status}</span>
                <span>{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Emergency Runway: <strong>{healthData?.runwayMonths} months</strong> of baseline survival liquidity.</span>
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold hover:underline"
        >
          <span>Update Profile Data</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

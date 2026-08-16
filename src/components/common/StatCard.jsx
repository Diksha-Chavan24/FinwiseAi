import React from 'react';
import { ArrowUpRight, ArrowDownRight, HelpCircle } from 'lucide-react';

export default function StatCard({
  title,
  value,
  subtitle,
  change,
  changeType = 'positive', // 'positive' | 'negative' | 'neutral'
  icon: Icon,
  color = 'emerald', // 'emerald' | 'cyan' | 'amber' | 'indigo' | 'rose'
  tooltip,
  action,
}) {
  const colorStyles = {
    emerald: {
      border: 'hover:border-emerald-500/40',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      glow: 'group-hover:shadow-glow-sm',
    },
    cyan: {
      border: 'hover:border-cyan-500/40',
      iconBg: 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20',
      glow: 'group-hover:shadow-glow-cyan',
    },
    amber: {
      border: 'hover:border-amber-500/40',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
      glow: 'group-hover:shadow-glow-gold',
    },
    indigo: {
      border: 'hover:border-indigo-500/40',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
      glow: 'group-hover:shadow-indigo-500/20',
    },
    rose: {
      border: 'hover:border-rose-500/40',
      iconBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
      glow: 'group-hover:shadow-rose-500/20',
    }
  }[color] || {
    border: 'hover:border-slate-700',
    iconBg: 'bg-slate-800 text-slate-300',
    glow: '',
  };

  return (
    <div className={`group relative rounded-2xl glass-panel p-5 transition-all duration-300 ${colorStyles.border} ${colorStyles.glow}`}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
            <span>{title}</span>
            {tooltip && (
              <span title={tooltip} className="cursor-help text-slate-500 hover:text-slate-300">
                <HelpCircle className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
          <div className="text-2xl lg:text-3xl font-extrabold font-mono-num text-white tracking-tight pt-1">
            {value}
          </div>
        </div>

        {Icon && (
          <div className={`p-2.5 rounded-xl ${colorStyles.iconBg}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {(subtitle || change || action) && (
        <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
          {change && (
            <div className={`flex items-center gap-1 font-semibold ${
              changeType === 'positive' ? 'text-emerald-400' : changeType === 'negative' ? 'text-rose-400' : 'text-slate-400'
            }`}>
              {changeType === 'positive' && <ArrowUpRight className="w-3.5 h-3.5" />}
              {changeType === 'negative' && <ArrowDownRight className="w-3.5 h-3.5" />}
              <span>{change}</span>
            </div>
          )}

          {subtitle && (
            <span className="text-slate-400 truncate max-w-[200px]">{subtitle}</span>
          )}

          {action && (
            <div className="ml-auto">{action}</div>
          )}
        </div>
      )}
    </div>
  );
}

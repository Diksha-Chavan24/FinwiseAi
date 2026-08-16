import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import { useFinancial } from '../../context/FinancialContext';

export default function MonteCarloChart({ simulationData, height = 300 }) {
  const { currency } = useFinancial();

  if (!simulationData || !simulationData.timelineData) {
    return <div className="h-64 flex items-center justify-center text-xs text-slate-500">Run simulation to view probability corridors.</div>;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const p90 = payload.find(p => p.dataKey === 'optimistic')?.value;
      const p50 = payload.find(p => p.dataKey === 'expected')?.value;
      const p10 = payload.find(p => p.dataKey === 'pessimistic')?.value;
      const invested = payload.find(p => p.dataKey === 'totalInvested')?.value;

      return (
        <div className="rounded-xl bg-slate-900/95 border border-slate-700 p-3.5 shadow-2xl backdrop-blur-md min-w-[220px]">
          <p className="text-xs font-semibold text-slate-400 font-mono">Year {label} Monte Carlo Projection</p>
          <div className="mt-2 space-y-1.5 text-xs font-mono">
            <div className="flex items-center justify-between text-cyan-400">
              <span>90th Pct (Bull):</span>
              <span className="font-bold">{formatCurrency(p90, currency)}</span>
            </div>
            <div className="flex items-center justify-between text-emerald-400 font-semibold">
              <span>50th Pct (Median):</span>
              <span className="font-bold text-white">{formatCurrency(p50, currency)}</span>
            </div>
            <div className="flex items-center justify-between text-amber-400">
              <span>10th Pct (Bear):</span>
              <span className="font-bold">{formatCurrency(p10, currency)}</span>
            </div>
            <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
              <span>Contributed:</span>
              <span>{formatCurrency(invested, currency)}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={simulationData.timelineData} margin={{ top: 15, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="optimisticGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="expectedGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
            </linearGradient>
            <linearGradient id="pessimisticGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="year" 
            stroke="#64748b" 
            tickLine={false} 
            axisLine={false} 
            fontSize={11} 
            fontFamily="JetBrains Mono" 
          />
          <YAxis 
            stroke="#64748b" 
            tickLine={false} 
            axisLine={false} 
            fontSize={11}
            fontFamily="JetBrains Mono"
            tickFormatter={(val) => formatCurrency(val, currency, true)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="optimistic"
            name="90th Percentile (Optimistic)"
            stroke="#06b6d4"
            strokeWidth={1.5}
            strokeDasharray="3 3"
            fillOpacity={1}
            fill="url(#optimisticGrad)"
          />
          <Area
            type="monotone"
            dataKey="expected"
            name="50th Percentile (Median)"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#expectedGrad)"
          />
          <Area
            type="monotone"
            dataKey="pessimistic"
            name="10th Percentile (Conservative)"
            stroke="#f59e0b"
            strokeWidth={1.5}
            fillOpacity={1}
            fill="url(#pessimisticGrad)"
          />
          <Area
            type="monotone"
            dataKey="totalInvested"
            name="Cumulative Contributed"
            stroke="#94a3b8"
            strokeWidth={1}
            strokeDasharray="5 5"
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

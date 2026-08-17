import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useFinancial } from '../../context/FinancialContext';
import { formatINR } from '../../utils/formatters';

export default function NetWorthTrendChart({ years = 15 }) {
  const { netWorthData, cashFlowData, activePlan, plans } = useFinancial();
  const currentPlan = plans.find(p => p.id === activePlan) || plans[1];

  const currentYear = new Date().getFullYear();
  const initialNetWorth = Math.max(0, netWorthData?.netWorth || 200000);
  const annualSavings = (cashFlowData?.monthlySurplus || 25000) * 12;
  const annualReturn = currentPlan.expectedReturn || 0.10;

  const data = [];
  let compoundNetWorth = initialNetWorth;

  for (let i = 0; i <= years; i++) {
    data.push({
      year: currentYear + i,
      projectedNetWorth: Math.round(compoundNetWorth),
      cumulativeSaved: Math.round(initialNetWorth + (annualSavings * i)),
    });
    compoundNetWorth = (compoundNetWorth * (1 + annualReturn)) + annualSavings;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="rounded-xl bg-slate-900/95 border border-slate-700 p-3 shadow-2xl backdrop-blur-md">
          <p className="text-xs font-semibold text-slate-400 font-mono">Year {label}</p>
          <div className="mt-1 space-y-1">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-emerald-400 font-medium">Projected Net Worth:</span>
              <span className="font-mono-num font-bold text-white">
                {formatINR(payload[0].value)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 text-[11px]">
              <span className="text-slate-400">Your Deposits (Principal):</span>
              <span className="font-mono-num text-slate-300">
                {formatINR(payload[1]?.value || 0)}
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -5, bottom: 0 }}>
          <defs>
            <linearGradient id="networthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="principalGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
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
            tickFormatter={(val) => formatINR(val, true)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="projectedNetWorth"
            stroke="#10b981"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#networthGradient)"
          />
          <Area
            type="monotone"
            dataKey="cumulativeSaved"
            stroke="#06b6d4"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fillOpacity={1}
            fill="url(#principalGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

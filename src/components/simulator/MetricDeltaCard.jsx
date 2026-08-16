import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

export default function MetricDeltaCard({
  title,
  baselineValue,
  stressedValue,
  delta,
  deltaPercent,
  isPositiveGood = true,
}) {
  const isPositive = delta > 0;
  const isZero = delta === 0;

  const isFavorable = isPositiveGood ? isPositive : !isPositive;

  return (
    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
      <span className="text-xs font-semibold text-slate-400">{title}</span>

      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-lg font-extrabold font-mono-num text-white">
            {stressedValue}
          </span>
          <span className="block text-[10px] text-slate-500 font-mono">
            Base: {baselineValue}
          </span>
        </div>

        {!isZero ? (
          <div className={`flex items-center gap-0.5 text-xs font-bold font-mono ${
            isFavorable ? 'text-emerald-400' : 'text-rose-400'
          }`}>
            {isPositive ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
            <span>{deltaPercent !== undefined ? `${deltaPercent}%` : delta}</span>
          </div>
        ) : (
          <div className="flex items-center text-slate-500 text-xs font-mono">
            <Minus className="w-3.5 h-3.5" />
            <span>0%</span>
          </div>
        )}
      </div>
    </div>
  );
}

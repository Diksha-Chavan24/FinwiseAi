import React from 'react';

export default function ShockSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '%',
  onChange,
  description,
  formatValue,
}) {
  return (
    <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold text-white">{label}</label>
        <span className="font-mono font-bold text-emerald-400 text-sm">
          {formatValue ? formatValue(value) : `${value}${unit}`}
        </span>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
      />

      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
        <span>{formatValue ? formatValue(min) : `${min}${unit}`}</span>
        <span>{description}</span>
        <span>{formatValue ? formatValue(max) : `${max}${unit}`}</span>
      </div>
    </div>
  );
}

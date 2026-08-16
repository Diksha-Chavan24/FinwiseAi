import React from 'react';

export default function Badge({ children, variant = 'emerald', size = 'sm', className = '' }) {
  const variants = {
    emerald: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    cyan: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    rose: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    slate: 'bg-slate-800 text-slate-300 border-slate-700',
  };

  const sizes = {
    xs: 'text-[10px] px-1.5 py-0.5',
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium border rounded-full font-mono ${
        variants[variant] || variants.emerald
      } ${sizes[size] || sizes.sm} ${className}`}
    >
      {children}
    </span>
  );
}

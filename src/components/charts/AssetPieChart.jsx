import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';

const ASSET_LABELS = {
  liquidSavings: { label: 'Liquid Savings & Emergency', color: '#10b981' },
  stocksAndMutualFunds: { label: 'Stocks & Mutual Funds', color: '#06b6d4' },
  retirementAccounts: { label: 'Retirement Accounts (401k/IRA)', color: '#6366f1' },
  realEstate: { label: 'Real Estate Equity', color: '#f59e0b' },
  cryptoAndOthers: { label: 'Crypto & Alternatives', color: '#ec4899' },
};

export default function AssetPieChart({ height = 260 }) {
  const { netWorthData, currency } = useFinancial();
  const assets = netWorthData?.assets || {};

  const chartData = Object.entries(assets)
    .filter(([_, val]) => Number(val) > 0)
    .map(([key, val]) => ({
      key,
      name: ASSET_LABELS[key]?.label || key,
      value: Number(val),
      color: ASSET_LABELS[key]?.color || '#94a3b8',
    }));

  const totalAssets = netWorthData?.totalAssets || 1;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = ((data.value / totalAssets) * 100).toFixed(1);
      return (
        <div className="rounded-xl bg-slate-900/95 border border-slate-700 p-3 shadow-xl backdrop-blur-md">
          <p className="text-xs font-semibold text-white">{data.name}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-mono-num font-bold text-emerald-400">
              {formatCurrency(data.value, currency)}
            </span>
            <span className="text-xs text-slate-400 font-mono">({percentage}%)</span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-500 text-xs">
        No asset data configured yet.
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4">
      <div className="w-full md:w-1/2 h-[240px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={4}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">Total Assets</span>
          <span className="text-sm font-bold font-mono-num text-white">
            {formatCurrency(totalAssets, currency, true)}
          </span>
        </div>
      </div>

      {/* Legend list */}
      <div className="w-full md:w-1/2 space-y-2 text-xs">
        {chartData.map((item) => {
          const percent = ((item.value / totalAssets) * 100).toFixed(1);
          return (
            <div key={item.key} className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-800/40 transition-colors">
              <div className="flex items-center gap-2 truncate">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-slate-300 truncate max-w-[130px]">{item.name}</span>
              </div>
              <div className="flex items-center gap-1.5 font-mono">
                <span className="font-semibold text-white">{formatCurrency(item.value, currency, true)}</span>
                <span className="text-[11px] text-slate-500 w-10 text-right">{percent}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

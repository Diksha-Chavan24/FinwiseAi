import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from 'recharts';
import { useFinancial } from '../../context/FinancialContext';
import { formatCurrency } from '../../utils/formatters';

export default function CashFlowBarChart() {
  const { cashFlowData, currency } = useFinancial();

  const data = [
    {
      name: 'Gross Income',
      amount: cashFlowData?.monthlyIncome || 0,
      color: '#10b981', // Emerald
      type: 'inflow',
    },
    {
      name: 'Fixed Needs',
      amount: cashFlowData?.fixedExpenses || 0,
      color: '#6366f1', // Indigo
      type: 'outflow',
    },
    {
      name: 'Discretionary',
      amount: cashFlowData?.discretionaryExpenses || 0,
      color: '#f59e0b', // Amber
      type: 'outflow',
    },
    {
      name: 'Debt EMIs',
      amount: cashFlowData?.monthlyDebtPayments || 0,
      color: '#f43f5e', // Rose
      type: 'outflow',
    },
    {
      name: 'Net Surplus',
      amount: cashFlowData?.monthlySurplus || 0,
      color: '#06b6d4', // Cyan
      type: 'surplus',
    }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="rounded-xl bg-slate-900/95 border border-slate-700 p-3 shadow-xl backdrop-blur-md">
          <p className="text-xs font-semibold text-slate-300">{item.name}</p>
          <p className="text-sm font-bold font-mono-num text-white mt-1">
            {formatCurrency(item.amount, currency)}/month
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#64748b" 
            tickLine={false} 
            axisLine={false} 
            fontSize={10} 
          />
          <YAxis 
            stroke="#64748b" 
            tickLine={false} 
            axisLine={false} 
            fontSize={10}
            fontFamily="JetBrains Mono"
            tickFormatter={(val) => formatCurrency(val, currency, true)}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="amount" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

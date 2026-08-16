import React from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, Tooltip } from 'recharts';

export default function StressRadarChart({ stressResults }) {
  if (!stressResults) return null;

  const { base, stressed, resilienceScore } = stressResults;

  // Normalize scores (0 - 100) for radar
  const data = [
    {
      subject: 'Liquid Runway',
      Baseline: Math.min(100, Math.round((base.runwayMonths / 6) * 100)),
      Stressed: Math.min(100, Math.round((stressed.runwayMonths / 6) * 100)),
    },
    {
      subject: 'Cashflow Surplus',
      Baseline: Math.min(100, Math.max(0, Math.round((base.monthlySurplus / 3000) * 100))),
      Stressed: Math.min(100, Math.max(0, Math.round((stressed.monthlySurplus / 3000) * 100))),
    },
    {
      subject: 'Net Worth Defense',
      Baseline: 100,
      Stressed: Math.min(100, Math.max(20, Math.round(100 + stressResults.delta.netWorthDeltaPercent))),
    },
    {
      subject: 'Debt Solvency',
      Baseline: 90,
      Stressed: stressResults.scenario.debtPaymentSurge ? 65 : 85,
    },
    {
      subject: 'Shock Buffer',
      Baseline: 85,
      Stressed: resilienceScore,
    },
  ];

  return (
    <div className="w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
          <Radar
            name="Baseline Resilience"
            dataKey="Baseline"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.25}
          />
          <Radar
            name="Stressed Scenario"
            dataKey="Stressed"
            stroke="#f43f5e"
            fill="#f43f5e"
            fillOpacity={0.35}
          />
          <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

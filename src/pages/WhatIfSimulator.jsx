import React, { useState, useMemo } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { STRESS_SCENARIOS, runStressTest } from '../utils/stressTesting';
import { formatCurrency, formatPercent } from '../utils/formatters';
import ShockSlider from '../components/simulator/ShockSlider';
import MetricDeltaCard from '../components/simulator/MetricDeltaCard';
import StressRadarChart from '../components/charts/StressRadarChart';
import { 
  Sliders, 
  ShieldAlert, 
  RotateCcw, 
  AlertTriangle, 
  Activity, 
  TrendingDown, 
  CheckCircle2, 
  DollarSign,
  HeartPulse
} from 'lucide-react';

export default function WhatIfSimulator() {
  const { profile, currency } = useFinancial();

  // Active scenario preset
  const [activeScenarioKey, setActiveScenarioKey] = useState('RECESSION');

  // Custom slider adjustments
  const [customEquityDrop, setCustomEquityDrop] = useState(28);
  const [customExpenseSurge, setCustomExpenseSurge] = useState(5);
  const [customIncomeChange, setCustomIncomeChange] = useState(0);
  const [customCashDrain, setCustomCashDrain] = useState(0);

  // When preset is clicked, initialize sliders
  const handleSelectScenario = (key) => {
    setActiveScenarioKey(key);
    const scen = STRESS_SCENARIOS[key];
    if (scen) {
      setCustomEquityDrop(Math.round((scen.equityDrop || 0) * 100));
      setCustomExpenseSurge(Math.round((scen.expenseSurge || 0) * 100));
      setCustomIncomeChange(Math.round((scen.incomeChange || 0) * 100));
      setCustomCashDrain(scen.cashDrain || 0);
    }
  };

  // Run stress calculation dynamically
  const stressResults = useMemo(() => {
    return runStressTest(profile, activeScenarioKey, {
      equityDrop: customEquityDrop / 100,
      expenseSurge: customExpenseSurge / 100,
      incomeChange: customIncomeChange / 100,
      cashDrain: customCashDrain,
    });
  }, [profile, activeScenarioKey, customEquityDrop, customExpenseSurge, customIncomeChange, customCashDrain]);

  const { base, stressed, delta, resilienceScore, resilienceRating } = stressResults;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
            <Sliders className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-white">What-If & Macro Stress Simulator</h1>
            <p className="text-xs text-slate-400">
              Simulate macro-economic black swans and evaluate your household Resilience Score.
            </p>
          </div>
        </div>

        <button
          onClick={() => handleSelectScenario('RECESSION')}
          className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Shocks</span>
        </button>
      </div>

      {/* Preset Scenario Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.entries(STRESS_SCENARIOS).map(([key, scen]) => {
          const isSelected = activeScenarioKey === key;
          return (
            <button
              key={key}
              onClick={() => handleSelectScenario(key)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-amber-500/15 border-amber-500/50 text-white shadow-glow-gold'
                  : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
              }`}
            >
              <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold ${
                isSelected ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'
              }`}>
                {key.replace('_', ' ')}
              </span>
              <h4 className="text-xs font-bold text-white mt-2 truncate">{scen.name}</h4>
              <p className="text-[10px] text-slate-400 mt-1 line-clamp-2">{scen.description}</p>
            </button>
          );
        })}
      </div>

      {/* Resilience Score & Key Impact Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Resilience Score Card */}
        <div className="lg:col-span-4 rounded-2xl glass-panel p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-mono uppercase text-amber-400 font-bold">
              Stress Resilience Gauge
            </span>
            <h3 className="text-lg font-bold text-white mt-1">Household Resilience Score</h3>
            <p className="text-xs text-slate-400 mt-1">
              Deterministic buffer score under active shock parameters.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 text-center relative overflow-hidden">
            <div className="text-4xl font-extrabold font-mono-num text-amber-400">
              {resilienceScore}<span className="text-sm text-slate-500 font-mono"> / 100</span>
            </div>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono">
              {resilienceRating}
            </span>
          </div>

          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Stressed Liquid Runway:</span>
              <span className={`font-bold ${stressed.runwayMonths >= 3 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {stressed.runwayMonths} Months
              </span>
            </div>
            <div className="flex justify-between font-mono">
              <span className="text-slate-400">Surplus Delta:</span>
              <span className={`font-bold ${delta.surplusDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {formatCurrency(delta.surplusDelta, currency)}/mo
              </span>
            </div>
          </div>
        </div>

        {/* Right: Radar Chart & Impact Cards */}
        <div className="lg:col-span-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricDeltaCard
              title="Stressed Net Worth"
              baselineValue={formatCurrency(base.netWorth, currency, true)}
              stressedValue={formatCurrency(stressed.netWorth, currency, true)}
              delta={delta.netWorthDelta}
              deltaPercent={delta.netWorthDeltaPercent}
              isPositiveGood={true}
            />

            <MetricDeltaCard
              title="Stressed Liquid Cash"
              baselineValue={formatCurrency(base.liquidSavings, currency, true)}
              stressedValue={formatCurrency(stressed.liquidSavings, currency, true)}
              delta={stressed.liquidSavings - base.liquidSavings}
              deltaPercent={base.liquidSavings > 0 ? Number((((stressed.liquidSavings - base.liquidSavings) / base.liquidSavings) * 100).toFixed(1)) : 0}
              isPositiveGood={true}
            />

            <MetricDeltaCard
              title="Monthly Cash Surplus"
              baselineValue={formatCurrency(base.monthlySurplus, currency, true)}
              stressedValue={formatCurrency(stressed.monthlySurplus, currency, true)}
              delta={delta.surplusDelta}
              deltaPercent={base.monthlySurplus > 0 ? Number(((delta.surplusDelta / base.monthlySurplus) * 100).toFixed(1)) : 0}
              isPositiveGood={true}
            />
          </div>

          {/* Stress Radar Visualization */}
          <div className="rounded-2xl glass-panel p-5 border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase font-mono mb-2">
              Multi-Dimensional Stress Radar (Baseline vs Stressed)
            </h4>
            <StressRadarChart stressResults={stressResults} />
          </div>
        </div>
      </div>

      {/* Interactive Custom Shock Sliders */}
      <div className="rounded-2xl glass-panel p-6 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">Custom Stress Sandbox Sliders</h3>
            <p className="text-xs text-slate-400">Fine-tune specific variable shocks in real-time.</p>
          </div>
          <span className="text-xs font-mono text-emerald-400">Real-time Reactive</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ShockSlider
            label="Equities & Stock Market Drawdown"
            value={customEquityDrop}
            min={0}
            max={60}
            step={5}
            unit="%"
            onChange={setCustomEquityDrop}
            description="Portfolio loss"
          />

          <ShockSlider
            label="Inflation / Expense Surge"
            value={customExpenseSurge}
            min={-10}
            max={40}
            step={2}
            unit="%"
            onChange={setCustomExpenseSurge}
            description="Cost of living increase"
          />

          <ShockSlider
            label="Income Shock / Pay Cut"
            value={customIncomeChange}
            min={-100}
            max={50}
            step={10}
            unit="%"
            onChange={setCustomIncomeChange}
            description="-100% = Full job loss"
          />

          <ShockSlider
            label="Emergency Out-of-Pocket Cash Drain"
            value={customCashDrain}
            min={0}
            max={50000}
            step={2500}
            onChange={setCustomCashDrain}
            formatValue={(val) => formatCurrency(val, currency, true)}
            description="Health or catastrophe"
          />
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { runMonteCarloSimulation } from '../utils/monteCarlo';
import { formatCurrency, formatPercent } from '../utils/formatters';
import PlanCard from '../components/plans/PlanCard';
import PlanComparisonTable from '../components/plans/PlanComparisonTable';
import TradeOffMatrix from '../components/plans/TradeOffMatrix';
import PlanDetailModal from '../components/plans/PlanDetailModal';
import MonteCarloChart from '../components/charts/MonteCarloChart';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  HelpCircle, 
  Check, 
  RefreshCw,
  Scale
} from 'lucide-react';

export default function PersonalizedPlans() {
  const { plans, activePlan, selectPlan, healthData, cashFlowData, currency } = useFinancial();
  const [detailModalPlan, setDetailModalPlan] = useState(null);
  const [simulationHorizon, setSimulationHorizon] = useState(20);

  const selectedPlanObj = plans.find(p => p.id === activePlan) || plans[1] || plans[0];

  // Run 1,000 stochastic Monte Carlo runs for the selected plan
  const monteCarloData = useMemo(() => {
    const initial = Math.max(10000, healthData?.netWorth || 30000);
    const monthly = (cashFlowData?.monthlyIncome || 9000) * selectedPlanObj.monthlySIPRatio;
    return runMonteCarloSimulation(
      initial,
      monthly,
      selectedPlanObj.expectedReturn,
      selectedPlanObj.volatility,
      simulationHorizon,
      1000
    );
  }, [selectedPlanObj, healthData?.netWorth, cashFlowData?.monthlyIncome, simulationHorizon]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-cyan-400 text-navy-950 flex items-center justify-center font-bold shadow-glow-sm">
            <Sparkles className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold tracking-wider">
                Deterministic Multi-Plan Engine
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-slate-800 text-slate-300 font-mono">
                4 Strategies
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">Personalized Financial Strategies</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-mono">Active Model:</span>
          <span className="px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
            {selectedPlanObj.name}
          </span>
        </div>
      </div>

      {/* 4 Multi-Plan Strategy Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={plan.id === activePlan}
            onSelect={selectPlan}
            onViewDetails={(p) => setDetailModalPlan(p)}
          />
        ))}
      </div>

      {/* Monte Carlo 1,000-Iteration Stochastic Simulation Section */}
      <div className="rounded-2xl glass-panel p-6 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase text-cyan-400 font-bold">Stochastic Projection Engine</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">1,000 Iterations</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">
              Monte Carlo Probability Corridors ({selectedPlanObj.name})
            </h2>
          </div>

          {/* Horizon toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
            {[10, 15, 20, 25].map((yrs) => (
              <button
                key={yrs}
                onClick={() => setSimulationHorizon(yrs)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  simulationHorizon === yrs
                    ? 'bg-emerald-500 text-navy-950 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {yrs} Yrs
              </button>
            ))}
          </div>
        </div>

        {/* Monte Carlo Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-center">
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30">
            <span className="text-[10px] text-amber-400 uppercase font-bold">10th Percentile (Bear Market)</span>
            <p className="text-xl font-extrabold text-white mt-0.5">
              {formatCurrency(monteCarloData.summary.conservativeFinalWealth, currency, true)}
            </p>
            <span className="text-[10px] text-slate-400">Sustained economic contraction</span>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
            <span className="text-[10px] text-emerald-400 uppercase font-bold">50th Percentile (Expected Median)</span>
            <p className="text-xl font-extrabold text-emerald-400 mt-0.5">
              {formatCurrency(monteCarloData.summary.medianFinalWealth, currency, true)}
            </p>
            <span className="text-[10px] text-slate-400">Normal market historical cycles</span>
          </div>

          <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
            <span className="text-[10px] text-cyan-400 uppercase font-bold">90th Percentile (Bull Market)</span>
            <p className="text-xl font-extrabold text-cyan-400 mt-0.5">
              {formatCurrency(monteCarloData.summary.optimisticFinalWealth, currency, true)}
            </p>
            <span className="text-[10px] text-slate-400">Robust global expansion</span>
          </div>
        </div>

        {/* Monte Carlo Chart */}
        <div className="pt-2">
          <MonteCarloChart simulationData={monteCarloData} />
        </div>
      </div>

      {/* Side-by-Side Comparison Table */}
      <PlanComparisonTable
        plans={plans}
        activePlan={activePlan}
        onSelectPlan={selectPlan}
      />

      {/* Strategic Trade-Off Matrix */}
      <TradeOffMatrix plans={plans} />

      {/* Plan Detail Modal */}
      <PlanDetailModal
        plan={detailModalPlan}
        isOpen={Boolean(detailModalPlan)}
        onClose={() => setDetailModalPlan(null)}
        onSelect={selectPlan}
        isSelected={detailModalPlan?.id === activePlan}
      />
    </div>
  );
}

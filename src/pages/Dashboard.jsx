import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useFinancial } from '../context/FinancialContext';
import { formatCurrency, formatPercent } from '../utils/formatters';
import StatCard from '../components/common/StatCard';
import HealthScoreWidget from '../components/dashboard/HealthScoreWidget';
import QuickActions from '../components/dashboard/QuickActions';
import HiddenRiskAlerts from '../components/dashboard/HiddenRiskAlerts';
import GoalProgressList from '../components/dashboard/GoalProgressList';
import PeerBenchmarkWidget from '../components/dashboard/PeerBenchmarkWidget';
import AssetPieChart from '../components/charts/AssetPieChart';
import NetWorthTrendChart from '../components/charts/NetWorthTrendChart';
import CashFlowBarChart from '../components/charts/CashFlowBarChart';
import ConflictDetectorAlert from '../components/goals/ConflictDetectorAlert';
import { 
  DollarSign, 
  TrendingUp, 
  PiggyBank, 
  ShieldAlert, 
  Sparkles, 
  PieChart as PieIcon,
  BarChart3,
  Calendar
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { user } = useAuth();
  const { healthData, cashFlowData, netWorthData, currency, goalConflicts } = useFinancial();

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-card-emerald border border-emerald-500/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
            <Sparkles className="w-4 h-4" />
            <span>FINWISE INTELLIGENCE COMMAND CENTER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome back, {user?.name?.split(' ')[0] || 'Investor'}! 👋
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Your profile reflects <strong>{formatPercent(cashFlowData?.savingsRate || 0)}</strong> monthly savings velocity with <strong>{healthData?.runwayMonths} months</strong> of liquid runway.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            to="/ai-assistant"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-navy-950 font-bold text-xs shadow-glow-cyan transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ask AI Copilot</span>
          </Link>
          <Link
            to="/simulator"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-xs transition-colors"
          >
            Stress Test
          </Link>
        </div>
      </div>

      {/* Goal Conflict Alert if any */}
      {goalConflicts?.hasConflicts && (
        <ConflictDetectorAlert goalConflicts={goalConflicts} currency={currency} />
      )}

      {/* 4 Main KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Net Worth"
          value={formatCurrency(healthData?.netWorth || 0, currency)}
          subtitle={`Assets: ${formatCurrency(netWorthData?.totalAssets || 0, currency, true)}`}
          change="+8.4% YTD"
          changeType="positive"
          icon={TrendingUp}
          color="emerald"
          tooltip="Total assets minus total liabilities"
        />

        <StatCard
          title="Monthly Cash Surplus"
          value={formatCurrency(cashFlowData?.monthlySurplus || 0, currency)}
          subtitle={`Income: ${formatCurrency(cashFlowData?.monthlyIncome || 0, currency, true)}`}
          change={`${(cashFlowData?.savingsRate * 100).toFixed(0)}% Savings Rate`}
          changeType="positive"
          icon={PiggyBank}
          color="cyan"
          tooltip="Income remaining after fixed expenses and debt obligations"
        />

        <StatCard
          title="Emergency Runway"
          value={`${healthData?.runwayMonths || 0} Mo`}
          subtitle={`Liquid Cash: ${formatCurrency(netWorthData?.liquidAssets || 0, currency, true)}`}
          change={healthData?.runwayMonths >= 6 ? 'Optimal Buffer' : 'Add to Reserve'}
          changeType={healthData?.runwayMonths >= 6 ? 'positive' : 'negative'}
          icon={ShieldAlert}
          color={healthData?.runwayMonths >= 6 ? 'emerald' : 'amber'}
          tooltip="Number of months living costs covered by liquid cash"
        />

        <StatCard
          title="Debt-to-Income (DTI)"
          value={formatPercent(cashFlowData?.dtiRatio || 0)}
          subtitle={`Total Debt: ${formatCurrency(netWorthData?.totalLiabilities || 0, currency, true)}`}
          change={cashFlowData?.dtiRatio <= 0.25 ? 'Low Debt Risk' : 'Moderate Burden'}
          changeType={cashFlowData?.dtiRatio <= 0.25 ? 'positive' : 'negative'}
          icon={DollarSign}
          color={cashFlowData?.dtiRatio <= 0.25 ? 'indigo' : 'rose'}
          tooltip="Monthly debt obligations divided by gross monthly income"
        />
      </div>

      {/* Health Score Diagnostic Widget */}
      <HealthScoreWidget />

      {/* Quick Action Navigation Grid */}
      <QuickActions />

      {/* Charts Grid: Asset Allocation & Net Worth Compound Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Asset Breakdown Donut */}
        <div className="lg:col-span-5 rounded-2xl glass-panel p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Asset Allocation Breakdown</h3>
            </div>
            <Link to="/profile" className="text-[11px] text-emerald-400 hover:underline">
              Edit Assets
            </Link>
          </div>
          <AssetPieChart />
        </div>

        {/* 15-Year Net Worth Trend */}
        <div className="lg:col-span-7 rounded-2xl glass-panel p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold text-white">15-Year Net Worth Trajectory (Active Plan)</h3>
            </div>
            <Link to="/plans" className="text-[11px] text-cyan-400 hover:underline">
              Switch Plan
            </Link>
          </div>
          <NetWorthTrendChart years={15} />
        </div>
      </div>

      {/* Cashflow Bar Chart & Hidden Risk Warnings */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Cashflow Bar */}
        <div className="lg:col-span-6 rounded-2xl glass-panel p-5 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Monthly Cashflow Distribution</h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Surplus: {formatCurrency(cashFlowData?.monthlySurplus || 0, currency)}
            </span>
          </div>
          <CashFlowBarChart />
        </div>

        {/* Peer Benchmark CSV Widget */}
        <div className="lg:col-span-6">
          <PeerBenchmarkWidget />
        </div>
      </div>

      {/* Hidden Risks and Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <HiddenRiskAlerts />
        <GoalProgressList />
      </div>
    </div>
  );
}

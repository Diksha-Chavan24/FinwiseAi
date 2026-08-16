import React, { useEffect, useState } from 'react';
import { useFinancial } from '../../context/FinancialContext';
import { calculatePeerPercentile, getCohortComparison } from '../../services/csvService';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { Users, TrendingUp, Award, FileSpreadsheet } from 'lucide-react';

export default function PeerBenchmarkWidget() {
  const { healthData, profile, currency } = useFinancial();
  const [netWorthRanking, setNetWorthRanking] = useState(null);
  const [savingsRanking, setSavingsRanking] = useState(null);
  const [cohort, setCohort] = useState(null);

  useEffect(() => {
    async function loadRankings() {
      const nwRank = await calculatePeerPercentile(healthData?.netWorth || 0, 'net_worth');
      const savRank = await calculatePeerPercentile(healthData?.savingsRate || 0, 'savings_rate');
      const cohortData = await getCohortComparison(profile?.age || 30, (profile?.monthlyIncome || 8000) * 12);
      
      setNetWorthRanking(nwRank);
      setSavingsRanking(savRank);
      setCohort(cohortData);
    }
    loadRankings();
  }, [healthData?.netWorth, healthData?.savingsRate, profile?.age, profile?.monthlyIncome]);

  return (
    <div className="rounded-2xl glass-panel p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
            <Users className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-white">Peer Benchmark (100 FinWise Profiles)</h3>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
          CSV Benchmark
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Net Worth Percentile Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Net Worth Rank</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-extrabold font-mono-num text-emerald-400">
                Top {100 - (netWorthRanking?.percentile || 50)}%
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              Peer Median: {formatCurrency(netWorthRanking?.median || 225000, currency, true)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 font-mono font-bold text-xs">
            {netWorthRanking?.percentile || 50}th
          </div>
        </div>

        {/* Savings Velocity Percentile Card */}
        <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 font-medium">Savings Velocity Rank</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-extrabold font-mono-num text-cyan-400">
                Top {100 - (savingsRanking?.percentile || 50)}%
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">
              Peer Median: {formatPercent(savingsRanking?.median || 0.38)}
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono font-bold text-xs">
            {savingsRanking?.percentile || 50}th
          </div>
        </div>
      </div>

      {cohort && (
        <div className="p-3 rounded-xl bg-slate-900/40 border border-slate-800/60 text-xs text-slate-400 flex items-center justify-between font-mono">
          <span>Age Cohort ({cohort.ageRange}):</span>
          <span className="text-slate-300 font-semibold">
            Avg NW: {formatCurrency(cohort.avgNetWorth, currency, true)} • Avg Savings: {formatPercent(cohort.avgSavingsRate)}
          </span>
        </div>
      )}
    </div>
  );
}

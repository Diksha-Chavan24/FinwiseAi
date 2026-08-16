import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sliders, 
  Target, 
  Bot, 
  ShieldAlert, 
  FileSpreadsheet, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';
import { exportProfileToCSV } from '../../services/csvService';

export default function QuickActions() {
  const { profile } = useFinancial();

  const actions = [
    {
      name: 'Run What-If Simulator',
      desc: 'Test salary hikes, inflation & recession shocks',
      path: '/simulator',
      icon: Sliders,
      color: 'emerald',
    },
    {
      name: 'Explore 4 Personalized Plans',
      desc: 'Review Monte Carlo confidence & trade-offs',
      path: '/plans',
      icon: Sparkles,
      color: 'cyan',
    },
    {
      name: 'Consult AI Assistant',
      desc: 'Grounded fiduciary copilot & plan advisor',
      path: '/ai-assistant',
      icon: Bot,
      color: 'indigo',
    },
    {
      name: 'Recalculate Risk Score',
      desc: '10-question dynamic risk capacity profiler',
      path: '/risk-assessment',
      icon: ShieldAlert,
      color: 'amber',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {actions.map((act) => {
        const Icon = act.icon;
        return (
          <Link
            key={act.path}
            to={act.path}
            className="group p-4 rounded-2xl glass-panel-interactive flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <div className="p-2 rounded-xl bg-slate-800/80 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">
                {act.name}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {act.desc}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

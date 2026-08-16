import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle2, 
  ShieldAlert, 
  Target, 
  Sparkles, 
  Sliders, 
  Bot, 
  TrendingUp,
  CreditCard,
  FileSpreadsheet
} from 'lucide-react';
import { useFinancial } from '../../context/FinancialContext';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Financial Profile', path: '/profile', icon: UserCircle2 },
  { name: 'Risk Assessment', path: '/risk-assessment', icon: ShieldAlert },
  { name: 'Financial Goals', path: '/goals', icon: Target },
  { name: 'Personalized Plans', path: '/plans', icon: Sparkles, badge: '4 Strategies' },
  { name: 'What-If Simulator', path: '/simulator', icon: Sliders, badge: 'Stress Test' },
  { name: 'AI Financial Assistant', path: '/ai-assistant', icon: Bot, highlight: true },
];

export default function Sidebar({ isOpen, onClose }) {
  const { healthData, goalConflicts } = useFinancial();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-slate-800/80 bg-navy-900/95 backdrop-blur-xl p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Section: Main Navigation */}
          <div>
            <p className="px-3 text-[11px] font-semibold tracking-wider text-slate-500 uppercase font-mono">
              Planning Engine
            </p>
            <nav className="mt-2 space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                        isActive
                          ? 'bg-emerald-500/15 text-emerald-400 font-semibold border border-emerald-500/30 shadow-glow-sm/20'
                          : item.highlight
                          ? 'text-cyan-300 hover:bg-cyan-500/10 border border-cyan-500/20'
                          : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                        {item.badge}
                      </span>
                    )}
                    {item.highlight && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* Quick Diagnostics Box */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-semibold text-slate-300">Live Health Diagnostic</span>
              <span className="font-mono-num font-bold text-emerald-400">{healthData?.totalScore || 75}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${healthData?.totalScore || 75}%` }}
              />
            </div>
            {goalConflicts?.hasConflicts && (
              <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-amber-400 bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">1 Goal Cashflow Bottleneck</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer info / Disclaimer */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1 font-mono">
          <div className="flex items-center justify-between">
            <span>Engine: Deterministic v1.2</span>
            <span className="text-emerald-400">● Live</span>
          </div>
          <p className="text-[10px] text-slate-600 leading-relaxed">
            AI grounded fiduciary model.
          </p>
        </div>
      </aside>
    </>
  );
}

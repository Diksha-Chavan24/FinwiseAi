import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFinancial } from '../../context/FinancialContext';
import { 
  Sparkles, 
  DollarSign, 
  IndianRupee, 
  User, 
  LogOut, 
  ChevronDown, 
  ShieldCheck, 
  Menu, 
  X,
  Bot
} from 'lucide-react';
import { formatCurrency, getHealthScoreBadge } from '../../utils/formatters';

export default function Navbar({ onToggleSidebar }) {
  const { user, logout, switchDemoPersona, demoPersonas } = useAuth();
  const { currency, toggleCurrency, healthData } = useFinancial();
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const healthBadge = getHealthScoreBadge(healthData?.totalScore || 75);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-navy-950/90 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Left: Brand & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/50"
              aria-label="Toggle navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}

          <Link to="/dashboard" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-navy-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1">
                FinWise <span className="text-emerald-400 font-extrabold">AI</span>
              </span>
              <span className="text-[10px] -mt-1 text-slate-400 tracking-wider font-mono">FINANCIAL INTELLIGENCE</span>
            </div>
          </Link>
        </div>

        {/* Center: Live Health Badge Pill (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="text-slate-400">Health Score:</span>
            <span className="font-mono-num font-bold text-emerald-400">{healthData?.totalScore || 75}/100</span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${healthBadge.bgColor} ${healthBadge.textColor} border ${healthBadge.borderColor}`}>
              {healthBadge.label}
            </span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs text-slate-300">
            <span className="text-slate-400">Net Worth:</span>
            <span className="font-mono-num font-bold text-cyan-400">
              {formatCurrency(healthData?.netWorth || 0, currency, true)}
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Currency Switcher */}
          <button
            onClick={toggleCurrency}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-700/60 text-xs font-semibold text-slate-200 hover:border-emerald-500/50 hover:text-emerald-400 transition-colors"
            title={`Switch to ${currency === 'USD' ? 'INR (₹)' : 'USD ($)'}`}
          >
            {currency === 'USD' ? (
              <>
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>USD</span>
              </>
            ) : (
              <>
                <IndianRupee className="w-3.5 h-3.5 text-cyan-400" />
                <span>INR</span>
              </>
            )}
          </button>

          {/* 1-Click Demo Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPersonaMenu(!showPersonaMenu);
                setShowUserMenu(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition-all"
            >
              <span className="hidden sm:inline">Demo Persona:</span>
              <span className="font-bold text-white max-w-[90px] truncate">{user?.name?.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-emerald-400" />
            </button>

            {showPersonaMenu && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-2xl p-2 z-50 backdrop-blur-xl animate-in fade-in zoom-in-95">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-semibold text-slate-300">Switch Test Persona</p>
                  <p className="text-[11px] text-slate-400">Instantly test different financial profiles</p>
                </div>
                <div className="py-1 space-y-1">
                  {demoPersonas.map((persona) => (
                    <button
                      key={persona.id}
                      onClick={() => {
                        switchDemoPersona(persona.id);
                        setShowPersonaMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs flex items-center gap-2.5 transition-colors ${
                        user?.id === persona.id 
                          ? 'bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30' 
                          : 'text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <img src={persona.avatar} alt={persona.name} className="w-7 h-7 rounded-full object-cover border border-slate-700" />
                      <div className="flex-1 min-w-0">
                        <p className="truncate text-white text-xs font-medium">{persona.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{persona.occupation} • Age {persona.age}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* AI Assistant Quick Link */}
          <Link
            to="/ai-assistant"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border border-cyan-500/30 text-xs font-semibold text-cyan-300 hover:from-cyan-500/30 hover:to-emerald-500/30 transition-all shadow-glow-cyan/20"
          >
            <Bot className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="hidden sm:inline">AI Copilot</span>
          </Link>

          {/* User Profile Avatar & Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowPersonaMenu(false);
              }}
              className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-emerald-500/50 transition-all"
            >
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                alt={user?.name || 'User'}
                className="w-8 h-8 rounded-full object-cover border border-slate-700"
              />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-2xl p-2 z-50 backdrop-blur-xl">
                <div className="px-3 py-2 border-b border-slate-800">
                  <p className="text-xs font-semibold text-white truncate">{user?.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                </div>
                <div className="py-1">
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:bg-slate-800 rounded-lg"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Financial Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                      navigate('/login');
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
}

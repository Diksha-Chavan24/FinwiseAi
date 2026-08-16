import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, ShieldCheck, UserCheck, Lock, Mail } from 'lucide-react';

export default function Login() {
  const { login, switchDemoPersona, demoPersonas } = useAuth();
  const [email, setEmail] = useState('alex.chen@finwise.ai');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    login(email, password);
    navigate('/dashboard');
  };

  const handleQuickDemo = (personaId) => {
    switchDemoPersona(personaId);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="ambient-glow-emerald top-10 left-10 opacity-20" />
      <div className="ambient-glow-cyan bottom-10 right-10 opacity-20" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-400 flex items-center justify-center shadow-glow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5 text-navy-950 stroke-[2.5]" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            FinWise <span className="text-emerald-400 font-extrabold">AI</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold text-white tracking-tight">Sign in to your Financial Dashboard</h2>
        <p className="mt-1 text-xs text-slate-400">
          Or test instantly using preloaded demo personas below
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        {/* 1-Click Demo Accounts Selector */}
        <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
            <UserCheck className="w-4 h-4 text-emerald-400" />
            <span>1-Click Instant Demo Profiles</span>
          </div>
          <div className="space-y-2">
            {demoPersonas.map((persona) => (
              <button
                key={persona.id}
                type="button"
                onClick={() => handleQuickDemo(persona.id)}
                className="w-full p-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-left flex items-center gap-3 transition-all group hover:border-emerald-500/50"
              >
                <img src={persona.avatar} alt={persona.name} className="w-8 h-8 rounded-full object-cover border border-slate-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white group-hover:text-emerald-400 truncate">{persona.name}</p>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{persona.occupation} • Age {persona.age}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </div>

        {/* Regular Login Form */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-2xl">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-navy-950 font-bold text-xs shadow-glow-sm transition-all"
            >
              Sign In
            </button>
          </form>

          <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-emerald-400 hover:text-emerald-300 font-semibold">
              Create one here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

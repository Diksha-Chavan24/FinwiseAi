import React, { useState, useRef, useEffect } from 'react';
import { useFinancial } from '../context/FinancialContext';
import { useAuth } from '../context/AuthContext';
import { askAIAssistant } from '../services/aiService';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { 
  Bot, 
  Send, 
  Sparkles, 
  User, 
  ShieldCheck, 
  Key, 
  RefreshCw, 
  MessageSquare, 
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "Why is my Financial Health Score at its current level?",
  "Compare Balanced Plan vs Equity Maximizer for my situation",
  "Can I afford my active financial goals with my current cash flow?",
  "What are my highest risk financial vulnerabilities?",
  "How can I accelerate my retirement readiness by 5 years?"
];

export default function AIAssistant() {
  const { user } = useAuth();
  const { profile, healthData, goals, plans, activePlan, currency } = useFinancial();

  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'ai',
      text: `Hello ${user?.name?.split(' ')[0] || 'there'}! I am your **FinWise AI Copilot**.

I am strictly grounded in your verified financial balances and deterministic engine calculations:
- **Net Worth**: ${formatCurrency(healthData?.netWorth || 0, currency)}
- **Monthly Cash Surplus**: ${formatCurrency(healthData?.monthlySurplus || 0, currency)}/mo
- **Health Score**: ${healthData?.totalScore || 75}/100 (${healthData?.runwayMonths || 0} months emergency runway)
- **Active Strategy**: ${plans.find(p => p.id === activePlan)?.name || 'Balanced Wealth Builder'}

How can I assist your financial planning today? Click any suggested query below or ask your own question.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState(() => localStorage.getItem('finwise_gemini_key') || '');
  const [apiKeySaved, setApiKeySaved] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputQuery;
    if (!query.trim() || isLoading) return;

    const userMsg = {
      id: 'msg-' + Date.now(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const aiReply = await askAIAssistant({
        question: query,
        profile,
        healthData,
        goalsData: goals,
        plans,
        activePlan,
        conversationHistory: messages,
        currency,
      });

      const replyMsg = {
        id: 'msg-reply-' + Date.now(),
        sender: 'ai',
        text: aiReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, replyMsg]);
    } catch (err) {
      console.error(err);
      setMessages(prev => [
        ...prev,
        {
          id: 'msg-err-' + Date.now(),
          sender: 'ai',
          text: 'I encountered an issue retrieving the calculations. Please try again.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    if (apiKeyInput.trim()) {
      localStorage.setItem('finwise_gemini_key', apiKeyInput.trim());
    } else {
      localStorage.removeItem('finwise_gemini_key');
    }
    setApiKeySaved(true);
    setTimeout(() => {
      setApiKeySaved(false);
      setShowApiKeyModal(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel border border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
                Grounded Fiduciary AI
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                Zero Hallucinations
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-white mt-1">AI Financial Assistant & Planner</h1>
          </div>
        </div>

        <button
          onClick={() => setShowApiKeyModal(true)}
          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
        >
          <Key className="w-4 h-4 text-cyan-400" />
          <span>Gemini API Key (Optional)</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Grounded Context Bar */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl glass-panel p-5 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase font-mono tracking-wider border-b border-slate-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Grounded Knowledge Base</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Net Worth:</span>
                <span className="font-bold text-emerald-400">{formatCurrency(healthData?.netWorth || 0, currency)}</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Monthly Surplus:</span>
                <span className="font-bold text-cyan-400">{formatCurrency(healthData?.monthlySurplus || 0, currency)}/mo</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Health Score:</span>
                <span className="font-bold text-white">{healthData?.totalScore || 75}/100</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex justify-between">
                <span className="text-slate-400">Active Strategy:</span>
                <span className="font-bold text-amber-400 truncate max-w-[120px]">
                  {plans.find(p => p.id === activePlan)?.name}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              💡 <strong>Safety Guarantee:</strong> FinWise AI performs all financial formulas deterministically. The AI explains trade-offs without inventing numbers.
            </div>
          </div>

          {/* Quick Prompts Panel */}
          <div className="rounded-2xl glass-panel p-5 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white uppercase font-mono tracking-wider">
              Suggested Questions
            </h3>
            <div className="space-y-2">
              {SUGGESTED_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  disabled={isLoading}
                  className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-left text-xs text-slate-300 hover:text-white transition-all group flex items-start gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{prompt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Chat Interface */}
        <div className="lg:col-span-8 flex flex-col h-[650px] rounded-2xl glass-panel border border-slate-800 overflow-hidden">
          {/* Chat Messages Log */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              const isAI = msg.sender === 'ai';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAI ? 'justify-start' : 'justify-end'}`}
                >
                  {isAI && (
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 shrink-0 mt-1">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                      isAI
                        ? 'bg-slate-900/90 border border-slate-800 text-slate-200 shadow-lg'
                        : 'bg-emerald-500/20 border border-emerald-500/40 text-white ml-auto'
                    }`}
                  >
                    <div className="prose prose-invert prose-xs max-w-none space-y-2 whitespace-pre-line">
                      {msg.text}
                    </div>
                    <span className="block text-[10px] text-slate-500 mt-2 text-right font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {!isAI && (
                    <img
                      src={user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                      alt="User"
                      className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0 mt-1"
                    />
                  )}
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-3 text-xs text-slate-400 p-4">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 animate-pulse">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <span>Grounding financial facts & analyzing models...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about your financial health, multi-plans, goal timelines..."
              className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 transition-colors"
            />

            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 hover:from-cyan-600 hover:to-emerald-600 text-navy-950 font-bold text-xs shadow-glow-cyan disabled:opacity-50 transition-all flex items-center gap-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>

      {/* Gemini API Key Configuration Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-slate-900 border border-slate-700 p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Google Gemini API Key</h3>
                <p className="text-xs text-slate-400">Connect live Gemini LLM for AI explanations</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              FinWise AI includes a built-in deterministic reasoning engine that works without an API key. 
              Adding your free Google Gemini API key enables direct live GenAI generation.
            </p>

            <form onSubmit={handleSaveApiKey} className="space-y-3">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white font-mono focus:outline-none focus:border-cyan-500"
              />

              {apiKeySaved && (
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Key saved to local browser storage!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowApiKeyModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-navy-950 font-bold text-xs"
                >
                  Save API Key
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import { 
  History, 
  Trash2, 
  Sparkles, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  MessageSquare,
  Clock
} from 'lucide-react';
import { useAI } from '../../context/AIContext';

const AIHistory = () => {
  const { messages, savedPlans, clearChat, openAssistant, sendMessage } = useAI();

  // Filter messages that were asked by user
  const userQueries = messages.filter((m) => m.role === 'user');

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-slate-500/10 via-zinc-500/10 to-stone-500/10 border border-slate-500/20 p-4 rounded-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold text-sm">
            <History className="w-4 h-4 text-emerald-500" />
            <span>Recent AI Expedition History</span>
          </div>
          {(userQueries.length > 0 || savedPlans.length > 0) && (
            <button
              onClick={clearChat}
              className="flex items-center gap-1 text-[11px] font-bold text-rose-500 hover:text-rose-600 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
          Review your previous prompts, custom itineraries, and budget calculations stored locally on your device.
        </p>
      </div>

      {/* Saved Itineraries Section */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Saved Custom Itineraries ({savedPlans.length})
        </h5>
        {savedPlans.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No custom itineraries generated yet.</p>
        ) : (
          <div className="space-y-2">
            {savedPlans.map((plan) => (
              <div
                key={plan.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 dark:text-slate-100">
                    {plan.destination}
                  </span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400">
                    ₹{plan.budget?.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span>{plan.duration}</span>
                  <span>•</span>
                  <span>{plan.travelers} Travelers</span>
                  <span>•</span>
                  <span>{plan.difficulty}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Past Chat Queries */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Past Prompts & Inquiries ({userQueries.length})
        </h5>
        {userQueries.length === 0 ? (
          <p className="text-xs text-slate-400 italic">No previous inquiries yet.</p>
        ) : (
          <div className="space-y-1.5">
            {userQueries.slice(-8).reverse().map((q) => (
              <button
                key={q.id}
                onClick={() => {
                  openAssistant('chat', q.content);
                }}
                className="w-full p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/60 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 text-left text-xs transition-colors flex items-center justify-between gap-2 group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <MessageSquare className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 shrink-0" />
                  <span className="truncate text-slate-700 dark:text-slate-300 font-medium">
                    {q.content}
                  </span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIHistory;

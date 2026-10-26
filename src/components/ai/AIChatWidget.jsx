import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Sparkles, 
  X, 
  Minus, 
  Send, 
  RotateCcw, 
  MapPin, 
  Calendar, 
  IndianRupee, 
  ShieldCheck, 
  Luggage, 
  History as HistoryIcon, 
  Compass, 
  Heart, 
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAI } from '../../context/AIContext';
import AITripPlanner from './AITripPlanner';
import AIBudgetPlanner from './AIBudgetPlanner';
import AIPackingAssistant from './AIPackingAssistant';
import AISafetyAssistant from './AISafetyAssistant';
import AIRecommendationEngine from './AIRecommendationEngine';
import AIHistory from './AIHistory';

const QUICK_PROMPTS = [
  'Suggest adventures under ₹15000',
  'Best trek for beginners',
  'Best destination in December',
  'Packing list for Kedarkantha',
  'Budget trip for friends'
];

const AIChatWidget = () => {
  const {
    isOpen,
    setIsOpen,
    activeTab,
    setActiveTab,
    isLoading,
    messages,
    sendMessage,
    clearChat
  } = useAI();

  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef(null);

  // Auto-scroll chat to bottom on new message
  useEffect(() => {
    if (activeTab === 'chat') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab, isLoading]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    const text = inputVal;
    setInputVal('');
    sendMessage(text);
  };

  const handlePromptClick = (prompt) => {
    sendMessage(prompt);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* FLOATING AI ASSISTANT TRIGGER BUTTON                     */}
      {/* ======================================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {/* Pulsing Pill Tooltip (visible when closed) */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 dark:bg-white/90 text-white dark:text-slate-900 text-xs font-bold shadow-xl backdrop-blur-md border border-slate-700/50 dark:border-slate-200/50 cursor-pointer pointer-events-auto"
            onClick={() => setIsOpen(true)}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600 animate-pulse" />
            <span>AI Travel Assistant</span>
          </motion.div>
        )}

        {/* Floating Bubble Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle AdventureX AI Smart Assistant"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 text-white shadow-2xl shadow-emerald-500/30 flex items-center justify-center border-2 border-white/30 backdrop-blur-xl group cursor-pointer"
        >
          {/* Subtle Radar Ripple */}
          <span className="absolute -inset-1 rounded-full bg-emerald-400 opacity-25 animate-ping group-hover:opacity-40" />

          {isOpen ? (
            <X className="w-6 h-6 text-white relative z-10 transition-transform group-hover:rotate-90" />
          ) : (
            <Bot className="w-7 h-7 text-white relative z-10" />
          )}

          {/* Online status indicator */}
          <span className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-slate-900 shadow-sm z-20" />
        </motion.button>
      </div>

      {/* ======================================================== */}
      {/* MODERN GLASSMORPHISM AI CHAT WIDGET MODAL / DRAWER       */}
      {/* ======================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[95vw] sm:w-[460px] h-[640px] max-h-[85vh] rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/80 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
          >
            {/* 1. Glassmorphic Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between border-b border-white/10 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm tracking-tight text-white">
                      AdventureX AI
                    </h3>
                    <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Active
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-300">
                    Smart Travel & Wilderness Companion
                  </p>
                </div>
              </div>

              {/* Header Controls */}
              <div className="flex items-center gap-1">
                {activeTab === 'chat' && (
                  <button
                    onClick={clearChat}
                    title="Clear Chat History"
                    className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  title="Minimize"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  title="Close"
                  className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* 2. Horizontal Tool Bar (Navigation Tabs) */}
            <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 text-xs">
              {[
                { id: 'chat', label: 'Chat', icon: MessageSquare },
                { id: 'planner', label: 'Trip Planner', icon: Compass },
                { id: 'budget', label: 'Budget (₹)', icon: IndianRupee },
                { id: 'packing', label: 'Packing', icon: Luggage },
                { id: 'safety', label: 'Safety', icon: ShieldCheck },
                { id: 'recommendations', label: 'For You', icon: Heart },
                { id: 'history', label: 'History', icon: HistoryIcon }
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold whitespace-nowrap text-xs transition-all ${
                      isActive
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* 3. Main Body Content (Render selected tool tab) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              {activeTab === 'planner' && <AITripPlanner />}
              {activeTab === 'budget' && <AIBudgetPlanner />}
              {activeTab === 'packing' && <AIPackingAssistant />}
              {activeTab === 'safety' && <AISafetyAssistant />}
              {activeTab === 'recommendations' && <AIRecommendationEngine />}
              {activeTab === 'history' && <AIHistory />}

              {/* Chat View */}
              {activeTab === 'chat' && (
                <div className="space-y-4">
                  {/* Messages Stream */}
                  {messages.map((msg) => {
                    const isAssistant = msg.role === 'assistant';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                      >
                        {isAssistant && (
                          <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                            <Bot className="w-4 h-4" />
                          </div>
                        )}

                        <div
                          className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed shadow-sm ${
                            isAssistant
                              ? 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-slate-700/60 rounded-tl-sm'
                              : 'bg-emerald-600 text-white font-medium rounded-tr-sm shadow-emerald-500/10'
                          }`}
                        >
                          {/* Markdown formatted text output */}
                          <div className="whitespace-pre-wrap space-y-1">
                            {msg.content}
                          </div>

                          {/* Inline Recommended Adventure Cards */}
                          {msg.adventures && msg.adventures.length > 0 && (
                            <div className="mt-3 space-y-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                                Matched Expeditions
                              </span>
                              <div className="space-y-1.5">
                                {msg.adventures.map((adv) => (
                                  <div
                                    key={adv.id}
                                    className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-2"
                                  >
                                    <div className="min-w-0">
                                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate text-[11px]">
                                        {adv.name}
                                      </p>
                                      <p className="text-[10px] text-slate-400 truncate">
                                        {adv.destination} • {adv.duration}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-1.5 shrink-0">
                                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">
                                        ₹{adv.price?.toLocaleString('en-IN')}
                                      </span>
                                      <Link
                                        to={`/adventure/${adv.id}`}
                                        className="p-1 rounded bg-emerald-500 text-white hover:bg-emerald-600"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Quick suggested follow-up prompts */}
                          {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                            <div className="mt-2.5 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 flex flex-wrap gap-1">
                              {msg.suggestedActions.map((action, i) => (
                                <button
                                  key={i}
                                  onClick={() => handlePromptClick(action)}
                                  className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-medium transition-colors"
                                >
                                  {action} →
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {/* AI Typing Indicator */}
                  {isLoading && (
                    <div className="flex gap-2.5 items-center text-xs text-slate-400">
                      <div className="w-7 h-7 rounded-xl bg-emerald-500/20 text-emerald-600 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 animate-spin" />
                      </div>
                      <div className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 ml-1.5">
                          Formulating expedition advice...
                        </span>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* 4. Chat Input & Quick Suggestion Prompts (Only for Chat Tab) */}
            {activeTab === 'chat' && (
              <div className="p-3 bg-slate-50 dark:bg-slate-950/80 border-t border-slate-200 dark:border-slate-800 shrink-0 space-y-2">
                {/* Quick Prompts Carousel */}
                <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                  {QUICK_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => handlePromptClick(prompt)}
                      className="px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-emerald-500 hover:text-emerald-500 text-[10px] font-medium whitespace-nowrap transition-colors"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>

                {/* Input Field */}
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about treks, budget in ₹, packing, or safety..."
                    className="w-full pl-4 pr-11 py-2.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-emerald-500 outline-none text-xs text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  />
                  <button
                    type="submit"
                    disabled={!inputVal.trim() || isLoading}
                    className="absolute right-1.5 p-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white disabled:opacity-40 hover:from-emerald-600 hover:to-teal-700 transition-all shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatWidget;

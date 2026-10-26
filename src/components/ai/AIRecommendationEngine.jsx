import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  IndianRupee, 
  ExternalLink, 
  MessageSquare, 
  Heart,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';
import { useAI } from '../../context/AIContext';

const SEASONS = ['All', 'Summer', 'Monsoon', 'Autumn', 'Winter'];
const GROUP_TYPES = ['All', 'Solo', 'Couples', 'Friends', 'Family', 'Corporate'];
const DIFFICULTIES = ['All', 'Easy', 'Moderate', 'Challenging', 'Extreme'];

const AIRecommendationEngine = () => {
  const { openAssistant, sendMessage } = useAI();
  const [budget, setBudget] = useState(25000);
  const [season, setSeason] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [groupType, setGroupType] = useState('All');
  const [activeTab, setActiveTab] = useState('forYou'); // 'forYou' | 'filter'

  // Personalized recommendations from wishlist and bookings
  const personalized = aiService.getPersonalizedRecommendations();
  // Filtered recommendations
  const filteredRecommendations = aiService.recommendAdventures({
    budget,
    season,
    difficulty,
    groupType
  });

  const handleAskAboutAdventure = (adv) => {
    openAssistant('chat', `Tell me more about ${adv.name} including itinerary, fitness preparation, and total cost.`);
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10 border border-emerald-500/20 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI Destination & Expedition Matching Engine</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Machine-curated recommendations based on your personal travel patterns, wishlist, seasonal climate, and group dynamics.
        </p>
      </div>

      {/* View Switcher Tabs */}
      <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('forYou')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'forYou'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Recommended For You</span>
        </button>
        <button
          onClick={() => setActiveTab('filter')}
          className={`flex-1 py-1.5 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'filter'
              ? 'bg-white dark:bg-slate-700 text-emerald-600 dark:text-emerald-400 shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
          }`}
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Smart Match Filters</span>
        </button>
      </div>

      {/* Match Filters Drawer when active */}
      {activeTab === 'filter' && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 text-xs"
        >
          {/* Budget Slider */}
          <div>
            <div className="flex justify-between font-semibold mb-1">
              <span>Maximum Budget:</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                ₹{budget.toLocaleString('en-IN')}
              </span>
            </div>
            <input
              type="range"
              min="2000"
              max="50000"
              step="1000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
          </div>

          {/* Group Type */}
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
              Who is Traveling?
            </label>
            <div className="flex flex-wrap gap-1.5">
              {GROUP_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setGroupType(type)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    groupType === type
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Season & Difficulty in grid */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Season
              </label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 outline-none"
              >
                {SEASONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Difficulty
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 outline-none"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Cards List */}
      <div className="space-y-3">
        {(activeTab === 'forYou' ? personalized : filteredRecommendations).map((adv) => (
          <div
            key={adv.id}
            className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:shadow-md transition-all flex flex-col gap-2.5"
          >
            {/* Top row: Badge & Price */}
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px]">
                <Sparkles className="w-3 h-3" />
                <span>{adv.aiReasonBadge || adv.aiBadge || 'AI Top Match'}</span>
              </span>
              <span className="font-black text-slate-900 dark:text-white text-sm">
                ₹{adv.price?.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Adventure details */}
            <div>
              <h5 className="font-bold text-xs text-slate-900 dark:text-slate-100 line-clamp-1">
                {adv.name}
              </h5>
              <div className="flex items-center gap-3 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-[120px]">{adv.destination}</span>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  <span>{adv.duration}</span>
                </span>
                <span className="flex items-center gap-0.5 text-amber-500 font-bold ml-auto">
                  <Star className="w-3 h-3 fill-amber-500" />
                  <span>{adv.rating || 4.9}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
              <button
                onClick={() => handleAskAboutAdventure(adv)}
                className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-emerald-500"
              >
                <MessageSquare className="w-3 h-3" />
                <span>Ask AI Guide</span>
              </button>
              <Link
                to={`/adventure/${adv.id}`}
                className="ml-auto flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-[11px] transition-colors"
              >
                <span>Explore</span>
                <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}

        {activeTab === 'filter' && filteredRecommendations.length === 0 && (
          <div className="p-6 text-center text-xs text-slate-500">
            No expeditions found matching this exact filter combination. Try increasing the budget or selecting "All" seasons.
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendationEngine;

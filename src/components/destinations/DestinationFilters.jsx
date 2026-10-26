import React, { useState } from 'react';
import { 
  Filter, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Sparkles,
  SlidersHorizontal,
  X
} from 'lucide-react';

const CATEGORIES = [
  'Trekking',
  'Camping',
  'River Rafting',
  'Paragliding',
  'Scuba Diving',
  'Mountain Biking',
  'Rock Climbing',
  'Wildlife Safari'
];

const DIFFICULTIES = ['Easy', 'Moderate', 'Hard'];

const DURATIONS = ['1 Day', 'Weekend', '3-5 Days', '1 Week'];

const RATINGS = [
  { label: '5.0 Stars', value: 5.0 },
  { label: '4.5+ Stars', value: 4.5 },
  { label: '4.0+ Stars', value: 4.0 }
];

const SEASONS = ['Summer', 'Winter', 'Monsoon', 'Autumn', 'Spring'];

const DestinationFilters = ({
  filters,
  onFilterChange,
  onResetFilters,
  onApplyFilters,
  totalResults = 0,
  isMobileModal = false,
  onCloseMobileModal
}) => {
  // Collapsible accordion section toggles
  const [collapsedSections, setCollapsedSections] = useState({
    adventureType: false,
    difficulty: false,
    price: false,
    duration: false,
    rating: false,
    season: false,
  });

  const toggleSection = (section) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryToggle = (cat) => {
    const current = filters.categories || [];
    const updated = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onFilterChange('categories', updated);
  };

  const handleDifficultyToggle = (diff) => {
    const current = filters.difficulties || [];
    const updated = current.includes(diff)
      ? current.filter((d) => d !== diff)
      : [...current, diff];
    onFilterChange('difficulties', updated);
  };

  const handleDurationToggle = (dur) => {
    const current = filters.durations || [];
    const updated = current.includes(dur)
      ? current.filter((d) => d !== dur)
      : [...current, dur];
    onFilterChange('durations', updated);
  };

  const handleSeasonToggle = (season) => {
    const current = filters.seasons || [];
    const updated = current.includes(season)
      ? current.filter((s) => s !== season)
      : [...current, season];
    onFilterChange('seasons', updated);
  };

  const content = (
    <div className="space-y-6">
      {/* Header with Title and Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
            Filters
          </h3>
          <span className="text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
            {totalResults} Found
          </span>
        </div>

        <button
          type="button"
          onClick={onResetFilters}
          className="text-xs font-bold text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 flex items-center gap-1 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* 1. Price Range Slider */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => toggleSection('price')}
          className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 cursor-pointer"
        >
          <span>Max Budget</span>
          {collapsedSections.price ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {!collapsedSections.price && (
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-extrabold text-blue-600 dark:text-blue-400">
              <span>₹2,000</span>
              <span className="text-base font-black text-slate-900 dark:text-white">₹{filters.maxPrice?.toLocaleString()}</span>
              <span>₹30,000</span>
            </div>
            <input
              type="range"
              min="2000"
              max="30000"
              step="1000"
              value={filters.maxPrice || 30000}
              onChange={(e) => onFilterChange('maxPrice', Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-semibold">
              <span>Under ₹{filters.maxPrice?.toLocaleString()} per person</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Adventure Type */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => toggleSection('adventureType')}
          className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 cursor-pointer"
        >
          <span>Adventure Type</span>
          {collapsedSections.adventureType ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {!collapsedSections.adventureType && (
          <div className="space-y-2">
            {CATEGORIES.map((cat) => {
              const isChecked = filters.categories?.includes(cat);
              return (
                <label
                  key={cat}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 dark:bg-slate-800 cursor-pointer"
                  />
                  <span>{cat}</span>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Difficulty */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => toggleSection('difficulty')}
          className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 cursor-pointer"
        >
          <span>Difficulty</span>
          {collapsedSections.difficulty ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {!collapsedSections.difficulty && (
          <div className="grid grid-cols-3 gap-2">
            {DIFFICULTIES.map((diff) => {
              const active = filters.difficulties?.includes(diff);
              return (
                <button
                  type="button"
                  key={diff}
                  onClick={() => handleDifficultyToggle(diff)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {diff}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Duration */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => toggleSection('duration')}
          className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 cursor-pointer"
        >
          <span>Duration</span>
          {collapsedSections.duration ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {!collapsedSections.duration && (
          <div className="grid grid-cols-2 gap-2">
            {DURATIONS.map((dur) => {
              const active = filters.durations?.includes(dur);
              return (
                <button
                  type="button"
                  key={dur}
                  onClick={() => handleDurationToggle(dur)}
                  className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                    active
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {dur}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Rating */}
      <div className="pb-5 border-b border-slate-200 dark:border-slate-800">
        <button
          type="button"
          onClick={() => toggleSection('rating')}
          className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 cursor-pointer"
        >
          <span>Rating</span>
          {collapsedSections.rating ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {!collapsedSections.rating && (
          <div className="space-y-2">
            {RATINGS.map((r) => {
              const active = filters.minRating === r.value;
              return (
                <button
                  type="button"
                  key={r.label}
                  onClick={() => onFilterChange('minRating', active ? 0 : r.value)}
                  className={`w-full text-left py-1.5 px-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-between ${
                    active
                      ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{r.label}</span>
                  {active && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Best Season */}
      <div className="pb-5">
        <button
          type="button"
          onClick={() => toggleSection('season')}
          className="w-full flex items-center justify-between text-left font-bold text-sm text-slate-900 dark:text-slate-100 mb-3 cursor-pointer"
        >
          <span>Best Season</span>
          {collapsedSections.season ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {!collapsedSections.season && (
          <div className="flex flex-wrap gap-1.5">
            {SEASONS.map((season) => {
              const active = filters.seasons?.includes(season);
              return (
                <button
                  type="button"
                  key={season}
                  onClick={() => handleSeasonToggle(season)}
                  className={`py-1 px-3 rounded-full text-xs font-bold transition-all border ${
                    active
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {season}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex gap-2">
        <button
          type="button"
          onClick={onApplyFilters}
          className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white shadow-md active:scale-95 transition-transform"
        >
          Apply Filters
        </button>
        <button
          type="button"
          onClick={onResetFilters}
          className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );

  // If used in mobile drawer/modal
  if (isMobileModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white">
              Filter Adventures
            </h3>
            <button
              onClick={onCloseMobileModal}
              className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {content}
        </div>
      </div>
    );
  }

  // Regular Desktop sidebar
  return (
    <aside className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-6 shadow-sm">
      {content}
    </aside>
  );
};

export default DestinationFilters;

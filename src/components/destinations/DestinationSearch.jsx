import React from 'react';
import { 
  Search, 
  MapPin, 
  Compass, 
  Clock, 
  DollarSign, 
  Gauge 
} from 'lucide-react';

const DestinationSearch = ({
  searchDestination,
  setSearchDestination,
  searchType,
  setSearchType,
  searchDifficulty,
  setSearchDifficulty,
  searchBudget,
  setSearchBudget,
  searchDuration,
  setSearchDuration,
  onSearchSubmit
}) => {
  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-2xl border border-slate-200/90 dark:border-slate-800 text-left">
      <form onSubmit={onSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-center">
        {/* 1. Destination */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
            Destination
          </label>
          <div className="flex items-center gap-2 mt-1">
            <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <input
              type="text"
              value={searchDestination}
              onChange={(e) => setSearchDestination(e.target.value)}
              placeholder="Where to? (e.g. Manali, Goa)"
              className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none"
            />
          </div>
        </div>

        {/* 2. Adventure Type */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
            Adventure Type
          </label>
          <div className="flex items-center gap-2 mt-1">
            <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">All Types</option>
              <option value="Trekking" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🏔 Trekking</option>
              <option value="Camping" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🏕 Camping</option>
              <option value="River Rafting" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🚣 River Rafting</option>
              <option value="Paragliding" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🪂 Paragliding</option>
              <option value="Scuba Diving" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🤿 Scuba Diving</option>
              <option value="Mountain Biking" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🚵 Mountain Biking</option>
              <option value="Rock Climbing" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🧗 Rock Climbing</option>
              <option value="Wildlife Safari" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">🦁 Wildlife Safari</option>
            </select>
          </div>
        </div>

        {/* 3. Difficulty */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
            Difficulty
          </label>
          <div className="flex items-center gap-2 mt-1">
            <Gauge className="w-4 h-4 text-amber-500 shrink-0" />
            <select
              value={searchDifficulty}
              onChange={(e) => setSearchDifficulty(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">All Levels</option>
              <option value="Easy" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Easy</option>
              <option value="Moderate" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Moderate</option>
              <option value="Hard" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Hard / Challenging</option>
            </select>
          </div>
        </div>

        {/* 4. Budget */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
            Budget
          </label>
          <div className="flex items-center gap-2 mt-1">
            <DollarSign className="w-4 h-4 text-emerald-500 shrink-0" />
            <select
              value={searchBudget}
              onChange={(e) => setSearchBudget(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Any Budget</option>
              <option value="5000" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Under ₹5,000</option>
              <option value="10000" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Under ₹10,000</option>
              <option value="20000" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Under ₹20,000</option>
              <option value="30000" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Under ₹30,000</option>
            </select>
          </div>
        </div>

        {/* 5. Duration */}
        <div className="p-3 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:border-blue-400 focus-within:border-[#2563EB] focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
          <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider">
            Duration
          </label>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4 text-blue-500 shrink-0" />
            <select
              value={searchDuration}
              onChange={(e) => setSearchDuration(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-[#0F172A] dark:text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Any Duration</option>
              <option value="1 Day" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">1 Day</option>
              <option value="Weekend" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">Weekend</option>
              <option value="3-5 Days" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">3-5 Days</option>
              <option value="1 Week" className="text-slate-900 bg-white dark:text-slate-100 dark:bg-slate-900">1 Week</option>
            </select>
          </div>
        </div>

        {/* 6. Search Button */}
        <div className="p-1 flex items-center justify-center">
          <button
            type="submit"
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#1E40AF] text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 active:scale-95 transition-all cursor-pointer px-6"
          >
            <Search className="w-4 h-4 stroke-[2.5]" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default DestinationSearch;

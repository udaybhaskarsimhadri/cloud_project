import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Compass, 
  MapPin, 
  Users, 
  Calendar, 
  IndianRupee, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Share2, 
  Bookmark, 
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiService } from '../../services/aiService';
import { useAI } from '../../context/AIContext';

const DESTINATIONS = [
  'Manali, Himachal Pradesh',
  'Leh Ladakh, UT of Ladakh',
  'Rishikesh, Uttarakhand',
  'Spiti Valley, Himachal Pradesh',
  'Goa Coastal Trails',
  'Coorg, Western Ghats',
  'Munnar, Kerala',
  'Bir Billing, Himachal Pradesh'
];

const ACTIVITIES = [
  'Trekking',
  'River Rafting',
  'Paragliding',
  'Camping',
  'Wildlife Safari',
  'Mountain Biking',
  'Scuba Diving'
];

const AITripPlanner = () => {
  const { refreshSavedPlans } = useAI();
  const [destination, setDestination] = useState(DESTINATIONS[0]);
  const [budget, setBudget] = useState(18000);
  const [travelers, setTravelers] = useState(2);
  const [duration, setDuration] = useState(5);
  const [difficulty, setDifficulty] = useState('Moderate');
  const [selectedActivities, setSelectedActivities] = useState(['Trekking', 'Camping']);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expandedDay, setExpandedDay] = useState(1);

  const toggleActivity = (act) => {
    setSelectedActivities((prev) =>
      prev.includes(act) ? prev.filter((a) => a !== act) : [...prev, act]
    );
  };

  const handleGenerate = async (e) => {
    e?.preventDefault();
    setIsGenerating(true);
    setCopied(false);
    setSaved(false);

    try {
      const plan = await aiService.generateTripPlan({
        destination,
        budget,
        travelers,
        duration,
        difficulty,
        activities: selectedActivities
      });
      setGeneratedPlan(plan);
      setExpandedDay(1);
      refreshSavedPlans();
    } catch (err) {
      console.error('Trip plan generation failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyItinerary = () => {
    if (!generatedPlan) return;
    const text = `AdventureX AI Trip Plan: ${generatedPlan.destination}\nDuration: ${generatedPlan.duration}\nTravelers: ${generatedPlan.travelers}\nTotal Budget: ₹${generatedPlan.budget?.toLocaleString('en-IN')}\n\n` +
      generatedPlan.itinerary.map((d) => `Day ${d.day}: ${d.title}\nElevation: ${d.elevation}\nStay: ${d.stay}\nMeals: ${d.meals}\n`).join('\n');
    
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-cyan-500/10 border border-emerald-500/20 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI Expedition Itinerary Generator</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Tell our AI your destination, group size, and budget in ₹. We'll craft a customized day-by-day expedition schedule with safety protocols.
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleGenerate} className="space-y-4 text-xs">
        {/* Destination */}
        <div>
          <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
            Destination / Region
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 text-xs"
            >
              {DESTINATIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget (₹) & Duration (Days) */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
              Total Budget (₹ INR)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                min="3000"
                step="1000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 text-xs"
              />
            </div>
            <span className="text-[10px] text-slate-400">₹{(budget / travelers).toLocaleString('en-IN', { maximumFractionDigits: 0 })} per traveler</span>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
              Duration
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 text-xs"
              >
                {[3, 4, 5, 6, 7, 8, 10, 12].map((num) => (
                  <option key={num} value={num}>
                    {num} Days / {num - 1} Nights
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Travelers & Difficulty */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
              Travelers
            </label>
            <div className="relative">
              <Users className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <select
                value={travelers}
                onChange={(e) => setTravelers(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 text-xs"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Solo Adventurer' : 'Travelers'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-200">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100 text-xs"
            >
              <option value="Easy">Easy (Beginner / Relaxed)</option>
              <option value="Moderate">Moderate (Active Trail)</option>
              <option value="Challenging">Challenging (High Altitude)</option>
              <option value="Extreme">Extreme (Expedition Grade)</option>
            </select>
          </div>
        </div>

        {/* Preferred Activities */}
        <div>
          <label className="block font-semibold mb-1.5 text-slate-700 dark:text-slate-200">
            Preferred Activities
          </label>
          <div className="flex flex-wrap gap-1.5">
            {ACTIVITIES.map((act) => {
              const active = selectedActivities.includes(act);
              return (
                <button
                  type="button"
                  key={act}
                  onClick={() => toggleActivity(act)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all ${
                    active
                      ? 'bg-emerald-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {act}
                </button>
              );
            })}
          </div>
        </div>

        {/* Generate Button */}
        <button
          type="submit"
          disabled={isGenerating}
          className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Terrain & Calculating Budget...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate AI Expedition Itinerary</span>
            </>
          )}
        </button>
      </form>

      {/* Generated Itinerary Display */}
      {generatedPlan && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 pt-2 border-t border-slate-200 dark:border-slate-800"
        >
          {/* Plan Meta Banner */}
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Custom AI Expedition
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  {generatedPlan.destination}
                </h4>
              </div>
              <div className="text-right">
                <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                  ₹{generatedPlan.budget?.toLocaleString('en-IN')}
                </span>
                <p className="text-[10px] text-slate-500">
                  {generatedPlan.duration} • {generatedPlan.travelers} Pax
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-[11px]">
              <button
                onClick={handleCopyItinerary}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 font-medium transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Copied to Clipboard!' : 'Share Itinerary'}</span>
              </button>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium ml-auto flex items-center gap-1 text-[11px]">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Saved locally</span>
              </span>
            </div>
          </div>

          {/* Budget Breakdown Overview */}
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 p-3 rounded-xl text-xs space-y-2">
            <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
              <span>Estimated Cost Breakdown</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-black">
                ₹{generatedPlan.budgetBreakdown?.totalPerPerson?.toLocaleString('en-IN')} / person
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
              <div>• Adventure & Guides: ₹{generatedPlan.budgetBreakdown?.adventurePackage?.toLocaleString('en-IN')}</div>
              <div>• Transit & Transfers: ₹{generatedPlan.budgetBreakdown?.transportation?.toLocaleString('en-IN')}</div>
              <div>• Basecamp Lodging: ₹{generatedPlan.budgetBreakdown?.accommodations?.toLocaleString('en-IN')}</div>
              <div>• Meals & Trail Food: ₹{generatedPlan.budgetBreakdown?.mealsAndSnacks?.toLocaleString('en-IN')}</div>
              <div>• Gear Rental: ₹{generatedPlan.budgetBreakdown?.gearRentals?.toLocaleString('en-IN')}</div>
              <div>• Medical Buffer: ₹{generatedPlan.budgetBreakdown?.emergencyBuffer?.toLocaleString('en-IN')}</div>
            </div>
          </div>

          {/* Day by Day Accordion */}
          <div className="space-y-2">
            <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Day-by-Day Expedition Schedule
            </h5>
            {generatedPlan.itinerary?.map((day) => {
              const isExpanded = expandedDay === day.day;
              return (
                <div
                  key={day.day}
                  className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-800/60 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedDay(isExpanded ? null : day.day)}
                    className="w-full px-3 py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700/50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black text-xs flex items-center justify-center shrink-0">
                        {day.day}
                      </span>
                      <span className="font-semibold text-xs text-slate-800 dark:text-slate-100">
                        {day.title}
                      </span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-3 pb-3 text-[11px] text-slate-600 dark:text-slate-300 space-y-2 border-t border-slate-100 dark:border-slate-700/50 pt-2"
                      >
                        <div className="flex items-center gap-4 text-[10px] text-slate-400">
                          <span>⛰️ Elevation: {day.elevation}</span>
                          <span>⛺ Stay: {day.stay}</span>
                        </div>
                        <ul className="list-disc list-inside space-y-1">
                          {day.highlights?.map((h, idx) => (
                            <li key={idx}>{h}</li>
                          ))}
                        </ul>
                        <div className="text-[10px] bg-slate-50 dark:bg-slate-700/50 px-2 py-1 rounded text-slate-500 dark:text-slate-300">
                          🍴 {day.meals}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Matched Adventure Direct Booking */}
          {generatedPlan.matchedAdventures?.length > 0 && (
            <div className="pt-2 space-y-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Matched Adventure Packages
              </span>
              <div className="space-y-2">
                {generatedPlan.matchedAdventures.map((adv) => (
                  <div
                    key={adv.id}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0">
                      <p className="font-bold truncate text-slate-800 dark:text-slate-100">
                        {adv.name}
                      </p>
                      <p className="text-[10px] text-slate-500 truncate">
                        {adv.destination} • {adv.duration}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ₹{adv.price?.toLocaleString('en-IN')}
                      </span>
                      <Link
                        to={`/adventure/${adv.id}`}
                        className="p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white transition-colors"
                        title="View details"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default AITripPlanner;

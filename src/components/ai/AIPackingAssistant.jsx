import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckSquare, 
  Square, 
  Sparkles, 
  RotateCcw, 
  Share2, 
  Check, 
  Mountain, 
  Tent, 
  Waves, 
  Sun, 
  Snowflake, 
  Compass,
  CheckCircle2
} from 'lucide-react';
import { aiService } from '../../services/aiService';

const ACTIVITIES = [
  { id: 'Trekking', label: 'Trekking', icon: Mountain },
  { id: 'Camping', label: 'Camping', icon: Tent },
  { id: 'Rafting', label: 'Rafting', icon: Waves },
  { id: 'Desert Safari', label: 'Desert Safari', icon: Sun },
  { id: 'Snow Expedition', label: 'Snow Expedition', icon: Snowflake },
  { id: 'Wildlife Safari', label: 'Wildlife Safari', icon: Compass }
];

const AIPackingAssistant = () => {
  const [selectedActivity, setSelectedActivity] = useState('Trekking');
  const [packedItems, setPackedItems] = useState({});
  const [copied, setCopied] = useState(false);

  const packingData = aiService.getPackingList(selectedActivity);

  // Flatten all items to compute stats
  const allItems = packingData.categories?.flatMap((c) => c.items) || [];
  const packedCount = allItems.filter((item) => packedItems[`${selectedActivity}-${item}`]).length;
  const progressPercent = allItems.length > 0 ? Math.round((packedCount / allItems.length) * 100) : 0;

  const toggleItem = (item) => {
    const key = `${selectedActivity}-${item}`;
    setPackedItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const checkAll = () => {
    const updated = { ...packedItems };
    allItems.forEach((item) => {
      updated[`${selectedActivity}-${item}`] = true;
    });
    setPackedItems(updated);
  };

  const resetAll = () => {
    const updated = { ...packedItems };
    allItems.forEach((item) => {
      delete updated[`${selectedActivity}-${item}`];
    });
    setPackedItems(updated);
  };

  const handleShare = () => {
    const lines = [`AdventureX AI Packing Checklist: ${packingData.title}\n`];
    packingData.categories?.forEach((cat) => {
      lines.push(`\n[${cat.name}]`);
      cat.items.forEach((item) => {
        const isPacked = packedItems[`${selectedActivity}-${item}`];
        lines.push(`${isPacked ? '[x]' : '[ ]'} ${item}`);
      });
    });
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 border border-purple-500/20 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>AI Expedition Gear & Packing Assistant</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Select your expedition activity. Our AI compiles a field-tested, multi-layer packing list covering technical gear, altitude clothing, and safety essentials.
        </p>
      </div>

      {/* Activity Selector Pills */}
      <div>
        <label className="block text-xs font-semibold mb-2 text-slate-700 dark:text-slate-200">
          Select Adventure Category
        </label>
        <div className="grid grid-cols-3 gap-2">
          {ACTIVITIES.map((act) => {
            const Icon = act.icon;
            const isSelected = selectedActivity === act.id;
            return (
              <button
                key={act.id}
                type="button"
                onClick={() => setSelectedActivity(act.id)}
                className={`flex flex-col items-center justify-center p-2.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md scale-[1.02]'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-300'
                }`}
              >
                <Icon className="w-4 h-4 mb-1" />
                <span className="text-[11px] text-center">{act.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Packing Progress Meter */}
      <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-800 dark:text-slate-200">
            {packingData.title}
          </span>
          <span className="font-black text-purple-600 dark:text-purple-400">
            {packedCount} / {allItems.length} Packed ({progressPercent}%)
          </span>
        </div>
        <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-purple-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1 text-[11px]">
          <div className="flex items-center gap-2">
            <button
              onClick={checkAll}
              className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
            >
              Check All
            </button>
            <span className="text-slate-400">•</span>
            <button
              onClick={resetAll}
              className="text-slate-500 dark:text-slate-400 font-semibold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-purple-600 font-semibold"
          >
            <Share2 className="w-3 h-3" />
            <span>{copied ? 'Copied!' : 'Copy List'}</span>
          </button>
        </div>
      </div>

      {/* Categorized Checklists */}
      <div className="space-y-4">
        {packingData.categories?.map((cat) => (
          <div key={cat.name} className="space-y-1.5">
            <h5 className="text-[11px] font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              {cat.name}
            </h5>
            <div className="space-y-1">
              {cat.items.map((item) => {
                const isPacked = Boolean(packedItems[`${selectedActivity}-${item}`]);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleItem(item)}
                    className={`w-full p-2.5 rounded-xl border text-left flex items-start gap-2.5 text-xs transition-colors ${
                      isPacked
                        ? 'bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800/40 text-purple-900 dark:text-purple-300'
                        : 'bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/40'
                    }`}
                  >
                    {isPacked ? (
                      <CheckSquare className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    )}
                    <span className={isPacked ? 'line-through opacity-75' : ''}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIPackingAssistant;

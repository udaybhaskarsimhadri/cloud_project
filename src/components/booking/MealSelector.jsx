import React from 'react';
import { motion } from 'framer-motion';
import { 
  Utensils, 
  Car, 
  ShieldCheck, 
  CheckCircle2, 
  Salad, 
  Drumstick, 
  Sparkles,
  Info
} from 'lucide-react';
import { MEAL_OPTIONS, TRANSPORT_OPTIONS, INSURANCE_OPTION } from '../../data/bookingData';

const MEAL_ICONS = {
  'meal-veg': Salad,
  'meal-nonveg': Drumstick,
  'meal-vegan': Salad,
  'meal-standard': Utensils
};

const MealSelector = ({
  selectedMeal,
  onSelectMeal,
  selectedTransport,
  onSelectTransport,
  insuranceIncluded,
  onToggleInsurance,
  travelerCount = 1
}) => {
  return (
    <div className="space-y-8">
      {/* 1. Meal Preferences */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-lg sm:text-xl text-[#0F172A] dark:text-white">
              Expedition Meal Preference
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            All dietary plans are prepared by certified alpine expedition cooks and included in the trip rate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {MEAL_OPTIONS.map((meal) => {
            const isSelected = selectedMeal === meal.name;
            const Icon = MEAL_ICONS[meal.id] || Utensils;

            return (
              <motion.div
                key={meal.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => onSelectMeal(meal.name)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/25 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="font-bold text-sm text-[#0F172A] dark:text-white">
                      {meal.name}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {meal.tag}
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] dark:text-slate-400 line-clamp-2">
                    {meal.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Transportation */}
      <div className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Car className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-lg sm:text-xl text-[#0F172A] dark:text-white">
              Trailhead Transportation
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            Choose how you wish to reach the base camp staging point.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {TRANSPORT_OPTIONS.map((trans) => {
            const isSelected = selectedTransport === trans.name;

            return (
              <motion.div
                key={trans.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => onSelectTransport(trans.name)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/25 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  <Car className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="font-bold text-sm text-[#0F172A] dark:text-white">
                      {trans.name}
                    </h4>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                      {trans.price > 0 ? `+₹${trans.price.toLocaleString('en-IN')} / person` : 'Included'}
                    </span>
                  </div>
                  <p className="text-xs text-[#475569] dark:text-slate-400">
                    {trans.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 3. Travel Insurance (UI Placeholder) */}
      <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
        <div 
          onClick={onToggleInsurance}
          className={`p-5 rounded-2xl border cursor-pointer transition-all duration-200 flex items-start gap-4 ${
            insuranceIncluded
              ? 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-400 dark:border-emerald-700 ring-1 ring-emerald-500/20'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
            insuranceIncluded
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
          }`}>
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-extrabold text-sm sm:text-base text-[#0F172A] dark:text-white">
                {INSURANCE_OPTION.name}
              </h4>
              <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                +₹{INSURANCE_OPTION.price.toLocaleString('en-IN')} / traveler
              </span>
            </div>
            <p className="text-xs text-[#475569] dark:text-slate-400 mb-2">
              {INSURANCE_OPTION.coverage}
            </p>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 dark:text-emerald-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended by 96% of high-altitude trekkers</span>
            </div>
          </div>

          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 transition-colors ${
            insuranceIncluded
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
          }`}>
            {insuranceIncluded && <CheckCircle2 className="w-4 h-4" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealSelector;

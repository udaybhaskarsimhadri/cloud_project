import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Info, 
  Sparkles, 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  ShieldCheck, 
  Luggage, 
  Activity, 
  Globe2, 
  FileText, 
  HeartHandshake,
  Check,
  AlertTriangle,
  Flame,
  PhoneCall
} from 'lucide-react';

const AdventureInfo = ({ adventure }) => {
  const [checkedItems, setCheckedItems] = useState({});

  if (!adventure) return null;

  const toggleCheck = (idx) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const info = adventure.adventureInfo || {};
  const safety = adventure.safetyGuidelines || {};

  return (
    <div className="space-y-12">
      {/* 1. OVERVIEW & EXPERIENCE SUMMARY */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
              Expedition Overview
            </h3>
          </div>
          <p className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-300 italic">
            "{adventure.experienceSummary}"
          </p>
        </div>

        <p className="text-sm sm:text-base text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
          {adventure.description}
        </p>

        {/* Highlights */}
        {adventure.highlights && adventure.highlights.length > 0 && (
          <div className="p-6 rounded-3xl bg-blue-50/60 dark:bg-slate-900 border border-blue-200/80 dark:border-slate-800 space-y-3">
            <h4 className="font-bold text-sm uppercase tracking-wider text-[#0F172A] dark:text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>Key Expedition Highlights</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {adventure.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Suitable For & Age Recommendations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Ideal Suitable For:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {adventure.suitableFor?.map((item, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Recommended Age Bracket:
            </span>
            <div className="flex items-center gap-2 text-sm font-extrabold text-[#0F172A] dark:text-white">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>{adventure.ageRecommendations || '12 to 60 Years'}</span>
            </div>
            <p className="text-xs text-[#475569] dark:text-slate-400">
              Minors below 18 must be accompanied by an adult guardian.
            </p>
          </div>
        </div>
      </section>

      {/* 2. ADVENTURE INFORMATION CARDS */}
      <section className="space-y-4">
        <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
          Essential Adventure Information
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Difficulty Level</span>
            <p className="text-sm font-black text-[#0F172A] dark:text-white">{info.difficultyLevel || adventure.difficulty}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Total Duration</span>
            <p className="text-sm font-black text-[#0F172A] dark:text-white">{info.duration || adventure.duration}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Batch Size</span>
            <p className="text-sm font-black text-[#0F172A] dark:text-white">{info.groupSize || '8 - 14 Members'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Minimum Age</span>
            <p className="text-sm font-black text-[#0F172A] dark:text-white">{info.minimumAge || '12 Years'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Fitness Requirement</span>
            <p className="text-xs font-bold text-[#0F172A] dark:text-white line-clamp-2">{info.fitnessLevel || 'Moderate endurance'}</p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Languages Supported</span>
            <p className="text-sm font-black text-[#0F172A] dark:text-white">{info.languagesSupported?.join(', ') || 'English, Hindi'}</p>
          </div>
        </div>

        {/* Cancellation Policy Banner */}
        <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3">
          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#0F172A] dark:text-white">Cancellation & Rescheduling Policy</h4>
            <p className="text-xs text-[#475569] dark:text-slate-300 mt-0.5 leading-relaxed">
              {info.cancellationPolicy || '100% refund up to 15 days before departure. Free rescheduling in the event of adverse weather warnings.'}
            </p>
          </div>
        </div>
      </section>

      {/* 3. WHAT'S INCLUDED & NOT INCLUDED */}
      <section className="space-y-4">
        <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
          Inclusions & Exclusions
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* What's Included */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-extrabold text-base">
              <CheckCircle2 className="w-5 h-5" />
              <span>What's Included</span>
            </div>
            <ul className="space-y-2.5">
              {adventure.whatsIncluded?.map((inc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Included */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/40 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-extrabold text-base">
              <XCircle className="w-5 h-5" />
              <span>Not Included</span>
            </div>
            <ul className="space-y-2.5">
              {adventure.notIncluded?.map((exc, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. WHAT TO BRING (INTERACTIVE CHECKLIST) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Luggage className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
                What to Bring Checklist
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
              Check off your expedition pack as you organize your bag.
            </p>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {adventure.whatToBring?.map((item, idx) => {
              const isChecked = !!checkedItems[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between select-none ${
                    isChecked
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-semibold ${isChecked ? 'line-through text-slate-500' : ''}`}>
                    {item}
                  </span>
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 ml-3 transition-colors ${
                    isChecked ? 'bg-blue-600 text-white' : 'border border-slate-300 dark:border-slate-600'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. SAFETY GUIDELINES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-amber-500" />
          <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
            Safety & Field Guidelines
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
              Medical Advice & Acclimatization
            </span>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
              {safety.medicalAdvice || 'Keep guides informed of any altitude discomfort. Carry personal emergency medications.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">
              Certified Safety Gear Standards
            </span>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
              {safety.safetyEquipment || 'CE/UIAA certified safety ropes, helmets, and oxygen reserves maintained on site.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
              Weather & Trail Precautions
            </span>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
              {safety.weatherPrecautions || 'Expedition lead guides hold authority to modify route or camp location based on real-time alerts.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 block">
              Emergency Satellite Contacts
            </span>
            <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed font-normal">
              {safety.emergencyContacts || '24x7 SOS Dispatch Hotline: 1800-112-999'}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdventureInfo;

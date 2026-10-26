import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Sparkles, 
  AlertTriangle, 
  HeartPulse, 
  CloudRain, 
  FileCheck2, 
  PhoneCall, 
  Thermometer, 
  Activity,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { aiService } from '../../services/aiService';

const AISafetyAssistant = () => {
  const safetyData = aiService.getSafetyGuide();
  const [activeSection, setActiveSection] = useState('altitude'); // 'altitude' | 'weather' | 'kit' | 'health' | 'docs'

  return (
    <div className="space-y-6 text-slate-800 dark:text-slate-100">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-emerald-500/10 border border-rose-500/20 p-4 rounded-2xl">
        <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-sm">
          <ShieldAlert className="w-4 h-4" />
          <span>AI Wilderness Medical & Safety Assistant</span>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
          Real-time safety protocols, altitude acclimatization guidelines (AMS/HAPE), weather advisories, emergency kit recommendations, and required permits.
        </p>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-1.5">
        {[
          { id: 'altitude', label: 'Altitude (AMS)', icon: HeartPulse },
          { id: 'weather', label: 'Weather', icon: CloudRain },
          { id: 'kit', label: 'Emergency Kit', icon: Activity },
          { id: 'health', label: 'Health & Fitness', icon: Thermometer },
          { id: 'docs', label: 'Required Documents', icon: FileCheck2 },
          { id: 'sos', label: 'SOS Helplines', icon: PhoneCall }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSection(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Content Display based on activeSection */}
      <div className="space-y-4">
        {/* 1. Altitude Sickness (AMS) */}
        {activeSection === 'altitude' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 space-y-2">
              <h4 className="text-xs font-bold text-rose-800 dark:text-rose-300 flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-rose-600" />
                <span>{safetyData.altitudeSickness.title}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {safetyData.altitudeSickness.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-rose-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Red Flag Warning */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1.5">
              <div className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>Life-Threatening AMS Variants (HAPE / HACE)</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-700 dark:text-slate-300">
                {safetyData.altitudeSickness.emergencySigns.map((sign, idx) => (
                  <li key={idx}>{sign}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* 2. Weather Precautions */}
        {activeSection === 'weather' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/40 space-y-2">
              <h4 className="text-xs font-bold text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-blue-600" />
                <span>{safetyData.weatherPrecautions.title}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {safetyData.weatherPrecautions.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* 3. Emergency Kit */}
        {activeSection === 'kit' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800/40 space-y-2">
              <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                <span>{safetyData.emergencyKit.title}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {safetyData.emergencyKit.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* 4. Health & Fitness */}
        {activeSection === 'health' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/40 space-y-2">
              <h4 className="text-xs font-bold text-purple-800 dark:text-purple-300 flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-purple-600" />
                <span>Health Recommendations & Endurance Prep</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Cardiovascular Stamina: 30 minutes of jogging or cycling 4 times a week for 3–4 weeks prior to departure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Hydration Discipline: Minimum 4–5 liters of water daily at camp; carry ORS or glucose to prevent cramping.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Caloric Needs: High-altitude treks burn 3,500–4,500 calories/day. Consume carb-rich foods and dry fruits.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-500 font-bold">•</span>
                  <span>Alcohol & Smoking: Strictly abstain 48 hours before and during high-altitude ascents as they impair oxygen absorption.</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {/* 5. Required Documents */}
        {activeSection === 'docs' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/20 border border-teal-200 dark:border-teal-800/40 space-y-2">
              <h4 className="text-xs font-bold text-teal-800 dark:text-teal-300 flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-teal-600" />
                <span>{safetyData.requiredDocuments.title}</span>
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                {safetyData.requiredDocuments.documents.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* 6. SOS Helplines */}
        {activeSection === 'sos' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Emergency SOS Hotlines
            </h4>
            <div className="space-y-2">
              {safetyData.emergencyContacts.map((contact) => (
                <div
                  key={contact.title}
                  className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">
                      {contact.title}
                    </p>
                    <p className="text-[10px] text-slate-400">Available 24/7 across India</p>
                  </div>
                  <a
                    href={`tel:${contact.number}`}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-black text-xs transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>{contact.number}</span>
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AISafetyAssistant;

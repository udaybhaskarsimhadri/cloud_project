import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mountain, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  Package, 
  Coins, 
  Clock, 
  Users, 
  AlertCircle, 
  Check, 
  Image, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Save,
  FileCheck
} from 'lucide-react';

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=800&q=80'
];

const CATEGORIES = ['Trekking', 'River Rafting', 'Camping', 'Paragliding', 'Scuba Diving', 'Mountain Biking', 'Caving'];
const DIFFICULTIES = ['Easy', 'Moderate', 'Challenging', 'Extreme'];

const AdventureForm = ({ initialData, onSave, onCancel }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Trekking',
    destination: '',
    description: '',
    difficulty: 'Moderate',
    duration: '5 Days / 4 Nights',
    ageLimit: '12 to 58 Years',
    maxGroupSize: 16,
    availableSeats: 16,
    totalSeats: 16,
    price: 8999,
    originalPrice: 12500,
    availableDates: 'May 12 - May 16, 2026; Jun 02 - Jun 06, 2026',
    image: PRESET_IMAGES[0],
    equipmentIncluded: 'Sleeping tents, Thermal sleeping bags, High-altitude poles, Crampons',
    safetyGuidelines: 'Oxygen cylinders and satellite SOS beacons on high-altitude pass crossings.',
    cancellationPolicy: '100% refund up to 15 days prior. 50% refund between 7-14 days.',
    status: 'Active'
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        availableDates: Array.isArray(initialData.availableDates)
          ? initialData.availableDates.join('; ')
          : initialData.availableDates || '',
        equipmentIncluded: Array.isArray(initialData.equipmentIncluded)
          ? initialData.equipmentIncluded.join(', ')
          : initialData.equipmentIncluded || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleComplete = (targetStatus) => {
    const payload = {
      ...formData,
      status: targetStatus,
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      maxGroupSize: Number(formData.maxGroupSize),
      availableSeats: Number(formData.availableSeats || formData.maxGroupSize),
      totalSeats: Number(formData.totalSeats || formData.maxGroupSize),
      availableDates: formData.availableDates
        ? formData.availableDates.split(';').map((s) => s.trim()).filter(Boolean)
        : [],
      equipmentIncluded: formData.equipmentIncluded
        ? formData.equipmentIncluded.split(',').map((s) => s.trim()).filter(Boolean)
        : []
    };
    onSave(payload);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
      {/* Form Step Stepper Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {initialData?.id ? 'Edit Adventure Expedition' : 'Create New Adventure Expedition'}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white mt-0.5">
            Step {currentStep} of 3: {currentStep === 1 ? 'General Information' : currentStep === 2 ? 'Schedule, Capacity & Pricing' : 'Equipment, Safety & Policies'}
          </h3>
        </div>

        {/* Step indicator pills */}
        <div className="flex items-center gap-2">
          {[1, 2, 3].map((step) => (
            <button
              key={step}
              type="button"
              onClick={() => setCurrentStep(step)}
              className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                currentStep === step
                  ? 'bg-blue-600 text-white shadow-md'
                  : currentStep > step
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
              }`}
            >
              {currentStep > step ? '✓' : step}
            </button>
          ))}
        </div>
      </div>

      {/* STEP 1: GENERAL INFORMATION */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5 text-xs"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5 md:col-span-2">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Adventure Name *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Pin Parvati Pass High-Altitude Crossing"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Destination / Region *
              </label>
              <input
                type="text"
                name="destination"
                required
                value={formData.destination}
                onChange={handleChange}
                placeholder="e.g. Manali, Himachal Pradesh"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Difficulty Level *
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              >
                {DIFFICULTIES.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g. 5 Days / 4 Nights"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Expedition Description *
              </label>
              <textarea
                name="description"
                rows={3}
                required
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the terrain, elevation highlights, views, and overall trail experience..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Photo Selection */}
            <div className="space-y-2 md:col-span-2 pt-2">
              <label className="font-bold text-[#1E293B] dark:text-slate-200 block">
                Primary Showcase Photo (Select from high-res outdoor gallery)
              </label>
              <div className="flex flex-wrap gap-3">
                {PRESET_IMAGES.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt="Gallery preset"
                    onClick={() => setFormData({ ...formData, image: url })}
                    className={`w-20 h-14 rounded-xl object-cover cursor-pointer border-2 transition-transform hover:scale-105 ${
                      formData.image === url ? 'border-blue-600 ring-2 ring-blue-500/40' : 'border-transparent'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 2: DATES, CAPACITY & PRICING */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5 text-xs"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Base Price per Person (₹) *
              </label>
              <input
                type="number"
                name="price"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="8999"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Original / Strike Price (₹)
              </label>
              <input
                type="number"
                name="originalPrice"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="13500"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Maximum Group Size per Batch
              </label>
              <input
                type="number"
                name="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
                placeholder="16"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Recommended Age Limit
              </label>
              <input
                type="text"
                name="ageLimit"
                value={formData.ageLimit}
                onChange={handleChange}
                placeholder="e.g. 12 to 58 Years"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5 md:col-span-2">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Available Departure Windows (Semicolon ';' separated)
              </label>
              <input
                type="text"
                name="availableDates"
                value={formData.availableDates}
                onChange={handleChange}
                placeholder="May 12 - May 16, 2026; Jun 02 - Jun 06, 2026"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: EQUIPMENT, SAFETY & POLICIES */}
      {currentStep === 3 && (
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5 text-xs"
        >
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Equipment & Gear Included (Comma separated)
              </label>
              <input
                type="text"
                name="equipmentIncluded"
                value={formData.equipmentIncluded}
                onChange={handleChange}
                placeholder="Alpine tents, Sub-zero sleeping bags, Crampons, Helmet, Satellite SOS"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Safety Guidelines & Medical Protocols
              </label>
              <textarea
                name="safetyGuidelines"
                rows={2}
                value={formData.safetyGuidelines}
                onChange={handleChange}
                placeholder="High-altitude oxygen cylinders, wilderness first responders, and emergency evacuation protocols..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-[#1E293B] dark:text-slate-200">
                Cancellation & Refund Policy
              </label>
              <textarea
                name="cancellationPolicy"
                rows={2}
                value={formData.cancellationPolicy}
                onChange={handleChange}
                placeholder="100% refund up to 15 days prior. Weather rescheduling guaranteed without fees..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Form Navigation & Actions Footer */}
      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between flex-wrap gap-3">
        <div>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors"
          >
            Cancel
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-1.5 transition-colors"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <>
              {/* Save Draft Button */}
              <button
                type="button"
                onClick={() => handleComplete('Draft')}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 transition-colors"
              >
                <Save className="w-3.5 h-3.5 text-slate-500" />
                <span>Save Draft</span>
              </button>

              {/* Publish Adventure Button */}
              <button
                type="button"
                onClick={() => handleComplete('Active')}
                className="px-6 py-2.5 rounded-xl text-xs font-extrabold bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 flex items-center gap-1.5 transition-colors"
              >
                <FileCheck className="w-3.5 h-3.5" />
                <span>Publish Adventure</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdventureForm;

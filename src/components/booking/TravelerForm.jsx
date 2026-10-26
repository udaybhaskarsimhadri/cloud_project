import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  UserPlus, 
  Trash2, 
  User, 
  Mail, 
  Phone, 
  ShieldAlert, 
  FileText, 
  HeartPulse,
  Globe2,
  CheckCircle2
} from 'lucide-react';
import Button from '../common/Button';

const ID_TYPES = [
  'Passport',
  'Aadhaar Card',
  'Driver\'s License',
  'National Identity Card',
  'Voter ID'
];

const GENDERS = ['Male', 'Female', 'Non-Binary', 'Prefer not to say'];

const NATIONALITIES = [
  'Indian',
  'American',
  'British',
  'Canadian',
  'Australian',
  'German',
  'French',
  'Japanese',
  'Singaporean',
  'Other'
];

const TravelerForm = ({ 
  travelers, 
  onChangeTravelers,
  maxTravelers = 10 
}) => {
  const handleAddTraveler = () => {
    if (travelers.length >= maxTravelers) return;
    const newTraveler = {
      fullName: '',
      email: '',
      phone: '',
      age: '',
      gender: 'Male',
      nationality: 'Indian',
      idType: 'Passport',
      emergencyContact: '',
      medicalConditions: ''
    };
    onChangeTravelers([...travelers, newTraveler]);
  };

  const handleRemoveTraveler = (index) => {
    if (travelers.length <= 1) return;
    const updated = travelers.filter((_, i) => i !== index);
    onChangeTravelers(updated);
  };

  const handleFieldChange = (index, field, value) => {
    const updated = [...travelers];
    updated[index] = { ...updated[index], [field]: value };
    onChangeTravelers(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-extrabold text-xl sm:text-2xl text-[#0F172A] dark:text-white">
              Traveler Information
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-400 mt-1">
            Provide government verification and contact details for all participants.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddTraveler}
          disabled={travelers.length >= maxTravelers}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/60 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-colors shadow-sm disabled:opacity-50"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Traveler ({travelers.length}/{maxTravelers})</span>
        </button>
      </div>

      {/* Traveler Cards */}
      <div className="space-y-6">
        <AnimatePresence>
          {travelers.map((traveler, index) => {
            const isPrimary = index === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
              >
                {/* Header of Traveler Card */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
                      isPrimary 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}>
                      #{index + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-[#0F172A] dark:text-white flex items-center gap-2">
                        {isPrimary ? 'Primary Lead Traveler' : `Companion Traveler #${index + 1}`}
                        {isPrimary && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                            Booking Contact
                          </span>
                        )}
                      </h4>
                      <p className="text-xs text-[#64748B] dark:text-slate-400">
                        {isPrimary ? 'Main point of contact for permits & logistics' : 'Participant permit details'}
                      </p>
                    </div>
                  </div>

                  {!isPrimary && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTraveler(index)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors"
                      title="Remove companion"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Full Legal Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="As shown on official ID"
                        value={traveler.fullName}
                        onChange={(e) => handleFieldChange(index, 'fullName', e.target.value)}
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Email Address {isPrimary && <span className="text-rose-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required={isPrimary}
                        placeholder={isPrimary ? 'booking@example.com' : 'Optional companion email'}
                        value={traveler.email}
                        onChange={(e) => handleFieldChange(index, 'email', e.target.value)}
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Phone Number {isPrimary && <span className="text-rose-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        required={isPrimary}
                        placeholder="+91 98765 43210"
                        value={traveler.phone}
                        onChange={(e) => handleFieldChange(index, 'phone', e.target.value)}
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Age <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="10"
                      max="85"
                      placeholder="e.g. 26"
                      value={traveler.age}
                      onChange={(e) => handleFieldChange(index, 'age', e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Gender <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={traveler.gender}
                      onChange={(e) => handleFieldChange(index, 'gender', e.target.value)}
                      className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    >
                      {GENDERS.map((g) => (
                        <option key={g} value={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  {/* Nationality */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Nationality <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={traveler.nationality}
                        onChange={(e) => handleFieldChange(index, 'nationality', e.target.value)}
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      >
                        {NATIONALITIES.map((nat) => (
                          <option key={nat} value={nat}>{nat}</option>
                        ))}
                      </select>
                      <Globe2 className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* ID Type */}
                  <div>
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Government ID Type <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={traveler.idType}
                        onChange={(e) => handleFieldChange(index, 'idType', e.target.value)}
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      >
                        {ID_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Emergency Contact */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Emergency Contact Person & Phone {isPrimary && <span className="text-rose-500">*</span>}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required={isPrimary}
                        placeholder="e.g. Sarah Jenkins (Mother) - +1 555-0192"
                        value={traveler.emergencyContact}
                        onChange={(e) => handleFieldChange(index, 'emergencyContact', e.target.value)}
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                      <ShieldAlert className="w-4 h-4 text-amber-500 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>

                  {/* Medical Conditions */}
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-bold text-[#1E293B] dark:text-slate-300 mb-1.5">
                      Medical Conditions, Dietary Allergies, or High-Altitude Notes (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="e.g. Asthma, peanut allergy, heart sensitivity, vertigo, etc."
                        value={traveler.medicalConditions}
                        onChange={(e) => handleFieldChange(index, 'medicalConditions', e.target.value)}
                        className="w-full text-xs sm:text-sm pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                      />
                      <HeartPulse className="w-4 h-4 text-rose-500 absolute left-3 top-3 pointer-events-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TravelerForm;

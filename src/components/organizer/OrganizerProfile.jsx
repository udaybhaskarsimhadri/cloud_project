import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Save, 
  Check, 
  Camera, 
  Compass,
  Sparkles
} from 'lucide-react';

const CATEGORY_OPTIONS = ['Trekking', 'River Rafting', 'Camping', 'Paragliding', 'Scuba Diving', 'Mountain Biking', 'Caving'];

const OrganizerProfile = ({ profileData, onSave }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    organizerName: '',
    email: '',
    phone: '',
    businessAddress: '',
    yearsExperience: 10,
    certifications: '',
    adventureCategories: [],
    profilePicture: '',
    bio: ''
  });

  const [savedToast, setSavedToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (profileData) {
      setFormData({
        ...profileData,
        certifications: Array.isArray(profileData.certifications)
          ? profileData.certifications.join(', ')
          : profileData.certifications || '',
        adventureCategories: profileData.adventureCategories || []
      });
    }
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleCategory = (cat) => {
    setFormData((prev) => {
      const exists = prev.adventureCategories.includes(cat);
      const updated = exists
        ? prev.adventureCategories.filter((c) => c !== cat)
        : [...prev.adventureCategories, cat];
      return { ...prev, adventureCategories: updated };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formData,
      yearsExperience: Number(formData.yearsExperience),
      certifications: formData.certifications
        ? formData.certifications.split(',').map((s) => s.trim()).filter(Boolean)
        : []
    };

    setTimeout(() => {
      onSave(payload);
      setIsSaving(false);
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 3000);
    }, 500);
  };

  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="relative shrink-0">
          <img
            src={formData.profilePicture || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80'}
            alt={formData.organizerName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-emerald-500/20 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 p-1.5 rounded-xl bg-emerald-600 text-white shadow-md" title="Verified Tour Operator">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
              {formData.companyName || 'Expeditions Co.'}
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300">
              Verified Partner
            </span>
          </div>

          <p className="text-xs text-[#475569] dark:text-slate-400">
            Lead Guide: <span className="font-bold text-slate-800 dark:text-white">{formData.organizerName}</span> • {formData.yearsExperience} Years Mountain Experience
          </p>

          <p className="text-xs text-slate-500 italic pt-1 max-w-xl">
            "{formData.bio}"
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 text-xs font-bold">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Profile Saved!</span>
          </div>
        )}
      </div>

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="space-y-6 text-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Company Name */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Company / Agency Name *</span>
            </label>
            <input
              type="text"
              name="companyName"
              required
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Himalayan Ridge Expeditions"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Organizer Name */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>Organizer / Lead Guide Name *</span>
            </label>
            <input
              type="text"
              name="organizerName"
              required
              value={formData.organizerName}
              onChange={handleChange}
              placeholder="e.g. Vikramaditya Rathore"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>Business Email *</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="organizer@adventurex.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span>Direct Phone / Emergency Contact *</span>
            </label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98111 22334"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Business Address */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Registered Business Basecamp Address *</span>
            </label>
            <input
              type="text"
              name="businessAddress"
              required
              value={formData.businessAddress}
              onChange={handleChange}
              placeholder="Basecamp coordinates, Street, City, State, PIN"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Years of Experience */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200">
              Years of Outdoor & Guide Experience
            </label>
            <input
              type="number"
              name="yearsExperience"
              value={formData.yearsExperience}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Certifications */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Certifications (Comma separated)</span>
            </label>
            <input
              type="text"
              name="certifications"
              value={formData.certifications}
              onChange={handleChange}
              placeholder="IMF Mountain Leader, UIAGM Guide, Wilderness First Responder"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Adventure Categories Supported */}
        <div className="space-y-3 pt-2">
          <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600" />
            <span>Supported Adventure Categories</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map((cat) => {
              const isSelected = formData.adventureCategories.includes(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => toggleCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {isSelected ? `✓ ${cat}` : `+ ${cat}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? <span>Saving Changes...</span> : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrganizerProfile;

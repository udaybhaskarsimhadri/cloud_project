import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  ShieldAlert, 
  Compass, 
  Award, 
  Save, 
  Check, 
  Camera, 
  Sparkles,
  Heart
} from 'lucide-react';
import { dashboardService } from '../../services/dashboardService';

const ACTIVITY_OPTIONS = [
  'Trekking',
  'River Rafting',
  'Camping',
  'Scuba Diving',
  'Paragliding',
  'Mountain Biking',
  'Rock Climbing',
  'Caving'
];

const PRESET_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80'
];

const UserProfile = ({ onProfileSaved }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    gender: 'Male',
    dateOfBirth: '',
    nationality: 'Indian',
    address: '',
    emergencyContact: '',
    adventureExperience: 'Intermediate Mountaineer',
    preferredActivities: [],
    profilePicture: '',
    bio: ''
  });

  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);

  useEffect(() => {
    const profile = dashboardService.getProfile();
    setFormData(profile);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleActivity = (activity) => {
    setFormData((prev) => {
      const exists = prev.preferredActivities.includes(activity);
      const updated = exists
        ? prev.preferredActivities.filter((a) => a !== activity)
        : [...prev.preferredActivities, activity];
      return { ...prev, preferredActivities: updated };
    });
  };

  const handleSelectAvatar = (url) => {
    setFormData((prev) => ({ ...prev, profilePicture: url }));
    setShowAvatarPicker(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaving(true);

    setTimeout(() => {
      const updated = dashboardService.updateProfile(formData);
      setIsSaving(false);
      setIsSaved(true);
      if (onProfileSaved) onProfileSaved(updated);
      setTimeout(() => setIsSaved(false), 3000);
    }, 600);
  };

  return (
    <div className="p-5 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
      {/* Top Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
        {/* Profile Picture with picker */}
        <div className="relative group shrink-0">
          <img
            src={formData.profilePicture || PRESET_AVATARS[0]}
            alt={formData.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-lg"
          />
          <button
            type="button"
            onClick={() => setShowAvatarPicker(!showAvatarPicker)}
            className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-blue-600 text-white shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
            title="Change Avatar"
          >
            <Camera className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 text-center sm:text-left space-y-1.5">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl sm:text-2xl font-black text-[#0F172A] dark:text-white">
              {formData.fullName || 'Adventurer'}
            </h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Verified Explorer
            </span>
          </div>
          <p className="text-xs text-[#475569] dark:text-slate-400">
            {formData.email} • {formData.nationality}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 pt-1 max-w-xl italic">
            "{formData.bio || 'Conquering heights, rivers, and ridges across the globe.'}"
          </p>
        </div>

        {/* Quick Save Badge */}
        {isSaved && (
          <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Profile Saved!</span>
          </div>
        )}
      </div>

      {/* Preset Avatar Chooser Modal */}
      {showAvatarPicker && (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
            Choose an Explorer Avatar
          </span>
          <div className="flex flex-wrap gap-3">
            {PRESET_AVATARS.map((url, i) => (
              <img
                key={i}
                src={url}
                alt="Avatar preset"
                onClick={() => handleSelectAvatar(url)}
                className={`w-12 h-12 rounded-xl object-cover cursor-pointer hover:scale-110 transition-transform border-2 ${
                  formData.profilePicture === url ? 'border-blue-600 ring-2 ring-blue-500/40' : 'border-transparent'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Editable Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-500" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. Aarav Sharma"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-500" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-500" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Gender */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 block">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-500" />
              <span>Date of Birth</span>
            </label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Nationality */}
          <div className="space-y-1.5">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 block">
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              value={formData.nationality}
              onChange={handleChange}
              placeholder="e.g. Indian, British, American"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              <span>Residential Address</span>
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Street, City, State, PIN Code"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Emergency Contact */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>Emergency Contact Name & Phone</span>
            </label>
            <input
              type="text"
              name="emergencyContact"
              value={formData.emergencyContact}
              onChange={handleChange}
              placeholder="e.g. Rohit Sharma (+91 98765 00000) - Kin / Spouse"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Adventure Experience Level */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="font-bold text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Adventure & Trail Experience</span>
            </label>
            <select
              name="adventureExperience"
              value={formData.adventureExperience}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Beginner (Weekend trails & light camping)">Beginner (Weekend trails & light camping)</option>
              <option value="Intermediate Mountaineer (Completed 2-4 Himalayan passes)">Intermediate Mountaineer (Completed 2-4 Himalayan passes)</option>
              <option value="Advanced Alpine Expeditionist (High altitude 15,000+ ft)">Advanced Alpine Expeditionist (High altitude 15,000+ ft)</option>
              <option value="Certified Diver / Rapid Specialist">Certified Diver / Rapid Specialist</option>
            </select>
          </div>
        </div>

        {/* Preferred Activities Multi-Select Pills */}
        <div className="space-y-3 pt-2">
          <label className="font-bold text-xs text-[#1E293B] dark:text-slate-200 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Preferred Outdoor Activities</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {ACTIVITY_OPTIONS.map((activity) => {
              const isSelected = formData.preferredActivities.includes(activity);
              return (
                <button
                  key={activity}
                  type="button"
                  onClick={() => toggleActivity(activity)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/25'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isSelected ? `✓ ${activity}` : `+ ${activity}`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Save Changes Button */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-3 rounded-2xl text-xs sm:text-sm font-extrabold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isSaving ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfile;

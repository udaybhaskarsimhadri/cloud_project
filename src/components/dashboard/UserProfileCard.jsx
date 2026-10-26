import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  ShieldCheck, 
  Edit3, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const UserProfileCard = ({ profile, rewards }) => {
  if (!profile) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
        {/* Profile Avatar */}
        <div className="relative shrink-0">
          <img
            src={profile.profilePicture || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'}
            alt={profile.fullName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-blue-500/20 shadow-md"
          />
          <div className="absolute -bottom-1 -right-1 p-1 rounded-lg bg-emerald-500 text-white shadow" title="Active Explorer">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex-1 text-center sm:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h3 className="text-lg sm:text-xl font-black text-[#0F172A] dark:text-white">
                  {profile.fullName}
                </h3>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                  {rewards?.level || 'Alpine Explorer'}
                </span>
              </div>
              <p className="text-xs text-[#475569] dark:text-slate-400">
                {profile.email} • {profile.phone}
              </p>
            </div>

            <Link
              to="/profile"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer self-center sm:self-start"
            >
              <Edit3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Edit Profile</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
              <span className="truncate">{profile.address || profile.nationality}</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span className="truncate">{profile.adventureExperience}</span>
            </div>
          </div>

          {/* Activity Tags */}
          {profile.preferredActivities && profile.preferredActivities.length > 0 && (
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mr-1">Interests:</span>
              {profile.preferredActivities.map((act) => (
                <span
                  key={act}
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-800"
                >
                  {act}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfileCard;

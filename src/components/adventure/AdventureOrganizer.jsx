import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, 
  Star, 
  Award, 
  Clock, 
  Languages, 
  MessageSquare, 
  CheckCircle2, 
  X,
  Send,
  UserCheck
} from 'lucide-react';
import Button from '../common/Button';

const AdventureOrganizer = ({ organizer }) => {
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [inquiryText, setInquiryText] = useState('');
  const [sentMessage, setSentMessage] = useState(false);

  if (!organizer) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inquiryText.trim()) return;
    setSentMessage(true);
    setTimeout(() => {
      setSentMessage(false);
      setInquiryText('');
      setContactModalOpen(false);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
          Certified Organizer Profile
        </h3>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Profile Photo with verified badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden ring-4 ring-blue-500/20 shadow-md">
              <img
                src={organizer.photo}
                alt={organizer.name}
                className="w-full h-full object-cover"
              />
            </div>
            {organizer.verified && (
              <div 
                className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full shadow-md"
                title="Verified Adventure Organizer"
              >
                <ShieldCheck className="w-4 h-4" />
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-xl font-bold text-[#0F172A] dark:text-white">
                {organizer.name}
              </h4>
              {organizer.verified && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Partner</span>
                </span>
              )}
            </div>

            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
              {organizer.company}
            </p>

            <p className="text-xs text-[#475569] dark:text-slate-300 max-w-xl leading-relaxed">
              {organizer.about}
            </p>

            {/* Quick badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1 text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <strong className="text-[#0F172A] dark:text-white">{organizer.rating}</strong> Rating
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{organizer.completedTrips}+ Trips Conducted</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>Replies in {organizer.responseTime}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Action Button: Contact Placeholder */}
        <div className="w-full md:w-auto shrink-0">
          <Button
            variant="secondary"
            icon={MessageSquare}
            onClick={() => setContactModalOpen(true)}
            className="w-full sm:w-auto"
          >
            Contact Organizer
          </Button>
        </div>
      </div>

      {/* Contact Organizer Placeholder Modal */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button
                type="button"
                onClick={() => setContactModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <img
                  src={organizer.photo}
                  alt={organizer.name}
                  className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/30"
                />
                <div>
                  <h4 className="font-bold text-base text-[#0F172A] dark:text-white">
                    Ask {organizer.name}
                  </h4>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{organizer.company}</p>
                </div>
              </div>

              <p className="text-xs text-[#475569] dark:text-slate-300 mb-4 leading-relaxed font-normal">
                Have questions regarding upcoming trail conditions, custom group departures, or gear sizing? Send a direct message.
              </p>

              <form onSubmit={handleSendMessage} className="space-y-4">
                <textarea
                  rows={4}
                  required
                  value={inquiryText}
                  onChange={(e) => setInquiryText(e.target.value)}
                  placeholder="Type your question for the organizer here..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20"
                />

                {sentMessage ? (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Inquiry delivered! The organizer will respond to your email.</span>
                  </div>
                ) : (
                  <Button
                    variant="primary"
                    type="submit"
                    icon={Send}
                    fullWidth
                  >
                    Send Direct Message
                  </Button>
                )}
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventureOrganizer;

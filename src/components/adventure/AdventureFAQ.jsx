import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const AdventureFAQ = ({ faqs = [] }) => {
  const [openIdx, setOpenIdx] = useState(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-slate-800">
        <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="font-extrabold text-2xl text-[#0F172A] dark:text-white">
          Frequently Asked Questions
        </h3>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-xs"
            >
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
              >
                <span className="font-bold text-sm sm:text-base text-[#0F172A] dark:text-white">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-blue-600 dark:text-blue-400' : ''
                  }`}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/80 font-normal">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdventureFAQ;

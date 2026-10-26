import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  MessageSquare, 
  PhoneCall, 
  AlertTriangle, 
  ChevronDown, 
  Send, 
  CheckCircle2, 
  X,
  Headphones
} from 'lucide-react';

const FAQS = [
  {
    q: 'How does the cancellation and weather refund policy work?',
    a: 'We offer 100% full refund on bookings cancelled 15+ days prior to departure. In the event of adverse mountain weather or high-altitude route closures, we guarantee fee-free date rescheduling or full credits.'
  },
  {
    q: 'Where do I meet my trek leader and receive rental gear?',
    a: 'Exact GPS rendezvous coordinates and trek leader contact numbers are shared via SMS and email 48 hours prior to start. High-altitude gear is inspected and delivered directly at basecamp.'
  },
  {
    q: 'How are AdventureX reward points calculated and redeemed?',
    a: 'You earn 10 XP per ₹100 spent on confirmed expeditions. Reward points automatically unlock higher membership tiers, equipment rental credits, and early-access promo codes.'
  },
  {
    q: 'What should I do in case of high altitude sickness or emergency?',
    a: 'All our verified expeditions are covered by the AdventureX Medical Shield, equipped with oxygen cylinders, PAC chambers, and dedicated emergency satellite dispatch.'
  }
];

const HelpCenter = () => {
  const [openFaq, setOpenFaq] = useState(0);
  const [showChatModal, setShowChatModal] = useState(false);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueSubmitted, setIssueSubmitted] = useState(false);

  // Simulated Chat State
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Namaste! Welcome to AdventureX Expedition Support. How may we assist your journey today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'Thank you for reaching out! A verified high-altitude expedition coordinator has received your query and will assist you shortly.'
        }
      ]);
    }, 1000);
  };

  return (
    <div id="help" className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h3 className="text-base sm:text-lg font-extrabold text-[#0F172A] dark:text-white">
            Expedition Help & Support Center
          </h3>
        </div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
          24×7 Concierge Active
        </span>
      </div>

      {/* Support Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        {/* Live Chat */}
        <div 
          onClick={() => setShowChatModal(true)}
          className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 hover:border-blue-400 transition-all cursor-pointer space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
            <MessageSquare className="w-4 h-4" />
          </div>
          <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
            Live Support Chat
          </h4>
          <p className="text-xs text-[#475569] dark:text-slate-400">
            Chat instantly with mountain guides and safety coordinators.
          </p>
        </div>

        {/* Contact Support */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md">
            <PhoneCall className="w-4 h-4" />
          </div>
          <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
            Emergency Helpline
          </h4>
          <p className="text-xs text-[#475569] dark:text-slate-400">
            Toll-free 24×7 on-trail emergency dispatch: <span className="font-bold text-slate-800 dark:text-white">+91 1800-ADV-HELP</span>
          </p>
        </div>

        {/* Report Issue */}
        <div 
          onClick={() => setShowIssueModal(true)}
          className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 hover:border-amber-400 transition-all cursor-pointer space-y-2"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-md">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
            Report an Issue
          </h4>
          <p className="text-xs text-[#475569] dark:text-slate-400">
            Submit a ticket regarding booking modifications or logistics.
          </p>
        </div>
      </div>

      {/* FAQs Accordion */}
      <div className="space-y-3 pt-2">
        <h4 className="font-extrabold text-sm text-[#0F172A] dark:text-white">
          Frequently Asked Questions
        </h4>

        <div className="space-y-2">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-[#1E293B] dark:text-slate-200 hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-[#475569] dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/60 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Chat Modal (Placeholder) */}
      <AnimatePresence>
        {showChatModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md h-[500px] flex flex-col rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
            >
              {/* Chat Header */}
              <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Headphones className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm leading-tight">AdventureX Concierge</h4>
                    <span className="text-[10px] text-blue-100 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live Guide Online (Simulation)
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowChatModal(false)}
                  className="p-1 rounded-lg text-white hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 dark:bg-slate-950 text-xs">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700 shadow-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Type your question..."
                  className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Report Issue Modal */}
      <AnimatePresence>
        {showIssueModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-base text-[#0F172A] dark:text-white">
                  Report an Issue or Feedback
                </h4>
                <button onClick={() => setShowIssueModal(false)} className="text-slate-400">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {issueSubmitted ? (
                <div className="text-center py-6 space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <p className="font-bold text-sm text-slate-800 dark:text-white">Ticket Submitted Successfully</p>
                  <p className="text-xs text-slate-400">Reference ID: TKT-2026-8910. We will reply within 4 hours.</p>
                  <button
                    type="button"
                    onClick={() => { setShowIssueModal(false); setIssueSubmitted(false); }}
                    className="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 text-white"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIssueSubmitted(true); }} className="space-y-3 text-xs">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Issue Category</label>
                    <select className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                      <option>Expedition Schedule & Timing</option>
                      <option>Safety Gear & Rental Equipment</option>
                      <option>Refund or Cancellation</option>
                      <option>Platform Bug or Website Error</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description</label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Please describe what happened..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowIssueModal(false)}
                      className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md"
                    >
                      Submit Ticket
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpCenter;

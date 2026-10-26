import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Clock, 
  ShieldAlert, 
  ChevronDown, 
  CheckCircle2, 
  HelpCircle,
  MessageSquare
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const FAQS = [
  {
    q: 'How do you verify your outdoor organizers and trek leaders?',
    a: 'Every operator undergoes rigorous scrutiny: certified mountaineering credentials (BMC/AMC from NIM/HMI), active wilderness first aid certifications, safety equipment age checks, and historical trek incident reviews.',
  },
  {
    q: 'What is AdventureX’s cancellation and refund policy?',
    a: 'Standard bookings can be cancelled with 100% refund up to 15 days before departure, and 50% refund up to 7 days before departure. We also offer weather-contingency insurance for unforeseen trail closures.',
  },
  {
    q: 'Do I need prior trekking or rafting experience?',
    a: 'Not necessarily! Each adventure card clearly marks the difficulty level: Easy (suitable for all fitness levels & beginners), Moderate (requires decent cardio fitness), and Challenging (demands prior high-altitude endurance).',
  },
  {
    q: 'What safety gear is provided by the organizers?',
    a: 'All technical gear (harnesses, helmets, crampons, carabiners, lifejackets, certified ropes, and supplemental oxygen cylinders on high passes) is inspected and provided as part of your standard trip fee.',
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    adventureType: 'General Inquiry',
    message: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          adventureType: 'General Inquiry',
          message: '',
        });
        setFormSubmitted(false);
      }, 5000);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Badge variant="primary">24×7 Global Support</Badge>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Connect With Our Expedition Team
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg">
          Have questions about an upcoming trek, need custom corporate departures, or want emergency trail assistance? We are here round-the-clock.
        </p>
      </div>

      {/* Emergency Advisory Callout */}
      <div className="bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-transparent p-5 rounded-2xl border border-rose-200 dark:border-rose-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-rose-500 text-white rounded-xl shadow-md">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Active Trail Emergency Dispatch Hotline</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">For ongoing field emergencies, evacuation requests, or urgent SOS alerts.</p>
          </div>
        </div>
        <a
          href="tel:1800112999"
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md transition-colors"
        >
          SOS: 1800-112-999
        </a>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info Column */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Information</h3>
            
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Main Campus</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  AdventureX HQ, Sector 44, Cyber City<br />Gurugram, HR 122003, India
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Toll-Free Inquiries</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  +91 (800) 456-7890
                </p>
                <p className="text-xs text-slate-500">Mon-Sun: 7:00 AM - 11:00 PM IST</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Email Us</p>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mt-0.5">
                  expeditions@adventurex.com
                </p>
                <p className="text-xs text-slate-500">Response within 2 hours</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-lg space-y-3">
            <h4 className="text-base font-bold">Custom Group Departures?</h4>
            <p className="text-xs text-blue-100 leading-relaxed">
              Planning a college trip, corporate team-building retreat, or family mountaineering expedition? Our planners can craft tailored itineraries.
            </p>
          </div>
        </div>

        {/* Message Form Column */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h3 className="text-2xl font-bold text-[#0F172A] dark:text-white mb-2">Send an Inquiry</h3>
            <p className="text-[#475569] dark:text-slate-300 text-sm mb-6">Fill in your information and our outdoor specialist will respond promptly.</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                    Adventure Category
                  </label>
                  <select
                    value={formData.adventureType}
                    onChange={(e) => setFormData({ ...formData, adventureType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-[#0F172A] dark:text-white focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 cursor-pointer transition-all"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Trekking">Himalayan Trekking</option>
                    <option value="River Rafting">River Rafting</option>
                    <option value="Scuba Diving">Scuba Diving</option>
                    <option value="Paragliding">Paragliding</option>
                    <option value="Become an Organizer">Become an Organizer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] dark:text-slate-100 uppercase tracking-wider mb-1.5">
                  Your Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your upcoming plans, dates, or specific questions..."
                  className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-[#0F172A] dark:text-white placeholder-[#64748B] dark:placeholder-slate-400 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>

              <Button
                variant="primary"
                type="submit"
                size="md"
                icon={Send}
                fullWidth
              >
                Send Message
              </Button>

              {formSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-sm font-medium flex items-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>Message delivered successfully! An expedition advisor will get in touch shortly.</span>
                </motion.div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-slate-50 dark:bg-slate-900/50 p-8 sm:p-12 rounded-3xl border border-slate-200/80 dark:border-slate-800 max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-2">Common Questions</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                className="w-full px-6 py-4 flex items-center justify-between text-left font-bold text-slate-900 dark:text-white text-base hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-blue-600' : ''}`} />
              </button>

              {openFaq === idx && (
                <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

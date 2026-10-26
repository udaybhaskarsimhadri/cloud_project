import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Calendar, 
  FileSpreadsheet, 
  CheckCircle2, 
  IndianRupee, 
  TrendingUp, 
  Users, 
  Mountain,
  Layers
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const ReportsCenter = () => {
  const [period, setPeriod] = useState('monthly'); // 'daily' | 'weekly' | 'monthly' | 'yearly'
  const [toastMessage, setToastMessage] = useState(null);

  const reportData = adminService.getReports(period);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = (format) => {
    showToast(`Dispatched ${format} platform audit export for ${reportData.period}. Download started.`);
  };

  const periodOptions = [
    { id: 'daily', label: 'Daily (24h)' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly (YTD)' }
  ];

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-24 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-600 text-white font-bold text-xs shadow-xl"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Period Selection & Export Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-purple-600" />
            <span>Executive Reporting & Regulatory Audit</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Aggregated platform performance, tax disclosures, and gross booking reports
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Period selector */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            {periodOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPeriod(opt.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  period === opt.id
                    ? 'bg-white dark:bg-slate-900 text-purple-700 dark:text-purple-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Export Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleExport('PDF')}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>PDF</span>
            </button>
            <button
              type="button"
              onClick={() => handleExport('Excel')}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Excel</span>
            </button>
            <button
              type="button"
              onClick={() => handleExport('CSV')}
              className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Generated Report Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-purple-600 block">
              Reporting Window
            </span>
            <h4 className="text-xl font-black text-slate-900 dark:text-white">
              {reportData.period} Overview
            </h4>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">
            Currency: INR (₹)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Gross Merchandise Value (GMV)
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              ₹{reportData.grossVolume.toLocaleString('en-IN')}
            </p>
            <span className="text-[11px] text-slate-500">Total customer trip bookings processed</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Net Platform Commission (15%)
            </span>
            <p className="text-2xl font-black text-purple-600 dark:text-purple-400">
              ₹{reportData.netCommission.toLocaleString('en-IN')}
            </p>
            <span className="text-[11px] text-slate-500">Platform earnings retained</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Host / Partner Settlements (85%)
            </span>
            <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              ₹{reportData.partnerPayouts.toLocaleString('en-IN')}
            </p>
            <span className="text-[11px] text-slate-500">Disbursed via automated NEFT batch</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              New Registrations
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {reportData.newRegistrations}
            </p>
            <span className="text-[11px] text-slate-500">Traveler & organizer signups</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Completed Expeditions
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {reportData.completedExpeditions} Trips
            </p>
            <span className="text-[11px] text-slate-500">Safely concluded by certified captains</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Platform Cancellation Rate
            </span>
            <p className="text-2xl font-black text-slate-900 dark:text-white">
              {reportData.cancellationRate}
            </p>
            <span className="text-[11px] text-emerald-600 font-bold">Well below 5% platform threshold</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ReportsCenter;

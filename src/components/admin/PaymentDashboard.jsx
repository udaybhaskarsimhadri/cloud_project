import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, 
  IndianRupee, 
  TrendingUp, 
  Users, 
  Clock, 
  RotateCcw, 
  CheckCircle2, 
  Download, 
  ArrowUpRight,
  ShieldCheck,
  Search
} from 'lucide-react';
import { adminService } from '../../services/adminService';

const PaymentDashboard = () => {
  const [summary] = useState(() => adminService.getPaymentsSummary());
  const [filterText, setFilterText] = useState('');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredTxns = summary.recentTransactions.filter(t => 
    t.id.toLowerCase().includes(filterText.toLowerCase()) ||
    t.traveler.toLowerCase().includes(filterText.toLowerCase()) ||
    t.organizer.toLowerCase().includes(filterText.toLowerCase()) ||
    t.adventure.toLowerCase().includes(filterText.toLowerCase())
  );

  const statCards = [
    {
      title: 'Total Gross Volume',
      value: `₹${summary.totalRevenue.toLocaleString('en-IN')}`,
      desc: 'All verified customer bookings',
      color: 'from-blue-600 to-indigo-600',
      icon: IndianRupee
    },
    {
      title: 'Platform Commission',
      value: `₹${summary.platformCommission.toLocaleString('en-IN')}`,
      desc: 'Net AdventureX revenue share',
      color: 'from-purple-600 to-pink-600',
      icon: TrendingUp
    },
    {
      title: 'Organizer Earnings',
      value: `₹${summary.organizerEarnings.toLocaleString('en-IN')}`,
      desc: 'Disbursed to expedition leaders',
      color: 'from-emerald-600 to-teal-700',
      icon: Users
    },
    {
      title: 'Pending Payouts',
      value: `₹${summary.pendingPayouts.toLocaleString('en-IN')}`,
      desc: 'Scheduled in next bank cycle',
      color: 'from-amber-600 to-orange-600',
      icon: Clock
    },
    {
      title: 'Refund Requests',
      value: `₹${summary.refundRequests.toLocaleString('en-IN')}`,
      desc: 'Reversed from trip cancellations',
      color: 'from-rose-600 to-pink-600',
      icon: RotateCcw
    }
  ];

  const handleSimulatePayout = () => {
    showToast('Weekly payout batch generated: NEFT / RTGS file export ready.');
  };

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

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${card.color} flex items-center justify-center text-white shadow-sm`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                {card.value}
              </p>
              <span className="text-[11px] text-slate-500 mt-1 block">
                {card.desc}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Transactions Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span>Recent Financial Settlements & Transactions</span>
            </h3>
            <p className="text-xs text-slate-500">
              Automated 15% platform commission splits & host payouts in INR (₹)
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                placeholder="Search transactions..."
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={handleSimulatePayout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors cursor-pointer shrink-0 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Disburse Payouts</span>
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 uppercase font-black tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Txn ID & Date</th>
                <th className="py-3 px-4">Traveler</th>
                <th className="py-3 px-4">Organizer</th>
                <th className="py-3 px-4">Gross (₹)</th>
                <th className="py-3 px-4">Platform Fee (15%)</th>
                <th className="py-3 px-4">Host Payout</th>
                <th className="py-3 px-4 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredTxns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No transactions found.
                  </td>
                </tr>
              ) : (
                filteredTxns.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-extrabold text-slate-900 dark:text-white font-mono">{t.id}</p>
                      <span className="text-[10px] text-slate-400">{t.date}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{t.traveler}</p>
                    </td>
                    <td className="py-3.5 px-4">
                      <p className="font-bold text-slate-800 dark:text-slate-200">{t.organizer}</p>
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white whitespace-nowrap">
                      ₹{t.amount.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-purple-600 whitespace-nowrap">
                      ₹{t.platformFee.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600 whitespace-nowrap">
                      ₹{t.organizerShare.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        t.status === 'Paid' || t.status === 'Completed'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : t.status === 'Refunded'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PaymentDashboard;

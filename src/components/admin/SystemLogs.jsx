import React, { useState } from 'react';
import { 
  ClipboardList, 
  Search, 
  Filter, 
  ShieldCheck, 
  LogIn, 
  UserPlus, 
  TicketCheck, 
  Mountain, 
  Settings,
  Clock
} from 'lucide-react';

const SystemLogs = ({ logs = [] }) => {
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Login Activity', 'Registration', 'Booking', 'Adventure Creation', 'Admin Action'];

  const filteredLogs = logs.filter(log => {
    const matchesCategory = filterCategory === 'All' || log.category === filterCategory;
    const matchesSearch = searchQuery === '' || 
      log.user?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ip?.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Login Activity': return LogIn;
      case 'Registration': return UserPlus;
      case 'Booking': return TicketCheck;
      case 'Adventure Creation': return Mountain;
      case 'Admin Action': return ShieldCheck;
      default: return Clock;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-5">
      
      {/* Title & Filter Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-purple-600" />
            <span>System Audit & Security Logs</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Immutable platform telemetry and administrator event trace
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 sm:w-48">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap transition-colors ${
                  filterCategory === cat
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Logs Table / List */}
      <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 uppercase font-black tracking-wider text-[10px]">
            <tr>
              <th className="py-3 px-4">Event & Category</th>
              <th className="py-3 px-4">Action Details</th>
              <th className="py-3 px-4">Actor</th>
              <th className="py-3 px-4">IP Address</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
            {filteredLogs.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No log entries matching the criteria.
                </td>
              </tr>
            ) : (
              filteredLogs.map(log => {
                const Icon = getCategoryIcon(log.category);
                return (
                  <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">
                          {log.category}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-600 dark:text-slate-400 whitespace-nowrap">
                      {log.user}
                    </td>
                    <td className="py-3 px-4 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                      {log.ip || '103.21.144.12'}
                    </td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {log.status || 'Success'}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default SystemLogs;

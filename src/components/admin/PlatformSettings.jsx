import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Mail, 
  DollarSign, 
  Percent, 
  Globe, 
  Moon, 
  Sun,
  Lock,
  Download,
  Upload,
  Database,
  Activity,
  FileText
} from 'lucide-react';
import { adminService } from '../../services/adminService';
import { backupManager } from '../../utils/backupManager';
import { auditLogger } from '../../utils/auditLogger';

const PlatformSettings = () => {
  const [settings, setSettings] = useState(() => adminService.getSettings());
  const [toastMessage, setToastMessage] = useState(null);
  const [saving, setSaving] = useState(false);
  const [auditLogs, setAuditLogs] = useState(() => auditLogger.getAuditLogs());
  const [showLogs, setShowLogs] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExportBackup = () => {
    const res = backupManager.exportAllData();
    if (res.success) {
      showToast(`Exported ${res.count} storage tables as JSON.`);
      setAuditLogs(auditLogger.getAuditLogs());
    } else {
      showToast('Export failed: ' + res.error);
    }
  };

  const handleImportBackup = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      const res = backupManager.importData(content);
      if (res.success) {
        showToast(`Successfully restored ${res.restoredCount} database tables.`);
        setAuditLogs(auditLogger.getAuditLogs());
      } else {
        showToast('Restore error: ' + res.error);
      }
    };
    reader.readAsText(file);
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      adminService.saveSettings(settings);
      setSaving(false);
      showToast('Platform parameters & configuration saved locally.');
    }, 400);
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

      <form onSubmit={handleSave} className="space-y-6">
        {/* Core Platform Identity */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-purple-600" />
              <span>General Platform Configurations</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Global system values, brand identity, and communication endpoints
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-semibold">
            {/* Platform Name */}
            <div>
              <label className="block text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-bold tracking-wider text-[11px]">
                Platform Brand Name
              </label>
              <input
                type="text"
                value={settings.platformName}
                onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                required
              />
            </div>

            {/* Support Email */}
            <div>
              <label className="block text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-bold tracking-wider text-[11px]">
                Global Customer Support Email
              </label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                required
              />
            </div>

            {/* Default Currency */}
            <div>
              <label className="block text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-bold tracking-wider text-[11px]">
                Default Platform Currency
              </label>
              <input
                type="text"
                value={settings.defaultCurrency}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/50 text-slate-500 font-bold cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Locked to Indian Rupees (₹) as per project requirements</span>
            </div>

            {/* Platform Theme */}
            <div>
              <label className="block text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-bold tracking-wider text-[11px]">
                Default Admin Appearance
              </label>
              <select
                value={settings.theme}
                onChange={(e) => setSettings({ ...settings, theme: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
              >
                <option value="System">System Responsive</option>
                <option value="Light">Light Mode</option>
                <option value="Dark">Dark Mode</option>
              </select>
            </div>
          </div>
        </div>

        {/* Financial & Commission Policies */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Percent className="w-5 h-5 text-emerald-600" />
              <span>Commission & Taxation Policies</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Automated ledger deductions applied during checkout & payout settlements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs font-semibold">
            {/* Commission % */}
            <div>
              <label className="block text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-bold tracking-wider text-[11px]">
                Platform Marketplace Commission (%)
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={settings.commissionPercentage}
                onChange={(e) => setSettings({ ...settings, commissionPercentage: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Standard rate: 15% deducted from organizer gross volume</span>
            </div>

            {/* Tax Percentage */}
            <div>
              <label className="block text-slate-600 dark:text-slate-300 mb-1.5 uppercase font-bold tracking-wider text-[11px]">
                GST / Service Tax Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="28"
                value={settings.taxPercentage}
                onChange={(e) => setSettings({ ...settings, taxPercentage: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-purple-600"
                required
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Government mandated 18% GST on adventure tourism services</span>
            </div>
          </div>
        </div>

        {/* Maintenance Mode & Safeguards */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span>Maintenance Mode</span>
              </h4>
              <p className="text-xs text-slate-500">
                Temporarily restrict new bookings during system upgrades while allowing admin inspection
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-amber-600"></div>
            </label>
          </div>
        </div>

        {/* Part 13: Disaster Recovery, Backups & Audit Trail */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-7 shadow-sm space-y-5">
          <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-emerald-500" />
              <span>Disaster Recovery, Backups & Audit Trail</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Export and restore all platform storage tables as JSON snapshots, and inspect immutable audit events.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Export */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Download className="w-4 h-4 text-emerald-500" />
                <span>Export System Snapshot</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Download a complete JSON snapshot of all bookings, reviews, community posts, loyalty data, and audit records.
              </p>
              <button
                type="button"
                onClick={handleExportBackup}
                className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Data as JSON</span>
              </button>
            </div>

            {/* Import */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-blue-500" />
                <span>Restore Snapshot</span>
              </span>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Restore platform database state from a validated AdventureX JSON backup file.
              </p>
              <label className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer">
                <Upload className="w-3.5 h-3.5" />
                <span>Upload & Restore Backup</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportBackup}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Audit Logs Accordion */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-purple-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Immutable Security Audit Trail ({auditLogs.length} events logged)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowLogs(!showLogs)}
                className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
              >
                {showLogs ? 'Hide Audit Log' : 'View Audit Log'}
              </button>
            </div>

            {showLogs && (
              <div className="p-3 rounded-2xl bg-slate-950 text-slate-200 text-xs font-mono max-h-48 overflow-y-auto space-y-1.5 border border-slate-800">
                {auditLogs.length === 0 ? (
                  <p className="text-slate-500 italic">No audit records logged yet.</p>
                ) : (
                  auditLogs.slice(0, 20).map((log) => (
                    <div key={log.id} className="text-[11px] border-b border-slate-800/80 pb-1">
                      <span className="text-emerald-400">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{' '}
                      <span className="text-amber-400 font-bold">{log.action}</span> -{' '}
                      <span className="text-slate-300">{log.actor?.email || 'Anonymous'}</span>{' '}
                      <span className="text-slate-500">({log.actor?.role})</span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Platform Settings'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlatformSettings;

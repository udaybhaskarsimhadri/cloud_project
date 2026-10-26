// Future: AWS Backup & Amazon S3 Glacier Disaster Recovery
// Enables one-click local JSON export and restore for all AdventureX platform state.

import { auditLogger, AUDIT_ACTIONS } from './auditLogger';

const MANAGED_STORAGE_KEYS = [
  'adventurex_bookings',
  'adventurex_reviews',
  'adventurex_community_posts',
  'adventurex_enhanced_wishlist',
  'adventurex_wishlist',
  'adventurex_notifications',
  'adventurex_loyalty_data',
  'adventurex_referral_data',
  'adventurex_user_profile',
  'adventurex_users_database',
  'adventurex_organizer_profile',
  'adventurex_organizer_adventures',
  'adventurex_ai_history',
  'adventurex_ai_saved_plans',
  'adventurex_audit_logs'
];

export const backupManager = {
  /**
   * Export all system data as a JSON file
   */
  exportAllData() {
    try {
      const dump = {
        metadata: {
          platform: 'AdventureX',
          version: '1.0.0-prod',
          exportedAt: new Date().toISOString(),
          formatVersion: '2026.1'
        },
        data: {}
      };

      MANAGED_STORAGE_KEYS.forEach((key) => {
        try {
          const raw = localStorage.getItem(key);
          if (raw) {
            dump.data[key] = JSON.parse(raw);
          }
        } catch {}
      });

      const jsonStr = JSON.stringify(dump, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const downloadAnchor = document.createElement('a');
      downloadAnchor.href = url;
      const dateStr = new Date().toISOString().slice(0, 10);
      downloadAnchor.download = `adventurex_backup_${dateStr}.json`;
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      document.body.removeChild(downloadAnchor);
      URL.revokeObjectURL(url);

      auditLogger.logEvent(AUDIT_ACTIONS.BACKUP_EXPORT, { keysCount: Object.keys(dump.data).length });
      return { success: true, count: Object.keys(dump.data).length };
    } catch (err) {
      console.error('Export failed:', err);
      return { success: false, error: err.message };
    }
  },

  /**
   * Import and restore data from a JSON string or file
   */
  importData(jsonString) {
    try {
      if (!jsonString || typeof jsonString !== 'string') {
        throw new Error('Invalid backup file content');
      }

      const parsed = JSON.parse(jsonString);
      if (!parsed.metadata || parsed.metadata.platform !== 'AdventureX' || !parsed.data) {
        throw new Error('Unsupported backup format. File must be an authentic AdventureX backup.');
      }

      let restoredCount = 0;
      for (const [key, value] of Object.entries(parsed.data)) {
        if (MANAGED_STORAGE_KEYS.includes(key)) {
          localStorage.setItem(key, JSON.stringify(value));
          restoredCount++;
        }
      }

      auditLogger.logEvent(AUDIT_ACTIONS.BACKUP_RESTORE, {
        restoredKeys: restoredCount,
        backupExportedAt: parsed.metadata.exportedAt
      });

      return {
        success: true,
        restoredCount,
        exportedAt: parsed.metadata.exportedAt
      };
    } catch (err) {
      return {
        success: false,
        error: err.message
      };
    }
  }
};

export default backupManager;

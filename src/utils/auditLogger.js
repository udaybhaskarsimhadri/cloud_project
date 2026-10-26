// Future: AWS CloudTrail & Amazon CloudWatch Logs
// Tracks security-relevant actions, authentication, administrative updates, and financial operations.

const AUDIT_STORAGE_KEY = 'adventurex_audit_logs';

export const AUDIT_ACTIONS = {
  USER_LOGIN: 'AUTH_LOGIN_SUCCESS',
  USER_LOGOUT: 'AUTH_LOGOUT',
  SESSION_TIMEOUT: 'AUTH_SESSION_TIMEOUT',
  SECURITY_VIOLATION: 'SECURITY_UNAUTHORIZED_ACCESS',
  BOOKING_CREATED: 'EXPEDITION_BOOKING_CREATED',
  BOOKING_CANCELLED: 'EXPEDITION_BOOKING_CANCELLED',
  ADVENTURE_CREATED: 'ORGANIZER_ADVENTURE_CREATED',
  ADVENTURE_MODERATED: 'ADMIN_ADVENTURE_MODERATED',
  REVIEW_ADDED: 'COMMUNITY_REVIEW_ADDED',
  REVIEW_MODERATED: 'ADMIN_REVIEW_MODERATED',
  BACKUP_EXPORT: 'DATA_BACKUP_EXPORTED',
  BACKUP_RESTORE: 'DATA_BACKUP_RESTORED'
};

export const auditLogger = {
  /**
   * Log an audit event
   */
  logEvent(action, details = {}, user = null) {
    try {
      const logs = this.getAuditLogs();
      const newEntry = {
        id: 'aud-' + Date.now() + '-' + Math.random().toString(36).substr(2, 6),
        action,
        timestamp: new Date().toISOString(),
        actor: {
          id: user?.id || details?.userId || 'anonymous',
          email: user?.email || details?.email || 'unauthenticated',
          role: user?.role || details?.role || 'guest'
        },
        details,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'node'
      };

      const updated = [newEntry, ...logs].slice(0, 200); // Retain last 200 audit events
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(updated));
      return newEntry;
    } catch {
      return null;
    }
  },

  /**
   * Retrieve all audit logs
   */
  getAuditLogs() {
    try {
      const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  /**
   * Clear audit logs (Admin only)
   */
  clearAuditLogs() {
    try {
      localStorage.removeItem(AUDIT_STORAGE_KEY);
      return true;
    } catch {
      return false;
    }
  }
};

export default auditLogger;

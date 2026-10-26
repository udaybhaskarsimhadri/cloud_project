// Future: Amazon CloudWatch & AWS X-Ray Distributed Tracing
// Telemetry service capturing performance, API latency, uncaught exceptions, and user journey events.

import { logger } from '../../utils/logger';
import { CLOUD_CONFIG } from '../../config/cloudConfig';

const TELEMETRY_STORAGE_KEY = 'adventurex_telemetry_metrics';

export const monitoringService = {
  /**
   * Future: Amazon CloudWatch PutMetricDataCommand
   */
  async recordMetric(metricName, value, unit = 'Count', dimensions = {}) {
    logger.info('CloudWatch', `Metric: ${metricName}=${value} (${unit})`, dimensions);

    try {
      const records = this.getRecordedMetrics();
      const entry = {
        id: 'metric-' + Date.now(),
        namespace: CLOUD_CONFIG.observability.metricsNamespace,
        metricName,
        value,
        unit,
        dimensions,
        timestamp: new Date().toISOString()
      };
      const updated = [entry, ...records].slice(0, 100);
      localStorage.setItem(TELEMETRY_STORAGE_KEY, JSON.stringify(updated));
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  /**
   * Record page render performance & Web Vitals
   */
  async recordPagePerformance(route, loadTimeMs) {
    return this.recordMetric('PageLoadTime', loadTimeMs, 'Milliseconds', { Route: route });
  },

  /**
   * Record simulated API call latency
   */
  async recordApiLatency(endpoint, latencyMs, statusCode = 200) {
    return this.recordMetric('ApiLatency', latencyMs, 'Milliseconds', {
      Endpoint: endpoint,
      Status: String(statusCode)
    });
  },

  /**
   * Record unexpected runtime error
   */
  async recordError(error, contextInfo = {}) {
    logger.error('CloudWatch', `Uncaught exception reported: ${error.message || error}`, contextInfo);
    return this.recordMetric('RuntimeExceptions', 1, 'Count', {
      ErrorMessage: error.message ? error.message.slice(0, 100) : 'UnknownError',
      Context: typeof contextInfo === 'string' ? contextInfo : 'AppRuntime'
    });
  },

  getRecordedMetrics() {
    try {
      const raw = localStorage.getItem(TELEMETRY_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
};

export default monitoringService;

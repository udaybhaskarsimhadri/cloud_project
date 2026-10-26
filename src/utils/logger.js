// AdventureX Centralized Cloud Logger
// Simulates CloudWatch logging in production and prints formatted diagnostic tags during development.

const IS_DEV = Boolean(import.meta.env?.DEV);

class CloudLogger {
  formatMessage(level, service, message, extra) {
    const timestamp = new Date().toISOString();
    return {
      timestamp,
      level,
      service: service ? `[AWS:${service}]` : '[CloudService]',
      message,
      extra: extra || null
    };
  }

  debug(service, message, ...args) {
    if (IS_DEV) {
      console.debug(`%c[DEBUG] [AWS:${service}]`, 'color: #94A3B8; font-weight: bold;', message, ...args);
    }
  }

  info(service, message, ...args) {
    if (IS_DEV) {
      console.info(`%c[INFO] [AWS:${service}]`, 'color: #10B981; font-weight: bold;', message, ...args);
    }
  }

  warn(service, message, ...args) {
    if (IS_DEV) {
      console.warn(`%c[WARN] [AWS:${service}]`, 'color: #F59E0B; font-weight: bold;', message, ...args);
    }
  }

  error(service, message, ...args) {
    // Errors are always recorded
    console.error(`%c[ERROR] [AWS:${service}]`, 'color: #EF4444; font-weight: bold;', message, ...args);
    // In production, this can send payloads to Amazon CloudWatch via AWS SDK / API Gateway
  }
}

export const logger = new CloudLogger();
export default logger;

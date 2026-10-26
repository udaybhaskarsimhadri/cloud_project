// AdventureX XSS Protection & Content Sanitizer
// Prevents HTML injection, script execution, and malicious input in user-generated content.

const HTML_ESCAPE_MAP = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;'
};

export const sanitizer = {
  /**
   * Escape unsafe HTML characters
   */
  escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"'`/]/g, (char) => HTML_ESCAPE_MAP[char] || char);
  },

  /**
   * Clean and sanitize free-form text inputs
   * Removes javascript: links, inline event handlers, and script tags
   */
  sanitizeText(input) {
    if (typeof input !== 'string') return input;

    let cleaned = input.trim();
    // Strip script tags
    cleaned = cleaned.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    // Strip iframe tags
    cleaned = cleaned.replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '');
    // Strip dangerous attributes (onload, onerror, onclick, etc.)
    cleaned = cleaned.replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, '');
    // Strip javascript: pseudo protocols
    cleaned = cleaned.replace(/javascript:/gi, '');

    return this.escapeHtml(cleaned);
  },

  /**
   * Recursively sanitizes an entire object's string properties
   */
  sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
      return obj.map((item) => this.sanitizeObject(item));
    }

    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeText(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value);
      } else {
        sanitized[key] = value;
      }
    }
    return sanitized;
  }
};

export default sanitizer;

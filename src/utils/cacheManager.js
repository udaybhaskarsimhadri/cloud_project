// AdventureX Client Cache Manager
// Provides TTL-based caching layer for offline resilience and fast response times.
// Ready for Amazon ElastiCache / DynamoDB DAX replication patterns.

const CACHE_PREFIX = 'advx_cache_';
const DEFAULT_TTL_MS = 15 * 60 * 1000; // 15 minutes

class CacheManager {
  memoryCache = new Map();

  get(key) {
    const fullKey = CACHE_PREFIX + key;
    const now = Date.now();

    // 1. Check in-memory fast tier
    if (this.memoryCache.has(fullKey)) {
      const entry = this.memoryCache.get(fullKey);
      if (entry.expiresAt > now) {
        return entry.data;
      }
      this.memoryCache.delete(fullKey);
    }

    // 2. Check localStorage persistent tier
    try {
      const raw = localStorage.getItem(fullKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (parsed.expiresAt && parsed.expiresAt < now) {
        localStorage.removeItem(fullKey);
        return null;
      }
      // Warm up memory cache
      this.memoryCache.set(fullKey, parsed);
      return parsed.data;
    } catch {
      return null;
    }
  }

  set(key, data, ttlMs = DEFAULT_TTL_MS) {
    const fullKey = CACHE_PREFIX + key;
    const entry = {
      data,
      cachedAt: Date.now(),
      expiresAt: Date.now() + ttlMs
    };

    this.memoryCache.set(fullKey, entry);

    try {
      localStorage.setItem(fullKey, JSON.stringify(entry));
    } catch {
      // LocalStorage quota might be full, in-memory cache still holds
    }
    return data;
  }

  invalidate(key) {
    const fullKey = CACHE_PREFIX + key;
    this.memoryCache.delete(fullKey);
    try {
      localStorage.removeItem(fullKey);
    } catch {}
  }

  clear() {
    this.memoryCache.clear();
    try {
      Object.keys(localStorage).forEach((k) => {
        if (k.startsWith(CACHE_PREFIX)) {
          localStorage.removeItem(k);
        }
      });
    } catch {}
  }
}

export const cacheManager = new CacheManager();
export default cacheManager;

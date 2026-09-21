interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Checks if a given identifier (IP or token) has exceeded the rate limit.
 * Uses a sliding window in-memory tracking with automatic garbage collection.
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 60,
  windowMs: number = 60000
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(identifier);

  // Clean expired entries periodically
  if (rateLimitStore.size > 10000) {
    rateLimitStore.forEach((item, key) => {
      if (item.resetTime < now) {
        rateLimitStore.delete(key);
      }
    });
  }

  if (!record || record.resetTime < now) {
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetTime });
    return { success: true, remaining: limit - 1, resetTime };
  }

  if (record.count >= limit) {
    return { success: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count += 1;
  return { success: true, remaining: limit - record.count, resetTime: record.resetTime };
}

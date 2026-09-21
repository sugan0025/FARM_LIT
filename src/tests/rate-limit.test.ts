import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '@/lib/rate-limit';

describe('Sliding Window Rate Limiter', () => {
  it('should allow requests within limit and decrement remaining count', () => {
    const id = 'test_ip_allow';
    const limit = 5;
    const windowMs = 10000;

    const first = checkRateLimit(id, limit, windowMs);
    expect(first.success).toBe(true);
    expect(first.remaining).toBe(4);

    const second = checkRateLimit(id, limit, windowMs);
    expect(second.success).toBe(true);
    expect(second.remaining).toBe(3);
  });

  it('should block requests that exceed limit', () => {
    const id = 'test_ip_block';
    const limit = 3;
    const windowMs = 10000;

    checkRateLimit(id, limit, windowMs); // 1
    checkRateLimit(id, limit, windowMs); // 2
    checkRateLimit(id, limit, windowMs); // 3

    const fourth = checkRateLimit(id, limit, windowMs);
    expect(fourth.success).toBe(false);
    expect(fourth.remaining).toBe(0);
  });
});

import { describe, it, expect } from 'vitest';
import { extractUTMParams, hasUTMParams } from '@/lib/utm';

describe('UTM Attribution Engine', () => {
  it('should extract standard marketing UTM parameters accurately', () => {
    const searchParams = new URLSearchParams(
      'utm_source=instagram&utm_medium=social&utm_campaign=weekend_harvest&utm_term=organic_spinach&utm_content=hero_banner'
    );

    const utm = extractUTMParams(searchParams);

    expect(utm.utm_source).toBe('instagram');
    expect(utm.utm_medium).toBe('social');
    expect(utm.utm_campaign).toBe('weekend_harvest');
    expect(utm.utm_term).toBe('organic_spinach');
    expect(utm.utm_content).toBe('hero_banner');
    expect(hasUTMParams(utm)).toBe(true);
  });

  it('should return empty object and false when no UTM parameters exist', () => {
    const searchParams = new URLSearchParams('category=vegetables&sort=price-low');
    const utm = extractUTMParams(searchParams);

    expect(hasUTMParams(utm)).toBe(false);
    expect(utm.utm_source).toBeUndefined();
  });

  it('should sanitize dangerous injection payloads in UTM parameters', () => {
    const searchParams = new URLSearchParams(
      'utm_source=<script>alert("xss")</script>&utm_campaign=harvest\' OR 1=1 --'
    );

    const utm = extractUTMParams(searchParams);

    expect(utm.utm_source).not.toContain('<script>');
    expect(utm.utm_source).not.toContain('</script>');
    expect(utm.utm_source).toBe('scriptalert(xss)/script');
    expect(utm.utm_campaign).not.toContain("'");
  });
});

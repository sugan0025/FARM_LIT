import { AnalyticsEventType } from '@/types';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Dispatches an analytics event cleanly to telemetry listeners without transmitting PII.
 */
export function trackEvent(event: AnalyticsEventType, properties?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return;

  // Sanitize properties to remove sensitive keys (passwords, credit cards, full emails)
  const sanitizedProps: Record<string, unknown> = {};
  if (properties) {
    for (const [key, val] of Object.entries(properties)) {
      const lowerKey = key.toLowerCase();
      if (
        lowerKey.includes('password') ||
        lowerKey.includes('card') ||
        lowerKey.includes('cvv') ||
        lowerKey.includes('secret')
      ) {
        continue; // Discard sensitive fields
      }
      sanitizedProps[key] = val;
    }
  }

  const payload = {
    event,
    properties: sanitizedProps,
    timestamp: Date.now(),
    url: window.location.pathname,
  };

  // 1. Forward directly to Google Analytics 4 if gtag is initialized
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, sanitizedProps);
  }

  // 2. Dispatch custom browser event for integrations (Google Tag Manager, Segment, etc.)
  window.dispatchEvent(new CustomEvent('farmlit:analytics', { detail: payload }));

  // In development, log cleanly
  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.debug(`[Farm_lit Analytics] ${event}:`, sanitizedProps);
  }
}

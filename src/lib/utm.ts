import { UTMParams } from '@/types';

const FIRST_TOUCH_KEY = 'farmlit_first_touch_utm';
const LAST_TOUCH_KEY = 'farmlit_last_touch_utm';

/**
 * Extracts sanitized UTM parameters from a URL search query string or URLSearchParams.
 */
export function extractUTMParams(searchParams: URLSearchParams | Record<string, string>): UTMParams {
  const getParam = (key: string): string | undefined => {
    let val: string | null | undefined;
    if (searchParams instanceof URLSearchParams) {
      val = searchParams.get(key);
    } else {
      val = searchParams[key];
    }
    if (!val) return undefined;
    // Sanitize string to prevent injection / oversized strings
    const clean = val
      .trim()
      .slice(0, 100)
      .replace(/[<>'"]/g, '')
      .replace(/on\w+\s*=/gi, '');
    return clean.length > 0 ? clean : undefined;
  };

  const utm: UTMParams = {};
  const source = getParam('utm_source');
  const medium = getParam('utm_medium');
  const campaign = getParam('utm_campaign');
  const term = getParam('utm_term');
  const content = getParam('utm_content');

  if (source) utm.utm_source = source;
  if (medium) utm.utm_medium = medium;
  if (campaign) utm.utm_campaign = campaign;
  if (term) utm.utm_term = term;
  if (content) utm.utm_content = content;

  return utm;
}

/**
 * Checks if at least one UTM parameter is present.
 */
export function hasUTMParams(utm: UTMParams): boolean {
  return Boolean(
    utm.utm_source || utm.utm_medium || utm.utm_campaign || utm.utm_term || utm.utm_content
  );
}

/**
 * Captures UTM parameters from window.location in the browser.
 * Persists first-touch (never overwritten) and updates last-touch.
 */
export function captureAndPersistUTM(): { firstTouch: UTMParams | null; lastTouch: UTMParams | null } {
  if (typeof window === 'undefined') {
    return { firstTouch: null, lastTouch: null };
  }

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const currentUTM = extractUTMParams(urlParams);

    // 1. First-Touch Attribution
    let firstTouch: UTMParams | null = null;
    const existingFirstTouchStr = localStorage.getItem(FIRST_TOUCH_KEY);
    if (existingFirstTouchStr) {
      try {
        firstTouch = JSON.parse(existingFirstTouchStr);
      } catch {
        firstTouch = null;
      }
    }

    if (!firstTouch && hasUTMParams(currentUTM)) {
      firstTouch = currentUTM;
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
      // Also set cookie for server-side access during checkout
      document.cookie = `${FIRST_TOUCH_KEY}=${encodeURIComponent(
        JSON.stringify(firstTouch)
      )}; path=/; max-age=2592000; SameSite=Lax`;
    }

    // 2. Last-Touch Attribution
    let lastTouch: UTMParams | null = null;
    if (hasUTMParams(currentUTM)) {
      lastTouch = currentUTM;
      localStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(lastTouch));
      document.cookie = `${LAST_TOUCH_KEY}=${encodeURIComponent(
        JSON.stringify(lastTouch)
      )}; path=/; max-age=2592000; SameSite=Lax`;
    } else {
      const existingLastTouchStr = localStorage.getItem(LAST_TOUCH_KEY);
      if (existingLastTouchStr) {
        try {
          lastTouch = JSON.parse(existingLastTouchStr);
        } catch {
          lastTouch = null;
        }
      }
    }

    return { firstTouch, lastTouch };
  } catch {
    return { firstTouch: null, lastTouch: null };
  }
}

/**
 * Retrieves the stored UTM attribution payload for inclusion in checkout/order placement.
 */
export function getStoredAttribution(): { firstTouch: UTMParams | null; lastTouch: UTMParams | null } {
  if (typeof window === 'undefined') {
    return { firstTouch: null, lastTouch: null };
  }

  try {
    const firstStr = localStorage.getItem(FIRST_TOUCH_KEY);
    const lastStr = localStorage.getItem(LAST_TOUCH_KEY);
    return {
      firstTouch: firstStr ? JSON.parse(firstStr) : null,
      lastTouch: lastStr ? JSON.parse(lastStr) : null,
    };
  } catch {
    return { firstTouch: null, lastTouch: null };
  }
}

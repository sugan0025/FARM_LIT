'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { captureAndPersistUTM } from '@/lib/utm';
import { trackEvent } from '@/lib/analytics';

export function UTMListener() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const { firstTouch, lastTouch } = captureAndPersistUTM();

    // If UTM parameters were present on page load, emit campaign_click
    if (lastTouch && Object.keys(lastTouch).length > 0) {
      trackEvent('campaign_click', {
        utm_source: lastTouch.utm_source,
        utm_medium: lastTouch.utm_medium,
        utm_campaign: lastTouch.utm_campaign,
        is_first_touch: Boolean(firstTouch && firstTouch.utm_campaign === lastTouch.utm_campaign),
      });
    }
  }, [searchParams]);

  return null;
}

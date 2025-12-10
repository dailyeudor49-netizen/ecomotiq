'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import {
  getAllConversionIds,
  getCountryFromPath,
  getGoogleAdsConfig,
  isGoogleAdsLanding,
  isGoogleAdsThankYou,
} from '@/app/config/google-ads';
import {
  initGtagScript,
  trackGoogleAdsPageView,
  trackGoogleAdsViewContent,
  trackGoogleAdsConversion,
} from '@/app/lib/google/gtag';

function GoogleAdsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const conversionIds = getAllConversionIds();
  const primaryConversionId = conversionIds[0] || null;

  useEffect(() => {
    if (!primaryConversionId) return;

    const waitForGtag = setInterval(() => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        clearInterval(waitForGtag);
        trackGoogleAdsPageView(primaryConversionId);

        const countryCode = getCountryFromPath(pathname);

        if (isGoogleAdsLanding(pathname) && countryCode) {
          const config = getGoogleAdsConfig(countryCode);
          if (config) trackGoogleAdsViewContent(config);
        }

        if (isGoogleAdsThankYou(pathname) && countryCode) {
          const config = getGoogleAdsConfig(countryCode);
          if (config) {
            let value = 0;
            const priceParam = searchParams.get('price');
            if (priceParam) {
              value = parseFloat(priceParam);
            } else if (typeof window !== 'undefined') {
              const storedPrice = localStorage.getItem('gg_purchase_value');
              if (storedPrice) value = parseFloat(storedPrice);
            }
            const transactionId = searchParams.get('txn') || `txn_${Date.now()}`;
            if (value > 0) trackGoogleAdsConversion(config, value, transactionId);
          }
        }
      }
    }, 100);

    const timeout = setTimeout(() => clearInterval(waitForGtag), 10000);
    return () => {
      clearInterval(waitForGtag);
      clearTimeout(timeout);
    };
  }, [pathname, searchParams, primaryConversionId]);

  return null;
}

export default function GoogleAdsPixel() {
  const conversionIds = getAllConversionIds();
  const primaryConversionId = conversionIds[0] || null;

  if (!primaryConversionId) return null;

  return (
    <>
      <Script
        id="google-ads-gtag-js"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${primaryConversionId}`}
      />
      <Script
        id="google-ads-gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: initGtagScript(conversionIds),
        }}
      />
      <Suspense fallback={null}>
        <GoogleAdsTracker />
      </Suspense>
    </>
  );
}

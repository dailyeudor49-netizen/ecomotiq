import { GoogleAdsCountryConfig } from '@/app/config/google-ads';

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function trackGoogleAdsPageView(conversionId: string): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'page_view', { send_to: conversionId });
}

export function trackGoogleAdsViewContent(config: GoogleAdsCountryConfig): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'view_item', {
    send_to: `${config.conversionId}/${config.conversionLabel}`,
    currency: config.currency,
  });
}

export function trackGoogleAdsConversion(
  config: GoogleAdsCountryConfig,
  value: number,
  transactionId?: string
): void {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', 'conversion', {
    send_to: `${config.conversionId}/${config.conversionLabel}`,
    value: value,
    currency: config.currency,
    transaction_id: transactionId || `txn_${Date.now()}`,
  });
}

export function initGtagScript(conversionIds: string[]): string {
  if (conversionIds.length === 0) return '';
  const primaryId = conversionIds[0];
  const additionalConfigs = conversionIds.slice(1).map(id => `gtag('config', '${id}');`).join('\n');
  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${primaryId}');
    ${additionalConfigs}
  `;
}

import { FB_CONFIG, FacebookEventName, FacebookEventData } from '@/app/config/facebook';

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
    _fbq: (...args: unknown[]) => void;
  }
}

export function generateEventId(): string {
  return `${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
}

export function getFbp(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/_fbp=([^;]+)/);
  return match ? match[1] : '';
}

export function getFbc(): string {
  if (typeof document === 'undefined') return '';
  const match = document.cookie.match(/_fbc=([^;]+)/);
  if (match) return match[1];
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search);
    const fbclid = urlParams.get('fbclid');
    if (fbclid) return `fb.1.${Date.now()}.${fbclid}`;
  }
  return '';
}

export function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source') || '',
    utm_medium: urlParams.get('utm_medium') || '',
    utm_campaign: urlParams.get('utm_campaign') || '',
    utm_content: urlParams.get('utm_content') || '',
    utm_term: urlParams.get('utm_term') || '',
  };
}

export function trackPixelEvent(
  eventName: FacebookEventName,
  eventData?: FacebookEventData,
  eventId?: string
): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  const options = eventId ? { eventID: eventId } : undefined;
  if (eventData) {
    window.fbq('track', eventName, eventData, options);
  } else {
    window.fbq('track', eventName, {}, options);
  }
}

export function trackPageView(eventId?: string): void {
  trackPixelEvent('PageView', undefined, eventId);
}

export function trackPurchase(eventData: FacebookEventData, eventId?: string): void {
  trackPixelEvent('Purchase', eventData, eventId);
}

export function trackLead(eventData?: FacebookEventData, eventId?: string): void {
  trackPixelEvent('Lead', eventData, eventId);
}

export function trackViewContent(eventData: FacebookEventData, eventId?: string): void {
  trackPixelEvent('ViewContent', eventData, eventId);
}

export function initPixelScript(): string {
  return `
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${FB_CONFIG.PIXEL_ID}');
  `;
}

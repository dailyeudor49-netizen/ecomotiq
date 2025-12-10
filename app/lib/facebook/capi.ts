import { FB_CONFIG, FacebookEventData, UserData } from '@/app/config/facebook';
import { hashNome, hashCognome, hashTelefono, hashEmail } from './hash';
import { getFbp, getFbc, getUtmParams } from './pixel';

export interface CAPIPayload {
  event_name: string;
  event_id: string;
  event_source_url: string;
  timestamp: number;
  pixel_id: string;
  token: string;
  nome_hash: string;
  cognome_hash: string;
  telefono_hash: string;
  email_hash?: string;
  indirizzo: string;
  user_agent: string;
  fbp: string;
  fbc: string;
  content_name: string;
  content_category: string;
  content_ids: string;
  content_type: string;
  currency: string;
  value: number;
  quantity: number;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  page_title: string;
  referrer: string;
  language: string;
  screen_resolution: string;
  test_event_code?: string;
}

export function getUserDataFromStorage(): UserData {
  if (typeof window === 'undefined') return {};
  const storedData = localStorage.getItem('userData');
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch {
      // ignore
    }
  }
  const urlParams = new URLSearchParams(window.location.search);
  return {
    nome: urlParams.get('nome') || '',
    cognome: urlParams.get('cognome') || '',
    telefono: urlParams.get('telefono') || '',
    indirizzo: urlParams.get('indirizzo') || '',
    email: urlParams.get('email') || '',
  };
}

export function saveUserDataToStorage(userData: UserData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem('userData', JSON.stringify(userData));
}

export async function buildCAPIPayload(
  eventName: string,
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<CAPIPayload> {
  const utmParams = getUtmParams();
  const [nomeHash, cognomeHash, telefonoHash, emailHash] = await Promise.all([
    hashNome(userData.nome || ''),
    hashCognome(userData.cognome || ''),
    hashTelefono(userData.telefono || ''),
    hashEmail(userData.email || ''),
  ]);

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
  const eventSourceUrl = `${FB_CONFIG.DOMAIN}${pathname}`;

  const payload: CAPIPayload = {
    event_name: eventName,
    event_id: eventId,
    event_source_url: eventSourceUrl,
    timestamp: Math.floor(Date.now() / 1000),
    pixel_id: FB_CONFIG.PIXEL_ID,
    token: FB_CONFIG.ACCESS_TOKEN,
    nome_hash: nomeHash,
    cognome_hash: cognomeHash,
    telefono_hash: telefonoHash,
    email_hash: emailHash,
    indirizzo: userData.indirizzo || '',
    user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    fbp: getFbp(),
    fbc: getFbc(),
    content_name: eventData?.content_name || '',
    content_category: eventData?.content_category || '',
    content_ids: eventData?.content_ids || '',
    content_type: eventData?.content_type || 'product',
    currency: eventData?.currency || 'EUR',
    value: eventData?.value || 0,
    quantity: eventData?.quantity || 1,
    utm_source: utmParams.utm_source,
    utm_medium: utmParams.utm_medium,
    utm_campaign: utmParams.utm_campaign,
    utm_content: utmParams.utm_content,
    utm_term: utmParams.utm_term,
    page_title: typeof document !== 'undefined' ? document.title : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    language: typeof navigator !== 'undefined' ? navigator.language : '',
    screen_resolution: typeof window !== 'undefined' ? `${window.screen.width}x${window.screen.height}` : '',
  };

  if (FB_CONFIG.TEST_EVENT_CODE) {
    payload.test_event_code = FB_CONFIG.TEST_EVENT_CODE;
  }

  return payload;
}

export async function sendToCAPI(payload: CAPIPayload): Promise<boolean> {
  try {
    const response = await fetch(FB_CONFIG.CAPI_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function trackLeadCAPI(
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<boolean> {
  const payload = await buildCAPIPayload('Lead', eventId, userData, eventData);
  return sendToCAPI(payload);
}

export async function trackPurchaseCAPI(
  eventId: string,
  userData: UserData,
  eventData?: FacebookEventData
): Promise<boolean> {
  const payload = await buildCAPIPayload('Purchase', eventId, userData, eventData);
  return sendToCAPI(payload);
}

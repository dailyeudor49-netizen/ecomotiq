export const FB_CONFIG = { PIXEL_ID: '', ACCESS_TOKEN: '', CAPI_WEBHOOK_URL: '', DOMAIN: 'https://www.ecomotiq.com', TEST_EVENT_CODE: '' } as const;
export type FacebookEventName = 'PageView' | 'Purchase' | 'Lead' | 'CompleteRegistration' | 'AddToCart' | 'InitiateCheckout' | 'ViewContent';
export interface FacebookEventData { content_name?: string; content_category?: string; content_ids?: string; content_type?: string; currency?: string; value?: number; quantity?: number; }
export interface UserData { nome?: string; cognome?: string; telefono?: string; indirizzo?: string; email?: string; }

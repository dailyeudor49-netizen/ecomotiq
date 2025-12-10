export interface GoogleAdsCountryConfig { conversionId: string; conversionLabel: string; currency: string; }
export const GOOGLE_ADS_BY_COUNTRY: Record<string, GoogleAdsCountryConfig> = {};
export function getCountryFromPath(pathname: string): string | null { const match = pathname.match(/-([a-z]{2})$/i); return match ? match[1].toLowerCase() : null; }
export function isGoogleAdsLanding(pathname: string): boolean { return pathname.startsWith('/gg-'); }
export function isGoogleAdsThankYou(pathname: string): boolean { return pathname.startsWith('/ty/ty-gg-'); }
export function getGoogleAdsConfig(countryCode: string): GoogleAdsCountryConfig | null { return GOOGLE_ADS_BY_COUNTRY[countryCode.toLowerCase()] || null; }
export function getPrimaryConversionId(): string | null { const countries = Object.keys(GOOGLE_ADS_BY_COUNTRY); return countries.length === 0 ? null : GOOGLE_ADS_BY_COUNTRY[countries[0]].conversionId; }
export function getAllConversionIds(): string[] { const ids = new Set<string>(); Object.values(GOOGLE_ADS_BY_COUNTRY).forEach(c => ids.add(c.conversionId)); return Array.from(ids); }

import { Locale, defaultLocale, isValidLocale, LOCALE_COOKIE } from './config';
import { cookies } from 'next/headers';

// Translation cache to avoid repeated imports
const translationCache = new Map<Locale, Record<string, string>>();

// Load translations for a locale
export async function loadTranslations(locale: Locale): Promise<Record<string, string>> {
  // Check cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!;
  }

  try {
    const translations = await import(`./locales/${locale}.json`);
    translationCache.set(locale, translations.default);
    return translations.default;
  } catch {
    // Fallback to English if locale file doesn't exist
    if (locale !== defaultLocale) {
      return loadTranslations(defaultLocale);
    }
    return {};
  }
}

// Get current locale from URL (via params) or cookies as fallback
export async function getLocale(locale?: string): Promise<Locale> {
  // If locale is provided (from URL params), validate and use it
  if (locale && isValidLocale(locale)) {
    return locale;
  }
  
  // Fallback to cookie (shouldn't happen with proper routing)
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;
  
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }
  
  return defaultLocale;
}

// Get translations for specific locale
export async function getTranslations(locale?: string): Promise<Record<string, string>> {
  const currentLocale = await getLocale(locale);
  return loadTranslations(currentLocale);
}

// Simple translation function with interpolation
export function translate(
  translations: Record<string, string>,
  key: string,
  values?: Record<string, string | number>
): string {
  let text = translations[key] || key;
  
  if (values) {
    Object.entries(values).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, String(v));
    });
  }
  
  return text;
}
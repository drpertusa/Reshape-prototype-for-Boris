// Minimal i18n configuration
export const locales = ['en', 'fr', 'zh', 'ru', 'ar'] as const;
export const defaultLocale = 'en' as const;
export type Locale = (typeof locales)[number];

// RTL locales
export const rtlLocales = ['ar'] as const;

// Cookie name for locale persistence
export const LOCALE_COOKIE = 'locale';

// Check if locale is valid
export function isValidLocale(locale: unknown): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get direction for locale
export function getDirection(locale: Locale): 'ltr' | 'rtl' {
  return rtlLocales.includes(locale as any) ? 'rtl' : 'ltr';
}
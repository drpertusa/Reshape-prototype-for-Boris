'use client';

import { createContext, useContext } from 'react';

import { Locale, defaultLocale } from './config';

interface I18nContextValue {
  locale: Locale;
  translations: Record<string, string>;
  t: (key: string, values?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue>({
  locale: defaultLocale,
  translations: {},
  t: (key) => key,
});

interface I18nProviderProps {
  locale: Locale;
  translations: Record<string, string>;
  children: React.ReactNode;
}

// Simple client-side translation function
function translate(
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

export function I18nProvider({ locale, translations, children }: I18nProviderProps) {
  const t = (key: string, values?: Record<string, string | number>) => {
    return translate(translations, key, values);
  };

  return (
    <I18nContext.Provider value={{ locale, translations, t }}>
      {children}
    </I18nContext.Provider>
  );
}

// Hook for client components
export function useTranslations() {
  const { t } = useContext(I18nContext);
  return t;
}

// Hook to get current locale
export function useLocale() {
  const { locale } = useContext(I18nContext);
  return locale;
}
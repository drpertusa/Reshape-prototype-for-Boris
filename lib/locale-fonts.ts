import { Locale } from '@/i18n/config'

// Font stacks for different locales
export const localeFontStacks: Record<Locale, string> = {
  en: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fr: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  zh: 'var(--font-inter), -apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif',
  ru: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  ar: 'var(--font-inter), -apple-system, "Segoe UI", Tahoma, Arial, sans-serif',
}

// Display font stacks for different locales  
export const localeDisplayFontStacks: Record<Locale, string> = {
  en: 'var(--font-lava-chicken-serif), Georgia, serif',
  fr: 'var(--font-lava-chicken-serif), Georgia, serif',
  zh: 'var(--font-lava-chicken-serif), "Songti SC", "SimSun", serif',
  ru: 'var(--font-lava-chicken-serif), Georgia, serif',
  ar: 'var(--font-lava-chicken-serif), "Times New Roman", serif',
}

// Get CSS variables for locale-specific fonts
export function getLocaleFontVars(locale: Locale) {
  return {
    '--font-body': localeFontStacks[locale],
    '--font-display': localeDisplayFontStacks[locale],
  }
}
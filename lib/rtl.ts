import { Locale, rtlLocales } from '@/i18n/config'

// RTL-aware className utility
export function rtl(locale: Locale, ltrClass: string, rtlClass: string): string {
  return rtlLocales.includes(locale as typeof rtlLocales[number]) ? rtlClass : ltrClass
}

// Direction-aware spacing utilities
export const spacing = {
  marginStart: (locale: Locale, value: string) => rtl(locale, `ml-${value}`, `mr-${value}`),
  marginEnd: (locale: Locale, value: string) => rtl(locale, `mr-${value}`, `ml-${value}`),
  paddingStart: (locale: Locale, value: string) => rtl(locale, `pl-${value}`, `pr-${value}`),
  paddingEnd: (locale: Locale, value: string) => rtl(locale, `pr-${value}`, `pl-${value}`),
  start: (locale: Locale, value: string) => rtl(locale, `left-${value}`, `right-${value}`),
  end: (locale: Locale, value: string) => rtl(locale, `right-${value}`, `left-${value}`),
  textAlign: (locale: Locale, align: 'start' | 'end') => 
    align === 'start' 
      ? rtl(locale, 'text-left', 'text-right')
      : rtl(locale, 'text-right', 'text-left'),
}

// Common RTL patterns
export const rtlPatterns = {
  flexReverse: (locale: Locale) => rtlLocales.includes(locale as typeof rtlLocales[number]) ? 'flex-row-reverse' : '',
  sheetSide: (locale: Locale): 'left' | 'right' => rtlLocales.includes(locale as typeof rtlLocales[number]) ? 'left' : 'right',
}
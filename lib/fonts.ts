import localFont from 'next/font/local'

// LoveFrom Serif - Display font
export const lovefromSerif = localFont({
  src: '../app/fonts/lf-serif-var.woff2',
  variable: '--font-lovefrom',
  display: 'swap',
  weight: 'variable',
  preload: true,
  fallback: ['Georgia', 'serif']
})
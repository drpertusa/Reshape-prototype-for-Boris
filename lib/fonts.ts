import localFont from 'next/font/local'

// LavaChicken Serif - Display font
export const lavaChickenSerif = localFont({
  src: '../app/fonts/lava-chicken-serif-var.woff2',
  variable: '--font-lavachicken',
  display: 'swap',
  weight: 'variable',
  preload: true,
  fallback: ['Georgia', 'serif']
})

// Inter - Body font
export const inter = localFont({
  src: [
    {
      path: '../app/fonts/inter-subset.woff2',
      style: 'normal',
    },
    {
      path: '../app/fonts/inter-italic-subset.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['-apple-system', 'system-ui', 'sans-serif']
})
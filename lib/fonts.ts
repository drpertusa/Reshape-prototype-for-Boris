import localFont from 'next/font/local'

// Fraunces Display Serif - Humanity + Aspiration
// "The display serif introduces a touch of humanity and aspiration—
// reminding patients they're in a place where transformation is both scientific and deeply personal."
export const fraunces = localFont({
  src: [
    {
      path: '../app/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.woff2',
      style: 'normal',
    },
    {
      path: '../app/fonts/Fraunces-Italic-VariableFont_SOFT,WONK,opsz,wght.woff2',
      style: 'italic',
    }
  ],
  variable: '--font-fraunces',
  display: 'swap',
  weight: 'variable',
  preload: true,
  fallback: [
    'ui-serif',
    'Georgia', 
    'Cambria',
    'Times New Roman',
    'Times',
    'serif'
  ]
})

// Inter Sans Serif - Medical Precision  
// "The workhorse sans fulfils the clinic's promise of medical precision."
export const inter = localFont({
  src: [
    {
      path: '../app/fonts/Inter-VariableFont_opsz,wght.woff2',
      style: 'normal',
    },
    {
      path: '../app/fonts/Inter-Italic-VariableFont_opsz,wght.woff2',
      style: 'italic',
    }
  ],
  variable: '--font-inter',
  display: 'swap',
  weight: 'variable',
  preload: true,
  fallback: [
    'ui-sans-serif', 
    'system-ui', 
    '-apple-system', 
    'BlinkMacSystemFont', 
    'Segoe UI', 
    'Roboto', 
    'Helvetica Neue', 
    'Arial', 
    'sans-serif'
  ]
})

// Typography Philosophy: "Inevitability" through constraint
// Two families maintain the visual clarity Ive seeks - avoiding noise, creating focus
export const fontConfig = {
  // Humanity + Aspiration: Headings, branding, transformational messaging
  display: 'font-fraunces',
  // Medical Precision: Body text, forms, clinical information, UI elements  
  body: 'font-inter'
}
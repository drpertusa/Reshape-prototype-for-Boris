// Simple layout for testing
import type React from "react"

// This is required for static generation of locale routes
export async function generateStaticParams() {
  const locales = ['en', 'fr', 'es', 'zh', 'ru', 'ar'];
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function SimpleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  
  return (
    <html lang={locale}>
      <body style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
        <h1>Simple Layout Test - Locale: {locale}</h1>
        {children}
      </body>
    </html>
  )
}
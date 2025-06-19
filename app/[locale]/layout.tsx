import type React from "react"

import { notFound } from "next/navigation"

import { ThemeProvider } from "next-themes"

import { CookieConsent } from "@/components/cookie-consent"
import { ResourceHints } from "@/components/resource-hints"
import { AlternateLinks } from "@/components/seo/alternate-links"
import { WebVitals } from "@/components/web-vitals"
import { I18nProvider } from "@/i18n/client"
import { Locale, locales, getDirection } from "@/i18n/config"
import { getTranslations } from "@/i18n/server"
// Temporarily disable font imports to debug
// import { lavaChickenSerif, inter } from "@/lib/fonts"
import { generatePageMetadata } from "@/lib/seo-utils"
import { generateStructuredData } from "@/lib/structured-data"

import type { Metadata } from "next"

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const translations = await getTranslations(locale)
  
  return generatePageMetadata({
    title: `${translations.site_name} - ${translations.site_tagline}`,
    description: translations.site_description,
    locale,
    path: '',
    keywords: [
      'medical clinic',
      'aesthetic surgery',
      'regenerative medicine',
      'longevity programs',
      'transformation'
    ],
  })
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params
  
  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }
  
  const translations = await getTranslations(locale)
  const direction = getDirection(locale as Locale)
  
  // Generate comprehensive structured data for AI-era SEO
  const jsonLd = generateStructuredData({
    locale: locale as Locale,
    translations,
    page: 'home'
  })
  
  return (
    <html 
      lang={locale} 
      dir={direction}
      suppressHydrationWarning 
      className=""
    >
      <head>
        <ResourceHints />
        <AlternateLinks pathname="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-background text-foreground px-4 py-2 rounded-md">
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider locale={locale as Locale} translations={translations}>
            <WebVitals />
            {children}
            <CookieConsent />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
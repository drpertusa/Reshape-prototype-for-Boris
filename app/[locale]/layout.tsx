import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ThemeProvider } from "next-themes"
import { lavaChickenSerif, inter } from "@/lib/fonts"
import { I18nProvider } from "@/i18n/client"
import { getTranslations } from "@/i18n/server"
import { Locale, locales, getDirection } from "@/i18n/config"
import { CookieConsent } from "@/components/cookie-consent"
import { generateStructuredData } from "@/lib/structured-data"
import { ResourceHints } from "@/components/resource-hints"
import { WebVitals } from "@/components/web-vitals"

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
  const baseUrl = 'https://reshape.clinic'
  
  // Generate alternate language links for SEO
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `/${loc}`;
  });
  
  return {
    title: `${translations.site_name} - ${translations.site_tagline}`,
    description: translations.site_description,
    keywords: "medical clinic, aesthetic surgery, regenerative medicine, longevity programs, transformation",
    authors: [{ name: translations.site_name }],
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: `${translations.site_name} - ${translations.site_tagline}`,
      description: translations.site_description,
      type: "website",
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
      url: `${baseUrl}/${locale}`,
      siteName: translations.site_name,
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: translations.site_name,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${translations.site_name} - ${translations.site_tagline}`,
      description: translations.site_description,
      images: ['/og-image.png'],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
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
      className={`${lavaChickenSerif.variable} ${inter.variable}`}
    >
      <head>
        <ResourceHints />
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
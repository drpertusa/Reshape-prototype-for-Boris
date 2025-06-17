import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ThemeProvider } from "next-themes"
import { lavaChickenSerif, inter } from "@/lib/fonts"
import { I18nProvider } from "@/i18n/client"
import { getTranslations } from "@/i18n/server"
import { Locale, locales, getDirection } from "@/i18n/config"
import { CookieConsent } from "@/components/cookie-consent"

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
  
  // Structured data for MedicalClinic
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': 'https://reshape.clinic',
    name: translations.site_name,
    description: translations.site_description,
    url: `https://reshape.clinic/${locale}`,
    telephone: translations.site_phone,
    email: translations.site_email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: translations.address_street,
      addressLocality: translations.address_city,
      postalCode: translations.address_zip,
      addressCountry: translations.address_country,
    },
    sameAs: [
      'https://twitter.com/reshapeclinic',
      'https://instagram.com/reshapeclinic',
      'https://linkedin.com/company/reshape-clinic'
    ],
    medicalSpecialty: [
      'RegenerativeMedicine',
      'PlasticSurgery',
      'AntiAging'
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: translations.services_regenerative_title,
        description: translations.services_regenerative_desc,
      },
      {
        '@type': 'MedicalProcedure',
        name: translations.services_aesthetic_title,
        description: translations.services_aesthetic_desc,
      },
      {
        '@type': 'MedicalProcedure',
        name: translations.services_longevity_title,
        description: translations.services_longevity_desc,
      }
    ],
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00'
    }
  }
  
  return (
    <html 
      lang={locale} 
      dir={direction}
      suppressHydrationWarning 
      className={`${lavaChickenSerif.variable} ${inter.variable}`}
    >
      <head>
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
            {children}
            <CookieConsent />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
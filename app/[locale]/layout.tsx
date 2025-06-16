import type React from "react"
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ThemeProvider } from "next-themes"
import { lavaChickenSerif, inter } from "@/lib/fonts"
import { I18nProvider } from "@/i18n/client"
import { getTranslations } from "@/i18n/server"
import { Locale, locales, getDirection } from "@/i18n/config"

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
    openGraph: {
      title: `${translations.site_name} - ${translations.site_tagline}`,
      description: translations.site_description,
      type: "website",
      locale: locale,
      alternateLocale: locales.filter(l => l !== locale),
    },
    alternates: {
      languages,
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
  
  return (
    <html 
      lang={locale} 
      dir={direction}
      suppressHydrationWarning 
      className={`${lavaChickenSerif.variable} ${inter.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <I18nProvider locale={locale as Locale} translations={translations}>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
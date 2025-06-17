import { PageLayout } from "@/components/layout/page-layout"
import { Section } from "@/components/layout/section"
import { JsonLd } from "@/components/seo/json-ld"
import type { Locale } from "@/i18n/config"
import { getTranslations } from "@/i18n/server"
import { generatePageMetadata } from "@/lib/seo-utils"
import { generateStructuredData } from "@/lib/structured-data"

import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const translations = await getTranslations(locale)
  
  return generatePageMetadata({
    title: `${translations.contact_hero_title} - ${translations.site_name}`,
    description: translations.contact_meta_description || translations.contact_hero_subtitle,
    locale,
    path: '/contact',
    keywords: ['contact', 'appointment', 'consultation', 'medical clinic London'],
  })
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations(locale)
  
  // Generate structured data for the contact page
  const structuredData = generateStructuredData({
    locale: locale as Locale,
    translations: t,
    page: 'contact',
    breadcrumbs: [
      { name: t.site_name, url: '/' },
      { name: t.contact_hero_title, url: '/contact' }
    ]
  })
  
  return (
    <PageLayout>
      <JsonLd data={structuredData} />

      {/* Hero Section */}
      <Section className="pt-32 pb-12">
        <h1 className="font-display text-4xl md:text-6xl mb-4">
          {t.contact_hero_title}
        </h1>
        <p className="text-xl text-muted-foreground">
          {t.contact_hero_subtitle}
        </p>
      </Section>

      {/* Contact Information Section */}
      <Section className="pb-20 pt-0" containerSize="sm">
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-2">{t.contact_visit_title}</h3>
            <p className="text-muted-foreground">
              {t.address_street}<br />
              {t.address_city} {t.address_zip}<br />
              {t.address_country}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">{t.contact_call_title}</h3>
            <p className="text-muted-foreground">
              <a href={`tel:${t.site_phone}`} className="hover:text-foreground transition-colors">
                {t.site_phone}
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">{t.contact_email_title}</h3>
            <p className="text-muted-foreground">
              <a href={`mailto:${t.site_email}`} className="hover:text-foreground transition-colors">
                {t.site_email}
              </a>
            </p>
          </div>
        </div>
      </Section>

    </PageLayout>
  )
}
import Link from "next/link"

import { PageLayout } from "@/components/layout/page-layout"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"
import { getTranslations } from "@/i18n/server"
import { generatePageMetadata } from "@/lib/seo-utils"

import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const translations = await getTranslations(locale)
  
  return generatePageMetadata({
    title: `${translations.site_name} - ${translations.site_tagline}`,
    description: translations.site_description,
    locale,
    path: '',
  })
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations(locale)
  return (
    <PageLayout>

      {/* Hero Section */}
      <Section className="pt-32 pb-20" containerSize="lg">
        <header className="text-center">
          <h1 className="font-display text-5xl md:text-7xl mb-6 tracking-tight">
            {t.home_hero_title}
            <br />
            <span className="text-primary">{t.home_hero_title_accent}</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.home_hero_subtitle}
          </p>
          <Button size="lg" className="font-medium" asChild>
            <Link href={`/${locale}/contact`}>
              {t.home_hero_cta}
            </Link>
          </Button>
        </header>
      </Section>

      {/* Philosophy Section */}
      <section id="philosophy" aria-label="Our Philosophy">
        <Section variant="muted">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl mb-4">{t.philosophy_title}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.philosophy_intro}
              </p>
            </div>
            <div className="space-y-6">
              <article>
                <h3 className="font-semibold mb-2">{t.philosophy_precision_title}</h3>
                <p className="text-sm text-muted-foreground">{t.philosophy_precision_desc}</p>
              </article>
              <article>
                <h3 className="font-semibold mb-2">{t.philosophy_privacy_title}</h3>
                <p className="text-sm text-muted-foreground">{t.philosophy_privacy_desc}</p>
              </article>
              <article>
                <h3 className="font-semibold mb-2">{t.philosophy_purpose_title}</h3>
                <p className="text-sm text-muted-foreground">{t.philosophy_purpose_desc}</p>
              </article>
            </div>
          </div>
        </Section>
      </section>

      {/* Services Section */}
      <section id="services" aria-label="Our Services">
        <Section>
          <h2 className="font-display text-3xl text-center mb-12">{t.services_title}</h2>
          <div className="grid md:grid-cols-3 gap-8" role="list">
            <article className="text-center" role="listitem">
              <h3 className="font-semibold mb-2">{t.services_regenerative_title}</h3>
              <p className="text-sm text-muted-foreground">{t.services_regenerative_desc}</p>
            </article>
            <article className="text-center" role="listitem">
              <h3 className="font-semibold mb-2">{t.services_aesthetic_title}</h3>
              <p className="text-sm text-muted-foreground">{t.services_aesthetic_desc}</p>
            </article>
            <article className="text-center" role="listitem">
              <h3 className="font-semibold mb-2">{t.services_longevity_title}</h3>
              <p className="text-sm text-muted-foreground">{t.services_longevity_desc}</p>
            </article>
          </div>
        </Section>
      </section>

      {/* CTA Section */}
      <section aria-label="Call to Action">
        <Section className="border-t" containerSize="sm">
          <div className="text-center">
            <h2 className="font-display text-3xl mb-4">{t.cta_title}</h2>
            <p className="text-muted-foreground mb-8">
              {t.cta_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline">{t.cta_learn_more}</Button>
              <Button>{t.cta_schedule}</Button>
            </div>
          </div>
        </Section>
      </section>

    </PageLayout>
  )
}
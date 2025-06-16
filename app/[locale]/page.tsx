import { Button } from "@/components/ui/button"
import { PageLayout } from "@/components/layout/page-layout"
import { Section } from "@/components/layout/section"
import { getTranslations } from "@/i18n/server"
import { locales } from "@/i18n/config"
import type { Metadata } from "next"

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
    alternates: {
      languages,
    },
  }
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const t = await getTranslations(locale)
  return (
    <PageLayout>

      {/* Hero Section */}
      <Section className="pt-32 pb-20" containerSize="lg">
        <div className="text-center">
          <h2 className="font-display text-5xl md:text-7xl mb-6 tracking-tight">
            {t.home_hero_title}
            <br />
            {t.home_hero_title_accent}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            {t.home_hero_subtitle}
          </p>
          <Button size="lg" className="font-medium">
            {t.home_hero_cta}
          </Button>
        </div>
      </Section>

      {/* Philosophy Section */}
      <Section id="philosophy" variant="muted">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display text-3xl mb-4">{t.philosophy_title}</h3>
            <p className="text-muted-foreground leading-relaxed">
              {t.philosophy_intro}
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">{t.philosophy_precision_title}</h4>
              <p className="text-sm text-muted-foreground">{t.philosophy_precision_desc}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t.philosophy_privacy_title}</h4>
              <p className="text-sm text-muted-foreground">{t.philosophy_privacy_desc}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">{t.philosophy_purpose_title}</h4>
              <p className="text-sm text-muted-foreground">{t.philosophy_purpose_desc}</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <h3 className="font-display text-3xl text-center mb-12">{t.services_title}</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h4 className="font-semibold mb-2">{t.services_regenerative_title}</h4>
            <p className="text-sm text-muted-foreground">{t.services_regenerative_desc}</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-2">{t.services_aesthetic_title}</h4>
            <p className="text-sm text-muted-foreground">{t.services_aesthetic_desc}</p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-2">{t.services_longevity_title}</h4>
            <p className="text-sm text-muted-foreground">{t.services_longevity_desc}</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="border-t" containerSize="sm">
        <div className="text-center">
          <h3 className="font-display text-3xl mb-4">{t.cta_title}</h3>
          <p className="text-muted-foreground mb-8">
            {t.cta_subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">{t.cta_learn_more}</Button>
            <Button>{t.cta_schedule}</Button>
          </div>
        </div>
      </Section>

    </PageLayout>
  )
}
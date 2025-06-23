import Link from "next/link"

import { Activity, Stethoscope, UserCheck } from "lucide-react"

import { AnimatedHeroText } from "@/components/animated-hero-text"
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
      <div>
      {/* Hero Section */}
      <Section className="pt-[20vh] md:pt-[22vh] pb-20" containerSize="lg">
        <header className="text-center">
          <h1 className="text-[clamp(2.5rem,6vw+1rem,4rem)] tracking-tight font-extrabold">
            {t.home_hero_h1_prefix}
            <br />
            <AnimatedHeroText />
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            {t.home_hero_subtitle}
          </p>
          <Button asChild size="sm" className="font-semibold mt-8 md:mt-12 group">
            <Link href={`/${locale}/contact`}>
              Book Online
              <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">→</span>
            </Link>
          </Button>
        </header>
      </Section>

      {/* The Reshape Difference Section */}
      <section id="philosophy" aria-label="The Reshape Difference">
        <Section>
          <h2 className="text-3xl text-center mb-12 font-light">{t.philosophy_title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <article className="text-center">
              <div className="mb-4 flex justify-center">
                <Stethoscope className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-medium mb-2">{t.philosophy_expertise_title}</h3>
              <p className="text-sm text-muted-foreground">{t.philosophy_expertise_desc}</p>
            </article>
            <article className="text-center">
              <div className="mb-4 flex justify-center">
                <Activity className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold mb-2">{t.philosophy_technology_title}</h3>
              <p className="text-sm text-muted-foreground">{t.philosophy_technology_desc}</p>
            </article>
            <article className="text-center">
              <div className="mb-4 flex justify-center">
                <UserCheck className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-normal mb-2">{t.philosophy_care_title}</h3>
              <p className="text-sm text-muted-foreground">{t.philosophy_care_desc}</p>
            </article>
          </div>
        </Section>
      </section>

      {/* Services Section */}
      <section id="services" aria-label="Our Services">
        <Section gutter="md" variant="muted">
          <h2 className="text-3xl text-center mb-12 font-medium">{t.services_title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" role="list">
            <article className="bg-white dark:bg-black p-6 hover:shadow-sm transition-shadow duration-250" role="listitem">
              <h3 className="font-bold text-xl mb-2">{t.services_exion_title}</h3>
              <p className="text-base mb-4">{t.services_exion_desc}</p>
              <p className="text-sm text-muted-foreground italic mb-4">{t.services_exion_stat}</p>
              <Link href={`/${locale}/exion`} className="text-sm font-medium inline-flex items-center group">
                {t.services_learn_more}
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
            <article className="bg-white dark:bg-black p-6 hover:shadow-sm transition-shadow duration-250" role="listitem">
              <h3 className="font-semibold text-xl mb-2">{t.services_emface_title}</h3>
              <p className="text-base mb-4">{t.services_emface_desc}</p>
              <p className="text-sm text-muted-foreground italic mb-4">{t.services_emface_stat}</p>
              <Link href={`/${locale}/emface`} className="text-sm font-medium inline-flex items-center group">
                {t.services_learn_more}
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
            <article className="bg-white dark:bg-black p-6 hover:shadow-sm transition-shadow duration-250" role="listitem">
              <h3 className="font-medium text-xl mb-2">{t.services_emsculpt_title}</h3>
              <p className="text-base mb-4">{t.services_emsculpt_desc}</p>
              <p className="text-sm text-muted-foreground italic mb-4">{t.services_emsculpt_stat}</p>
              <Link href={`/${locale}/emsculptneo`} className="text-sm font-medium inline-flex items-center group">
                {t.services_learn_more}
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
            <article className="bg-white dark:bg-black p-6 hover:shadow-sm transition-shadow duration-250" role="listitem">
              <h3 className="font-normal text-xl mb-2">{t.services_emsella_title}</h3>
              <p className="text-base mb-4">{t.services_emsella_desc}</p>
              <p className="text-sm text-muted-foreground italic mb-4">{t.services_emsella_stat}</p>
              <Link href={`/${locale}/emsella`} className="text-sm font-medium inline-flex items-center group">
                {t.services_learn_more}
                <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </article>
          </div>
        </Section>
      </section>

      </div>
    </PageLayout>
  )
}
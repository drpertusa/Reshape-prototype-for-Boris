import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/layout/section"
import { T } from "@/i18n/components"
import { getTranslations } from "@/i18n/server"

export default async function ContactPage() {
  const t = await getTranslations()
  
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Section className="pt-32 pb-12">
        <h1 className="font-display text-4xl md:text-6xl mb-4">
          <T id="contact_hero_title" />
        </h1>
        <p className="text-xl text-muted-foreground">
          <T id="contact_hero_subtitle" />
        </p>
      </Section>

      {/* Contact Information Section */}
      <Section className="pb-20 pt-0" containerSize="sm">
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-2"><T id="contact_visit_title" /></h3>
            <p className="text-muted-foreground">
              {t.address_street}<br />
              {t.address_city} {t.address_zip}<br />
              {t.address_country}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2"><T id="contact_call_title" /></h3>
            <p className="text-muted-foreground">
              <a href={`tel:${t.site_phone}`} className="hover:text-foreground transition-colors">
                {t.site_phone}
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2"><T id="contact_email_title" /></h3>
            <p className="text-muted-foreground">
              <a href={`mailto:${t.site_email}`} className="hover:text-foreground transition-colors">
                {t.site_email}
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
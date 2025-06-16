import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/layout/section"
import { T } from "@/i18n/components"

export default async function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Section className="pt-32 pb-20" containerSize="lg">
        <div className="text-center">
          <h2 className="font-display text-5xl md:text-7xl mb-6 tracking-tight">
            <T id="home_hero_title" />
            <br />
            <T id="home_hero_title_accent" />
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            <T id="home_hero_subtitle" />
          </p>
          <Button size="lg" className="font-medium">
            <T id="home_hero_cta" />
          </Button>
        </div>
      </Section>

      {/* Philosophy Section */}
      <Section id="philosophy" variant="muted">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-display text-3xl mb-4"><T id="philosophy_title" /></h3>
            <p className="text-muted-foreground leading-relaxed">
              <T id="philosophy_intro" />
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2"><T id="philosophy_precision_title" /></h4>
              <p className="text-sm text-muted-foreground"><T id="philosophy_precision_desc" /></p>
            </div>
            <div>
              <h4 className="font-semibold mb-2"><T id="philosophy_privacy_title" /></h4>
              <p className="text-sm text-muted-foreground"><T id="philosophy_privacy_desc" /></p>
            </div>
            <div>
              <h4 className="font-semibold mb-2"><T id="philosophy_purpose_title" /></h4>
              <p className="text-sm text-muted-foreground"><T id="philosophy_purpose_desc" /></p>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <h3 className="font-display text-3xl text-center mb-12"><T id="services_title" /></h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h4 className="font-semibold mb-2"><T id="services_regenerative_title" /></h4>
            <p className="text-sm text-muted-foreground"><T id="services_regenerative_desc" /></p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-2"><T id="services_aesthetic_title" /></h4>
            <p className="text-sm text-muted-foreground"><T id="services_aesthetic_desc" /></p>
          </div>
          <div className="text-center">
            <h4 className="font-semibold mb-2"><T id="services_longevity_title" /></h4>
            <p className="text-sm text-muted-foreground"><T id="services_longevity_desc" /></p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="border-t" containerSize="sm">
        <div className="text-center">
          <h3 className="font-display text-3xl mb-4"><T id="cta_title" /></h3>
          <p className="text-muted-foreground mb-8">
            <T id="cta_subtitle" />
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline"><T id="cta_learn_more" /></Button>
            <Button><T id="cta_schedule" /></Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
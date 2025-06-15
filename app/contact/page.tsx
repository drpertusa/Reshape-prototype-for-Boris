import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/layout/section"
import { SITE_CONFIG } from "@/lib/constants"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Section className="pt-32 pb-12">
        <h1 className="font-display text-4xl md:text-6xl mb-4">
          Let&apos;s Begin
        </h1>
        <p className="text-xl text-muted-foreground">
          Your transformation starts with a conversation.
        </p>
      </Section>

      {/* Contact Information Section */}
      <Section className="pb-20 pt-0" containerSize="sm">
        <div className="space-y-8">
          <div>
            <h3 className="font-semibold mb-2">Visit Us</h3>
            <p className="text-muted-foreground">
              {SITE_CONFIG.address.street}<br />
              {SITE_CONFIG.address.city} {SITE_CONFIG.address.zip}<br />
              {SITE_CONFIG.address.country}
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <p className="text-muted-foreground">
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-foreground transition-colors">
                {SITE_CONFIG.phone}
              </a>
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Email Us</h3>
            <p className="text-muted-foreground">
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-foreground transition-colors">
                {SITE_CONFIG.email}
              </a>
            </p>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
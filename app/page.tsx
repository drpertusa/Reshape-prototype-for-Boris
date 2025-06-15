import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/layout/section"
import { SERVICES } from "@/lib/constants"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Section className="pt-32 pb-20" containerSize="lg">
        <div className="text-center">
          <h2 className="font-fraunces text-5xl md:text-7xl mb-6 tracking-tight">
            Where Science Meets
            <br />
            <span className="italic">Transformation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Medical precision. Aesthetic excellence. Your journey to authentic transformation begins with a consultation.
          </p>
          <Button size="lg" className="font-medium">
            Book Consultation
          </Button>
        </div>
      </Section>

      {/* Philosophy Section */}
      <Section id="philosophy" variant="muted">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="font-fraunces text-3xl mb-4">Our Philosophy</h3>
            <p className="text-muted-foreground leading-relaxed">
              At Reshape, we believe in the inevitability of excellence through constraint. 
              Every treatment is precisely calibrated, every outcome thoughtfully considered. 
              We don&apos;t add—we refine.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-2">Precision</h4>
              <p className="text-sm text-muted-foreground">Evidence-based treatments tailored to your unique biology</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Privacy</h4>
              <p className="text-sm text-muted-foreground">Your journey remains confidential, secure, and entirely yours</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Purpose</h4>
              <p className="text-sm text-muted-foreground">Transformation with intention, never mere enhancement</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Services Section */}
      <Section id="services">
        <h3 className="font-fraunces text-3xl text-center mb-12">Services</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.title} className="text-center">
              <h4 className="font-semibold mb-2">{service.title}</h4>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="border-t" containerSize="sm">
        <div className="text-center">
          <h3 className="font-fraunces text-3xl mb-4">Begin Your Transformation</h3>
          <p className="text-muted-foreground mb-8">
            Excellence is not an accident. It is the result of intention, precision, and commitment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline">Learn More</Button>
            <Button>Schedule Consultation</Button>
          </div>
        </div>
      </Section>

      <Footer />
    </div>
  )
}
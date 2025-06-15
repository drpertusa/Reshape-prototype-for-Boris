import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/layout/footer"
import { Section } from "@/components/layout/section"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <Section className="pt-32 pb-12">
        <h1 className="font-fraunces text-4xl md:text-6xl mb-4">
          Let&apos;s Begin
        </h1>
        <p className="text-xl text-muted-foreground">
          Your transformation starts with a conversation.
        </p>
      </Section>

      {/* Contact Form Section */}
      <Section className="pb-20 pt-0" containerSize="sm">
        <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your goals..."
                className="min-h-[120px]"
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full md:w-auto">
              Send Message
            </Button>
        </form>

        {/* Privacy Notice */}
        <p className="mt-8 text-sm text-muted-foreground">
          Your information is protected by end-to-end encryption and will never be shared.
          We typically respond within 24 hours.
        </p>
      </Section>

      <Footer />
    </div>
  )
}
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Navigation } from "@/components/navigation"

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-fraunces text-4xl md:text-6xl mb-4">
            Let&apos;s Begin
          </h1>
          <p className="text-xl text-muted-foreground">
            Your transformation starts with a conversation.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-20 px-6">
        <div className="max-w-2xl mx-auto">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>&copy; 2024 Reshape. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
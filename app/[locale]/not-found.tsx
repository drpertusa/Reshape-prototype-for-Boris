"use client"

import Link from "next/link"

import { Home, Search, ArrowLeft } from "lucide-react"

import { Container } from "@/components/layout/container"
import { PageLayout } from "@/components/layout/page-layout"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <PageLayout>
      <Section className="pt-32 pb-20">
        <Container className="text-center">
          <div className="mx-auto max-w-2xl">
            {/* 404 Status */}
            <h1 className="text-6xl md:text-8xl font-display mb-4">404</h1>
            
            {/* Error Message */}
            <h2 className="text-2xl md:text-3xl font-display mb-4">
              Page Not Found
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              We couldn&apos;t find the page you&apos;re looking for. It might have been moved, 
              deleted, or you may have typed the address incorrectly.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild variant="default" size="lg">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  <Search className="mr-2 h-4 w-4" />
                  Contact Us
                </Link>
              </Button>
            </div>
            
            {/* Back Link */}
            <button
              onClick={() => window.history.back()}
              className="mt-8 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go back to previous page
            </button>
          </div>
          
          {/* SEO-friendly content */}
          <div className="mt-16 text-left max-w-2xl mx-auto">
            <h3 className="font-semibold mb-4">Popular Pages</h3>
            <nav aria-label="Popular pages">
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Services
                  </Link>
                </li>
                <li>
                  <Link href="/#philosophy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Our Philosophy
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Information
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}
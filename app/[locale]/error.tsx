"use client"

import { useEffect } from "react"

import Link from "next/link"

import { AlertTriangle, Home, RefreshCcw } from "lucide-react"

import { Container } from "@/components/layout/container"
import { PageLayout } from "@/components/layout/page-layout"
import { Section } from "@/components/layout/section"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Error boundary caught:", error)
  }, [error])

  return (
    <PageLayout>
      <Section className="pt-32 pb-20">
        <Container className="text-center">
          <div className="mx-auto max-w-2xl">
            {/* Error Icon */}
            <div className="mx-auto w-16 h-16 mb-6 text-muted-foreground">
              <AlertTriangle className="w-full h-full" />
            </div>
            
            {/* Error Message */}
            <h1 className="text-3xl md:text-4xl font-display mb-4">
              Something went wrong
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
              We encountered an unexpected error. Our team has been notified and 
              we&apos;re working to fix this issue.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={reset}
                variant="default" 
                size="lg"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Go to Homepage
                </Link>
              </Button>
            </div>
            
            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === "development" && (
              <details className="mt-12 text-left max-w-2xl mx-auto">
                <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-4 p-4 bg-muted rounded-md text-xs overflow-auto">
                  {error.message}
                  {error.stack && "\n\n" + error.stack}
                  {error.digest && "\n\nDigest: " + error.digest}
                </pre>
              </details>
            )}
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}
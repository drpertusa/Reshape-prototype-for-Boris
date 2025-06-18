import { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { PageLayout } from "@/components/layout/page-layout"
import { Section } from "@/components/layout/section"
import { VitalsMonitor } from "@/components/vitals-monitor"
import { generatePageMetadata } from "@/lib/seo-utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  return generatePageMetadata({
    title: "Performance Monitoring - Core Web Vitals",
    description: "Real-time performance monitoring and Core Web Vitals dashboard",
    locale,
    path: '/monitoring',
    noindex: true, // Don't index monitoring pages
  })
}

export default async function MonitoringPage() {
  return (
    <PageLayout>
      <Section className="pt-24">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display mb-4">
              Performance Monitoring
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Real-time Core Web Vitals and performance metrics
            </p>
            
            <VitalsMonitor />
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}
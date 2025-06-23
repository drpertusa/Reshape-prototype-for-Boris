import { Metadata } from "next"

import { Container } from "@/components/layout/container"
import { PageLayout } from "@/components/layout/page-layout"
import { Prose } from "@/components/layout/prose"
import { Section } from "@/components/layout/section"
import { getTranslations } from "@/i18n/server"
import { generatePageMetadata } from "@/lib/seo-utils"

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations(locale)
  
  return generatePageMetadata({
    title: `${t.privacy_title} - ${t.site_name}`,
    description: t.privacy_meta_description || t.privacy_description,
    locale,
    path: '/privacy',
    keywords: ['privacy policy', 'data protection', 'GDPR', 'medical privacy'],
    noindex: false, // Privacy pages should be indexed
  })
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  const t = await getTranslations(locale)
  
  return (
    <PageLayout>
      <Section className="pt-32 pb-20">
        <Container className="max-w-prose">
          <div>
          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-8 font-bold">
            {t.privacy_title}
          </h1>
          
          {/* Last Updated */}
          <p className="text-sm text-muted-foreground mb-12">
            {t.privacy_last_updated}
          </p>
          
          {/* Introduction */}
          <Prose size="lg">
            <p className="text-lg leading-relaxed mb-8">
              This policy outlines how Reshape Clinic collects, uses, and discloses your information through our website{' '}
              <a 
                href="https://www.reshape.clinic" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:no-underline transition-all duration-250"
              >
                https://www.reshape.clinic
              </a>
              . We may update this from time to time, so please check regularly.
            </p>
            
            {/* Section 1: Our Commitment */}
            <h2 className="text-2xl mt-12 mb-4 font-semibold">
              {t.privacy_commitment_title}
            </h2>
            <p className="mb-6">
              {t.privacy_commitment_text}
            </p>
            
            {/* Section 2: Information We Collect */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_collect_title}
            </h2>
            <p className="mb-4">
              {t.privacy_collect_intro}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>{t.privacy_collect_item1}</li>
              <li>{t.privacy_collect_item2}</li>
              <li>{t.privacy_collect_item3}</li>
            </ul>
            
            {/* Device Information */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_device_title}
            </h2>
            <p className="mb-6">
              We automatically collect device information including browser, IP address, time zone, and cookies. We use Google Analytics and Microsoft Clarity to understand how you use our site. You can opt-out of Google Analytics at{' '}
              <a 
                href="https://tools.google.com/dlpage/gaoptout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="font-medium underline underline-offset-4 hover:no-underline transition-all duration-250"
              >
                https://tools.google.com/dlpage/gaoptout
              </a>
              .
            </p>
            
            {/* Section 3: How We Use Information */}
            <h2 className="text-2xl mt-12 mb-4 font-bold">
              {t.privacy_use_title}
            </h2>
            <p className="mb-6">
              {t.privacy_use_text}
            </p>
            
            {/* Section 4: Medical Records */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_medical_title}
            </h2>
            <p className="mb-6">
              {t.privacy_medical_text}
            </p>
            
            {/* Section 5: Security */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_security_title}
            </h2>
            <p className="mb-6">
              {t.privacy_security_text}
            </p>
            
            {/* Section 6: Your Rights */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_rights_title}
            </h2>
            <p className="mb-4">
              {t.privacy_rights_intro}
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>{t.privacy_rights_item1}</li>
              <li>{t.privacy_rights_item2}</li>
              <li>{t.privacy_rights_item3}</li>
              <li>{t.privacy_rights_item4}</li>
            </ul>
            
            {/* Your Rights (GDPR) */}
            <h2 className="text-2xl mt-12 mb-4 font-light">
              {t.privacy_your_rights_title}
            </h2>
            <p className="mb-6">
              {t.privacy_your_rights_text}
            </p>
            
            {/* Section 7: Cookies */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_cookies_title}
            </h2>
            <p className="mb-6">
              {t.privacy_cookies_text}
            </p>
            
            {/* Section 8: Third Parties */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_third_title}
            </h2>
            <p className="mb-6">
              {t.privacy_third_text}
            </p>
            
            {/* Section 9: International Transfers */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_international_title}
            </h2>
            <p className="mb-6">
              {t.privacy_international_text}
            </p>
            
            {/* Section 10: Changes */}
            <h2 className="text-2xl mt-12 mb-4 font-medium">
              {t.privacy_changes_title}
            </h2>
            <p className="mb-6">
              {t.privacy_changes_text}
            </p>
            
            {/* Contact */}
            <div className="mt-16 pt-8 border-t border-muted">
              <p className="text-lg mb-4">
                {t.privacy_contact}
              </p>
              <a 
                href={`mailto:${t.site_email}`} 
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full hover:bg-black/90 transition-all duration-250 group"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>
                <span className="font-medium">{t.site_email}</span>
                <svg 
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-250" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M9 5l7 7-7 7" 
                  />
                </svg>
              </a>
              
              <p className="mt-8 text-lg">
                For more information about <a 
                  href="https://www.reshape.clinic" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-4 hover:no-underline transition-all duration-250"
                >
                  Reshape
                </a>, visit our main website.
              </p>
            </div>
          </Prose>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}
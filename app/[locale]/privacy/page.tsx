import { Metadata } from "next"
import { getTranslations } from "@/i18n/server"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageLayout } from "@/components/layout/page-layout"

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations(locale)
  const baseUrl = 'https://reshape.clinic'
  
  return {
    title: `${t.privacy_title} - ${t.site_name}`,
    description: t.privacy_description,
    alternates: {
      canonical: `${baseUrl}/${locale}/privacy`,
    },
  }
}

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params
  const t = await getTranslations(locale)
  
  return (
    <PageLayout>
      <Section className="pt-32 pb-20">
        <Container className="max-w-prose">
          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-8">
            {t.privacy_title}
          </h1>
          
          {/* Last Updated */}
          <p className="text-sm text-muted-foreground mb-12">
            {t.privacy_last_updated}
          </p>
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-8">
              {t.privacy_intro}
            </p>
            
            {/* Section 1: Our Commitment */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_commitment_title}
            </h2>
            <p className="mb-6">
              {t.privacy_commitment_text}
            </p>
            
            {/* Section 2: Information We Collect */}
            <h2 className="font-display text-2xl mt-12 mb-4">
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
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_device_title}
            </h2>
            <p className="mb-6">
              {t.privacy_device_text}
            </p>
            
            {/* Section 3: How We Use Information */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_use_title}
            </h2>
            <p className="mb-6">
              {t.privacy_use_text}
            </p>
            
            {/* Section 4: Medical Records */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_medical_title}
            </h2>
            <p className="mb-6">
              {t.privacy_medical_text}
            </p>
            
            {/* Section 5: Security */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_security_title}
            </h2>
            <p className="mb-6">
              {t.privacy_security_text}
            </p>
            
            {/* Section 6: Your Rights */}
            <h2 className="font-display text-2xl mt-12 mb-4">
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
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_your_rights_title}
            </h2>
            <p className="mb-6">
              {t.privacy_your_rights_text}
            </p>
            
            {/* Section 7: Cookies */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_cookies_title}
            </h2>
            <p className="mb-6">
              {t.privacy_cookies_text}
            </p>
            
            {/* Section 8: Third Parties */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_third_title}
            </h2>
            <p className="mb-6">
              {t.privacy_third_text}
            </p>
            
            {/* Section 9: International Transfers */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_international_title}
            </h2>
            <p className="mb-6">
              {t.privacy_international_text}
            </p>
            
            {/* Section 10: Changes */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.privacy_changes_title}
            </h2>
            <p className="mb-6">
              {t.privacy_changes_text}
            </p>
            
            {/* Contact */}
            <div className="mt-16 pt-8 border-t border-muted">
              <p className="text-lg">
                {t.privacy_contact}
              </p>
              <p className="mt-2">
                <a href={`mailto:${t.site_email}`} className="hover:opacity-70 transition-opacity">
                  {t.site_email}
                </a>
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </PageLayout>
  )
}
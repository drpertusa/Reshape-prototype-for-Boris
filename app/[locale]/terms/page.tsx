import { Metadata } from "next"
import { getTranslations } from "@/i18n/server"
import { Container } from "@/components/layout/container"
import { Section } from "@/components/layout/section"
import { PageLayout } from "@/components/layout/page-layout"

interface TermsPageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations(locale)
  
  return {
    title: `${t.terms_title} - ${t.site_name}`,
    description: t.terms_description,
  }
}

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params
  const t = await getTranslations(locale)
  
  return (
    <PageLayout>
      <Section className="min-h-[80vh]">
        <Container className="max-w-prose">
          {/* Title */}
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl mb-8">
            {t.terms_title}
          </h1>
          
          {/* Last Updated */}
          <p className="text-sm text-muted-foreground mb-12">
            {t.terms_last_updated}
          </p>
          
          {/* Introduction */}
          <div className="prose prose-lg max-w-none">
            <p className="text-lg leading-relaxed mb-8">
              {t.terms_intro}
            </p>
            
            {/* Section 1: Our Promise */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.terms_promise_title}
            </h2>
            <p className="mb-6">
              {t.terms_promise_text}
            </p>
            
            {/* Section 2: Your Visit */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.terms_visit_title}
            </h2>
            <p className="mb-6">
              {t.terms_visit_text}
            </p>
            
            {/* Section 3: Medical Excellence */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.terms_excellence_title}
            </h2>
            <p className="mb-6">
              {t.terms_excellence_text}
            </p>
            
            {/* Section 4: Privacy & Confidentiality */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.terms_privacy_title}
            </h2>
            <p className="mb-6">
              {t.terms_privacy_text}
            </p>
            
            {/* Section 5: Investment in Your Health */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.terms_investment_title}
            </h2>
            <p className="mb-6">
              {t.terms_investment_text}
            </p>
            
            {/* Section 6: Intellectual Property */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.terms_intellectual_title}
            </h2>
            <p className="mb-6">
              {t.terms_intellectual_text}
            </p>
            
            {/* Section 7: Limitation of Liability */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.terms_liability_title}
            </h2>
            <p className="mb-6">
              {t.terms_liability_text}
            </p>
            
            {/* Section 8: Changes */}
            <h2 className="font-display text-2xl mt-12 mb-4">
              {t.terms_changes_title}
            </h2>
            <p className="mb-6">
              {t.terms_changes_text}
            </p>
            
            {/* Contact */}
            <div className="mt-16 pt-8 border-t border-muted">
              <p className="text-lg">
                {t.terms_contact}
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
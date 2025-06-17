import { generateFAQSchema, generateBreadcrumbSchema, generateArticleSchema } from '@/lib/seo-utils'
import { site } from '@/lib/site'

import { JsonLd } from './json-ld'

interface StructuredDataProps {
  type: 'website' | 'organization' | 'article' | 'faq' | 'breadcrumb' | 'medical-clinic'
  data?: any
  locale?: string
}

export function StructuredData({ type, data, locale = 'en' }: StructuredDataProps) {
  let schema: any

  switch (type) {
    case 'website':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.config.legalName,
        url: site.url,
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${site.url}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      }
      break

    case 'organization':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: site.config.legalName,
        url: site.url,
        logo: site.absoluteUrl('/logo.png'),
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: site.config.phone,
          contactType: 'customer service',
          availableLanguage: ['English', 'French']
        },
        sameAs: [
          // Add social media URLs when available
        ]
      }
      break

    case 'medical-clinic':
      schema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalClinic',
        name: site.config.legalName,
        image: site.absoluteUrl('/og-image.png'),
        '@id': site.url,
        url: site.url,
        telephone: site.config.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: site.config.address.street,
          addressLocality: site.config.address.city,
          postalCode: site.config.address.zip,
          addressCountry: site.config.address.country
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '09:00',
          closes: '18:00'
        }
      }
      break

    case 'article':
      if (!data) throw new Error('Article data is required')
      schema = generateArticleSchema(data)
      break

    case 'faq':
      if (!data || !data.faqs) throw new Error('FAQ data is required')
      schema = generateFAQSchema(data.faqs)
      break

    case 'breadcrumb':
      if (!data || !data.items) throw new Error('Breadcrumb items are required')
      schema = generateBreadcrumbSchema(data.items, locale)
      break

    default:
      throw new Error(`Unknown structured data type: ${type}`)
  }

  return <JsonLd data={schema} />
}
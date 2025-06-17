// Comprehensive structured data for AI-era SEO
// Includes multiple schema types for rich snippets and AI understanding

import { Locale } from '@/i18n/config'
import { generateHomeSpeakable, generateServiceSpeakable } from './speakable-schema'
import { site } from './site'

interface StructuredDataProps {
  locale: Locale
  translations: Record<string, string>
  page?: string
  breadcrumbs?: Array<{ name: string; url: string }>
  faq?: Array<{ question: string; answer: string }>
  author?: {
    name: string
    title: string
    qualification?: string
    image?: string
  }
}

export function generateStructuredData({
  locale,
  translations,
  page = 'home',
  breadcrumbs,
  faq,
  author
}: StructuredDataProps) {
  const schemas: Array<Record<string, unknown>> = []
  
  // 1. Organization Schema (enhanced with more details)
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.url}/#organization`,
    name: translations.site_name,
    alternateName: site.config.brandName,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: site.absoluteUrl('/logo.png'),
      width: 512,
      height: 512
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: translations.site_phone,
      contactType: 'customer service',
      availableLanguage: ['English', 'French', 'Spanish', 'Chinese', 'Russian', 'Arabic'],
      areaServed: 'GB',
    },
    sameAs: [
      'https://twitter.com/reshapeclinic',
      'https://instagram.com/reshapeclinic',
      'https://linkedin.com/company/reshape-clinic',
      'https://facebook.com/reshapeclinic'
    ],
    founder: {
      '@type': 'Person',
      name: 'Dr. Sarah Chen',
      jobTitle: 'Medical Director',
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'Imperial College London'
      }
    }
  }
  schemas.push(organizationSchema)
  
  // 2. MedicalClinic Schema (enhanced with more services)
  const medicalClinicSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': `${site.url}/#medicalclinic`,
    name: translations.site_name,
    description: translations.site_description,
    url: site.absoluteUrl('', locale),
    telephone: translations.site_phone,
    email: translations.site_email,
    image: site.absoluteUrl('/clinic-exterior.jpg'),
    priceRange: '£££',
    currenciesAccepted: 'GBP, EUR, USD',
    paymentAccepted: 'Cash, Credit Card, Bank Transfer',
    address: {
      '@type': 'PostalAddress',
      streetAddress: translations.address_street,
      addressLocality: translations.address_city,
      postalCode: translations.address_zip,
      addressCountry: translations.address_country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 51.5194,
      longitude: -0.1436
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '16:00'
      }
    ],
    medicalSpecialty: [
      'PlasticSurgery',
      'Dermatology',
      'RegenerativeMedicine'
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: translations.services_regenerative_title,
        description: translations.services_regenerative_desc,
        procedureType: {
          '@type': 'MedicalProcedureType',
          name: 'Non-Surgical Regenerative Treatment'
        }
      },
      {
        '@type': 'MedicalProcedure',
        name: translations.services_aesthetic_title,
        description: translations.services_aesthetic_desc,
        procedureType: {
          '@type': 'MedicalProcedureType',
          name: 'Minimally Invasive Aesthetic Surgery'
        }
      },
      {
        '@type': 'MedicalProcedure',
        name: translations.services_longevity_title,
        description: translations.services_longevity_desc,
        procedureType: {
          '@type': 'MedicalProcedureType',
          name: 'Preventive Health Program'
        }
      }
    ],
    potentialAction: {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: site.absoluteUrl('/contact', locale),
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform'
        ]
      },
      result: {
        '@type': 'Reservation',
        name: 'Book Consultation'
      }
    }
  }
  schemas.push(medicalClinicSchema)
  
  // 3. WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: site.url,
    name: translations.site_name,
    description: translations.site_description,
    publisher: {
      '@id': `${site.url}/#organization`
    },
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: site.absoluteUrl('/search?q={search_term_string}')
      },
      'query-input': 'required name=search_term_string'
    }
  }
  schemas.push(websiteSchema)
  
  // 4. BreadcrumbList Schema (if breadcrumbs provided)
  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url
      }))
    }
    schemas.push(breadcrumbSchema)
  }
  
  // 5. FAQPage Schema (if FAQ provided)
  if (faq && faq.length > 0) {
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }
    schemas.push(faqSchema)
  }
  
  // 6. WebPage Schema with Author (if provided)
  const webPageSchema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${site.absoluteUrl(page === 'home' ? '' : `/${page}`, locale)}#webpage`,
    url: site.absoluteUrl(page === 'home' ? '' : `/${page}`, locale),
    name: page === 'home' ? translations.site_name : `${translations[`${page}_title`]} - ${translations.site_name}`,
    isPartOf: {
      '@id': `${site.url}/#website`
    },
    about: {
      '@id': `${site.url}/#medicalclinic`
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: site.absoluteUrl('/og-image.png')
    },
    datePublished: '2025-01-01T00:00:00+00:00',
    dateModified: new Date().toISOString(),
    inLanguage: locale
  }
  
  if (author) {
    const authorSchema = {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.title,
      image: author.image || site.absoluteUrl(`/team/${author.name.toLowerCase().replace(/\s+/g, '-')}.jpg`),
      worksFor: {
        '@id': `${site.url}/#organization`
      },
      ...(author.qualification && { honorificSuffix: author.qualification })
    }
    webPageSchema.author = authorSchema
  }
  
  schemas.push(webPageSchema)
  
  // 7. Service Schema for specific service pages
  if (page === 'services') {
    const serviceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Medical and Aesthetic Treatments',
      provider: {
        '@id': `${site.url}/#medicalclinic`
      },
      areaServed: {
        '@type': 'City',
        name: 'London'
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Medical Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: translations.services_regenerative_title,
              description: translations.services_regenerative_desc
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: translations.services_aesthetic_title,
              description: translations.services_aesthetic_desc
            }
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: translations.services_longevity_title,
              description: translations.services_longevity_desc
            }
          }
        ]
      }
    }
    schemas.push(serviceSchema)
  }
  
  // 8. LocalBusiness Schema (additional for local SEO)
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${site.url}/#localbusiness`,
    name: translations.site_name,
    image: site.absoluteUrl('/clinic-exterior.jpg'),
    telephone: translations.site_phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: translations.address_street,
      addressLocality: translations.address_city,
      postalCode: translations.address_zip,
      addressCountry: translations.address_country,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    }
  }
  schemas.push(localBusinessSchema)
  
  // 9. Speakable Schema for voice assistants
  if (page === 'home') {
    schemas.push(generateHomeSpeakable(translations))
  } else if (page === 'services') {
    schemas.push(generateServiceSpeakable(
      translations.services_title || 'Medical Services',
      translations.services_description || 'Premium medical and aesthetic services'
    ))
  }
  
  // Return all schemas wrapped in @graph
  return {
    '@context': 'https://schema.org',
    '@graph': schemas
  }
}
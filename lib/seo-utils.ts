// Comprehensive SEO utilities for AI-era optimization

import { Metadata } from 'next'

import { locales } from '@/i18n/config'

import { site } from './site'

interface GenerateMetadataProps {
  title: string
  description: string
  locale: string
  path?: string
  keywords?: string[]
  author?: string
  image?: string
  noindex?: boolean
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
}

// Generate comprehensive metadata for pages
export function generatePageMetadata({
  title,
  description,
  locale,
  path = '',
  keywords = [],
  author,
  image = '/og-image.png',
  noindex = false,
  type = 'website',
  publishedTime,
  modifiedTime
}: GenerateMetadataProps): Metadata {
  const url = site.getCanonicalUrl(path, locale)
  const absoluteImageUrl = image.startsWith('http') ? image : site.absoluteUrl(image)
  
  // Base keywords plus page-specific ones
  const allKeywords = [
    'medical clinic',
    'aesthetic surgery',
    'regenerative medicine',
    'body sculpting',
    'London clinic',
    ...keywords
  ].join(', ')
  
  const metadata: Metadata = {
    title,
    description,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: site.config.legalName }],
    metadataBase: new URL(site.url),
    
    openGraph: {
      title,
      description,
      type: type === 'article' ? 'article' : type === 'profile' ? 'profile' : 'website',
      locale,
      alternateLocale: locales.filter(l => l !== locale),
      url,
      siteName: site.config.legalName,
      images: [
        {
          url: absoluteImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteImageUrl],
    },
    
    alternates: {
      canonical: url,
    },
    
    icons: {
      icon: [
        { url: '/logo-favicon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: '32x32' }
      ],
      apple: [
        { url: '/logo-favicon.svg', type: 'image/svg+xml' }
      ],
      shortcut: '/logo-favicon.svg'
    },
    
    robots: noindex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
  
  return metadata
}

// Generate FAQ structured data
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: site.absoluteUrl(item.url, locale)
    }))
  }
}

// Generate article structured data for blog posts
export function generateArticleSchema({
  title,
  description,
  author,
  publishDate,
  updateDate,
  image,
  locale,
  path
}: {
  title: string
  description: string
  author: { name: string; title?: string }
  publishDate: string
  updateDate?: string
  image?: string
  locale: string
  path: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? site.absoluteUrl(image) : site.absoluteUrl('/og-image.png'),
    datePublished: publishDate,
    dateModified: updateDate || publishDate,
    author: {
      '@type': 'Person',
      name: author.name,
      ...(author.title && { jobTitle: author.title }),
      worksFor: {
        '@type': 'Organization',
        name: site.config.legalName
      }
    },
    publisher: {
      '@type': 'Organization',
      name: site.config.legalName,
      logo: {
        '@type': 'ImageObject',
        url: site.absoluteUrl('/logo.png')
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': site.absoluteUrl(path, locale)
    }
  }
}

// Check if content needs updating based on date
export function isContentStale(lastUpdated: string, daysThreshold = 180): boolean {
  const lastUpdate = new Date(lastUpdated)
  const now = new Date()
  const daysDiff = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24))
  return daysDiff > daysThreshold
}

// Generate reading time estimate
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

// Extract text content for meta descriptions
export function extractTextContent(html: string, maxLength = 160): string {
  // Remove HTML tags
  const text = html.replace(/<[^>]*>/g, '')
  // Remove extra whitespace
  const cleaned = text.replace(/\s+/g, ' ').trim()
  // Truncate to max length
  if (cleaned.length <= maxLength) return cleaned
  return cleaned.substring(0, maxLength - 3) + '...'
}

// Generate sitemap entry
export function generateSitemapEntry({
  url,
  lastModified,
  changeFrequency = 'monthly',
  priority = 0.7
}: {
  url: string
  lastModified?: Date
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
  priority?: number
}) {
  return {
    url,
    lastModified: lastModified || new Date(),
    changeFrequency,
    priority
  }
}

// AI-friendly content formatting
export function formatForAI(content: string): string {
  // Add clear paragraph breaks
  const paragraphs = content.split('\n\n')
  
  // Ensure each paragraph is well-formed
  const formatted = paragraphs
    .filter(p => p.trim().length > 0)
    .map(p => p.trim())
    .join('\n\n')
  
  return formatted
}

// Check for keyword cannibalization
export function checkKeywordCannibalization(
  pages: Array<{ url: string; title: string; keywords: string[] }>
): Array<{ keyword: string; urls: string[] }> {
  const keywordMap = new Map<string, string[]>()
  
  pages.forEach(page => {
    page.keywords.forEach(keyword => {
      const normalized = keyword.toLowerCase().trim()
      if (!keywordMap.has(normalized)) {
        keywordMap.set(normalized, [])
      }
      keywordMap.get(normalized)!.push(page.url)
    })
  })
  
  // Find keywords targeted by multiple pages
  const conflicts: Array<{ keyword: string; urls: string[] }> = []
  keywordMap.forEach((urls, keyword) => {
    if (urls.length > 1) {
      conflicts.push({ keyword, urls })
    }
  })
  
  return conflicts
}
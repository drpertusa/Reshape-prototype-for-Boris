import { MetadataRoute } from 'next'

import { locales } from '@/i18n/config'
import { site } from '@/lib/site'

// TODO: Implement actual content modification tracking
// For now, use static dates but in production, track actual content changes
const LAST_MODIFIED_DATES: Record<string, Date> = {
  '': new Date('2025-06-17'), // Homepage
  '/services': new Date('2025-06-15'),
  '/philosophy': new Date('2025-06-15'),
  '/contact': new Date('2025-06-15'),
  '/privacy': new Date('2025-06-10'),
  '/terms': new Date('2025-06-10'),
}

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/services', '/philosophy', '/contact', '/privacy', '/terms']
  
  // Generate URLs for all locales and routes
  const urls = routes.flatMap(route => 
    locales.map(locale => ({
      url: site.absoluteUrl(route, locale),
      lastModified: LAST_MODIFIED_DATES[route] || new Date(),
      changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.8,
      alternates: {
        languages: {
          'x-default': site.absoluteUrl(route), // Default to English
          ...Object.fromEntries(
            locales.map(l => [l, site.absoluteUrl(route, l)])
          )
        }
      }
    }))
  )

  return urls
}
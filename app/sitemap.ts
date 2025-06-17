import { MetadataRoute } from 'next'
import { locales } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://reshape.clinic'
  const routes = ['', '/services', '/philosophy', '/contact', '/privacy', '/terms']
  
  // Generate URLs for all locales and routes
  const urls = routes.flatMap(route => 
    locales.map(locale => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' as const : 'monthly' as const,
      priority: route === '' ? 1 : route === '/services' ? 0.9 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map(l => [l, `${baseUrl}/${l}${route}`])
        )
      }
    }))
  )

  return urls
}
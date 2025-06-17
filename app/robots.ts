import { MetadataRoute } from 'next'
import { site } from '@/lib/site'

// Dynamic robots.txt generation
export default function robots(): MetadataRoute.Robots {
  const baseUrl = site.url
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/static/'],
        crawlDelay: 1,
      },
      // AI crawlers - ALLOW for AI visibility
      {
        userAgent: [
          'Google-Extended',
          'GPTBot',
          'CCBot',
          'anthropic-ai',
          'Claude-Web',
          'bingbot',
          'PerplexityBot',
          'FacebookBot',
          'Applebot',
          'Bytespider',
        ],
        allow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}

// Note: IndexNow key should be served as a separate static file
// Create public/[indexnow-key].txt with just the key value
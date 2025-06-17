import { SITE_CONFIG } from './constants'

/**
 * Centralized site configuration with environment variable support
 * This is the single source of truth for all URLs and site metadata
 */

// Get base URL from environment or fall back to production URL
export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || `https://${SITE_CONFIG.domain}`

// Ensure URL doesn't have trailing slash
export const BASE_URL = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL

/**
 * Generate absolute URL for a given path
 * @param path - The path to append to the base URL
 * @param locale - Optional locale prefix
 * @returns Absolute URL without trailing slash
 */
export function absoluteUrl(path: string, locale?: string): string {
  // Remove leading slash from path if present
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Build URL parts
  const parts = [BASE_URL]
  if (locale && locale !== 'en') {
    parts.push(locale)
  }
  if (cleanPath) {
    parts.push(cleanPath)
  }
  
  // Join and clean up any double slashes
  const url = parts.join('/').replace(/\/+/g, '/')
  
  // Ensure protocol is preserved
  return url.replace(/^https?:\//, (match) => match)
}

/**
 * Get canonical URL for a page
 * @param path - The path of the page
 * @param locale - The locale of the page
 * @returns Canonical URL without trailing slash
 */
export function getCanonicalUrl(path: string, locale?: string): string {
  return absoluteUrl(path, locale)
}

/**
 * Strip marketing parameters from URL
 * @param url - The URL to clean
 * @returns URL without marketing parameters
 */
export function stripMarketingParams(url: string): string {
  const marketingParams = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_term',
    'utm_content',
    'fbclid',
    'gclid',
    'msclkid',
    'mc_cid',
    'mc_eid'
  ]
  
  try {
    // Handle both absolute and relative URLs
    const urlObj = url.startsWith('http') 
      ? new URL(url) 
      : new URL(url, BASE_URL)
    
    marketingParams.forEach(param => urlObj.searchParams.delete(param))
    
    // Return relative URL if input was relative
    if (!url.startsWith('http')) {
      return urlObj.pathname + urlObj.search + urlObj.hash
    }
    
    return urlObj.toString()
  } catch {
    return url
  }
}

/**
 * Site metadata for SEO
 */
export const SITE_METADATA = {
  url: BASE_URL,
  domain: SITE_CONFIG.domain,
  name: SITE_CONFIG.name,
  description: SITE_CONFIG.description,
  phone: SITE_CONFIG.phone,
  email: SITE_CONFIG.email,
  address: SITE_CONFIG.address,
}

/**
 * Export all site configuration
 */
export const site = {
  url: BASE_URL,
  absoluteUrl,
  getCanonicalUrl,
  stripMarketingParams,
  metadata: SITE_METADATA,
  config: SITE_CONFIG,
}
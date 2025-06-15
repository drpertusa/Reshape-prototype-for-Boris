/**
 * Configuration and utilities
 * Dynamic values and helper functions
 */

import { SITE_CONFIG } from "./constants"

/**
 * Get current year for copyright
 */
export function getCurrentYear(): number {
  return new Date().getFullYear()
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
  return phone.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, "$1 ($2) $3-$4")
}

/**
 * Get full address as string
 */
export function getFullAddress(): string {
  const { street, city, state, zip } = SITE_CONFIG.address
  return `${street}, ${city}, ${state} ${zip}`
}

/**
 * Generate meta title
 */
export function generateMetaTitle(pageTitle?: string): string {
  if (!pageTitle) return SITE_CONFIG.name
  return `${pageTitle} | ${SITE_CONFIG.name}`
}

/**
 * Check if link is external
 */
export function isExternalLink(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://")
}

/**
 * Get canonical URL
 */
export function getCanonicalUrl(path: string = ""): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `https://${SITE_CONFIG.domain}`
  return `${baseUrl}${path}`
}
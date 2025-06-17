/**
 * Site-wide constants
 * Single source of truth for all hardcoded values
 */

export const SITE_CONFIG = {
  name: "Reshape",
  legalName: "Reshape Clinic",
  brandName: "Reshape Medical Clinic",
  tagline: "Medical Excellence Through Precision",
  description: "Where science meets transformation. Medical precision, aesthetic excellence, and authentic transformation through evidence-based treatments.",
  domain: "reshape.clinic", // Update when deployed
  email: "media@reshape.clinic",
  phone: "+44 (0)7909 843543",
  address: {
    street: "20 Fitzroy Square",
    city: "London",
    state: "",
    zip: "W1T 6EJ",
    country: "UK"
  }
} as const

export const NAVIGATION_ITEMS = [
  { href: "/", labelKey: "nav_home" },
  { href: "/#services", labelKey: "nav_services" },
  { href: "/#philosophy", labelKey: "nav_philosophy" },
  { href: "/contact", labelKey: "nav_contact" },
] as const

export const FOOTER_LINKS = [
  { href: "/privacy", labelKey: "nav_privacy" },
  { href: "/terms", labelKey: "nav_terms" },
  { href: "/contact", labelKey: "nav_contact" },
] as const

export const SERVICES = [
  {
    title: "Regenerative Medicine",
    description: "Cellular optimization therapies"
  },
  {
    title: "Aesthetic Surgery", 
    description: "Minimalist surgical refinement"
  },
  {
    title: "Longevity Programs",
    description: "Comprehensive age management"
  }
] as const

export const ANIMATION_DURATION = {
  instant: 0,
  fast: 150,
  normal: 250,
  slow: 350,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const
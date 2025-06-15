/**
 * Site-wide constants
 * Single source of truth for all hardcoded values
 */

export const SITE_CONFIG = {
  name: "Reshape",
  tagline: "Medical Excellence Through Precision",
  description: "Where science meets transformation. Medical precision, aesthetic excellence, and authentic transformation through evidence-based treatments.",
  domain: "reshape.clinic", // Update when deployed
  email: "hello@reshape.clinic",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Medical Plaza",
    city: "San Francisco",
    state: "CA",
    zip: "94111",
    country: "USA"
  }
} as const

export const NAVIGATION_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#philosophy", label: "Philosophy" },
  { href: "/contact", label: "Contact" },
] as const

export const FOOTER_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/contact", label: "Contact" },
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
  fast: 200,
  normal: 300,
  slow: 500,
} as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const
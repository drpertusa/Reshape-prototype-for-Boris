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
  { href: "/emsculpt-neo", labelKey: "nav_emsculpt_neo" },
  { href: "/emface", labelKey: "nav_emface" },
  { href: "/exion", labelKey: "nav_exion" },
  { href: "/emsella", labelKey: "nav_emsella" },
  { href: "/injectables", labelKey: "nav_injectables" },
  { href: "/about", labelKey: "nav_about" },
] as const

export const EMSCULPT_SUBMENU_ITEMS = [
  { 
    href: "/emsculpt-neo/look-good", 
    titleKey: "emsculpt_look_good",
    descriptionKey: "emsculpt_look_good_desc"
  },
  { 
    href: "/emsculpt-neo/feel-good", 
    titleKey: "emsculpt_feel_good",
    descriptionKey: "emsculpt_feel_good_desc"
  },
  { 
    href: "/emsculpt-neo/physiotherapist", 
    titleKey: "emsculpt_physiotherapist",
    descriptionKey: "emsculpt_physiotherapist_desc"
  },
  { 
    href: "/emsculpt-neo/athletes", 
    titleKey: "emsculpt_athletes",
    descriptionKey: "emsculpt_athletes_desc"
  },
  { 
    href: "/emsculpt-neo/elderly", 
    titleKey: "emsculpt_elderly",
    descriptionKey: "emsculpt_elderly_desc"
  },
] as const

export const EMFACE_SUBMENU_ITEMS = [
  { 
    href: "/emface/forehead", 
    titleKey: "emface_forehead",
    descriptionKey: "emface_forehead_desc"
  },
  { 
    href: "/emface/eyes", 
    titleKey: "emface_eyes",
    descriptionKey: "emface_eyes_desc"
  },
  { 
    href: "/emface/cheeks", 
    titleKey: "emface_cheeks",
    descriptionKey: "emface_cheeks_desc"
  },
  { 
    href: "/emface/jawline", 
    titleKey: "emface_jawline",
    descriptionKey: "emface_jawline_desc"
  },
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
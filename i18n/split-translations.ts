// Split translations by component/page for lazy loading
export const translationKeys = {
  // Global keys needed everywhere
  global: [
    'site_name',
    'site_tagline',
    'site_description',
    'nav_home',
    'nav_services',
    'nav_philosophy',
    'nav_contact',
    'nav_privacy',
    'nav_terms',
    'nav_menu',
    'nav_toggle_menu',
    'nav_toggle_theme',
  ],
  
  // Page-specific keys
  home: [
    'home_hero_title',
    'home_hero_title_accent',
    'home_hero_subtitle',
    'home_hero_cta',
    'philosophy_title',
    'philosophy_intro',
    'philosophy_precision_title',
    'philosophy_precision_desc',
    'philosophy_privacy_title',
    'philosophy_privacy_desc',
    'philosophy_purpose_title',
    'philosophy_purpose_desc',
    'services_title',
    'services_regenerative_title',
    'services_regenerative_desc',
    'services_aesthetic_title',
    'services_aesthetic_desc',
    'services_longevity_title',
    'services_longevity_desc',
    'cta_title',
    'cta_subtitle',
    'cta_learn_more',
    'cta_schedule',
  ],
  
  contact: [
    'contact_hero_title',
    'contact_hero_subtitle',
    'contact_visit_title',
    'contact_call_title',
    'contact_email_title',
    'site_email',
    'site_phone',
    'address_street',
    'address_city',
    'address_zip',
    'address_country',
  ],
  
  footer: [
    'site_copyright',
  ],
} as const

// Get translations for specific sections
export function filterTranslations(
  allTranslations: Record<string, string>, 
  sections: Array<keyof typeof translationKeys>
): Record<string, string> {
  const keys = sections.flatMap(section => translationKeys[section])
  const filtered: Record<string, string> = {}
  
  keys.forEach(key => {
    if (key in allTranslations) {
      filtered[key] = allTranslations[key]
    }
  })
  
  return filtered
}
// Automated internal linking system for SEO
// Creates smart contextual links between related content

interface Link {
  text: string
  href: string
  title?: string
  relevance: number
}

interface LinkingRule {
  keywords: string[]
  targetPath: string
  title: string
  priority: number
}

// Define linking rules for the clinic
const linkingRules: LinkingRule[] = [
  // Service pages
  {
    keywords: ['regenerative medicine', 'cellular optimization', 'stem cell', 'regenerative'],
    targetPath: '/services#regenerative',
    title: 'Learn about our regenerative medicine treatments',
    priority: 9
  },
  {
    keywords: ['aesthetic surgery', 'surgical refinement', 'plastic surgery', 'cosmetic'],
    targetPath: '/services#aesthetic',
    title: 'Explore our aesthetic surgery options',
    priority: 9
  },
  {
    keywords: ['longevity program', 'age management', 'anti-aging', 'longevity'],
    targetPath: '/services#longevity',
    title: 'Discover our longevity programs',
    priority: 9
  },
  // Philosophy
  {
    keywords: ['philosophy', 'approach', 'methodology', 'precision medicine'],
    targetPath: '/#philosophy',
    title: 'Read about our medical philosophy',
    priority: 7
  },
  // Contact/Booking
  {
    keywords: ['consultation', 'appointment', 'book', 'schedule', 'visit us'],
    targetPath: '/contact',
    title: 'Book your consultation',
    priority: 10
  },
  // Privacy/Legal
  {
    keywords: ['privacy', 'confidential', 'data protection', 'GDPR'],
    targetPath: '/privacy',
    title: 'Read our privacy policy',
    priority: 5
  },
  {
    keywords: ['terms', 'conditions', 'policies', 'cancellation'],
    targetPath: '/terms',
    title: 'View our terms of service',
    priority: 5
  },
  // Medical conditions
  {
    keywords: ['skin rejuvenation', 'wrinkles', 'fine lines', 'aging skin'],
    targetPath: '/services#aesthetic',
    title: 'Treatments for skin rejuvenation',
    priority: 8
  },
  {
    keywords: ['body contouring', 'body sculpting', 'fat reduction'],
    targetPath: '/services#aesthetic',
    title: 'Body contouring solutions',
    priority: 8
  }
]

// Find relevant links in content
export function findInternalLinks(
  content: string,
  currentPath: string,
  locale: string,
  maxLinks: number = 3
): Link[] {
  const links: Link[] = []
  const usedTargets = new Set<string>()
  const contentLower = content.toLowerCase()
  
  // Sort rules by priority
  const sortedRules = [...linkingRules].sort((a, b) => b.priority - a.priority)
  
  for (const rule of sortedRules) {
    // Skip if we already have enough links
    if (links.length >= maxLinks) break
    
    // Skip if we already linked to this target
    const fullPath = `/${locale}${rule.targetPath}`
    if (usedTargets.has(fullPath)) continue
    
    // Skip if this is the current page
    if (currentPath.includes(rule.targetPath.split('#')[0])) continue
    
    // Check if any keywords match
    for (const keyword of rule.keywords) {
      if (contentLower.includes(keyword.toLowerCase())) {
        links.push({
          text: keyword,
          href: fullPath,
          title: rule.title,
          relevance: rule.priority
        })
        usedTargets.add(fullPath)
        break
      }
    }
  }
  
  return links.sort((a, b) => b.relevance - a.relevance)
}

// Add links to HTML content
export function addInternalLinks(
  html: string,
  currentPath: string,
  locale: string,
  options: {
    maxLinks?: number
    className?: string
    attributes?: Record<string, string>
  } = {}
): string {
  const { maxLinks = 3, className = 'internal-link', attributes = {} } = options
  
  // Find potential links
  const links = findInternalLinks(html, currentPath, locale, maxLinks)
  
  if (links.length === 0) return html
  
  let modifiedHtml = html
  const addedLinks = new Set<string>()
  
  for (const link of links) {
    // Skip if we already added this link
    if (addedLinks.has(link.text)) continue
    
    // Create link HTML
    const attrs = Object.entries({
      href: link.href,
      class: className,
      title: link.title,
      ...attributes
    })
      .map(([key, value]) => `${key}="${value}"`)
      .join(' ')
    
    // Replace first occurrence of the keyword (case-insensitive)
    const regex = new RegExp(`\\b(${link.text})\\b(?![^<]*>)`, 'i')
    const replacement = `<a ${attrs}>$1</a>`
    
    const newHtml = modifiedHtml.replace(regex, replacement)
    
    // Only update if replacement was made
    if (newHtml !== modifiedHtml) {
      modifiedHtml = newHtml
      addedLinks.add(link.text)
    }
  }
  
  return modifiedHtml
}

// React component helper (removed - moved to separate component file)

// Analyze content for linking opportunities
export function analyzeLinkingOpportunities(
  content: string,
  currentPath: string
): Array<{ keyword: string; suggestion: string; priority: number }> {
  const opportunities: Array<{ keyword: string; suggestion: string; priority: number }> = []
  const contentLower = content.toLowerCase()
  
  for (const rule of linkingRules) {
    // Skip if this is the current page
    if (currentPath.includes(rule.targetPath.split('#')[0])) continue
    
    for (const keyword of rule.keywords) {
      if (contentLower.includes(keyword.toLowerCase())) {
        opportunities.push({
          keyword,
          suggestion: `Link "${keyword}" to ${rule.targetPath}`,
          priority: rule.priority
        })
      }
    }
  }
  
  return opportunities.sort((a, b) => b.priority - a.priority)
}

// Generate related content suggestions
export function getRelatedContent(
  currentPath: string,
  locale: string,
  limit: number = 3
): Array<{ title: string; href: string; description: string }> {
  const related: Array<{ title: string; href: string; description: string }> = []
  
  // Define content relationships
  const relationships: Record<string, Array<{ title: string; path: string; description: string }>> = {
    '/services': [
      { title: 'Our Philosophy', path: '/#philosophy', description: 'Learn about our approach to medical excellence' },
      { title: 'Book Consultation', path: '/contact', description: 'Start your transformation journey' }
    ],
    '/contact': [
      { title: 'Our Services', path: '/services', description: 'Explore our treatment options' },
      { title: 'Privacy Policy', path: '/privacy', description: 'How we protect your information' }
    ],
    '/privacy': [
      { title: 'Terms of Service', path: '/terms', description: 'Our commitment to you' },
      { title: 'Contact Us', path: '/contact', description: 'Questions about privacy?' }
    ],
    '/terms': [
      { title: 'Privacy Policy', path: '/privacy', description: 'Your data protection rights' },
      { title: 'Book Consultation', path: '/contact', description: 'Ready to begin?' }
    ]
  }
  
  // Find relationships for current path
  const basePathMatches = Object.keys(relationships).filter(path => 
    currentPath.includes(path)
  )
  
  if (basePathMatches.length > 0) {
    const suggestions = relationships[basePathMatches[0]]
    for (const suggestion of suggestions.slice(0, limit)) {
      related.push({
        title: suggestion.title,
        href: `/${locale}${suggestion.path}`,
        description: suggestion.description
      })
    }
  }
  
  // Add default suggestions if needed
  if (related.length < limit) {
    const defaults = [
      { title: 'Our Services', path: '/services', description: 'Explore our medical treatments' },
      { title: 'Book Consultation', path: '/contact', description: 'Start your journey today' },
      { title: 'Our Philosophy', path: '/#philosophy', description: 'Evidence-based excellence' }
    ]
    
    for (const def of defaults) {
      if (related.length >= limit) break
      if (!currentPath.includes(def.path) && !related.find(r => r.href.includes(def.path))) {
        related.push({
          title: def.title,
          href: `/${locale}${def.path}`,
          description: def.description
        })
      }
    }
  }
  
  return related
}
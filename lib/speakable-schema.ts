// Speakable Schema for voice assistants (Google Assistant, Alexa, Siri)
// Marks sections of content that are particularly suitable for text-to-speech

interface SpeakableSection {
  selector?: string[]  // CSS selectors
  xpath?: string[]     // XPath selectors
  content?: string[]   // Direct content URLs
}

interface GenerateSpeakableProps {
  url: string
  sections?: SpeakableSection
  headline?: string
  summary?: string
}

export function generateSpeakableSchema({
  url,
  sections,
  headline,
  summary
}: GenerateSpeakableProps) {
  const schema: Record<string, any> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: headline,
    url: url,
    ...(summary && { description: summary }),
    speakable: {
      '@type': 'SpeakableSpecification',
    }
  }
  
  // Add CSS selectors for voice-friendly content
  if (sections?.selector) {
    schema.speakable.cssSelector = sections.selector
  }
  
  // Add XPath selectors
  if (sections?.xpath) {
    schema.speakable.xpath = sections.xpath
  }
  
  // Add direct content URLs
  if (sections?.content) {
    schema.speakable.url = sections.content
  }
  
  // If no specific sections, use default selectors
  if (!sections) {
    schema.speakable.cssSelector = [
      'h1',                    // Main heading
      '.hero-content',         // Hero section
      '.quick-answer',         // Quick answer blocks
      '.key-points',          // Key takeaways
      'article > p:first-of-type',  // First paragraph
      '.faq-section'          // FAQ content
    ]
  }
  
  return schema
}

// Generate speakable content for home page
export function generateHomeSpeakable(translations: Record<string, string>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: translations.site_name,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        'h1',                    // Site name
        '.hero-subtitle',        // Tagline
        '.philosophy-content',   // Philosophy section
        '.service-card h3',      // Service titles
        '.service-card p',       // Service descriptions
      ]
    }
  }
}

// Generate speakable content for service pages
export function generateServiceSpeakable(serviceName: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: description,
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: [
        'h1',                    // Service name
        '.service-description',  // Main description
        '.treatment-process',    // How it works
        '.benefits-list',       // Benefits
        '.faq-question',        // FAQ questions
        '.faq-answer',          // FAQ answers
      ]
    }
  }
}

// Generate speakable snippet for quick answers
export function generateQuickAnswerSpeakable(question: string, answer: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Question',
    name: question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: answer
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.quick-answer']
    }
  }
}

// Helper to create voice-optimized content
export function createVoiceOptimizedContent(content: string): string {
  // Remove complex punctuation that confuses TTS
  let optimized = content
    .replace(/[""]/g, '"')           // Normalize quotes
    .replace(/['']/g, "'")           // Normalize apostrophes
    .replace(/…/g, '...')            // Replace ellipsis
    .replace(/—/g, ' - ')            // Replace em dash
    .replace(/\s+/g, ' ')            // Normalize whitespace
    .trim()
  
  // Add pauses for better TTS rhythm
  optimized = optimized
    .replace(/\. /g, '. <break time="0.5s"/> ')
    .replace(/\? /g, '? <break time="0.5s"/> ')
    .replace(/! /g, '! <break time="0.5s"/> ')
    .replace(/: /g, ': <break time="0.3s"/> ')
  
  return optimized
}

// Mark content sections as speakable
export function markAsSpeakable(
  content: string,
  type: 'answer' | 'definition' | 'summary' | 'instruction'
): string {
  const speakableClass = `speakable speakable-${type}`
  return `<div class="${speakableClass}" data-speakable="true">${content}</div>`
}
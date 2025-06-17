import { NextRequest, NextResponse } from 'next/server'

// AI crawler detection patterns
const AI_CRAWLER_PATTERNS = [
  // OpenAI
  /GPTBot/i,
  /ChatGPT-User/i,
  
  // Google
  /Google-Extended/i,
  /Googlebot/i,
  
  // Anthropic
  /anthropic-ai/i,
  /Claude-Web/i,
  
  // Microsoft/Bing
  /bingbot/i,
  /BingPreview/i,
  
  // Perplexity
  /PerplexityBot/i,
  
  // Common Crawl
  /CCBot/i,
  /CommonCrawl/i,
  
  // Facebook/Meta
  /FacebookBot/i,
  /facebookexternalhit/i,
  
  // Others
  /Bytespider/i, // ByteDance
  /Applebot/i,   // Apple
  /YandexBot/i,  // Yandex
  /DuckDuckBot/i, // DuckDuckGo
  /SemrushBot/i,  // SEO tools
  /AhrefsBot/i,   // SEO tools
  /DataForSeoBot/i, // SEO tools
]

// Function to detect if user agent is an AI crawler
function detectAICrawler(userAgent: string): {
  isAI: boolean
  crawler?: string
} {
  for (const pattern of AI_CRAWLER_PATTERNS) {
    if (pattern.test(userAgent)) {
      const crawler = userAgent.match(pattern)?.[0] || 'Unknown AI'
      return { isAI: true, crawler }
    }
  }
  return { isAI: false }
}

// Simple in-memory storage for demo (in production, use a database)
const crawlerStats: Record<string, { count: number; lastSeen: string }> = {}

export async function POST(request: NextRequest) {
  try {
    const { userAgent, path, timestamp } = await request.json()
    
    if (!userAgent) {
      return NextResponse.json(
        { error: 'User agent required' },
        { status: 400 }
      )
    }
    
    const { isAI, crawler } = detectAICrawler(userAgent)
    
    if (isAI && crawler) {
      // Update crawler stats
      if (!crawlerStats[crawler]) {
        crawlerStats[crawler] = { count: 0, lastSeen: '' }
      }
      crawlerStats[crawler].count++
      crawlerStats[crawler].lastSeen = timestamp || new Date().toISOString()
      
      // Log to server console in development
      if (process.env.NODE_ENV === 'development' && crawler && path) {
        // eslint-disable-next-line no-console
        console.log(`AI Crawler detected: ${crawler} visiting ${path}`)
      }
    }
    
    return NextResponse.json({
      isAI,
      crawler,
      message: isAI ? 'AI crawler detected' : 'Regular visitor'
    })
  } catch (error) {
    console.error('Analytics error:', error)
    return NextResponse.json(
      { error: 'Failed to process analytics' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve crawler stats
export async function GET() {
  const totalCrawlers = Object.keys(crawlerStats).length
  const totalVisits = Object.values(crawlerStats).reduce((sum, stat) => sum + stat.count, 0)
  
  return NextResponse.json({
    summary: {
      totalCrawlers,
      totalVisits,
      crawlers: crawlerStats
    },
    patterns: AI_CRAWLER_PATTERNS.map(p => p.source)
  })
}
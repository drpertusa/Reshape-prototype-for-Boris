import { NextRequest, NextResponse } from 'next/server'

// In-memory storage for demo purposes
// In production, use a proper analytics service or database
const vitalsData: Array<Record<string, unknown>> = []
const MAX_ENTRIES = 1000

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    // Add timestamp if not provided
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString()
    }
    
    // Store the vitals data
    vitalsData.push(data)
    
    // Keep only the latest entries
    if (vitalsData.length > MAX_ENTRIES) {
      vitalsData.shift()
    }
    
    // Log poor performance metrics in development
    if (process.env.NODE_ENV === 'development' && data.rating === 'poor') {
      console.warn(`Poor ${data.metric} performance:`, {
        value: data.value,
        url: data.url,
        userAgent: data.userAgent
      })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing vitals:', error)
    return NextResponse.json(
      { error: 'Failed to process vitals' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const metric = searchParams.get('metric')
  const timeRange = searchParams.get('timeRange') || '24h'
  
  // Filter data based on parameters
  let filtered = vitalsData
  
  if (metric) {
    filtered = filtered.filter(d => d.metric === metric)
  }
  
  // Filter by time range
  const now = Date.now()
  const timeRanges: Record<string, number> = {
    '1h': 60 * 60 * 1000,
    '24h': 24 * 60 * 60 * 1000,
    '7d': 7 * 24 * 60 * 60 * 1000,
    '30d': 30 * 24 * 60 * 60 * 1000
  }
  
  if (timeRanges[timeRange]) {
    const cutoff = now - timeRanges[timeRange]
    filtered = filtered.filter(d => {
      const timestamp = d.timestamp as string
      return new Date(timestamp).getTime() > cutoff
    })
  }
  
  // Calculate aggregates
  const metrics = ['CLS', 'INP', 'LCP', 'FCP', 'TTFB']
  const aggregates = metrics.reduce((acc, metricName) => {
    const metricData = filtered.filter(d => d.metric === metricName)
    if (metricData.length === 0) return acc
    
    const values = metricData.map(d => d.value as number)
    const ratings = metricData.reduce<Record<string, number>>((r, d) => {
      const rating = d.rating as string
      r[rating] = (r[rating] || 0) + 1
      return r
    }, {})
    
    acc[metricName] = {
      count: metricData.length,
      average: values.reduce((a, b) => a + b, 0) / values.length,
      median: values.sort((a, b) => a - b)[Math.floor(values.length / 2)],
      p75: values.sort((a, b) => a - b)[Math.floor(values.length * 0.75)],
      p95: values.sort((a, b) => a - b)[Math.floor(values.length * 0.95)],
      ratings: {
        good: ratings.good || 0,
        needsImprovement: ratings['needs-improvement'] || 0,
        poor: ratings.poor || 0
      }
    }
    
    return acc
  }, {} as Record<string, unknown>)
  
  return NextResponse.json({
    timeRange,
    totalEntries: filtered.length,
    metrics: aggregates,
    recentEntries: filtered.slice(-10).reverse()
  })
}
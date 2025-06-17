import { NextResponse } from 'next/server'

import { site } from '@/lib/site'

// IndexNow implementation for faster indexing on Bing, Yandex, Seznam, etc.
// This endpoint will be called whenever we publish or update content

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'your-indexnow-key-here'
const INDEXNOW_ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
  'https://api.indexnow.org/indexnow',
]

interface IndexNowPayload {
  host: string
  key: string
  keyLocation: string
  urlList: string[]
}

export async function POST(request: Request) {
  try {
    const { urls } = await request.json()
    
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json(
        { error: 'No URLs provided' },
        { status: 400 }
      )
    }

    const payload: IndexNowPayload = {
      host: site.config.domain,
      key: INDEXNOW_KEY,
      keyLocation: `${site.url}/${INDEXNOW_KEY}.txt`,
      urlList: urls
    }

    // Submit to all IndexNow endpoints
    const submissions = await Promise.allSettled(
      INDEXNOW_ENDPOINTS.map(endpoint =>
        fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })
      )
    )

    const results = submissions.map((result, index) => ({
      endpoint: INDEXNOW_ENDPOINTS[index],
      status: result.status === 'fulfilled' ? result.value.status : 'failed',
      error: result.status === 'rejected' ? result.reason : undefined
    }))

    return NextResponse.json({ 
      message: 'URLs submitted to IndexNow',
      results 
    })
  } catch (error) {
    console.error('IndexNow submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit URLs' },
      { status: 500 }
    )
  }
}

// GET endpoint to verify the API is working
export async function GET() {
  return NextResponse.json({ 
    message: 'IndexNow API endpoint',
    usage: `POST /api/indexnow with { urls: ["${site.url}/..."] }`
  })
}
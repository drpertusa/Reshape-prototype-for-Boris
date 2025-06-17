// IndexNow utility for notifying search engines about content updates

export async function submitToIndexNow(urls: string | string[]) {
  const urlList = Array.isArray(urls) ? urls : [urls]
  
  try {
    const response = await fetch('/api/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ urls: urlList }),
    })
    
    if (!response.ok) {
      throw new Error(`IndexNow submission failed: ${response.status}`)
    }
    
    const result = await response.json()
    // Only log in development
    if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
      console.log('IndexNow submission successful:', result)
    }
    return result
  } catch (error) {
    console.error('IndexNow submission error:', error)
    throw error
  }
}

// Helper to submit current page to IndexNow
export async function submitCurrentPage() {
  if (typeof window !== 'undefined') {
    return submitToIndexNow(window.location.href)
  }
}

// Helper to submit multiple pages
export async function submitPages(paths: string[]) {
  const baseUrl = 'https://reshape.clinic'
  const urls = paths.map(path => `${baseUrl}${path}`)
  return submitToIndexNow(urls)
}
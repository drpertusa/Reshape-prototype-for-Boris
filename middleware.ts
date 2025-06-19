import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple locale configuration
const locales = ['en', 'fr', 'es', 'zh', 'ru', 'ar']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
  // Simple locale detection - just use default for now
  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next()
  }
  
  // Check if pathname has locale
  const segments = pathname.split('/').filter(Boolean)
  const maybeLocale = segments[0]
  const hasLocale = locales.includes(maybeLocale)
  
  if (!hasLocale) {
    // Redirect to locale-prefixed path
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)
    return NextResponse.redirect(newUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
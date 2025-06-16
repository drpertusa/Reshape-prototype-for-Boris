import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, isValidLocale, LOCALE_COOKIE, locales } from './i18n/config';

// Get locale from request
function getLocaleFromRequest(request: NextRequest): string {
  // 1. Check cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    // Simple parsing - just check if any of our locales match
    const browserLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split('-')[0].trim())
      .find(lang => isValidLocale(lang));
    
    if (browserLocale) {
      return browserLocale;
    }
  }

  // 3. Default locale
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip API routes, static files, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }

  // Get locale
  const locale = getLocaleFromRequest(request);
  
  // Set locale cookie if not present
  const response = NextResponse.next();
  if (!request.cookies.has(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
  }
  
  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, isValidLocale, LOCALE_COOKIE, locales } from './i18n/config';

// Get locale from cookie or headers (not from URL)
function getLocale(request: NextRequest): string {
  // 1. Check cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Check Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLocale = acceptLanguage
      .split(',')
      .map(lang => lang.split('-')[0].trim().toLowerCase())
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
  const search = request.nextUrl.search;
  const hash = request.nextUrl.hash;
  
  // Skip internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/fonts')
  ) {
    return NextResponse.next();
  }
  
  // Check for redirect loop protection
  const redirectCount = parseInt(request.headers.get('x-redirect-count') || '0');
  if (redirectCount > 2) {
    console.error('Redirect loop detected!', {
      pathname,
      redirectCount,
      url: request.url
    });
    // Break the loop by accepting the current URL
    return NextResponse.next();
  }

  // Normalize pathname (remove trailing slash except for root and handle double slashes)
  let normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
  // Remove any double slashes
  normalizedPathname = normalizedPathname.replace(/\/+/g, '/');

  // Extract locale from pathname
  const segments = normalizedPathname.split('/').filter(Boolean); // filter(Boolean) removes empty strings
  const potentialLocale = segments[0]; // After filtering, first segment is locale if present
  const pathnameHasValidLocale = potentialLocale && isValidLocale(potentialLocale);

  // Handle multiple locale segments (e.g., /en/fr/page)
  if (segments.length > 1 && segments.filter(seg => locales.includes(seg as any)).length > 1) {
    // Keep only the first locale and remove others
    const firstLocale = segments.find(seg => locales.includes(seg as any));
    const cleanSegments = [firstLocale, ...segments.filter(seg => !locales.includes(seg as any))];
    const cleanPath = '/' + cleanSegments.join('/');
    const newUrl = new URL(`${cleanPath}${search}${hash}`, request.url);
    const response = NextResponse.redirect(newUrl);
    response.headers.set('x-redirect-count', String(redirectCount + 1));
    return response;
  }

  if (pathnameHasValidLocale) {
    const urlLocale = potentialLocale;
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    
    // Always set cookie to match URL locale
    if (urlLocale !== cookieLocale) {
      const response = NextResponse.next();
      response.cookies.set(LOCALE_COOKIE, urlLocale, {
        httpOnly: false, // Allow client-side access
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      });
      return response;
    }
    
    return NextResponse.next();
  }

  // No locale in pathname - redirect to locale-prefixed path
  const locale = getLocale(request);
  const pathWithoutLeadingSlash = normalizedPathname === '/' ? '' : normalizedPathname;
  const newUrl = new URL(`/${locale}${pathWithoutLeadingSlash}${search}${hash}`, request.url);
  
  const response = NextResponse.redirect(newUrl);
  
  // Add redirect count header for loop protection
  response.headers.set('x-redirect-count', String(redirectCount + 1));
  
  // Set cookie to persist choice
  response.cookies.set(LOCALE_COOKIE, locale, {
    httpOnly: false, // Allow client-side access
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    path: '/',
  });
  
  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
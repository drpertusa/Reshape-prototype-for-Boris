import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { defaultLocale, isValidLocale, LOCALE_COOKIE, locales } from './i18n/config';

// Get locale from URL, cookie, or headers
function getLocale(request: NextRequest): string {
  const pathname = request.nextUrl.pathname;
  
  // 1. Check if URL already has a valid locale
  const segments = pathname.split('/');
  const potentialLocale = segments[1];
  
  if (potentialLocale && isValidLocale(potentialLocale)) {
    return potentialLocale;
  }
  
  // 2. Check cookie
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  // 3. Check Accept-Language header
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

  // 4. Default locale
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

  // Normalize pathname (remove trailing slash except for root)
  const normalizedPathname = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  // Extract locale from pathname
  const segments = normalizedPathname.split('/');
  const potentialLocale = segments[1];
  const pathnameHasValidLocale = potentialLocale && isValidLocale(potentialLocale);

  // Handle multiple locale segments (e.g., /en/fr/page)
  if (segments.length > 2 && segments.slice(1).some(seg => locales.includes(seg as any))) {
    // Remove all locale segments and redirect to proper URL
    const cleanPath = '/' + segments.filter(seg => !locales.includes(seg as any)).slice(1).join('/');
    const locale = getLocale(request);
    const newUrl = new URL(`/${locale}${cleanPath || ''}${search}${hash}`, request.url);
    return NextResponse.redirect(newUrl);
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
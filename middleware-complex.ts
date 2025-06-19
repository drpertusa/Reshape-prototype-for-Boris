import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { defaultLocale, isValidLocale, LOCALE_COOKIE, locales } from './i18n/config';
import { stripMarketingParams } from './lib/site';
import { updateSession } from './utils/supabase/middleware';

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

// AI crawler patterns for monitoring
const AI_CRAWLER_PATTERNS = [
  /GPTBot/i,
  /ChatGPT-User/i,
  /Google-Extended/i,
  /anthropic-ai/i,
  /Claude-Web/i,
  /PerplexityBot/i,
  /CCBot/i,
  /Bytespider/i,
];

function isAICrawler(userAgent: string | null): boolean {
  if (!userAgent) return false;
  return AI_CRAWLER_PATTERNS.some(pattern => pattern.test(userAgent));
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const search = request.nextUrl.search;
  const hash = request.nextUrl.hash;
  
  // Update Supabase auth session (with error handling)
  let supabaseResponse: NextResponse;
  try {
    // Only attempt Supabase session update if environment variables are available
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      supabaseResponse = await updateSession(request);
    } else {
      // Fallback to basic NextResponse if Supabase is not configured
      supabaseResponse = NextResponse.next({ request });
    }
  } catch (error) {
    console.warn('Supabase session update failed, continuing without auth:', error);
    supabaseResponse = NextResponse.next({ request });
  }
  
  // Check if URL has marketing parameters that need stripping
  const originalUrl = request.url;
  const cleanedUrl = stripMarketingParams(originalUrl);
  const hasMarketingParams = originalUrl !== cleanedUrl;
  
  // Log AI crawler visits (non-blocking)
  const userAgent = request.headers.get('user-agent');
  if (userAgent && isAICrawler(userAgent) && !pathname.startsWith('/api')) {
    // Fire and forget - don't await
    fetch(new URL('/api/analytics', request.url), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userAgent,
        path: pathname,
        timestamp: new Date().toISOString()
      })
    }).catch(() => {}); // Ignore errors to not affect response
  }
  
  // Skip internal paths and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.startsWith('/fonts')
  ) {
    return supabaseResponse;
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
    return supabaseResponse;
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
    // Copy Supabase cookies
    supabaseResponse.cookies.getAll().forEach(cookie => {
      response.cookies.set(cookie);
    });
    return response;
  }

  if (pathnameHasValidLocale) {
    const urlLocale = potentialLocale;
    const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    
    // Strip marketing parameters if present
    if (hasMarketingParams) {
      const cleanUrl = stripMarketingParams(request.url);
      const finalUrl = new URL(cleanUrl);
      const response = NextResponse.redirect(finalUrl);
      response.headers.set('x-redirect-count', String(redirectCount + 1));
      response.cookies.set(LOCALE_COOKIE, urlLocale, {
        httpOnly: false,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
      });
      // Copy Supabase cookies
      supabaseResponse.cookies.getAll().forEach(cookie => {
        response.cookies.set(cookie);
      });
      return response;
    }
    
    // Always set cookie to match URL locale
    if (urlLocale !== cookieLocale) {
      const response = NextResponse.next(supabaseResponse);
      response.cookies.set(LOCALE_COOKIE, urlLocale, {
        httpOnly: false, // Allow client-side access
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/',
      });
      return response;
    }
    
    return supabaseResponse;
  }

  // No locale in pathname - redirect to locale-prefixed path
  const locale = getLocale(request);
  const pathWithoutLeadingSlash = normalizedPathname === '/' ? '' : normalizedPathname;
  
  // Create new URL with locale prefix
  const newUrl = new URL(`/${locale}${pathWithoutLeadingSlash}${search}${hash}`, request.url);
  
  // Strip marketing parameters if present
  if (hasMarketingParams) {
    const cleanUrl = stripMarketingParams(newUrl.toString());
    const finalUrl = new URL(cleanUrl);
    const response = NextResponse.redirect(finalUrl);
    response.headers.set('x-redirect-count', String(redirectCount + 1));
    response.cookies.set(LOCALE_COOKIE, locale, {
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });
    // Copy Supabase cookies
    supabaseResponse.cookies.getAll().forEach(cookie => {
      response.cookies.set(cookie);
    });
    return response;
  }
  
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
  
  // Copy Supabase cookies
  supabaseResponse.cookies.getAll().forEach(cookie => {
    response.cookies.set(cookie);
  });
  
  return response;
}

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
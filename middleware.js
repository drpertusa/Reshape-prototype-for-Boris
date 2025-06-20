// Use .js extension to avoid TypeScript/ES module issues
export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  // Skip API routes and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return;
  }
  
  // Check if pathname already has a locale
  const locales = ['en', 'fr', 'es', 'zh', 'ru', 'ar'];
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (pathname === '/' || !pathnameHasLocale) {
    // Redirect to /en
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname === '/' ? '' : pathname}`;
    return Response.redirect(url);
  }
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Simple test middleware - just redirect root to /en
  const pathname = request.nextUrl.pathname;
  
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all routes except static files
    '/((?!_next/static|_next/image|favicon.ico|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
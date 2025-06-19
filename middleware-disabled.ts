import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Minimal middleware - just pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Only match root path for now
    '/',
  ],
};
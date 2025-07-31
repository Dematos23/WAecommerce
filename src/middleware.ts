
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const session = await getSession(request);

  const { pathname } = url;
  
  // Protect dashboard routes
  if (pathname.startsWith('/dashboard')) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('next', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

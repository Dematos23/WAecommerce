
import { NextRequest, NextResponse } from 'next/server';
import { getSession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Rewrite requests to handle multi-tenancy
  // The tenant is resolved in a server component (`getTenant`) using headers
  let hostname = request.headers.get('host');
  
  if (!hostname) {
    return new Response(null, { status: 400, statusText: 'No hostname found in request' });
  }
  
  // This is a basic example. In a real app, you'd have a list of known public hostnames.
  const isAppHostname = hostname === process.env.NEXT_PUBLIC_APP_DOMAIN || hostname.includes('localhost');

  const path = url.pathname;

  // Prevent public routes from being rewritten
  if (path.startsWith('/api') || path.startsWith('/_next') || path.startsWith('/static')) {
    return NextResponse.next();
  }

  // Allow access to public homepage, login, register, etc.
  if (isAppHostname && (path === '/' || path.startsWith('/login') || path.startsWith('/register'))) {
      return NextResponse.next();
  }
  
  // If it's a tenant request, let it pass through.
  // The actual tenant resolution happens on the server-side via `getTenant`.
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

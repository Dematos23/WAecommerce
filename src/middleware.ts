
import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // Protect all admin routes
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If user is logged in and tries to access login page, redirect to admin dashboard
  if (pathname === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  // Update session on each request to keep it alive
  if(session) {
    return await updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

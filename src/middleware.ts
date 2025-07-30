
import { NextRequest, NextResponse } from 'next/server';
import { getSession, updateSession } from './lib/auth';

export async function middleware(request: NextRequest) {
  const session = await getSession();
  const { pathname } = request.nextUrl;

  // If user is logged in and tries to access login page, redirect to admin dashboard
  if (pathname === '/admin/login' && session) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }
  
  // Protect all admin routes except the login page
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    // If there is a session, update it and allow the request to proceed.
    return await updateSession(request);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

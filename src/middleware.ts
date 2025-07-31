
import { NextRequest, NextResponse } from 'next/server';

// This middleware is now simplified as Firebase handles auth state on the client.
// We keep it to demonstrate how one might protect routes server-side if using
// Firebase session cookies, but the logic inside is now a pass-through.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Example of how you might protect routes if you were using server-side session validation.
  // For this project, we rely on client-side checks and Firestore rules for security.
  if (pathname.startsWith('/dashboard')) {
    // const sessionCookie = request.cookies.get('session')?.value;
    // if (!sessionCookie) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
    // try {
    //   // Verify the session cookie with Firebase Admin SDK
    //   await admin.auth().verifySessionCookie(sessionCookie, true);
    // } catch (error) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
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

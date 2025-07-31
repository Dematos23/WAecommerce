'use server';

import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

const secretKey = process.env.SESSION_SECRET || 'fallback-secret-key-for-development';
if(process.env.NODE_ENV === 'production' && secretKey === 'fallback-secret-key-for-development'){
    console.error('CRITICAL: process.env.SESSION_SECRET is not set in production. Using fallback key.');
}
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // This can happen if the token is expired or invalid
    return null;
  }
}

export async function login(prevState: { success: boolean; error?: string } | undefined, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // This is a placeholder for actual database user verification
  if (email === 'admin@example.com' && password === 'password') {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ user: { email, tenantId: 'default' }, expires });

    cookies().set('session', session, { expires, httpOnly: true });
    redirect('/dashboard');
  }
  return { success: false, error: 'Usuario o contraseña inválidos' };
}

export async function register(prevState: { success: boolean; error?: string } | undefined, formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
        return { success: false, error: 'Las contraseñas no coinciden.' };
    }

    // This is a placeholder for creating a user in the database.
    // In a real app, you would hash the password and save the user.
    console.log('Registering user:', { name, email });
    
    // For now, we will just log the user in with the new credentials.
    // This is NOT secure and is for demonstration purposes only.
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    const session = await encrypt({ user: { name, email, tenantId: 'new-tenant' }, expires });

    cookies().set('session', session, { expires, httpOnly: true });
    redirect('/dashboard');
}

export async function logout() {
  cookies().set('session', '', { expires: new Date(0) });
  redirect('/login');
}

export async function getSession(request?: NextRequest) {
  const cookieStore = request ? request.cookies : cookies();
  const session = cookieStore.get('session')?.value;
  if (!session) return null;
  return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  if (!session) return NextResponse.next();

  const parsed = await decrypt(session);
  if (!parsed) return NextResponse.next();

  parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
    path: '/',
  });
  return res;
}

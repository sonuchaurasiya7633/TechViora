import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET || 'techviora-super-secure-production-jwt-secret-key-2026'
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('techviora_token')?.value;

  let session: any = null;

  if (token) {
    try {
      const verified = await jwtVerify(token, JWT_SECRET);
      session = verified.payload;
    } catch (err) {
      session = null;
    }
  }

  const isAdminRoute = pathname.startsWith('/admin');
  const isStudentRoute = pathname.startsWith('/student');
  const isAuthRoute = pathname === '/login' || pathname === '/register';

  // Protect Admin routes
  if (isAdminRoute) {
    if (!session || (session.role !== 'admin' && session.role !== 'superadmin')) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Student routes
  if (isStudentRoute) {
    if (!session) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from /login & /register
  if (isAuthRoute && session) {
    if (session.role === 'admin' || session.role === 'superadmin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else {
      return NextResponse.redirect(new URL('/student/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/student/:path*', '/login', '/register'],
};

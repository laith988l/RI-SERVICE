import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
 const path = request.nextUrl.pathname;

 // We only want to protect routes that start with /admin
 if (path.startsWith('/admin')) {
 const session = request.cookies.get('admin_session')?.value;

 // If not authenticated, redirect to login page
 if (!session) {
 const url = new URL('/login', request.url);
 return NextResponse.redirect(url);
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
 * - favicon.ico, sitemap.xml, robots.txt (metadata files)
 */
 '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
 ],
};

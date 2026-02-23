import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Only run on /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {

        // Allow access to login page
        if (request.nextUrl.pathname === '/admin/login') {
            return NextResponse.next();
        }

        // Check for session cookie
        const hasSession = request.cookies.has('admin_session');

        if (!hasSession) {
            // Redirect to login if no session
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    // Protect administrative API routes
    const isApiRoute = request.nextUrl.pathname.startsWith('/api/');
    if (isApiRoute) {
        // We only want to block POST/PUT/DELETE for products and upload
        const isMutatingMethod = ['POST', 'PUT', 'DELETE'].includes(request.method);
        const isAdminApi = request.nextUrl.pathname.startsWith('/api/products') ||
            request.nextUrl.pathname.startsWith('/api/upload');

        // Note: GET /api/products is public but POST/PUT/DELETE should be protected
        // /api/auth/login is public (handled via different path, or it's a POST, so we need to exclude it)
        if (isAdminApi && isMutatingMethod && request.nextUrl.pathname !== '/api/auth/login') {
            const hasSession = request.cookies.has('admin_session');
            if (!hasSession) {
                return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*', '/api/products/:path*', '/api/upload/:path*'],
};

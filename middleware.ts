import {NextRequest, NextResponse} from 'next/server';
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
    exp: number; // Expiration time is usually in seconds (Unix timestamp)
}

// Define protected routes
const protectedRoutes = ['/dashboard', '/settings', '/conversations'];

export function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl;

    // Check if the current route is protected
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
        // Get the token from cookies
        const token = req.cookies.get('token')?.value as string;

        // If no token is found, redirect to login
        if (!token) {
            return NextResponse.redirect(new URL('/', req.url));
        }

        try {
            // Decode the token to check expiration
            const decoded: DecodedToken = jwtDecode(token);

            // Check if the token is expired (exp is in seconds, so we multiply by 1000 to compare with Date.now())
            if (decoded.exp * 1000 < Date.now()) {
                // Token has expired, redirect to login
                return NextResponse.redirect(new URL('/', req.url));
            }

            // Token is valid and not expired, proceed to the next request
            return NextResponse.next();
        } catch (error) {
            // If the token is invalid, redirect to login
            return NextResponse.redirect(new URL('/', req.url));
        }
    }

    // If route is not protected, continue without interruption
    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/settings/:path*', '/conversations/:path*'],
};

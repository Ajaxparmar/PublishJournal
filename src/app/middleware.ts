// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    const { pathname } = request.nextUrl;
    const token = request.nextauth.token;

    // Protect /admin routes
    if (pathname.startsWith("/admin")) {
      // Not logged in → redirect to home page
      if (!token) {
        const homeUrl = new URL("/", request.url);
        homeUrl.searchParams.set("message", "login_required");
        return NextResponse.redirect(homeUrl);
      }

      // Logged in but not ADMIN → redirect to /pages/my-papers
      if (token.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/pages/my-papers", request.url));
      }
    }

    // Protect /pages/my-papers route (for regular users and admins)
    if (pathname.startsWith("/pages/my-papers")) {
      if (!token) {
        const homeUrl = new URL("/", request.url);
        homeUrl.searchParams.set("message", "login_required");
        return NextResponse.redirect(homeUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/pages/my-papers/:path*",
  ],
};
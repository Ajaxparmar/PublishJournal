// // // middleware.ts
// // import { withAuth } from "next-auth/middleware";
// // import { NextResponse } from "next/server";

// // export default withAuth(
// //   function middleware(request) {
// //     const { pathname } = request.nextUrl;
// //     const token = request.nextauth.token;

// //     // Protect /admin routes
// //     if (pathname.startsWith("/admin")) {
// //       // Not logged in → redirect to home page
// //       if (!token) {
// //         const homeUrl = new URL("/", request.url);
// //         homeUrl.searchParams.set("message", "login_required");
// //         return NextResponse.redirect(homeUrl);
// //       }

// //       // Logged in but not ADMIN → redirect to /pages/my-papers
// //       if (token.role !== "ADMIN") {
// //         return NextResponse.redirect(new URL("/pages/my-papers", request.url));
// //       }
// //     }

// //     // Protect /pages/my-papers route (for regular users and admins)
// //     if (pathname.startsWith("/pages/my-papers")) {
// //       if (!token) {
// //         const homeUrl = new URL("/", request.url);
// //         homeUrl.searchParams.set("message", "login_required");
// //         return NextResponse.redirect(homeUrl);
// //       }
// //     }

// //     return NextResponse.next();
// //   },
// //   {
// //     callbacks: {
// //       authorized: ({ token }) => !!token,
// //     },
// //   }
// // );

// // export const config = {
// //   matcher: [
// //     "/admin/:path*",
// //     "/pages/my-papers/:path*",
// //   ],
// // };



// // middleware.ts
// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(request) {
//     const { pathname } = request.nextUrl;
//     const token = request.nextauth.token;

//     // ────────────────────────────────────────────────
//     // 1. Admin area protection
//     // ────────────────────────────────────────────────
//     if (pathname.startsWith("/admin")) {
//       if (!token) {
//         // Not logged in → redirect to home with message
//         const url = new URL("/", request.url);
//         url.searchParams.set("message", "login_required");
//         url.searchParams.set("from", pathname); // optional: remember where they came from
//         return NextResponse.redirect(url);
//       }

//       // Logged in but no admin rights
//       if (token.role !== "ADMIN") {
//         // You can also redirect to a "403 Forbidden" or dashboard page
//         const url = new URL("/pages/my-papers", request.url);
//         url.searchParams.set("message", "admin_access_denied");
//         return NextResponse.redirect(url);
//       }
//     }

//     // ────────────────────────────────────────────────
//     // 2. My Papers (authenticated users only)
//     // ────────────────────────────────────────────────
//     if (pathname.startsWith("/pages/my-papers")) {
//       if (!token) {
//         const url = new URL("/", request.url);
//         url.searchParams.set("message", "login_required");
//         url.searchParams.set("from", pathname);
//         return NextResponse.redirect(url);
//       }
//       // If you later want to restrict it even more (e.g. only certain roles), add here
//     }

//     // All other routes → continue normally
//     return NextResponse.next();
//   },

//   {
//     callbacks: {
//       // This callback is **required** by withAuth when you provide a custom middleware function
//       authorized: ({ token }) => {
//         // We handle authorization manually in the middleware function above,
//         // so we just return true here to avoid double-checking.
//         // (withAuth still needs this callback to be defined)
//         return true;
//       },
//     },
//   }
// );

// export const config = {
//   matcher: [
//     "/admin/:path*",
//     "/pages/my-papers",
//     "/pages/my-papers/:path*", // in case you add sub-pages later (edit, etc.)
//   ],
// };

// middleware.ts   ← root level

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(request) {
    console.log("Middleware triggered for:", request.nextUrl.pathname);
    
    const pathname = request.nextUrl.pathname;
    const token = request.nextauth.token;

    // ── Admin protection ───────────────────────────────────────
    if (pathname.startsWith("/admin") || pathname === "/admin") {
      if (!token) {
        // Not logged in
        const url = new URL("/", request.url);
        url.searchParams.set("message", "login_required");
        url.searchParams.set("from", pathname);
        return NextResponse.redirect(url);
      }

      // Logged in → check role
      if (token.role !== "ADMIN") {
        const url = new URL("/pages/my-papers", request.url);
        url.searchParams.set("message", "admin_only");
        return NextResponse.redirect(url);
      }
    }

    // ── My papers protection (optional – keep if needed) ──────
    if (pathname.startsWith("/pages/my-papers")) {
      if (!token) {
        const url = new URL("/", request.url);
        url.searchParams.set("message", "login_required");
        return NextResponse.redirect(url);
      }
    }

    return NextResponse.next();
  },

  {
    callbacks: {
      authorized: () => true, // ← important: we handle auth manually above
    },
  }
);

export const config = {
  matcher: [
    // Catches /admin, /admin/users, /admin/dashboard/settings etc.
    "/admin",
    "/admin/:path*",

    // If you still want to protect my-papers
    "/pages/my-papers",
    "/pages/my-papers/:path*",
  ],
};
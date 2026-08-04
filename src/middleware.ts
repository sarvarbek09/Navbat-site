import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicPaths = [
  "/",
  "/api/auth",
  "/api/bot-b2c",
  "/api/bot-b2b",
  "/explore",
  "/services",
  "/specialists",
  "/offers",
  "/salons",
  "/blog",
  "/business",
  "/login",
  "/signup",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("navbat_session")?.value;

  if (publicPaths.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  if (!session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/schedule") || pathname.startsWith("/clients") || pathname.startsWith("/earnings")) {
    // B2B routes — role check happens in layout
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

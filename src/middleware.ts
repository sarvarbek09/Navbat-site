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
  // Hozircha login qismi yo'q — b2b sahifalar ham ochiq
  "/dashboard",
  "/schedule",
  "/clients",
  "/earnings",
  "/settings",
  "/my-bookings",
  "/profile",
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Eslatma: "/" prefix hamma yo'lga mos keladi, shuning uchun
  // aniq moslik (exact match) ishlatamiz
  const isPublic =
    publicPaths.some((p) => p === "/" ? pathname === "/" : pathname === p || pathname.startsWith(p + "/"));

  if (isPublic) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  if (pathname === "/" && !token) {
    const loginUrl = new URL("/login", request.nextUrl.origin).toString();
    return NextResponse.redirect(loginUrl);
  }

  if ((pathname === "/dashboard" || pathname === "/dashboard/plan") && !token) {
    const loginUrl = new URL("/login", request.nextUrl.origin).toString();
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/dashboard/esp/") && !token) {
    const loginUrl = new URL("/login", request.nextUrl.origin).toString();
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/login",
    "/dashboard/plan",
    "/dashboard/esp/:path*",
  ],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
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

  if (pathname.startsWith("/dashboard/esp/")) {
    const espname = pathname.split("/").pop();
    if (!token) {
      const loginUrl = new URL("/login", request.nextUrl.origin).toString();
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard", "/dashboard/plan", "/dashboard/esp/:path*"],
};

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const loginUrl = new URL("/login", request.nextUrl.origin).toString();
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/dashboard" && !token) {
    const loginUrl = new URL("/login", request.nextUrl.origin).toString();
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard"],
};

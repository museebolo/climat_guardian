import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default async function proxy(request: NextRequest) {
  const token = request.cookies.get("token");
  const { pathname } = request.nextUrl;

  const isProtected =
    pathname === "/" ||
    pathname === "/dashboard" ||
    pathname === "/dashboard/plan" ||
    pathname.startsWith("/dashboard/esp/");

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/plan",
    "/dashboard/esp/:path*",
  ],
};

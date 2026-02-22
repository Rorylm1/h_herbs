import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    salt: "authjs.session-token",
  });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/account")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname.startsWith("/practitioner")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (token.role !== "practitioner") {
      return NextResponse.redirect(new URL("/account", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/practitioner/:path*"],
};

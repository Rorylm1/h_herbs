import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  if (pathname.startsWith("/account")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  if (pathname.startsWith("/practitioner")) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    if (session.user.role !== "practitioner") {
      return NextResponse.redirect(new URL("/account", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/account/:path*", "/practitioner/:path*"],
};

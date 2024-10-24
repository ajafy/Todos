import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.hostname === "localhost" || url.hostname === "127.0.0.1") {
    return NextResponse.next();
  }

  // Redirect or handle if necessary
  return NextResponse.rewrite(new URL("/", req.url));
}

export const config = {
  matcher: "/api/auth/:path*",
};

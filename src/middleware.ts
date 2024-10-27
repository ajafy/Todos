import { auth } from "auth";
import { NextRequest, NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = await auth();
  if ((!session || !session.user) && request.nextUrl.pathname == "/discover") {
    const newUrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  if (session && session.user && request.nextUrl.pathname == "/") {
    const newUrl = new URL("/discover", request.nextUrl.origin);
    return NextResponse.redirect(newUrl);
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/(.*)",
};

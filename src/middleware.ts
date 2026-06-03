import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SITE_HEADER = "x-site-id";

export function middleware(request: NextRequest) {
  const siteId = request.nextUrl.pathname.startsWith("/proseport")
    ? "proseport"
    : "opr72";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(SITE_HEADER, siteId);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};

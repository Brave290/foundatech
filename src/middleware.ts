import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * SEO Layer: ONE canonical domain (foundatech.name.ng).
 * Redirect disabled until domain is purchased.
 * Re-enable by uncommenting the redirect block below.
 */
// const CANONICAL_HOST = "foundatech.name.ng";

export function middleware(req: NextRequest) {
  // const host = req.headers.get("host") || "";
  // const isProd = process.env.NODE_ENV === "production";
  // if (isProd && host !== CANONICAL_HOST && !host.startsWith("localhost")) {
  //   const url = new URL(req.url);
  //   return NextResponse.redirect(`https://${CANONICAL_HOST}${url.pathname}${url.search}`, 301);
  // }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)"],
};

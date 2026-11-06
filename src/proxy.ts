import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["ru", "en"];
const defaultLocale = "ru";

function getLocale(req: NextRequest) {
  const cookie = req.cookies.get("lang")?.value;
  if (cookie && locales.includes(cookie)) return cookie;
  const headers = { "accept-language": req.headers.get("accept-language") ?? "" };
  const langs = new Negotiator({ headers }).languages();
  try {
    return match(langs, locales, defaultLocale);
  } catch {
    return defaultLocale;
  }
}

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const has = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (has) return;
  req.nextUrl.pathname = `/${getLocale(req)}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(req.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next|og|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|manifest.webmanifest|.*\\..*).*)"],
};

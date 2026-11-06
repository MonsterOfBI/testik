import Link from "next/link";
import type { Locale } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { AGE_RATING, OPERATOR } from "@/lib/legal";
import { CookieSettingsLink } from "@/components/layout/CookieConsent";

export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  const f = dict.footer;
  return (
    <footer className="mt-24 border-t border-line pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-sm text-muted md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
        <div className="max-w-2xl space-y-3">
          <p className="flex items-start gap-3 text-pretty">
            <span
              className="mt-0.5 shrink-0 rounded-md border border-line-strong px-1.5 py-0.5 text-xs font-semibold tabular-nums text-ink-2"
              title={f.age}
              aria-label={`${f.age}: ${AGE_RATING}`}
            >
              {AGE_RATING}
            </span>
            <span>{f.disclaimer}</span>
          </p>
          {(OPERATOR.name || OPERATOR.email) && (
            <p>
              {f.owner}: {OPERATOR.name}
              {OPERATOR.name && OPERATOR.email && ", "}
              {OPERATOR.email && (
                <a href={`mailto:${OPERATOR.email}`} className="hover:text-ink">
                  {OPERATOR.email}
                </a>
              )}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 md:items-end">
          <div className="flex flex-wrap gap-x-4 gap-y-2 md:justify-end">
            <Link href={`/${lang}/about`} className="hover:text-ink">{dict.nav.about}</Link>
            <Link href={`/${lang}/privacy`} className="hover:text-ink">{f.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-ink">{f.terms}</Link>
            <Link href={`/${lang}/consent`} className="hover:text-ink">{f.consent}</Link>
            <CookieSettingsLink label={f.cookies} />
          </div>
          <span>© 2026 testik</span>
        </div>
      </div>
    </footer>
  );
}

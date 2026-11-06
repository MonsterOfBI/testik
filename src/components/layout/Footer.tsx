import Link from "next/link";
import type { Locale } from "@/lib/types";
import type { Dict } from "@/i18n/dict";

export function Footer({ lang, dict }: { lang: Locale; dict: Dict }) {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 text-sm text-muted md:grid-cols-[1fr_auto]">
        <p className="max-w-2xl text-pretty">{dict.footer.disclaimer}</p>
        <div className="flex flex-wrap gap-4 md:justify-end">
          <Link href={`/${lang}/about`} className="hover:text-ink">{dict.nav.about}</Link>
          <Link href={`/${lang}/privacy`} className="hover:text-ink">{dict.footer.privacy}</Link>
          <span>© {2026} testik</span>
        </div>
      </div>
    </footer>
  );
}

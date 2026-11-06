import Link from "next/link";
import type { Locale } from "@/lib/types";
import { md } from "@/lib/md";
import { Md } from "@/components/ui/Disclosure";
import { LEGAL_TITLES, legalDoc, type LegalDocId } from "@/content/legal";

const ORDER: LegalDocId[] = ["privacy", "consent", "terms"];

export function LegalPage({ id, lang }: { id: LegalDocId; lang: Locale }) {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-10">
      <nav className="-mx-1 flex flex-wrap gap-2 text-sm">
        {ORDER.map((d) => (
          <Link
            key={d}
            href={`/${lang}/${d}`}
            aria-current={d === id ? "page" : undefined}
            className={`rounded-xl px-3 py-1.5 transition-colors ${d === id ? "bg-surface-2 text-ink" : "text-muted hover:text-ink"}`}
          >
            {LEGAL_TITLES[d][lang]}
          </Link>
        ))}
      </nav>
      <h1 className="font-display mt-8 text-[clamp(1.8rem,4.5vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-balance">
        {LEGAL_TITLES[id][lang]}
      </h1>
      <Md html={md(legalDoc(id, lang))} className="legal mt-6 !text-[15.5px] [&_h3]:mt-9 [&_h3]:scroll-mt-24 [&_h3]:text-lg [&_table]:block [&_table]:overflow-x-auto" />
    </div>
  );
}

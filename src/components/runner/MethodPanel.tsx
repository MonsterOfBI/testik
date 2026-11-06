"use client";

import type { Locale, TestDef } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { Disclosure, Md } from "@/components/ui/Disclosure";
import { md } from "@/lib/md";

export function MethodPanel({ test, lang, dict }: { test: TestDef; lang: Locale; dict: Dict }) {
  return (
    <div className="mt-2">
      <Disclosure title={dict.test.about}>
        <Md html={md(test.methodology[lang])} />
      </Disclosure>
      <Disclosure title={dict.test.howScored}>
        <Md html={md(test.scoringNotes?.[lang])} />
      </Disclosure>
      {test.sources?.length > 0 && (
        <Disclosure title={`${dict.test.sources} (${test.sources.length})`}>
          <ol className="list-decimal space-y-2 pl-5 text-sm text-ink-2">
            {test.sources.map((s, i) => {
              const href = s.url ?? (s.doi ? `https://doi.org/${s.doi.replace(/^https?:\/\/doi.org\//, "")}` : undefined);
              return (
                <li key={i} className="text-pretty">
                  {s.citation}{" "}
                  {href && (
                    <a href={href} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-2 hover:decoration-ink">
                      {s.doi ? "DOI" : "link"}
                    </a>
                  )}
                </li>
              );
            })}
          </ol>
          <p className="mt-4 text-xs text-muted">
            {dict.test.license}: {test.license}
          </p>
        </Disclosure>
      )}
    </div>
  );
}

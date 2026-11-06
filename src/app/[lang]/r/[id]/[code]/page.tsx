import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { hasLocale } from "@/i18n/config";
import { getDict } from "@/i18n/dict";
import { allMeta, testById } from "@/content/registry";
import { decodeResult } from "@/lib/scoring";
import { ResultView } from "@/components/results/ResultView";

export const instant = false;

export async function generateMetadata({ params }: PageProps<"/[lang]/r/[id]/[code]">): Promise<Metadata> {
  const { lang, id, code } = await params;
  const t = testById(id);
  if (!t || !hasLocale(lang)) return {};
  const r = decodeResult(t, code);
  const o = t.outcomes?.find((x) => x.id === r?.outcomeId);
  const title = o ? `${o.emoji} ${o.title[lang]} — ${t.title[lang]}` : t.title[lang];
  return {
    title,
    description: o?.summary?.[0]?.[lang] ?? t.tagline[lang],
    robots: { index: false, follow: true },
    openGraph: { title, description: t.tagline[lang], images: [`/og/r/${id}/${code}?lang=${lang}`] },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ResultPage({ params }: PageProps<"/[lang]/r/[id]/[code]">) {
  const { lang, id, code } = await params;
  if (!hasLocale(lang)) notFound();
  const test = testById(id);
  if (!test || !decodeResult(test, code)) notFound();
  const related = allMeta()
    .filter((m) => m.id !== id)
    .sort((a, b) => Number(b.category === test.category) - Number(a.category === test.category) || b.popularity - a.popularity)
    .slice(0, 6);
  return (
    <Suspense>
      <ResultView test={test} code={code} lang={lang} dict={getDict(lang)} related={related} />
    </Suspense>
  );
}

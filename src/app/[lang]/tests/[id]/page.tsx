import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { hasLocale, locales } from "@/i18n/config";
import { getDict } from "@/i18n/dict";
import { allMeta, testById, tests } from "@/content/registry";
import { TestExperience } from "@/components/runner/TestExperience";
import { JsonLd } from "@/components/ui/JsonLd";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return locales.flatMap((lang) => tests.map((t) => ({ lang, id: t.id })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/tests/[id]">): Promise<Metadata> {
  const { lang, id } = await params;
  const t = testById(id);
  if (!t || !hasLocale(lang)) return {};
  return {
    title: t.title[lang],
    description: t.description[lang],
    alternates: { canonical: `/${lang}/tests/${id}`, languages: { ru: `/ru/tests/${id}`, en: `/en/tests/${id}` } },
    openGraph: { title: t.title[lang], description: t.tagline[lang], images: [`/og/test/${id}?lang=${lang}`] },
    twitter: { card: "summary_large_image" },
  };
}

export default function TestPage({ params }: PageProps<"/[lang]/tests/[id]">) {
  return (
    <Suspense>
      <TestPageInner params={params} />
    </Suspense>
  );
}

async function TestPageInner({ params }: { params: PageProps<"/[lang]/tests/[id]">["params"] }) {
  const { lang, id } = await params;
  if (!hasLocale(lang)) notFound();
  const test = testById(id);
  if (!test) notFound();
  const dict = getDict(lang);
  const related = allMeta()
    .filter((m) => m.id !== id)
    .sort((a, b) => Number(b.category === test.category) - Number(a.category === test.category) || b.popularity - a.popularity)
    .slice(0, 6);
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: test.title[lang],
          description: test.description[lang],
          url: `${SITE_URL}/${lang}/tests/${id}`,
          inLanguage: lang,
          timeRequired: `PT${test.durationMin}M`,
          educationalUse: test.seriousness === "fun" ? "entertainment" : "self-assessment",
        }}
      />
      <Suspense>
        <TestExperience test={test} lang={lang} dict={dict} related={related} />
      </Suspense>
    </>
  );
}

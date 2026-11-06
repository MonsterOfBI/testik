import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDict } from "@/i18n/dict";
import { tests } from "@/content/registry";
import { toPortraitMeta } from "@/lib/portrait";
import { Cabinet } from "@/components/me/Cabinet";

export const metadata: Metadata = { title: "Кабинет · My space", robots: { index: false } };

export default async function MePage({ params }: PageProps<"/[lang]/me">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <Cabinet lang={lang} dict={getDict(lang)} metas={tests.map(toPortraitMeta)} />;
}

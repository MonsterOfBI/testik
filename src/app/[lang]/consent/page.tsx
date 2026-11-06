import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL_TITLES } from "@/content/legal";

export async function generateMetadata({ params }: PageProps<"/[lang]/consent">): Promise<Metadata> {
  const { lang } = await params;
  return { title: hasLocale(lang) ? LEGAL_TITLES.consent[lang] : LEGAL_TITLES.consent.ru };
}

export default async function Page({ params }: PageProps<"/[lang]/consent">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage id="consent" lang={lang} />;
}

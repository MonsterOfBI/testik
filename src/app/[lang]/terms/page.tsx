import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { LegalPage } from "@/components/legal/LegalPage";
import { LEGAL_TITLES } from "@/content/legal";

export async function generateMetadata({ params }: PageProps<"/[lang]/terms">): Promise<Metadata> {
  const { lang } = await params;
  return { title: hasLocale(lang) ? LEGAL_TITLES.terms[lang] : LEGAL_TITLES.terms.ru };
}

export default async function Page({ params }: PageProps<"/[lang]/terms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return <LegalPage id="terms" lang={lang} />;
}

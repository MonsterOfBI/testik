import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDict } from "@/i18n/dict";
import { allMeta } from "@/content/registry";
import { Hero } from "@/components/home/Hero";
import { Catalog } from "@/components/home/Catalog";
import { HowItWorks } from "@/components/home/HowItWorks";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = getDict(lang);
  const metas = allMeta();
  const featured = metas.find((m) => m.id === "big-five")?.id ?? metas[0]?.id;
  return (
    <>
      <Hero lang={lang} dict={dict} featured={featured} ids={metas.map((m) => m.id)} />
      <Catalog lang={lang} dict={dict} tests={metas} />
      <HowItWorks lang={lang} />
    </>
  );
}

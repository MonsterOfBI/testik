import type { MetadataRoute } from "next";
import { tests } from "@/content/registry";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/privacy"];
  const out: MetadataRoute.Sitemap = [];
  for (const p of pages)
    out.push({ url: `${SITE_URL}/ru${p}`, alternates: { languages: { ru: `${SITE_URL}/ru${p}`, en: `${SITE_URL}/en${p}` } }, priority: p ? 0.4 : 1 });
  for (const t of tests)
    out.push({
      url: `${SITE_URL}/ru/tests/${t.id}`,
      alternates: { languages: { ru: `${SITE_URL}/ru/tests/${t.id}`, en: `${SITE_URL}/en/tests/${t.id}` } },
      priority: 0.5 + t.popularity / 10,
    });
  return out;
}

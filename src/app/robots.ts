import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/ru/r/", "/en/r/", "/ru/me", "/en/me"] }], sitemap: `${SITE_URL}/sitemap.xml` };
}

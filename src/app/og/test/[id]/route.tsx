import { ImageResponse } from "next/og";
import { testById } from "@/content/registry";
import { OgFrame, ogFonts } from "@/lib/og";

export async function GET(req: Request, { params }: RouteContext<"/og/test/[id]">) {
  const { id } = await params;
  const lang = new URL(req.url).searchParams.get("lang") === "en" ? "en" : "ru";
  const t = testById(id);
  if (!t) return new Response("Not found", { status: 404 });
  return new ImageResponse(
    <OgFrame colors={["#c4b2ff", "#ffb3cc", "#9fe6cb"]} emoji={t.emoji} kicker={t.tagline[lang]} title={t.title[lang]} footer={`${t.durationMin} ${lang === "ru" ? "мин" : "min"} · testik`} />,
    { width: 1200, height: 630, fonts: await ogFonts() },
  );
}

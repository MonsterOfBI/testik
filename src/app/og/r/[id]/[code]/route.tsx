import { ImageResponse } from "next/og";
import { testById } from "@/content/registry";
import { decodeResult } from "@/lib/scoring";
import { OgFrame, ogFonts } from "@/lib/og";
import { auraFromScores } from "@/components/ui/auraMath";
import { PALETTE } from "@/lib/ui";

export async function GET(req: Request, { params }: RouteContext<"/og/r/[id]/[code]">) {
  const { id, code } = await params;
  const lang = new URL(req.url).searchParams.get("lang") === "en" ? "en" : "ru";
  const t = testById(id);
  const r = t && decodeResult(t, code);
  if (!t || !r) return new Response("Not found", { status: 404 });
  const o = t.outcomes?.find((x) => x.id === r.outcomeId);
  const facetIds = new Set(t.dimensions.flatMap((d) => d.facets ?? []));
  const main = r.dims.filter((d) => !facetIds.has(d.id));
  const aura = auraFromScores(main.map((d) => d.norm), PALETTE);
  let title = o?.title[lang] ?? "";
  if (!title && r.iq) title = `IQ ≈ ${r.iq}`;
  if (!title && t.kind === "cognitive") title = `${r.correct}/${r.total}`;
  if (!title) {
    const d0 = t.dimensions.find((d) => !facetIds.has(d.id));
    const rd = d0 && r.dims.find((x) => x.id === d0.id);
    title = (d0 && rd && d0.bands[rd.bandIndex]?.label[lang]) || t.title[lang];
  }
  return new ImageResponse(
    <OgFrame
      colors={aura.colors}
      emoji={o?.emoji ?? t.emoji}
      kicker={t.title[lang]}
      title={title}
      footer={lang === "ru" ? "Пройди тест и сравни результаты" : "Take the test and compare results"}
    />,
    { width: 1200, height: 630, fonts: await ogFonts(), headers: { "cache-control": "public, max-age=31536000, immutable" } },
  );
}

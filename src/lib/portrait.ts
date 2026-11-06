import type { L, TestDef } from "./types";

/** Compact per-test info the cabinet needs to label results without loading whole tests */
export interface PortraitMeta {
  id: string;
  title: L;
  emoji: string;
  category: TestDef["category"];
  seriousness: TestDef["seriousness"];
  outcomes: Record<string, { title: L; emoji: string }>;
  dims: { id: string; name: L; bands: L[] }[];
}

export function toPortraitMeta(t: TestDef): PortraitMeta {
  const facetIds = new Set(t.dimensions.flatMap((d) => d.facets ?? []));
  return {
    id: t.id,
    title: t.title,
    emoji: t.emoji,
    category: t.category,
    seriousness: t.seriousness,
    outcomes: Object.fromEntries((t.outcomes ?? []).map((o) => [o.id, { title: o.title, emoji: o.emoji }])),
    dims: t.dimensions.filter((d) => !facetIds.has(d.id)).map((d) => ({ id: d.id, name: d.name, bands: d.bands.map((b) => b.label) })),
  };
}

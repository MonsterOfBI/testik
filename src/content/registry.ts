import { ALL_TESTS } from "./generated";
import type { Category, TestDef, TestMeta } from "@/lib/types";

export const CATEGORY_ORDER: Category[] = [
  "personality",
  "cognitive",
  "mental-health",
  "wellbeing",
  "relationships",
  "career",
  "fun",
];

/** Curated catalog order: a mix of big scientific tests and fun ones near the top */
const ORDER = [
  "big-five", "iq", "spirit-animal", "temperament", "jungian-types", "dessert", "anxiety-gad7",
  "attachment-style", "reaction-time", "emotional-intelligence", "element", "career-riasec",
  "depression-phq9", "city", "chronotype", "dark-triad", "brainrot-meme-energy", "love-languages",
  "stroop", "burnout-cbi", "archetype", "hexaco", "working-memory", "self-esteem", "dog-breed",
  "values-schwartz", "crt", "weather", "empathy", "stress-pss10", "superpower", "n-back",
  "adhd-asrs", "drink", "life-satisfaction", "grit", "cosmic-object", "autism-aq", "leadership-style",
  "career-klimov",
];
const rank = (id: string) => {
  const i = ORDER.indexOf(id);
  return i < 0 ? 999 : i;
};

export const tests: TestDef[] = [...ALL_TESTS].sort(
  (a, b) => rank(a.id) - rank(b.id) || b.popularity - a.popularity || a.id.localeCompare(b.id),
);

export const testById = (id: string) => tests.find((t) => t.id === id);

export const toMeta = (t: TestDef): TestMeta => ({
  id: t.id,
  category: t.category,
  kind: t.kind,
  seriousness: t.seriousness,
  title: t.title,
  tagline: t.tagline,
  description: t.description,
  emoji: t.emoji,
  durationMin: t.durationMin,
  popularity: t.popularity,
  tags: t.tags ?? [],
  questionCount: t.questions?.length ?? 0,
});

export const allMeta = (): TestMeta[] => tests.map(toMeta);

export const sourceCount = () => tests.reduce((n, t) => n + (t.sources?.length ?? 0), 0);

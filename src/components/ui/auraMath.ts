export const DEFAULT_AURA = ["#c4b2ff", "#ffb3cc", "#ffc7a6", "#9fe6cb", "#a3c9ff"];

/** Deterministic aura parameters derived from a result's normalized scores */
export function auraFromScores(norms: number[], palette: string[] = DEFAULT_AURA) {
  const order = norms
    .map((v, i) => ({ v, i }))
    .sort((a, b) => b.v - a.v)
    .slice(0, 5);
  const colors = order.map((o) => palette[o.i % palette.length]).filter((c) => /^#[0-9a-f]{3,8}$/i.test(c ?? ""));
  for (let k = 0; colors.length < 3; k++) colors.push(DEFAULT_AURA[k % DEFAULT_AURA.length]);
  const sizes = order.map((o) => 0.25 + o.v * 0.75);
  const pad = [0.7, 0.55, 0.45];
  while (sizes.length < colors.length) sizes.push(pad[sizes.length % pad.length]);
  const seed = norms.reduce((s, v, i) => s + v * (i + 1) * 3.7, 0.5) % 50;
  return { colors, sizes, seed };
}

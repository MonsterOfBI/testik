import type { Answers, Dimension, DimensionResult, TestDef, TestResult } from "./types";

/** Abramowitz–Stegun approximation of the standard normal CDF */
export function normalCdf(z: number): number {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p =
    d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}

export function percentileFor(dim: Dimension, raw: number): number | undefined {
  if (!dim.norms || !dim.norms.sd) return undefined;
  // strongly floor-skewed scales (e.g. PHQ-9, GAD-7 in the general population) are not normal:
  // a normal-curve percentile would mislead, so we don't show one
  if (!dim.lowerIsBetter && dim.norms.mean - dim.norms.sd < dim.min) return undefined;
  let z = (raw - dim.norms.mean) / dim.norms.sd;
  if (dim.lowerIsBetter) z = -z;
  const p = normalCdf(z) * 100;
  return Math.max(1, Math.min(99, Math.round(p)));
}

export function bandIndexFor(dim: Dimension, raw: number): number {
  if (!dim.bands?.length) return -1;
  const i = dim.bands.findIndex((b) => raw >= b.min && raw <= b.max);
  if (i >= 0) return i;
  // fall back to nearest band (handles fractional means between integer bands)
  let best = 0;
  let bestDist = Infinity;
  dim.bands.forEach((b, idx) => {
    const dist = raw < b.min ? b.min - raw : raw - b.max;
    if (dist < bestDist) {
      bestDist = dist;
      best = idx;
    }
  });
  return best;
}

/** Items that score into a dimension (direct items, or the union of its facets' items) */
function itemsFor(test: TestDef, dim: Dimension) {
  const direct = test.questions.filter((q) => q.dimension === dim.id);
  if (direct.length || !dim.facets?.length) return direct;
  const facetSet = new Set(dim.facets);
  return test.questions.filter((q) => q.dimension && facetSet.has(q.dimension));
}

/** Theoretical [min, max] of a dimension given the questions (more robust than declared values) */
export function rangeFor(test: TestDef, dim: Dimension): [number, number] {
  if (test.kind === "likert" && test.likert) {
    const items = itemsFor(test, dim);
    if (!items.length) return [dim.min, dim.max];
    const lo = Math.min(...test.likert.values);
    const hi = Math.max(...test.likert.values);
    if (dim.scoring === "mean") return [lo, hi];
    return [lo * items.length, hi * items.length];
  }
  if (test.kind === "choice") {
    let lo = 0;
    let hi = 0;
    let n = 0;
    for (const q of test.questions) {
      const vals = (q.options ?? []).map((o) => o.scores?.[dim.id] ?? 0);
      if (!vals.length) continue;
      if (vals.some((v) => v !== 0)) n++;
      lo += Math.min(...vals);
      hi += Math.max(...vals);
    }
    // "mean" dims are averaged over the questions that touch them (see rawScores)
    if (n && dim.scoring === "mean") [lo, hi] = [lo / n, hi / n];
    if (n && hi > lo) return [lo, hi];
  }
  if (test.kind === "cognitive") {
    const n = test.questions.filter(
      (q) => q.dimension === dim.id || dim.id === "total" || dim.id === "g",
    ).length;
    if (n) return [0, n];
  }
  return [dim.min, dim.max];
}

export function rawScores(test: TestDef, answers: Answers): Record<string, number> {
  const raws: Record<string, number> = {};
  if (test.kind === "likert" && test.likert) {
    const lo = Math.min(...test.likert.values);
    const hi = Math.max(...test.likert.values);
    for (const dim of test.dimensions) {
      const items = itemsFor(test, dim);
      let sum = 0;
      let n = 0;
      for (const q of items) {
        const v = answers[q.id];
        if (v === undefined) continue;
        sum += q.reverse ? lo + hi - v : v;
        n++;
      }
      raws[dim.id] = dim.scoring === "mean" ? (n ? sum / n : 0) : sum;
    }
    return raws;
  }
  if (test.kind === "choice") {
    for (const dim of test.dimensions) raws[dim.id] = 0;
    for (const q of test.questions) {
      const idx = answers[q.id];
      if (idx === undefined) continue;
      const opt = q.options?.[idx];
      for (const [k, v] of Object.entries(opt?.scores ?? {})) raws[k] = (raws[k] ?? 0) + v;
    }
    for (const dim of test.dimensions) {
      if (dim.scoring === "mean") {
        const n = test.questions.filter((q) =>
          q.options?.some((o) => (o.scores?.[dim.id] ?? 0) !== 0),
        ).length;
        raws[dim.id] = n ? raws[dim.id] / n : 0;
      }
    }
    return raws;
  }
  if (test.kind === "cognitive") {
    for (const dim of test.dimensions) raws[dim.id] = 0;
    for (const q of test.questions) {
      const idx = answers[q.id];
      const opt = idx !== undefined ? q.options?.[idx] : undefined;
      const ok = !!opt?.correct;
      // extra option scores (e.g. CRT "intuitive" lures); total/g are counted from correctness
      for (const [k, v] of Object.entries(opt?.scores ?? {})) {
        if (k === "total" || k === "g" || (ok && k === q.dimension)) continue;
        if (raws[k] !== undefined) raws[k] += v;
      }
      if (!ok) continue;
      if (q.dimension && raws[q.dimension] !== undefined) raws[q.dimension] += 1;
      if (raws.total !== undefined && q.dimension !== "total") raws.total += 1;
      if (raws.g !== undefined && q.dimension !== "g") raws.g += 1;
    }
    return raws;
  }
  return raws;
}

export function deriveResult(
  test: TestDef,
  raws: Record<string, number>,
  extra?: Partial<TestResult>,
): TestResult {
  const dims: DimensionResult[] = test.dimensions.map((dim) => {
    const raw = raws[dim.id] ?? 0;
    const [lo, hi] = rangeFor(test, dim);
    let norm = hi > lo ? (raw - lo) / (hi - lo) : 0;
    if (dim.lowerIsBetter) norm = 1 - norm;
    norm = Math.max(0, Math.min(1, norm));
    return {
      id: dim.id,
      raw,
      norm,
      percentile: percentileFor(dim, raw),
      bandIndex: bandIndexFor(dim, raw),
    };
  });

  let outcomeId: string | undefined;
  if (test.outcomes?.length) {
    const byId = Object.fromEntries(dims.map((d) => [d.id, d.norm]));
    let best = Infinity;
    for (const o of test.outcomes) {
      let dist = 0;
      for (const [k, target] of Object.entries(o.profile ?? {})) {
        const v = byId[k] ?? 0;
        dist += (v - target) ** 2;
      }
      if (dist < best) {
        best = dist;
        outcomeId = o.id;
      }
    }
  }

  const res: TestResult = { testId: test.id, at: 0, dims, outcomeId, ...extra };

  if (test.kind === "cognitive") {
    res.total = test.questions.length;
    res.correct = Object.values(raws).length
      ? raws.total ?? raws.g ?? Object.values(raws).reduce((a, b) => a + b, 0)
      : 0;
    const gDim = test.dimensions.find((d) => d.id === "total" || d.id === "g");
    const gRes = gDim && dims.find((d) => d.id === gDim.id);
    if (test.id === "iq" && gDim?.norms && gRes) {
      const z = (gRes.raw - gDim.norms.mean) / gDim.norms.sd;
      res.iq = Math.round(Math.max(55, Math.min(145, 100 + 15 * z)));
    }
  }
  return res;
}

export function scoreTest(test: TestDef, answers: Answers): TestResult {
  const res = deriveResult(test, rawScores(test, answers), { at: Date.now() });
  const flags: string[] = [];
  for (const q of test.questions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const crisis = (q as any).crisisIfAtLeast;
    if (crisis !== undefined && (answers[q.id] ?? -Infinity) >= crisis) flags.push("crisis");
  }
  if (flags.length) res.flags = flags;
  return res;
}

/* ---------- compact share codes ---------- */

export function encodeResult(r: TestResult): string {
  const payload = {
    t: r.testId,
    o: r.outcomeId,
    d: r.dims.map((d) => Math.round(d.raw * 100) / 100),
    q: r.iq,
    c: r.correct,
    f: r.flags?.length ? 1 : undefined,
  };
  const json = JSON.stringify(payload);
  const b64 =
    typeof window === "undefined"
      ? Buffer.from(json, "utf8").toString("base64")
      : btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function decodeResult(test: TestDef, code: string): TestResult | null {
  try {
    const b64 = code.replace(/-/g, "+").replace(/_/g, "/");
    const json =
      typeof window === "undefined"
        ? Buffer.from(b64, "base64").toString("utf8")
        : decodeURIComponent(escape(atob(b64)));
    const p = JSON.parse(json);
    if (p.t !== test.id || !Array.isArray(p.d)) return null;
    const raws: Record<string, number> = {};
    test.dimensions.forEach((dim, i) => (raws[dim.id] = Number(p.d[i] ?? 0)));
    const r = deriveResult(test, raws, { iq: p.q, correct: p.c });
    if (p.o && test.outcomes?.some((o) => o.id === p.o)) r.outcomeId = p.o;
    return r;
  } catch {
    return null;
  }
}

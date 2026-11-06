// Build helper for testik fun quizzes.
// Source files use [ru, en] arrays for bilingual strings; this converts them to {ru, en},
// computes theoretical dimension ranges, simulates random answering, balances outcome
// profiles (nearest-profile, Euclidean, normalized 0..1), and runs persona checks.
const fs = require('fs');
const path = require('path');

const L = (x) => {
  if (Array.isArray(x) && x.length === 2 && typeof x[0] === 'string') return { ru: x[0], en: x[1] };
  throw new Error('Bad bilingual value: ' + JSON.stringify(x).slice(0, 120));
};
const LL = (arr) => arr.map(L);

function mulberry32(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function nearest(P, x) {
  let best = 0, bd = Infinity;
  for (let i = 0; i < P.length; i++) {
    let d = 0;
    for (let j = 0; j < x.length; j++) { const t = P[i][j] - x[j]; d += t * t; }
    if (d < bd) { bd = d; best = i; }
  }
  return best;
}

function build(src, outDir) {
  const dimIds = src.dims.map((d) => d.id);
  const D = dimIds.length;
  const qs = src.questions;
  const outIds = src.outcomes.map((o) => o.id);

  // ---- validation
  if (qs.length < 12 || qs.length > 18) throw new Error(`${src.id}: ${qs.length} questions`);
  qs.forEach((q, i) => {
    if (q.o.length < 4 || q.o.length > 6) throw new Error(`${src.id} q${i + 1}: ${q.o.length} options`);
    q.o.forEach((o, k) => {
      L(o[0]);
      if (!o[1] || Object.keys(o[1]).length === 0) throw new Error(`${src.id} q${i + 1} o${k + 1}: no scores`);
      for (const key in o[1]) if (!dimIds.includes(key)) throw new Error(`${src.id} q${i + 1}: unknown dim ${key}`);
    });
  });
  src.outcomes.forEach((o) => {
    (o.compat || []).forEach((c) => { if (!outIds.includes(c)) throw new Error(`${src.id}: bad compat ${c} in ${o.id}`); });
    for (const key in o.z) if (!dimIds.includes(key)) throw new Error(`${src.id}: bad z dim ${key}`);
    if (o.summary.length < 3 || o.summary.length > 6) throw new Error(`${src.id} ${o.id}: summary len`);
    if (o.funny.length < 3 || o.funny.length > 5) throw new Error(`${src.id} ${o.id}: funny len`);
  });

  // ---- theoretical min / max per dimension
  const minD = {}, maxD = {};
  dimIds.forEach((d) => { minD[d] = 0; maxD[d] = 0; });
  qs.forEach((q) => dimIds.forEach((d) => {
    const vals = q.o.map((o) => o[1][d] || 0);
    minD[d] += Math.min(...vals); maxD[d] += Math.max(...vals);
  }));
  dimIds.forEach((d) => { if (maxD[d] - minD[d] <= 0) throw new Error(`${src.id}: dim ${d} has zero range`); });
  const normVec = (raw) => dimIds.map((d, j) => (raw[j] - minD[d]) / (maxD[d] - minD[d]));
  const scoreMat = qs.map((q) => q.o.map((o) => dimIds.map((d) => o[1][d] || 0)));

  // ---- random simulation
  const R = mulberry32(20261105);
  const N = 120000;
  const X = new Array(N);
  const RAW = dimIds.map(() => new Int32Array(N));
  for (let n = 0; n < N; n++) {
    const raw = new Array(D).fill(0);
    for (let qi = 0; qi < qs.length; qi++) {
      const k = Math.floor(R() * scoreMat[qi].length);
      const s = scoreMat[qi][k];
      for (let j = 0; j < D; j++) raw[j] += s[j];
    }
    for (let j = 0; j < D; j++) RAW[j][n] = raw[j];
    X[n] = normVec(raw);
  }
  const mu = new Array(D).fill(0), sd = new Array(D).fill(0);
  X.forEach((x) => x.forEach((v, j) => (mu[j] += v / N)));
  X.forEach((x) => x.forEach((v, j) => (sd[j] += ((v - mu[j]) ** 2) / N)));
  for (let j = 0; j < D; j++) sd[j] = Math.sqrt(sd[j]);

  // ---- balance profiles along each outcome's z-direction
  const Z = src.outcomes.map((o) => dimIds.map((d) => o.z[d] || 0));
  const K = Z.length;
  const target = 1 / K;
  const S = src.spread || 1.5;
  let scale = Z.map(() => 1);
  const mkP = () => Z.map((z, i) => z.map((v, j) => clamp(mu[j] + S * scale[i] * v * sd[j], 0.02, 0.98)));
  const sub = X.slice(0, 40000);
  for (let it = 0; it < 120; it++) {
    const P = mkP();
    const c = new Array(K).fill(0);
    sub.forEach((x) => c[nearest(P, x)]++);
    for (let i = 0; i < K; i++) {
      const f = Math.max(c[i] / sub.length, 0.002);
      scale[i] = clamp(scale[i] * Math.pow(f / target, 0.3), 0.2, 6);
    }
  }
  const P = mkP().map((p) => p.map((v) => Math.round(v * 100) / 100));
  const counts = new Array(K).fill(0);
  X.forEach((x) => counts[nearest(P, x)]++);
  const dist = counts.map((c) => c / N);

  // ---- persona check: answer every question "in character"
  const range = dimIds.map((d) => maxD[d] - minD[d]);
  const personaPick = (z, qi) => {
    let best = 0, bv = -Infinity;
    scoreMat[qi].forEach((s, k) => {
      const v = s.reduce((acc, sv, j) => acc + (z[j] * sv) / range[j], 0);
      if (v > bv + 1e-9) { bv = v; best = k; }
    });
    return best;
  };
  const persona = Z.map((z, i) => {
    const raw = new Array(D).fill(0);
    qs.forEach((q, qi) => { const s = scoreMat[qi][personaPick(z, qi)]; s.forEach((v, j) => (raw[j] += v)); });
    return { id: outIds[i], got: outIds[nearest(P, normVec(raw))] };
  });
  // noisy persona: 65% in-character, 35% random
  const R2 = mulberry32(7);
  const noisy = Z.map((z, i) => {
    let hit = 0; const T = 3000;
    for (let t = 0; t < T; t++) {
      const raw = new Array(D).fill(0);
      qs.forEach((q, qi) => {
        const k = R2() < 0.65 ? personaPick(z, qi) : Math.floor(R2() * scoreMat[qi].length);
        scoreMat[qi][k].forEach((v, j) => (raw[j] += v));
      });
      if (nearest(P, normVec(raw)) === i) hit++;
    }
    return hit / T;
  });

  // ---- bands at the 30th / 70th percentile of the random-answer raw distribution
  const dimensions = src.dims.map((d, j) => {
    const sorted = Array.from(RAW[j]).sort((a, b) => a - b);
    let p30 = sorted[Math.floor(N * 0.3)], p70 = sorted[Math.floor(N * 0.7)];
    p30 = clamp(p30, minD[d.id], maxD[d.id] - 2);
    p70 = clamp(p70, p30 + 1, maxD[d.id] - 1);
    const ranges = [[minD[d.id], p30], [p30 + 1, p70], [p70 + 1, maxD[d.id]]];
    if (d.bands.length !== 3) throw new Error(`${src.id}: dim ${d.id} needs 3 bands`);
    return {
      id: d.id, name: L(d.name), description: L(d.desc), lowLabel: L(d.low), highLabel: L(d.high),
      color: d.color, scoring: 'sum', min: minD[d.id], max: maxD[d.id],
      bands: d.bands.map((b, k) => ({ min: ranges[k][0], max: ranges[k][1], label: L(b[0]), summary: LL(b[1]), detailed: L(b[2]) })),
    };
  });

  const distLines = (lang) => src.outcomes.map((o, i) => `- ${o.emoji} ${L(o.title)[lang].replace(/\s*[—–-]\s.*$/, '')}: ${(dist[i] * 100).toFixed(1)}%`).join('\n');
  const fill = (s) => ({ ru: L(s).ru.replace('{{DIST}}', distLines('ru')), en: L(s).en.replace('{{DIST}}', distLines('en')) });

  const test = {
    id: src.id, category: 'fun', kind: 'choice', seriousness: 'fun',
    title: L(src.title), tagline: L(src.tagline), description: L(src.description),
    emoji: src.emoji, durationMin: src.durationMin, popularity: src.popularity,
    tags: LL(src.tags), methodology: fill(src.methodology), sources: src.sources, license: src.license,
    disclaimer: L(src.disclaimer), instructions: L(src.instructions),
    dimensions,
    questions: qs.map((q, i) => ({ id: `q${i + 1}`, text: L(q.t), options: q.o.map((o) => ({ text: L(o[0]), scores: o[1] })) })),
    outcomes: src.outcomes.map((o, i) => ({
      id: o.id, title: L(o.title), emoji: o.emoji,
      profile: Object.fromEntries(dimIds.map((d, j) => [d, P[i][j]])),
      summary: LL(o.summary), detailed: L(o.detailed), strengths: LL(o.strengths), growth: LL(o.growth),
      funnyExamples: LL(o.funny), compatibleWith: o.compat, imagePrompt: o.img,
    })),
    scoringNotes: L(src.scoringNotes), resultIntro: L(src.resultIntro),
  };
  const file = path.join(outDir, `${src.id}.json`);
  fs.writeFileSync(file, JSON.stringify(test, null, 2) + '\n', 'utf8');
  JSON.parse(fs.readFileSync(file, 'utf8')); // validate
  return {
    id: src.id, file, questions: qs.length, options: qs.reduce((a, q) => a + q.o.length, 0), outcomes: K,
    ranges: Object.fromEntries(dimIds.map((d) => [d, [minD[d], maxD[d]]])),
    mu: mu.map((v) => +v.toFixed(3)), sd: sd.map((v) => +v.toFixed(3)),
    dist: Object.fromEntries(outIds.map((id, i) => [id, +(dist[i] * 100).toFixed(1)])),
    minPct: +(Math.min(...dist) * 100).toFixed(1), maxPct: +(Math.max(...dist) * 100).toFixed(1),
    persona, personaHits: persona.filter((p) => p.id === p.got).length,
    noisy: Object.fromEntries(outIds.map((id, i) => [id, +(noisy[i] * 100).toFixed(0)])),
  };
}

module.exports = { build };

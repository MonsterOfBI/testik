// Sanity checks for every test JSON; exits non-zero on hard errors.
import fs from "node:fs";
import path from "node:path";
const dir = path.resolve("src/content/tests");
let bad = 0;
const L = (x) => x && typeof x.ru === "string" && typeof x.en === "string";
for (const f of fs.readdirSync(dir).filter((f) => f.endsWith(".json"))) {
  const t = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  const errs = [];
  const warns = [];
  if (t.draft) continue;
  for (const k of ["title", "tagline", "description", "methodology", "instructions", "scoringNotes"]) if (!L(t[k])) errs.push(`missing ${k}`);
  if (!["likert", "choice", "cognitive", "game"].includes(t.kind)) errs.push(`bad kind ${t.kind}`);
  if (!Array.isArray(t.dimensions) || !t.dimensions.length) errs.push("no dimensions");
  const dimIds = new Set((t.dimensions ?? []).map((d) => d.id));
  if (t.kind !== "game" && !(t.questions ?? []).length) errs.push("no questions");
  if (t.kind === "likert") {
    if (!t.likert?.anchors?.length || t.likert.anchors.length !== t.likert.values?.length) errs.push("bad likert scale");
    for (const q of t.questions) if (!dimIds.has(q.dimension)) errs.push(`q ${q.id} → unknown dim ${q.dimension}`);
  }
  if (t.kind === "choice")
    for (const q of t.questions) {
      if (!q.options?.length) errs.push(`q ${q.id} no options`);
      for (const o of q.options ?? []) for (const k of Object.keys(o.scores ?? {})) if (!dimIds.has(k)) errs.push(`q ${q.id} scores unknown dim ${k}`);
    }
  if (t.kind === "cognitive")
    for (const q of t.questions) if ((q.options ?? []).filter((o) => o.correct).length !== 1) errs.push(`q ${q.id} needs exactly one correct option`);
  for (const o of t.outcomes ?? []) for (const k of Object.keys(o.profile ?? {})) if (!dimIds.has(k)) errs.push(`outcome ${o.id} profile unknown dim ${k}`);
  for (const d of t.dimensions ?? []) if (!d.bands?.length && t.kind !== "choice") warns.push(`dim ${d.id} has no bands`);
  const ids = new Set();
  for (const q of t.questions ?? []) {
    if (ids.has(q.id)) errs.push(`duplicate question id ${q.id}`);
    ids.add(q.id);
  }
  if (errs.length || warns.length) console.log(`${f}:`, [...errs.map((e) => "ERROR " + e), ...warns.map((w) => "warn " + w)].slice(0, 8).join("; "));
  if (errs.length) bad++;
}
if (bad) {
  console.error(`${bad} test file(s) have errors`);
  process.exit(1);
}
console.log("content ok");

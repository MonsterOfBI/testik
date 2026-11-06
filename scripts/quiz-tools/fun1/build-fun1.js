// Build + validate + calibrate one fun quiz: node build-fun1.js <id>
const path = require('path');
const fs = require('fs');
const C = require('./common');

const OUT = require('path').join(__dirname, '../../../src/content/tests');
const id = process.argv[2];
const m = require(path.join(__dirname, id + '.js'));
const d = m.def;

const isL = x => x && typeof x.ru === 'string' && typeof x.en === 'string' && x.ru.trim() && x.en.trim();
const errs = [];
const need = (cond, msg) => { if (!cond) errs.push(msg); };

// ---- dimensions ----
const dimensions = C.buildDims(d.questions, m.dimDefs, m.dimOrder);
const dimIds = new Set(dimensions.map(x => x.id));

// ---- validation ----
need(d.questions.length >= 12 && d.questions.length <= 20, 'question count ' + d.questions.length);
const qids = new Set();
d.questions.forEach(qq => {
  need(!qids.has(qq.id), 'dup qid ' + qq.id); qids.add(qq.id);
  need(isL(qq.text), 'q text ' + qq.id);
  need(qq.options.length >= 4 && qq.options.length <= 6, 'options count ' + qq.id);
  qq.options.forEach((op, j) => {
    need(isL(op.text), `opt text ${qq.id}/${j}`);
    need(op.scores && Object.keys(op.scores).length > 0, `no scores ${qq.id}/${j}`);
    for (const k in op.scores) need(dimIds.has(k), `bad dim ${k} in ${qq.id}/${j}`);
  });
});
const oids = new Set(d.outcomes.map(x => x.id));
need(oids.size === d.outcomes.length, 'dup outcome ids');
d.outcomes.forEach(oc => {
  need(isL(oc.title), 'title ' + oc.id);
  need(oc.emoji, 'emoji ' + oc.id);
  need(oc.summary.length >= 3 && oc.summary.length <= 6 && oc.summary.every(isL), 'summary ' + oc.id);
  need(isL(oc.detailed), 'detailed ' + oc.id);
  const paras = oc.detailed.ru.split(/\n\n/).length;
  need(paras >= 2 && paras <= 4, `paragraphs ${oc.id}: ${paras}`);
  need(oc.strengths && oc.strengths.length && oc.strengths.every(isL), 'strengths ' + oc.id);
  need(oc.growth && oc.growth.length && oc.growth.every(isL), 'growth ' + oc.id);
  need(oc.funnyExamples && oc.funnyExamples.length >= 3 && oc.funnyExamples.length <= 5 && oc.funnyExamples.every(isL), 'funny ' + oc.id);
  need(oc.compatibleWith && oc.compatibleWith.every(c => oids.has(c) && c !== oc.id), 'compat ' + oc.id + ' ' + JSON.stringify(oc.compatibleWith));
  need(typeof oc.imagePrompt === 'string' && oc.imagePrompt.length > 40, 'image ' + oc.id);
  for (const k of dimIds) need(typeof oc.profile[k] === 'number', `profile ${oc.id} missing ${k}`);
  if (oc.famous) need(oc.famous.every(isL), 'famous ' + oc.id);
});
['title', 'tagline', 'description', 'methodology', 'instructions', 'scoringNotes'].forEach(k => need(isL(d[k]), 'top ' + k));
if (errs.length) { console.error('VALIDATION ERRORS:\n' + errs.join('\n')); process.exit(1); }

// ---- assemble in schema order ----
const test = {
  id: d.id, category: d.category, kind: d.kind, seriousness: d.seriousness,
  title: d.title, tagline: d.tagline, description: d.description, emoji: d.emoji,
  durationMin: d.durationMin, popularity: d.popularity, tags: d.tags,
  methodology: d.methodology, sources: d.sources, license: d.license,
  disclaimer: d.disclaimer, instructions: d.instructions,
  dimensions, questions: d.questions, outcomes: d.outcomes,
  scoringNotes: d.scoringNotes, resultIntro: d.resultIntro
};

// ---- calibrate ----
const theory = d.outcomes.map(oc => ({ id: oc.id, ...oc.profile }));
C.tune(test, m.tuneOpts || {});
const rep = C.report(test);

const file = path.join(OUT, id + '.json');
fs.writeFileSync(file, JSON.stringify(test, null, 2) + '\n');
JSON.parse(fs.readFileSync(file, 'utf8'));

console.log(`=== ${id}: ${test.questions.length} q, ${test.outcomes.length} outcomes -> ${file}`);
console.log('dims', dimensions.map(x => `${x.id}[${x.min}..${x.max}] bands ${x.bands.map(b => b.min + '-' + b.max).join('/')}`).join('  '));
const rnd = rep.map(r => r.random), per = rep.map(r => r.persona);
console.log('id'.padEnd(18), 'random%', 'persona%', 'reach', 'profile');
rep.forEach(r => console.log(r.id.padEnd(18), String(r.random).padStart(6), String(r.persona).padStart(8), r.reachable ? '  yes' : '  NO ', JSON.stringify(r.profile)));
console.log(`random min ${Math.min(...rnd)} max ${Math.max(...rnd)} | persona min ${Math.min(...per)} max ${Math.max(...per)}`);
const repFile = path.join(__dirname, 'fun1-reports.json');
let all = {}; try { all = JSON.parse(fs.readFileSync(repFile, 'utf8')); } catch (e) {}
all[id] = { questions: test.questions.length, outcomes: rep, theory, dims: dimensions.map(x => ({ id: x.id, min: x.min, max: x.max })) };
fs.writeFileSync(repFile, JSON.stringify(all, null, 2));

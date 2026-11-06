const path = require('path');
const fs = require('fs');
const { build } = require('./lib');
const outDir = require('path').join(__dirname, '../../../src/content/tests');
const ids = process.argv.slice(2);
const reports = [];
for (const id of ids) {
  const src = require(path.join(__dirname, 'src', id + '.js'));
  const r = build(src, outDir);
  reports.push(r);
  console.log(`\n=== ${r.id}: ${r.questions} q, ${r.options} options, ${r.outcomes} outcomes`);
  console.log('ranges', JSON.stringify(r.ranges), 'mu', r.mu.join(','), 'sd', r.sd.join(','));
  console.log('dist %', JSON.stringify(r.dist), `min ${r.minPct} max ${r.maxPct}`);
  console.log(`persona hits ${r.personaHits}/${r.outcomes}`, r.persona.filter((p) => p.id !== p.got).map((p) => `${p.id}->${p.got}`).join(' '));
  console.log('noisy persona hit %', JSON.stringify(r.noisy));
}
const repFile = path.join(__dirname, 'reports.json');
let all = {};
try { all = JSON.parse(fs.readFileSync(repFile, 'utf8')); } catch (e) {}
reports.forEach((r) => (all[r.id] = r));
fs.writeFileSync(repFile, JSON.stringify(all, null, 2));

const fs=require('fs');
const dir=require('path').join(__dirname, '../../../src/content/tests') + '/';
const ids=['dessert','city','weather','drink','dog-breed','brainrot-meme-energy'];
const isL=x=>x&&typeof x.ru==='string'&&typeof x.en==='string'&&x.ru.trim()&&x.en.trim();
let problems=0;
for(const id of ids){
  const raw=fs.readFileSync(dir+id+'.json','utf8'); const t=JSON.parse(raw);
  const err=m=>{problems++;console.log(id,'ERR',m)};
  if(t.id!==id)err('id');
  if(t.kind!=='choice'||t.seriousness!=='fun'||t.category!=='fun')err('kind/ser/cat');
  ['title','tagline','description','methodology','instructions','scoringNotes','disclaimer','resultIntro'].forEach(k=>{if(!isL(t[k]))err('L '+k)});
  if(![1,2,3,4,5].includes(t.popularity))err('pop');
  if(!t.sources.length||t.sources.some(s=>!s.citation))err('sources');
  if(t.methodology.ru.includes('{{')||t.methodology.en.includes('{{'))err('placeholder');
  const dims=t.dimensions.map(d=>d.id);
  t.dimensions.forEach(d=>{['name','description','lowLabel','highLabel'].forEach(k=>{if(!isL(d[k]))err(d.id+' '+k)});
    let cur=d.min; d.bands.forEach(b=>{if(b.min!==cur)err(d.id+' band gap '+b.min+' vs '+cur); if(b.max<b.min)err(d.id+' band inverted'); cur=b.max+1; if(!isL(b.label)||!isL(b.detailed)||b.summary.length<3||!b.summary.every(isL))err(d.id+' band text');});
    if(cur-1!==d.max)err(d.id+' band end');});
  if(t.questions.length<12||t.questions.length>18)err('qcount');
  t.questions.forEach(q=>{if(!isL(q.text))err(q.id+' text'); if(q.options.length<4||q.options.length>6)err(q.id+' opts');
    q.options.forEach(o=>{if(!isL(o.text))err(q.id+' opt text'); if(!o.scores||!Object.keys(o.scores).length)err(q.id+' scores'); Object.keys(o.scores).forEach(k=>{if(!dims.includes(k))err(q.id+' dim '+k)})})});
  const oids=t.outcomes.map(o=>o.id);
  if(new Set(oids).size!==oids.length)err('dup outcome');
  t.outcomes.forEach(o=>{if(!isL(o.title)||!isL(o.detailed))err(o.id+' text');
    if(o.summary.length<3||o.summary.length>6)err(o.id+' summary'); if(!o.strengths.length||!o.growth.length)err(o.id+' sg');
    if(o.funnyExamples.length<3||o.funnyExamples.length>5)err(o.id+' funny');
    [...o.summary,...o.strengths,...o.growth,...o.funnyExamples].forEach(x=>{if(!isL(x))err(o.id+' L')});
    if(Object.keys(o.profile).length!==dims.length||Object.values(o.profile).some(v=>v<0||v>1))err(o.id+' profile');
    o.compatibleWith.forEach(c=>{if(!oids.includes(c)||c===o.id)err(o.id+' compat '+c)});
    if(!o.imagePrompt||!/pastel/.test(o.imagePrompt)||!/flat-3D/.test(o.imagePrompt)||!/gradient/.test(o.imagePrompt))err(o.id+' img');
    const paras=o.detailed.ru.split('\n\n').length; if(paras<2||paras>4)err(o.id+' paras '+paras);});
  // forbidden words check (swearing) rough
  if(/бля|хуй|пизд|сука|fuck|shit/i.test(raw))err('swear');
  console.log(id,'OK', 'q',t.questions.length,'opts',t.questions.reduce((a,q)=>a+q.options.length,0),'outcomes',oids.length,'bytes',raw.length);
}
console.log('problems',problems);

// Shared helpers for building testik fun-quiz JSON files.
const fs = require('fs');

const L = (ru, en) => ({ ru, en });
const o = (ru, en, scores) => ({ text: L(ru, en), scores });
const q = (id, ru, en, options) => ({ id, text: L(ru, en), options });

// ---------- Big Five dimension texts (shared) ----------
// bands: [low, mid, high] -> {label, summary[3], detailed}
const BIG5 = {
  O: {
    name: L('Открытость опыту', 'Openness to experience'),
    description: L(
      'Любопытство, воображение, тяга к новому и необычному: идеи, искусство, путешествия, эксперименты.',
      'Curiosity, imagination and appetite for the new and unusual: ideas, art, travel, experiments.'),
    lowLabel: L('практичность, привычное', 'practical, familiar'),
    highLabel: L('любопытство, фантазия', 'curious, imaginative'),
    color: '#C9B6F2',
    bands: [
      { label: L('Земной реалист', 'Down-to-earth realist'),
        summary: [L('Ценишь проверенное и понятное', 'You value the tried and true'), L('Конкретика важнее абстракций', 'Concrete beats abstract'), L('Новое — только если оно реально полезно', 'New things only if they are truly useful')],
        detailed: L('Ты опираешься на опыт и здравый смысл и не гонишься за модой ради моды. Это экономит силы и делает тебя надёжным. Совет: раз в месяц пробуй одну маленькую новинку — новое блюдо, маршрут или жанр. Без обязательств, просто как эксперимент.',
          'You rely on experience and common sense and do not chase novelty for its own sake. That saves energy and makes you dependable. Tip: once a month, try one small new thing (a dish, a route, a genre), no commitment, just an experiment.') },
      { label: L('Любопытный прагматик', 'Curious pragmatist'),
        summary: [L('Новое интересно, но без фанатизма', 'Open to new things, within reason'), L('Совмещаешь фантазию и практичность', 'You mix imagination with practicality'), L('Легко подстраиваешься под ситуацию', 'You adapt to the situation')],
        detailed: L('Ты умеешь и помечтать, и вернуться на землю. Новые идеи тебе интересны, если видно, как их применить. Совет: доверяй своему любопытству чуть чаще — именно на стыке привычного и нового у тебя рождаются лучшие решения.',
          'You can daydream and come back down to earth. New ideas interest you when you can see how to use them. Tip: trust your curiosity a bit more often. Your best ideas come from mixing the familiar with the new.') },
      { label: L('Исследователь идей', 'Explorer of ideas'),
        summary: [L('Обожаешь новое, сложное и странное', 'You love the new, the complex and the weird'), L('Богатое воображение и эстетическое чутьё', 'Rich imagination and aesthetic sense'), L('Скука — твой главный враг', 'Boredom is your arch-enemy')],
        detailed: L('Высокая открытость связана с творчеством, любознательностью и широтой интересов. Обратная сторона — быстро загораешься и так же быстро остываешь. Совет: выбирай одну идею из десяти и доводи её до конца, а остальные складывай в «банк идей».',
          'High openness goes with creativity, curiosity and wide interests. The flip side: you catch fire quickly and cool down just as fast. Tip: pick one idea in ten and finish it; keep the rest in an "idea bank".') }
    ]
  },
  C: {
    name: L('Добросовестность', 'Conscientiousness'),
    description: L(
      'Организованность, дисциплина, надёжность и умение доводить дела до конца.',
      'Organisation, discipline, reliability and the ability to see things through.'),
    lowLabel: L('спонтанность, гибкость', 'spontaneous, flexible'),
    highLabel: L('порядок, дисциплина', 'organised, disciplined'),
    color: '#A8E0C8',
    bands: [
      { label: L('Вольный дух', 'Free spirit'),
        summary: [L('Живёшь по настроению, а не по плану', 'You live by mood, not by plan'), L('Легко импровизируешь', 'You improvise with ease'), L('Дедлайны — скорее пожелания', 'Deadlines are more like suggestions')],
        detailed: L('Спонтанность делает тебя гибким и лёгким на подъём, но важные дела могут утонуть в хаосе. Совет: не пытайся стать машиной продуктивности — заведи всего одно правило, например «важное записываю сразу», и держись за него.',
          'Spontaneity makes you flexible and quick to say yes, but important tasks can drown in chaos. Tip: do not try to become a productivity machine. Adopt one rule, such as "I write down important things immediately", and stick to it.') },
      { label: L('Гибкий организатор', 'Flexible organiser'),
        summary: [L('План есть, но без фанатизма', 'You have a plan, but you are not obsessed'), L('Умеешь собраться, когда надо', 'You can focus when it matters'), L('Баланс между порядком и свободой', 'A balance of order and freedom')],
        detailed: L('Ты умеешь планировать, но не расстраиваешься, если всё пошло иначе. Это удобная середина. Совет: определи 2–3 сферы, где порядок действительно важен (деньги, здоровье, учёба/работа), и там держи планку повыше.',
          'You can plan, but you do not fall apart when things change. A comfortable middle ground. Tip: choose 2 or 3 areas where order really matters (money, health, study or work) and keep the bar higher there.') },
      { label: L('Мастер порядка', 'Master of order'),
        summary: [L('Списки, планы и чек-листы — твоё всё', 'Lists, plans and checklists are your thing'), L('На тебя можно положиться', 'People can count on you'), L('Доводишь начатое до конца', 'You finish what you start')],
        detailed: L('Добросовестность — один из самых надёжных предикторов успеха в учёбе и работе. Но перфекционизм может отнимать радость. Совет: планируй и отдых тоже. Слот «ничего не делать» в календаре — тоже продуктивность.',
          'Conscientiousness is one of the most reliable predictors of success at school and work. But perfectionism can steal the joy. Tip: plan your rest too. A "do nothing" slot in the calendar counts as productivity.') }
    ]
  },
  E: {
    name: L('Экстраверсия', 'Extraversion'),
    description: L(
      'Социальная энергия: общительность, активность, напористость и любовь к ярким впечатлениям.',
      'Social energy: sociability, activity, assertiveness and a taste for excitement.'),
    lowLabel: L('тишина, глубина', 'quiet, reserved'),
    highLabel: L('общительность, драйв', 'outgoing, energetic'),
    color: '#FFD59E',
    bands: [
      { label: L('Тихая батарейка', 'Quiet battery'),
        summary: [L('Заряжаешься в тишине и наедине с собой', 'You recharge in quiet and solitude'), L('Мало друзей, но настоящих', 'Few friends, but real ones'), L('Сначала думаешь, потом говоришь', 'You think first, then speak')],
        detailed: L('Интроверсия — не застенчивость, а способ распределять энергию. Ты глубже погружаешься в дела и людей. Совет: планируй «окна тишины» после шумных событий и не извиняйся за них.',
          'Introversion is not shyness; it is a way of spending energy. You go deeper into tasks and people. Tip: schedule quiet time after busy events, and do not apologise for it.') },
      { label: L('Амбиверт', 'Ambivert'),
        summary: [L('Можешь и зажечь, и уйти в себя', 'You can light up a room or retreat'), L('Подстраиваешься под компанию', 'You adapt to the company'), L('Нужны и люди, и тишина', 'You need both people and quiet')],
        detailed: L('Большинство людей находятся где-то посередине, и это удобно: ты чувствуешь, когда нужно говорить, а когда слушать. Совет: следи за своим «социальным топливом» и вовремя меняй режим.',
          'Most people sit somewhere in the middle, and it is a handy place to be: you sense when to talk and when to listen. Tip: watch your "social fuel gauge" and switch modes in time.') },
      { label: L('Солнечная батарея', 'Solar panel'),
        summary: [L('Люди тебя заряжают', 'People charge you up'), L('Легко знакомишься и ведёшь за собой', 'You make friends easily and lead'), L('Любишь движ и яркие впечатления', 'You love action and excitement')],
        detailed: L('Высокая экстраверсия связана с позитивными эмоциями и социальной уверенностью. Риск — перегрузить расписание и забыть про отдых. Совет: иногда давай слово самым тихим в компании — они удивят.',
          'High extraversion goes with positive emotions and social confidence. The risk is overloading your schedule and forgetting to rest. Tip: now and then, give the floor to the quietest person in the room. They will surprise you.') }
    ]
  },
  A: {
    name: L('Доброжелательность', 'Agreeableness'),
    description: L(
      'Теплота, доверие, сотрудничество и забота о других.',
      'Warmth, trust, cooperation and care for others.'),
    lowLabel: L('прямота, независимость', 'blunt, independent'),
    highLabel: L('теплота, забота', 'warm, caring'),
    color: '#F7B8C8',
    bands: [
      { label: L('Честный критик', 'Honest critic'),
        summary: [L('Говоришь как есть', 'You say it like it is'), L('Не боишься конфликта', 'You are not afraid of conflict'), L('Сначала логика, потом чувства', 'Logic first, feelings second')],
        detailed: L('Прямота полезна: ты отстаиваешь свою позицию и не даёшь собой манипулировать. Но людям иногда нужна не правда-матка, а поддержка. Совет: прежде чем критиковать, назови одну вещь, которая получилась хорошо.',
          'Bluntness is useful: you stand your ground and do not get manipulated. But sometimes people need support more than hard truths. Tip: before criticising, name one thing that went well.') },
      { label: L('Дружелюбный реалист', 'Friendly realist'),
        summary: [L('Доброта без наивности', 'Kind but not naive'), L('Умеешь сказать «нет»', 'You can say no'), L('Сотрудничаешь, но помнишь о себе', 'You cooperate without forgetting yourself')],
        detailed: L('Ты умеешь и поддержать, и отстоять границы. Это здоровый баланс. Совет: в спорных ситуациях задавай себе вопрос «что важнее сейчас — отношения или результат?» и действуй осознанно.',
          'You can support people and still hold your boundaries. A healthy balance. Tip: when things get tense, ask yourself "what matters more right now, the relationship or the result?" and act on purpose.') },
      { label: L('Добрая душа', 'Kind soul'),
        summary: [L('Тебе важно, чтобы всем было хорошо', 'You want everyone to be okay'), L('Легко прощаешь и доверяешь', 'You forgive and trust easily'), L('Лучший командный игрок', 'Ultimate team player')],
        detailed: L('Высокая доброжелательность делает тебя желанным другом и коллегой. Риск — забывать о своих нуждах. Совет: «нет» — тоже забота, в первую очередь о себе. Тренируйся отказывать мягко, но твёрдо.',
          'High agreeableness makes you a sought-after friend and colleague. The risk is forgetting your own needs. Tip: "no" is also a form of care, starting with yourself. Practise saying it gently but firmly.') }
    ]
  },
  N: {
    name: L('Эмоциональная чувствительность', 'Emotional sensitivity (Neuroticism)'),
    description: L(
      'Насколько сильно и часто ты переживаешь тревогу, напряжение и перепады настроения (в науке — нейротизм).',
      'How strongly and often you feel worry, tension and mood swings (neuroticism in the research literature).'),
    lowLabel: L('спокойствие, устойчивость', 'calm, resilient'),
    highLabel: L('чувствительность, тревожность', 'sensitive, reactive'),
    color: '#A9D2F5',
    bands: [
      { label: L('Дзен-режим', 'Zen mode'),
        summary: [L('Тебя сложно выбить из колеи', 'Hard to knock you off balance'), L('Быстро восстанавливаешься после стресса', 'You bounce back quickly'), L('Спокойствие — твой суперскилл', 'Calm is your superpower')],
        detailed: L('Эмоциональная устойчивость помогает в кризисах и делает тебя опорой для других. Иногда спокойствие могут принять за равнодушие. Совет: проговаривай вслух, что тебе не всё равно, — людям это важно.',
          'Emotional stability helps in a crisis and makes you a rock for others. Sometimes calm can be mistaken for indifference. Tip: say out loud that you care. People need to hear it.') },
      { label: L('Живые эмоции', 'Balanced feelings'),
        summary: [L('Переживаешь, но не тонешь', 'You worry but do not drown'), L('Эмоции — сигнал, а не приговор', 'Emotions are signals, not verdicts'), L('Обычно быстро приходишь в себя', 'You usually recover fast')],
        detailed: L('Ты чувствуешь и радость, и тревогу, но в целом держишь баланс. Совет: заметь, что именно выбивает тебя из колеи чаще всего (недосып? голод? неопределённость?), и подстрахуйся заранее.',
          'You feel joy and worry, but overall you keep your balance. Tip: notice what throws you off most often (lack of sleep? hunger? uncertainty?) and plan around it.') },
      { label: L('Тонкая настройка', 'Finely tuned'),
        summary: [L('Остро чувствуешь всё вокруг', 'You feel everything intensely'), L('Замечаешь риски раньше других', 'You spot risks before others'), L('Эмпатия и глубина переживаний', 'Empathy and depth of feeling')],
        detailed: L('Высокая чувствительность — это не слабость: она связана с осторожностью и вниманием к деталям. Но хроническая тревога утомляет. Совет: дыхание 4-7-8, прогулки и сон — скучные, но рабочие инструменты. Если тревога мешает жить, стоит поговорить со специалистом.',
          'High sensitivity is not weakness: it goes with caution and attention to detail. But chronic worry is exhausting. Tip: slow breathing, walks and sleep are boring but effective tools. If anxiety gets in the way of life, talk to a professional.') }
    ]
  }
};

// ---------- Dimension builder ----------
function buildDims(questions, dimDefs, order) {
  return order.map(id => {
    let min = 0, max = 0;
    for (const qq of questions) {
      const vals = qq.options.map(op => (op.scores && op.scores[id]) || 0);
      min += Math.min(...vals);
      max += Math.max(...vals);
    }
    const def = dimDefs[id];
    const range = max - min;
    const t1 = Math.floor(min + range / 3);
    const t2 = Math.floor(min + (2 * range) / 3);
    const ranges = [[min, t1], [t1 + 1, t2], [t2 + 1, max]];
    return {
      id, name: def.name, description: def.description,
      lowLabel: def.lowLabel, highLabel: def.highLabel, color: def.color,
      scoring: 'sum', min, max,
      bands: def.bands.map((b, i) => ({ min: ranges[i][0], max: ranges[i][1], label: b.label, summary: b.summary, detailed: b.detailed }))
    };
  });
}

// ---------- RNG ----------
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- Scoring engine (mirrors what the site should do) ----------
function rawScores(test, answers) {
  const raw = {};
  for (const d of test.dimensions) raw[d.id] = 0;
  test.questions.forEach((qq, i) => {
    const sc = qq.options[answers[i]].scores || {};
    for (const k in sc) raw[k] += sc[k];
  });
  return raw;
}
function normalize(test, raw) {
  const n = {};
  for (const d of test.dimensions) n[d.id] = (raw[d.id] - d.min) / (d.max - d.min);
  return n;
}
function dist2(n, profile) {
  let s = 0;
  for (const k in profile) { const x = n[k] - profile[k]; s += x * x; }
  return s;
}
function winner(test, n) {
  let best = -1, bd = Infinity;
  test.outcomes.forEach((oc, i) => { const d = dist2(n, oc.profile); if (d < bd) { bd = d; best = i; } });
  return best;
}
function randomAnswers(test, rng) { return test.questions.map(qq => Math.floor(rng() * qq.options.length)); }

function sampleNorms(test, N, seed) {
  const rng = mulberry32(seed);
  const out = [];
  for (let i = 0; i < N; i++) out.push(normalize(test, rawScores(test, randomAnswers(test, rng))));
  return out;
}
function shares(test, norms) {
  const c = new Array(test.outcomes.length).fill(0);
  for (const n of norms) c[winner(test, n)]++;
  return c.map(x => x / norms.length);
}

// Persona simulation: a latent profile z in [0,1]^D picks options softly in line with z.
function personaNorms(test, N, seed, beta = 1.5) {
  const rng = mulberry32(seed);
  const dims = test.dimensions.map(d => d.id);
  const out = [];
  for (let i = 0; i < N; i++) {
    const z = {}; for (const d of dims) z[d] = rng();
    const ans = test.questions.map(qq => {
      const w = qq.options.map(op => { let u = 0; const sc = op.scores || {}; for (const k in sc) u += sc[k] * (z[k] - 0.5) * 2; return Math.exp(beta * u); });
      const tot = w.reduce((a, b) => a + b, 0); let r = rng() * tot;
      for (let j = 0; j < w.length; j++) { r -= w[j]; if (r <= 0) return j; }
      return w.length - 1;
    });
    out.push(normalize(test, rawScores(test, ans)));
  }
  return out;
}

// Tuner: keep each outcome's theoretical pattern (deviation from 0.5) but scale its distance
// from the centre of the random-answer cloud until shares are roughly equal.
function tune(test, { N = 20000, seed = 42, iters = 300, lo = 0.03, hi = 0.97, blend = 0 } = {}) {
  // Calibrate on a blend of purely random answerers and simulated "personas" (latent trait profiles),
  // so outcomes are balanced both for random clicking and for consistent answering styles.
  const norms = sampleNorms(test, Math.round(N * (1 - blend)), seed).concat(blend > 0 ? personaNorms(test, Math.round(N * blend), seed + 1) : []);
  const dims = test.dimensions.map(d => d.id);
  const c = {}; for (const d of dims) c[d] = norms.reduce((a, n) => a + n[d], 0) / norms.length;
  const theory = test.outcomes.map(oc => ({ ...oc.profile }));
  const s = test.outcomes.map(() => 1);
  const K = test.outcomes.length, target = 1 / K;
  const apply = () => test.outcomes.forEach((oc, k) => {
    const p = {}; for (const d of dims) { const v = c[d] + s[k] * (theory[k][d] - 0.5); p[d] = Math.min(hi, Math.max(lo, v)); }
    oc.profile = p;
  });
  for (let it = 0; it < iters; it++) {
    apply();
    const sh = shares(test, norms);
    for (let k = 0; k < K; k++) {
      const ratio = Math.max(sh[k], 0.002) / target;
      s[k] *= Math.pow(ratio, 0.2);
      s[k] = Math.min(3, Math.max(0.1, s[k]));
    }
  }
  apply();
  test.outcomes.forEach(oc => { for (const d in oc.profile) oc.profile[d] = Math.round(oc.profile[d] * 100) / 100; });
  return { centre: c, scale: s, theory };
}

// Reachability: coordinate ascent on the winning margin for each outcome.
function reachability(test, seed = 7, restarts = 20) {
  const rng = mulberry32(seed);
  const res = {};
  test.outcomes.forEach((oc, k) => {
    let found = null;
    for (let r = 0; r < restarts && !found; r++) {
      let ans = randomAnswers(test, rng);
      const margin = a => { const n = normalize(test, rawScores(test, a)); const dk = dist2(n, oc.profile); let m = Infinity; test.outcomes.forEach((o2, j) => { if (j !== k) m = Math.min(m, dist2(n, o2.profile) - dk); }); return m; };
      let cur = margin(ans);
      for (let pass = 0; pass < 10; pass++) {
        let improved = false;
        for (let i = 0; i < test.questions.length; i++) {
          for (let j = 0; j < test.questions[i].options.length; j++) {
            if (j === ans[i]) continue;
            const a2 = ans.slice(); a2[i] = j; const m2 = margin(a2);
            if (m2 > cur) { ans = a2; cur = m2; improved = true; }
          }
        }
        if (!improved) break;
      }
      if (cur > 0) found = ans;
    }
    res[oc.id] = !!found;
  });
  return res;
}

function report(test) {
  const rnd = shares(test, sampleNorms(test, 200000, 2026));
  const per = shares(test, personaNorms(test, 50000, 99));
  const reach = reachability(test);
  return test.outcomes.map((oc, i) => ({ id: oc.id, random: +(rnd[i] * 100).toFixed(1), persona: +(per[i] * 100).toFixed(1), reachable: reach[oc.id], profile: oc.profile }));
}

module.exports = { L, o, q, BIG5, buildDims, tune, report, mulberry32, sampleNorms, shares };

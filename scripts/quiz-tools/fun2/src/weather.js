module.exports = {
  id: "weather",
  emoji: "🌦️",
  durationMin: 4,
  popularity: 3,
  spread: 1.6,
  title: ["Какая ты погода?", "What Kind of Weather Are You?"],
  tagline: ["Гроза, туман или северное сияние? Узнай свой эмоциональный прогноз", "Thunderstorm, fog or northern lights? Get your emotional forecast"],
  description: [
    "Психологи описывают эмоции через два главных параметра — насколько чувство приятное и насколько оно заряжено энергией. Мы добавили к ним тепло, постоянство и загадочность, собрали 15 жизненных ситуаций — и составили твой личный прогноз погоды.",
    "Psychologists map emotions on two core axes — how pleasant a feeling is and how energized it is. We added warmth, steadiness and mystery, wrote 15 everyday situations — and put together your personal weather forecast."
  ],
  tags: [["эмоции", "emotions"], ["настроение", "mood"], ["погода", "weather"], ["весёлые тесты", "fun quizzes"]],
  instructions: [
    "Отвечай так, как обычно реагируешь, а не так, как хотел(а) бы. В каждом вопросе — один вариант. Зонт не понадобится.",
    "Answer the way you usually react, not the way you wish you did. One option per question. No umbrella needed."
  ],
  disclaimer: [
    "Развлекательный тест, а не оценка настроения или психического здоровья. Если осенью и зимой у тебя неделями держатся упадок сил, подавленность и сонливость, это может быть сезонное аффективное расстройство, и с ним стоит обратиться к врачу или психологу. В России можно позвонить на бесплатный телефон доверия 8-800-2000-122 (для детей, подростков и родителей); в Москве — 051 со стационарного или 8-495-051 с мобильного; за рубежом — на местную горячую линию (findahelpline.com).",
    "This is an entertainment quiz, not an assessment of mood or mental health. If low energy, low mood and oversleeping last for weeks in autumn and winter, it may be seasonal affective disorder — worth discussing with a doctor or therapist. Find a local helpline at findahelpline.com."
  ],
  resultIntro: ["Метеорологи testik проанализировали твои ответы. Сегодня в твоём регионе:", "testik's meteorologists have analyzed your answers. Today's forecast for your region:"],
  scoringNotes: [
    "Каждый ответ добавляет баллы к пяти шкалам: свет (V, приятность эмоций), энергия (R, уровень возбуждения), тепло (W, направленность на людей), постоянство (S, стабильность настроения) и загадочность (O, воображение). Суммы приводятся к 0–1: (сумма − минимум) / (максимум − минимум). Твоя «погода» — та, чей профиль ближе всего к твоему (евклидово расстояние). Профили откалиброваны так, чтобы при случайных ответах все 12 погод выпадали примерно поровну.",
    "Each answer adds points to five scales: light (V, how pleasant your emotions are), energy (R, arousal), warmth (W, orientation toward people), steadiness (S, mood stability) and mystery (O, imagination). Sums are rescaled to 0–1 as (sum − min) / (max − min). Your ‘weather’ is the one whose profile is closest to yours (Euclidean distance). Profiles were calibrated so that all 12 weathers come up about equally often under random answering."
  ],
  methodology: [
`## На чём основан тест

- **Циркумплексная модель аффекта.** Russell (1980, *Journal of Personality and Social Psychology*) показал, что эмоции удобно располагать на круге с двумя осями: **валентность** (приятно — неприятно) и **возбуждение** (энергично — спокойно). Радость лежит в зоне «приятно и энергично», безмятежность — «приятно и спокойно», злость и тревога — «неприятно и энергично», грусть и скука — «неприятно и спокойно». Шкалы «Свет» (V) и «Энергия» (R) в тесте — это и есть эти две оси.
- **Погода влияет на настроение меньше, чем кажется.** Denissen и коллеги (2008, *Emotion*, N = 1233, онлайн-дневники) нашли, что погода объясняет совсем немного в ежедневном настроении: самые крупные коэффициенты были около |0,07|. Солнце было связано с меньшей усталостью, но люди сильно различались по чувствительности к погоде.
- **Типы реакций на погоду.** Klimstra и коллеги (2011, *Emotion*; 497 подростков и их мамы, 30 дней дневников) выделили четыре типа: «любители лета», «ненавистники лета», «ненавистники дождя» и «невозмутимые». Невозмутимых было почти половина — 48%, по пересказу CurrentResults. Тип реакции частично совпадал у детей и матерей.
- **Хорошая погода помогает, если выйти на улицу.** Keller и коллеги (2005, *Psychological Science*): тёплая солнечная весенняя погода улучшала настроение и широту мышления, но только у тех, кто проводил время на улице.
- **Погода и удовлетворённость жизнью.** Lucas и Lawless (2013, *JPSP*; данные более миллиона американцев) показали, что погода в день опроса почти не меняет оценку жизни в целом.
- **Сезонность всерьёз.** Сезонное аффективное расстройство описано Rosenthal и коллегами (1984). Это клиническое состояние, а не «тип погоды», поэтому тест его не оценивает (см. дисклеймер).

Метафора «человек = погода» использует эти идеи образно: у каждой погоды есть «эмоциональная температура» (валентность), «скорость ветра» (возбуждение), а также тепло, постоянство и загадочность.

## Как работает тест

1. 15 оригинальных ситуационных вопросов, 5–6 вариантов в каждом.
2. Ответы дают баллы по пяти шкалам: V, R, W, S, O.
3. Суммы нормируются к 0–1 и сравниваются с профилями 12 погод; побеждает ближайшая.
4. Калибровка на 120 000 симулированных случайных прохождений. Доля каждого результата:

{{DIST}}

Также проверено, что «персонаж», последовательно отвечающий в духе погоды, получает именно её.

## Ограничения

Тест не валидирован. Шкалы V и R опираются на реальную модель эмоций, но вопросы спрашивают о привычных реакциях, а не о текущем настроении. Поэтому это скорее «эмоциональный стиль», чем замер аффекта.`,
`## What this quiz is based on

- **The circumplex model of affect.** Russell (1980, *Journal of Personality and Social Psychology*) showed that emotions can be arranged on a circle with two axes: **valence** (pleasant–unpleasant) and **arousal** (activated–calm). Joy is pleasant and activated, serenity pleasant and calm, anger and anxiety unpleasant and activated, sadness and boredom unpleasant and calm. Our ‘Light’ (V) and ‘Energy’ (R) scales are those two axes.
- **Weather affects mood less than we think.** Denissen and colleagues (2008, *Emotion*, N = 1,233 online diaries) found weather explained very little day-to-day mood variance (largest coefficients around |.07|). Sunlight was linked to less tiredness, and people differed a lot in how sensitive they were to weather.
- **Weather reactivity types.** Klimstra and colleagues (2011, *Emotion*; 497 adolescents and their mothers, 30 days of diaries) identified four types: Summer Lovers, Summer Haters, Rain Haters and Unaffected. Almost half — 48%, according to a CurrentResults summary — were Unaffected. Types partly ran in families.
- **Nice weather helps if you go outside.** Keller and colleagues (2005, *Psychological Science*): warm, sunny spring weather improved mood and broadened thinking — but only for people who spent time outdoors.
- **Weather and life satisfaction.** Lucas & Lawless (2013, *JPSP*, data from over a million Americans) found that the weather on the day of a survey barely moves people's ratings of their life overall.
- **Seasonality, seriously.** Seasonal affective disorder was described by Rosenthal and colleagues (1984). It's a clinical condition, not a ‘weather type’, so this quiz does not assess it (see disclaimer).

The ‘person = weather’ metaphor uses these ideas playfully: each weather has an ‘emotional temperature’ (valence) and a ‘wind speed’ (arousal), plus warmth, steadiness and mystery.

## How the quiz works

1. 15 original situational questions with 5–6 options each.
2. Answers add points on five scales: V, R, W, S, O.
3. Sums are rescaled to 0–1 and compared to 12 weather profiles; the nearest wins.
4. Calibrated on 120,000 simulated random runs. Share of each result:

{{DIST}}

We also checked that a ‘persona’ answering consistently in the spirit of each weather gets that weather.

## Limitations

Not a validated instrument. V and R are grounded in a real model of emotion, but the questions ask about habitual reactions, not current mood — so this is an ‘emotional style’, not a measurement of affect.`
  ],
  sources: [
    { citation: "Russell, J. A. (1980). A circumplex model of affect. Journal of Personality and Social Psychology, 39(6), 1161–1178.", doi: "10.1037/h0077714" },
    { citation: "Denissen, J. J. A., Butalid, L., Penke, L., & van Aken, M. A. G. (2008). The effects of weather on daily mood: A multilevel approach. Emotion, 8(5), 662–667.", doi: "10.1037/a0013497" },
    { citation: "Klimstra, T. A., Frijns, T., Keijsers, L., Denissen, J. J. A., Raaijmakers, Q. A. W., van Aken, M. A. G., Koot, H. M., van Lier, P. A. C., & Meeus, W. H. J. (2011). Come rain or come shine: Individual differences in how weather affects mood. Emotion, 11(6), 1495–1499.", doi: "10.1037/a0024649" },
    { citation: "Keller, M. C., Fredrickson, B. L., Ybarra, O., Côté, S., Johnson, K., Mikels, J., Conway, A., & Wager, T. (2005). A warm heart and a clear head: The contingent effects of weather on mood and cognition. Psychological Science, 16(9), 724–731.", doi: "10.1111/j.1467-9280.2005.01602.x" },
    { citation: "Lucas, R. E., & Lawless, N. M. (2013). Does life seem better on a sunny day? Examining the association between daily weather conditions and life satisfaction judgments. Journal of Personality and Social Psychology, 104(5), 872–884.", doi: "10.1037/a0032124" },
    { citation: "Rosenthal, N. E., Sack, D. A., Gillin, J. C., Lewy, A. J., Goodwin, F. K., Davenport, Y., Mueller, P. S., Newsome, D. A., & Wehr, T. A. (1984). Seasonal affective disorder: A description of the syndrome and preliminary findings with light therapy. Archives of General Psychiatry, 41(1), 72–80.", doi: "10.1001/archpsyc.1984.01790120076010" },
    { citation: "CurrentResults (n.d.). What's your weather personality type? (summary of Klimstra et al., 2011).", url: "https://www.currentresults.com/Weather-Science/4-weather-mood-personality-types.php" }
  ],
  license: "Original content © testik. All questions, outcomes and texts were written from scratch for this site; no items are copied or adapted from copyrighted questionnaires or quiz sites. Scientific papers are cited only as inspiration.",
  dims: [
    { id: "V", color: "#FFE29A", name: ["Свет", "Light"], desc: ["Насколько приятны твои привычные эмоции — от светлой грусти до сияющего оптимизма. Ось «валентность» из модели Рассела.", "How pleasant your habitual emotions are — from wistful to radiant. The valence axis of Russell's model."], low: ["Светлая грусть", "Wistful"], high: ["Сияющий оптимизм", "Radiant optimism"],
      bands: [
        [["Светлая грусть", "Wistful"], [["Видишь мир без розовых очков", "You see the world without rose-tinted glasses"], ["Меланхолия как эстетика", "Melancholy as an aesthetic"], ["Глубина вместо бодрости", "Depth over pep"]], ["Тебе ближе задумчивые и сложные эмоции. Это не недостаток: умение быть с грустью делает тебя честным(ой) и глубоким(ой). Если серость затягивается на недели, поговори с кем-то — это важно.", "Pensive, complex feelings come naturally to you. That's not a flaw: being able to sit with sadness makes you honest and deep. If the grey lasts for weeks, talk to someone — it matters."]],
        [["Переменная облачность", "Partly cloudy"], [["Бывает по-разному — и это нормально", "Some days sunny, some not — normal"], ["Реалистичный оптимизм", "Realistic optimism"], ["Умеешь радоваться без эйфории", "Joy without euphoria"]], ["У тебя сбалансированная палитра эмоций: ты радуешься, грустишь и возвращаешься в равновесие.", "Your emotional palette is balanced: you feel joy and sadness and return to equilibrium."]],
        [["Сияющий оптимизм", "Radiant optimism"], [["Видишь хорошее во всём", "See the good in everything"], ["Заражаешь радостью", "Your joy is contagious"], ["Быстро восстанавливаешься", "Bounce back fast"]], ["Позитивные эмоции — твой ресурс, и они помогают тебе и окружающим. Только не обесценивай чужую грусть: иногда людям нужен не лучик света, а просто плечо.", "Positive emotions are your resource, for you and others. Just don't brush off other people's sadness — sometimes they need a shoulder, not a sunbeam."]]
      ] },
    { id: "R", color: "#FFB7B2", name: ["Энергия", "Energy"], desc: ["Сила «ветра» внутри: как быстро ты реагируешь, насколько ярко проявляешь эмоции. Ось «возбуждение» из модели Рассела.", "Your inner wind speed: how fast you react and how vividly you show feelings. The arousal axis of Russell's model."], low: ["Штиль", "Calm"], high: ["Шторм", "Storm"],
      bands: [
        [["Штиль", "Calm"], [["Спокойный темп", "Calm pace"], ["Эмоции тихие, но глубокие", "Quiet but deep feelings"], ["Любишь размеренность", "Love a steady rhythm"]], ["Ты заряжаешься в тишине и редко «взрываешься». Хороший противовес суетливому миру.", "You recharge in quiet and rarely blow up — a welcome counterweight to a frantic world."]],
        [["Лёгкий ветер", "Breezy"], [["Энергия по ситуации", "Energy as needed"], ["Умеешь и зажечь, и затихнуть", "Can spark or settle"], ["Гибкий темп", "Flexible pace"]], ["Ты регулируешь свою энергию под обстоятельства — полезный навык.", "You adjust your energy to the moment — a useful skill."]],
        [["Шторм", "Storm"], [["Яркие реакции", "Vivid reactions"], ["Много энергии", "Lots of energy"], ["Скука невыносима", "Boredom is unbearable"]], ["Ты живёшь на высоких оборотах: заражаешь драйвом, быстро решаешь. Не забывай о «штиле» — отдых делает бурю только сильнее.", "You run at high RPM — contagious drive, quick decisions. Don't skip the calm: rest makes the storm stronger."]]
      ] },
    { id: "W", color: "#FFDAC1", name: ["Тепло", "Warmth"], desc: ["Насколько твои эмоции направлены на людей: забота, утешение, объятия. Близко к доброжелательности.", "How much your emotions flow toward people: care, comfort, hugs. Akin to agreeableness."], low: ["Свежий холодок", "Crisp and independent"], high: ["Тёплый фронт", "Warm front"],
      bands: [
        [["Свежий холодок", "Crisp and independent"], [["Ценишь независимость", "Value independence"], ["Держишь дистанцию", "Keep some distance"], ["Сначала разум, потом чувства", "Head first, then heart"]], ["Ты самостоятелен(на) и не растворяешься в чужих эмоциях. Близким иногда важно услышать, что они тебе дороги, — скажи это словами.", "You're self-reliant and don't dissolve in others' emotions. Loved ones sometimes need to hear they matter — say it out loud."]],
        [["Умеренно тепло", "Mild"], [["Заботишься, не теряя себя", "Care without losing yourself"], ["Тепло по-своему", "Warm in your own way"], ["Есть границы", "Have boundaries"]], ["У тебя здоровый баланс между заботой о других и о себе.", "You balance caring for others and yourself."]],
        [["Тёплый фронт", "Warm front"], [["Утешаешь всех", "Comfort everyone"], ["Обнимашки — твой язык", "Hugs are your language"], ["Чувствуешь чужое настроение", "Sense others' moods"]], ["Рядом с тобой тепло. Береги себя: даже самому тёплому фронту нужно где-то набираться солнца.", "It's warm around you. Look after yourself — even a warm front needs to soak up sun somewhere."]]
      ] },
    { id: "S", color: "#B5EAD7", name: ["Постоянство", "Steadiness"], desc: ["Насколько стабильно твоё настроение и предсказуемы реакции. Противоположный полюс — переменчивость (близко к высокому нейротизму).", "How stable your mood and predictable your reactions are. The opposite pole is changeability (akin to high neuroticism)."], low: ["Переменчивость", "Changeable"], high: ["Устойчивый антициклон", "Stable high pressure"],
      bands: [
        [["Переменчивость", "Changeable"], [["Настроение меняется быстро", "Moods shift fast"], ["Живо реагируешь", "React vividly"], ["Любишь перемены", "Love change"]], ["Ты чувствуешь мир остро и быстро меняешься. Это даёт гибкость и яркость. Ритуалы — сон, прогулка, любимый чай — помогают не уставать от собственных бурь.", "You feel the world intensely and shift quickly — that brings flexibility and color. Rituals like sleep, walks and a favorite tea keep your storms from wearing you out."]],
        [["Сезонные колебания", "Seasonal swings"], [["Обычно ровно, иногда штормит", "Mostly steady, sometimes stormy"], ["Умеешь вернуться в баланс", "Return to balance"], ["Гибкость + опора", "Flexibility plus grounding"]], ["Ты в целом устойчив(а), но живо реагируешь на важное.", "You're generally steady but respond vividly to what matters."]],
        [["Устойчивый антициклон", "Stable high pressure"], [["Ровное настроение", "Even mood"], ["Предсказуемость", "Predictability"], ["Опора для других", "A rock for others"]], ["Ты стабилен(на) и надёжен(на) — к тебе приходят «переждать бурю». Не забывай, что и тебе можно иногда раскиснуть.", "You're steady and reliable — people come to you to wait out storms. Remember you're allowed to fall apart sometimes too."]]
      ] },
    { id: "O", color: "#C7CEEA", name: ["Загадочность", "Mystery"], desc: ["Воображение, мечтательность, любовь к необычному. Близко к открытости опыту.", "Imagination, dreaminess, love of the unusual. Akin to openness to experience."], low: ["Ясно и понятно", "Clear skies"], high: ["Туманная тайна", "Misty mystery"],
      bands: [
        [["Ясно и понятно", "Clear skies"], [["Прагматичность", "Pragmatic"], ["Говоришь как есть", "Say it like it is"], ["Реальность > фантазии", "Reality over fantasy"]], ["Ты твёрдо стоишь на земле — ценное качество. Иногда позволяй себе помечтать без цели: это тоже отдых.", "You're grounded — a valuable trait. Let yourself daydream without purpose sometimes; it's rest too."]],
        [["Лёгкая дымка", "Light haze"], [["Мечтаешь, но по делу", "Dream with purpose"], ["Любопытство в меру", "Moderate curiosity"], ["Баланс фантазии и логики", "Fantasy meets logic"]], ["Ты сочетаешь воображение и практичность.", "You combine imagination with practicality."]],
        [["Туманная тайна", "Misty mystery"], [["Богатый внутренний мир", "Rich inner world"], ["Любишь странное и красивое", "Love the strange and beautiful"], ["Тебя сложно разгадать", "Hard to read"]], ["Твоё воображение — источник творчества. Делись им: люди хотят знать, что происходит в твоём тумане.", "Your imagination fuels creativity. Share it — people want to know what's going on in your fog."]]
      ] }
  ],
  questions: [
    { t: ["Утро понедельника, звонит будильник. Ты…", "Monday morning, the alarm goes off. You…"], o: [
      [["Вскакиваю с первого раза — уже придумал(а), как сделать этот день", "Jump up on the first ring — I've already planned how to make today great"], { R: 2, V: 1 }],
      [["Пять раз жму «ещё 5 минут» и смотрю в потолок, размышляя о бренности бытия", "Hit snooze five times and stare at the ceiling contemplating the fleeting nature of existence"], { R: -1, O: 1, V: -1 }],
      [["Встаю в 6:30, как всегда. Будильник — для подстраховки", "Get up at 6:30 like always. The alarm is just a backup"], { S: 2 }],
      [["Пишу в общий чат «доброе утро, котики ☀️»", "Text the group chat ‘good morning, sunshines ☀️’"], { W: 2, V: 1 }],
      [["Просыпаюсь от того, что мне приснился гениальный сюжет, и записываю его", "Wake up from a dream with a genius plot and write it down"], { O: 2 }],
      [["Злюсь на будильник, на понедельник и на мироздание. Но встаю", "Rage at the alarm, at Monday and at the universe. But I get up"], { R: 1, V: -1, S: -1 }]
    ] },
    { t: ["Друг отменил встречу за час до неё.", "A friend cancels plans an hour before."], o: [
      [["Ничего страшного! Значит, у меня свободный вечер — ура", "No problem! A free evening — yay"], { V: 2, S: 1 }],
      [["«Ок». Внутри — маленький ураган, снаружи — «без проблем»", "‘Ok.’ Inside: a small hurricane. Outside: ‘no worries’"], { S: -1, R: 1, V: -1 }],
      [["Спрашиваю, всё ли у него в порядке, и предлагаю привезти суп", "Ask if they're okay and offer to bring soup"], { W: 2 }],
      [["Иду гулять одна(один) по вечерним улицам и думаю о жизни", "Go for a solo evening walk and think about life"], { O: 1, R: -1, W: -1 }],
      [["Спокойно переносим. У меня всё равно было чем заняться", "Calmly reschedule. I had other things to do anyway"], { S: 2, R: -1 }]
    ] },
    { t: ["Какая музыка чаще всего играет у тебя в голове?", "What music plays in your head most often?"], o: [
      [["Что-то громкое и драйвовое — чтобы хотелось бежать", "Something loud and driving — makes me want to run"], { R: 2 }],
      [["Эмбиент, лоу-фай и звук дождя", "Ambient, lo-fi and the sound of rain"], { R: -1, O: 1 }],
      [["Песня из рекламы. Уже третий день", "A jingle from a commercial. Day three"], { S: 1, O: -1 }],
      [["Весёлый поп, под который невозможно не подпевать", "Happy pop you can't help singing along to"], { V: 2, W: 1 }],
      [["Драматичная классика: то тихо, то ВНЕЗАПНО ГРОМКО", "Dramatic classical: quiet, then SUDDENLY LOUD"], { S: -2, R: 1 }],
      [["Эпичный саундтрек к фильму, которого не существует (режиссёр — я)", "An epic soundtrack to a movie that doesn't exist (directed by me)"], { O: 2, R: 1, W: -1 }]
    ] },
    { t: ["Как ты обычно злишься?", "How do you usually get angry?"], o: [
      [["Быстро и громко — и через 10 минут уже всё прошло", "Fast and loud — and ten minutes later it's over"], { R: 2, S: -1 }],
      [["Холодно и долго: ледяной взгляд, короткие ответы", "Cold and long: an icy stare and one-word answers"], { W: -2, S: 1 }],
      [["Почти никогда — не вижу смысла тратить на это силы", "Almost never — not worth the energy"], { S: 1, V: 1, R: -1 }],
      [["Молча ухожу в себя, и меня никто не может найти", "Retreat inward silently; nobody can find me"], { O: 1, W: -1, R: -1 }],
      [["Злюсь, потом плачу, потом извиняюсь и всех обнимаю", "Get mad, then cry, then apologize and hug everyone"], { W: 2, S: -1 }]
    ] },
    { t: ["Идеальный выходной?", "Your ideal day off?"], o: [
      [["Пикник с большой компанией на солнце", "A sunny picnic with a big group"], { V: 1, W: 1, R: 1 }],
      [["Дома: плед, чай, сериал — и пусть за окном хоть что", "At home: blanket, tea, a show — whatever's happening outside"], { R: -2, S: 1 }],
      [["Спонтанная поездка с друзьями — куда, решим на вокзале", "A spontaneous trip with friends — we'll pick where at the station"], { S: -1, R: 1, O: 1, W: 1 }],
      [["Поход в горы в одиночку, чтобы проверить себя", "A solo mountain hike to test myself"], { R: 1, W: -1, S: 1 }],
      [["Ночная прогулка: звёзды, огни и философские разговоры", "A night walk: stars, lights and philosophical talk"], { O: 2 }],
      [["Помогать бабушке на даче, а потом пить чай на веранде", "Help grandma in her garden, then tea on the porch"], { W: 2, S: 1 }]
    ] },
    { t: ["Друзья говорят, что ты…", "Friends say you're…"], o: [
      [["…как батарейка: зарядишь кого угодно", "…a battery: you can charge up anyone"], { R: 2, V: 1 }],
      [["…загадка: вроде знаем тебя, а вроде и нет", "…a mystery: they know you, but also don't"], { O: 2, W: -1 }],
      [["…надёжный(ая), как швейцарские часы", "…as reliable as a Swiss watch"], { S: 2 }],
      [["…самый тёплый человек на свете", "…the warmest person in the world"], { W: 2 }],
      [["…непредсказуемый(ая): никто не знает, что ты выкинешь", "…unpredictable: nobody knows what you'll do next"], { S: -2, R: 1 }],
      [["…генератор идей: с тобой каждый день — новое приключение", "…an idea generator: every day with you is a new adventure"], { O: 1, R: 1, W: 1, V: 1 }]
    ] },
    { t: ["Какой цвет тебе ближе всего?", "Which color feels most like you?"], o: [
      [["Солнечно-жёлтый", "Sunshine yellow"], { V: 2 }],
      [["Глубокий фиолетовый или изумрудный", "Deep violet or emerald"], { O: 2 }],
      [["Серебристо-белый", "Silvery white"], { S: 1, W: -1 }],
      [["Тёплый персиковый", "Warm peach"], { W: 1, V: 1, R: -1 }],
      [["Чёрно-синий, как небо перед бурей", "Blue-black, like the sky before a storm"], { R: 1, V: -1, S: -1 }],
      [["Серый — он подходит ко всему", "Grey — goes with everything"], { S: 1, R: -1, O: -1 }]
    ] },
    { t: ["Тебе пишут: «Нам надо поговорить». Первая мысль?", "Someone texts: ‘We need to talk.’ First thought?"], o: [
      [["О нет. Перебираю все свои грехи с 2009 года", "Oh no. Reviewing all my sins since 2009"], { V: -1, S: -1 }],
      [["Наверное, хорошие новости! Может, сюрприз?", "Probably good news! A surprise, maybe?"], { V: 2 }],
      [["Сразу перезваниваю — человеку, видимо, нужна поддержка", "Call right back — they probably need support"], { W: 2, R: 1 }],
      [["Отвечаю: «Давай. Когда?» — и спокойно жду", "Reply ‘Sure. When?’ and wait calmly"], { S: 2 }],
      [["Сочиняю в голове 12 сценариев, включая инопланетян", "Invent 12 scenarios in my head, including aliens"], { O: 2, S: -1 }]
    ] },
    { t: ["Как ты относишься к переменам?", "How do you feel about change?"], o: [
      [["Обожаю! Перемены — моя стихия", "Love it! Change is my element"], { S: -2, V: 1 }],
      [["Нужны, но аккуратно и по плану", "Necessary — carefully and with a plan"], { S: 2 }],
      [["Сначала страшно, но после них я всегда расцветаю", "Scary at first, but I always bloom afterward"], { V: 1, S: -1, W: 1 }],
      [["Я сам(а) их устраиваю — и иногда это ураган", "I'm the one who causes them — sometimes it's a hurricane"], { R: 2, S: -1 }],
      [["Всё меняется, а я наблюдаю и запоминаю", "Everything changes; I watch and remember"], { O: 1, R: -1 }]
    ] },
    { t: ["Что ты делаешь на шумной вечеринке?", "What do you do at a loud party?"], o: [
      [["Танцую в центре и заражаю всех энергией", "Dance in the middle and energize everyone"], { R: 2, V: 1 }],
      [["Нахожу того, кому грустно, и сижу с ним на кухне", "Find whoever's sad and sit with them in the kitchen"], { W: 2, R: -1 }],
      [["Стою у окна и сочиняю историю про каждого гостя", "Stand by the window inventing a backstory for every guest"], { O: 2, W: -1 }],
      [["Ухожу ровно в 23:00, как и планировал(а)", "Leave at 11 pm sharp, as planned"], { S: 2, W: -1 }],
      [["Спорю с кем-нибудь до хрипоты — и выигрываю", "Argue with someone till I'm hoarse — and win"], { R: 2, W: -1, V: -1 }]
    ] },
    { t: ["Твоя суперсила в трудный момент?", "Your superpower in a crisis?"], o: [
      [["Сохраняю спокойствие, когда все паникуют", "Stay calm while everyone panics"], { S: 2, R: -1 }],
      [["Нахожу хорошее даже в самом плохом", "Find the good even in the worst"], { V: 2 }],
      [["Обнимаю и утешаю — все приходят ко мне", "Hug and comfort — everyone comes to me"], { W: 2 }],
      [["Действую решительно и жёстко — некогда сюсюкаться", "Act fast and firmly — no time for coddling"], { R: 1, W: -1, S: 1 }],
      [["Придумываю нестандартный выход, о котором никто не подумал", "Come up with an unusual way out nobody thought of"], { O: 2, R: 1 }]
    ] },
    { t: ["Любимое время суток?", "Your favorite time of day?"], o: [
      [["Рассвет: свежо, тихо, всё впереди", "Dawn: fresh, quiet, everything ahead"], { S: 1, V: 1 }],
      [["Полдень: солнце, люди, жизнь кипит", "Noon: sun, people, life in full swing"], { R: 1, V: 1, W: 1 }],
      [["Сумерки — самое время подумать", "Dusk — the perfect time to think"], { O: 1, R: -1, V: -1 }],
      [["Глубокая ночь: тишина и космос", "Deep night: silence and the cosmos"], { O: 2, W: -1 }],
      [["Любое — главное, чтобы рядом были свои", "Any — as long as my people are around"], { W: 2 }],
      [["Зимний вечер: за окном темно, а дома горит гирлянда и пахнет печеньем", "A winter evening: dark outside, fairy lights and cookies inside"], { R: -1, V: 1, W: 1, O: 1 }]
    ] },
    { t: ["Как ты пишешь сообщения?", "How do you text?"], o: [
      [["КАПСОМ И С ТРЕМЯ ВОСКЛИЦАТЕЛЬНЫМИ!!!", "IN ALL CAPS WITH THREE EXCLAMATION MARKS!!!"], { R: 2, S: -1 }],
      [["Длинно, тепло и с сердечками", "Long, warm and full of hearts"], { W: 2, V: 1 }],
      [["Коротко: «ок», «да», «нет»", "Short: ‘ok’, ‘yes’, ‘no’"], { W: -1, S: 1, O: -1 }],
      [["Загадочно… с многоточиями…", "Mysteriously… with ellipses…"], { O: 2, V: -1 }],
      [["Голосовыми по пять минут — с отступлениями и смехом", "Five-minute voice notes — with tangents and laughter"], { R: 1, V: 1 }],
      [["Пачками по 15 сообщений: идеи, ссылки, мемы и «а ещё!»", "In bursts of 15: ideas, links, memes and ‘oh, and also!’"], { R: 1, O: 1, W: 1, S: -1 }]
    ] },
    { t: ["На тебя свалились неожиданные деньги. Что сделаешь?", "You get some unexpected money. What do you do?"], o: [
      [["Куплю подарки всем близким", "Buy presents for everyone I love"], { W: 2 }],
      [["Отложу — у меня есть план", "Save it — I have a plan"], { S: 2 }],
      [["Куплю билет туда, где никто из друзей ещё не был", "Buy a ticket somewhere none of my friends have been"], { O: 1, R: 1, S: -1 }],
      [["Устрою огромную вечеринку", "Throw a huge party"], { R: 1, V: 1, W: 1 }],
      [["Запишусь на курс чего-нибудь странного — стеклодувства или астрономии", "Sign up for a course in something unusual — glassblowing or astronomy"], { O: 2, V: 1 }]
    ] },
    { t: ["Твой девиз?", "Your motto?"], o: [
      [["«После дождя всегда выходит солнце»", "‘After the rain, the sun always comes out’"], { V: 1, S: -1, W: 1 }],
      [["«Тише едешь — дальше будешь»", "‘Slow and steady wins the race’"], { S: 2, R: -1 }],
      [["«Живи ярко, гори жарко»", "‘Live bright, burn hot’"], { R: 2, V: 1 }],
      [["«Не всё то, чем кажется»", "‘Things aren't what they seem’"], { O: 1, V: -1, R: -1 }],
      [["«Сила — в характере»", "‘Strength is in character’"], { W: -1, R: 1, S: 1 }],
      [["«Обними ближнего своего»", "‘Hug thy neighbor’"], { W: 2, V: 1 }]
    ] }
  ],
  outcomes: [
    { id: "thunderstorm", emoji: "⛈️", z: { V: -1, R: 1, W: 0, S: -1, O: 0 },
      title: ["Гроза — страсть, драма и озоновая свежесть", "Thunderstorm — passion, drama and fresh ozone"],
      summary: [["Эмоции у тебя яркие, быстрые и громкие", "Your emotions are vivid, fast and loud"], ["Вспыхиваешь и так же быстро отходишь", "You flare up and cool down just as fast"], ["После тебя воздух чище — ты говоришь то, что все боялись", "The air is clearer after you — you say what others feared to"], ["Скучно с тобой не бывает никогда", "Never a dull moment with you"]],
      detailed: ["Ты — гроза: яркая, мощная, немного пугающая и абсолютно завораживающая. Эмоции у тебя проходят на максимальной громкости — восторг, возмущение, вдохновение. Ты можешь «прогреметь» на совещании, а через десять минут уже смеяться и предлагать мир. Зато после тебя всегда свежо: ты не копишь недосказанности и называешь вещи своими именами.\n\nВ модели эмоций Рассела (1980) твоя зона — высокое возбуждение: энергия, которая может быть и радостной, и тревожно-злой. Это нормальная часть эмоционального спектра, а не «плохой характер». Чтобы гроза не превращалась в ураган, помогают паузы: прогулка, физическая активность и правило «отвечаю на сообщение через 10 минут, а не через 10 секунд».", "You're a thunderstorm: bright, powerful, a little scary and utterly mesmerizing. Your emotions play at full volume — rapture, outrage, inspiration. You can ‘thunder’ in a meeting and ten minutes later be laughing and making peace. And the air's always fresher after you: you don't bottle things up, and you call things what they are.\n\nIn Russell's (1980) model of emotion, your zone is high arousal: energy that can be joyful or angry-anxious. That's a normal part of the emotional spectrum, not a ‘bad temper’. To keep the storm from becoming a hurricane, use pauses: a walk, exercise, and the rule ‘reply in 10 minutes, not 10 seconds’."],
      strengths: [["Честность и прямота", "Honesty and directness"], ["Мощная энергия", "Powerful energy"], ["Страсть к тому, что важно", "Passion for what matters"]],
      growth: [["Пауза перед ответом", "Pause before replying"], ["Выпускать пар через движение", "Burn off steam through movement"]],
      funny: [["Твоё «я спокоен(на)» звучит громче, чем у других «я в ярости»", "Your ‘I'm calm’ is louder than other people's ‘I'm furious’"], ["Ты поссорился(лась) с принтером, помирился(лась) с принтером и написал(а) ему стих — всё за обеденный перерыв", "You fought with the printer, made up with the printer and wrote it a poem — all during lunch break"], ["Мама: «Не кричи». Ты: «Я НЕ КРИЧУ, Я ОБЪЯСНЯЮ С ЧУВСТВОМ»", "Mom: ‘Stop yelling.’ You: ‘I'M NOT YELLING, I'M EXPLAINING WITH FEELING’"], ["Твой мозг в 3 ночи: «А давай перекрасим стены, бросим работу и заведём енота»", "Your brain at 3 a.m.: ‘Let's repaint the walls, quit our job and adopt a raccoon’"]],
      compat: ["rainbow", "warmrain", "springwind"],
      img: "A cute fluffy storm cloud character with a determined dramatic expression and tiny glowing lightning bolts like hair, soft rain drops, soft pastel indigo, violet and electric yellow tones, glossy flat-3D style, smooth deep-lilac to periwinkle gradient background, minimal, no text" },
    { id: "sunny", emoji: "☀️", z: { V: 1, R: 0.5, W: 1, S: 0.5, O: -0.5 },
      title: ["Солнечный день — человек-витамин D", "Sunny Day — a human dose of vitamin D"],
      summary: [["Рядом с тобой всем теплее и светлее", "Everyone feels warmer and brighter around you"], ["Оптимизм без притворства", "Optimism without pretending"], ["Ты стабилен(на): хорошее настроение — это норма, а не праздник", "Steady: good mood is your normal, not a special occasion"], ["Любишь людей, прогулки и простые радости", "You love people, walks and simple joys"]],
      detailed: ["Ты — ясное небо и +23: тепло, понятно и хорошо. Ты искренне радуешься людям, легко находишь хорошее даже в обычном вторнике и умеешь поддержать так, что человек снова видит солнце. Тебя любят дети, животные и бабушки на лавочках.\n\nВ исследовании Klimstra и коллег (2011) часть людей — «любители лета» — чувствовали себя заметно лучше в тёплые солнечные дни. А Keller и коллеги (2005) показали, что хорошая погода поднимает настроение, если действительно выйти на улицу. Ты, похоже, носишь это солнце с собой. Одна подсказка: не каждому сразу нужен лучик света — иногда человеку сначала нужно, чтобы его просто выслушали в его пасмурном дне.", "You're clear skies and 73°F: warm, easy and good. You genuinely enjoy people, find the bright side of an ordinary Tuesday and can support someone until they see the sun again. Kids, animals and grandmas on park benches love you.\n\nIn Klimstra and colleagues' (2011) study, some people — ‘Summer Lovers’ — felt noticeably better on warm, sunny days, and Keller and colleagues (2005) showed nice weather lifts mood if you actually go outside. You seem to carry that sunshine with you. One tip: not everyone needs a sunbeam right away — sometimes a person first needs to be heard in their cloudy day."],
      strengths: [["Оптимизм", "Optimism"], ["Тепло к людям", "Warmth toward people"], ["Эмоциональная устойчивость", "Emotional steadiness"]],
      growth: [["Выдерживать чужую грусть, не спеша её «чинить»", "Sit with others' sadness without rushing to fix it"], ["Признавать свои пасмурные дни", "Admit your own cloudy days"]],
      funny: [["Ты здороваешься с курьером, кассиром и голубем. Голубь отвечает", "You greet the courier, the cashier and a pigeon. The pigeon greets you back"], ["Друзья в депрессии от дедлайнов, ты: «Зато мы вместе!» — и почему-то это работает", "Friends are drowning in deadlines; you go ‘But we're together!’ — and somehow it works"], ["Бабушки во дворе считают тебя «хорошим(ей) мальчиком/девочкой», хотя тебе 32", "The grandmas in your courtyard still call you ‘such a good kid’, and you're 32"], ["Твоя батарейка социальной энергии: 147%", "Your social battery: 147%"]],
      compat: ["rainbow", "snowfall", "heatwave"],
      img: "A cute round smiling sun character with soft rosy cheeks and gentle rays, waving happily, a tiny daisy beside it, soft pastel yellow and peach tones, glossy flat-3D style, smooth sky-blue to butter-yellow gradient background, minimal, no text" },
    { id: "fog", emoji: "🌫️", z: { V: -0.5, R: -1, W: -0.5, S: 0, O: 1 },
      title: ["Туман — тихая загадка", "Fog — a quiet mystery"],
      summary: [["У тебя богатый внутренний мир, куда пускают не всех", "Your rich inner world has an exclusive guest list"], ["Говоришь мало, замечаешь много", "You say little and notice a lot"], ["Любишь полутона, недосказанность и атмосферу", "You love half-tones, the unspoken and atmosphere"], ["Тебя невозможно разгадать за один вечер", "Nobody figures you out in one evening"]],
      detailed: ["Ты — туман над утренней рекой: тихий, красивый и немного таинственный. Ты не любишь громких эмоций и пустых разговоров, зато в твоей голове живут целые миры — истории, образы, наблюдения. Люди часто думают, что ты холодный(ая), а на самом деле ты просто бережёшь свою глубину для тех, кто готов в неё всмотреться.\n\nВ модели Рассела твоя зона — спокойные эмоции с лёгким оттенком меланхолии: задумчивость, созерцание. А высокая «загадочность» близка к открытости опыту — воображению и чувствительности к красоте. Твоя зона роста — иногда «рассеиваться» первым(ой): написать другу, поделиться идеей, позвать на прогулку. Твой туман гораздо уютнее, когда в нём кто-то есть.", "You're mist over a morning river: quiet, beautiful and a little mysterious. You dislike loud emotions and small talk, but your mind holds whole worlds — stories, images, observations. People often think you're cold; really, you just save your depth for those willing to look into it.\n\nIn Russell's model your zone is calm emotion with a hint of melancholy: pensiveness, contemplation. And your high ‘mystery’ score resembles openness to experience — imagination and sensitivity to beauty. Growth zone: ‘lift’ first sometimes — text a friend, share an idea, suggest a walk. Your fog is much cozier with someone in it."],
      strengths: [["Воображение", "Imagination"], ["Наблюдательность", "Observation"], ["Глубина", "Depth"]],
      growth: [["Делиться мыслями вслух", "Share your thoughts out loud"], ["Проявлять инициативу в общении", "Reach out first"]],
      funny: [["На вопрос «как дела?» ты отвечаешь «сложно сказать» — и это самый честный ответ в мире", "When asked ‘how are you?’ you say ‘hard to say’ — the most honest answer in the world"], ["Ты прочитал(а) сообщение 3 часа назад и всё ещё сочиняешь идеальный ответ из двух слов", "You read the message three hours ago and are still crafting the perfect two-word reply"], ["Знакомые: «Ты загадочный(ая)». Ты: просто забыл(а) включить звук в разговоре", "People: ‘You're so mysterious.’ You: just forgot to unmute in the conversation"], ["Твоя любимая погода — та, при которой можно не выходить и не объяснять почему", "Your favorite weather is the kind where you can stay home without explaining why"]],
      compat: ["aurora", "snowfall", "overcast"],
      img: "A cute soft translucent fog cloud character with sleepy mysterious half-closed eyes and a small knowing smile, drifting over a tiny calm lake with reeds, soft pastel grey, lilac and pearl tones, glossy flat-3D style, smooth misty-grey to lavender gradient background, minimal, no text" },
    { id: "snowfall", emoji: "❄️", z: { V: 1, R: -1, W: 1, S: 0.5, O: 0.5 },
      title: ["Снегопад — тихое волшебство", "Snowfall — quiet magic"],
      summary: [["Рядом с тобой мир замедляется и становится красивее", "The world slows down and gets prettier around you"], ["Спокойный(ая), мягкий(ая), уютный(ая)", "Calm, gentle and cozy"], ["Умеешь создавать маленькие чудеса", "You create small everyday miracles"], ["Любишь тишину, но не одиночество", "You love quiet, not loneliness"]],
      detailed: ["Ты — первый снег за окном: всё вдруг становится тихим, чистым и немного сказочным. Ты не любишь суеты, зато умеешь превращать обычный вечер в маленькое чудо: какао, гирлянда, хорошее кино и правильный человек рядом. Ты мягкий(ая), но не хрупкий(ая), а спокойствие у тебя тёплое, а не холодное.\n\nВ модели Рассела твоя зона — приятные спокойные эмоции: безмятежность, умиротворение, тихая радость. Исследования показывают, что такие «низкоэнергичные» позитивные состояния — тоже важная часть благополучия, а не только восторг и драйв. Твоя зона роста — не откладывать жизнь «до лучших времён»: иногда стоит выйти из уютного дома и слепить снеговика прямо сейчас.", "You're the first snow outside the window: suddenly everything is quiet, clean and a bit magical. You avoid fuss but turn ordinary evenings into small miracles: cocoa, string lights, a good movie and the right person nearby. You're gentle but not fragile, and your calm is warm, not cold.\n\nIn Russell's model your zone is pleasant, calm emotion: serenity, peace, quiet joy. Low-energy positive states like these are an important part of well-being too, not just excitement and drive. Growth zone: don't put life off ‘until better times’ — sometimes step out of the cozy house and build that snowman right now."],
      strengths: [["Умиротворённость", "Serenity"], ["Создание уюта", "Creating coziness"], ["Мягкая сила", "Gentle strength"]],
      growth: [["Не откладывать радости на потом", "Don't postpone joy"], ["Говорить о своих желаниях громче", "Voice your wishes louder"]],
      funny: [["Твой идеальный вечер: плед, какао и фильм, который ты смотришь уже в 14-й раз", "Your perfect evening: a blanket, cocoa and a movie you're watching for the 14th time"], ["Гирлянда у тебя висит круглый год. «Это не новогодняя, это для настроения»", "Your string lights stay up all year. ‘They're not holiday lights, they're mood lights’"], ["Ты ловишь снежинки языком в 30 лет — и не собираешься останавливаться", "You catch snowflakes on your tongue at 30 — and have no plans to stop"], ["Мама: «Опять сидишь дома?» Ты: «Я не сижу, я уютничаю»", "Mom: ‘Staying in again?’ You: ‘I'm not staying in, I'm cozying’"]],
      compat: ["sunny", "fog", "warmrain"],
      img: "A cute fluffy snowflake character with a soft gentle smile wearing a tiny knitted scarf, holding a mug of cocoa, slow falling snowflakes around, soft pastel ice-blue and cream tones, glossy flat-3D style, smooth pale-blue to pink gradient background, minimal, no text" },
    { id: "warmrain", emoji: "🌧️", z: { V: 0, R: -0.5, W: 1, S: -0.5, O: 0.5 },
      title: ["Тёплый летний дождь — нежность и эмпатия", "Warm Summer Rain — tenderness and empathy"],
      summary: [["Чувствуешь других так, будто это твои эмоции", "You feel others' emotions as if they were your own"], ["Умеешь утешать, как никто", "Nobody comforts like you do"], ["Плачешь легко — и в этом нет слабости", "You cry easily — and that's no weakness"], ["После разговора с тобой людям становится легче", "People feel lighter after talking to you"]],
      detailed: ["Ты — тёплый дождь в июле: тот, под которым хочется снять обувь и пойти по лужам. Ты чувствуешь людей очень тонко: замечаешь, когда кому-то грустно, раньше, чем человек сам это понял. Ты умеешь утешить, обнять и быть рядом без лишних слов. Иногда ты плачешь над фильмами, книгами и рекламой. Это не слабость, а большая эмоциональная чуткость.\n\nПо шкалам у тебя много тепла и мягкой, переменчивой эмоциональности. Твоя эмпатия — дар, но её важно беречь: чужие эмоции не должны полностью затапливать твои. Помогают простые границы («сейчас я не могу, давай завтра») и забота о себе — такая же нежная, как та, что ты даришь другим.", "You're a warm July rain — the kind you want to walk through barefoot. You read people finely, noticing someone's sadness before they've noticed it themselves. You comfort, hug and stay close without needing words. Sometimes you cry at movies, books and commercials — not weakness, but deep emotional sensitivity.\n\nOn our scales you score high on warmth with soft, shifting emotionality. Your empathy is a gift, but it needs protecting: other people's feelings shouldn't flood your own. Simple boundaries (‘I can't right now, let's talk tomorrow’) and self-care as gentle as the care you give others both help."],
      strengths: [["Эмпатия", "Empathy"], ["Умение утешать", "Comforting"], ["Искренность", "Sincerity"]],
      growth: [["Ставить границы", "Set boundaries"], ["Не брать на себя чужие эмоции целиком", "Don't absorb others' feelings whole"]],
      funny: [["Ты плачешь на мультике, на свадьбе незнакомцев в ленте и на видео, где собака встречает хозяина", "You cry at cartoons, at strangers' weddings in your feed and at dog-greets-owner videos"], ["Друг: «У меня всё нормально». Ты: «Я уже еду с пледом и пирогом»", "Friend: ‘I'm fine.’ You: ‘I'm on my way with a blanket and a pie’"], ["Ты извиняешься перед стулом, о который ударился(лась)", "You apologize to the chair you bumped into"], ["Твоя роль в любой компании — «психолог на кухне в 2 часа ночи»", "Your role in every friend group: the 2 a.m. kitchen therapist"]],
      compat: ["thunderstorm", "rainbow", "snowfall"],
      img: "A cute soft rain cloud character with a tender caring smile, gentle warm raindrops falling on little blooming flowers below, a tiny heart-shaped puddle, soft pastel blue, mint and peach tones, glossy flat-3D style, smooth aqua-to-peach gradient background, minimal, no text" },
    { id: "aurora", emoji: "🌌", z: { V: 0.5, R: 0.5, W: -0.5, S: -0.5, O: 1 },
      title: ["Северное сияние — редкое чудо", "Northern Lights — a rare wonder"],
      summary: [["Ты такой(ая) один(одна) — и это видно сразу", "There's only one of you, and it shows"], ["Вдохновение приходит вспышками", "Inspiration comes in flashes"], ["Независимый(ая), необычный(ая), немного космический(ая)", "Independent, unusual and a little cosmic"], ["Тебя стоит «ловить» — ты появляешься, когда захочешь", "People have to ‘catch’ you — you appear when you want to"]],
      detailed: ["Ты — северное сияние: редкое, необъяснимое и захватывающее дух. Ты мыслишь нестандартно, загораешься идеями и умеешь удивлять. Иногда ты исчезаешь на неделю в своём проекте, а потом появляешься с чем-то невероятным. Ты независим(а) и не подстраиваешься под ожидания, и именно поэтому тебя запоминают.\n\nПо шкалам это высокая открытость (воображение, творчество), позитивная энергия и переменчивость: вспышки вдохновения сменяются тишиной. Такой ритм часто встречается у творческих людей. Зона роста — предсказуемость для близких: им не обязательно знать, когда ты вспыхнешь, но важно знать, что ты не исчез(ла) навсегда. Короткое «я в процессе, люблю» творит чудеса.", "You're the northern lights: rare, inexplicable and breathtaking. You think unconventionally, catch fire with ideas and love to surprise. Sometimes you vanish into a project for a week and resurface with something incredible. You're independent and don't bend to expectations — which is exactly why people remember you.\n\nOn our scales that's high openness (imagination, creativity), positive energy and changeability: flashes of inspiration followed by silence. That rhythm is common among creative people. Growth zone: predictability for loved ones — they needn't know when you'll blaze, but they should know you haven't vanished for good. A quick ‘deep in a project, love you’ works wonders."],
      strengths: [["Креативность", "Creativity"], ["Оригинальность", "Originality"], ["Способность вдохновлять", "Inspiring others"]],
      growth: [["Держать близких в курсе", "Keep loved ones posted"], ["Доводить вспышки до результата", "Turn sparks into finished work"]],
      funny: [["Твоё вдохновение приходит в 3 ночи, в душе и ровно тогда, когда ты уже лёг(легла)", "Your inspiration strikes at 3 a.m., in the shower, and right after you've gone to bed"], ["Ты пропал(а) из чата на 9 дней, а потом прислал(а) мультфильм, который сам(а) нарисовал(а)", "You vanished from the chat for 9 days, then sent an animated short you made yourself"], ["Бабушка: «Ну кем ты работаешь-то?» Ты объясняешь 20 минут. Бабушка: «Понятно, программист»", "Grandma: ‘So what's your job?’ You explain for 20 minutes. Grandma: ‘Got it, computers’"], ["В твоих заметках 300 идей, и каждая — «гениальная, но потом»", "Your notes app holds 300 ideas, each one ‘genius, but later’"]],
      compat: ["fog", "springwind", "frost"],
      img: "A cute ethereal aurora ribbon character swirling in the night sky with sparkly dreamy eyes and a gentle smile, tiny stars and a little snowy hill below, soft pastel green, teal and violet glow, glossy flat-3D style, smooth navy-to-violet gradient background, minimal, no text" },
    { id: "rainbow", emoji: "🌈", z: { V: 1, R: 0, W: 0.5, S: -1, O: 0 },
      title: ["Радуга — оптимист после любой бури", "Rainbow — the optimist after every storm"],
      summary: [["Чувствуешь всё — и всё равно выбираешь надежду", "You feel everything — and still choose hope"], ["Твоя суперсила — восстанавливаться", "Your superpower is bouncing back"], ["Яркий(ая), разноцветный(ая), многогранный(ая)", "Bright, colorful, many-sided"], ["Превращаешь плохое в хорошую историю", "You turn bad days into good stories"]],
      detailed: ["Ты — радуга: появляешься после дождя и напоминаешь всем, что всё не зря. Ты не из тех, кому всегда легко: твоё настроение меняется, и ты чувствуешь и грусть, и тревогу. Но у тебя редкий дар — после любой бури ты находишь в себе свет и делишься им с другими. Твои истории о провалах всегда заканчиваются смехом.\n\nВ психологии это похоже на сочетание эмоциональной чувствительности и жизнестойкости — умения восстанавливаться после трудностей. Позитивные эмоции при этом не отрицают негативные, а помогают их пережить. Твоя зона роста — не требовать от себя радуги сразу: иногда дождю нужно просто дать пролиться.", "You're a rainbow: you appear after the rain and remind everyone it was all worth it. Things aren't always easy for you — your moods shift, and you feel sadness and worry. But you have a rare gift: after any storm you find light in yourself and share it. Your stories about failures always end in laughter.\n\nPsychologically, that resembles a mix of emotional sensitivity and resilience — the ability to recover from hardship. Positive emotions don't deny negative ones; they help you get through them. Growth zone: don't demand a rainbow of yourself right away — sometimes the rain just needs to fall."],
      strengths: [["Жизнестойкость", "Resilience"], ["Надежда", "Hope"], ["Многогранность", "Many-sidedness"]],
      growth: [["Разрешать себе грустить", "Let yourself be sad"], ["Не торопить хорошее настроение", "Don't rush the good mood"]],
      funny: [["Ты: плачешь из-за провала → через час рассказываешь о нём как о стендапе → друзья рыдают от смеха", "You: cry over a fail → an hour later tell it like stand-up → friends cry laughing"], ["Твоё настроение за день: 🌧️☀️🌧️🌈☀️", "Your mood today: 🌧️☀️🌧️🌈☀️"], ["Тебя бросили, уволили и облил автобус — а ты такой(ая): «Зато какой сюжет!»", "Dumped, fired and splashed by a bus — and you're like: ‘What a plot twist!’"], ["Мама: «Ты в кого такой(ая)?» Ты: «В погоду, мам»", "Mom: ‘Who do you take after?’ You: ‘The weather, Mom’"]],
      compat: ["thunderstorm", "sunny", "warmrain"],
      img: "A cute smiling rainbow arc character with soft fluffy clouds as hands, a few sparkling raindrops still falling, soft pastel rainbow tones, glossy flat-3D style, smooth sky-blue to pink gradient background, minimal, no text" },
    { id: "blizzard", emoji: "🌨️", z: { V: -0.5, R: 1, W: -1, S: 0.5, O: -0.5 },
      title: ["Метель — непреклонный характер", "Blizzard — an unstoppable force"],
      summary: [["Сильный(ая), решительный(ая), неудержимый(ая)", "Strong, decisive, unstoppable"], ["Если ты что-то решил(а) — не остановить", "Once you've decided, nothing stops you"], ["Тепло показываешь делами, а не словами", "You show warmth in actions, not words"], ["Сложности тебя только раззадоривают", "Difficulty just fires you up"]],
      detailed: ["Ты — метель: мощная, упорная и совершенно не боящаяся препятствий. Ты не тратишь время на сантименты: видишь цель — идёшь к ней, даже если вокруг ничего не видно. Люди иногда принимают твою прямоту за холодность, но те, кто знает тебя близко, понимают: если случится беда, ты первым(ой) приедешь с лопатой и будешь откапывать.\n\nПо шкалам это высокая энергия и устойчивость в паре с независимостью и прагматичностью. Такой характер отлично работает в кризисах и сложных проектах. Зона роста — эмоциональная теплота словами: сказать «я тобой горжусь» или «мне тебя не хватало» — тоже проявление силы. И иногда метели стоит стихнуть, чтобы увидеть, как красиво она всё замела.", "You're a blizzard: powerful, persistent and completely unfazed by obstacles. You don't waste time on sentiment: you see the goal and head for it, even in a whiteout. People sometimes mistake your directness for coldness, but those close to you know that if trouble hits, you'll be first on the scene with a shovel.\n\nOn our scales that's high energy and steadiness, combined with independence and pragmatism. This temperament shines in crises and tough projects. Growth zone: warmth in words — saying ‘I'm proud of you’ or ‘I missed you’ is strength too. And sometimes a blizzard should settle down long enough to see how beautifully it has covered everything."],
      strengths: [["Решительность", "Determination"], ["Стойкость", "Resilience"], ["Надёжность в кризис", "Reliability in a crisis"]],
      growth: [["Говорить о чувствах словами", "Put feelings into words"], ["Сбавлять напор с близкими", "Ease off the pressure with loved ones"]],
      funny: [["«Мне не холодно» — говоришь ты в лёгкой куртке в −20, и это правда", "‘I'm not cold,’ you say in a light jacket at −4°F — and it's true"], ["Твоё «ок» в чате заставляет всех нервно перечитывать собственные сообщения", "Your ‘ok’ in the chat makes everyone nervously reread their own messages"], ["Друг плачет. Ты: «Так. Кто обидел? Адрес»", "Friend's crying. You: ‘Right. Who did it? Address.’"], ["Ты решил(а) бегать по утрам — и бегаешь уже пятый год. Даже в метель. Особенно в метель", "You decided to run every morning — and you have for five years. Even in blizzards. Especially in blizzards"]],
      compat: ["frost", "thunderstorm", "heatwave"],
      img: "A cute determined snow cloud character with a brave little frown and swirling snowflakes around like a cape, tiny pine trees below, soft pastel icy-blue, white and lilac tones, glossy flat-3D style, smooth steel-blue to lilac gradient background, minimal, no text" },
    { id: "frost", emoji: "🧊", z: { V: 0.5, R: 0.5, W: -0.5, S: 1, O: -0.5 },
      title: ["Ясное морозное утро — бодрость и чёткость", "Crisp Frosty Morning — clarity and pep"],
      summary: [["Ясная голова в любой ситуации", "A clear head in any situation"], ["Дисциплина — твой способ быть свободным(ой)", "Discipline is how you stay free"], ["Бодрый(ая), чёткий(ая), без лишней драмы", "Peppy, precise, drama-free"], ["Холодок — только снаружи", "The chill is only on the outside"]],
      detailed: ["Ты — ясное морозное утро: свежо, светло и всё видно до горизонта. Ты рано встаёшь, думаешь чётко и не любишь, когда эмоции мешают делу. У тебя стабильное настроение, понятные планы и бодрость, которой завидуют совы. Люди ценят тебя за то, что с тобой всё ясно: ты говоришь, что думаешь, и делаешь, что обещал(а).\n\nПо шкалам это высокая устойчивость и позитивная энергия при лёгкой эмоциональной дистанции. Исследования хронотипов показывают, что «жаворонки» в среднем более добросовестны, и это хорошо видно по твоему стилю. Зона роста — тепло и гибкость: не все умеют быть такими же собранными, а иногда лучший план — это его отсутствие и тёплый чай с другом.", "You're a crisp, frosty morning: fresh, bright, and you can see all the way to the horizon. You rise early, think clearly and don't let emotions get in the way of what needs doing. Your mood is steady, your plans clear, and your morning pep makes night owls jealous. People value you because things are clear with you: you say what you think and do what you promise.\n\nOn our scales that's high steadiness and positive energy with a little emotional distance. Chronotype research shows ‘larks’ tend to be more conscientious on average — and it shows in your style. Growth zone: warmth and flexibility. Not everyone can be as organized, and sometimes the best plan is no plan and a warm tea with a friend."],
      strengths: [["Ясность мышления", "Clear thinking"], ["Самодисциплина", "Self-discipline"], ["Стабильность", "Stability"]],
      growth: [["Проявлять тепло открыто", "Show warmth openly"], ["Прощать неидеальность — себе и другим", "Forgive imperfection — yours and others'"]],
      funny: [["Ты пишешь коллегам «доброе утро» в 6:45, и они воспринимают это как угрозу", "You text coworkers ‘good morning’ at 6:45 and they take it as a threat"], ["Твоя зарядка: 20 минут. Зарядка твоих друзей: телефона, до 100%", "Your morning workout: 20 minutes. Your friends' morning charge: their phones, to 100%"], ["Ты моешь кружку сразу после того, как допил(а). Друзья считают это суперсилой", "You wash your mug the second you finish it. Your friends consider this a superpower"], ["Тебя не берёт ни простуда, ни драма в общем чате", "Neither colds nor group-chat drama can touch you"]],
      compat: ["blizzard", "overcast", "aurora"],
      img: "A cute crisp ice crystal character with a bright confident smile and rosy cheeks, morning sun rising behind snowy hills, sparkling frost patterns, soft pastel ice-blue, white and soft gold tones, glossy flat-3D style, smooth pale-gold to sky-blue gradient background, minimal, no text" },
    { id: "overcast", emoji: "☁️", z: { V: 0, R: -1, W: 0, S: 1, O: -0.5 },
      title: ["Пасмурный уютный день — непоколебимое спокойствие", "Cozy Overcast Day — unshakable calm"],
      summary: [["Тебя почти невозможно вывести из равновесия", "It's nearly impossible to throw you off balance"], ["Любишь размеренность и предсказуемость", "You love routine and predictability"], ["Рядом с тобой хочется выдохнуть", "People exhale around you"], ["Погода, дедлайны и драмы — всё мимо", "Weather, deadlines, drama — all bounce off"]],
      detailed: ["Ты — мягкий пасмурный день: не холодно, не жарко, спокойно и очень уютно. Тебя сложно удивить, напугать или вывести из себя: ты встречаешь и хорошее, и плохое ровно и рассудительно. Ты ценишь привычки, любимые вещи и спокойный ритм, а тревожные друзья тянутся к тебе, как к тёплой батарее.\n\nКстати, в исследовании Klimstra и коллег (2011) почти половина участников оказалась «невозмутимыми»: их настроение почти не зависело от погоды. А Denissen и коллеги (2008) показали, что погода в целом объясняет совсем немного в ежедневном настроении. Ты — живое воплощение этих данных. Зона роста — иногда разрешать себе всплески: новое хобби, спонтанная поездка или громкий смех — и это не нарушит твой антициклон.", "You're a soft overcast day: not cold, not hot, calm and very cozy. It's hard to surprise, scare or rile you: you meet good and bad alike with an even, sensible temper. You treasure habits, favorite things and a calm rhythm, and anxious friends gravitate to you like to a warm radiator.\n\nBy the way, in Klimstra and colleagues' (2011) study almost half the participants were ‘Unaffected’ — their mood barely depended on weather — and Denissen and colleagues (2008) showed weather explains very little of daily mood overall. You're those findings in human form. Growth zone: allow yourself some bursts — a new hobby, a spontaneous trip, a loud laugh. They won't break your high-pressure system."],
      strengths: [["Невозмутимость", "Composure"], ["Надёжность", "Dependability"], ["Успокаивающее присутствие", "A calming presence"]],
      growth: [["Пробовать новое", "Try new things"], ["Показывать эмоции, даже маленькие", "Show emotions, even small ones"]],
      funny: [["За окном ураган, в новостях паника, а ты: «Ну, суп сам себя не сварит»", "There's a hurricane outside and panic on the news, and you're like: ‘Well, the soup won't cook itself’"], ["Ты заказываешь одно и то же уже 4 года, и официант начинает готовить, когда ты входишь", "You've ordered the same thing for four years; the server starts cooking when you walk in"], ["Друг: «Ты вообще когда-нибудь паникуешь?» Ты: «Один раз. В 2017-м. Кончился сыр»", "Friend: ‘Do you ever panic?’ You: ‘Once. In 2017. We ran out of cheese’"], ["Твоё лицо на американских горках и в очереди в банке — одинаковое", "Your face on a roller coaster and in a bank queue: identical"]],
      compat: ["frost", "fog", "sunny"],
      img: "A cute soft grey-white cloud character lounging calmly with a content sleepy smile, wrapped in a tiny blanket and holding a teacup, a little house window glowing below, soft pastel grey, cream and dusty-blue tones, glossy flat-3D style, smooth dove-grey to blush gradient background, minimal, no text" },
    { id: "heatwave", emoji: "🔥", z: { V: 0.5, R: 1, W: 0.5, S: 0, O: -0.5 },
      title: ["Жаркий июльский полдень — энергия на максимум", "Hot July Noon — energy at full blast"],
      summary: [["Тебя много, и это прекрасно", "There's a lot of you — and that's great"], ["Живёшь на полную: работа, спорт, вечеринки", "You live full-on: work, sports, parties"], ["Горячий(ая) в эмоциях, щедрый(ая) в дружбе", "Hot-blooded in emotion, generous in friendship"], ["Действовать — лучше, чем думать", "Doing beats overthinking"]],
      detailed: ["Ты — июльский полдень: солнце в зените, воздух звенит, хочется в море и на подвиги. Ты полон(на) энергии, быстро загораешься, легко заводишь людей и обожаешь движение — спорт, поездки, большие компании. Ты прямолинеен(на) и практичен(на): вместо того чтобы долго думать, ты делаешь и смотришь, что выйдет.\n\nВ модели Рассела твоя зона — высокое возбуждение с позитивной окраской: азарт, воодушевление, восторг. «Любители лета» из исследования Klimstra и коллег, наверное, тебя бы поняли. Зона роста — тень и вода: даже самое жаркое солнце должно иногда заходить, иначе можно сгореть. Режим отдыха и сна — твой кондиционер.", "You're a July noon: sun at its peak, the air humming, everyone wants a swim and an adventure. You're full of energy, quick to catch fire, great at firing people up, and you love motion — sports, trips, big groups. You're direct and practical: rather than overthinking, you act and see what happens.\n\nIn Russell's model your zone is high arousal with positive tone: excitement, enthusiasm, elation. The ‘Summer Lovers’ in Klimstra and colleagues' study would get you. Growth zone: shade and water — even the hottest sun must set sometimes, or you'll burn out. Rest and sleep are your air conditioning."],
      strengths: [["Энергичность", "Energy"], ["Энтузиазм", "Enthusiasm"], ["Щедрость в дружбе", "Generosity in friendship"]],
      growth: [["Отдыхать до того, как устанешь", "Rest before you're exhausted"], ["Слушать тех, кто медленнее", "Listen to slower people"]],
      funny: [["Тебе написали «как дела?», а ты уже зовёшь человека на сап-борд, концерт и в поход", "Someone texts ‘how are you?’ and you're already inviting them paddleboarding, to a concert and on a hike"], ["Твоё «отдохнуть» — это пробежать полумарафон, а потом пойти на вечеринку", "Your idea of ‘resting’ is a half-marathon followed by a party"], ["Друзья выключают твою энергию только ночью. И то не всегда", "Friends can only switch off your energy at night. Not always, though"], ["Бабушка: «Надень панамку!» Ты уже на третьем пляже", "Grandma: ‘Wear a sun hat!’ You're already at your third beach"]],
      compat: ["sunny", "springwind", "blizzard"],
      img: "A cute energetic sun character with a big grin, tiny sunglasses and a swim ring, beach waves and a little ice-cream cart nearby, soft pastel orange, coral and turquoise tones, glossy flat-3D style, smooth coral-to-aqua gradient background, minimal, no text" },
    { id: "springwind", emoji: "🍃", z: { V: 0.5, R: 1, W: 0.5, S: -1, O: 1 },
      title: ["Весенний ветер — ветер перемен", "Spring Wind — the wind of change"],
      summary: [["Ты приносишь новое: идеи, людей, планы", "You bring the new: ideas, people, plans"], ["Не можешь усидеть на месте", "You can't sit still"], ["Лёгкий(ая), игривый(ая) и очень любопытный(ая)", "Light, playful and very curious"], ["С тобой всё начинается", "Everything starts with you"]],
      detailed: ["Ты — весенний ветер: свежий, игривый и приносящий запах перемен. Ты вечно что-то начинаешь — проекты, хобби, путешествия, знакомства — и вдохновляешь на это других. Ты любопытен(на), общителен(на) и немного непоседлив(а): тебе тесно в рамках, и ты постоянно ищешь, что бы ещё попробовать.\n\nПо шкалам это высокая энергия, открытость опыту и тепло к людям — сочетание, которое делает тебя прирождённым инициатором. Переменчивость здесь — не слабость, а двигатель. Зона роста — доводить начатое: ветер перемен прекрасен, но иногда стоит задержаться в одном месте и посмотреть, что выросло из посаженных тобой семян.", "You're a spring wind: fresh, playful and carrying the scent of change. You're always starting something — projects, hobbies, trips, friendships — and inspiring others to do the same. You're curious, sociable and a little restless: boxes feel cramped, and you're always hunting for the next thing to try.\n\nOn our scales that's high energy, openness to experience and warmth toward people — a combo that makes you a natural initiator. Changeability here isn't weakness; it's an engine. Growth zone: finishing things. The wind of change is wonderful, but sometimes linger in one place and see what's grown from the seeds you planted."],
      strengths: [["Инициативность", "Initiative"], ["Любознательность", "Curiosity"], ["Лёгкость в общении", "Easy sociability"]],
      growth: [["Доводить начатое", "Finish what you start"], ["Давать себе передышку", "Give yourself a breather"]],
      funny: [["У тебя 4 начатых курса, 3 хобби и 1 идея стартапа, придуманная по дороге в магазин", "You have 4 courses in progress, 3 hobbies and 1 startup idea invented on the way to the store"], ["Ты перекрасил(а) волосы, переставил(а) мебель и выучил(а) пять слов по-японски — и всё в один вторник", "You dyed your hair, rearranged the furniture and learned five Japanese words — all on one Tuesday"], ["Друзья узнают о твоих планах из сторис, причём уже из аэропорта", "Friends learn about your plans from your stories — already from the airport"], ["Мама: «Когда ты остепенишься?» Ты: «Мам, ветер не остепеняется»", "Mom: ‘When will you settle down?’ You: ‘Mom, the wind doesn't settle down’"]],
      compat: ["aurora", "heatwave", "thunderstorm"],
      img: "A cute playful swirl-of-wind character with a mischievous happy face, carrying fresh green leaves, cherry blossom petals and a tiny paper kite, soft pastel mint, pink and sky-blue tones, glossy flat-3D style, smooth mint-to-sky-blue gradient background, minimal, no text" }
  ]
};

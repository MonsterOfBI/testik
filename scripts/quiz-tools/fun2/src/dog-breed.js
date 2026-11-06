module.exports = {
  id: "dog-breed",
  emoji: "🐶",
  durationMin: 5,
  popularity: 4,
  spread: 1.6,
  title: ["Какая ты порода собаки?", "Which Dog Breed Are You?"],
  tagline: ["Золотистый ретривер, шиба-ину или такса? Найди своего пёсика по характеру", "Golden retriever, Shiba Inu or dachshund? Find your canine personality match"],
  description: [
    "У собак, как и у людей, есть личность: исследователи описывают её почти теми же чертами, что и нашу. Ответь на 15 вопросов о работе, выходных и спорах — и узнай, какой породе соответствует твой характер. Спойлер: учёные выяснили, что порода предсказывает поведение конкретной собаки хуже, чем принято думать.",
    "Dogs, like people, have personalities — researchers describe them with nearly the same traits as ours. Answer 15 questions about work, weekends and arguments to find the breed that matches your character. Spoiler: scientists found breed predicts an individual dog's behavior worse than people think."
  ],
  tags: [["собаки", "dogs"], ["животные", "animals"], ["личность", "personality"], ["весёлые тесты", "fun quizzes"]],
  instructions: [
    "Отвечай про себя, человека (хотя виляние хвостом не возбраняется). Выбери один вариант в каждом вопросе — тот, что ближе к тебе в обычной жизни.",
    "Answer about yourself, the human (tail-wagging allowed). Pick one option per question — the one closest to your everyday self."
  ],
  disclaimer: [
    "Развлекательный тест. Описания пород — это популярные образы, а не научные характеристики. Масштабное исследование Morrill и коллег (2022) показало, что порода объясняет лишь около 9% различий в поведении собак. Поэтому не выбирай собаку по результату этого теста: узнай конкретного пса, его историю и потребности, а при выборе породы советуйся с кинологом и заводчиком или приютом.",
    "Entertainment quiz. Breed descriptions are popular images, not scientific profiles. A large study by Morrill and colleagues (2022) found breed explains only about 9% of variation in dog behavior. So please don't choose a dog based on this quiz: get to know the individual dog, its history and needs, and consult a trainer, breeder or shelter."
  ],
  resultIntro: ["Гав! Наши эксперты (два корги и один кот-консультант) изучили твои ответы. Ты —", "Woof! Our experts (two corgis and one consulting cat) have reviewed your answers. You are…"],
  scoringNotes: [
    "Каждый ответ добавляет баллы к пяти шкалам: энергия (E), дружелюбие (A), послушание и собранность (C), чувствительность (N) и любопытство (O). Это те же измерения, которыми исследователи описывают личность и людей, и собак. Суммы приводятся к 0–1: (сумма − минимум) / (максимум − минимум). Затем выбирается порода, чей профиль ближе всего к твоему (евклидово расстояние). Профили откалиброваны так, чтобы при случайных ответах каждая из 12 пород выпадала примерно одинаково часто.",
    "Each answer adds points to five scales: energy (E), friendliness (A), focus and trainability (C), sensitivity (N) and curiosity (O) — the dimensions researchers use to describe both human and dog personality. Sums are rescaled to 0–1 as (sum − min) / (max − min), and you get the breed whose profile is closest to yours (Euclidean distance). Profiles were calibrated so all 12 breeds come up about equally often under random answering."
  ],
  methodology: [
`## На чём основан тест

- **У собак есть личность.** Gosling, Kwan и John (2003, *JPSP*) показали, что черты собак можно оценивать почти так же надёжно, как черты людей, и что они хорошо ложатся на энергичность/экстраверсию, нейротизм, доброжелательность и открытость. Обзор Jones и Gosling (2005) свёл десятки исследований темперамента собак. Ley, Bennett и Coleman (2008) выделили у собак пять измерений: экстраверсия, мотивация, сосредоточенность на обучении, дружелюбие и нейротизм. Наши шкалы E, O, C, A, N повторяют эту логику.
- **C-BARQ.** Hsu и Serpell (2003, *JAVMA*) создали широко используемый опросник поведения собак для владельцев. Он оценивает обучаемость, возбудимость, привязанность, страхи, агрессию и тревогу разлуки. На данных C-BARQ построены многие сравнения пород.
- **Порода — плохой предсказатель конкретной собаки.** Morrill и коллеги (2022, *Science*) опросили владельцев 18 385 собак и генотипировали 2155. Порода объяснила лишь около **9%** различий в поведении — меньше, чем принято думать, хотя для внешности её роль примерно в пять раз больше. Сильнее всего с породой связаны послушание («biddability»), интерес к игрушкам и общительность с людьми. Почти никак не связан порог агрессивной реакции. Мы честно используем «характеры пород» как культурные образы, а не как факты о конкретных собаках.
- **Владельцы похожи на своих собак.** Turcsán и коллеги (2012, *Applied Animal Behaviour Science*) нашли положительные связи между личностью владельцев и их собак по всем пяти измерениям. Четыре из них сохранялись, даже когда собаку оценивал независимый человек. Roy и Christenfeld (2004, *Psychological Science*) показали, что незнакомые люди могут сопоставить породистых собак с их хозяевами по фото лучше, чем случайно. Отсюда идея теста: какой «собачий» характер похож на твой.
- **Различия между группами пород.** Turcsán, Kubinyi и Miklósi (2011) и обзор Mehrkam и Wynne (2014) описывают, что различия в обучаемости и смелости между группами пород существуют, но внутри породы разброс большой.

## Как работает тест

1. 15 оригинальных ситуационных вопросов о тебе (человеке), 5–6 вариантов.
2. Ответы дают баллы по пяти шкалам: E, A, C, N, O.
3. Суммы нормируются к 0–1 и сравниваются с профилями 12 пород; побеждает ближайшая.
4. Калибровка на 120 000 симулированных случайных прохождений. Доля каждого результата:

{{DIST}}

Также проверено, что «персонаж», отвечающий в духе породы, получает именно её.

## Ограничения

Тест не валидирован. Профили пород — популярные образы, частично согласованные со средними тенденциями, но, как показали Morrill и коллеги, отдельная собака может сильно отличаться от «типичного» представителя породы.`,
`## What this quiz is based on

- **Dogs have personalities.** Gosling, Kwan & John (2003, *JPSP*) showed dog traits can be judged about as reliably as human traits and map well onto energy/extraversion, neuroticism, agreeableness and openness. Jones & Gosling (2005) reviewed dozens of dog temperament studies. Ley, Bennett & Coleman (2008) found five dog dimensions: extraversion, motivation, training focus, amicability and neuroticism. Our E, O, C, A, N scales follow that logic.
- **C-BARQ.** Hsu & Serpell (2003, *JAVMA*) developed a widely used owner questionnaire on dog behavior — trainability, excitability, attachment, fears, aggression and separation-related behavior. Many breed comparisons rely on C-BARQ data.
- **Breed is a poor predictor of an individual dog.** Morrill and colleagues (2022, *Science*) surveyed owners of 18,385 dogs and genotyped 2,155. Breed explained only about **9%** of behavioral variation — less than commonly believed, while its role in physical traits was about fivefold larger. Breed related most to biddability, toy-directedness and human sociability, and barely at all to the threshold for agonistic reactions. So we honestly use ‘breed personalities’ as cultural images, not facts about any particular dog.
- **Owners resemble their dogs.** Turcsán and colleagues (2012, *Applied Animal Behaviour Science*) found positive owner–dog personality correlations on all five dimensions; four held even when an independent person rated the dog. Roy & Christenfeld (2004, *Psychological Science*) showed strangers could match purebred dogs to their owners from photos better than chance. Hence the quiz idea: which ‘dog personality’ resembles yours.
- **Breed-group differences.** Turcsán, Kubinyi & Miklósi (2011) and Mehrkam & Wynne's (2014) review describe real group differences in trainability and boldness — with large variation within breeds.

## How the quiz works

1. 15 original situational questions about you (the human), 5–6 options each.
2. Answers add points on five scales: E, A, C, N, O.
3. Sums are rescaled to 0–1 and compared to 12 breed profiles; the nearest wins.
4. Calibrated on 120,000 simulated random runs. Share of each result:

{{DIST}}

We also verified that a ‘persona’ answering in each breed's spirit gets that breed.

## Limitations

Not validated. Breed profiles are popular images partly aligned with average tendencies — but, as Morrill and colleagues showed, an individual dog can differ greatly from its breed's ‘typical’ member.`
  ],
  sources: [
    { citation: "Morrill, K., Hekman, J., Li, X., McClure, J., Logan, B., Goodman, L., Gao, M., Dong, Y., Alonso, M., Carmichael, E., Snyder-Mackler, N., Alonso, J., Noh, H. J., Johnson, J., Koltookian, M., Lieu, C., Megquier, K., Swofford, R., Turner-Maier, J., ... Karlsson, E. K. (2022). Ancestry-inclusive dog genomics challenges popular breed stereotypes. Science, 376(6592), eabk0639.", doi: "10.1126/science.abk0639", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9675396/" },
    { citation: "Hsu, Y., & Serpell, J. A. (2003). Development and validation of a questionnaire for measuring behavior and temperament traits in pet dogs. Journal of the American Veterinary Medical Association, 223(9), 1293–1300.", doi: "10.2460/javma.2003.223.1293" },
    { citation: "Turcsán, B., Range, F., Virányi, Z., Miklósi, Á., & Kubinyi, E. (2012). Birds of a feather flock together? Perceived personality matching in owner–dog dyads. Applied Animal Behaviour Science, 140(3–4), 154–160.", url: "https://real.mtak.hu/29704/" },
    { citation: "Gosling, S. D., Kwan, V. S. Y., & John, O. P. (2003). A dog's got personality: A cross-species comparative approach to personality judgments in dogs and humans. Journal of Personality and Social Psychology, 85(6), 1161–1169.", doi: "10.1037/0022-3514.85.6.1161" },
    { citation: "Jones, A. C., & Gosling, S. D. (2005). Temperament and personality in dogs (Canis familiaris): A review and evaluation of past research. Applied Animal Behaviour Science, 95(1–2), 1–53.", doi: "10.1016/j.applanim.2005.04.008" },
    { citation: "Ley, J., Bennett, P., & Coleman, G. (2008). Personality dimensions that emerge in companion canines. Applied Animal Behaviour Science, 110(3–4), 305–317.", doi: "10.1016/j.applanim.2007.04.016" },
    { citation: "Roy, M. M., & Christenfeld, N. J. S. (2004). Do dogs resemble their owners? Psychological Science, 15(5), 361–363.", doi: "10.1111/j.0956-7976.2004.00684.x" },
    { citation: "Turcsán, B., Kubinyi, E., & Miklósi, Á. (2011). Trainability and boldness traits differ between dog breed clusters based on conventional breed categories and genetic relatedness. Applied Animal Behaviour Science, 132(1–2), 61–70.", doi: "10.1016/j.applanim.2011.03.006" },
    { citation: "Mehrkam, L. R., & Wynne, C. D. L. (2014). Behavioral differences among breeds of domestic dogs (Canis lupus familiaris): Current status of the science. Applied Animal Behaviour Science, 155, 12–27.", doi: "10.1016/j.applanim.2014.03.005" }
  ],
  license: "Original content © testik. All questions, outcomes and texts were written from scratch for this site; no items are copied or adapted from C-BARQ, MCPQ-R or other copyrighted questionnaires or quiz sites. Breed names are generic; descriptions are affectionate popular images, not breed standards.",
  dims: [
    { id: "E", color: "#FFD3B6", name: ["Энергия", "Energy"], desc: ["Активность, общительность, потребность в движении. У собак и у людей — аналог экстраверсии.", "Activity, sociability, need for movement — the extraversion analog in dogs and people."], low: ["Диванный эксперт", "Couch expert"], high: ["Вечный двигатель", "Perpetual motion"],
      bands: [
        [["Диванный эксперт", "Couch expert"], [["Ценишь отдых", "Value rest"], ["Энергию тратишь с умом", "Spend energy wisely"], ["Тишина заряжает", "Quiet recharges you"]], ["Ты знаешь цену хорошему отдыху. Немного прогулок и движения — и твоя батарейка будет ещё стабильнее.", "You know the value of rest. A bit of walking and movement will make your battery even steadier."]],
        [["Прогулка по расписанию", "Walks on schedule"], [["Активность в меру", "Moderate activity"], ["И побегать, и полежать", "Run or lounge — both fine"], ["Гибкий режим", "Flexible pace"]], ["У тебя сбалансированная энергия: можешь и в поход, и на диван.", "Your energy is balanced: hiking or lounging, both work."]],
        [["Вечный двигатель", "Perpetual motion"], [["Нужно движение", "Need to move"], ["Люди заряжают", "People charge you"], ["Скука — враг", "Boredom is the enemy"]], ["Тебе нужно много активности и общения. Как и энергичным собакам: без нагрузки энергия ищет выход в хаосе.", "You need lots of action and company. Like energetic dogs: without an outlet, energy turns into chaos."]]
      ] },
    { id: "A", color: "#FFAAA5", name: ["Дружелюбие", "Friendliness"], desc: ["Теплота к людям, желание быть рядом, мягкость. Аналог доброжелательности.", "Warmth toward people, wanting closeness, gentleness — akin to agreeableness."], low: ["Сам по себе", "Independent"], high: ["Обнимашки 24/7", "Hugs 24/7"],
      bands: [
        [["Сам по себе", "Independent"], [["Ценишь личное пространство", "Value personal space"], ["Доверие надо заслужить", "Trust must be earned"], ["Честность важнее вежливости", "Honesty over politeness"]], ["Ты независим(а) и не раздаёшь любовь всем подряд. Зато те, кому ты доверяешь, знают, как много это значит.", "You're independent and don't hand out affection freely — those you trust know how much it means."]],
        [["Тёплый, но с границами", "Warm with boundaries"], [["Дружелюбен(на), но избирателен(на)", "Friendly but selective"], ["Умеешь сказать «нет»", "Can say ‘no’"], ["Баланс", "Balance"]], ["Ты открыт(а) людям, не теряя себя.", "You're open to people without losing yourself."]],
        [["Обнимашки 24/7", "Hugs 24/7"], [["Любишь всех", "Love everyone"], ["Миролюбие", "Peacemaker"], ["Хочешь быть рядом", "Want to be close"]], ["С тобой тепло и спокойно. Не забывай о своих границах: любить всех — прекрасно, но себя тоже.", "You're warm and calming to be around. Mind your boundaries — loving everyone is great, yourself included."]]
      ] },
    { id: "C", color: "#A8E6CF", name: ["Собранность", "Focus & trainability"], desc: ["Дисциплина, сосредоточенность на задаче, готовность следовать правилам. У собак — «обучаемость».", "Discipline, task focus, willingness to follow rules — ‘trainability’ in dogs."], low: ["Своенравность", "Free-willed"], high: ["Отличник дрессировки", "Top of the class"],
      bands: [
        [["Своенравность", "Free-willed"], [["Делаешь по-своему", "Do it your way"], ["Правила — не догма", "Rules aren't dogma"], ["Мотивация — изнутри", "Self-motivated"]], ["Ты не любишь, когда тобой командуют. Это источник независимости и креатива. Пара собственных правил поможет не утонуть в хаосе.", "You hate being bossed around — a source of independence and creativity. A few rules of your own keep chaos at bay."]],
        [["Слушаюсь, если есть смысл", "Obedient when it makes sense"], [["Гибкая дисциплина", "Flexible discipline"], ["Умеешь сосредоточиться", "Can focus"], ["Но и отвлечься можешь", "Can also wander"]], ["Ты собран(а), когда нужно, и свободен(на), когда можно.", "Focused when needed, free when possible."]],
        [["Отличник дрессировки", "Top of the class"], [["Схватываешь быстро", "Learn fast"], ["Любишь задачи", "Love tasks"], ["Надёжность", "Reliability"]], ["Ты обожаешь, когда всё понятно и получается. Помни: отдых — тоже команда, и её нужно выполнять.", "You love clarity and success. Remember: ‘rest’ is a command too — follow it."]]
      ] },
    { id: "N", color: "#B5D8FA", name: ["Чувствительность", "Sensitivity"], desc: ["Насколько сильно ты реагируешь на стресс, новое и чужие эмоции. Аналог нейротизма.", "How strongly you react to stress, novelty and others' emotions — akin to neuroticism."], low: ["Невозмутимость", "Unflappable"], high: ["Тонкая натура", "Sensitive soul"],
      bands: [
        [["Невозмутимость", "Unflappable"], [["Стресс отскакивает", "Stress bounces off"], ["Уверенность", "Confidence"], ["Спокойствие", "Calm"]], ["Тебя сложно напугать. Это ресурс — и для тебя, и для тех, кто рядом.", "Hard to rattle — a resource for you and those around you."]],
        [["Живые реакции", "Lively reactions"], [["Чувствуешь, но справляешься", "Feel it, handle it"], ["Иногда волнуешься", "Sometimes worry"], ["Быстро успокаиваешься", "Calm down quickly"]], ["У тебя здоровая эмоциональная чувствительность.", "Your emotional sensitivity is healthy."]],
        [["Тонкая натура", "Sensitive soul"], [["Замечаешь всё", "Notice everything"], ["Реагируешь ярко", "React vividly"], ["Нужна безопасность", "Need security"]], ["Ты чуток(чутка) к миру — и это дар. Предсказуемые ритуалы и поддержка близких помогают чувствовать себя в безопасности. Если тревога мешает жить, стоит поговорить со специалистом.", "You're finely tuned to the world — a gift. Predictable rituals and support help you feel safe. If anxiety gets in the way of life, consider talking to a professional."]]
      ] },
    { id: "O", color: "#CDB4F6", name: ["Любопытство", "Curiosity"], desc: ["Интерес к новому, исследовательский азарт, нестандартность. Аналог открытости опыту.", "Interest in the new, exploratory drive, originality — akin to openness."], low: ["Любит привычное", "Loves the familiar"], high: ["Нос по ветру", "Nose to the wind"],
      bands: [
        [["Любит привычное", "Loves the familiar"], [["Свои маршруты", "Own routes"], ["Стабильность", "Stability"], ["Новое — постепенно", "New things gradually"]], ["Тебе хорошо в знакомом мире. Иногда новая тропинка в парке приносит больше радости, чем кажется.", "You're happy in the familiar. A new path in the park sometimes brings more joy than you'd expect."]],
        [["Любопытство по настроению", "Curious when in the mood"], [["Исследуешь, когда интересно", "Explore when interested"], ["Баланс нового и старого", "Mix of new and old"], ["Без фанатизма", "No obsession"]], ["Ты открыт(а) новому, не теряя опоры.", "Open to the new without losing your footing."]],
        [["Нос по ветру", "Nose to the wind"], [["Всё нужно понюхать", "Must sniff everything"], ["Нестандартные решения", "Unusual solutions"], ["Скучно без загадок", "Bored without puzzles"]], ["Твой исследовательский азарт ведёт к открытиям. Главное — не убегать за каждой белкой.", "Your exploratory drive leads to discoveries. Just don't chase every squirrel."]]
      ] }
  ],
  questions: [
    { t: ["Ты возвращаешься домой после долгого дня. Первым делом…", "You come home after a long day. First thing you do…"], o: [
      [["Сразу на пробежку — энергии ещё вагон", "Head out for a run — still tons of energy"], { E: 2 }],
      [["Падаю на диван лицом вниз. Не трогайте", "Collapse face-down on the couch. Do not disturb"], { E: -2 }],
      [["Обнимаю всех домашних по очереди", "Hug everyone at home, one by one"], { A: 2 }],
      [["Раскладываю вещи по местам и проверяю план на завтра", "Put everything away and check tomorrow's plan"], { C: 2 }],
      [["Исследую холодильник: вдруг там появилось что-то новое", "Investigate the fridge — maybe something new appeared"], { O: 1, C: -1 }]
    ] },
    { t: ["В парке к тебе подходит незнакомец и заводит разговор.", "A stranger in the park strikes up a conversation."], o: [
      [["Отлично! Через 5 минут мы лучшие друзья", "Great! In five minutes we're best friends"], { E: 1, A: 1 }],
      [["Вежливо отвечаю, но держу дистанцию", "Answer politely but keep my distance"], { A: -1 }],
      [["Немного пугаюсь, но потом оттаиваю", "Get a little startled, then warm up"], { N: 1, A: 1 }],
      [["Оцениваю: кто он, зачем подошёл и не угрожает ли моим", "Assess: who is this, why, and is he a threat to my people"], { C: 1, N: -1 }],
      [["Рассказываю ему три интересных факта о голубях", "Tell him three fascinating facts about pigeons"], { O: 2 }],
      [["Поддерживаю беседу, тонко подстраиваясь под его настроение", "Keep the conversation going, subtly tuning in to his mood"], { A: 1, N: 1, O: 1 }]
    ] },
    { t: ["Твой идеальный отпуск?", "Your ideal vacation?"], o: [
      [["Горы, снег, рюкзак и 30 километров в день", "Mountains, snow, a backpack and 20 miles a day"], { E: 1, O: 1 }],
      [["Шезлонг, тень и сон до обеда", "A sun lounger, shade and sleeping till noon"], { E: -2 }],
      [["Город, музеи и 15 экскурсий по расписанию", "A city, museums and 15 scheduled tours"], { O: 1, C: 1 }],
      [["Дача с семьёй: все вместе, шашлыки, дети", "The country house with family: everyone together, barbecue, kids"], { A: 2 }],
      [["Место, где никого нет. Совсем никого", "Somewhere with nobody. Absolutely nobody"], { A: -1, E: -1 }]
    ] },
    { t: ["Как ты реагируешь на критику?", "How do you react to criticism?"], o: [
      [["Принимаю к сведению и быстро исправляю", "Take note and fix it fast"], { C: 2 }],
      [["Переживаю весь вечер, а потом ещё неделю", "Stew about it all evening, then for another week"], { N: 2 }],
      [["Делаю вид, что не слышал(а), и продолжаю по-своему", "Pretend I didn't hear and keep doing it my way"], { C: -1, A: -1 }],
      [["Отшучиваюсь, и критик сам начинает смеяться", "Joke it off until the critic starts laughing too"], { E: 1, N: -1 }],
      [["Возмущаюсь громче, чем нужно, а потом остываю", "Get louder than necessary, then cool down"], { N: 1, E: 1, A: -1 }]
    ] },
    { t: ["Тебе дали новую сложную задачу.", "You're given a hard new task."], o: [
      [["Ура! Наконец-то что-то интересное — дайте две", "Yay! Finally something interesting — give me two"], { O: 1, C: 1, E: 1 }],
      [["Сделаю идеально, даже если придётся сидеть до ночи", "I'll do it perfectly, even if it takes all night"], { C: 2, N: 1 }],
      [["Сначала полежу, подумаю… и сделаю в последний момент", "First I'll lie down, think… and do it at the last minute"], { C: -1, E: -1 }],
      [["Спрошу коллег, как лучше: вместе веселее", "Ask coworkers how best to do it — it's more fun together"], { A: 1, E: 1 }],
      [["Сделаю, но по-своему, а не так, как сказали", "I'll do it — my way, not the way I was told"], { C: -1, O: 1 }]
    ] },
    { t: ["Лучшая награда для тебя — это…", "The best reward for you is…"], o: [
      [["Вкусная еда. Много вкусной еды", "Delicious food. Lots of it"], { A: 1, O: -1 }],
      [["Похвала и признание: «Ты молодец!»", "Praise and recognition: ‘Good job!’"], { C: 1, N: 1 }],
      [["Новое приключение", "A new adventure"], { O: 1, E: 1 }],
      [["Тишина и возможность побыть одному(ой)", "Quiet and some time alone"], { A: -1, E: -1 }],
      [["Время с любимыми людьми", "Time with the people I love"], { A: 2 }]
    ] },
    { t: ["Как ты ведёшь себя в незнакомой компании?", "How do you act around new people?"], o: [
      [["Знакомлюсь со всеми, даже с котом хозяев", "Meet everyone — even the host's cat"], { E: 2 }],
      [["Нахожу одного человека и весь вечер держусь рядом", "Find one person and stick close all evening"], { A: 1, N: 1, E: -1 }],
      [["Сначала наблюдаю из угла и оцениваю обстановку", "Watch from a corner and assess the situation first"], { E: -1, C: 1 }],
      [["Шумлю больше всех, хотя внутри немного волнуюсь", "I'm the loudest one there, though a bit nervous inside"], { N: 1, E: 1 }],
      [["Командую: «Так, все играем в мафию!»", "Take charge: ‘Okay, everyone, we're playing a party game!’"], { E: 1, C: 1, N: -1 }],
      [["Зову всех на спонтанную ночную прогулку — куда-нибудь, где мы ещё не были", "Invite everyone on a spontaneous night walk — somewhere we've never been"], { E: 1, O: 1, A: 1, C: -1 }]
    ] },
    { t: ["Утром ты…", "In the morning you…"], o: [
      [["Встаю в 6 и уже бегаю", "Get up at 6 and I'm already running"], { E: 1, C: 1 }],
      [["Встаю, только если на кухне пахнет едой", "Only get up if the kitchen smells like food"], { C: -1, A: 1 }],
      [["Валяюсь и неспешно наблюдаю, как просыпается мир", "Lounge around and watch the world wake up"], { E: -1, N: -1 }],
      [["Бужу всех вокруг, потому что мне скучно", "Wake everyone up because I'm bored"], { E: 2, C: -1 }],
      [["Просыпаюсь от каждого шороха", "Wake up at every little sound"], { N: 2 }]
    ] },
    { t: ["Твой стиль в спорах?", "Your arguing style?"], o: [
      [["Миролюбивый: давайте все обнимемся", "Peacemaker: let's all just hug"], { A: 2, N: -1 }],
      [["Упрямо стою на своём, даже если неправ(а)", "Stubbornly hold my ground, even when wrong"], { A: -1, C: -1 }],
      [["Логично и спокойно доказываю", "Make my case calmly and logically"], { C: 1, N: -1 }],
      [["Громко и драматично: кто-то же должен защищать справедливость!", "Loudly and dramatically: someone has to defend justice!"], { N: 1, E: 1 }],
      [["Ухожу. Спорить — ниже моего достоинства", "Walk away. Arguing is beneath me"], { A: -1, E: -1 }]
    ] },
    { t: ["Что у тебя в рюкзаке?", "What's in your backpack?"], o: [
      [["Всё по отделениям: аптечка, зарядка, перекус, план Б", "Everything sorted: first aid, charger, snack, plan B"], { C: 2 }],
      [["Перекус. Три перекуса. И ещё один перекус", "A snack. Three snacks. And another snack"], { A: 1, C: -1 }],
      [["Странные находки: камушек, билетик, перо", "Odd finds: a pebble, a ticket stub, a feather"], { O: 2 }],
      [["Ничего — я налегке, руки нужны для приключений", "Nothing — I travel light, hands free for adventure"], { E: 1, O: 1, C: -1 }],
      [["Антистресс-набор: наушники, жвачка, успокаивающий чай", "An anti-stress kit: headphones, gum, calming tea"], { N: 2 }]
    ] },
    { t: ["Как ты учишься новому?", "How do you learn new things?"], o: [
      [["Быстро и с азартом: давайте следующую задачку!", "Fast and eager: next challenge, please!"], { C: 1, O: 1, E: 1 }],
      [["Только если мне самому(ой) интересно", "Only if I'm personally interested"], { C: -1, O: 1 }],
      [["Аккуратно, по инструкции, до идеала", "Carefully, by the instructions, to perfection"], { C: 2 }],
      [["Вместе с друзьями — так веселее", "With friends — it's more fun"], { A: 1, E: 1 }],
      [["Медленно, но если уж выучил(а) — то навсегда", "Slowly, but once I've learned it, it's forever"], { E: -1, C: 1 }],
      [["С удовольствием и с красивым конспектом, а если не выходит — очень расстраиваюсь", "Eagerly, with beautiful notes — and I get really upset if it doesn't work"], { O: 1, C: 1, N: 1 }]
    ] },
    { t: ["Тебя оставили дома одного(одну) на весь день.", "You're left home alone all day."], o: [
      [["Кайф! Наконец-то тишина", "Bliss! Finally some quiet"], { A: -1, N: -1 }],
      [["Скучаю через 15 минут и пишу всем подряд", "Miss everyone after 15 minutes and text them all"], { A: 1, N: 1 }],
      [["Устраиваю генеральную уборку", "Do a deep clean"], { C: 2 }],
      [["Перерываю шкафы и нахожу что-то давно забытое", "Dig through the closets and find something long forgotten"], { O: 1, C: -1 }],
      [["Сплю. Весь день. Лучший день", "Sleep. All day. Best day ever"], { E: -2 }]
    ] },
    { t: ["Какая у тебя «походка» по жизни?", "How do you ‘walk’ through life?"], o: [
      [["Бодрая трусца — всё успеваю", "A brisk trot — I get it all done"], { E: 1, C: 1 }],
      [["Элегантно и с достоинством", "Elegantly, with dignity"], { O: 1, C: 1, E: -1 }],
      [["Вприпрыжку — жизнь же прекрасна!", "Skipping — life is beautiful!"], { E: 1, A: 1, N: -1 }],
      [["Мелкими шажками, но очень решительно и с лаем на всех", "Tiny steps, but very determined — and barking at everyone"], { N: 1, E: 1, A: -1 }],
      [["Петляю: увидел(а) что-то интересное — свернул(а)", "Zigzagging: see something interesting — off I go"], { O: 2, C: -1 }],
      [["Не спеша, вразвалочку и с улыбкой", "Slowly, waddling, with a smile"], { E: -1, A: 1, N: -1 }]
    ] },
    { t: ["Друзья ценят тебя за…", "Friends value you for…"], o: [
      [["Верность: я всегда рядом", "Loyalty: I'm always there"], { A: 1, C: 1 }],
      [["Позитив и энергию", "Positivity and energy"], { E: 2 }],
      [["Ум и находчивость", "Brains and resourcefulness"], { O: 1, C: 1 }],
      [["Честность, даже неудобную", "Honesty, even when it's awkward"], { A: -1, O: 1 }],
      [["Чуткость: я чувствую, когда кому-то плохо", "Sensitivity: I can tell when someone's hurting"], { N: 1, A: 1 }],
      [["Чувство юмора и умение не унывать", "My sense of humor and never losing heart"], { E: 1, N: -1 }]
    ] },
    { t: ["Твой девиз?", "Your motto?"], o: [
      [["«Работа — лучший отдых»", "‘Work is the best rest’"], { C: 2, E: 1 }],
      [["«Ничего не боюсь. Ну, почти ничего»", "‘I fear nothing. Well, almost nothing’"], { N: 1, E: 1 }],
      [["«Сначала поспим, потом разберёмся»", "‘Nap first, figure it out later’"], { E: -1, N: -1 }],
      [["«Свобода превыше всего»", "‘Freedom above all’"], { C: -1, O: 1 }],
      [["«Вместе веселее»", "‘Better together’"], { A: 2 }],
      [["«Я сам(а) по себе»", "‘I walk alone’"], { A: -1, E: -1 }]
    ] }
  ],
  outcomes: [
    { id: "golden", emoji: "🦮", z: { E: 0.5, A: 1, C: 0.5, N: -0.5, O: 0 },
      title: ["Золотистый ретривер — солнышко в шерсти", "Golden Retriever — sunshine with fur"],
      summary: [["Любишь всех, и все любят тебя", "You love everyone, and everyone loves you"], ["Оптимизм, который не выключается", "Optimism with no off switch"], ["Надёжный(ая) друг и командный игрок", "A dependable friend and team player"], ["«Golden retriever energy» — это про тебя", "‘Golden retriever energy’ is literally you"]],
      detailed: ["Ты — золотистый ретривер: тёплый(ая), открытый(ая), надёжный(ая) и бесконечно позитивный(ая). Ты искренне радуешься людям, легко находишь общий язык с кем угодно и всегда готов(а) помочь. В интернете даже появилось выражение «энергия золотистого ретривера» — так называют людей, рядом с которыми всем хорошо.\n\nПо шкалам у тебя высокое дружелюбие, умеренная энергия, собранность и спокойствие. Morrill и коллеги (2022) нашли, что общительность с людьми — одна из самых наследуемых черт собак. Но и среди ретриверов бывают интроверты, ведь порода объясняет лишь около 9% поведения. Зона роста — говорить «нет» и не принимать чужое плохое настроение на свой счёт.", "You're a golden retriever: warm, open, reliable and endlessly positive. You genuinely light up around people, connect with anyone and are always ready to help. The internet even coined ‘golden retriever energy’ for people who make everyone feel good.\n\nOn our scales you're high on friendliness, with moderate energy, focus and calm. Morrill and colleagues (2022) found sociability with humans is among the most heritable dog traits — though there are introverted goldens too, since breed explains only about 9% of behavior. Growth zone: say ‘no’, and don't take others' bad moods personally."],
      strengths: [["Дружелюбие", "Friendliness"], ["Оптимизм", "Optimism"], ["Надёжность", "Reliability"]],
      growth: [["Говорить «нет»", "Say ‘no’"], ["Не брать на себя чужие эмоции", "Don't absorb others' moods"]],
      funny: [["Ты здороваешься с курьером так радостно, что он начинает подозревать подвох", "You greet the delivery guy so happily he suspects a prank"], ["Тебе сказали «молодец» — и ты счастлив(а) до конца недели", "Someone said ‘good job’ and you're happy for the rest of the week"], ["Друг грустит — ты приносишь ему печенье, плед и мем. Именно в таком порядке", "Friend's sad — you bring cookies, a blanket and a meme. In that order"], ["Мама: «Ты со всеми дружишь?» Ты: «А что, можно не со всеми?»", "Mom: ‘Are you friends with everyone?’ You: ‘Wait, that's optional?’"]],
      compat: ["corgi", "bernese", "border-collie"],
      img: "A cute golden retriever puppy character with a huge happy smile and a tennis ball, fluffy golden fur and a wagging tail, little hearts around, soft pastel golden and cream tones, glossy flat-3D style, smooth butter-yellow to peach gradient background, minimal, no text" },
    { id: "border-collie", emoji: "🐕", z: { E: 1, A: 0, C: 1, N: 0.5, O: 1 },
      title: ["Бордер-колли — гений-трудоголик", "Border Collie — the workaholic genius"],
      summary: [["Умный(ая), быстрый(ая) и всегда в деле", "Smart, quick and always on the job"], ["Без задачи начинаешь пасти людей", "Without a task, you start herding people"], ["Схватываешь всё с полуслова", "You pick things up instantly"], ["Отдых? А это какая команда?", "Rest? Which command is that?"]],
      detailed: ["Ты — бордер-колли: самая сообразительная и работоспособная «порода» в любом коллективе. Ты быстро учишься, обожаешь задачи и не можешь сидеть без дела. Если тебе нечем заняться, ты начинаешь организовывать всех вокруг: составлять планы, раздавать задания, «пасти» друзей на пути к цели.\n\nПо шкалам у тебя высокая энергия, собранность и любопытство плюс немного тревожности, ведь неидеальный результат тебя волнует. Morrill и коллеги (2022) нашли, что «biddability» (готовность выполнять команды) — одна из черт, которые сильнее всего различаются между породами. Пастушьи собаки по ней часто впереди. Зона роста — отдыхать, не чувствуя вины: даже лучшей пастушьей собаке нужно лежать на солнце.", "You're a border collie: the smartest, hardest-working ‘breed’ in any team. You learn fast, love tasks and can't sit idle. With nothing to do, you start organizing everyone — making plans, handing out jobs, ‘herding’ friends toward the goal.\n\nOn our scales you're high on energy, focus and curiosity, with a touch of worry because imperfect results bother you. Morrill and colleagues (2022) found ‘biddability’ (responsiveness to commands) is one of the traits that differ most between breeds — herding dogs often lead. Growth zone: rest without guilt. Even the best herding dog needs to lie in the sun."],
      strengths: [["Интеллект", "Intelligence"], ["Трудолюбие", "Work ethic"], ["Обучаемость", "Learning speed"]],
      growth: [["Отдыхать без чувства вины", "Rest without guilt"], ["Не «пасти» тех, кто не просил", "Don't herd those who didn't ask"]],
      funny: [["В отпуске ты составил(а) таблицу с маршрутом, бюджетом и графиком отдыха. Отдых — с 14:00 до 14:15", "On vacation you made a spreadsheet of routes, budget and rest periods. Rest: 2:00 to 2:15 pm"], ["Друзья пошли гулять, а ты незаметно собрал(а) их в кучку и привёл(а) к цели", "Friends went for a walk; you quietly herded them together and led them to the destination"], ["Ты выучил(а) новый язык, потому что «было скучно в выходные»", "You learned a new language because ‘the weekend was boring’"], ["Начальник: «Можно не спешить». Ты: уже сделал(а) и ждёшь следующую задачу", "Boss: ‘No rush.’ You: already done, awaiting the next task"]],
      compat: ["german-shepherd", "golden", "poodle"],
      img: "A cute black-and-white border collie character with bright focused eyes, holding a tiny clipboard, a few fluffy sheep in the background, soft pastel colors, glossy flat-3D style, smooth mint-to-sky-blue gradient background, minimal, no text" },
    { id: "corgi", emoji: "🍞", z: { E: 0.5, A: 0, C: 0, N: -1, O: 0.5 },
      title: ["Корги — маленький босс с большим характером", "Corgi — a small boss with a big personality"],
      summary: [["Уверенность выше роста", "Confidence taller than you are"], ["Весёлый(ая), но с командирскими замашками", "Cheerful, with a commander's streak"], ["Харизма, от которой невозможно отвести взгляд", "Charisma you can't look away from"], ["Мемный(ая) — в лучшем смысле", "Meme-worthy — in the best way"]],
      detailed: ["Ты — корги: невысокий рост компенсируется огромной уверенностью в себе. Ты весёлый(ая), общительный(ая) и любопытный(ая), но при этом точно знаешь, кто здесь главный (ты). Ты не боишься ни критики, ни новых ситуаций: идёшь по жизни уверенной походкой, а все вокруг улыбаются.\n\nКорги — пастушья порода, поэтому у них есть привычка «управлять» другими. По шкалам у тебя эмоциональная устойчивость, энергия и любопытство без лишней сентиментальности. Это делает тебя прирождённым лидером компании. Зона роста — слушать других: иногда главный не тот, кто громче командует, а тот, кто лучше слышит.", "You're a corgi: short stature, colossal self-confidence. You're cheerful, sociable and curious — and you know exactly who's in charge (you). Neither criticism nor new situations faze you: you strut through life and everyone around smiles.\n\nCorgis are a herding breed, hence the habit of ‘managing’ others. On our scales you're emotionally steady, energetic and curious without excess sentimentality — a natural leader of the pack. Growth zone: listen to others. Sometimes the leader isn't the one who barks orders loudest, but the one who hears best."],
      strengths: [["Уверенность", "Confidence"], ["Харизма", "Charisma"], ["Стрессоустойчивость", "Stress resilience"]],
      growth: [["Слушать других", "Listen to others"], ["Делиться лидерством", "Share the lead"]],
      funny: [["У тебя короткие лапки, но ты всё равно приходишь первым(ой)", "Short legs, but somehow you always arrive first"], ["Ты зашёл(шла) в комнату — и через минуту все делают то, что ты сказал(а)", "You walk into a room and a minute later everyone's doing what you said"], ["Твоё фото с вечеринки — самое популярное, хотя ты просто стоял(а) и улыбался(лась)", "Your party photo gets the most likes, though you just stood there smiling"], ["Бабушка: «Какой же ты батончик!» Ты: «Я лидер, бабуль». Бабушка: «Батончик-лидер»", "Grandma: ‘You're such a little loaf!’ You: ‘I'm a leader, Grandma.’ Grandma: ‘A little loaf leader’"]],
      compat: ["golden", "husky", "frenchie"],
      img: "A cute corgi character with short legs, a fluffy bread-loaf-shaped bottom and a confident grin, wearing a tiny crown, soft pastel orange, cream and pink tones, glossy flat-3D style, smooth peach-to-lilac gradient background, minimal, no text" },
    { id: "shiba", emoji: "🦊", z: { E: -0.5, A: -1, C: -0.5, N: 0, O: 0.5 },
      title: ["Шиба-ину — независимый философ", "Shiba Inu — the independent philosopher"],
      summary: [["Ты сам(а) по себе — и тебе так нравится", "You walk alone — and you like it"], ["Любовь надо заслужить", "Affection must be earned"], ["Упрямство — твоя суперсила", "Stubbornness is your superpower"], ["Немного кот в теле собаки", "A bit of a cat in a dog's body"]],
      detailed: ["Ты — шиба-ину: независимый(ая), гордый(ая) и немного загадочный(ая). Ты не бросаешься обниматься с первым встречным и не любишь, когда тобой командуют. Ты сам(а) решаешь, когда общаться, а когда нет. Зато если ты кого-то выбрал(а), то это навсегда, и человек об этом знает, хотя ты никогда не скажешь вслух.\n\nПо шкалам у тебя низкая потребность в близости с окружающими, своенравность и любопытство. В интернете шиба давно стала мемом, а её выражение морды — символом скептицизма. Помни: независимость — это ресурс, но иногда полезно сказать близким, что они тебе дороги. Просто так, без повода.", "You're a Shiba Inu: independent, proud and a little mysterious. You don't hug strangers and hate being bossed around; you decide when to socialize and when not to. But once you choose someone, it's forever — and they know it, even though you'll never say so.\n\nOn our scales you have a low need for closeness, a free will and curiosity. Online, the Shiba became a meme long ago, its expression a symbol of skepticism. Remember: independence is a resource, but sometimes tell your loved ones they matter — just because."],
      strengths: [["Независимость", "Independence"], ["Самодостаточность", "Self-sufficiency"], ["Честность", "Honesty"]],
      growth: [["Проявлять тёплые чувства", "Show warm feelings"], ["Иногда уступать", "Compromise sometimes"]],
      funny: [["Тебя зовут — ты слышишь. Ты не идёшь. Ты обдумываешь, стоит ли", "Someone calls you. You hear them. You don't come. You're considering whether it's worth it"], ["Твоё лицо, когда кто-то пытается обнять тебя без разрешения: 😐", "Your face when someone tries to hug you without asking: 😐"], ["Ты любишь людей. Издалека. В разумных количествах", "You love people. From a distance. In reasonable amounts"], ["Мама: «Позвони бабушке». Ты: «Позвоню, когда сам(а) решу». Звонишь через 5 минут", "Mom: ‘Call your grandma.’ You: ‘I'll call when I decide.’ You call five minutes later"]],
      compat: ["dachshund", "greyhound", "husky"],
      img: "A cute Shiba Inu character sitting with a calm unimpressed side-eye expression and curled tail, holding a tiny cup of green tea, soft pastel orange, cream and sage tones, glossy flat-3D style, smooth sage-to-apricot gradient background, minimal, no text" },
    { id: "frenchie", emoji: "🐾", z: { E: 0, A: 1, C: -1, N: 0, O: -0.5 },
      title: ["Французский бульдог — уютный комик", "French Bulldog — the cozy comedian"],
      summary: [["Любишь людей, еду и диван — в любом порядке", "You love people, food and the couch — in any order"], ["Смешной(ая) даже тогда, когда не стараешься", "Funny even when you're not trying"], ["Правила? Какие правила?", "Rules? What rules?"], ["Обнимашки — твой язык любви", "Cuddles are your love language"]],
      detailed: ["Ты — французский бульдог: уютный(ая), ласковый(ая) и очень смешной(ая). Ты обожаешь компанию любимых людей, вкусную еду и мягкий диван. Ты не гонишься за рекордами и не любишь строгих правил, зато умеешь сделать любой вечер тёплым и весёлым. Твоё выражение лица говорит больше тысячи слов.\n\nПо шкалам у тебя максимальное дружелюбие, свободный подход к правилам и любовь к простым радостям. Люди с таким профилем часто становятся «эмоциональной опорой» компании. Зона роста — немного дисциплины: режим и прогулки полезны не только бульдогам. Будильник — не враг, а друг, просто вы ещё не познакомились.", "You're a French bulldog: cozy, affectionate and very funny. You adore your favorite people, good food and a soft couch. You don't chase records or love strict rules, but you can make any evening warm and fun. Your facial expressions speak volumes.\n\nOn our scales you're maximally friendly, relaxed about rules and fond of simple pleasures. People with this profile often become the emotional anchor of their group. Growth zone: a bit of discipline — routines and walks aren't just for bulldogs. The alarm clock isn't your enemy; you just haven't been properly introduced."],
      strengths: [["Тепло", "Warmth"], ["Юмор", "Humor"], ["Умение наслаждаться жизнью", "Enjoying life"]],
      growth: [["Режим и движение", "Routine and movement"], ["Доводить дела до конца", "Follow through"]],
      funny: [["Ты храпишь так мило, что тебя записывают на видео", "You snore so adorably people record it"], ["Слово «вкусняшка» действует на тебя мгновенно, где бы ты ни находился(лась)", "The word ‘snack’ works on you instantly, wherever you are"], ["Ты пытался(лась) пойти на пробежку, но по дороге встретил(а) друзей и кафе", "You tried to go for a run but met friends and a café on the way"], ["Бабушка: «Ты похудел(а)!» Ты: «Нет». Бабушка: «Тогда съешь ещё»", "Grandma: ‘You've lost weight!’ You: ‘No.’ Grandma: ‘Then eat more’"]],
      compat: ["bernese", "corgi", "golden"],
      img: "A cute French bulldog character with big bat ears and a goofy happy face, cuddling a tiny pillow on a couch with a snack nearby, soft pastel fawn, lilac and cream tones, glossy flat-3D style, smooth lavender-to-peach gradient background, minimal, no text" },
    { id: "husky", emoji: "🐺", z: { E: 1, A: 0.5, C: -1, N: -0.5, O: 1 },
      title: ["Хаски — свободный дух и драма-квин", "Husky — free spirit and drama queen"],
      summary: [["Энергии хватит на три упряжки", "Energy for three sled teams"], ["Свобода превыше всего", "Freedom above all"], ["Громко комментируешь всё, что происходит", "You loudly comment on everything"], ["Обаятельный(ая) хулиган(ка)", "A charming troublemaker"]],
      detailed: ["Ты — хаски: свободолюбивый(ая), энергичный(ая) и невероятно харизматичный(ая). Ты обожаешь приключения, движение и новые места, а скука для тебя — худшее наказание. Ты дружелюбен(на) и общителен(на), но не любишь, когда тебя пытаются ограничить. Правила ты воспринимаешь как вызов. И да, у тебя есть мнение обо всём — и ты его озвучишь.\n\nПо шкалам у тебя высокая энергия, любопытство и своенравность. Ездовые собаки веками работали в команде на огромных дистанциях, поэтому им нужно много движения. Тебе, похоже, тоже. Зона роста — дисциплина и умение доводить дела до конца: свобода прекраснее, когда есть надёжная опора.", "You're a husky: freedom-loving, energetic and wildly charismatic. You adore adventures, movement and new places; boredom is the worst punishment. You're friendly and sociable but hate being fenced in — rules feel like a challenge. And yes, you have an opinion about everything, and you'll voice it.\n\nOn our scales you're high on energy, curiosity and free will. Sled dogs worked in teams over huge distances for centuries, so they need lots of exercise — and so, apparently, do you. Growth zone: discipline and follow-through. Freedom is sweeter with a solid foundation."],
      strengths: [["Энергия", "Energy"], ["Любовь к приключениям", "Love of adventure"], ["Харизма", "Charisma"]],
      growth: [["Доводить дела до конца", "Finish what you start"], ["Принимать разумные правила", "Accept sensible rules"]],
      funny: [["Тебе сказали «нет» — и ты произнёс(ла) драматичный монолог на 4 минуты", "Someone said ‘no’ and you delivered a four-minute dramatic monologue"], ["Ты сбежал(а) с скучного мероприятия «на минутку» и вернулся(лась) через 3 часа с новыми друзьями", "You slipped out of a boring event ‘for a minute’ and returned three hours later with new friends"], ["Твоя реакция на снег: «А-А-А-А, СНЕГ!»", "Your reaction to snow: ‘AAAAA, SNOW!’"], ["Мама: «Ты можешь посидеть спокойно хоть минуту?» Ты: «А это как?»", "Mom: ‘Can you sit still for just one minute?’ You: ‘How does that work?’"]],
      compat: ["corgi", "dachshund", "shiba"],
      img: "A cute fluffy husky character with striking blue eyes, mid-howl with a playful dramatic expression, snowflakes and a tiny sled around, soft pastel grey, white and icy-blue tones, glossy flat-3D style, smooth ice-blue to lilac gradient background, minimal, no text" },
    { id: "german-shepherd", emoji: "🛡️", z: { E: 0, A: 0, C: 1, N: -0.5, O: -0.5 },
      title: ["Немецкая овчарка — верный защитник", "German Shepherd — the loyal guardian"],
      summary: [["Надёжность уровня «скала»", "Reliability: rock-solid"], ["Дисциплина и чувство долга", "Discipline and a sense of duty"], ["Защищаешь своих без лишних слов", "You protect your people without fuss"], ["Сначала оцениваешь, потом действуешь", "Assess first, act second"]],
      detailed: ["Ты — немецкая овчарка: собранный(ая), надёжный(ая) и преданный(ая). Ты всегда знаешь, где твои люди и всё ли с ними в порядке. Ты не тратишь энергию на пустую суету: сначала внимательно оцениваешь ситуацию, а потом действуешь чётко и спокойно. В кризис все смотрят на тебя.\n\nПо шкалам у тебя высокая собранность, спокойствие и прагматичность. Исследования поведения собак, в том числе по опроснику C-BARQ (Hsu и Serpell, 2003), включают такие черты, как обучаемость и реакцию на незнакомцев. Но и среди овчарок характеры сильно различаются. Зона роста — расслабляться: не каждая ситуация требует охраны периметра, иногда можно просто поиграть.", "You're a German shepherd: focused, reliable and devoted. You always know where your people are and whether they're okay. You don't waste energy on fuss: you size up the situation carefully, then act calmly and precisely. In a crisis, everyone looks to you.\n\nOn our scales you're high on focus, calm and pragmatism. Dog behavior research, including the C-BARQ questionnaire (Hsu & Serpell, 2003), covers traits like trainability and reactions to strangers — but shepherds vary widely too. Growth zone: relax. Not every situation calls for perimeter security; sometimes you can just play."],
      strengths: [["Надёжность", "Reliability"], ["Самообладание", "Composure"], ["Преданность", "Devotion"]],
      growth: [["Расслабляться", "Relax"], ["Доверять другим", "Trust others"]],
      funny: [["Ты садишься в кафе так, чтобы видеть вход. Всегда", "You always sit facing the café entrance. Always"], ["Друзья в походе спят, а ты «просто проверяешь» территорию в третий раз", "Friends are asleep on the camping trip; you're ‘just checking’ the perimeter for the third time"], ["Ты знаешь, где лежат аптечка, огнетушитель и запасные ключи у всех друзей", "You know where all your friends keep their first-aid kit, fire extinguisher and spare keys"], ["Мама: «Не волнуйся за нас». Ты: уже звонишь узнать, дошли ли они до дома", "Mom: ‘Don't worry about us.’ You: already calling to check they got home"]],
      compat: ["border-collie", "golden", "bernese"],
      img: "A cute German shepherd character sitting proudly with alert ears and a calm protective expression, wearing a tiny hero cape, soft pastel tan, black and cream tones, glossy flat-3D style, smooth sky-blue to sand gradient background, minimal, no text" },
    { id: "chihuahua", emoji: "🌶️", z: { E: 0.5, A: -0.5, C: 0, N: 1, O: 0 },
      title: ["Чихуахуа — маленький, но громкий", "Chihuahua — tiny, but loud"],
      summary: [["Характер в 10 раз больше размера", "Personality ten times your size"], ["Чувствуешь всё — и громко сообщаешь", "You feel everything — and announce it"], ["Бесстрашный(ая)… почти всегда", "Fearless… almost always"], ["Преданный(ая) своим до последнего", "Loyal to your people to the very end"]],
      detailed: ["Ты — чихуахуа: маленький, но очень смелый вулкан эмоций. Ты остро чувствуешь мир, быстро реагируешь и не стесняешься высказать мнение. Иногда громче, чем нужно. Внутри ты можешь волноваться, но это не мешает тебе защищать своих с бесстрашием льва. Для близких ты — самый преданный человек на свете.\n\nПо шкалам у тебя высокая чувствительность и энергия, а с незнакомцами — немного колючести. Чувствительность здесь не слабость: она помогает тебе замечать то, что другие пропускают. Зона роста — дыхание и паузы: не каждая тень за окном — угроза. Чем больше спокойных ритуалов и поддержки рядом, тем меньше поводов «гавкать».", "You're a chihuahua: a small but very brave volcano of emotions. You feel the world sharply, react fast and aren't shy about your opinions — sometimes louder than needed. You may be nervous inside, but that doesn't stop you defending your people with the courage of a lion. To loved ones you're the most devoted person alive.\n\nOn our scales you're high on sensitivity and energy, a bit prickly with strangers. Sensitivity isn't weakness here: it helps you notice what others miss. Growth zone: breathe and pause — not every shadow outside is a threat. The more calm rituals and support around you, the fewer reasons to bark."],
      strengths: [["Смелость", "Courage"], ["Преданность", "Devotion"], ["Чуткость", "Perceptiveness"]],
      growth: [["Паузы перед реакцией", "Pause before reacting"], ["Доверять новым людям", "Trust new people"]],
      funny: [["Ты возмущаешься на весь офис, что кто-то взял твою ручку. Ручка у тебя за ухом", "You protest to the whole office that someone took your pen. It's behind your ear"], ["Ты защищаешь друга в споре так яростно, что друг уже сам извиняется", "You defend a friend in an argument so fiercely the friend starts apologizing"], ["Твоё «я не волнуюсь» звучит на октаву выше обычного", "Your ‘I'm not nervous’ is an octave higher than usual"], ["Бабушка: «Ой, какой маленький(ая)!» Ты: «Я НЕ МАЛЕНЬКИЙ(АЯ), Я КОМПАКТНЫЙ(АЯ)»", "Grandma: ‘Oh, how tiny!’ You: ‘I'M NOT TINY, I'M COMPACT’"]],
      compat: ["greyhound", "poodle", "frenchie"],
      img: "A cute chihuahua character with huge ears and big expressive eyes, standing bravely on a cushion like a tiny hero, a little chili pepper beside it, soft pastel fawn, coral and cream tones, glossy flat-3D style, smooth coral-to-butter gradient background, minimal, no text" },
    { id: "dachshund", emoji: "🌭", z: { E: -0.5, A: -0.5, C: -1, N: 0.5, O: 1 },
      title: ["Такса — упрямый исследователь", "Dachshund — the stubborn explorer"],
      summary: [["Если что-то спрятано — ты найдёшь", "If something's hidden, you'll find it"], ["Упрямство уровня «легенда»", "Legendary stubbornness"], ["Суёшь любопытный нос во всё", "Your curious nose gets into everything"], ["Делаешь по-своему — и обычно оказываешься прав(а)", "You do it your way — and usually you're right"]],
      detailed: ["Ты — такса: длинный нос, короткие лапы и бесконечное любопытство. Таксы были выведены для охоты на барсуков в норах, поэтому они смелые, упрямые и обожают копать. Ты такой(ая) же: если тебе интересно, ты докопаешься до сути, даже если все говорят «не надо». Ты делаешь всё по-своему, не любишь лишних указаний и очень ценишь свою свободу.\n\nПо шкалам у тебя высокое любопытство и своенравность, а к незнакомцам — лёгкая настороженность. Твой исследовательский азарт ведёт к открытиям, а упрямство помогает не сдаваться. Зона роста — гибкость: иногда чужой совет — это не покушение на свободу, а короткая дорога к цели.", "You're a dachshund: a long nose, short legs and infinite curiosity. Dachshunds were bred to hunt badgers in burrows, so they're brave, stubborn and love to dig. So are you: if something interests you, you'll dig to the bottom of it, even when everyone says ‘don't’. You do things your way, dislike instructions and treasure your freedom.\n\nOn our scales you're high on curiosity and free will, a little wary of strangers. Your exploratory drive leads to discoveries, and your stubbornness keeps you from quitting. Growth zone: flexibility — sometimes advice isn't an attack on your freedom but a shortcut to your goal."],
      strengths: [["Любопытство", "Curiosity"], ["Упорство", "Persistence"], ["Смелость", "Courage"]],
      growth: [["Принимать советы", "Accept advice"], ["Менять планы без драмы", "Change plans without drama"]],
      funny: [["Ты нашёл(ла) потерянные ключи, старое письмо и секретную заначку сестры — за одну уборку", "You found the lost keys, an old letter and your sister's secret stash — in one cleaning session"], ["Тебе сказали «нельзя». Ты услышал(а) «попробуй осторожно»", "Someone said ‘you can't’. You heard ‘try it carefully’"], ["Ты полчаса гуглишь, откуда взялось слово «гугл»", "You spend half an hour googling where the word ‘Google’ came from"], ["Бабушка: «Сосисочка моя!» Ты: «Я исследователь, бабуль!»", "Grandma: ‘My little sausage!’ You: ‘I'm an explorer, Grandma!’"]],
      compat: ["shiba", "husky", "poodle"],
      img: "A cute long dachshund character with floppy ears, sniffing curiously with a tiny explorer hat and a magnifying glass, a little dug-up hole with a hidden treasure, soft pastel brown, cream and mint tones, glossy flat-3D style, smooth mint-to-cream gradient background, minimal, no text" },
    { id: "bernese", emoji: "🧸", z: { E: -1, A: 1, C: 0, N: -1, O: -0.5 },
      title: ["Бернский зенненхунд — плюшевое спокойствие", "Bernese Mountain Dog — plush serenity"],
      summary: [["Большое доброе сердце", "A big kind heart"], ["Спокойствие, которое передаётся всем вокруг", "Calm that spreads to everyone"], ["Не спешишь — и всё равно успеваешь главное", "You don't rush, yet get what matters done"], ["Обнимаешь так, что все проблемы уменьшаются", "Your hugs make problems shrink"]],
      detailed: ["Ты — бернский зенненхунд: большой, пушистый и бесконечно добрый. Ты не любишь суету и шум, зато рядом с тобой всем спокойно и тепло. Ты умеешь слушать, обнимать и быть рядом, когда это нужно. Ты не гонишься за успехом и признанием: твоё счастье — в простых радостях, близких людях и неторопливых прогулках.\n\nПо шкалам у тебя высокое дружелюбие, спокойствие и низкая потребность в суете. Gosling и коллеги (2003) показали, что личность собак можно оценивать по тем же осям, что и человеческую. Спокойная доброжелательность — один из самых узнаваемых профилей. Зона роста — немного движения и новизны: даже самому уютному медведю полезно иногда сменить маршрут.", "You're a Bernese mountain dog: big, fluffy and endlessly kind. You dislike fuss and noise, but everyone feels calm and warm around you. You listen, hug and show up when it counts. You don't chase success or recognition: your happiness lives in simple joys, loved ones and leisurely walks.\n\nOn our scales you're high on friendliness and calm, low on hustle. Gosling and colleagues (2003) showed dog personality can be assessed on the same axes as human personality — and calm warmth is one of the most recognizable profiles. Growth zone: a bit more movement and novelty. Even the coziest bear benefits from a new route now and then."],
      strengths: [["Доброта", "Kindness"], ["Спокойствие", "Calm"], ["Умение утешать", "Comforting"]],
      growth: [["Больше движения", "More movement"], ["Пробовать новое", "Try new things"]],
      funny: [["Ты пришёл(шла) на вечеринку, сел(а) в угол — и через час вокруг тебя уже уютный кружок людей", "You came to the party, sat in a corner — and an hour later there's a cozy circle around you"], ["Твоё «я быстро» — это минут сорок, но никто не против", "Your ‘be right there’ means about forty minutes, but nobody minds"], ["Дети и животные выбирают тебя из всей толпы. Каждый раз", "Kids and animals pick you out of any crowd. Every time"], ["Мама: «Ты бы хоть иногда спешил(а)». Ты: «А зачем? Всё и так хорошо»", "Mom: ‘You could hurry up sometimes.’ You: ‘Why? Everything's fine’"]],
      compat: ["golden", "frenchie", "german-shepherd"],
      img: "A cute fluffy Bernese mountain dog character with tricolor fur and a gentle sleepy smile, lying on a soft rug hugging a tiny teddy bear, soft pastel black, rust and cream tones, glossy flat-3D style, smooth cream-to-blush gradient background, minimal, no text" },
    { id: "poodle", emoji: "🎀", z: { E: 0, A: 0.5, C: 1, N: 0.5, O: 0.5 },
      title: ["Пудель — элегантный интеллектуал", "Poodle — the elegant intellectual"],
      summary: [["Ум, стиль и тонкая душа", "Brains, style and a sensitive soul"], ["Схватываешь всё и любишь учиться", "You catch on fast and love to learn"], ["Чувствуешь настроение людей", "You read people's moods"], ["Причёска всегда идеальна (почти)", "Your hair is always perfect (almost)"]],
      detailed: ["Ты — пудель: умный(ая), изящный(ая) и чуткий(ая). Многие думают, что пудели — декоративные собачки, но изначально это энергичные водные собаки, очень сообразительные и обучаемые. Ты такой(ая) же: за безупречной внешностью скрываются острый ум, любопытство и тонкое понимание людей. Ты любишь учиться, красивые вещи и умные разговоры.\n\nПо шкалам у тебя высокое любопытство, собранность и дружелюбие плюс чувствительность. Ты остро реагируешь на атмосферу и чужие эмоции. Зона роста — не принимать всё близко к сердцу и не требовать от себя совершенства каждый день: иногда даже пуделю можно выйти на прогулку с растрёпанной чёлкой.", "You're a poodle: smart, graceful and perceptive. Many think poodles are decorative lapdogs, but they started as energetic water dogs, very clever and trainable. Same with you: behind a flawless exterior are a sharp mind, curiosity and a fine understanding of people. You love learning, beautiful things and smart conversations.\n\nOn our scales you're high on curiosity, focus and friendliness, plus sensitivity — you react keenly to atmosphere and others' feelings. Growth zone: don't take everything to heart or demand perfection daily. Even a poodle can go for a walk with messy bangs sometimes."],
      strengths: [["Интеллект", "Intelligence"], ["Эстетическое чутьё", "Aesthetic sense"], ["Эмпатия", "Empathy"]],
      growth: [["Не требовать от себя идеала", "Don't demand perfection"], ["Меньше принимать на свой счёт", "Take things less personally"]],
      funny: [["Ты прочитал(а) инструкцию к новому гаджету целиком. И тебе понравилось", "You read the new gadget's entire manual. And enjoyed it"], ["Ты выходишь за хлебом с идеальной укладкой. На всякий случай", "You go out for bread with perfect hair. Just in case"], ["Друг сказал «ну ок» — и ты весь вечер анализируешь интонацию", "A friend texted ‘well ok’ and you spend the evening analyzing the tone"], ["Бабушка: «Какой(ая) ты у нас культурный(ая)!» Ты: «Это не культура, это стиль, ба»", "Grandma: ‘You're so refined!’ You: ‘It's not refinement, it's style, Grandma’"]],
      compat: ["border-collie", "chihuahua", "dachshund"],
      img: "A cute fluffy poodle character with elegant pom-pom curls and a tiny bow, reading a small book with a thoughtful sweet expression, soft pastel pink, lilac and white tones, glossy flat-3D style, smooth pink-to-lavender gradient background, minimal, no text" },
    { id: "greyhound", emoji: "💨", z: { E: -1, A: 0.5, C: 0, N: 0.5, O: 0 },
      title: ["Грейхаунд — нежный диванный спринтер", "Greyhound — the gentle couch sprinter"],
      summary: [["Можешь всё — но предпочитаешь полежать", "You can do anything — but you'd rather lie down"], ["Нежный(ая), чуткий(ая), деликатный(ая)", "Gentle, sensitive and tactful"], ["Короткий рывок, долгий отдых", "Short sprint, long rest"], ["Тихий(ая), но очень преданный(ая)", "Quiet, but deeply devoted"]],
      detailed: ["Грейхаунды — одни из самых быстрых собак на планете, но дома их часто называют «диванными картошками»: короткий спринт — и долгий, заслуженный сон. Ты такой(ая) же. Ты способен(на) на мощный рывок, когда это действительно нужно, но в остальное время ценишь тишину, мягкий плед и близкого человека рядом. Ты деликатный(ая), чуткий(ая) и не любишь резких звуков и грубости.\n\nПо шкалам у тебя низкая потребность в суете, мягкость и чувствительность. Интроверсия и чуткость — не слабость, а особый способ быть в мире: ты замечаешь нюансы и бережёшь энергию для важного. Зона роста — говорить о своих потребностях вслух и не стесняться просить тишины, когда она нужна.", "Greyhounds are among the fastest dogs on Earth, yet at home they're often called ‘couch potatoes’: a short sprint, then a long, well-earned nap. That's you. You can produce a powerful burst when it really matters, but otherwise you treasure quiet, a soft blanket and someone dear nearby. You're tactful and sensitive, and you dislike harsh noises and rudeness.\n\nOn our scales you're low on hustle, gentle and sensitive. Introversion and sensitivity aren't weaknesses but a way of being: you notice nuances and save energy for what matters. Growth zone: voice your needs and don't be shy about asking for quiet when you need it."],
      strengths: [["Деликатность", "Tact"], ["Чуткость", "Sensitivity"], ["Умение собраться в нужный момент", "Rising to the moment"]],
      growth: [["Говорить о своих потребностях", "Voice your needs"], ["Не бояться новых ситуаций", "Don't fear new situations"]],
      funny: [["Ты сделал(а) годовой проект за одну ночь, а потом спал(а) три дня", "You did a year's project in one night, then slept for three days"], ["Твоя поза на диване не поддаётся законам анатомии", "Your couch pose defies the laws of anatomy"], ["Громкий звук в соседней комнате — и ты уже под пледом", "A loud noise in the next room — and you're already under the blanket"], ["Друзья: «Пошли гулять!» Ты: «Пошли. До соседнего дивана»", "Friends: ‘Let's go out!’ You: ‘Sure. To the next couch over’"]],
      compat: ["chihuahua", "shiba", "bernese"],
      img: "A cute slender greyhound character curled up gracefully on a plush cushion with a soft shy smile, wearing a tiny cozy knitted sweater, little speed lines fading behind, soft pastel grey, lilac and pink tones, glossy flat-3D style, smooth dove-grey to lilac gradient background, minimal, no text" }
  ]
};

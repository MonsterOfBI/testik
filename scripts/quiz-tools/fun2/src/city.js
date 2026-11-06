module.exports = {
  id: "city",
  emoji: "🌍",
  durationMin: 5,
  popularity: 4,
  spread: 2,
  title: ["Какой ты город мира?", "Which World City Are You?"],
  tagline: ["Москва, Токио или Рио? У каждого города есть характер — какой твой?", "Moscow, Tokyo or Rio? Every city has a personality — which one is yours?"],
  description: [
    "Психологи давно изучают, почему в разных регионах «живут» разные характеры и почему людям лучше там, где город совпадает с их личностью. Ответь на 15 вопросов про утро выходного, очереди и дождь — и узнай, какой город звучит как ты.",
    "Psychologists study why different regions seem to have different personalities — and why people thrive where a city fits them. Answer 15 questions about weekend mornings, queues and rain to find the city that sounds like you."
  ],
  tags: [["путешествия", "travel"], ["города", "cities"], ["личность", "personality"], ["весёлые тесты", "fun quizzes"]],
  instructions: [
    "Представь, что ты — это ты, только с билетом в любую точку мира. Выбирай ответ, который ближе всего к тебе настоящему(ей). Один вариант в каждом вопросе.",
    "Picture yourself — just you, holding a ticket to anywhere in the world. Choose the answer closest to the real you. One option per question."
  ],
  disclaimer: [
    "Развлекательный тест. «Характеры» городов здесь — это добрые культурные образы, а не измеренные средние черты жителей. Исследования показывают, что стереотипы о национальном характере плохо совпадают с реальными данными, так что никого не обижаем и ни о ком не судим.",
    "Entertainment quiz. The cities' ‘personalities’ here are affectionate cultural images, not measured averages of residents' traits. Research shows that national-character stereotypes match real data poorly, so no offense meant and no judgments made."
  ],
  resultIntro: ["Пристегнись, мы заходим на посадку. Твой город —", "Fasten your seatbelt, we're landing. Your city is…"],
  scoringNotes: [
    "Каждый ответ добавляет (а иногда отнимает) баллы по шести шкалам: открытость (O), порядок (C), социальная энергия (E), дружелюбие (A), эмоциональность (N) и темп жизни (P). Суммы приводятся к диапазону 0–1: (сумма − минимум) / (максимум − минимум). Затем выбирается город, чей профиль ближе всего к твоему (евклидово расстояние). Профили городов откалиброваны так, чтобы при случайных ответах каждый выпадал примерно с равной вероятностью.",
    "Each answer adds (and sometimes subtracts) points on six scales: openness (O), order (C), social energy (E), friendliness (A), emotionality (N) and pace of life (P). Sums are rescaled to 0–1: (sum − min) / (max − min). Then you get the city whose profile is closest to yours (Euclidean distance). City profiles were calibrated so that, with random answers, each comes up about equally often."
  ],
  methodology: [
`## На чём основан тест

**Географическая психология** изучает, как черты личности распределены по регионам и городам и почему.

- **Теория.** Rentfrow, Gosling и Potter (2008, *Perspectives on Psychological Science*) предложили объяснение: региональные различия возникают из-за избирательной миграции (люди переезжают туда, где им «подходит»), социального влияния и среды. Так у мест появляется своя «психологическая окраска».
- **Три психологических региона США.** Rentfrow и коллеги (2013, *Journal of Personality and Social Psychology*) по данным более чем миллиона человек выделили кластеры «Дружелюбный и традиционный», «Расслабленный и творческий» и «Темпераментный и раскованный». Последний включает северо-восток США с Нью-Йорком.
- **Лондон по районам.** Jokela и коллеги (2015, *PNAS*; около 56 000 участников, 216 почтовых районов) показали, что открытость выше всего в центральном Лондоне, а экстраверсия и эмоциональная стабильность — на юго-западе. Важнее другое: связь личности со счастьем зависела от района. Например, открытым людям лучше жилось в плотных и разнообразных районах.
- **Совпадение «человек — город».** Bleidorn и коллеги (2016, *Psychological Science*) нашли, что люди, чья личность похожа на типичный профиль их города, в среднем имеют чуть более высокую самооценку.
- **Темп жизни.** Levine и Norenzayan (1999) сравнили 31 страну по скорости ходьбы, работе почты и точности часов. Быстрее всех — Швейцария, Ирландия, Германия и Япония, медленнее — Мексика, Индонезия и Бразилия. Сильнее всего темп был связан с экономикой (r ≈ 0,74 с ВВП на душу населения). Отсюда шкала P.
- **«Тугие» и «свободные» культуры.** Gelfand и коллеги (2011, *Science*, 33 страны) показали, что общества различаются силой норм и терпимостью к их нарушению. Япония и Южная Корея ближе к «тугому» полюсу — это учтено в шкале «порядок».
- **Важная оговорка.** Terracciano и коллеги (2005, *Science*, 49 культур) выяснили, что представления о «национальном характере» в целом **не совпадают** с реально измеренными чертами. Поэтому профили городов в тесте — культурные образы и вайб, а не статистика о жителях. Для российских городов сопоставимых крупных опубликованных данных мы не нашли.

## Как работает тест

1. 15 оригинальных ситуационных вопросов, по 5 вариантов.
2. Ответы дают баллы по шести шкалам: пять в духе «Большой пятёрки» (O, C, E, A, N) и темп жизни (P).
3. Суммы нормируются к 0–1 и сравниваются с профилями 12 городов; побеждает ближайший.
4. Калибровка на 120 000 симулированных случайных прохождений. Доля каждого результата:

{{DIST}}

Дополнительно проверено, что «персонаж», отвечающий в духе города, получает именно этот город.

## Ограничения

Тест не валидирован психометрически. Шкалы вдохновлены исследованиями, но вопросы и профили городов авторские. Внутри любого города люди различаются гораздо сильнее, чем города между собой.`,
`## What this quiz is based on

**Geographical psychology** studies how personality traits are distributed across regions and cities — and why.

- **Theory.** Rentfrow, Gosling & Potter (2008, *Perspectives on Psychological Science*) proposed that regional differences emerge through selective migration (people move where they fit), social influence and environment — giving places a psychological ‘flavor’.
- **Three psychological regions of the US.** Rentfrow et al. (2013, *Journal of Personality and Social Psychology*), using data from over a million people, identified ‘Friendly & Conventional’, ‘Relaxed & Creative’ and ‘Temperamental & Uninhibited’ clusters — the last covering the US Northeast, including New York.
- **London, district by district.** Jokela et al. (2015, *PNAS*; ~56,000 people across 216 postal districts) found openness highest in central London and extraversion and emotional stability higher in the south-west. More importantly, how strongly personality predicted happiness depended on the neighborhood — e.g., open people were happier in dense, diverse areas.
- **Person–city fit.** Bleidorn et al. (2016, *Psychological Science*) found that people whose personality resembled their city's typical profile had slightly higher self-esteem.
- **Pace of life.** Levine & Norenzayan (1999) compared 31 countries on walking speed, postal service speed and clock accuracy. Fastest: Switzerland, Ireland, Germany and Japan; slowest: Mexico, Indonesia and Brazil. Pace tracked economic vitality most strongly (r ≈ .74 with GDP per capita). Hence our P scale.
- **Tight vs. loose cultures.** Gelfand et al. (2011, *Science*, 33 nations) showed societies differ in how strong their norms are and how much deviance they tolerate. Japan and South Korea sit toward the ‘tight’ end — reflected in our order scale.
- **Important caveat.** Terracciano et al. (2005, *Science*, 49 cultures) found that perceptions of ‘national character’ largely **do not match** measured trait levels. So city profiles here are cultural images and vibes, not statistics about residents. We found no comparable large published data for Russian cities.

## How the quiz works

1. 15 original situational questions with 5 options each.
2. Answers add points on six scales: five Big-Five-like ones (O, C, E, A, N) plus pace of life (P).
3. Sums are rescaled to 0–1 and compared with 12 city profiles; the nearest wins.
4. Calibrated on 120,000 simulated random runs. Share of each result:

{{DIST}}

We also verified that a ‘persona’ answering in the spirit of each city gets that city.

## Limitations

The quiz is not psychometrically validated. The scales are research-inspired, but the items and city profiles are our own. People within any city differ far more than cities differ from each other.`
  ],
  sources: [
    { citation: "Rentfrow, P. J., Gosling, S. D., & Potter, J. (2008). A theory of the emergence, persistence, and expression of geographic variation in psychological characteristics. Perspectives on Psychological Science, 3(5), 339–369.", doi: "10.1111/j.1745-6924.2008.00084.x" },
    { citation: "Rentfrow, P. J., Gosling, S. D., Jokela, M., Stillwell, D. J., Kosinski, M., & Potter, J. (2013). Divided we stand: Three psychological regions of the United States and their political, economic, social, and health correlates. Journal of Personality and Social Psychology, 105(6), 996–1012.", doi: "10.1037/a0034434" },
    { citation: "Jokela, M., Bleidorn, W., Lamb, M. E., Gosling, S. D., & Rentfrow, P. J. (2015). Geographically varying associations between personality and life satisfaction in the London metropolitan area. Proceedings of the National Academy of Sciences, 112(3), 725–730.", doi: "10.1073/pnas.1415800112" },
    { citation: "Bleidorn, W., Schönbrodt, F., Gebauer, J. E., Rentfrow, P. J., Potter, J., & Gosling, S. D. (2016). To live among like-minded others: Exploring the links between person-city personality fit and self-esteem. Psychological Science, 27(3), 419–427.", doi: "10.1177/0956797615627133" },
    { citation: "Levine, R. V., & Norenzayan, A. (1999). The pace of life in 31 countries. Journal of Cross-Cultural Psychology, 30(2), 178–205.", doi: "10.1177/0022022199030002003" },
    { citation: "Gelfand, M. J., Raver, J. L., Nishii, L., Leslie, L. M., Lun, J., Lim, B. C., ... Yamaguchi, S. (2011). Differences between tight and loose cultures: A 33-nation study. Science, 332(6033), 1100–1104.", doi: "10.1126/science.1197754" },
    { citation: "Terracciano, A., Abdel-Khalek, A. M., Ádám, N., Adamovová, L., Ahn, C.-K., Ahn, H.-N., ... McCrae, R. R. (2005). National character does not reflect mean personality trait levels in 49 cultures. Science, 310(5745), 96–100.", doi: "10.1126/science.1117199" }
  ],
  license: "Original content © testik. All questions, outcomes and texts were written from scratch for this site; no items are copied or adapted from copyrighted questionnaires or quiz sites. City descriptions are affectionate cultural images, not claims about residents.",
  dims: [
    { id: "O", color: "#CDB4F6", name: ["Открытость новому", "Openness"], desc: ["Любопытство к новым местам, людям и идеям.", "Curiosity about new places, people and ideas."], low: ["Любитель привычного", "Creature of habit"], high: ["Искатель нового", "Novelty seeker"],
      bands: [
        [["Любитель привычного", "Creature of habit"], [["Свои места и маршруты", "Your own spots and routes"], ["Предсказуемость успокаивает", "Predictability soothes you"], ["Новое — по рекомендации", "New things by recommendation"]], ["Тебе комфортно в знакомой среде, и это экономит силы. Попробуй иногда «туризм у себя дома» — новый район, новое кафе.", "You're comfortable in familiar settings, which saves energy. Try ‘tourism at home’ sometimes — a new neighborhood, a new café."]],
        [["Открыт(а) по настроению", "Open when it feels right"], [["Любишь и новое, и знакомое", "Like both new and familiar"], ["Путешествуешь с планом", "Travel with a plan"], ["Эксперименты в меру", "Experiments in moderation"]], ["Ты умеешь сочетать любопытство и комфорт. Хороший баланс для жизни в любом городе.", "You combine curiosity and comfort — a good balance for life in any city."]],
        [["Искатель нового", "Novelty seeker"], [["Скука — враг", "Boredom is the enemy"], ["Тянет в неизвестное", "Drawn to the unknown"], ["Любишь разнообразие", "Love diversity"]], ["Тебе нужны новые впечатления. В исследовании Jokela и коллег открытым людям было лучше в плотных и разнообразных районах — возможно, и тебе.", "You need fresh experiences. In Jokela and colleagues' study, open people were happier in dense, diverse neighborhoods — maybe you are too."]]
      ] },
    { id: "C", color: "#A8E6CF", name: ["Порядок", "Order"], desc: ["Пунктуальность, планирование, уважение к правилам.", "Punctuality, planning and respect for rules."], low: ["Правила — это рекомендации", "Rules are suggestions"], high: ["Всё по расписанию", "Runs on schedule"],
      bands: [
        [["Правила — это рекомендации", "Rules are suggestions"], [["Импровизация", "Improvisation"], ["Гибкость", "Flexibility"], ["Время — понятие растяжимое", "Time is stretchy"]], ["Ты легко подстраиваешься под обстоятельства. Пара будильников на важное поможет не опоздать на собственный самолёт.", "You adapt easily. A couple of alarms for the important stuff will keep you from missing your own flight."]],
        [["Порядок, когда нужно", "Order when it counts"], [["План есть, но гибкий", "Flexible plans"], ["Соблюдаешь разумные правила", "Follow sensible rules"], ["Не паникуешь из-за мелочей", "Don't sweat the small stuff"]], ["Ты собран(а), когда это важно, и расслаблен(а), когда можно.", "You're organized when it matters and relaxed when it doesn't."]],
        [["Всё по расписанию", "Runs on schedule"], [["Пунктуальность", "Punctuality"], ["Чёткие планы", "Clear plans"], ["Правила делают жизнь удобнее", "Rules make life smoother"]], ["На тебя можно положиться. Не забывай оставлять в расписании место для случайных чудес.", "People can count on you. Leave room in the schedule for happy accidents."]]
      ] },
    { id: "E", color: "#FFD3B6", name: ["Социальная энергия", "Social energy"], desc: ["Насколько тебя заряжают люди, шум и движ.", "How much people, buzz and action charge you up."], low: ["Тишина и свои", "Quiet and close circle"], high: ["Тусовка", "Crowd-powered"],
      bands: [
        [["Тишина и свои", "Quiet and close circle"], [["Заряжаешься наедине", "Recharge alone"], ["Мало, но близких", "Few but close"], ["Толпа утомляет", "Crowds drain you"]], ["Тебе подходят спокойные места и глубокие разговоры. Это не недостаток, а стиль.", "Calm places and deep talks suit you. That's not a flaw — it's a style."]],
        [["Гибкая общительность", "Flexible sociability"], [["И вечеринка, и плед", "Party or blanket"], ["Чувствуешь меру", "Know your limits"], ["Легко адаптируешься", "Adapt easily"]], ["Ты умеешь быть и в центре событий, и в стороне.", "You can be in the thick of things or happily on the sidelines."]],
        [["Тусовка", "Crowd-powered"], [["Люди заряжают", "People energize you"], ["Знакомишься легко", "Make friends easily"], ["Любишь движ", "Love the buzz"]], ["Тебе нужен город, который не спит. Береги ресурс: даже у мегаполиса бывает ночь.", "You need a city that never sleeps. Pace yourself — even megacities have nights."]]
      ] },
    { id: "A", color: "#FFAAA5", name: ["Дружелюбие", "Friendliness"], desc: ["Теплота, гостеприимство, готовность помочь незнакомцу.", "Warmth, hospitality, readiness to help a stranger."], low: ["Ирония и дистанция", "Irony and distance"], high: ["Гостеприимство", "Hospitality"],
      bands: [
        [["Ирония и дистанция", "Irony and distance"], [["Прямота", "Directness"], ["Личные границы", "Personal boundaries"], ["Сарказм как язык", "Sarcasm as a language"]], ["Ты бережёшь границы и не раздаёшь доверие всем подряд. Свои знают, что за иронией — тепло.", "You guard your boundaries and don't hand out trust freely. Your people know there's warmth behind the irony."]],
        [["Тёплый реалист", "Warm realist"], [["Дружелюбен(на), но не наивен(на)", "Friendly, not naive"], ["Помогаешь с умом", "Help wisely"], ["Умеешь сказать «нет»", "Can say ‘no’"]], ["Ты открыт(а) людям, но не в ущерб себе. Отличный баланс.", "You're open to people without sacrificing yourself — a great balance."]],
        [["Гостеприимство", "Hospitality"], [["Всех накормишь", "Feed everyone"], ["Миришь и обнимаешь", "Make peace and hugs"], ["Чужих не бывает", "No strangers, only friends"]], ["Рядом с тобой любой город кажется домом. Не забывай о себе — ты тоже гость в своей жизни.", "Any city feels like home around you. Don't forget yourself — you're a guest in your own life too."]]
      ] },
    { id: "N", color: "#B5D8FA", name: ["Эмоциональность", "Emotionality"], desc: ["Сила переживаний: от светлой грусти до бурного восторга.", "Intensity of feelings, from wistful sadness to wild delight."], low: ["Невозмутимость", "Chill"], high: ["Эмоциональный накал", "All the feels"],
      bands: [
        [["Невозмутимость", "Chill"], [["Стресс отскакивает", "Stress bounces off"], ["Спокойствие в хаосе", "Calm in chaos"], ["Быстро восстанавливаешься", "Quick recovery"]], ["Ты редко накручиваешь себя. Это настоящий ресурс для жизни в любом ритме.", "You rarely spiral — a real resource for life at any pace."]],
        [["Живые эмоции", "Lively feelings"], [["Чувствуешь, но не тонешь", "Feel without drowning"], ["Бывает грустно — и это ок", "Sad sometimes — that's okay"], ["Умеешь успокоиться", "Know how to calm down"]], ["У тебя здоровый эмоциональный диапазон.", "You have a healthy emotional range."]],
        [["Эмоциональный накал", "All the feels"], [["Чувствуешь всё ярко", "Feel everything vividly"], ["Любишь драму (в кино)", "Love drama (on screen)"], ["Красиво страдаешь", "Suffer beautifully"]], ["Твоя чувствительность делает жизнь насыщенной. Сон, прогулки и близкие помогают ей не превращаться в тревогу.", "Your sensitivity makes life rich. Sleep, walks and loved ones keep it from becoming anxiety."]]
      ] },
    { id: "P", color: "#FDFD96", name: ["Темп жизни", "Pace of life"], desc: ["Как быстро ты живёшь: ходишь, решаешь, отвечаешь на сообщения. Вдохновлено исследованием Levine и Norenzayan (1999).", "How fast you live: walk, decide, reply. Inspired by Levine & Norenzayan (1999)."], low: ["Слоу-лайф", "Slow living"], high: ["Бегом!", "Full speed"],
      bands: [
        [["Слоу-лайф", "Slow living"], [["Никуда не спешишь", "No rush"], ["Ценишь момент", "Savor the moment"], ["Обед — это ритуал", "Lunch is a ritual"]], ["Ты умеешь жить медленно — редкий навык. Главное, чтобы важные дедлайны не превращались в «потом».", "You know how to live slowly — a rare skill. Just don't let real deadlines turn into ‘later’."]],
        [["Свой ритм", "Your own rhythm"], [["Ускоряешься, когда нужно", "Speed up when needed"], ["Отдыхаешь без вины", "Rest without guilt"], ["Баланс", "Balance"]], ["Ты выбираешь темп под задачу, а не под чужие ожидания.", "You set your pace by the task, not by other people's expectations."]],
        [["Бегом!", "Full speed"], [["Всё успеваешь", "Get it all done"], ["Многозадачность", "Multitasking"], ["Эскалатор — для бега", "Escalators are for running"]], ["Скорость — твоя стихия. Не забывай иногда сходить с дистанции, чтобы просто посмотреть на город.", "Speed is your element. Step off the track sometimes just to look at the city."]]
      ] }
  ],
  questions: [
    { t: ["Суббота, 9:00. Ты просыпаешься и…", "Saturday, 9 a.m. You wake up and…"], o: [
      [["…уже на пробежке, а дальше бранч, выставка и вечеринка", "…you're already out for a run, then brunch, a gallery and a party"], { P: 2, E: 1 }],
      [["…кофе у окна, книга, никуда не тороплюсь", "…coffee by the window, a book, no rush"], { P: -1, E: -1, O: 1 }],
      [["…иду гулять без маршрута — посмотрим, куда занесёт", "…go wandering without a route — let's see where I end up"], { O: 2, C: -1 }],
      [["…звоню друзьям: «Кто на завтрак? Я угощаю!»", "…call friends: ‘Who's up for breakfast? My treat!’"], { E: 2, A: 1 }],
      [["…сверяюсь с планом. Да, у меня план даже на выходные", "…check my plan. Yes, I have a plan even for weekends"], { C: 2, P: 1 }]
    ] },
    { t: ["Какой звук для тебя звучит как дом?", "Which sound feels like home?"], o: [
      [["Гул большого города — он меня успокаивает", "The hum of a big city — it calms me down"], { P: 2, E: 1 }],
      [["Дождь по подоконнику", "Rain on the windowsill"], { N: 1, O: 1, E: -1 }],
      [["Шум моря и чьи-то песни на пляже", "Waves and someone singing on the beach"], { E: 1, A: 1, P: -1 }],
      [["Тишина. Ну, может, ветер", "Silence. Maybe some wind"], { E: -1, N: -1 }],
      [["Звон посуды и голоса родни за большим столом", "Clinking dishes and relatives' voices around a big table"], { A: 2 }],
      [["Звон бокалов, громкий спор о кино и аккордеон где-то за углом", "Clinking glasses, a heated argument about film and an accordion somewhere around the corner"], { E: 1, N: 1, O: 1, P: -1 }]
    ] },
    { t: ["Ты опаздываешь на встречу на 10 минут.", "You're running 10 minutes late."], o: [
      [["Это катастрофа: я никогда не опаздываю", "This is a disaster. I'm never late"], { C: 2, N: 1 }],
      [["10 минут — это не опоздание, это «примерно вовремя»", "10 minutes isn't late, it's ‘roughly on time’"], { C: -1, P: -1 }],
      [["Бегу, параллельно пишу три сообщения и вызываю такси", "Running while texting three people and booking a cab"], { P: 2 }],
      [["Пишу честное извинение с мемом", "Send an honest apology with a meme"], { A: 1, E: 1 }],
      [["Не страшно — зато я по дороге нашёл(ла) классное кафе", "No biggie — I found an amazing café on the way"], { O: 2, C: -1 }]
    ] },
    { t: ["Твоё отношение к очередям?", "Your attitude toward queues?"], o: [
      [["Очередь священна. Стою, молчу, соблюдаю", "The queue is sacred. I stand, I wait, I respect it"], { C: 2, A: 1 }],
      [["Отличный повод познакомиться с соседями", "A great chance to meet the people around me"], { E: 2, A: 1 }],
      [["Ищу лайфхак: онлайн-запись, приложение, другой вход", "Find a hack: online booking, an app, another entrance"], { P: 2, O: 1 }],
      [["Лучше уйду и вернусь потом — нервы дороже", "I'll leave and come back later — my nerves are worth more"], { P: -1, N: -1 }],
      [["Ворчу, но стою, а потом рассказываю об этом целую историю", "Grumble but stay, then tell everyone the whole saga"], { N: 2, A: -1 }]
    ] },
    { t: ["Идеальный ужин — это…", "The perfect dinner is…"], o: [
      [["Авангардная кухня, где еду подают в облаке дыма", "Avant-garde cuisine served in a cloud of smoke"], { O: 2, P: 1 }],
      [["Огромный стол, родня и «ну ещё кусочек»", "A huge table, family and ‘just one more piece’"], { A: 2, E: 1 }],
      [["Уличная еда в два часа ночи после концерта", "Street food at 2 a.m. after a concert"], { E: 1, C: -1, O: 1 }],
      [["Свежий хлеб, сыр и разговоры о смысле жизни", "Fresh bread, cheese and conversations about the meaning of life"], { N: 1, O: 1, P: -1 }],
      [["Тихий ужин дома по рецепту, доведённому до идеала", "A quiet dinner at home from a recipe I've perfected"], { C: 2, E: -1 }]
    ] },
    { t: ["Что ты делаешь, когда грустно?", "What do you do when you're sad?"], o: [
      [["Гуляю под дождём с грустной музыкой — страдаю красиво", "Walk in the rain with sad music — suffering, but aesthetically"], { N: 2, O: 1 }],
      [["Работаю: дела лечат", "Work. Getting things done heals me"], { C: 1, P: 2 }],
      [["Зову друзей и танцую до утра", "Call friends and dance till morning"], { E: 2, N: -1 }],
      [["Уезжаю на природу, подальше от людей", "Escape to nature, far from people"], { E: -1, O: 1, P: -1 }],
      [["Еду к маме или бабушке — там накормят и выслушают", "Go to my mom's or grandma's — they'll feed me and listen"], { A: 2 }],
      [["Сажусь в кафе с подругой и со вкусом разбираю, кто во всём виноват", "Sit in a café with a friend and analyze, with relish, exactly who is to blame"], { N: 1, E: 1, A: -1 }]
    ] },
    { t: ["Какой стиль одежды тебе ближе?", "Which style is closest to yours?"], o: [
      [["Чёрное, удобное, немного андеграунд", "Black, comfy, a little underground"], { O: 1, C: -1, A: -1 }],
      [["Безупречно отглажено, всё сочетается", "Perfectly pressed, everything matches"], { C: 2 }],
      [["Ярко! Цвет, принты, блёстки", "Bright! Color, prints, sparkle"], { E: 2, N: -1 }],
      [["Небрежная элегантность и шарф «как будто случайно»", "Effortless elegance and a scarf tied ‘by accident’"], { O: 1, N: 1 }],
      [["Тренды, которые у всех появятся через полгода", "Trends everyone else will wear in six months"], { O: 1, P: 1, E: 1 }]
    ] },
    { t: ["Как ты относишься к правилам?", "How do you feel about rules?"], o: [
      [["Правила делают жизнь удобной для всех", "Rules make life easier for everyone"], { C: 2, A: 1 }],
      [["Правила — это скорее рекомендации", "Rules are more like guidelines"], { C: -1, O: 1, N: -1 }],
      [["Соблюдаю, если логично, а если нет — спорю", "I follow them if they make sense; if not, I argue"], { A: -1, E: 1, O: 1 }],
      [["Правила? Некогда, у меня дедлайн", "Rules? No time, I have a deadline"], { P: 2, C: -1 }],
      [["Я за правила, если они про уважение и заботу", "I'm for rules when they're about respect and care"], { A: 2, C: 1 }]
    ] },
    { t: ["Выбери транспорт.", "Pick your transport."], o: [
      [["Метро: быстро, точно, по расписанию", "The metro: fast, precise, on schedule"], { C: 1, P: 1 }],
      [["Велосипед: свобода и ветер в волосах", "A bike: freedom and wind in my hair"], { O: 1, N: -1, C: -1 }],
      [["Пешком: только так город раскрывается", "On foot — it's the only way a city opens up"], { O: 1, P: -1, N: 1 }],
      [["Такси бизнес-класса — у меня созвон", "A premium cab — I'm on a call"], { P: 2, A: -1 }],
      [["Машина друга, громкая музыка, открытые окна", "A friend's car, loud music, windows down"], { E: 2, A: 1 }]
    ] },
    { t: ["Идеальный вид из окна?", "The perfect window view?"], o: [
      [["Огни небоскрёбов", "City lights and skyscrapers"], { P: 1, E: 1 }],
      [["Крыши, двор-колодец и кот на подоконнике напротив", "Rooftops, an old courtyard and a cat on the opposite windowsill"], { O: 1, N: 1, E: -1 }],
      [["Море и пальмы", "The sea and palm trees"], { E: 1, N: -1, P: -1 }],
      [["Горы, океан и ни одного человека", "Mountains, ocean and not a single person"], { E: -1, O: 1, N: -1 }],
      [["Двор, где все друг друга знают", "A courtyard where everyone knows each other"], { A: 2, C: 1 }]
    ] },
    { t: ["На вечеринке ты…", "At a party you…"], o: [
      [["Знакомлюсь со всеми и к концу вечера организую следующую", "Meet everyone and organize the next party by the end of the night"], { E: 2, P: 1 }],
      [["Нахожу одного интересного человека и до утра говорю с ним о космосе", "Find one interesting person and talk about the universe till dawn"], { O: 2, E: -1 }],
      [["Танцую! Неважно как, важно — от души", "Dance! Doesn't matter how, as long as it's from the heart"], { E: 2, N: -1 }],
      [["Слежу, чтобы всем было хорошо и все поели", "Make sure everyone's happy and fed"], { A: 2 }],
      [["Ухожу по-английски через 40 минут", "Do an Irish exit after 40 minutes"], { E: -1, C: 1 }],
      [["Снимаю контент, знакомлюсь со всеми и к 23:00 уже дома — завтра рано вставать", "Shoot content, meet everyone and I'm home by 11 — early start tomorrow"], { E: 1, C: 1, P: 1, O: 1 }]
    ] },
    { t: ["Твой стиль обращения с деньгами?", "Your money style?"], o: [
      [["Всё учтено в приложении до копейки", "Every penny tracked in an app"], { C: 2 }],
      [["Трачу на впечатления, а не на вещи", "Spend on experiences, not things"], { O: 1, E: 1 }],
      [["Деньги любят движение: инвестирую, рискую", "Money likes motion: I invest, I take risks"], { P: 2, N: -1 }],
      [["Трачу на подарки близким", "Spend on gifts for loved ones"], { A: 2 }],
      [["Не думаю об этом — как-нибудь всё будет", "Don't think about it — it'll work out somehow"], { C: -1, N: -1, P: -1 }],
      [["Бюджет под контролем, но на новинки и уход за собой трачу без сожалений", "Budget under control, but I spend on new launches and self-care without regret"], { C: 1, O: 1, P: 1 }]
    ] },
    { t: ["Что ты скорее скажешь?", "Which line is most likely yours?"], o: [
      [["«Давай быстрее, я же всё успеваю!»", "‘Come on, faster — I'm making it all happen!’"], { P: 2 }],
      [["«Как же всё бессмысленно… и прекрасно»", "‘It's all so meaningless… and beautiful’"], { N: 1, O: 1, P: -1 }],
      [["«Расслабься, жизнь одна»", "‘Relax, you only live once’"], { N: -1, P: -1, E: 1 }],
      [["«Простите, извините, можно я…»", "‘Sorry, excuse me, may I just…’"], { C: 1, E: -1 }],
      [["«Я сделаю по-своему»", "‘I'll do it my way’"], { O: 1, A: -1 }]
    ] },
    { t: ["Как ты переносишь холод и дождь?", "How do you handle cold and rain?"], o: [
      [["Обожаю: туман, морось, свитер — это эстетика", "Love it: fog, drizzle, sweaters — it's an aesthetic"], { N: 1, O: 1, E: -1 }],
      [["Холод? Отлично, значит, пора в горячий источник", "Cold? Great, time for a hot spring"], { N: -1, O: 1 }],
      [["Я бы уехал(а) туда, где +28 круглый год", "I'd move somewhere it's 80°F all year round"], { E: 1, P: -1 }],
      [["Без разницы — я всё равно в метро и в офисе", "Doesn't matter — I'm on the metro and in the office anyway"], { P: 1, C: 1 }],
      [["Ною, но потом рассказываю, как героически выжил(а)", "Complain, then tell everyone how heroically I survived"], { N: 1, E: 1 }]
    ] },
    { t: ["Какая у тебя роль в компании друзей?", "What's your role in your friend group?"], o: [
      [["Генератор идей и движа", "The ideas-and-plans generator"], { E: 2, P: 1 }],
      [["Голос разума и навигатор", "The voice of reason and the navigator"], { C: 2 }],
      [["Тот, кто всех мирит и обнимает", "The one who makes peace and hugs everyone"], { A: 2 }],
      [["Философ и критик: «А зачем мы это делаем?»", "The philosopher-critic: ‘Why are we even doing this?’"], { O: 1, N: 1, A: -1 }],
      [["Тот, кто тащит всех в путешествие", "The one who drags everyone on trips"], { O: 2, E: 1 }]
    ] }
  ],
  outcomes: [
    { id: "moscow", emoji: "🌆", z: { O: 0, C: 0.5, E: 0.5, A: -0.5, N: 0.5, P: 1 },
      title: ["Москва — город, который не спит (потому что дедлайн)", "Moscow — the city that never sleeps (deadline pending)"],
      summary: [["Ты всё успеваешь — и ещё чуть-чуть сверху", "You get it all done — and then some"], ["Масштаб, амбиции и «а давай сделаем больше»", "Scale, ambition and ‘let's go bigger’"], ["Сначала кажешься строгим(ой), потом становишься лучшим другом", "You seem stern at first, then become someone's best friend"], ["Доставка, такси и кофе — твоя кровеносная система", "Delivery, taxis and coffee are your circulatory system"]],
      detailed: ["Ты живёшь на скорости мегаполиса: решения, встречи, планы — всё сразу и всё всерьёз. Тебя заряжают амбиции, большие проекты и ощущение, что жизнь происходит прямо сейчас. Да, иногда ты выглядишь суровым(ой), как пассажир метро в 8:30, но за этим — огромная энергия и привычка добиваться своего.\n\nВ исследовании Levine и Norenzayan темп жизни сильнее всего был связан с экономической активностью: чем больше «движения» вокруг, тем быстрее люди ходят и решают. России в той выборке не было, так что это образ, а не рейтинг. Но вайб узнаваемый. Твоя суперсила — продуктивность, а зона роста — отдых без чувства вины. Иногда лучший план на вечер — никакого плана.", "You live at megacity speed: decisions, meetings, plans — all at once and all for real. You're fueled by ambition, big projects and the feeling that life is happening right now. Sure, you can look as stern as a commuter at 8:30 a.m., but underneath is huge energy and a habit of getting what you want.\n\nIn Levine & Norenzayan's research, pace of life was most strongly linked to economic activity: the more ‘motion’ around, the faster people walk and decide. Russia wasn't in that sample, so this is an image, not a ranking — but the vibe is unmistakable. Your superpower is productivity; your growth zone is resting without guilt. Sometimes the best plan for the evening is no plan."],
      strengths: [["Продуктивность", "Productivity"], ["Амбициозность", "Ambition"], ["Стрессоустойчивость в режиме многозадачности", "Resilience under multitasking"]],
      growth: [["Отдыхать без чувства вины", "Rest without guilt"], ["Замедляться ради людей, а не только ради дел", "Slow down for people, not just tasks"]],
      funny: [["Пишешь «буду через 15 минут», находясь на другом конце города. И почему-то успеваешь", "You text ‘be there in 15’ from the other side of the city. And somehow make it"], ["Твой выходной: два созвона, бранч, выставка, спортзал и «давай быстро по кофе»", "Your day off: two calls, brunch, a gallery, the gym and ‘quick coffee?’"], ["Мама: «Отдохни хоть немного». Ты: «Я отдыхаю, у меня встреча с друзьями в 22:30»", "Mom: ‘Rest a little!’ You: ‘I am resting — I'm seeing friends at 10:30 pm’"], ["Эскалатор для тебя слишком медленный. Ты по нему бежишь", "The escalator is too slow for you. You run up it"]],
      compat: ["nyc", "seoul", "london"],
      img: "A cute little city character shaped like a colorful onion-domed tower with a determined smile, holding a takeaway coffee and a smartphone, tiny skyscrapers and evening lights behind, soft pastel colors, glossy flat-3D style, smooth coral-to-lilac gradient background, minimal, no text" },
    { id: "spb", emoji: "🌉", z: { O: 1, C: 0, E: -1, A: 0, N: 0.5, P: -0.5 },
      title: ["Санкт-Петербург — интеллигентная меланхолия", "Saint Petersburg — elegant melancholy"],
      summary: [["Любишь красоту, книги и разговоры о вечном", "You love beauty, books and talks about eternity"], ["Дождь для тебя не погода, а настроение", "Rain isn't weather, it's a mood"], ["Ирония тонкая, как шпиль над Невой", "Your irony is as fine as a spire over the river"], ["Неспешный(ая), но очень глубокий(ая)", "Unhurried, but deep"]],
      detailed: ["Ты — человек атмосферы. Тебе важно, чтобы было красиво, умно и со смыслом: старые дворы, книжные магазины, разговоры до разводки мостов. Ты замечаешь детали, которые другие пропускают, и умеешь находить поэзию даже в серой мороси.\n\nВ терминах психологии это высокая открытость опыту: эстетическая чувствительность, любовь к идеям и культуре. Rentfrow с коллегами объясняют, что люди со схожими чертами часто тянутся в похожие места, и так у городов складывается «характер». Твоя меланхолия — не уныние, а глубина. Только не забывай иногда выходить из режима «красиво страдать»: солнце бывает и в твоём городе — минут пятнадцать в году, но бывает.", "You're a creature of atmosphere. You need things to be beautiful, smart and meaningful: old courtyards, bookshops, conversations that last until the bridges go up. You notice details others miss and find poetry even in grey drizzle.\n\nPsychologically, that's high openness to experience: aesthetic sensitivity, love of ideas and culture. Rentfrow and colleagues explain that people with similar traits tend to gravitate to similar places, which is how cities acquire a ‘character’. Your melancholy isn't gloom — it's depth. Just step out of ‘aesthetic suffering’ mode now and then: the sun does shine in your city — for about fifteen minutes a year, but it does."],
      strengths: [["Глубина и эрудиция", "Depth and erudition"], ["Чувство прекрасного", "A sense of beauty"], ["Тонкий юмор", "Subtle humor"]],
      growth: [["Меньше рефлексии, больше действия", "Less rumination, more action"], ["Пускать в свой мир новых людей", "Let new people into your world"]],
      funny: [["У тебя есть твёрдое мнение, как правильно называть бордюр и шаурму, и ты готов(а) защищать его в любом чате", "You have firm opinions on the correct words for ‘curb’ and ‘shawarma’ and will defend them in any comment section"], ["Солнце вышло на 15 минут — и ты уже на крыше с термосом", "The sun came out for 15 minutes and you're already on a rooftop with a thermos"], ["Твой кот спит на подоконнике с видом на двор-колодец. У него тоже экзистенциальный кризис", "Your cat naps on a windowsill above an old courtyard. He's having an existential crisis too"], ["Тебя позвали на вечеринку, а ты пришёл(шла) со сборником стихов. И это сработало", "You were invited to a party and showed up with a poetry book. And it worked"]],
      compat: ["paris", "berlin", "reykjavik"],
      img: "A cute city character shaped like a classic drawbridge with a gentle wistful smile, holding a tiny umbrella and a book, soft raindrops and a slender golden spire behind, soft pastel blue and lilac colors, glossy flat-3D style, smooth misty-blue to lavender gradient background, minimal, no text" },
    { id: "nyc", emoji: "🗽", z: { O: 0, C: -1, E: 1, A: -0.5, N: 0.5, P: 1 },
      title: ["Нью-Йорк — главный герой мегаполиса", "New York — main character of the metropolis"],
      summary: [["Смелый(ая), громкий(ая), неудержимый(ая)", "Bold, loud, unstoppable"], ["Не терпишь скуку и правила ради правил", "No patience for boredom or rules for rules' sake"], ["Карьера, искусство и пицца в два ночи — всё сразу", "Career, art and 2 a.m. pizza — all at once"], ["Прямота и сарказм — твой язык любви", "Directness and sarcasm are your love language"]],
      detailed: ["Ты — энергия, которую невозможно не заметить. Ты хочешь всё: успех, творчество, людей, приключения — и желательно сегодня. Правила для тебя — повод придумать свой путь, а скука — личный враг. Ты говоришь прямо и шутишь остро, но за этим стоит огромная жажда жизни.\n\nВ исследовании Rentfrow и коллег (2013) северо-восток США, включая Нью-Йорк, попал в кластер «темпераментный и раскованный»: экстраверсия и открытость там соседствуют с более высокой эмоциональностью и меньшей сдержанностью. Это средние значения, а не стереотип о каждом, но вайб совпадает. Твоя суперсила — смелость. Зона роста — сон и умение иногда сказать себе: «на сегодня хватит».", "You're energy that's impossible to miss. You want it all — success, creativity, people, adventure — preferably today. Rules are an invitation to invent your own path, and boredom is your personal nemesis. You speak bluntly and joke sharply, but underneath is a huge appetite for life.\n\nIn Rentfrow and colleagues' (2013) research, the US Northeast, including New York, fell into the ‘Temperamental & Uninhibited’ cluster: extraversion and openness alongside higher emotionality and less restraint. Those are averages, not a stereotype about everyone, but the vibe matches. Your superpower is boldness; your growth zone is sleep — and learning to say ‘that's enough for today’."],
      strengths: [["Смелость", "Boldness"], ["Харизма", "Charisma"], ["Креативность", "Creativity"]],
      growth: [["Высыпаться", "Get some sleep"], ["Смягчать сарказм для новых знакомых", "Dial down sarcasm with new people"]],
      funny: [["Ты переходишь дорогу с уверенностью человека, который опаздывает на собственный успех", "You cross the street with the confidence of someone late for their own success"], ["Твой завтрак — кофе на бегу и бейгл, который ты доешь к ужину", "Breakfast is coffee on the run and a bagel you'll finish by dinner"], ["Бабушка: «Ты чего такой(ая) громкий(ая)?» Ты: «Я не громкий(ая), я уверенный(ая)»", "Grandma: ‘Why are you so loud?’ You: ‘I'm not loud, I'm confident’"], ["У тебя три подработки, два стартапа и одна мечта — поспать", "You have three side hustles, two startups and one dream: sleep"]],
      compat: ["moscow", "berlin", "rio"],
      img: "A cute city character shaped like a little art-deco skyscraper wearing tiny sunglasses and a confident grin, holding a coffee cup and a pizza slice, a little yellow taxi and city lights around, soft pastel colors, glossy flat-3D style, smooth peach-to-sky-blue gradient background, minimal, no text" },
    { id: "tokyo", emoji: "🗼", z: { O: 0.5, C: 1, E: -0.5, A: 0.5, N: -0.5, P: 0.5 },
      title: ["Токио — идеальный порядок с секретной причудой", "Tokyo — perfect order with a secret quirk"],
      summary: [["Точность, вежливость и уважение к чужому времени", "Precision, politeness and respect for others' time"], ["Снаружи спокойствие, внутри — фанатичное увлечение чем-то необычным", "Calm outside, a fanatical niche passion inside"], ["Любишь, когда всё работает как часы", "You love things that run like clockwork"], ["Заботишься о других тихо, но очень внимательно", "You care for others quietly but attentively"]],
      detailed: ["Ты сочетаешь, казалось бы, несочетаемое: безупречную организованность и неожиданные, иногда очень странные увлечения. У тебя всё по расписанию, вещи на своих местах, а в свободное время ты собираешь редкие чаи, мини-фигурки или знаешь всё о каком-нибудь виде мхов. Ты вежлив(а), внимателен(на) к другим и терпеть не можешь подводить людей.\n\nGelfand и коллеги (2011) называют такие общества «тугими»: нормы там сильные, а их соблюдение — форма уважения. Япония в их исследовании ближе к этому полюсу, а у Levine и Norenzayan она на 4-м месте по темпу жизни из 31 страны. Твоя суперсила — надёжность и тонкость. Зона роста — разрешать себе неидеальность и иногда опаздывать… хотя бы на одну минуту.", "You combine what seems incompatible: flawless organization and unexpected, sometimes delightfully odd passions. Everything's on schedule and in its place, while in your free time you collect rare teas or tiny figurines, or know everything about one particular kind of moss. You're polite, attentive and hate letting people down.\n\nGelfand and colleagues (2011) call such societies ‘tight’: norms are strong, and following them is a form of respect. Japan sits toward that end in their study, and in Levine & Norenzayan's work it ranked 4th of 31 countries for pace of life. Your superpower is reliability and subtlety; your growth zone is allowing imperfection — maybe even being late… by one minute."],
      strengths: [["Надёжность", "Reliability"], ["Внимательность к людям", "Attentiveness to others"], ["Увлечённость", "Passionate focus"]],
      growth: [["Разрешать себе ошибки", "Allow yourself mistakes"], ["Говорить о своих желаниях прямо", "Say what you want directly"]],
      funny: [["Ты приходишь за 7 минут до встречи и извиняешься, что «почти опоздал(а)»", "You arrive 7 minutes early and apologize for being ‘almost late’"], ["Твоя коллекция: 48 фигурок, 12 видов чая и таблица, где всё это учтено", "Your collection: 48 figurines, 12 kinds of tea and a spreadsheet tracking it all"], ["Друзья: «Давай просто куда-нибудь сходим». Ты уже прислал(а) маршрут с пересадками и запасным вариантом", "Friends: ‘Let's just go somewhere.’ You've already sent a route with transfers and a backup"], ["Ты благодаришь банкомат. Вслух", "You thank the ATM. Out loud"]],
      compat: ["seoul", "london", "reykjavik"],
      img: "A cute city character shaped like a little red-and-white lattice tower making a polite bow with a calm smile, cherry blossom petals and a tiny bullet train around, soft pastel pink and white colors, glossy flat-3D style, smooth sakura-pink to cream gradient background, minimal, no text" },
    { id: "paris", emoji: "🥐", z: { O: 0.5, C: -0.5, E: 0.5, A: -0.5, N: 1, P: -0.5 },
      title: ["Париж — эстет с драмой", "Paris — the aesthete with a flair for drama"],
      summary: [["Красота важнее скорости", "Beauty over speed"], ["Обожаешь обсуждать жизнь, искусство и людей — долго и со вкусом", "You love discussing life, art and people — at length and with taste"], ["Эмоции на максимум: и восторг, и возмущение", "Feelings at max: rapture and outrage alike"], ["Небрежная элегантность — твой второй паспорт", "Effortless elegance is your second passport"]],
      detailed: ["Ты живёшь красиво — даже когда грустишь. Для тебя важны вкус, стиль, искусство и разговоры, после которых хочется жить. Ты можешь час сидеть на террасе с одной чашкой кофе и называть это «наблюдать за жизнью» — и будешь прав(а). Эмоции у тебя яркие: если восхищаться, то до слёз, если возмущаться, то с манифестом.\n\nПо шкалам это открытость плюс высокая эмоциональность и неспешный темп. Франция у Levine и Norenzayan — только 11-я по скорости жизни, а не первая: долгий обед здесь — ритуал. Но помни про Terracciano и коллег: стереотипы о «национальном характере» плохо совпадают с реальными данными. Так что твой «Париж» — это вайб, а не паспорт. Зона роста — не превращать каждую мелочь в драму в трёх актах.", "You live beautifully — even when you're sad. Taste, style, art and conversations that make you want to live matter to you. You can sit on a café terrace for an hour with one coffee and call it ‘watching life’ — and you'd be right. Your emotions are vivid: if you admire, it's to tears; if you're outraged, it comes with a manifesto.\n\nOn our scales that's openness plus high emotionality and an unhurried pace. In Levine & Norenzayan's study France ranked only 11th for pace of life — a long lunch is a ritual. But remember Terracciano and colleagues: ‘national character’ stereotypes match real data poorly. So your ‘Paris’ is a vibe, not a passport. Growth zone: not turning every small thing into a three-act drama."],
      strengths: [["Вкус и стиль", "Taste and style"], ["Страсть к жизни", "Passion for life"], ["Умение наслаждаться моментом", "Savoring the moment"]],
      growth: [["Меньше драмы из-за мелочей", "Less drama over small things"], ["Быть мягче в критике", "Be gentler with criticism"]],
      funny: [["Ты 40 минут пьёшь один кофе на террасе и называешь это «смотреть на жизнь»", "You nurse one coffee on a terrace for 40 minutes and call it ‘watching life’"], ["Шарф повязан «случайно». На это ушло 20 минут", "Your scarf is tied ‘casually’. It took 20 minutes"], ["Тебе не понравился фильм, и ты написал(а) рецензию на три абзаца. Друзья: «Это был мультик»", "You didn't like the movie and wrote a three-paragraph review. Friends: ‘It was a cartoon’"], ["Мама: «Купи хлеба». Ты возвращаешься с багетом, сыром и экзистенциальным кризисом", "Mom: ‘Grab some bread.’ You come back with a baguette, cheese and an existential crisis"]],
      compat: ["spb", "barcelona", "berlin"],
      img: "A cute city character shaped like a little lattice iron tower wearing a beret and a striped scarf, holding a croissant, with a dreamy dramatic expression, soft pastel lilac and cream colors, glossy flat-3D style, smooth lavender-to-blush gradient background, minimal, no text" },
    { id: "barcelona", emoji: "🏖️", z: { O: 1, C: -0.5, E: 1, A: 0.5, N: -0.5, P: -0.5 },
      title: ["Барселона — солнце, море и ужин в 22:00", "Barcelona — sun, sea and dinner at 10 pm"],
      summary: [["Живёшь ярко, но без спешки", "You live brightly, but without rushing"], ["Дружелюбный(ая), открытый(ая), всегда за любой движ", "Friendly, open and up for anything"], ["Умеешь отдыхать и не чувствуешь за это вины", "You can rest without guilt"], ["Искусство плюс пляж — твой идеальный день", "Art plus beach is your perfect day"]],
      detailed: ["Ты — редкое сочетание энергии и расслабленности. Ты легко знакомишься, любишь компании, музыку, солнце и красивую архитектуру, но при этом не гонишься за временем. Ужин в десять вечера, прогулка до полуночи, утро без будильника — и ты счастлив(а). С тобой хочется жить, а не выживать.\n\nВ исследовании Levine и Norenzayan в более жарких странах жизнь в среднем текла медленнее (r ≈ −0,58), хотя после учёта экономики эта связь ослабевала. Так что твой «средиземноморский режим» — скорее о ценностях: удовольствие, люди, момент. Твоя суперсила — умение радоваться. Зона роста — дедлайны. Они, увы, не знают слова «маньяна».", "You're a rare blend of energy and ease. You make friends easily and love company, music, sun and beautiful architecture — yet you never race the clock. Dinner at 10 pm, a stroll till midnight, a morning without an alarm, and you're happy. People want to live around you, not just survive.\n\nIn Levine & Norenzayan's study, life in hotter countries tended to run slower (r ≈ −.58), though the link weakened once economics was controlled. So your ‘Mediterranean mode’ is really about values: pleasure, people, the moment. Your superpower is joy; your growth zone is deadlines. Sadly, they've never heard of ‘mañana’."],
      strengths: [["Жизнерадостность", "Joyfulness"], ["Общительность", "Sociability"], ["Баланс работы и отдыха", "Work-life balance"]],
      growth: [["Дружить с дедлайнами", "Make friends with deadlines"], ["Не откладывать важные разговоры", "Don't postpone important talks"]],
      funny: [["Ты зовёшь на ужин в 22:00 и искренне не понимаешь, почему все уже хотят спать", "You invite people to dinner at 10 pm and genuinely can't see why they're sleepy"], ["Твой ответ на любой стресс: «Пошли на море». Даже если до моря 1500 км", "Your answer to any stress: ‘Let's go to the beach.’ Even if it's 1,000 miles away"], ["Познакомился(лась) с людьми в очереди за мороженым — через час вы уже танцуете", "You met people in the ice cream line; an hour later you're dancing together"], ["В твоём календаре нет слова «срочно», зато есть слово «фиеста»", "Your calendar doesn't contain the word ‘urgent’, but it does contain ‘fiesta’"]],
      compat: ["rio", "paris", "kazan"],
      img: "A cute city character shaped like a whimsical mosaic tower with wavy colorful tiles, a sunny smile and tiny sunglasses, gentle beach waves and a palm tree beside it, soft pastel orange and turquoise colors, glossy flat-3D style, smooth sunset-orange to aqua gradient background, minimal, no text" },
    { id: "berlin", emoji: "🎧", z: { O: 1, C: -1, E: 0.5, A: -0.5, N: 0, P: 0 },
      title: ["Берлин — свободный дух в чёрном худи", "Berlin — a free spirit in a black hoodie"],
      summary: [["Свобода, творчество и «я сам(а) решу»", "Freedom, creativity and ‘I'll decide for myself’"], ["Обожаешь андеграунд, винтаж и странные идеи", "You love the underground, vintage and weird ideas"], ["Говоришь прямо, без сахара", "You speak plainly, no sugar"], ["Гонишься не за статусом, а за смыслом", "You chase meaning, not status"]],
      detailed: ["Ты — человек свободы. Тебе не нужны чужие правила, чтобы понять, как жить: ты пробуешь, ищешь, экспериментируешь. Тебя вдохновляют искусство, альтернативная культура, старые заводы, превращённые в галереи, и люди, которые не боятся быть странными. Ты честен(на) до прямоты, и это освежает.\n\nВ терминах психологии это очень высокая открытость опыту в паре с низкой тягой к формальностям. Rentfrow с коллегами описывали похожий «расслабленный и творческий» региональный профиль. Забавно, что Германия у Levine и Norenzayan — 3-я по скорости жизни из 31 страны, так что «берлинский» вайб — это про свободу, а не про медлительность. Зона роста — не отвергать структуру из принципа: иногда план — тоже творческий инструмент.", "You're a creature of freedom. You don't need other people's rules to figure out how to live: you try, search and experiment. Art, alternative culture, old factories turned galleries and people unafraid to be weird inspire you. You're honest to the point of bluntness, and it's refreshing.\n\nIn psychological terms, that's very high openness plus little appetite for formality. Rentfrow and colleagues described a similar ‘Relaxed & Creative’ regional profile. Funnily, Germany ranked 3rd of 31 for pace of life in Levine & Norenzayan's study, so the ‘Berlin’ vibe is about freedom, not slowness. Growth zone: don't reject structure on principle — sometimes a plan is a creative tool too."],
      strengths: [["Оригинальность", "Originality"], ["Честность", "Honesty"], ["Свобода от чужих ожиданий", "Freedom from others' expectations"]],
      growth: [["Принимать структуру как инструмент", "Treat structure as a tool"], ["Смягчать прямоту", "Soften the bluntness"]],
      funny: [["Пришёл(шла) на открытие выставки в 19:00, ушёл(шла) в 3 ночи — разговор был слишком интересный", "You arrived at a gallery opening at 7 and left at 3 a.m. — the conversation was just too good"], ["Твой гардероб: чёрное, очень чёрное и одна винтажная куртка с историей", "Your wardrobe: black, very black and one vintage jacket with a backstory"], ["Мама: «Найди нормальную работу». Ты: «Я курирую иммерсивную инсталляцию про грибы»", "Mom: ‘Get a normal job.’ You: ‘I'm curating an immersive installation about fungi’"], ["Ты ездишь на велике в любую погоду и считаешь это частью личности", "You bike in any weather and consider it part of your personality"]],
      compat: ["spb", "nyc", "reykjavik"],
      img: "A cute city character shaped like a small graffiti-covered tower wearing a black hoodie and headphones, riding a tiny bicycle, vinyl records floating around, soft pastel grey, mint and pink colors, glossy flat-3D style, smooth slate-blue to pink gradient background, minimal, no text" },
    { id: "reykjavik", emoji: "🌋", z: { O: 0.5, C: 0, E: -1, A: 0.5, N: -1, P: -1 },
      title: ["Рейкьявик — тихая магия севера", "Reykjavík — quiet northern magic"],
      summary: [["Тебе нужны пространство, природа и тишина", "You need space, nature and quiet"], ["Невозмутимость уровня «рядом вулкан, а я пью чай»", "Calm level: ‘volcano nearby, I'm having tea’"], ["Немного странный(ая) — в самом очаровательном смысле", "A little quirky — in the most charming way"], ["Друзей немного, но все — на всю жизнь", "Few friends, all of them for life"]],
      detailed: ["Ты — спокойствие и тайна. Тебе не нужна толпа, чтобы чувствовать себя живым(ой): достаточно ветра, гор, горячего чая и пары людей, которые понимают тебя без слов. Ты невозмутим(а) в кризисах, добр(а) к окружающим и немного не от мира сего — в лучшем смысле.\n\nПо шкалам это интроверсия, эмоциональная стабильность, мягкость и медленный темп. Bleidorn и коллеги (2016) нашли, что людям в среднем чуть лучше там, где их личность совпадает с «характером» места. Возможно, поэтому тебе так хорошо там, где тихо и много неба. Зона роста — иногда выходить к людям: твоя спокойная мудрость нужна и шумному миру.", "You're calm and a bit of a mystery. You don't need a crowd to feel alive: wind, mountains, hot tea and a couple of people who understand you without words are plenty. You're unflappable in a crisis, kind to others and slightly otherworldly — in the best way.\n\nOn our scales that's introversion, emotional stability, softness and a slow pace. Bleidorn and colleagues (2016) found people do slightly better where their personality matches a place's ‘character’ — maybe that's why you feel best wherever it's quiet and the sky is big. Growth zone: venture out to people now and then — the noisy world needs your calm wisdom too."],
      strengths: [["Невозмутимость", "Composure"], ["Глубина", "Depth"], ["Верность близким", "Loyalty to loved ones"]],
      growth: [["Иногда выходить из зоны тишины", "Leave your quiet zone sometimes"], ["Делиться мыслями первым(ой)", "Share your thoughts first"]],
      funny: [["Твой идеальный выходной: горячий источник, термос и ноль уведомлений", "Your perfect weekend: a hot spring, a thermos and zero notifications"], ["Друзья зовут в клуб, ты предлагаешь смотреть северное сияние в −15. И они почему-то соглашаются", "Friends suggest a club; you suggest watching the northern lights at 5°F. Somehow they agree"], ["На вечеринке ты подружился(лась) с собакой хозяев и тремя такими же интровертами", "At parties you befriend the host's dog and three fellow introverts"], ["Бабушка: «Не простудись!» Ты: «Бабуль, я и есть холодный фронт»", "Grandma: ‘Don't catch a cold!’ You: ‘Grandma, I am the cold front’"]],
      compat: ["tokyo", "spb", "kazan"],
      img: "A cute city character shaped like a little colorful Nordic house with a peaceful smile, wrapped in a knitted sweater, a steaming hot spring and soft aurora in the sky, a tiny puffin friend, soft pastel teal and lilac colors, glossy flat-3D style, smooth teal-to-violet gradient background, minimal, no text" },
    { id: "rio", emoji: "💃", z: { O: -0.5, C: -1, E: 1, A: 1, N: -0.5, P: -1 },
      title: ["Рио-де-Жанейро — карнавал в душе", "Rio de Janeiro — carnival at heart"],
      summary: [["Радость — твой режим по умолчанию", "Joy is your default setting"], ["Обнимашки, музыка и танцы — без повода", "Hugs, music and dancing — no reason needed"], ["Время для тебя — понятие гибкое", "Time, for you, is a flexible concept"], ["Душа компании и лучший утешитель", "Life of the party and the best comforter"]],
      detailed: ["Ты — праздник, который всегда с тобой. Ты обожаешь людей, музыку, солнце и спонтанные решения. Тебя невозможно долго держать в плохом настроении, а твоё тепло заражает даже самых хмурых. Для тебя главное — не успеть всё, а прожить всё: каждую встречу, каждую песню, каждый закат.\n\nВ исследовании Levine и Norenzayan Бразилия оказалась среди самых неторопливых стран — 29-е место из 31. Это не про лень, а про другое отношение ко времени: люди важнее расписания. По нашим шкалам ты — экстраверсия, доброжелательность, спокойствие и медленный темп. Зона роста — пунктуальность: «буду в семь» не должно означать «где-то после девяти».", "You're a portable party. You adore people, music, sunshine and spontaneous decisions. Nobody can keep you in a bad mood for long, and your warmth infects even the grumpiest. What matters isn't getting everything done but living everything: every meeting, every song, every sunset.\n\nIn Levine & Norenzayan's study Brazil was among the most unhurried countries — 29th of 31. That's not laziness; it's a different relationship with time, where people matter more than schedules. On our scales you're extraversion, agreeableness, calm and a slow pace. Growth zone: punctuality — ‘see you at seven’ shouldn't mean ‘sometime after nine’."],
      strengths: [["Тепло и щедрость", "Warmth and generosity"], ["Жизнерадостность", "Zest for life"], ["Умение объединять людей", "Bringing people together"]],
      growth: [["Пунктуальность", "Punctuality"], ["Планировать хотя бы на неделю вперёд", "Plan at least a week ahead"]],
      funny: [["«Буду в 7» на твоём языке означает «где-то после восьми, но с подарком и отличным настроением»", "‘See you at 7’ in your language means ‘sometime after 8, but with a gift and great vibes’"], ["Ты танцуешь в очереди в супермаркете, и кассир тоже начинает пританцовывать", "You dance in the grocery line and the cashier starts grooving too"], ["Твой рецепт от плохого настроения: музыку погромче и всех любимых рядом", "Your cure for a bad mood: music louder and everyone you love nearby"], ["Тебя невозможно расстроить надолго — максимум до следующей песни", "Nobody can keep you sad for long — tops, until the next song"]],
      compat: ["barcelona", "kazan", "nyc"],
      img: "A cute city character shaped like a little rounded mountain peak wearing a colorful carnival feather headdress, dancing with a big joyful smile, tiny palm trees and confetti around, soft pastel green, yellow and pink colors, glossy flat-3D style, smooth lime-to-coral gradient background, minimal, no text" },
    { id: "london", emoji: "☂️", z: { O: 0.5, C: 0.5, E: 0, A: -0.5, N: 0.5, P: 0.5 },
      title: ["Лондон — сдержанный остроумец", "London — the understated wit"],
      summary: [["Внешне сдержанный(ая), внутри — фейерверк иронии", "Reserved outside, fireworks of irony inside"], ["Ценишь традиции, но любишь всё новое и разное", "You value tradition but love the new and diverse"], ["Вежлив(а) — даже когда в ярости", "Polite — even when furious"], ["Дождь тебя не остановит: зонт всегда с собой", "Rain won't stop you: umbrella always on hand"]],
      detailed: ["Ты — мастер тонкой иронии и вежливой дистанции. Снаружи — спокойствие и хорошие манеры, внутри — острый ум и наблюдательность, от которой ничего не скроется. Ты уважаешь традиции, но обожаешь разнообразие: новые районы, кухни, идеи и людей. И да, ты всегда готов(а) к плохой погоде — и к плохим новостям тоже.\n\nJokela и коллеги (2015) изучили около 56 000 лондонцев по 216 районам: открытость была выше всего в центре города, а связь личности со счастьем зависела от района. Открытым людям лучше жилось в плотных и разнообразных кварталах. А Англия у Levine и Norenzayan — 6-я по темпу жизни. Твоя суперсила — остроумие и стойкость. Зона роста — говорить прямо, когда «интересная идея» на самом деле значит «нет».", "You're a master of subtle irony and polite distance. Outside: composure and good manners; inside: a sharp mind and powers of observation that miss nothing. You respect tradition but love diversity — new neighborhoods, cuisines, ideas and people. And yes, you're always prepared for bad weather — and bad news.\n\nJokela and colleagues (2015) studied about 56,000 Londoners across 216 districts: openness was highest in the center, and how personality related to happiness depended on the neighborhood — open people did better in dense, diverse areas. England ranked 6th for pace of life in Levine & Norenzayan's study. Your superpower is wit and resilience; your growth zone is saying it plainly when ‘interesting idea’ actually means ‘no’."],
      strengths: [["Остроумие", "Wit"], ["Стойкость", "Resilience"], ["Открытость разнообразию", "Openness to diversity"]],
      growth: [["Говорить прямо", "Say it plainly"], ["Показывать эмоции близким", "Show feelings to loved ones"]],
      funny: [["Тебе наступили на ногу — и ты извинился(лась). Дважды", "Someone stepped on your foot — and you apologized. Twice"], ["Твоё «интересная идея» на самом деле значит «ни за что». Это знают только свои", "Your ‘interesting idea’ actually means ‘absolutely not’. Only your people know"], ["Очередь — святое. Ты встанешь в неё, даже не зная, за чем она", "Queues are sacred. You'll join one without knowing what it's for"], ["Чай решает всё: расставание, дедлайн, конец света. Сначала чай", "Tea solves everything: breakups, deadlines, the end of the world. Tea first"]],
      compat: ["tokyo", "moscow", "spb"],
      img: "A cute city character shaped like a little clock tower wearing a tiny bowler hat, holding a teacup and an umbrella, with a subtle ironic smile, soft drizzle and a little red double-decker bus behind, soft pastel colors, glossy flat-3D style, smooth grey-blue to rose gradient background, minimal, no text" },
    { id: "seoul", emoji: "✨", z: { O: 1, C: 0.5, E: 1, A: 0, N: 0, P: 1 },
      title: ["Сеул — трендсеттер на скорости 5G", "Seoul — a trendsetter at 5G speed"],
      summary: [["Узнаёшь о трендах раньше, чем они становятся трендами", "You know trends before they're trends"], ["Трудолюбие + стиль + забота о себе", "Hard work + style + self-care"], ["Обожаешь компанию, кафе и поздние прогулки", "You love company, cafés and late-night walks"], ["Всё быстро, красиво и с вниманием к деталям", "Everything fast, beautiful and detail-perfect"]],
      detailed: ["Ты — человек будущего. Ты первым(ой) находишь новое кафе, приложение, музыку или уходовое средство, а через полгода это есть у всех. При этом ты не просто модный(ая): ты много работаешь, тщательно всё продумываешь и умеешь заботиться о себе и друзьях. Работа до вечера, а потом — ужин с компанией и прогулка по ночному городу.\n\nПо нашим шкалам это сочетание открытости, экстраверсии, организованности и высокого темпа. Южная Корея в исследовании Gelfand и коллег ближе к «тугому» полюсу культур с сильными нормами. Возможно, отсюда твоя внимательность к деталям и к тому, как ты выглядишь в глазах других. Зона роста — давать себе передышку: даже 5G иногда нужно перезагружать.", "You're a person of the future. You're first to find the new café, app, song or skincare product — and six months later everyone has it. But you're not just trendy: you work hard, think things through and take care of yourself and your friends. Work until evening, then dinner with the crew and a walk through the city at night.\n\nOn our scales that's openness, extraversion, organization and a high pace. South Korea sits toward the ‘tight’ end of cultures with strong norms in Gelfand and colleagues' research — perhaps that's where your attention to detail and to how you come across comes from. Growth zone: give yourself breaks — even 5G needs a reboot sometimes."],
      strengths: [["Чутьё на новое", "A nose for the new"], ["Трудолюбие", "Work ethic"], ["Забота о себе и других", "Care for self and others"]],
      growth: [["Отдыхать, не сравнивая себя с другими", "Rest without comparing yourself to others"], ["Разрешать себе неидеальные дни", "Allow imperfect days"]],
      funny: [["Твой уход за кожей — 10 шагов. План на день — 25. Ты успеваешь всё", "Your skincare routine has 10 steps. Your daily plan has 25. You finish both"], ["Друзья ещё не слышали о новом кафе, а у тебя уже фото, отзыв и любимый столик", "Your friends haven't heard of the new café; you already have photos, a review and a favorite table"], ["Работаешь до 21:00, идёшь «быстро перекусить» и возвращаешься в час ночи с новыми друзьями", "You work until 9, go for ‘a quick bite’ and come back at 1 a.m. with new friends"], ["Мама: «Зачем тебе пять одинаковых кремов?» Ты: «Они не одинаковые, у них разный вайб»", "Mom: ‘Why do you need five identical creams?’ You: ‘They're not identical, they have different vibes’"]],
      compat: ["tokyo", "moscow", "nyc"],
      img: "A cute city character shaped like a sleek glowing tower with soft neon accents, wearing trendy oversized glasses, holding a bubble tea and a smartphone, little hearts and sparkles around, soft pastel mint, pink and lavender colors, glossy flat-3D style, smooth mint-to-lilac gradient background, minimal, no text" },
    { id: "kazan", emoji: "🫖", z: { O: 0, C: 0.5, E: 0.5, A: 1, N: -0.5, P: 0 },
      title: ["Казань — гостеприимство и гармония", "Kazan — hospitality and harmony"],
      summary: [["Объединяешь людей — разных, но своих", "You bring people together — different, but all yours"], ["Чтишь традиции и легко принимаешь новое", "You honor traditions and welcome the new"], ["У тебя всегда есть чай и что-нибудь к чаю", "There's always tea — and something to go with it"], ["Спокойный(ая), основательный(ая), тёплый(ая)", "Calm, grounded and warm"]],
      detailed: ["Ты — человек-мост. Ты умеешь соединять разное: традиции и современность, старших и младших, «своих» и тех, кто только что пришёл. Рядом с тобой людям спокойно и вкусно, потому что гостеприимство у тебя в крови. Ты не любишь суету, но всегда готов(а) помочь, и твоё слово надёжно.\n\nПо нашим шкалам это высокая доброжелательность, организованность и эмоциональная стабильность. В американских данных Rentfrow и коллег похожий профиль назывался «дружелюбный и традиционный». Для российских городов сопоставимых крупных опубликованных данных мы не нашли, так что твоя «Казань» — тёплый образ, а не статистика. Зона роста — заботиться о себе так же щедро, как о гостях.", "You're a bridge-builder. You connect different worlds: tradition and modernity, old and young, old friends and newcomers. People feel calm and well-fed around you, because hospitality runs in your veins. You dislike fuss, but you're always ready to help, and your word is solid.\n\nOn our scales that's high agreeableness, organization and emotional stability. In Rentfrow and colleagues' US data a similar profile was called ‘Friendly & Conventional’. We found no comparable large published data for Russian cities, so your ‘Kazan’ is a warm image, not a statistic. Growth zone: care for yourself as generously as you care for your guests."],
      strengths: [["Гостеприимство", "Hospitality"], ["Надёжность", "Reliability"], ["Умение находить общий язык с разными людьми", "Finding common ground with anyone"]],
      growth: [["Заботиться о себе", "Care for yourself"], ["Пробовать неожиданное", "Try the unexpected"]],
      funny: [["Гости у тебя не уходят голодными. Они вообще не уходят — без коробки чак-чака их не отпустят", "Guests never leave your place hungry. Actually, they never leave — not without a box of honey sweets"], ["Ты знаешь, как сказать «приятного аппетита» на трёх языках и как уговорить съесть ещё один пирожок на четырёх", "You can say ‘enjoy your meal’ in three languages and talk someone into one more pastry in four"], ["В семейном чате 47 человек, и ты помнишь все дни рождения", "Your family group chat has 47 members and you remember every birthday"], ["Друг: «Я на пять минут». Ты: «Конечно. Чай, суп, второе, десерт — и через пять минут пойдёшь»", "Friend: ‘Just five minutes.’ You: ‘Sure. Tea, soup, a main, dessert — then off you go in five’"]],
      compat: ["rio", "barcelona", "tokyo"],
      img: "A cute city character shaped like a white-and-turquoise fortress tower with a warm welcoming smile, holding a tiny teapot and a plate of honey pastries, soft pastel turquoise and cream colors, glossy flat-3D style, smooth turquoise-to-peach gradient background, minimal, no text" }
  ]
};

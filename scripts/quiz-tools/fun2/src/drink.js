module.exports = {
  id: "drink",
  emoji: "☕",
  durationMin: 4,
  popularity: 4,
  spread: 1.6,
  title: ["Какой ты напиток?", "Which Drink Are You?"],
  tagline: ["Эспрессо, раф или матча? Узнай, что у тебя в кружке — по характеру", "Espresso, raf or matcha? Find out what's in your mug — personality-wise"],
  description: [
    "Сова ты или жаворонок, любишь острые ощущения или уютный плед, режим или спонтанность? 15 вопросов о будильниках, дедлайнах и латте с базиликом — и мы нальём тебе твой напиток. Тест вдохновлён исследованиями хронотипов, поиска ощущений и вкусовых предпочтений.",
    "Night owl or lark, thrill seeker or blanket enthusiast, routine or spontaneity? 15 questions about alarms, deadlines and basil lattes — and we'll pour you your drink. Inspired by research on chronotypes, sensation seeking and taste preferences."
  ],
  tags: [["кофе", "coffee"], ["чай", "tea"], ["хронотип", "chronotype"], ["весёлые тесты", "fun quizzes"]],
  instructions: [
    "Выбирай вариант, который описывает тебя в обычной жизни, а не в идеальной. Один ответ в каждом вопросе. Кофеин не требуется.",
    "Choose the option that describes your ordinary life, not your ideal one. One answer per question. No caffeine required."
  ],
  disclaimer: [
    "Развлекательный тест. Он вдохновлён исследованиями, но не является валидированной методикой и не даёт рекомендаций по питанию. Хронотип здесь оценивается очень приблизительно; для серьёзной оценки есть специальные опросники. Если ты пьёшь много кофеина и плохо спишь, это повод обсудить режим с врачом.",
    "Entertainment quiz. It's research-inspired but not a validated instrument and gives no dietary advice. Chronotype is estimated very roughly here; dedicated questionnaires exist for a proper assessment. If you drink lots of caffeine and sleep poorly, that's worth discussing with a doctor."
  ],
  resultIntro: ["Бариста testik уже пишет твоё имя на стаканчике (с ошибкой, как положено). Твой напиток:", "testik's barista is writing your name on the cup (misspelled, as tradition demands). Your drink:"],
  scoringNotes: [
    "Каждый ответ добавляет баллы к пяти шкалам: сова (Ow, вечерний хронотип), поиск ощущений (SS), режим (C), общительность (E) и уют (W, любовь к сладкому и тёплому). Суммы приводятся к 0–1: (сумма − минимум) / (максимум − минимум). Затем выбирается напиток с ближайшим профилем (евклидово расстояние). Профили откалиброваны так, чтобы при случайных ответах все 12 напитков выпадали примерно поровну.",
    "Each answer adds points to five scales: night owl (Ow, evening chronotype), sensation seeking (SS), routine (C), sociability (E) and comfort (W, love of sweet and warm). Sums are rescaled to 0–1 as (sum − min) / (max − min), then you get the drink with the nearest profile (Euclidean distance). Profiles were calibrated so all 12 drinks come up about equally often under random answering."
  ],
  methodology: [
`## На чём основан тест

- **Хронотип и личность.** Метаанализ Lipnevich и коллег (2017, *JPSP*; 44 выборки, N = 16 647) показал, что «жаворонки» заметно добросовестнее (ρ ≈ 0,37). «Совы» в среднем чуть экстравертнее (β ≈ 0,23) и открытее новому (β ≈ 0,17). Нейротизм слабо связан с утренним типом в обратную сторону, а доброжелательность почти не связана с хронотипом. Обзор Adan и коллег (2012) описывает хронотип как устойчивую индивидуальную особенность. Отсюда шкалы «Сова» (Ow) и «Режим» (C).
- **Поиск ощущений и вкус.** По Zuckerman (1994), поиск новых и сильных ощущений — устойчивая черта. Byrnes и Hayes (2013) нашли, что она коррелирует с любовью к острой еде (r = 0,50) и частотой её употребления (r = 0,39). Поэтому пряный масала-чай и «латте с базиликом» в тесте связаны со шкалой SS.
- **Горечь.** Sagioglou и Greitemeyer (2016) нашли слабую связь общей любви к горькому с «тёмными» чертами (r ≈ 0,14–0,20). Однако любовь к конкретным горьким продуктам вроде кофе была связана скорее с открытостью и экстраверсией. А Ong и коллеги (2018) показали генетически, что люди, сильнее ощущающие горечь кофеина, пьют **больше** кофе — видимо, научаясь связывать горечь с бодростью. Мы не делаем из эспрессо «тёмную личность».
- **Сладкое и уют.** Meier и коллеги (2012) связывали любовь к сладкому с доброжелательностью, но повторное исследование (Ashton и коллеги, 2014) нашло связь слабой. Известный эффект «тёплая кружка → тёплое отношение к людям» (Williams & Bargh, 2008) не воспроизвёлся в крупной повторной проверке (Lynott и коллеги, 2014). Шкала «Уют» — метафора, а не физиология.
- **Кофеин и L-теанин.** Обзор Smith (2002): умеренные дозы кофеина улучшают бдительность и время реакции. Owen и коллеги (2008): сочетание кофеина с L-теанином (он есть в чае, особенно в матче) улучшало переключение внимания сильнее, чем кофеин отдельно. Отсюда образ матчи как «спокойного фокуса».

## Как работает тест

1. 15 оригинальных ситуационных вопросов, 5–6 вариантов.
2. Ответы дают баллы по пяти шкалам: Ow, SS, C, E, W.
3. Суммы нормируются к 0–1 и сравниваются с профилями 12 напитков; побеждает ближайший.
4. Калибровка на 120 000 симулированных случайных прохождений. Доля каждого результата:

{{DIST}}

Также проверено, что «персонаж», отвечающий в духе напитка, получает именно его.

## Ограничения

Тест не валидирован и не измеряет хронотип клинически. Связи вкусов с личностью в исследованиях в основном слабые; напиток — дружелюбная метафора.`,
`## What this quiz is based on

- **Chronotype and personality.** Lipnevich and colleagues' (2017, *JPSP*; 44 samples, N = 16,647) meta-analysis found larks are noticeably more conscientious (ρ ≈ .37), while owls are slightly more extraverted (β ≈ .23) and open (β ≈ .17). Neuroticism related weakly and negatively to morningness; agreeableness was largely unrelated. Adan and colleagues' (2012) review describes chronotype as a stable individual trait. Hence the Night Owl (Ow) and Routine (C) scales.
- **Sensation seeking and taste.** Zuckerman (1994) defined sensation seeking as a stable trait. Byrnes & Hayes (2013) found it correlates with liking spicy food (r = .50) and eating it often (r = .39). So spicy masala chai and the ‘basil latte’ map onto SS.
- **Bitterness.** Sagioglou & Greitemeyer (2016) found a weak link between generally liking bitter tastes and ‘dark’ traits (r ≈ .14–.20), but liking specific bitter foods like coffee went with openness and extraversion. Ong and colleagues (2018) showed, genetically, that people more sensitive to caffeine's bitterness drink **more** coffee — likely learning to associate bitterness with a boost. We don't turn espresso into a ‘dark personality’.
- **Sweetness and comfort.** Meier and colleagues (2012) linked a sweet tooth to agreeableness, but a replication (Ashton and colleagues, 2014) found the link weak. The famous ‘warm mug → warm feelings toward others’ effect (Williams & Bargh, 2008) did not replicate in a large retest (Lynott and colleagues, 2014). The Comfort scale is a metaphor, not physiology.
- **Caffeine and L-theanine.** Smith's (2002) review: moderate caffeine improves alertness and reaction time. Owen and colleagues (2008): caffeine plus L-theanine (found in tea, especially matcha) improved attention switching more than caffeine alone — hence matcha as ‘calm focus’.

## How the quiz works

1. 15 original situational questions with 5–6 options.
2. Answers add points on five scales: Ow, SS, C, E, W.
3. Sums are rescaled to 0–1 and compared to 12 drink profiles; the nearest wins.
4. Calibrated on 120,000 simulated random runs. Share of each result:

{{DIST}}

We also verified that a ‘persona’ answering in the spirit of each drink gets that drink.

## Limitations

Not validated, and not a clinical chronotype measure. Taste–personality links in research are mostly weak; your drink is a friendly metaphor.`
  ],
  sources: [
    { citation: "Lipnevich, A. A., Credè, M., Hahn, E., Spinath, F. M., Roberts, R. D., & De Fruyt, F. (2017). How distinctive are morningness and eveningness from the Big Five factors of personality? A meta-analytic investigation. Journal of Personality and Social Psychology, 112(3), 491–509.", doi: "10.1037/pspp0000099" },
    { citation: "Adan, A., Archer, S. N., Hidalgo, M. P., Di Milia, L., Natale, V., & Randler, C. (2012). Circadian typology: A comprehensive review. Chronobiology International, 29(9), 1153–1175.", doi: "10.3109/07420528.2012.719971" },
    { citation: "Zuckerman, M. (1994). Behavioral expressions and biosocial bases of sensation seeking. Cambridge University Press." },
    { citation: "Byrnes, N. K., & Hayes, J. E. (2013). Personality factors predict spicy food liking and intake. Food Quality and Preference, 28(1), 213–221.", doi: "10.1016/j.foodqual.2012.09.008", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3607321/" },
    { citation: "Sagioglou, C., & Greitemeyer, T. (2016). Individual differences in bitter taste preferences are associated with antisocial personality traits. Appetite, 96, 299–308.", doi: "10.1016/j.appet.2015.09.031" },
    { citation: "Ong, J.-S., Hwang, L. D.-Y., Zhong, V. W., An, J., Gharahkhani, P., Breslin, P. A. S., ... MacGregor, S. (2018). Understanding the role of bitter taste perception in coffee, tea and alcohol consumption through Mendelian randomization. Scientific Reports, 8, 16414.", doi: "10.1038/s41598-018-34713-z" },
    { citation: "Meier, B. P., Moeller, S. K., Riemer-Peltz, M., & Robinson, M. D. (2012). Sweet taste preferences and experiences predict prosocial inferences, personalities, and behaviors. Journal of Personality and Social Psychology, 102(1), 163–174.", doi: "10.1037/a0025253" },
    { citation: "Williams, L. E., & Bargh, J. A. (2008). Experiencing physical warmth promotes interpersonal warmth. Science, 322(5901), 606–607.", doi: "10.1126/science.1162548" },
    { citation: "Lynott, D., Corker, K. S., Wortman, J., Connell, L., Donnellan, M. B., Lucas, R. E., & O'Brien, K. (2014). Replication of ‘Experiencing physical warmth promotes interpersonal warmth’ by Williams and Bargh (2008). Social Psychology, 45(3), 216–222.", doi: "10.1027/1864-9335/a000187" },
    { citation: "Smith, A. (2002). Effects of caffeine on human behavior. Food and Chemical Toxicology, 40(9), 1243–1255.", doi: "10.1016/S0278-6915(02)00096-0" },
    { citation: "Owen, G. N., Parnell, H., De Bruin, E. A., & Rycroft, J. A. (2008). The combined effects of L-theanine and caffeine on cognitive performance and mood. Nutritional Neuroscience, 11(4), 193–198.", doi: "10.1179/147683008X301513" }
  ],
  license: "Original content © testik. All questions, outcomes and texts were written from scratch for this site; no items are copied or adapted from copyrighted questionnaires (e.g., chronotype or sensation-seeking scales) or quiz sites. Scientific papers are cited only as inspiration.",
  dims: [
    { id: "Ow", color: "#C3B1E1", name: ["Сова", "Night owl"], desc: ["Насколько ты вечерний человек: когда засыпаешь, когда тебе лучше думается. Вдохновлено исследованиями хронотипа.", "How much of an evening person you are: when you fall asleep and when you think best. Inspired by chronotype research."], low: ["Жаворонок", "Lark"], high: ["Сова", "Owl"],
      bands: [
        [["Жаворонок", "Lark"], [["Утро — твоё время", "Morning is your time"], ["Рано ложишься, рано встаёшь", "Early to bed, early to rise"], ["К вечеру батарейка садится", "Battery fades by evening"]], ["Твой пик — первая половина дня. Ставь важные дела на утро и не позволяй совам уговорить тебя на «ещё одну серию» в полночь.", "Your peak is the first half of the day. Put important tasks in the morning, and don't let owls talk you into ‘one more episode’ at midnight."]],
        [["Голубь", "Somewhere in between"], [["Гибкий режим", "Flexible rhythm"], ["Можешь и рано, и поздно", "Early or late — both work"], ["Подстраиваешься", "You adapt"]], ["У тебя промежуточный хронотип — как у большинства людей. Это удобно: ты легко подстраиваешься под чужие графики.", "You have an intermediate chronotype, like most people — handy for fitting other people's schedules."]],
        [["Сова", "Owl"], [["Ночью — лучшие идеи", "Best ideas at night"], ["Утро — сложное время", "Mornings are hard"], ["Пик энергии вечером", "Energy peaks in the evening"]], ["Твой мозг просыпается к вечеру. Если можешь, планируй творческую работу на поздние часы, но береги сон: недосып бьёт и по настроению, и по здоровью.", "Your brain wakes up in the evening. If you can, schedule creative work later — but protect your sleep: sleep debt hits mood and health alike."]]
      ] },
    { id: "SS", color: "#FF9AA2", name: ["Поиск ощущений", "Sensation seeking"], desc: ["Тяга к новому, острому и необычному. Вдохновлено концепцией Цукермана.", "Craving for the new, spicy and unusual. Inspired by Zuckerman's concept."], low: ["Проверенная классика", "Tried and true"], high: ["Дай мне перца!", "Bring the spice!"],
      bands: [
        [["Проверенная классика", "Tried and true"], [["Знаешь, что любишь", "Know what you like"], ["Риск — не твоё", "Risk isn't your thing"], ["Стабильность успокаивает", "Stability soothes"]], ["Ты ценишь знакомое и надёжное. Иногда маленький эксперимент — новый вкус или маршрут — даёт приятный всплеск без стресса.", "You value the familiar and reliable. A small experiment now and then — a new flavor or route — gives a pleasant boost without stress."]],
        [["Любопытство в меру", "Moderately curious"], [["Пробуешь новое, если есть повод", "Try new things with good reason"], ["Риск — дозированно", "Risk in moderation"], ["Баланс", "Balance"]], ["Ты открыт(а) новому, но не гонишься за адреналином.", "You're open to new things without chasing adrenaline."]],
        [["Дай мне перца!", "Bring the spice!"], [["Скука — враг", "Boredom is the enemy"], ["Острое, новое, странное", "Spicy, new, strange"], ["Первым(ой) пробуешь", "First to try"]], ["Тебя заряжает новизна. Byrnes и Hayes (2013) нашли, что такие люди заметно чаще любят острую еду. Только помни про безопасный азарт.", "Novelty energizes you. Byrnes & Hayes (2013) found people like you are much more likely to love spicy food. Keep the thrills safe."]]
      ] },
    { id: "C", color: "#B5EAD7", name: ["Режим", "Routine"], desc: ["Дисциплина, планы и любовь к порядку. Близко к добросовестности.", "Discipline, plans and love of order. Akin to conscientiousness."], low: ["Свободный полёт", "Free-flowing"], high: ["Всё по графику", "On schedule"],
      bands: [
        [["Свободный полёт", "Free-flowing"], [["Импровизация", "Improvisation"], ["Планы — это скучно", "Plans are boring"], ["Дедлайн — источник адреналина", "Deadlines are adrenaline"]], ["Ты гибок(гибка) и спонтанен(на). Пара простых опор (будильник, список на день) сделает жизнь спокойнее без потери свободы.", "You're flexible and spontaneous. A couple of simple anchors (an alarm, a daily list) make life calmer without losing freedom."]],
        [["Режим по ситуации", "Structure as needed"], [["Планируешь важное", "Plan what matters"], ["Оставляешь место для спонтанности", "Leave room for spontaneity"], ["Гибкая дисциплина", "Flexible discipline"]], ["У тебя здоровый баланс между планом и импровизацией.", "You balance planning and improvisation well."]],
        [["Всё по графику", "On schedule"], [["Пунктуальность", "Punctuality"], ["Списки и планы", "Lists and plans"], ["Делаешь заранее", "Do things early"]], ["Ты надёжен(на) и организован(а). Не забывай вписывать в расписание и отдых — он тоже пункт плана.", "You're reliable and organized. Remember to schedule rest — it's a plan item too."]]
      ] },
    { id: "E", color: "#FFDAC1", name: ["Общительность", "Sociability"], desc: ["Сколько энергии тебе дают люди. Близко к экстраверсии.", "How much energy you get from people. Akin to extraversion."], low: ["Одиночный заплыв", "Solo flight"], high: ["Кофе на компанию", "Coffee for the whole crew"],
      bands: [
        [["Одиночный заплыв", "Solo flight"], [["Заряжаешься в тишине", "Recharge in quiet"], ["Мало, но близких", "Few, but close"], ["Утро без разговоров", "No talking before coffee"]], ["Тебе комфортно с собой. Это ресурс: ты умеешь думать глубоко и не зависишь от чужого одобрения.", "You're comfortable on your own — a resource: you think deeply and don't depend on approval."]],
        [["По настроению", "Depends on the mood"], [["И в компании, и один(одна)", "Social or solo"], ["Чувствуешь меру", "Know your limits"], ["Гибкость", "Flexibility"]], ["Ты легко переключаешься между общением и уединением.", "You switch easily between company and solitude."]],
        [["Кофе на компанию", "Coffee for the whole crew"], [["Люди заряжают", "People energize you"], ["Все чаты — твои", "Every chat is yours"], ["Знакомишься легко", "Make friends easily"]], ["Ты душа компании. Помни, что интровертам иногда нужна тишина — и это не про тебя лично.", "You're the life of the party. Introverts sometimes need quiet — it's not about you."]]
      ] },
    { id: "W", color: "#FFE5B4", name: ["Уют", "Comfort"], desc: ["Любовь к тёплому, сладкому, мягкому — и к заботе.", "Love of the warm, sweet and soft — and of caring."], low: ["Чистый вкус без сахара", "Neat, no sugar"], high: ["Сладкий плед", "Sweet and snuggly"],
      bands: [
        [["Чистый вкус без сахара", "Neat, no sugar"], [["Минимализм", "Minimalism"], ["Прямота", "Directness"], ["Без сюсюканья", "No fuss"]], ["Ты ценишь суть и не любишь лишнего. Иногда близким важно услышать тёплое слово — добавь его, как щепотку сахара.", "You value substance and skip the frills. Loved ones sometimes need a warm word — add it like a pinch of sugar."]],
        [["Сахар по вкусу", "Sugar to taste"], [["Умеешь быть тёплым(ой)", "Can be warm"], ["Но без приторности", "But never cloying"], ["Баланс", "Balance"]], ["Ты дозируешь уют и прямоту — хороший баланс.", "You dose comfort and directness — a good balance."]],
        [["Сладкий плед", "Sweet and snuggly"], [["Обожаешь уют", "Love coziness"], ["Сладкое — must have", "Sweets are a must"], ["Заботишься о других", "Care for others"]], ["Ты создаёшь тепло вокруг себя. Не забывай, что уют — это ещё и сон, движение и забота о себе.", "You create warmth around you. Remember coziness also means sleep, movement and self-care."]]
      ] }
  ],
  questions: [
    { t: ["Во сколько ты ляжешь спать, если завтра никуда не надо?", "What time do you go to bed if you have nowhere to be tomorrow?"], o: [
      [["В 22:00 — я и так держусь из последних сил", "10 pm — I'm barely hanging on as it is"], { Ow: -2 }],
      [["Около полуночи, как приличный человек", "Around midnight, like a respectable person"], { C: 1 }],
      [["В 2 ночи, после «ещё одной серии»", "2 a.m., after ‘one more episode’"], { Ow: 2 }],
      [["Когда закончится разговор с друзьями. То есть под утро", "When the conversation with friends ends. So, around dawn"], { Ow: 1, E: 1 }],
      [["Когда доделаю проект, неважно, который будет час", "When I finish my project, whatever time it is"], { Ow: 1, C: 1 }]
    ] },
    { t: ["Первые 10 минут после пробуждения:", "Your first 10 minutes after waking up:"], o: [
      [["Зарядка, стакан воды, план дня", "Stretching, a glass of water, the day's plan"], { C: 2, Ow: -1 }],
      [["Лежу и листаю ленту, пока мозг загружается", "Lie there scrolling while my brain loads"], { Ow: 1, C: -1 }],
      [["Иду на запах кофе и ни с кем не разговариваю", "Follow the smell of coffee and speak to no one"], { E: -1, W: -1 }],
      [["Пишу «доброе утро» в три чата", "Text ‘good morning’ to three group chats"], { E: 2 }],
      [["Завариваю что-то новое, что купил(а) вчера", "Brew something new I bought yesterday"], { SS: 2 }],
      [["Обнимаю кота и прошу у вселенной ещё пять минут", "Hug the cat and ask the universe for five more minutes"], { W: 2, Ow: 1 }]
    ] },
    { t: ["В кафе новинка: «Латте с базиликом и копчёной солью». Ты…", "The café has a new drink: ‘Basil latte with smoked salt’. You…"], o: [
      [["Беру сразу! Как можно не попробовать?", "Order it immediately! How could I not?"], { SS: 2 }],
      [["Беру своё обычное. Утро — не время для экспериментов", "Get my usual. Mornings aren't for experiments"], { C: 1, SS: -1 }],
      [["Болтаю с бариста и беру то, что он посоветует", "Chat with the barista and get whatever they recommend"], { E: 2 }],
      [["Беру, если он сладкий. Если нет — какао", "Only if it's sweet. Otherwise, cocoa"], { W: 2 }],
      [["Фотографирую меню и обдумываю до завтра", "Photograph the menu and think it over till tomorrow"], { E: -1, C: 1 }]
    ] },
    { t: ["Твоя идеальная работа или учёба — это…", "Your ideal job or study setup is…"], o: [
      [["Чёткий график, понятные задачи, всё вовремя", "A clear schedule, clear tasks, everything on time"], { C: 2 }],
      [["Свободный график: могу работать в 3 ночи, если пришло вдохновение", "Flexible hours: I can work at 3 a.m. if inspiration strikes"], { Ow: 2, C: -1 }],
      [["Открытый офис, люди, мозговые штурмы", "An open office, people, brainstorms"], { E: 2 }],
      [["Каждый день что-то новое: командировки, проекты, вызовы", "Something new every day: trips, projects, challenges"], { SS: 2 }],
      [["Уютное место, где ценят и заботятся", "A cozy place where people care about you"], { W: 2 }]
    ] },
    { t: ["Как ты относишься к острому?", "How do you feel about spicy food?"], o: [
      [["Чем острее, тем лучше. Чили — мой лучший друг", "The hotter the better. Chili is my best friend"], { SS: 2 }],
      [["Немножко — для характера: имбирь, корица, перчик", "A little — for character: ginger, cinnamon, a dash of pepper"], { SS: 1, W: 1 }],
      [["Нет, спасибо, я нежное создание", "No thanks, I'm a delicate creature"], { W: 1, SS: -1 }],
      [["Ем то, что полезно, а не то, что жжётся", "I eat what's healthy, not what burns"], { C: 1, Ow: -1 }],
      [["Ем самое острое на спор, при всех, ради истории", "Eat the hottest thing on a dare, in public, for the story"], { E: 1, SS: 1 }]
    ] },
    { t: ["Выходные. Твой план?", "The weekend. Your plan?"], o: [
      [["Пробежка в 8 утра, потом рынок", "A run at 8 a.m., then the farmers' market"], { Ow: -2, C: 1 }],
      [["Сплю до обеда, а ночью — лучшие разговоры и фильмы", "Sleep till noon; nights are for the best talks and movies"], { Ow: 2 }],
      [["Большая компания: кафе, парк, концерт", "A big group: café, park, concert"], { E: 2 }],
      [["Что-то новое: скалодром, мастер-класс, поездка", "Something new: climbing gym, a workshop, a trip"], { SS: 2 }],
      [["Плед, книга, сладкое — и никаких людей", "Blanket, book, sweets — and no people"], { W: 1, E: -1 }],
      [["Йога на рассвете, а потом новое веганское кафе", "Sunrise yoga, then a new vegan café"], { Ow: -1, SS: 1, C: 1 }]
    ] },
    { t: ["Как выглядит твоё рабочее место?", "What does your workspace look like?"], o: [
      [["Чистый стол, ноутбук, стакан воды. Всё", "A clean desk, a laptop, a glass of water. That's it"], { C: 1, W: -1 }],
      [["Гнездо: плед, подушки, кружка какао, гирлянда", "A nest: blanket, pillows, a mug of cocoa, fairy lights"], { W: 2 }],
      [["Кафе — люблю работать среди людей", "A café — I like working around people"], { E: 1 }],
      [["Диван в 2 ночи — тогда лучше всего думается", "The couch at 2 a.m. — that's when I think best"], { Ow: 2, C: -1 }],
      [["Каждый день новое место: коворкинг, парк, поезд", "A new spot every day: coworking, a park, a train"], { SS: 1, C: -1 }],
      [["Кухня, где варится что-то пряное и ароматное", "A kitchen where something spicy and fragrant is simmering"], { W: 1, SS: 1 }]
    ] },
    { t: ["Как ты ведёшь себя перед дедлайном?", "How do you handle a deadline?"], o: [
      [["Дедлайна не будет: я всё сделал(а) за неделю", "There won't be a deadline: I finished a week ago"], { C: 2 }],
      [["Работаю всю ночь с огромной кружкой кофе", "Work all night with a giant mug of coffee"], { Ow: 2 }],
      [["Собираю команду, распределяем задачи — вместе быстрее", "Gather the team, split the tasks — faster together"], { E: 1, C: 1 }],
      [["Паникую, ем сладкое, но делаю", "Panic, eat sweets, but get it done"], { W: 1, C: -1 }],
      [["Адреналин! Лучшие идеи приходят за час до сдачи", "Adrenaline! The best ideas come an hour before it's due"], { SS: 1, C: -1 }]
    ] },
    { t: ["Твой стиль в чатах?", "Your texting style?"], o: [
      [["Голосовые, стикеры и 50 сообщений в минуту", "Voice notes, stickers and 50 messages a minute"], { E: 2 }],
      [["Коротко и по делу", "Short and to the point"], { W: -1, C: 1 }],
      [["Отвечаю ночью пачкой на всё, что пришло за день", "Reply at night to everything from the whole day in one batch"], { Ow: 1, E: -1 }],
      [["Тёплые длинные сообщения с сердечками", "Long warm messages with hearts"], { W: 1, E: 1 }],
      [["Скидываю странные ссылки и мемы, которых ещё никто не видел", "Send weird links and memes nobody has seen yet"], { SS: 1, Ow: 1 }]
    ] },
    { t: ["Тебя зовут в путешествие, вылет через 6 часов.", "You're invited on a trip; the flight leaves in 6 hours."], o: [
      [["Лечу! Соберусь в такси", "I'm in! I'll pack in the cab"], { SS: 2, C: -1 }],
      [["Не могу, у меня всё распланировано", "Can't, I have everything planned"], { C: 2, SS: -1 }],
      [["Если едет вся компания — я в деле", "If the whole gang's going, count me in"], { E: 2 }],
      [["Спрошу, будет ли там уютный отель и хороший завтрак", "I'll ask if there's a cozy hotel and a good breakfast"], { W: 1, SS: -1 }],
      [["Рейс в 4 утра? Отлично, я как раз не сплю", "A 4 a.m. flight? Perfect, I'll be up anyway"], { Ow: 2 }]
    ] },
    { t: ["Что ты чувствуешь в 7 утра?", "How do you feel at 7 a.m.?"], o: [
      [["Бодрость! Лучшее время дня", "Energized! Best time of the day"], { Ow: -2 }],
      [["Ничего. Меня ещё нет", "Nothing. I don't exist yet"], { Ow: 2 }],
      [["Нормально, если есть кофе и тишина", "Fine, as long as there's coffee and silence"], { E: -1, W: -1 }],
      [["Желание обнять кого-нибудь и снова лечь", "An urge to hug someone and go back to bed"], { W: 1, Ow: 1 }],
      [["Готовность к делу: я уже полчаса на ногах", "Ready for action: I've been up for half an hour"], { C: 1, Ow: -1 }]
    ] },
    { t: ["Сладкое в твоей жизни — это…", "Sweets in your life are…"], o: [
      [["Обязательная часть каждого дня", "A mandatory part of every day"], { W: 2 }],
      [["Иногда, в награду за подвиги", "An occasional reward for heroic deeds"], { C: 1 }],
      [["Лучше фрукты, ягоды и орехи", "I'd rather have fruit, berries and nuts"], { C: 1, Ow: -1 }],
      [["Чем необычнее, тем лучше: солёная карамель, мисо, чили", "The weirder the better: salted caramel, miso, chili"], { SS: 2 }],
      [["Повод собраться с друзьями", "An excuse to get friends together"], { E: 1, W: 1 }]
    ] },
    { t: ["Друзья описывают тебя одним словом:", "Friends describe you in one word:"], o: [
      [["Надёжный(ая)", "Reliable"], { C: 2 }],
      [["Огонь!", "Fire!"], { SS: 1, E: 1 }],
      [["Уютный(ая)", "Cozy"], { W: 2 }],
      [["Загадочный(ая)", "Mysterious"], { Ow: 1, E: -1 }],
      [["Душа компании", "The life of the party"], { E: 2 }],
      [["Спокойный(ая)", "Calm"], { E: -1, SS: -1 }]
    ] },
    { t: ["Что тебя бесит больше всего?", "What annoys you the most?"], o: [
      [["Беспорядок и опоздания", "Mess and lateness"], { C: 2 }],
      [["Скука и однообразие", "Boredom and monotony"], { SS: 2 }],
      [["Встречи в 8 утра", "8 a.m. meetings"], { Ow: 2 }],
      [["Холод — и в погоде, и в людях", "Coldness — in weather and in people"], { W: 1, E: 1 }],
      [["Шумные люди, которые не дают побыть в тишине", "Loud people who won't let you have some quiet"], { E: -2 }]
    ] },
    { t: ["Твоя суперсила?", "Your superpower?"], o: [
      [["Фокус: делаю одно дело, но идеально", "Focus: one thing at a time, done perfectly"], { C: 1, E: -1 }],
      [["Заряжаю всех вокруг", "Energizing everyone around me"], { E: 2 }],
      [["Не сплю, когда все спят", "Staying awake while everyone sleeps"], { Ow: 2 }],
      [["Утешаю и создаю уют", "Comforting people and creating coziness"], { W: 2 }],
      [["Не боюсь ничего нового", "Not being afraid of anything new"], { SS: 2 }]
    ] }
  ],
  outcomes: [
    { id: "espresso", emoji: "☕", z: { Ow: -0.5, SS: 0, C: 1, E: 0, W: -1 },
      title: ["Эспрессо — коротко, крепко, по делу", "Espresso — short, strong, to the point"],
      summary: [["Максимум смысла в минимуме объёма", "Maximum substance, minimum volume"], ["Решаешь быстро и без лишних слов", "You decide fast, no fluff"], ["Рядом с тобой всё становится эффективнее", "Things just get more efficient around you"], ["Тепло показываешь делами, а не сердечками", "You show warmth in actions, not heart emojis"]],
      detailed: ["Ты — эспрессо: 30 миллилитров чистой концентрации. Ты не любишь воду ни в кружке, ни в разговорах, ни в презентациях. Ты быстро понимаешь суть, принимаешь решения и делаешь. Люди иногда считают тебя строгим(ой), но в сложной ситуации все идут именно к тебе: ты знаешь, что делать.\n\nПо шкалам у тебя высокий «режим» (добросовестность) и минимум «сахара». Кстати, любовь к горькому кофе не делает человека «тёмной личностью»: Sagioglou и Greitemeyer нашли, что любовь к конкретным горьким продуктам вроде кофе связана скорее с открытостью. А Ong и коллеги (2018) показали, что те, кто сильнее чувствует горечь кофеина, пьют кофе даже больше. Зона роста — иногда разбавлять: тёплое слово коллеге стоит дешевле, чем кажется.", "You're an espresso: 30 milliliters of pure concentration. You can't stand watered-down anything — in your cup, in conversations or in presentations. You grasp the core fast, decide and act. People sometimes find you stern, but in a crisis everyone comes to you: you know what to do.\n\nOn our scales you're high on routine (conscientiousness) and minimal on ‘sugar’. By the way, loving bitter coffee doesn't make anyone a ‘dark personality’: Sagioglou & Greitemeyer found liking specific bitter foods like coffee went with openness, and Ong and colleagues (2018) showed people more sensitive to caffeine's bitterness actually drink more coffee. Growth zone: dilute a little now and then — a warm word to a coworker costs less than you think."],
      strengths: [["Эффективность", "Efficiency"], ["Решительность", "Decisiveness"], ["Ясность", "Clarity"]],
      growth: [["Добавлять тепла в общение", "Add warmth to your communication"], ["Давать другим время подумать", "Give others time to think"]],
      funny: [["Твоё сообщение: «Ок». Сообщение, которое ты получил(а): 4 абзаца и 2 голосовых", "Your message: ‘Ok.’ The message you received: four paragraphs and two voice notes"], ["Бариста видит тебя в дверях и уже нажимает кнопку", "The barista sees you at the door and is already pressing the button"], ["Ты сделал(а) отчёт, пока коллеги обсуждали, кто сделает отчёт", "You finished the report while your colleagues were discussing who'd do the report"], ["Мама: «Как дела?» Ты: «Норм. Ты?» Мама: «Опять эспрессо-режим»", "Mom: ‘How are you?’ You: ‘Fine. You?’ Mom: ‘Espresso mode again’"]],
      compat: ["matcha", "cappuccino", "coldbrew"],
      img: "A cute tiny espresso cup character with a focused confident expression and a little crema heart on top, standing next to a mini notebook with checkmarks, soft pastel mocha and cream tones, glossy flat-3D style, smooth latte-beige to lilac gradient background, minimal, no text" },
    { id: "raf", emoji: "🍦", z: { Ow: 0, SS: -0.5, C: 0, E: 1, W: 1 },
      title: ["Раф — сливочный обаятель", "Raf Coffee — the creamy charmer"],
      summary: [["Нежный(ая), обаятельный(ая) и очень тёплый(ая)", "Soft, charming and very warm"], ["Любишь людей и сладкие моменты жизни", "You love people and life's sweet moments"], ["С тобой легко и приятно — как с ванильной пенкой", "Being with you feels like vanilla foam: easy and pleasant"], ["Классика, но со своим характером", "A classic, with a personality of its own"]],
      detailed: ["Раф — московское изобретение 90-х: эспрессо, сливки и ванильный сахар, взбитые вместе. По популярной легенде, его назвали в честь посетителя по имени Рафаэль, который не любил чистый кофе. Ты такой же: тёплый(ая), обаятельный(ая) и не стесняешься любить то, что тебе приятно. С тобой хочется говорить часами, а твоё «пойдём за кофе?» — лучшее начало дня.\n\nПо шкалам у тебя высокое «тепло» и общительность. Meier и коллеги связывали любовь к сладкому с доброжелательностью, хотя потом выяснилось, что связь слабая. Так что твоя мягкость — от характера, а не от сиропа. Зона роста — иногда пробовать что-то новое и говорить «нет», даже если очень не хочется расстраивать.", "Raf coffee is a 1990s Moscow invention: espresso, cream and vanilla sugar steamed together. Popular legend says it was named after a customer called Rafael who didn't like plain coffee. You're similar: warm, charming and unashamed of loving what feels good. People want to talk to you for hours, and your ‘coffee?’ is the best start to anyone's day.\n\nOn our scales you're high on comfort and sociability. Meier and colleagues linked a sweet tooth to agreeableness, though the link later proved weak — so your softness comes from character, not syrup. Growth zone: try new things now and then, and say ‘no’ even when you hate to disappoint."],
      strengths: [["Обаяние", "Charm"], ["Тепло", "Warmth"], ["Умение сделать момент приятным", "Making moments lovely"]],
      growth: [["Говорить «нет»", "Say ‘no’"], ["Выходить из зоны комфорта", "Step out of your comfort zone"]],
      funny: [["Ты зовёшь друга «на кофе», и это всегда заканчивается трёхчасовым разговором и десертом", "You invite a friend ‘for coffee’ and it always ends in a three-hour talk and dessert"], ["Бариста: «Сироп?» Ты: «Да. Двойной. И корицу. И можно сердечко?»", "Barista: ‘Syrup?’ You: ‘Yes. Double. And cinnamon. And could you do a heart?’"], ["Друзья говорят, что ты пахнешь ванилью и хорошим настроением", "Friends say you smell like vanilla and good vibes"], ["Бабушка считает, что ты «ничего не ешь», а ты только что съел(а) три эклера", "Grandma thinks you ‘never eat’, and you just had three éclairs"]],
      compat: ["cocoa", "cappuccino", "lemonade"],
      img: "A cute tall raf coffee cup character with fluffy vanilla foam like a cloud hairdo, rosy cheeks and a charming wink, a tiny vanilla flower beside it, soft pastel cream and caramel tones, glossy flat-3D style, smooth vanilla-cream to pink gradient background, minimal, no text" },
    { id: "matcha", emoji: "🍵", z: { Ow: -0.5, SS: 1, C: 0.5, E: 0, W: -0.5 },
      title: ["Матча — спокойный фокус и тренды раньше всех", "Matcha — calm focus and trends before everyone"],
      summary: [["Осознанность — твой стиль жизни", "Mindfulness is your lifestyle"], ["Пробуешь новое первым(ой), но без суеты", "First to try new things, without the fuss"], ["Спокойный(ая) снаружи, сосредоточенный(ая) внутри", "Calm outside, focused inside"], ["Знаешь толк в эстетике и пользе", "You know your aesthetics — and your benefits"]],
      detailed: ["Ты — матча: ярко-зелёная, необычная и удивительно спокойная. Ты любишь новое — вкусы, практики, идеи — и узнаёшь о них раньше других. Но ты не гонишься за хайпом: ты выбираешь то, что действительно работает. Йога на рассвете, ровный фокус в течение дня и красивая кружка — твой рецепт продуктивности без выгорания.\n\nВ чае, особенно в матче, есть L-теанин. Owen и коллеги (2008) показали, что сочетание L-теанина с кофеином улучшало переключение внимания сильнее, чем один кофеин. Отсюда образ «бодрого спокойствия», который тебе очень идёт. По шкалам у тебя высокий поиск нового плюс дисциплина. Зона роста — делиться открытиями без лекций и иногда позволять себе неидеальный, «неосознанный» день с пончиком.", "You're matcha: vivid green, unusual and remarkably calm. You love the new — flavors, practices, ideas — and hear about them before others. But you don't chase hype: you pick what actually works. Sunrise yoga, steady focus all day and a beautiful mug are your recipe for productivity without burnout.\n\nTea, especially matcha, contains L-theanine. Owen and colleagues (2008) found caffeine plus L-theanine improved attention switching more than caffeine alone — hence the ‘alert calm’ that suits you so well. On our scales you're high on novelty seeking plus discipline. Growth zone: share discoveries without lecturing, and allow yourself an imperfect, ‘unmindful’ day with a donut."],
      strengths: [["Фокус", "Focus"], ["Любознательность", "Curiosity"], ["Осознанность", "Mindfulness"]],
      growth: [["Не читать лекции о пользе", "Don't lecture about benefits"], ["Разрешать себе «неправильные» радости", "Allow ‘imperfect’ pleasures"]],
      funny: [["У тебя есть бамбуковый венчик, и ты знаешь, как правильно им пользоваться", "You own a bamboo whisk and know exactly how to use it"], ["Ты пил(а) матчу, когда это ещё не было мейнстримом. И обязательно об этом упомянешь", "You drank matcha before it was mainstream. And you'll definitely mention it"], ["Твоя утренняя рутина: медитация, дневник, матча, план. Утренняя рутина друзей: проснуться", "Your morning routine: meditation, journaling, matcha, planning. Your friends' routine: waking up"], ["Бабушка: «Что это за зелёная жижа?» Ты: «Это суперфуд, ба». Бабушка: «Это трава»", "Grandma: ‘What's that green goo?’ You: ‘It's a superfood, Grandma.’ Grandma: ‘It's grass’"]],
      compat: ["espresso", "smoothie", "chai"],
      img: "A cute matcha latte bowl character with a serene focused smile and a tiny bamboo whisk, little green leaves floating around, soft pastel matcha green and cream tones, glossy flat-3D style, smooth mint-to-cream gradient background, minimal, no text" },
    { id: "cappuccino", emoji: "🥐", z: { Ow: -0.5, SS: -0.5, C: 0.5, E: 1, W: 0 },
      title: ["Капучино — классика, которую любят все", "Cappuccino — the classic everyone loves"],
      summary: [["Общительный(ая), надёжный(ая) и сбалансированный(ая)", "Sociable, reliable and well-balanced"], ["Утро с тобой начинается правильно", "Mornings with you start right"], ["Ты связующее звено любой компании", "You're the glue of every group"], ["Не экстремально, зато всегда вкусно", "Not extreme, but always good"]],
      detailed: ["Капучино — это идеальный баланс: треть эспрессо, треть молока, треть пены. Ты такой(ая) же: собранный(ая), но не занудный(ая), общительный(ая), но не утомительный(ая). Ты тот человек, который помнит, кто какой кофе пьёт, организует утренние встречи и делает рабочий созвон чуть человечнее.\n\nПо шкалам у тебя высокая общительность, умеренный режим и любовь к проверенному. Ты не гонишься за экзотикой, потому что знаешь, что работает и что нравится людям. Это не скучно, а мудро. Зона роста — иногда удивлять: новый маршрут, необычное хобби или спонтанная поездка покажут твою пенку с неожиданной стороны.", "A cappuccino is perfect balance: one-third espresso, one-third milk, one-third foam. You're the same: organized but not tedious, sociable but not exhausting. You remember everyone's coffee order, organize the morning meetups and make work calls a little more human.\n\nOn our scales you're high on sociability, moderate on routine and fond of the tried-and-true. You don't chase the exotic because you know what works and what people like — that's not boring, it's wise. Growth zone: surprise people sometimes — a new route, an unusual hobby or a spontaneous trip will show your foam from an unexpected angle."],
      strengths: [["Баланс", "Balance"], ["Общительность", "Sociability"], ["Надёжность", "Reliability"]],
      growth: [["Пробовать непривычное", "Try the unfamiliar"], ["Иногда ставить себя на первое место", "Put yourself first sometimes"]],
      funny: [["Ты знаешь кофейный заказ каждого коллеги и обижаешься, если кто-то его меняет без предупреждения", "You know every coworker's coffee order and feel betrayed if someone changes it without notice"], ["Твоё «давай встретимся на кофе» — это 20 человек в кофейне в субботу", "Your ‘let's grab a coffee’ means 20 people in a café on Saturday"], ["Ты рисуешь пенкой на капучино сердечко. Получается лебедь. Ты делаешь вид, что так и задумано", "You try to draw a heart in the foam. It comes out as a swan. You pretend that was the plan"], ["Мама: «Возьми с собой шапку». Ты уже взял(а). И термос. И бутерброды на всех", "Mom: ‘Take a hat.’ You already did. And a thermos. And sandwiches for everyone"]],
      compat: ["raf", "espresso", "smoothie"],
      img: "A cute cappuccino cup character with a foam-art heart on top, a friendly warm smile and a tiny croissant buddy, soft pastel coffee-brown and cream tones, glossy flat-3D style, smooth peach-to-cream gradient background, minimal, no text" },
    { id: "cocoa", emoji: "🍫", z: { Ow: 0, SS: -1, C: -0.5, E: -0.5, W: 1 },
      title: ["Какао с маршмеллоу — уют в кружке", "Cocoa with Marshmallows — coziness in a mug"],
      summary: [["Ты лучшее лекарство от плохого дня", "You're the best cure for a bad day"], ["Любишь уют, пледы и проверенные радости", "You love coziness, blankets and proven joys"], ["Немного ребёнок внутри — и это прекрасно", "A bit of a kid at heart — and that's wonderful"], ["Не спешишь, не суетишься, не гонишься", "No rush, no fuss, no chase"]],
      detailed: ["Ты — кружка какао с маршмеллоу в холодный вечер: тёплый(ая), мягкий(ая) и очень родной(ая). Ты не любишь суету и экстремальные развлечения, зато ты мастер маленьких радостей: любимый мультик, плед с оленями, разговор с близким человеком. Рядом с тобой люди вспоминают, что жизнь — это не только дедлайны.\n\nПо шкалам у тебя максимум уюта и любовь к знакомому. Исследования «утешительной еды» (comfort food) показывают, что она часто связана с воспоминаниями о близких. Твоя кружка — это и про них. Зона роста — иногда выбираться из-под пледа: новое место или знакомство могут оказаться не страшными, а очень даже уютными.", "You're a mug of cocoa with marshmallows on a cold evening: warm, soft and deeply familiar. You dislike fuss and extreme thrills, but you're a master of small joys: a favorite cartoon, a reindeer blanket, a talk with someone dear. People remember around you that life isn't just deadlines.\n\nOn our scales you're maxed out on comfort and fond of the familiar. Comfort-food research shows such foods are often tied to memories of loved ones — your mug is about them too. Growth zone: crawl out from under the blanket sometimes — a new place or person might turn out not scary at all, but rather cozy."],
      strengths: [["Тепло", "Warmth"], ["Умение радоваться мелочам", "Joy in small things"], ["Надёжный уют", "Reliable comfort"]],
      growth: [["Пробовать новое", "Try new things"], ["Выбираться из зоны комфорта", "Leave the comfort zone"]],
      funny: [["Ты пьёшь какао из кружки с котиками, и тебе 34. Никаких вопросов", "You drink cocoa from a kitty mug, and you're 34. No questions asked"], ["Твоё «выйти из зоны комфорта» — это сесть в кресло вместо дивана", "‘Leaving your comfort zone’ means sitting in the armchair instead of the couch"], ["Маршмеллоу в какао: 7. Какао: на донышке", "Marshmallows in the cocoa: 7. Cocoa: barely any"], ["Мама до сих пор звонит спросить, тепло ли ты одет(а), — и ты рад(а)", "Mom still calls to ask if you're dressed warmly — and you love it"]],
      compat: ["raf", "minttea", "threeinone"],
      img: "A cute mug of hot cocoa character piled with fluffy marshmallows, wrapped in a tiny knitted blanket with a content cozy smile, soft pastel chocolate and pink tones, glossy flat-3D style, smooth rose-to-cream gradient background, minimal, no text" },
    { id: "minttea", emoji: "🌿", z: { Ow: -0.5, SS: -1, C: 0.5, E: -1, W: 0 },
      title: ["Чай с мятой — тихая гармония", "Mint Tea — quiet harmony"],
      summary: [["Спокойствие — твоя суперсила", "Calm is your superpower"], ["Тишина, книги и свои люди", "Quiet, books and your people"], ["Рядом с тобой хочется выдохнуть", "People exhale around you"], ["Режим, а не хаос", "Routine, not chaos"]],
      detailed: ["Ты — чашка чая с мятой: свежий(ая), спокойный(ая) и успокаивающий(ая). Ты не любишь шумные тусовки и резкие повороты, зато в твоей жизни есть порядок, любимые ритуалы и несколько очень близких людей. Ты умеешь слушать, давать дельные советы и выдерживать паузы, а это сейчас редкий навык.\n\nПо шкалам у тебя интроверсия, режим и любовь к предсказуемому. Интроверсия — не застенчивость, а способ восстанавливаться в тишине, и ты делаешь это мастерски. Зона роста — делать маленькие шаги в неизвестное: новый вкус, новый маршрут, разговор с незнакомцем. Мята, кстати, отлично сочетается с неожиданными ингредиентами.", "You're a cup of mint tea: fresh, calm and calming. You dislike loud parties and sharp turns, but your life has order, favorite rituals and a few very close people. You listen well, give sound advice and can sit with silence — a rare skill these days.\n\nOn our scales that's introversion, routine and love of the predictable. Introversion isn't shyness; it's recharging in quiet, and you're a master of it. Growth zone: small steps into the unknown — a new flavor, a new route, a chat with a stranger. Mint, by the way, pairs beautifully with unexpected ingredients."],
      strengths: [["Спокойствие", "Calm"], ["Умение слушать", "Listening"], ["Стабильность", "Stability"]],
      growth: [["Маленькие эксперименты", "Small experiments"], ["Чаще говорить о себе", "Talk about yourself more"]],
      funny: [["На вечеринке ты единственный(ая), кто спросил хозяйку, есть ли у неё чай. И у неё был", "At the party you were the only one who asked the host for tea. And she had some"], ["Твой «экстремальный вечер» — новый сорт чая и книга не того жанра", "Your ‘wild night’ is a new tea blend and a book from an unfamiliar genre"], ["Друзья звонят тебе, когда надо успокоиться. Ты — их приложение для медитации", "Friends call you when they need to calm down. You are their meditation app"], ["Ты выращиваешь мяту на подоконнике и разговариваешь с ней. Она растёт лучше всех", "You grow mint on your windowsill and talk to it. It's thriving"]],
      compat: ["cocoa", "smoothie", "coldbrew"],
      img: "A cute glass teacup character with fresh mint leaves, a peaceful closed-eye smile and gentle steam swirls, a tiny potted mint plant beside it, soft pastel mint green and white tones, glossy flat-3D style, smooth mint-to-pale-blue gradient background, minimal, no text" },
    { id: "lemonade", emoji: "🍋", z: { Ow: 0, SS: 0.5, C: -1, E: 1, W: 0.5 },
      title: ["Домашний лимонад — летнее настроение круглый год", "Homemade Lemonade — summer vibes all year round"],
      summary: [["Яркий(ая), игристый(ая) и заразительно весёлый(ая)", "Bright, fizzy and contagiously fun"], ["Планов нет, зато есть идея!", "No plans — but a great idea!"], ["Знакомишься со всеми за пять минут", "You befriend everyone in five minutes"], ["С кислинкой, но всё равно сладкий(ая)", "A little sour, but sweet anyway"]],
      detailed: ["Ты — домашний лимонад в жаркий день: свежий(ая), игристый(ая) и поднимающий(ая) настроение с первого глотка. Ты обожаешь людей, спонтанные идеи и всё, что бодрит. Ты можешь превратить поход в магазин в приключение, а скучную встречу — в вечеринку. Немного кислинки в виде иронии и честности делает тебя ещё интереснее.\n\nПо шкалам у тебя высокая общительность, спонтанность и умеренный поиск новизны. В исследованиях экстраверсия стабильно связана с позитивными эмоциями, и ты — живое тому подтверждение. Зона роста — режим: даже самый игристый лимонад выдыхается, если его не закрыть. Сон и пара планов на неделю сохранят твои пузырьки.", "You're homemade lemonade on a hot day: fresh, fizzy and mood-lifting from the first sip. You adore people, spontaneous ideas and anything energizing. You can turn a grocery run into an adventure and a boring meeting into a party. A twist of sourness — irony and honesty — makes you even more interesting.\n\nOn our scales you're high on sociability and spontaneity, with moderate novelty seeking. Research consistently links extraversion with positive emotions — you're living proof. Growth zone: routine. Even the fizziest lemonade goes flat if you leave the cap off. Sleep and a couple of plans per week will keep your bubbles."],
      strengths: [["Энергия", "Energy"], ["Общительность", "Sociability"], ["Спонтанность", "Spontaneity"]],
      growth: [["Режим сна", "Sleep schedule"], ["Доводить начатое", "Follow through"]],
      funny: [["Ты зашёл(шла) за хлебом и вернулся(лась) с тремя новыми друзьями и приглашением на свадьбу", "You popped out for bread and came back with three new friends and a wedding invitation"], ["Твой календарь — это стикер «как-нибудь разберусь» на холодильнике", "Your calendar is a sticky note on the fridge that says ‘I'll figure it out’"], ["Друзья: «Давай спокойно посидим». Ты через час: «А пошлите на караоке?!»", "Friends: ‘Let's have a quiet night.’ You, an hour later: ‘Karaoke, anyone?!’"], ["Ты отвечаешь на сообщения быстрее, чем их дописывают", "You reply to messages before they're finished being typed"]],
      compat: ["bubbletea", "raf", "smoothie"],
      img: "A cute glass of sparkling lemonade character with lemon slices, a striped straw and fizzy bubbles, a big cheerful grin and tiny sunglasses, soft pastel yellow and mint tones, glossy flat-3D style, smooth lemon-yellow to aqua gradient background, minimal, no text" },
    { id: "smoothie", emoji: "🥤", z: { Ow: -1, SS: 0, C: 1, E: 0.5, W: 0.5 },
      title: ["Ягодный смузи — бодрый жаворонок", "Berry Smoothie — the cheerful early bird"],
      summary: [["Утро — твоё лучшее время", "Morning is your best time"], ["Заботишься о себе и о других", "You take care of yourself and others"], ["Дисциплина с улыбкой", "Discipline with a smile"], ["Полезно, вкусно и вовремя", "Healthy, tasty and on time"]],
      detailed: ["Ты — ягодный смузи в 7:30 утра: яркий(ая), бодрый(ая) и полезный(ая) для окружающих. Ты встаёшь рано и с удовольствием, успеваешь до работы пробежку и завтрак, а к обеду уже сделал(а) половину дел. При этом ты не зануда: ты добрый(ая), общительный(ая) и любишь заряжать людей своим настроением.\n\nМетаанализ Lipnevich и коллег (2017) показал, что «жаворонки» в среднем заметно добросовестнее (ρ ≈ 0,37) — это твой случай. Зона роста — гибкость: не все созданы для утренних пробежек, и совам не обязательно об этом напоминать. А ещё иногда можно позволить себе пиццу в полночь: от одного раза режим не рухнет.", "You're a berry smoothie at 7:30 a.m.: bright, energetic and good for everyone around you. You rise early and happily, fit in a run and breakfast before work, and have half your tasks done by lunch. And you're no bore: you're kind, sociable and love lifting people's mood.\n\nLipnevich and colleagues' (2017) meta-analysis found larks are noticeably more conscientious on average (ρ ≈ .37) — that's you. Growth zone: flexibility. Not everyone is built for morning runs, and owls don't need reminding. And sometimes midnight pizza is fine — one time won't topple your routine."],
      strengths: [["Дисциплина", "Discipline"], ["Бодрость", "Energy"], ["Забота", "Care"]],
      growth: [["Принимать чужой ритм", "Accept others' rhythms"], ["Разрешать себе спонтанность", "Allow spontaneity"]],
      funny: [["Ты пишешь в чат в 6:15: «Кто на пробежку?» Отвечает только будильник соседа", "You text the group at 6:15 a.m.: ‘Who's up for a run?’ Only the neighbor's alarm replies"], ["Твой блендер работает громче, чем будильники всех соседей вместе взятых", "Your blender is louder than all your neighbors' alarms combined"], ["Ты считаешь шаги, стаканы воды и часы сна. Друзья считают тебя слегка пугающим(ей)", "You count steps, glasses of water and hours of sleep. Friends find this slightly scary"], ["Бабушка тобой гордится: «Ну наконец-то хоть кто-то в семье завтракает»", "Grandma is proud: ‘Finally someone in this family eats breakfast’"]],
      compat: ["matcha", "cappuccino", "lemonade"],
      img: "A cute berry smoothie cup character with a striped straw, berries and a mint leaf on top, wearing a tiny sweatband with an energetic smile, a little sunrise behind, soft pastel berry-pink and lilac tones, glossy flat-3D style, smooth sunrise-peach to pink gradient background, minimal, no text" },
    { id: "coldbrew", emoji: "🧊", z: { Ow: 1, SS: 0, C: -0.5, E: -1, W: -0.5 },
      title: ["Колд брю — невозмутимая ночная сова", "Cold Brew — the unbothered night owl"],
      summary: [["Чем позже, тем лучше думается", "The later it gets, the better you think"], ["Спокойный(ая), независимый(ая), немного загадочный(ая)", "Calm, independent, a little mysterious"], ["Медленно настаиваешься — зато какой результат", "You steep slowly — but what results"], ["Утро? Не знаем такого", "Morning? Never heard of it"]],
      detailed: ["Колд брю настаивается 12–24 часа в холодной воде, и спешить с ним бесполезно. Как и с тобой. Ты оживаешь к вечеру, а лучшие идеи приходят к тебе после полуночи, когда мир наконец замолкает. Ты независим(а), спокоен(на) и не любишь суету и пустые разговоры. Зато если ты увлёкся(лась) делом, то погружаешься на 100%.\n\nВ метаанализе Lipnevich и коллег (2017) «совы» в среднем чуть открытее новому и экстравертнее. Но это средние, и ты — пример того, как вечерний хронотип сочетается с любовью к уединению. Зона роста — сон: биологические часы не обманешь, а недосып бьёт и по настроению, и по здоровью. Постарайся, чтобы твоё «потом высплюсь» иногда наступало.", "Cold brew steeps for 12–24 hours in cold water; rushing it is pointless. Same with you. You come alive in the evening, and your best ideas arrive after midnight, when the world finally goes quiet. You're independent and calm, and you dislike fuss and small talk. But when something grips you, you dive in 100%.\n\nIn Lipnevich and colleagues' (2017) meta-analysis, owls were on average slightly more open and extraverted — but those are averages, and you show how an evening chronotype can pair with a love of solitude. Growth zone: sleep. You can't fool your biological clock, and sleep debt hits both mood and health. Let your ‘I'll catch up on sleep later’ actually happen sometimes."],
      strengths: [["Глубокая концентрация", "Deep focus"], ["Независимость", "Independence"], ["Невозмутимость", "Composure"]],
      growth: [["Режим сна", "Sleep schedule"], ["Отвечать на сообщения днём", "Reply to messages in daylight"]],
      funny: [["Твой продуктивный день начинается в 23:00. Твои коллеги об этом знают и боятся", "Your productive day starts at 11 pm. Your coworkers know this and fear it"], ["Ты отвечаешь на утренние сообщения в 2:47 ночи с текстом «доброе утро»", "You reply to morning messages at 2:47 a.m. with ‘good morning’"], ["Будильник на 8:00 — это для тебя не время, а угроза", "An 8 a.m. alarm isn't a time to you — it's a threat"], ["Мама: «Ты вообще спишь?» Ты: «Иногда. По выходным. Днём»", "Mom: ‘Do you ever sleep?’ You: ‘Sometimes. On weekends. During the day’"]],
      compat: ["espresso", "threeinone", "minttea"],
      img: "A cute tall glass of cold brew coffee character with ice cubes, cool half-lidded relaxed eyes and a little crescent moon and stars above, soft pastel navy, mocha and lilac tones, glossy flat-3D style, smooth midnight-blue to lavender gradient background, minimal, no text" },
    { id: "bubbletea", emoji: "🧋", z: { Ow: 0.5, SS: 1, C: -1, E: 0.5, W: 0.5 },
      title: ["Бабл-ти — сюрприз в каждом глотке", "Bubble Tea — a surprise in every sip"],
      summary: [["Игривый(ая), необычный(ая) и непредсказуемый(ая)", "Playful, unusual and unpredictable"], ["Обожаешь пробовать всё новое", "You love trying everything new"], ["Немного хаоса, много веселья", "A bit of chaos, a lot of fun"], ["С тобой никогда не знаешь, что будет дальше", "With you, you never know what comes next"]],
      detailed: ["Ты — бабл-ти: яркий(ая), разноцветный(ая) и с сюрпризом на дне. Ты обожаешь новое: странные вкусы, необычные места, спонтанные идеи и всё, о чём ещё никто не слышал. Ты живёшь немного хаотично, но весело, и вокруг тебя постоянно что-то происходит. Люди тянутся к тебе за порцией удивления.\n\nПо шкалам у тебя высокий поиск ощущений, спонтанность и лёгкий вечерний хронотип. Поиск новых ощущений, по Цукерману, — устойчивая черта, и она проявляется даже во вкусах. Byrnes и Hayes нашли, что такие люди заметно чаще любят необычную и острую еду. Зона роста — немного структуры: тапиока прекрасна, но иногда хочется знать, что будет на дне стакана.", "You're bubble tea: bright, colorful and with a surprise at the bottom. You love the new — strange flavors, unusual places, spontaneous ideas and anything nobody's heard of yet. Your life is a bit chaotic but fun, and something's always happening around you. People come to you for a dose of surprise.\n\nOn our scales you're high on sensation seeking and spontaneity, with a slight evening chronotype. Zuckerman showed sensation seeking is a stable trait that shows up even in taste: Byrnes & Hayes found such people are much more likely to love unusual, spicy food. Growth zone: a little structure — tapioca is great, but sometimes people want to know what's at the bottom of the cup."],
      strengths: [["Креативность", "Creativity"], ["Открытость", "Openness"], ["Заразительное веселье", "Contagious fun"]],
      growth: [["Немного планирования", "A bit of planning"], ["Доводить идеи до конца", "Finish your ideas"]],
      funny: [["Ты заказываешь бабл-ти «с сыром и манго» просто потому, что не пробовал(а)", "You order bubble tea ‘with cheese foam and mango’ just because you haven't tried it"], ["У тебя в телефоне 200 фото еды и 3 фото себя", "Your phone holds 200 food photos and 3 of yourself"], ["Твоё «ненадолго» — это 6 часов, 3 локации и новый друг-диджей", "Your ‘just for a bit’ means 6 hours, 3 locations and a new DJ friend"], ["Бабушка: «Что это за шарики?» Ты: «Тапиока!» Бабушка: «Саго, что ли? Я в 70-х такое варила»", "Grandma: ‘What are those balls?’ You: ‘Tapioca!’ Grandma: ‘Ah, sago. I cooked that in the ’70s’"]],
      compat: ["lemonade", "chai", "threeinone"],
      img: "A cute bubble tea cup character with a wide straw and tapioca pearls at the bottom, a playful wink and tiny star sparkles, soft pastel taro-purple, pink and milky tones, glossy flat-3D style, smooth taro-lilac to pink gradient background, minimal, no text" },
    { id: "chai", emoji: "🫚", z: { Ow: 0, SS: 1, C: 0, E: 0, W: 1 },
      title: ["Масала-чай — тёплый искатель приключений", "Masala Chai — the warm adventurer"],
      summary: [["Ищешь приключений — но с пледом в рюкзаке", "You seek adventure — with a blanket in your backpack"], ["Пряный(ая), тёплый(ая) и многогранный(ая)", "Spicy, warm and many-layered"], ["Любишь острое во всех смыслах", "You love spice in every sense"], ["Умеешь сделать уютным даже палаточный лагерь", "You can make even a campsite cozy"]],
      detailed: ["Ты — масала-чай: чёрный чай, молоко, имбирь, кардамон, корица и щепотка перца. Сложно, ярко и очень тепло. Ты любишь новые впечатления, далёкие поездки и необычные вкусы, но никогда не забываешь о людях: ты привозишь всем сувениры, кормишь всех в походе и превращаешь любую поездку в историю с тёплым финалом.\n\nПо шкалам у тебя редкое сочетание: высокий поиск ощущений и высокий «уют». Byrnes и Hayes (2013) нашли, что люди, склонные к поиску новых ощущений, заметно чаще любят острую еду (r = 0,50). Твой имбирь с перцем — не случайность. Зона роста — отдых между приключениями: даже самому пряному чаю нужно время, чтобы настояться.", "You're masala chai: black tea, milk, ginger, cardamom, cinnamon and a pinch of pepper — complex, vivid and very warm. You love new experiences, faraway trips and unusual flavors, but you never forget people: you bring everyone souvenirs, feed the whole camp and turn every trip into a story with a warm ending.\n\nOn our scales you have a rare combo: high sensation seeking and high comfort. Byrnes & Hayes (2013) found sensation seekers are much more likely to love spicy food (r = .50) — your ginger and pepper are no accident. Growth zone: rest between adventures. Even the spiciest chai needs time to steep."],
      strengths: [["Смелость", "Boldness"], ["Тепло", "Warmth"], ["Многогранность", "Many-sidedness"]],
      growth: [["Отдыхать между приключениями", "Rest between adventures"], ["Не брать на себя всех в походе", "Don't carry the whole camp"]],
      funny: [["Твой рюкзак в поход: палатка, специи, турка и плед для каждого", "Your hiking pack: a tent, spices, a coffee pot and a blanket for everyone"], ["Ты привозишь из путешествий приправы, которые невозможно произнести, и угощаешь всех", "You bring back spices nobody can pronounce from your travels and feed them to everyone"], ["Друзья: «Это слишком остро!» Ты: «Это мягкая версия»", "Friends: ‘This is too spicy!’ You: ‘This is the mild version’"], ["Мама: «Опять куда-то едешь?» Ты: «Да! Но вернусь к твоему дню рождения с подарками из трёх стран»", "Mom: ‘Off somewhere again?’ You: ‘Yes! But I'll be back for your birthday with gifts from three countries’"]],
      compat: ["matcha", "bubbletea", "cocoa"],
      img: "A cute clay cup of masala chai character with cinnamon sticks and star anise, a warm adventurous smile and a tiny backpack, swirls of fragrant steam, soft pastel terracotta, caramel and cream tones, glossy flat-3D style, smooth apricot-to-terracotta gradient background, minimal, no text" },
    { id: "threeinone", emoji: "🌀", z: { Ow: 1, SS: -0.5, C: -1, E: 0, W: 0.5 },
      title: ["Кофе «3 в 1» — уютный хаос и философия «и так сойдёт»", "3-in-1 Instant Coffee — cozy chaos and ‘good enough’ energy"],
      summary: [["Мастер жизни в режиме «как-нибудь»", "A master of living in ‘somehow’ mode"], ["Тебя невозможно напугать дедлайном — ты с ним на «ты»", "Deadlines don't scare you — you're on first-name terms"], ["Сладкий(ая), простой(ая) и очень свой(своя)", "Sweet, simple and totally relatable"], ["Ночь — твоё время, утро — твой враг", "Night is your time; morning is your enemy"]],
      detailed: ["Ты — пакетик «3 в 1»: всё сразу, быстро и сладко. Ты не тратишь силы на идеальные планы, зато умеешь выкрутиться из любой ситуации в последний момент. Твоя жизнь — немного хаос, но уютный: недописанный диплом, любимый сериал, ночные разговоры и непоколебимая уверенность, что «всё как-нибудь будет». И что самое удивительное — обычно и правда бывает.\n\nПо шкалам у тебя вечерний хронотип, низкий режим и любовь к простому и сладкому. Это не лень, а особый стиль: гибкость и умение не накручивать себя. Зона роста — маленькие опоры: будильник, список на день и хотя бы иногда настоящий завтрак. Твой хаос от этого не исчезнет, но станет добрее к тебе.", "You're a 3-in-1 instant coffee sachet: everything at once, fast and sweet. You don't waste energy on perfect plans, but you can wriggle out of any situation at the last minute. Your life is a bit of chaos — the cozy kind: an unfinished thesis, a favorite show, late-night talks and unshakable faith that ‘it'll all work out somehow’. Amazingly, it usually does.\n\nOn our scales you have an evening chronotype, low routine and a love of the simple and sweet. That's not laziness; it's a style: flexibility and not overthinking. Growth zone: tiny anchors — an alarm, a daily list and, now and then, a real breakfast. Your chaos won't disappear, but it'll be kinder to you."],
      strengths: [["Гибкость", "Flexibility"], ["Стрессоустойчивость", "Stress resistance"], ["Простота и искренность", "Simplicity and sincerity"]],
      growth: [["Маленькие привычки", "Tiny habits"], ["Начинать дела до дедлайна", "Start before the deadline"]],
      funny: [["Твой завтрак: «3 в 1» и печенька, найденная в рюкзаке. Срок годности не проверяем", "Your breakfast: a 3-in-1 sachet and a cookie found in your backpack. We don't check expiry dates"], ["Ты начинаешь курсовую в 23:40 за день до сдачи и сдаёшь на «отлично». Вселенная в шоке", "You start the term paper at 11:40 pm the night before and get an A. The universe is shocked"], ["«Я встану в 7 и всё сделаю» — говоришь ты в 3 ночи с полной уверенностью", "‘I'll get up at 7 and do everything,’ you say at 3 a.m. with total confidence"], ["Друзья: «Как ты так живёшь?» Ты: «Не знаю, но мне нравится»", "Friends: ‘How do you live like this?’ You: ‘No idea, but I like it’"]],
      compat: ["coldbrew", "cocoa", "bubbletea"],
      img: "A cute instant coffee sachet character with a sleepy but happy grin, messy hair swirl, sitting on a stack of books with a tiny mug at midnight, little stars around, soft pastel caramel, cream and lilac tones, glossy flat-3D style, smooth lilac-to-caramel gradient background, minimal, no text" }
  ]
};

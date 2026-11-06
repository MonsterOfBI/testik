module.exports = {
  id: "dessert",
  emoji: "🍰",
  durationMin: 4,
  popularity: 4,
  spread: 1.5,
  title: ["Какой ты десерт?", "Which Dessert Are You?"],
  tagline: ["Тирамису, медовик или пончик? Узнай свой вкус характера", "Tiramisu, honey cake or donut? Find your flavor of personality"],
  description: [
    "15 жизненных ситуаций — от голосового в 23:47 до хаоса на рабочем столе — и мы подберём десерт, который звучит как ты. Тест вдохновлён исследованиями связи вкусовых предпочтений и черт личности, но это игра, а не диагноз.",
    "15 everyday situations — from an 11:47 pm voice message to your desk chaos — and we'll match you with the dessert that tastes like your personality. Inspired by research on taste preferences and personality traits, but it's a game, not a diagnosis."
  ],
  tags: [["еда", "food"], ["личность", "personality"], ["весёлые тесты", "fun quizzes"], ["десерты", "desserts"]],
  instructions: [
    "Отвечай быстро и честно — как поступил(а) бы на самом деле, а не как «правильно». В каждом вопросе выбери один вариант. Правильных ответов нет, калорий тоже.",
    "Answer quickly and honestly — what you'd actually do, not what sounds ‘right’. Pick one option per question. There are no wrong answers and zero calories."
  ],
  disclaimer: [
    "Развлекательный тест. Он вдохновлён научными работами о вкусе и личности, но не является валидированной методикой и ничего не диагностирует. Связи между любимой едой и характером в исследованиях слабые — относись к результату как к доброй метафоре.",
    "This is an entertainment quiz. It's inspired by scientific work on taste and personality but is not a validated instrument and diagnoses nothing. Links between favorite foods and personality in research are weak — treat your result as a friendly metaphor."
  ],
  resultIntro: ["Барабанная дробь… и щепотка сахарной пудры. Вот какой ты десерт:", "Drumroll… and a dusting of powdered sugar. Here's your dessert:"],
  scoringNotes: [
    "Каждый вариант ответа добавляет баллы к одной–трём шкалам: любопытство (O), аккуратность (C), яркость (E), мягкость (A) и чувствительность (N). В конце суммы приводятся к диапазону 0–1 по формуле (сумма − минимум) / (максимум − минимум), а затем выбирается десерт, чей профиль ближе всего к твоему (евклидово расстояние). Профили десертов откалиброваны так, чтобы при случайных ответах каждый выпадал примерно одинаково часто.",
    "Each answer adds points to one to three scales: curiosity (O), neatness (C), sparkle (E), softness (A) and sensitivity (N). At the end each sum is rescaled to 0–1 as (sum − min) / (max − min), and you get the dessert whose profile is closest to yours (Euclidean distance). Dessert profiles were calibrated so that, with random answers, each comes up about equally often."
  ],
  methodology: [
`## На чём основан тест

**Вкус и личность — реальная, хоть и скромная, область исследований.**

- **Сладкое и «сладкий характер».** В серии исследований Meier и коллег (2012, *Journal of Personality and Social Psychology*) люди, которые любят сладкое, в среднем описывали себя как более доброжелательных (agreeableness), а короткий опыт сладкого вкуса был связан с большей готовностью помогать. Но независимая попытка повторить это (Ashton и коллеги, 2014) показала связь заметно слабее: около r = 0,19 по самоотчёту и всего 0,06 по оценкам друзей.
- **Горькое и «колючие» черты.** Sagioglou и Greitemeyer (2016, *Appetite*, N = 953) нашли, что общая любовь к горькому слабо коррелирует (r ≈ 0,14–0,20) с повседневным садизмом и психопатическими чертами. При этом любовь к конкретным горьким продуктам (кофе, тоник, редис) была связана скорее с открытостью и экстраверсией. Мы сознательно не связываем горький шоколад с «тёмной» личностью — данные для этого слишком слабые.
- **Острое и поиск ощущений.** Byrnes и Hayes (2013, *Food Quality and Preference*, N = 97): склонность к поиску новых ощущений коррелировала с любовью к острым блюдам на уровне r = 0,50. Отсюда вопросы про шоколад с чили и «самый непроизносимый десерт».
- **Пищевая неофобия.** Шкала Pliner и Hobden (1992) измеряет нежелание пробовать новую еду; противоположный полюс — гастрономическое любопытство, близкое к открытости опыту.
- **Еда как утешение и принадлежность.** Troisi и Gabriel (2011, *Psychological Science*) показали, что «comfort food» может удовлетворять потребность в принадлежности — так появились медовик и бабушкина кухня.
- **Эмоциональная стабильность и благополучие.** Метаанализ Steel, Schmidt и Shultz (2008) подтвердил, что низкий нейротизм и экстраверсия — одни из самых сильных личностных коррелятов субъективного благополучия.

## Как работает тест

1. 15 ситуационных вопросов, по 5 вариантов. Вопросы оригинальные, написаны для testik.
2. Каждый ответ даёт баллы по пяти шкалам в духе «Большой пятёрки»: O — вкусовое любопытство, C — аккуратность, E — яркость, A — мягкость характера, N — чувствительность. Иногда ответ немного вычитает балл (например, «никогда не делюсь» снижает яркость).
3. Суммы нормируются к 0–1 и сравниваются с профилями 12 десертов; побеждает ближайший.
4. Профили откалиброваны на 120 000 симулированных случайных прохождений. Доля каждого исхода при случайных ответах:

{{DIST}}

Кроме того, мы проверили, что «персонаж», отвечающий в духе десерта, получает именно этот десерт.

## Ограничения

Это не валидированный психометрический инструмент: надёжность и валидность шкал не изучались, а реальные связи между вкусом и характером — маленькие (корреляции порядка 0,1–0,2, за редким исключением острой еды). Десерт — это метафора, чтобы поговорить о себе с улыбкой.`,
`## What this quiz is based on

**Taste and personality is a real — if modest — research area.**

- **Sweet tooth, sweet nature?** In a series of studies, Meier and colleagues (2012, *Journal of Personality and Social Psychology*) found that people who like sweet foods describe themselves as somewhat more agreeable, and a brief sweet taste was linked to more helping. An independent replication attempt (Ashton and colleagues, 2014) found a much weaker link: about r = .19 with self-reports and only .06 with friend ratings.
- **Bitter tastes and prickly traits.** Sagioglou & Greitemeyer (2016, *Appetite*, N = 953) found that a general liking for bitter tastes correlated weakly (r ≈ .14–.20) with everyday sadism and psychopathic traits — while liking specific bitter foods (coffee, tonic water, radishes) was related to openness and extraversion instead. We deliberately do *not* link dark chocolate to a ‘dark’ personality; the data are too weak for that.
- **Spicy food and sensation seeking.** Byrnes & Hayes (2013, *Food Quality and Preference*, N = 97): sensation seeking correlated r = .50 with liking spicy meals — hence the chili-chocolate and ‘unpronounceable dessert’ options.
- **Food neophobia.** Pliner & Hobden's (1992) scale measures reluctance to try new foods; its opposite pole, culinary curiosity, resembles Openness to Experience.
- **Comfort food and belonging.** Troisi & Gabriel (2011, *Psychological Science*) showed comfort foods can satisfy the need to belong — which is where honey cake and grandma's kitchen come in.
- **Emotional stability and well-being.** Steel, Schmidt & Shultz's (2008) meta-analysis confirmed that low neuroticism and extraversion are among the strongest personality correlates of subjective well-being.

## How the quiz works

1. 15 situational questions with 5 options each. All items are original, written for testik.
2. Each answer adds points on five Big-Five-flavored scales: O — taste curiosity, C — neatness, E — sparkle, A — softness, N — sensitivity. A few answers subtract a point (e.g., ‘I never share’ lowers sparkle).
3. Sums are rescaled to 0–1 and compared to 12 dessert profiles; the nearest one wins.
4. Profiles were calibrated on 120,000 simulated random runs. Share of each result under random answering:

{{DIST}}

We also checked that a ‘persona’ answering in the spirit of each dessert actually gets that dessert.

## Limitations

This is not a validated psychometric instrument: scale reliability and validity were not studied, and real taste–personality links are small (correlations around .1–.2, with spicy food as the notable exception). The dessert is a metaphor — a playful way to talk about yourself.`
  ],
  sources: [
    { citation: "Meier, B. P., Moeller, S. K., Riemer-Peltz, M., & Robinson, M. D. (2012). Sweet taste preferences and experiences predict prosocial inferences, personalities, and behaviors. Journal of Personality and Social Psychology, 102(1), 163–174.", doi: "10.1037/a0025253", url: "https://doi.org/10.1037/a0025253" },
    { citation: "Ashton, M. C., Pilkington, A. C., & Lee, K. (2014). Do prosocial people prefer sweet-tasting foods? An attempted replication of Meier, Moeller, Riemer-Peltz, and Robinson (2012). Journal of Research in Personality.", url: "https://forrt.org/flora-replication-atlas/doi/10.1037/a0025253/" },
    { citation: "Sagioglou, C., & Greitemeyer, T. (2016). Individual differences in bitter taste preferences are associated with antisocial personality traits. Appetite, 96, 299–308.", doi: "10.1016/j.appet.2015.09.031", url: "https://doi.org/10.1016/j.appet.2015.09.031" },
    { citation: "Byrnes, N. K., & Hayes, J. E. (2013). Personality factors predict spicy food liking and intake. Food Quality and Preference, 28(1), 213–221.", doi: "10.1016/j.foodqual.2012.09.008", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3607321/" },
    { citation: "Pliner, P., & Hobden, K. (1992). Development of a scale to measure the trait of food neophobia in humans. Appetite, 19(2), 105–120.", doi: "10.1016/0195-6663(92)90014-W" },
    { citation: "Troisi, J. D., & Gabriel, S. (2011). Chicken soup really is good for the soul: ‘Comfort food’ fulfills the need to belong. Psychological Science, 22(6), 747–753.", doi: "10.1177/0956797611407931" },
    { citation: "Steel, P., Schmidt, J., & Shultz, J. (2008). Refining the relationship between personality and subjective well-being. Psychological Bulletin, 134(1), 138–161.", doi: "10.1037/0033-2909.134.1.138" }
  ],
  license: "Original content © testik. All questions, outcomes and texts were written from scratch for this site; no items are copied or adapted from copyrighted questionnaires or quiz sites. Scientific papers are cited only as inspiration.",
  dims: [
    { id: "O", color: "#CDB4F6", name: ["Вкусовое любопытство", "Taste curiosity"],
      desc: ["Насколько тебя тянет к новому: вкусам, местам, идеям. Аналог открытости опыту.", "How strongly you're drawn to the new: flavors, places, ideas. Akin to Openness to Experience."],
      low: ["Верность классике", "Loyal to the classics"], high: ["Гастро-исследователь", "Flavor explorer"],
      bands: [
        [["Верность классике", "Loyal to the classics"], [["Знаешь, что любишь", "You know what you like"], ["Проверенное > модное", "Tried-and-true beats trendy"], ["Новое — дозированно", "New things in small doses"]], ["Ты ценишь предсказуемость и проверенные радости. Это экономит силы и нервы. Попробуй иногда «шаг в сторону» — один новый вкус в месяц, без обязательств.", "You value predictability and proven pleasures — it saves energy and nerves. Try a small ‘side step’ now and then: one new flavor a month, no commitment."]],
        [["Сбалансированный вкус", "Balanced palate"], [["Открыт(а) новому, если есть повод", "Open to new things with good reason"], ["Любишь и классику, и эксперименты", "Enjoy both classics and experiments"], ["Гибкий(ая) в выборе", "Flexible in your choices"]], ["Ты легко переключаешься между любимым и новым. Хорошая позиция: ты не застреваешь, но и не гонишься за каждой новинкой.", "You switch easily between favorites and novelties. A sweet spot: you don't get stuck, and you don't chase every new thing."]],
        [["Гастро-исследователь", "Flavor explorer"], [["Новое — твой витамин", "Novelty is your vitamin"], ["Пробуешь первым(ой)", "First to try"], ["Скука — главный враг", "Boredom is the enemy"]], ["Тебе важно открывать новое — во вкусе, хобби и идеях. Это питает креативность. Следи только, чтобы поиск нового не мешал доводить начатое до конца.", "Discovering new things — flavors, hobbies, ideas — fuels you and your creativity. Just make sure the hunt for novelty doesn't keep you from finishing what you start."]]
      ] },
    { id: "C", color: "#A8E6CF", name: ["Аккуратность", "Neatness & planning"],
      desc: ["Любовь к порядку, планам и рецептам «до грамма». Аналог добросовестности.", "Love of order, plans and recipes to the gram. Akin to Conscientiousness."],
      low: ["Творческий хаос", "Creative chaos"], high: ["Всё по рецепту", "By the recipe"],
      bands: [
        [["Творческий хаос", "Creative chaos"], [["Импровизация вместо плана", "Improvising over planning"], ["Гибкость и спонтанность", "Flexible and spontaneous"], ["Иногда теряешь ключи (и сроки)", "Sometimes lose keys (and deadlines)"]], ["Ты хорошо адаптируешься и не паникуешь, когда план рушится — плана ведь и не было. Пара простых привычек (напоминание, список на день) сделают твой хаос ещё продуктивнее.", "You adapt well and don't panic when plans fall apart — there wasn't one anyway. A couple of tiny habits (a reminder, a daily list) can make your chaos even more productive."]],
        [["Порядок по настроению", "Order when it matters"], [["План есть, но не догма", "Plans, but not dogma"], ["Собираешься, когда нужно", "Pull it together when needed"], ["Баланс свободы и структуры", "Balance of freedom and structure"]], ["Ты умеешь быть собранным(ой), когда это важно, и расслабленным(ой), когда можно. Это зрелый баланс.", "You get organized when it counts and relax when you can — a mature balance."]],
        [["Всё по рецепту", "By the recipe"], [["Планы, списки, граммы", "Plans, lists, grams"], ["Надёжность — твоё имя", "Reliability is your middle name"], ["Не любишь опоздания", "Lateness bugs you"]], ["На тебя можно положиться, и ты доводишь дела до конца. Не забывай: «готово» иногда лучше, чем «идеально», а отдых — тоже пункт плана.", "People can rely on you, and you finish what you start. Remember: ‘done’ sometimes beats ‘perfect’, and rest belongs on the plan too."]]
      ] },
    { id: "E", color: "#FFD3B6", name: ["Яркость", "Sparkle"],
      desc: ["Сколько энергии ты получаешь от людей и внимания. Аналог экстраверсии.", "How much energy you get from people and attention. Akin to Extraversion."],
      low: ["Тихий уют", "Quiet and cozy"], high: ["Душа праздника", "Life of the party"],
      bands: [
        [["Тихий уют", "Quiet and cozy"], [["Заряжаешься в тишине", "Recharge in quiet"], ["Мало, но близких", "Few but close friends"], ["Глубина > громкость", "Depth over volume"]], ["Тебе комфортно в небольших компаниях и наедине с собой. Это не застенчивость, а стиль восстановления сил. Предупреждай друзей, что тебе нужна пауза, — они поймут.", "You're comfortable in small groups and on your own. That's not shyness — it's how you recharge. Let friends know when you need a break; they'll get it."]],
        [["Гибкая общительность", "Flexible sociability"], [["Можешь и в тусовку, и в плед", "Party or blanket — both work"], ["Чувствуешь, когда хватит", "Know when you've had enough"], ["Легко подстраиваешься", "Adapt easily"]], ["Ты умеешь быть и в центре, и в сторонке — смотря по настроению. Такие люди часто лучше всего ладят с самыми разными характерами.", "You can be center stage or on the sidelines, depending on your mood. People like you often get along with the widest range of personalities."]],
        [["Душа праздника", "Life of the party"], [["Люди тебя заряжают", "People charge you up"], ["Легко знакомишься", "You make friends instantly"], ["Любишь внимание (и это ок)", "You enjoy attention (and that's fine)"]], ["Ты приносишь энергию в любую компанию. Не забывай, что не все заряжаются так же, — иногда лучший подарок интроверту — тишина.", "You bring energy to any room. Remember that not everyone charges the same way — sometimes the best gift for an introvert is quiet."]]
      ] },
    { id: "A", color: "#FFAAA5", name: ["Мягкость характера", "Softness"],
      desc: ["Теплота, забота и желание, чтобы всем было хорошо. Аналог доброжелательности.", "Warmth, care and wanting everyone to be okay. Akin to Agreeableness."],
      low: ["С перчинкой", "With a bite"], high: ["Мягкость и забота", "Soft and caring"],
      bands: [
        [["С перчинкой", "With a bite"], [["Говоришь прямо", "You speak plainly"], ["Честность важнее вежливости", "Honesty over niceness"], ["Отстаиваешь своё", "You stand your ground"]], ["Ты не боишься спорить и говорить правду. Это ценное качество, особенно в работе. Чуть больше мягкости в формулировках — и тебя будут слышать ещё лучше.", "You aren't afraid to disagree or tell the truth — a valuable trait, especially at work. A touch more softness in phrasing and people will hear you even better."]],
        [["Тёплый реалист", "Warm realist"], [["Добр(а), но не наивен(на)", "Kind but not naive"], ["Умеешь сказать «нет»", "Can say ‘no’"], ["Помогаешь с умом", "Help wisely"]], ["Ты заботишься о людях, но не в ущерб себе. Этот баланс защищает от выгорания и делает тебя надёжным другом.", "You care about people without sacrificing yourself. That balance protects you from burnout and makes you a dependable friend."]],
        [["Мягкость и забота", "Soft and caring"], [["Чувствуешь других", "You sense others' feelings"], ["Миротворец(ица)", "Natural peacemaker"], ["Угощаешь всех", "You feed everyone"]], ["Рядом с тобой людям тепло. Главное — помнить, что ты тоже заслуживаешь заботы, и иногда говорить «нет» без чувства вины.", "People feel warm around you. Just remember you deserve care too — and it's okay to say ‘no’ without guilt."]]
      ] },
    { id: "N", color: "#B5D8FA", name: ["Чувствительность", "Sensitivity"],
      desc: ["Насколько сильно ты переживаешь эмоции и тревоги. Аналог нейротизма (с обратной стороны — невозмутимость).", "How intensely you feel emotions and worries. Akin to Neuroticism (the flip side is calm)."],
      low: ["Невозмутимость", "Unbothered"], high: ["Тонкая натура", "Deep feeler"],
      bands: [
        [["Невозмутимость", "Unbothered"], [["Стресс отскакивает", "Stress bounces off"], ["Быстро восстанавливаешься", "Quick to bounce back"], ["Спокойствие заразительно", "Your calm is contagious"]], ["Ты редко накручиваешь себя, и это большой плюс для благополучия. Иногда стоит прислушаться к мелким тревогам — они бывают полезными сигналами.", "You rarely spiral — a big plus for well-being. Now and then, listen to small worries; sometimes they're useful signals."]],
        [["Живые эмоции", "Lively emotions"], [["Чувствуешь, но не тонешь", "Feel deeply without drowning"], ["Иногда переживаешь — и это нормально", "Worry sometimes — that's normal"], ["Умеешь успокоиться", "Know how to calm down"]], ["У тебя здоровый эмоциональный диапазон: ты реагируешь на жизнь, но умеешь возвращаться в равновесие.", "You have a healthy emotional range: you react to life but find your way back to balance."]],
        [["Тонкая натура", "Deep feeler"], [["Всё чувствуешь на 120%", "Feel everything at 120%"], ["Замечаешь нюансы", "Notice nuances"], ["Склонность к «а вдруг…»", "Prone to ‘what if…’"]], ["Твоя чувствительность — источник эмпатии и глубины. Чтобы она не превращалась в тревогу, помогают сон, движение и разговор с близкими. Если тревога мешает жить — это повод обратиться к специалисту.", "Your sensitivity fuels empathy and depth. Sleep, movement and talking to close people help keep it from turning into anxiety. If worry gets in the way of life, that's a good reason to see a professional."]]
      ] }
  ],
  questions: [
    { t: ["Ты заходишь в кондитерскую, а там 40 видов десертов. Твои действия?", "You walk into a pastry shop with 40 kinds of desserts. Your move?"], o: [
      [["Беру тот, что с самым непроизносимым названием", "Get the one with the most unpronounceable name"], { O: 3 }],
      [["Беру своё проверенное — не время для экспериментов", "Get my usual — this is no time for experiments"], { C: 2, O: -1 }],
      [["Болтаю с кондитером 10 минут и беру его любимый", "Chat with the baker for 10 minutes and get their favorite"], { E: 2, A: 1 }],
      [["Беру три разных, чтобы поделиться с друзьями", "Get three different ones to share with friends"], { A: 2, E: 1 }],
      [["Стою в ступоре 15 минут, а потом беру как в прошлый раз", "Freeze for 15 minutes, then get the same as last time"], { N: 2 }]
    ] },
    { t: ["Пятница, вечер, планов нет. Идеальный сценарий?", "Friday night, no plans. The ideal scenario?"], o: [
      [["Спонтанно собрать друзей и пойти куда глаза глядят", "Spontaneously round up friends and wander wherever"], { E: 2, O: 1, C: -1 }],
      [["Плед, сериал, доставка — и пусть весь мир подождёт", "Blanket, a show, takeout — the world can wait"], { E: -1, N: 1 }],
      [["Наконец разобрать шкаф и составить план на месяц", "Finally sort the closet and plan the month"], { C: 3 }],
      [["Позвать родных на чай с пирогом", "Invite family over for tea and pie"], { A: 2, C: 1 }],
      [["Сходить на странную лекцию про грибы и космос", "Go to a weird talk about mushrooms and space"], { O: 2, E: -1 }]
    ] },
    { t: ["Друг прислал голосовое на 4 минуты в 23:47. Ты…", "A friend sends a 4-minute voice message at 11:47 pm. You…"], o: [
      [["Слушаю на 2x и отвечаю голосовым на 6 минут", "Listen at 2x and reply with a 6-minute voice message"], { E: 2 }],
      [["Сразу переживаю: вдруг что-то случилось?", "Immediately worry: what if something happened?"], { N: 2, A: 1 }],
      [["Послушаю утром — у меня режим", "I'll listen in the morning — I have a sleep schedule"], { C: 2, N: -1 }],
      [["Перезваниваю — так быстрее и теплее", "Call back — it's faster and warmer"], { A: 2, E: 1 }],
      [["Отвечаю стикером. Это универсальный язык любви", "Reply with a sticker. It's the universal love language"], { N: -1, C: -1 }]
    ] },
    { t: ["Что ты скорее всего сфотографируешь на прогулке?", "What are you most likely to photograph on a walk?"], o: [
      [["Идеальную симметрию: плитку, окна, ровный ряд деревьев", "Perfect symmetry: tiles, windows, a neat row of trees"], { C: 2, O: 1 }],
      [["Закат, который «камера не передаёт»", "A sunset that ‘the camera just doesn't capture’"], { N: 1, O: 1 }],
      [["Всех друзей, даже тех, кто «не фоткай меня»", "All my friends, even the ‘don't take my picture’ ones"], { E: 2, A: 1 }],
      [["Странную вывеску или смешную надпись", "A weird sign or a funny piece of graffiti"], { O: 2, N: -1 }],
      [["Ничего — я живу моментом, а не галереей", "Nothing — I live in the moment, not in my camera roll"], { C: -1, N: -1 }]
    ] },
    { t: ["Тебе поручили организовать день рождения коллеги.", "You're put in charge of a coworker's birthday."], o: [
      [["Таблица, бюджет, тайминг и план Б — я в своей стихии", "Spreadsheet, budget, timeline, plan B — I'm in my element"], { C: 3 }],
      [["Шарики, музыка, тосты — и ведущий(ая), конечно, я", "Balloons, music, toasts — and I'm obviously the host"], { E: 3 }],
      [["Тихо узнаю, что именинник любит, и сделаю душевно", "Quietly find out what they love and make it heartfelt"], { A: 2, E: -1 }],
      [["Придумаю квест или вечеринку в стиле 80-х", "Plan a scavenger hunt or an ’80s theme party"], { O: 2, E: 1 }],
      [["Проверяю всё по пять раз и всё равно волнуюсь", "Check everything five times and still worry"], { N: 2, C: 1 }]
    ] },
    { t: ["В кафе тебе принесли не тот заказ.", "The café brings you the wrong order."], o: [
      [["Ем, что принесли, — может, это знак судьбы", "Eat it anyway — maybe it's fate"], { O: 1, A: 1, N: -1 }],
      [["Вежливо, но чётко прошу заменить", "Politely but clearly ask for a swap"], { C: 1, A: 1 }],
      [["Шучу с официантом — через минуту мы друзья", "Joke with the server — a minute later we're friends"], { E: 2, A: 1 }],
      [["Молча ем, а потом весь вечер думаю, что надо было сказать", "Eat in silence, then spend the evening rehearsing what I should've said"], { N: 2, E: -1 }],
      [["Говорю прямо: «Это не моё. Мне нужно моё. Сейчас»", "Say it straight: ‘This isn't mine. I need mine. Now.’"], { E: 1, A: -1 }]
    ] },
    { t: ["Какая суперспособность тебе ближе?", "Which superpower suits you best?"], o: [
      [["Телепортация — хочу побывать везде", "Teleportation — I want to go everywhere"], { O: 2, E: 1 }],
      [["Остановка времени — чтобы всё успеть идеально", "Freezing time — so I can get everything done perfectly"], { C: 2, N: 1 }],
      [["Читать мысли — чтобы понимать людей", "Mind-reading — to understand people"], { A: 1, N: 1, O: 1 }],
      [["Исцеление — чтобы всем было хорошо", "Healing — so everyone's okay"], { A: 3 }],
      [["Неуязвимость — пусть всё отскакивает", "Invulnerability — let everything bounce off"], { N: -1, E: 1 }]
    ] },
    { t: ["Твой идеальный отпуск?", "Your ideal vacation?"], o: [
      [["12 городов за 10 дней, маршрут расписан по минутам", "12 cities in 10 days, itinerary planned to the minute"], { C: 2, E: 1, O: 1 }],
      [["Домик у озера, книга и ни одного человека", "A cabin by a lake, a book and not a soul around"], { E: -2, N: -1 }],
      [["Страна, где я не знаю ни слова, и еда, которую не могу назвать", "A country where I don't speak a word and food I can't name"], { O: 3 }],
      [["Большая компания, дом у моря, разговоры до утра", "A big group, a beach house, talking till sunrise"], { E: 2, A: 1 }],
      [["К бабушке на дачу: малина, гамак, разговоры", "Grandma's country house: raspberries, a hammock, long talks"], { A: 2, O: -1 }]
    ] },
    { t: ["В общем чате начался спор. Ты…", "An argument breaks out in the group chat. You…"], o: [
      [["Привожу аргументы по пунктам, со ссылками", "Lay out my arguments point by point, with links"], { C: 2, A: -1 }],
      [["Кидаю самый смешной мем и разряжаю обстановку", "Drop the funniest meme and defuse it"], { E: 2, N: -1 }],
      [["Пишу «ребят, давайте не ссориться ❤️»", "Type ‘guys, let's not fight ❤️’"], { A: 2 }],
      [["Переживаю за всех и потом пишу каждому в личку: «ты как?»", "Worry about everyone, then DM each person: ‘you okay?’"], { N: 2, A: 1 }],
      [["Пишу «нет.» и выхожу из диалога", "Type ‘no.’ and leave the conversation"], { A: -1, C: 1 }]
    ] },
    { t: ["Как ты готовишь (если вообще)?", "How do you cook (if at all)?"], o: [
      [["Строго по рецепту, граммы на весах", "Strictly by the recipe, grams on a scale"], { C: 3 }],
      [["Импровизирую: «а что, если добавить сюда мисо?»", "Improvise: ‘what if I add miso to this?’"], { O: 2, C: -1 }],
      [["Готовлю на всех, чтобы точно хватило", "Cook for everyone, with plenty to spare"], { A: 2, E: 1 }],
      [["Готовлю, когда получится красиво для фото", "Cook when it'll look great in photos"], { E: 1, C: 1, O: 1 }],
      [["Моё фирменное блюдо — доставка за три клика", "My signature dish is delivery in three taps"], { C: -1, N: -1 }]
    ] },
    { t: ["Что тебя бесит больше всего?", "What annoys you the most?"], o: [
      [["Когда опаздывают", "People being late"], { C: 2 }],
      [["Скука и одно и то же", "Boredom and routine"], { O: 2, E: 1 }],
      [["Когда кого-то обижают", "When someone gets hurt"], { A: 2 }],
      [["Неопределённость — когда неясно, что будет", "Uncertainty — not knowing what's coming"], { N: 2, C: 1 }],
      [["Когда всё усложняют на ровном месте", "When people overcomplicate simple things"], { N: -1, C: -1 }]
    ] },
    { t: ["Тебе сделали неожиданный подарок. Реакция?", "Someone surprises you with a gift. Your reaction?"], o: [
      [["Визжу, обнимаю, выкладываю в сторис", "Squeal, hug, post it to my story"], { E: 3 }],
      [["Растрогался(лась) до слёз", "Moved to tears"], { N: 1, A: 2 }],
      [["Благодарю и сразу думаю, как отдарить равноценно", "Say thanks and immediately plan an equal gift back"], { C: 2, N: 1 }],
      [["Неловко, но очень приятно — скажу спасибо наедине", "Awkward but touched — I'll say thanks in private"], { E: -1, A: 1 }],
      [["Разглядываю: «А что это? Как работает? Откуда?»", "Inspect it: ‘What is it? How does it work? Where's it from?’"], { O: 2 }]
    ] },
    { t: ["Как выглядит твой рабочий стол?", "What does your desk look like?"], o: [
      [["Идеальный порядок, всё по линеечке", "Perfect order, everything lined up"], { C: 3 }],
      [["Творческий беспорядок, но я знаю, где что лежит", "Creative mess, but I know where everything is"], { C: -1, O: 1 }],
      [["Фото близких, открытки, подарки от друзей", "Photos of loved ones, cards, gifts from friends"], { A: 2 }],
      [["Чашки. Много чашек. Немного стыдно", "Mugs. Many mugs. Slightly ashamed"], { C: -2, N: 1 }],
      [["Минимализм: ноутбук — и всё", "Minimalism: a laptop and that's it"], { C: 1, E: -1, N: -1 }]
    ] },
    { t: ["Какой шоколад ты возьмёшь?", "Which chocolate do you reach for?"], o: [
      [["Горький 85% — чем горше, тем честнее", "85% dark — the more bitter, the more honest"], { O: 1, A: -1 }],
      [["Молочный — вкус детства", "Milk chocolate — the taste of childhood"], { A: 1, O: -1 }],
      [["С чили или морской солью", "With chili or sea salt"], { O: 2, E: 1 }],
      [["Белый, и я не обязан(а) это объяснять", "White, and I don't owe anyone an explanation"], { N: -1, C: -1 }],
      [["Ассорти из коробки — угадывать начинку", "A box of assorted — guessing the filling is the fun"], { E: 1, O: 1 }],
      [["С кофейной начинкой — сладко и горько, как жизнь", "Coffee-filled — sweet and bitter, just like life"], { N: 1, A: 1, O: 1 }]
    ] },
    { t: ["Твой девиз на сегодня?", "Your motto for today?"], o: [
      [["«Живём один раз — берём два десерта»", "‘You only live once — get two desserts’"], { E: 1, C: -1, N: -1 }],
      [["«Сначала дела, потом десерт»", "‘Work first, dessert later’"], { C: 2 }],
      [["«Главное — чтобы все были сыты и довольны»", "‘What matters is that everyone's fed and happy’"], { A: 2 }],
      [["«Всё сложно, но красиво»", "‘It's complicated, but beautiful’"], { N: 1, O: 1, E: -1 }],
      [["«А давайте попробуем что-нибудь новенькое»", "‘Let's try something new’"], { O: 2, E: 1 }]
    ] }
  ],
  outcomes: [
    { id: "tiramisu", emoji: "☕", z: { O: 0.5, C: -0.5, E: 0.5, A: 0.5, N: 1 },
      title: ["Тирамису — романтик с кофейной глубиной", "Tiramisu — a romantic with espresso depth"],
      summary: [["Чувствуешь всё на 120% — и в этом твоя магия", "You feel everything at 120% — that's your magic"], ["Под мягкостью — лёгкая горчинка иронии", "Under the softness: a hint of bitter irony"], ["Любишь разговоры по душам после полуночи", "You love heart-to-hearts after midnight"], ["Тебя хочется взбодрить — и ты взбадриваешь других", "People want to cheer you up — and you cheer them right back"]],
      detailed: ["«Tiramisù» по-итальянски — «взбодри меня». Очень про тебя: ты глубоко чувствуешь, замечаешь настроение людей и умеешь создавать атмосферу — свечи, плейлист, правильные слова. Мягкий маскарпоне сверху, крепкий эспрессо внутри: ты нежный(ая), но не приторный(ая), и у тебя всегда найдётся ироничный комментарий.\n\nВ исследованиях Meier и коллег любители сладкого в среднем чуть доброжелательнее, а Sagioglou и Greitemeyer нашли, что любовь к конкретным горьким продуктам вроде кофе связана скорее с открытостью. Эффекты крошечные, но метафора точная: в тебе сладость сочетается с глубиной. Твоя чувствительность — источник эмпатии. Главное — не забывать, что о поддержке можно просить прямо, а не только намёками и грустными песнями в сторис.", "‘Tiramisù’ means ‘pick me up’ in Italian. Very you: you feel deeply, read the room, and know how to set a mood — candles, the right playlist, the right words. Soft mascarpone on top, strong espresso inside: you're tender but never cloying, and always ready with an ironic remark.\n\nIn Meier and colleagues' studies, sweet lovers were slightly more agreeable on average, and Sagioglou & Greitemeyer found that liking specific bitter foods like coffee went with openness. The effects are tiny, but the metaphor fits: you blend sweetness with depth. Your sensitivity fuels empathy — just remember you can ask for support directly, not only through hints and sad songs on your story."],
      strengths: [["Глубокая эмпатия", "Deep empathy"], ["Романтичность и чувство атмосферы", "Romance and a sense of atmosphere"], ["Ирония, которая спасает вечер", "Irony that saves the evening"]],
      growth: [["Не тонуть в переживаниях — ставить им «таймер»", "Don't drown in feelings — give them a timer"], ["Просить о поддержке прямо", "Ask for support directly"]],
      funny: [["Ты в 2 часа ночи: «А вдруг мы все — персонажи чьего-то сна?» Друг: «Иди спать». Ты: «…а вдруг сон — тоже персонаж?»", "You at 2 a.m.: ‘What if we're all characters in someone's dream?’ Friend: ‘Go to sleep.’ You: ‘…what if sleep is also a character?’"], ["Мама: «Ты чего грустная?» Ты: «Я не грустная, я эстетически задумчивая»", "Mom: ‘Why so sad?’ You: ‘I'm not sad, I'm aesthetically pensive.’"], ["Плачешь на мультике про робота, на рекламе майонеза и немного — на прогнозе погоды", "You cry at the robot cartoon, the mayo commercial, and a little bit at the weather forecast"], ["Твой плейлист называется «для дождя», а за окном +27 и солнце", "Your playlist is called ‘rainy day vibes’, and it's 80°F and sunny outside"]],
      compat: ["napoleon", "medovik", "mochi"],
      img: "A cute tiramisu slice character with a dreamy expression holding a tiny espresso cup, cocoa-dusted top like a little beret, soft pastel beige and mocha tones, glossy flat-3D style, smooth peach-to-lavender gradient background, minimal, no text" },
    { id: "cheesecake", emoji: "🍰", z: { O: -0.5, C: 1, E: 0, A: 0.5, N: -0.5 },
      title: ["Чизкейк — надёжная классика", "Cheesecake — the reliable classic"],
      summary: [["Сказал(а) — сделал(а): на тебя можно положиться", "You say it, you do it — people count on you"], ["Не гонишься за трендами — ты сам(а) тренд уже лет двадцать", "You don't chase trends — you've been the trend for twenty years"], ["Спокойный(ая) и основательный(ая), как хороший чизкейк", "Calm and solid, like a proper slice"], ["Любишь, когда всё понятно и вовремя", "You like things clear and on time"]],
      detailed: ["Чизкейк не нуждается в рекламе: его любят все, и он всегда уместен. Как и ты. Ты основательный(ая), спокойный(ая) и последовательный(ая); у тебя есть «свои» места, «свои» люди и проверенные решения. Когда вокруг паника, ты просто делаешь то, что нужно.\n\nВ психологии это похоже на высокую добросовестность и эмоциональную стабильность — черты, которые стабильно связаны с успехом в учёбе, работе и даже здоровьем. Любовь к классике при этом — не «пищевая неофобия» (так Pliner и Hobden называли страх новой еды), а знание того, что работает. Но иногда полезно разрешить себе маленький эксперимент: ягодный соус вместо обычного — это не измена принципам.", "Cheesecake needs no advertising: everyone loves it and it fits every occasion. Same as you. You're grounded, calm and consistent; you have your places, your people and your proven solutions. When everyone panics, you just do what needs doing.\n\nIn psychology this looks like high conscientiousness and emotional stability — traits consistently linked to success at school, work and even health. Loving the classics isn't ‘food neophobia’ (Pliner & Hobden's term for fear of new foods); it's knowing what works. Still, the occasional small experiment is healthy: a berry topping instead of the usual isn't a betrayal of your principles."],
      strengths: [["Надёжность", "Reliability"], ["Спокойствие в кризис", "Calm in a crisis"], ["Умение доводить до конца", "Follow-through"]],
      growth: [["Пробовать новое маленькими шагами", "Try new things in small steps"], ["Разрешать себе неидеальность", "Allow yourself imperfection"]],
      funny: [["В ресторане 15 минут изучаешь меню и заказываешь то же, что в прошлый раз. И в позапрошлый", "At a restaurant you study the menu for 15 minutes, then order the same as last time. And the time before"], ["Друзья: «Давай спонтанно!» Ты: «Давайте. Во сколько и где спонтанно?»", "Friends: ‘Let's be spontaneous!’ You: ‘Sure. What time and where are we being spontaneous?’"], ["Бабушка тобой гордится, потому что ты «не то что некоторые»", "Grandma is proud of you because you're ‘not like some people’"], ["Твоя аватарка не менялась с 2016 года. А зачем, если она идеальна?", "Your profile picture hasn't changed since 2016. Why would it? It's perfect"]],
      compat: ["medovik", "pannacotta", "eclair"],
      img: "A cute cheesecake slice character with a calm confident smile holding a tiny planner, creamy vanilla body with a glossy strawberry topping, soft pastel colors, glossy flat-3D style, smooth mint-to-cream gradient background, minimal, no text" },
    { id: "macaron", emoji: "🌸", z: { O: 0.5, C: 1, E: 1, A: -0.5, N: 0 },
      title: ["Макарон — эстет-перфекционист", "Macaron — the aesthetic perfectionist"],
      summary: [["У тебя всё красиво: от заметок до тарелки", "Everything you touch looks good — from your notes app to your plate"], ["Знаешь цену идеальным мелочам (и количеству попыток)", "You know what perfect details cost — and how many attempts"], ["Яркий(ая) и заметный(ая), умеешь себя подать", "Bright, noticeable, great at presenting yourself"], ["Внутри — нежнее, чем кажется", "Softer inside than you look"]],
      detailed: ["Макарон — самый капризный десерт: чуть влажнее воздух или не так взбиты белки — и крышечка трескается. Ты тоже знаешь, что совершенство — в деталях. У тебя безупречный вкус, высокая планка и талант делать красиво: праздник, презентацию, фото, жизнь.\n\nПсихологически это сочетание добросовестности (стремление к качеству), открытости (эстетическая чувствительность) и экстраверсии (желание делиться прекрасным с миром). Подвох у перфекционизма один: он умеет красть радость. Помни — трещинка на макароне не портит вкус, а «готово» часто лучше, чем «идеально».", "Macarons are the divas of pastry: a bit too much humidity or under-whipped egg whites and the shells crack. You know perfection lives in the details too. You've got impeccable taste, high standards and a talent for making things beautiful: parties, presentations, photos, life.\n\nPsychologically it's a blend of conscientiousness (striving for quality), openness (aesthetic sensitivity) and extraversion (wanting to share beauty with the world). Perfectionism's one catch: it can steal your joy. Remember, a cracked shell doesn't ruin the flavor, and ‘done’ often beats ‘perfect’."],
      strengths: [["Вкус и стиль", "Taste and style"], ["Внимание к деталям", "Eye for detail"], ["Умение вдохновлять", "Inspiring others"]],
      growth: [["«Готово» лучше, чем «идеально»", "‘Done’ beats ‘perfect’"], ["Не прятать усталость за фильтром", "Don't hide tiredness behind a filter"]],
      funny: [["Еда остывает, пока ты ищешь правильный свет. Друзья уже доели. Зато фото — шедевр", "Your food gets cold while you hunt for the right light. Your friends are done eating. But the photo? Museum-worthy"], ["Переделываешь сторис шесть раз, потому что смайлик стоял «не по композиции»", "You re-post your story six times because an emoji was ‘off-composition’"], ["Мама: «Куда тебе столько подушек?» Ты: «Это не подушки, это цветовая палитра»", "Mom: ‘Why do you need so many pillows?’ You: ‘They're not pillows, they're a color palette’"], ["Заметки в телефоне рассортированы по цветам. Список покупок — тоже", "Your notes app is color-coded. So is your grocery list"]],
      compat: ["eclair", "tiramisu", "mochi"],
      img: "A stack of three cute macaron characters in pastel pink, pistachio and lavender, the top one holding a tiny camera, little sparkles around, soft pastel colors, glossy flat-3D style, smooth pink-to-lilac gradient background, minimal, no text" },
    { id: "eclair", emoji: "⚡", z: { O: 0, C: 0.5, E: 1, A: -1, N: -0.5 },
      title: ["Эклер — молния с характером", "Éclair — lightning with attitude"],
      summary: [["Быстро решаешь, быстро делаешь, красиво уходишь", "Quick to decide, quick to act, leaves with style"], ["Говоришь прямо — иногда прямее, чем ждали", "You say it straight — sometimes straighter than expected"], ["Заходишь в комнату — и все замечают", "You walk in, people notice"], ["Не терпишь «воды» ни в разговорах, ни в креме", "No fluff — in conversations or in custard"]],
      detailed: ["«Éclair» по-французски — «молния». По одной из версий, потому что его съедают за секунду. Ты тоже действуешь быстро: пока другие обсуждают, кто будет решать задачу, ты её уже решил(а). Уверенность, энергия и острый язык — твой фирменный набор, как шоколадная глазурь на заварном тесте.\n\nПо шкалам это высокая экстраверсия и уверенность плюс «перчинка» — чуть меньше уступчивости, чем у среднего человека. Это не злость, а ценность честности выше вежливой ваты. Кстати, исследования про «горький вкус — колючий характер» показывают лишь очень слабые связи, так что твоя прямота — не диагноз, а стиль. Чуть больше мягкости в формулировках — и тебя будут не только слушаться, но и обожать.", "‘Éclair’ means ‘lightning’ in French — supposedly because it's gone in a flash. You move fast too: while others debate who'll handle the task, you've already handled it. Confidence, energy and a sharp tongue are your signature combo, like chocolate glaze on choux pastry.\n\nOn our scales that's high extraversion and assertiveness plus a ‘bite’ — a little less accommodating than average. It's not meanness; you just value honesty over polite fluff. By the way, studies on ‘bitter taste, prickly personality’ show only very weak links, so your directness is a style, not a diagnosis. Add a touch of softness to your phrasing and people won't just follow you — they'll adore you."],
      strengths: [["Решительность", "Decisiveness"], ["Честность", "Honesty"], ["Продуктивность", "Getting things done"]],
      growth: [["Смягчать формулировки", "Soften your phrasing"], ["Давать другим время подумать", "Give others time to think"]],
      funny: [["Друг прислал голосовое на 5 минут. Твой ответ: «ок»", "A friend sends a 5-minute voice message. Your reply: ‘ok’"], ["Ты уже всё сделал(а), пока остальные решали, кто будет делать", "You finished the task while everyone was still deciding who'd do it"], ["Папа: «Давай обсудим». Ты: «Давай решим»", "Dad: ‘Let's talk it over.’ You: ‘Let's decide.’"], ["Ты ходишь так быстро, что друзья засчитывают прогулку с тобой как кардио", "You walk so fast your friends log walks with you as cardio"]],
      compat: ["macaron", "donut", "cheesecake"],
      img: "A cute chocolate éclair character with a confident smirk and a tiny lightning bolt floating above, glossy chocolate glaze, soft pastel caramel and cream tones, glossy flat-3D style, smooth butter-yellow to peach gradient background, minimal, no text" },
    { id: "medovik", emoji: "🍯", z: { O: -1, C: 0.5, E: 0, A: 1, N: 0 },
      title: ["Медовик — душа семейного застолья", "Medovik — the heart of the family table"],
      summary: [["Рядом с тобой тепло, как на бабушкиной кухне", "Being around you feels like grandma's kitchen"], ["Помнишь дни рождения, любимые блюда и кто с кем в ссоре", "You remember birthdays, favorite dishes, and who's not talking to whom"], ["Ценишь традиции и проверенные рецепты жизни", "You value traditions and tried-and-true life recipes"], ["Терпеливый(ая): лучшее пропитывается за ночь", "Patient: the best things soak overnight"]],
      detailed: ["Медовик — это много тонких коржей, мёд, сметанный крем и ночь терпения, пока всё пропитается. Ты такой же: заботливый(ая), терпеливый(ая) и бесконечно тёплый(ая). Ты тот человек, у которого всегда есть чай, плед и время выслушать. Традиции для тебя — не скука, а клей, который держит людей вместе.\n\nВ исследовании Troisi и Gabriel (2011) «утешительная еда» помогала людям чувствовать связь с близкими — во многом потому, что напоминала о семье и общих моментах. Ты и есть такая «comfort food» для окружающих. Только не забывай включать в список «своих» и себя: забота о других не должна оставлять тебя голодным(ой) — ни в прямом, ни в переносном смысле.", "Medovik (Russian honey cake) is many thin layers, honey, sour-cream frosting and a night of patience while everything soaks in. That's you: caring, patient and endlessly warm. You're the one who always has tea, a blanket and time to listen. Traditions aren't boring to you — they're the glue that holds people together.\n\nIn Troisi & Gabriel's (2011) research, comfort food helped people feel connected — largely because it reminded them of family and shared moments. You are that comfort food for the people around you. Just remember to count yourself among ‘your people’: caring for others shouldn't leave you hungry, literally or figuratively."],
      strengths: [["Забота", "Caring"], ["Верность", "Loyalty"], ["Умение объединять людей", "Bringing people together"]],
      growth: [["Заботиться и о себе тоже", "Care for yourself too"], ["Не бояться нового — вдруг понравится", "Don't fear the new — you might like it"]],
      funny: [["Друг: «Я не голоден». Ты уже ставишь вторую тарелку", "Friend: ‘I'm not hungry.’ You're already setting a second plate"], ["Ты знаешь весь лор семейного чата, рецепт оливье и кто из родни не ест лук", "You know the family chat lore, the holiday salad recipe, and which relative won't eat onions"], ["Твоё «я на минутку» к родителям длится 4 часа и заканчивается банкой варенья с собой", "Your ‘quick visit’ to your parents lasts four hours and ends with a jar of homemade jam to go"], ["Ты приносишь на работу пирожки «просто так», и коллеги тебя тайно боготворят", "You bring homemade pastries to work ‘just because’, and your coworkers secretly worship you"]],
      compat: ["cheesecake", "baklava", "tiramisu"],
      img: "A cute layered honey cake (medovik) slice character with rosy cheeks wearing a tiny knitted shawl, a little honey pot beside it, warm pastel honey and cream tones, glossy flat-3D style, smooth apricot-to-cream gradient background, minimal, no text" },
    { id: "icecream", emoji: "🍦", z: { O: 0.5, C: -0.5, E: 0, A: 0.5, N: -1 },
      title: ["Мороженое — человек-кайф", "Ice Cream — pure good vibes"],
      summary: [["Тебя сложно вывести из себя — таешь только от удовольствия", "Hard to rattle — you only melt from joy"], ["Живёшь моментом и радуешься мелочам", "You live in the moment and love small joys"], ["Лёгкий(ая) и добрый(ая): с тобой не надо напрягаться", "Easygoing and kind: zero pressure around you"], ["План? Какой план? Есть вафельный рожок", "Plan? What plan? There's a waffle cone"]],
      detailed: ["Мороженое — это лето, детство и «ещё один шарик». Ты приносишь в жизнь людей ту же лёгкость. Тебя не так просто выбить из колеи: пока другие накручивают себя, ты замечаешь, какое сегодня красивое небо. Ты добрый(ая), открытый(ая) новому и не любишь усложнять.\n\nВ психологии эмоциональная стабильность (низкий нейротизм) — один из самых надёжных предикторов удовлетворённости жизнью; это подтвердил, например, метаанализ Steel, Schmidt и Shultz (2008). Так что твой «режим пломбира» — реальный ресурс. Единственное — некоторые проблемы не тают сами по себе. Будильник на важные дела твоему кайфу не помешает.", "Ice cream is summer, childhood and ‘one more scoop’. You bring that same lightness to people's lives. You're hard to knock off balance: while others spiral, you notice how pretty the sky is today. You're kind, open to new things and allergic to overcomplicating.\n\nIn psychology, emotional stability (low neuroticism) is one of the most reliable predictors of life satisfaction — confirmed, for example, by Steel, Schmidt & Shultz's (2008) meta-analysis. So your ‘soft-serve mode’ is a genuine resource. Just one thing: some problems don't melt on their own. A reminder for the important stuff won't ruin your vibe."],
      strengths: [["Лёгкость", "Lightness"], ["Оптимизм", "Optimism"], ["Умение снимать напряжение", "Defusing tension"]],
      growth: [["Ставить напоминания на важное", "Set reminders for the important stuff"], ["Не отмахиваться от проблем, которые не тают сами", "Don't wave off problems that won't melt on their own"]],
      funny: [["Мир горит, дедлайны горят, ты: «Зато какое небо сегодня красивое»", "World's on fire, deadlines are on fire, you: ‘But look how pretty the sky is today’"], ["Ешь мороженое на улице в январе, и прохожие смотрят с уважением и тревогой", "You eat ice cream outside in January and passersby look at you with respect and concern"], ["Бабушка: «Надень шапку!» Ты: «Я внутренне тёплый(ая)»", "Grandma: ‘Put on a hat!’ You: ‘I'm warm on the inside’"], ["Твой статус: «не тревожусь, я в режиме пломбира»", "Your status: ‘not anxious, just in soft-serve mode’"]],
      compat: ["donut", "mochi", "brownie"],
      img: "A cute ice cream cone character with a relaxed happy smile, two scoops in strawberry and vanilla with rainbow sprinkles, tiny sunglasses on top, soft pastel colors, glossy flat-3D style, smooth sky-blue to pink gradient background, minimal, no text" },
    { id: "brownie", emoji: "🍫", z: { O: 0, C: -1, E: -0.5, A: 0.5, N: 0.5 },
      title: ["Брауни — уютный хаос", "Brownie — cozy chaos"],
      summary: [["Снаружи чуть помятый(ая), внутри — тёплый(ая) и тягучий(ая)", "A bit crumbly outside, warm and gooey inside"], ["Суперсила — уют из ничего: плед, чай, сериал", "Superpower: coziness from nothing — blanket, tea, a show"], ["План есть, но он в голове и меняется каждые 15 минут", "There's a plan — in your head, updated every 15 minutes"], ["Настроение — от молочного шоколада до 85%", "Moods range from milk chocolate to 85% dark"]],
      detailed: ["По одной из кулинарных легенд, брауни появился, когда кто-то забыл добавить в шоколадный кекс разрыхлитель. Получилась «ошибка», которую полюбил весь мир. Это очень про тебя: ты не идеально организован(а), зато с тобой тепло, честно и по-настоящему. Ты умеешь создавать уют и принимать людей такими, какие они есть.\n\nНизкая «аккуратность» в нашем тесте — это гибкость и спонтанность, а не лень. А чувствительность помогает тебе тонко ловить атмосферу и настроение других. Чтобы хаос не съедал силы, подойдут маленькие ритуалы: 5 минут уборки — это тоже подвиг. И если тревогу хочется заесть, иногда лучше её проговорить — с другом или с собой в заметках.", "One kitchen legend says brownies were born when someone forgot the baking powder in a chocolate cake. The ‘mistake’ the whole world fell in love with. Very you: not perfectly organized, but warm, honest and real. You create coziness and accept people as they are.\n\nLow ‘neatness’ in this quiz means flexibility and spontaneity, not laziness. And your sensitivity helps you pick up on atmosphere and other people's moods. To keep the chaos from draining you, try tiny rituals: five minutes of tidying counts as heroism. And when you want to eat your anxiety, sometimes it's better to talk it out — with a friend or with your notes app."],
      strengths: [["Тепло и принятие", "Warmth and acceptance"], ["Гибкость", "Flexibility"], ["Создаёшь безопасное пространство", "You create safe spaces"]],
      growth: [["Маленькие ритуалы порядка", "Tiny order rituals"], ["Проговаривать тревогу, а не заедать", "Talk worries out instead of snacking them away"]],
      funny: [["Твоя комната: «творческий беспорядок». Мама: «Это не творчество, это археология»", "Your room: ‘creative chaos.’ Mom: ‘That's not creativity, that's archaeology’"], ["47 открытых вкладок, 3 начатые книги и кружка, которая живёт на столе с прошлой недели", "47 open tabs, 3 half-read books and a mug that's lived on your desk since last week"], ["«Выхожу через 5 минут», — сказал(а) ты и залип(ла) в видео, как люди чистят ковры", "‘Leaving in 5,’ you said, before falling into a carpet-cleaning video rabbit hole"], ["Ты на вечеринке: на кухне, с котом хозяев, и вам обоим хорошо", "You at a party: in the kitchen with the host's cat, and you're both thriving"]],
      compat: ["icecream", "tiramisu", "baklava"],
      img: "A cute fudgy brownie square character wrapped in a tiny cozy blanket holding a steaming mug, crackly top with chocolate drizzle, soft pastel cocoa and cream tones, glossy flat-3D style, smooth lavender-to-peach gradient background, minimal, no text" },
    { id: "pannacotta", emoji: "🍮", z: { O: 0, C: 0.5, E: -1, A: 0, N: -1 },
      title: ["Панакота — спокойствие в чистом виде", "Panna Cotta — calm, distilled"],
      summary: [["Минимум суеты, максимум вкуса", "Minimal fuss, maximum flavor"], ["В кризис ты — тот самый ровный голос", "In a crisis, you're the steady voice"], ["Любишь тишину и качественные вещи", "You prefer quiet and quality"], ["Элегантный(ая) без усилий — просто так получилось", "Effortlessly elegant — it just happens"]],
      detailed: ["Панакота — это сливки, сахар, ваниль и желатин. Всего ничего, но именно поэтому её сложно сделать идеально. Ты такой(ая) же: простой(ая) снаружи и очень цельный(ая) внутри. Ты не любишь шум, лишние слова и драму; ты любишь хорошие книги, порядок в мыслях и людей, с которыми можно молчать.\n\nЭто сочетание интроверсии и эмоциональной стабильности. Важно: интроверсия — не застенчивость, а способ восстанавливать силы в тишине. Твоё спокойствие заразительно: рядом с тобой даже самые тревожные друзья выдыхают. Попробуй иногда говорить о своих чувствах вслух — людям важно знать, что у тебя внутри, а не только видеть безупречную гладь.", "Panna cotta is cream, sugar, vanilla and gelatin. Almost nothing — which is exactly why it's hard to make perfectly. You're the same: simple on the outside, remarkably whole on the inside. You dislike noise, extra words and drama; you love good books, tidy thoughts and people you can be quiet with.\n\nThat's introversion plus emotional stability. Key point: introversion isn't shyness — it's recharging through quiet. Your calm is contagious; even your most anxious friends exhale around you. Try sharing your feelings out loud sometimes — people want to know what's inside, not just see the flawless surface."],
      strengths: [["Самообладание", "Composure"], ["Вкус к простоте", "A taste for simplicity"], ["Умение слушать", "Listening well"]],
      growth: [["Говорить о чувствах вслух", "Say your feelings out loud"], ["Разрешать себе немного хаоса (и ягодного соуса)", "Allow a little chaos (and berry sauce)"]],
      funny: [["Все паникуют из-за дедлайна. Ты: «Ну, давайте по порядку». Все в шоке", "Everyone's panicking about the deadline. You: ‘Okay, let's go step by step.’ Everyone: shook"], ["Твои выходные: прогулка, книга, тишина. Друзья: «Ты в порядке?» Ты: «Лучше всех»", "Your weekend: a walk, a book, silence. Friends: ‘Are you okay?’ You: ‘Never better’"], ["Тебе пишут «СРОЧНО!!!», ты через час отвечаешь: «Добрый день. Что случилось?»", "Someone texts ‘URGENT!!!’ and an hour later you reply: ‘Good afternoon. What happened?’"], ["Твоя квартира как из каталога, а у друзей — «только переехали», хотя живут там пять лет", "Your apartment looks like a catalog; your friends' places look ‘just moved in’ after five years"]],
      compat: ["cheesecake", "napoleon", "mochi"],
      img: "A cute panna cotta character with a serene closed-eye smile, smooth white body with a glossy berry sauce cap and a mint leaf, soft pastel colors, glossy flat-3D style, smooth pale-blue to white gradient background, minimal, no text" },
    { id: "baklava", emoji: "🌰", z: { O: 0, C: -0.5, E: 1, A: 1, N: 0 },
      title: ["Пахлава — щедрость в сорок слоёв", "Baklava — generosity in forty layers"],
      summary: [["Тебя много — в лучшем смысле: эмоций, заботы, угощений", "You're a lot — in the best way: feelings, care, snacks"], ["Гостеприимство — твой второй язык", "Hospitality is your second language"], ["Обожаешь шумные компании и долгие застолья", "You love big groups and long dinners"], ["Если обнимать — то крепко", "If you hug, you hug for real"]],
      detailed: ["Пахлава — это десятки тончайших слоёв теста, орехи и сироп, которого никогда не бывает мало. Ты такой(ая) же щедрый(ая): ты любишь людей громко, кормишь обильно и радуешься искренне. Если ты зовёшь «на чай», лучше прийти голодным — будет три салата, горячее и десерты на выбор.\n\nЭто сочетание экстраверсии и доброжелательности — теплоты, которая направлена наружу. Meier и коллеги находили связь любви к сладкому с просоциальностью, но повторное исследование показало, что связь слабая. Так что твоя щедрость — не от сахара, а от характера. Одна подсказка: не все выражают любовь так же громко — иногда тихое «спасибо» значит не меньше, чем ответное застолье.", "Baklava is dozens of paper-thin pastry layers, nuts and syrup that's never too much. You're just as generous: you love people loudly, feed them abundantly and celebrate sincerely. If you invite someone ‘for tea’, they'd better arrive hungry — there'll be three salads, a main course and a dessert buffet.\n\nThat's extraversion plus agreeableness — warmth aimed outward. Meier and colleagues found a link between a sweet tooth and prosociality, but a replication found it weak. So your generosity comes from character, not sugar. One tip: not everyone shows love as loudly — sometimes a quiet ‘thank you’ means as much as a return feast."],
      strengths: [["Щедрость", "Generosity"], ["Энергия", "Energy"], ["Умение собрать людей", "Gathering people"]],
      growth: [["Не обижаться на тихую любовь других", "Don't take quieter love as less love"], ["Отдыхать от роли хозяина вечера", "Take breaks from being the host"]],
      funny: [["Зовёшь «на чай», а на столе три салата, горячее и десерты на выбор", "You invite people ‘for tea’ and there are three salads, a main course and a dessert buffet"], ["Гости уходят с контейнерами «на завтра», «на послезавтра» и «для мамы»", "Guests leave with containers ‘for tomorrow’, ‘for the day after’ and ‘for your mom’"], ["Твой смех слышно из соседней комнаты. И из соседнего подъезда", "People can hear your laugh from the next room. And the next building"], ["На «спасибо» ты отвечаешь: «Да ладно, ешь ещё»", "Your reply to ‘thank you’ is ‘oh stop, have some more’"]],
      compat: ["medovik", "donut", "brownie"],
      img: "A cute diamond-shaped baklava character with golden flaky layers and pistachio crumbs, arms open for a hug, honey drips sparkling like glitter, soft pastel gold and pistachio green tones, glossy flat-3D style, smooth warm peach-to-gold gradient background, minimal, no text" },
    { id: "mochi", emoji: "🍡", z: { O: 1, C: 0, E: -0.5, A: 0.5, N: 0 },
      title: ["Моти — любопытный исследователь", "Mochi — the curious explorer"],
      summary: [["Первым(ой) пробуешь новое: вкусы, хобби, страны", "First to try new things: flavors, hobbies, countries"], ["Мягкий(ая) снаружи, тягуче-упрямый(ая) внутри", "Soft outside, chewy and stubborn inside"], ["Тебе интересно, как всё устроено", "You want to know how everything works"], ["Тише других, но удивляешь больше всех", "Quieter than most, but the most surprising"]],
      detailed: ["Моти — японский десерт из клейкого риса: мягкий, тянущийся и с неожиданной начинкой — от пасты из бобов до мороженого. Ты такой(ая) же: внешне спокойный(ая) и милый(ая), а внутри — целая вселенная интересов. Ты первым(ой) пробуешь странные вкусы, гуглишь, как устроены медузы, и знаешь три факта про всё на свете.\n\nЭто высокая открытость опыту — черта, которая противоположна «пищевой неофобии» из шкалы Pliner и Hobden. А Byrnes и Hayes (2013) показали, что люди, склонные к поиску новых ощущений, заметно чаще любят острую и необычную еду (r = 0,50). Твоя смелость живёт на кончике языка. Только не забывай доводить до конца хотя бы часть из двенадцати хобби — и делиться находками: людям правда интересно.", "Mochi is a Japanese sweet made from glutinous rice: soft, stretchy and full of surprises — from red bean paste to ice cream. That's you: calm and sweet on the outside, a whole universe of interests inside. You're first to try weird flavors, you google how jellyfish work, and you know three facts about everything.\n\nThat's high openness to experience — the opposite of the ‘food neophobia’ measured by Pliner & Hobden's scale. And Byrnes & Hayes (2013) showed that sensation seekers are much more likely to love spicy and unusual food (r = .50). Your bravery lives on the tip of your tongue. Just remember to finish at least some of your twelve hobbies — and share your discoveries; people genuinely want to hear them."],
      strengths: [["Любознательность", "Curiosity"], ["Открытость", "Open-mindedness"], ["Оригинальность", "Originality"]],
      growth: [["Доводить увлечения до конца", "Finish what you start"], ["Делиться находками вслух", "Share your discoveries out loud"]],
      funny: [["Ты в магазине: «Чипсы со вкусом огурца и васаби? Беру две»", "You at the store: ‘Cucumber-wasabi chips? Taking two’"], ["У тебя 12 хобби: керамика, японский, ферментация и что-то, что ты гуглишь прямо сейчас", "You have 12 hobbies: pottery, Japanese, fermentation, and whatever you're googling right now"], ["Бабушка: «Что это за розовые пельмени?» Ты: «Это моти, бабуль». Бабушка: «Ну, пельмени»", "Grandma: ‘What are these pink dumplings?’ You: ‘Mochi, Grandma.’ Grandma: ‘So, dumplings’"], ["История браузера: «как устроены медузы», «почему сыр пахнет», «кимоно для кота купить»", "Browser history: ‘how do jellyfish work’, ‘why does cheese smell’, ‘kimono for cat buy’"]],
      compat: ["tiramisu", "icecream", "macaron"],
      img: "Three cute round mochi characters in pastel pink, matcha green and white, one with curious sparkly eyes holding a tiny magnifying glass, soft pastel colors, glossy flat-3D style, smooth mint-to-pink gradient background, minimal, no text" },
    { id: "donut", emoji: "🍩", z: { O: -0.5, C: -1, E: 1, A: 0, N: -0.5 },
      title: ["Пончик — праздник без повода", "Donut — a party for no reason"],
      summary: [["Простые радости — лучшие, и ты это знаешь", "Simple joys are the best — and you know it"], ["Душа компании: плана нет, зато есть настроение", "Life of the party: no plan, all vibes"], ["Не усложняешь там, где можно не усложнять", "You don't overcomplicate the simple"], ["С тобой даже очередь в поликлинике — тусовка", "Even a waiting room becomes a party with you"]],
      detailed: ["Пончик не притворяется сложным десертом: он круглый, с глазурью, с посыпкой — и всем от него хорошо. Ты такой(ая) же простой(ая) в лучшем смысле: открытый(ая), весёлый(ая), лёгкий(ая) на подъём. Тебе не нужен повод для праздника — повод это ты.\n\nВ психологии экстраверсия стабильно связана с позитивными эмоциями, а спонтанность (низкая «аккуратность») помогает легко соглашаться на приключения. Ты заряжаешь людей энергией и умеешь превратить скучный вторник в историю, которую будут пересказывать. Иногда стоит всё-таки заглядывать в календарь — и помнить, что не все заряжаются от людей так же, как ты.", "A donut doesn't pretend to be a complicated dessert: it's round, glazed, sprinkled — and it makes everyone happy. You're simple in the best way too: open, fun and always up for it. You don't need a reason to celebrate — you are the reason.\n\nIn psychology, extraversion is consistently linked to positive emotions, and spontaneity (low ‘neatness’) makes it easy to say yes to adventures. You energize people and can turn a boring Tuesday into a story people retell for years. Do glance at your calendar now and then — and remember not everyone recharges from people the way you do."],
      strengths: [["Харизма", "Charisma"], ["Лёгкость на подъём", "Always up for it"], ["Заразительное веселье", "Contagious fun"]],
      growth: [["Иногда заглядывать в календарь", "Check your calendar sometimes"], ["Давать интровертам паузу", "Give introverts a breather"]],
      funny: [["«Зайду на 5 минут» — и вот ты уже знаешь всех соседей, их собак и бывших", "‘Just popping in for 5 minutes’ — now you know all the neighbors, their dogs and their exes"], ["План на выходные: «Ну, посмотрим». Итог: три новых друга и шашлыки", "Weekend plan: ‘We'll see.’ Result: three new friends and a barbecue"], ["Ты отвечаешь стикерами быстрее, чем люди дописывают сообщение", "You reply with stickers faster than people can finish typing"], ["Мама: «Ты хоть что-нибудь планируешь?» Ты: «Да! Веселиться»", "Mom: ‘Do you ever plan anything?’ You: ‘Yes! Fun’"]],
      compat: ["icecream", "baklava", "eclair"],
      img: "A cute pink-glazed donut character with rainbow sprinkles, a big grin and a tiny party hat, confetti floating around, soft pastel colors, glossy flat-3D style, smooth bubblegum-pink to lemon gradient background, minimal, no text" },
    { id: "napoleon", emoji: "🎂", z: { O: 0.5, C: 0.5, E: -1, A: 0, N: 1 },
      title: ["Наполеон — сложносочинённая личность", "Napoleon Cake — a many-layered mind"],
      summary: [["В тебе столько слоёв, что ты сам(а) изучил(а) не все", "So many layers even you haven't explored them all"], ["Думаешь глубоко, иногда слишком: overthinking — твоё кардио", "You think deeply, sometimes too deeply: overthinking is your cardio"], ["Ценишь качество, детали и умные разговоры", "You value quality, detail and smart conversations"], ["Немногословен(на), но если заговорил(а) — заслушаешься", "Few words — but when you speak, people listen"]],
      detailed: ["Наполеон — легенда домашних кухонь: десятки слоёв слоёного теста, заварной крем и крошка сверху. Его нельзя сделать «на скорую руку», как и понять тебя за пять минут. Ты вдумчивый(ая), внимательный(ая) к деталям и очень честный(ая) с собой. У тебя богатый внутренний мир, и ты замечаешь то, мимо чего другие проходят.\n\nВ нашем тесте это интроверсия, открытость идеям, добросовестность и высокая чувствительность. Обратная сторона глубины — склонность прокручивать один разговор сорок раз. Помогает простое правило: если мысль ходит по кругу дольше получаса, её пора записать или обсудить с кем-то. И разрешай себе «достаточно хорошо» — даже у наполеона крошка сверху неровная, и в этом его шарм.", "Napoleon cake is a legend of home kitchens across Russia: dozens of puff-pastry layers, custard and crumbs on top. You can't make it in a hurry — and nobody understands you in five minutes either. You're thoughtful, detail-oriented and very honest with yourself. Your inner world is rich, and you notice what others walk past.\n\nIn this quiz that's introversion, openness to ideas, conscientiousness and high sensitivity. The flip side of depth is replaying one conversation forty times. A simple rule helps: if a thought loops for more than half an hour, write it down or talk it through. And let yourself be ‘good enough’ — even a Napoleon's crumb topping is uneven, and that's its charm."],
      strengths: [["Глубина мышления", "Depth of thought"], ["Внимание к деталям", "Attention to detail"], ["Честность с собой", "Self-honesty"]],
      growth: [["Не прокручивать разговор 40 раз", "Don't replay a conversation 40 times"], ["Разрешать себе «достаточно хорошо»", "Allow ‘good enough’"]],
      funny: [["Перед отправкой «ок»: перечитываешь трижды, убираешь точку, возвращаешь точку", "Before sending ‘ok’: reread it three times, delete the period, put the period back"], ["В 3 часа ночи вспоминаешь неловкую фразу из 2014-го и проживаешь её заново в 4K", "At 3 a.m. you remember an awkward thing you said in 2014 and relive it in 4K"], ["Ты приходишь за 20 минут и гуляешь вокруг, чтобы не прийти слишком рано", "You arrive 20 minutes early and circle the block so you're not too early"], ["У бабушкиного наполеона 18 коржей. У твоего внутреннего монолога — примерно столько же", "Grandma's Napoleon cake has 18 layers. Your inner monologue has about the same"]],
      compat: ["tiramisu", "pannacotta", "cheesecake"],
      img: "A cute tall layered Napoleon cake (mille-feuille) slice character with thoughtful eyes and tiny round glasses reading a mini book, flaky pastry layers and cream, powdered sugar on top, soft pastel cream and vanilla tones, glossy flat-3D style, smooth lilac-to-cream gradient background, minimal, no text" }
  ]
};

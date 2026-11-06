const { L, o, q } = require('./common');
const P = a => a.map(([ru, en]) => L(ru, en));
const oc = x => ({
  id: x.id, title: L(...x.title), emoji: x.emoji, profile: x.profile,
  summary: P(x.summary), detailed: L(...x.detailed), strengths: P(x.strengths), growth: P(x.growth),
  funnyExamples: P(x.funny), famous: P(x.famous), compatibleWith: x.compat, imagePrompt: x.image
});
const STYLE = 'soft pastel colors, glossy flat-3D style, smooth gradient background, cute chibi character, minimal, high detail, no text';

// Archetype -> scores (primary motivation 2, neighbouring motivation 1), after Mark & Pearson's four quadrants.
const S = {
  ruler: { stability: 2 }, caregiver: { stability: 2, belonging: 1 }, creator: { stability: 2, independence: 1 },
  everyman: { belonging: 2, stability: 1 }, lover: { belonging: 2 }, jester: { belonging: 2, mastery: 1 },
  magician: { mastery: 2, belonging: 1 }, hero: { mastery: 2 }, rebel: { mastery: 2, independence: 1 },
  explorer: { independence: 2, mastery: 1 }, sage: { independence: 2 }, innocent: { independence: 2, stability: 1 }
};
const a = (arch, ru, en) => o(ru, en, { ...S[arch] });

const questions = [
  q('q1', 'На тебя внезапно свалился миллион. Что делаешь первым делом?', 'A million suddenly lands in your lap. First move?', [
    a('jester', 'Закатываю вечеринку века — с фокусником, караоке и надувным фламинго', 'Throw the party of the century, with a magician, karaoke and an inflatable flamingo'),
    a('ruler', 'Нанимаю финансового советника и строю империю, шаг за шагом', 'Hire a financial adviser and build an empire, step by step'),
    a('sage', 'Иду учиться в лучший университет мира и собираю свою библиотеку', 'Enrol at the best university in the world and build my own library'),
    a('creator', 'Открываю мастерскую или студию — наконец-то можно творить без ограничений', 'Open a workshop or studio. Finally, creating without limits'),
    a('hero', 'Вкладываюсь в дело, которое изменит жизнь людей, и лично за него берусь', 'Invest in a cause that will change lives, and take it on personally'),
    a('lover', 'Устраиваю незабываемое путешествие для себя и любимого человека', 'Plan an unforgettable trip for me and the person I love')
  ]),
  q('q2', 'Ты попадаешь в фэнтези-мир. Кем ты там станешь?', 'You fall into a fantasy world. Who do you become?', [
    a('explorer', 'Картографом неизведанных земель', 'A mapmaker of uncharted lands'),
    a('caregiver', 'Целителем: все раненые — ко мне', 'A healer. All the wounded, this way'),
    a('rebel', 'Предводителем повстанцев против злого короля', 'Leader of the rebellion against the evil king'),
    a('everyman', 'Тем, кто держит уютную таверну, где все свои', 'The one who runs a cosy tavern where everyone is family'),
    a('magician', 'Волшебником, для которого невозможное — обычный вторник', 'A wizard for whom the impossible is just another Tuesday'),
    a('innocent', 'Жителем солнечной деревни, который верит, что добро победит', 'A villager in a sunny hamlet who believes good will win')
  ]),
  q('q3', 'Проект команды вот-вот провалится. Твоя реакция:', 'Your team\'s project is about to crash. Your reaction:', [
    a('hero', 'Это вызов! Беру самую сложную часть и вытаскиваю проект', 'Challenge accepted! I take the hardest part and pull the project through'),
    a('ruler', 'Беру управление на себя: роли, сроки, контроль. Без паники', 'Take control: roles, deadlines, check-ins. No panic'),
    a('jester', 'Разряжаю атмосферу шуткой — с улыбкой и думается лучше', 'Break the tension with a joke. People think better when they smile'),
    a('explorer', 'Предлагаю выбросить старый план и поискать совсем другой путь', 'Suggest scrapping the old plan and finding a completely different route'),
    a('caregiver', 'Слежу, чтобы никто не выгорел: чай, поддержка, «мы справимся»', 'Make sure nobody burns out: tea, support, "we\'ve got this"'),
    a('everyman', 'Засучиваю рукава вместе со всеми, без лишних речей', 'Roll up my sleeves with everyone else, no speeches')
  ]),
  q('q4', 'Какая книга могла бы выйти под твоим именем?', 'Which book could be published under your name?', [
    a('rebel', 'Манифест «Почему всё, что вам говорили, — неправда»', 'A manifesto: "Why everything you were told is wrong"'),
    a('innocent', 'Добрая сказка, которую будут читать детям на ночь', 'A kind fairy tale that parents will read at bedtime'),
    a('creator', 'Роман о мире, который я придумываю с детства', 'A novel about a world I have been inventing since childhood'),
    a('sage', 'Научпоп о том, как на самом деле устроен мир', 'Popular science about how the world really works'),
    a('magician', '«Как изменить жизнь за 30 дней» — и это реально работает', '"Change your life in 30 days", and it actually works'),
    a('lover', 'История любви, после которой все плачут в метро', 'A love story that makes everyone cry on the train')
  ]),
  q('q5', 'Идеальная суббота — это…', 'The perfect Saturday is…', [
    a('sage', 'Лекция, музей, документалка и пара часов с умной книгой', 'A lecture, a museum, a documentary and a couple of hours with a clever book'),
    a('lover', 'Поздний завтрак вдвоём, долгая прогулка и свидание', 'A late breakfast for two, a long walk and a date'),
    a('hero', 'Забег, соревнование или подъём на вершину', 'A race, a competition or climbing a summit'),
    a('creator', 'Весь день что-то мастерить, рисовать или писать', 'A whole day of making, drawing or writing something'),
    a('ruler', 'Закрыть все дела, а вечером — ужин в хорошем ресторане. Заслужено', 'Close every task, then dinner at a good restaurant. Well earned'),
    a('jester', 'Квест, настолки, стендап — чем смешнее, тем лучше', 'An escape room, board games, stand-up. The funnier the better')
  ]),
  q('q6', 'На улице кто-то роняет пакет, и апельсины раскатываются по тротуару.', 'Someone drops a bag and oranges roll all over the pavement.', [
    a('innocent', 'Улыбаюсь: апельсины, катящиеся по улице, — это же почти мультфильм!', 'Smile: oranges rolling down the street, it is practically a cartoon!'),
    a('caregiver', 'Бросаюсь помогать и заодно проверяю, всё ли с человеком в порядке', 'Rush to help and check that the person is okay'),
    a('everyman', 'Помогаю собрать — любой бы так сделал', 'Help pick them up. Anyone would'),
    a('rebel', 'Помогаю и ворчу: почему пакеты в магазинах до сих пор рвутся?!', 'Help, while grumbling: why do shop bags still tear?!'),
    a('magician', 'Собираю и говорю что-то такое, что человек уходит с улыбкой, будто это лучший момент его дня', 'Help and say something that makes them leave smiling, as if it was the best moment of their day'),
    a('explorer', 'Помогаю — и через минуту мы уже обсуждаем, где растут самые вкусные апельсины в мире', 'Help, and a minute later we are discussing where the tastiest oranges in the world grow')
  ]),
  q('q7', 'Что тебя бесит больше всего?', 'What annoys you most?', [
    a('everyman', 'Понты и снобизм', 'Showing off and snobbery'),
    a('explorer', 'Рутина и ощущение клетки', 'Routine and feeling caged'),
    a('ruler', 'Хаос и безответственность', 'Chaos and irresponsibility'),
    a('jester', 'Зануды, которые портят всё серьёзным лицом', 'Killjoys who ruin everything with a straight face'),
    a('caregiver', 'Когда обижают тех, кто слабее', 'When people pick on the vulnerable'),
    a('hero', 'Когда сдаются, даже не попробовав', 'When people give up without even trying')
  ]),
  q('q8', 'Какой комплимент сделает твой день?', 'Which compliment would make your day?', [
    a('magician', '«С тобой всё становится возможным»', '"With you, everything becomes possible"'),
    a('sage', '«Ты видишь самую суть вещей»', '"You see right to the heart of things"'),
    a('lover', '«Рядом с тобой я чувствую себя особенным человеком»', '"With you I feel truly special"'),
    a('innocent', '«С тобой мир кажется добрее»', '"The world feels kinder with you in it"'),
    a('rebel', '«Только у тебя хватило смелости сказать правду»', '"You were the only one brave enough to tell the truth"'),
    a('creator', '«Это так оригинально — ни у кого такого нет!»', '"That is so original, nobody has anything like it!"')
  ]),
  q('q9', 'На вечеринке ты…', 'At a party you are…', [
    a('ruler', 'Неофициальный организатор: точно знаю, когда выносить торт', 'The unofficial organiser who knows exactly when to bring out the cake'),
    a('jester', 'Центр смеха: тосты, конкурсы, мемы', 'The centre of laughter: toasts, games, memes'),
    a('hero', 'Выигрываю все конкурсы. Да, даже армрестлинг', 'Winning every game. Yes, even arm wrestling'),
    a('lover', 'Весь вечер в глубоком разговоре с одним особенным человеком', 'In a deep conversation with one special person all night'),
    a('sage', 'Ищу, с кем обсудить что-нибудь интересное — от чёрных дыр до смысла жизни', 'Looking for someone to discuss black holes or the meaning of life with'),
    a('creator', 'Отвечаю за плейлист, декор и фотозону', 'In charge of the playlist, decorations and photo corner')
  ]),
  q('q10', 'Мир на грани киношного апокалипсиса. Твоя роль в лагере выживших:', 'The world faces a movie-style apocalypse. Your role in the survivors\' camp:', [
    a('magician', 'Учёный, который найдёт противоядие', 'The scientist who will find the cure'),
    a('everyman', 'Тот, кто держит лагерь вместе: еда, костёр, байки', 'The one holding the camp together: food, campfire, stories'),
    a('explorer', 'Разведчик, который уходит за горизонт и возвращается с картой', 'The scout who goes over the horizon and comes back with a map'),
    a('caregiver', 'Медик, у которого всегда найдётся бинт и доброе слово', 'The medic who always has a bandage and a kind word'),
    a('innocent', 'Тот, кто верит, что всё будет хорошо, — и заражает этим остальных', 'The one who believes it will be okay, and makes everyone else believe it too'),
    a('rebel', 'Тот, кто первым сказал, что власти всё скрывают, — и оказался прав', 'The one who said first that the authorities were hiding something, and was right')
  ]),
  q('q11', 'Выбери девиз:', 'Pick a motto:', [
    a('hero', '«Где есть воля, там найдётся и путь»', '"Where there is a will, there is a way"'),
    a('caregiver', '«Помогай другим — и мир станет лучше»', '"Help others and the world gets better"'),
    a('explorer', '«Не сиди на месте — мир огромен»', '"Do not sit still, the world is huge"'),
    a('everyman', '«Мы все в одной лодке»', '"We are all in the same boat"'),
    a('ruler', '«Порядок — основа всего»', '"Order is the foundation of everything"'),
    a('jester', '«Живём один раз — так давайте веселиться»', '"You only live once, so let\'s have fun"')
  ]),
  q('q12', 'Твой стиль одежды ближе всего к…', 'Your style is closest to…', [
    a('sage', 'Удобно и практично — голова занята важным', 'Comfy and practical. My head is busy with important things'),
    a('rebel', 'Кожанка, ботинки — и пусть все косятся', 'Leather jacket, boots, and let them stare'),
    a('creator', 'Вещи, сделанные или переделанные своими руками', 'Things I made or customised myself'),
    a('innocent', 'Светлые цвета, кеды и улыбка', 'Light colours, sneakers and a smile'),
    a('lover', 'Красиво, мягко, чтобы хотелось обнять', 'Beautiful and soft, the kind that makes people want a hug'),
    a('magician', 'Что-то загадочное: необычные украшения, особый парфюм', 'Something mysterious: unusual jewellery, a signature scent')
  ]),
  q('q13', 'Коллега выдал твою идею за свою на общем собрании.', 'A colleague presented your idea as their own at a meeting.', [
    a('creator', 'Ладно, у меня их ещё сотня. Но самую лучшую теперь придержу', 'Fine, I have a hundred more. But I am keeping the best one to myself now'),
    a('hero', 'Иду к руководителю и восстанавливаю справедливость', 'Go to the manager and set things right'),
    a('jester', 'Шучу так, что все сразу понимают, чья это была идея', 'Make a joke that leaves everyone in no doubt whose idea it was'),
    a('sage', 'Разбираюсь, почему так вышло, и делаю выводы на будущее', 'Figure out why it happened and learn for the future'),
    a('lover', 'Мне обидно, и я честно об этом говорю — отношения важнее', 'I am hurt and I say so honestly. The relationship matters more'),
    a('ruler', 'Спокойно напоминаю, кто автор, и показываю переписку с датами', 'Calmly point out who the author is and show the dated emails')
  ]),
  q('q14', 'Что для тебя настоящий успех?', 'What does real success mean to you?', [
    a('rebel', 'Изменить систему, которая всех достала', 'Changing a system everyone is sick of'),
    a('innocent', 'Быть счастливым и жить в ладу с собой', 'Being happy and at peace with myself'),
    a('caregiver', 'Близким хорошо, и в этом есть моя заслуга', 'The people I love are doing well, partly thanks to me'),
    a('explorer', 'Увидеть мир и остаться свободным человеком', 'Seeing the world and staying free'),
    a('everyman', 'Хорошая жизнь, свои люди рядом, и никто не задирает нос', 'A good life, my people around me, and nobody acting superior'),
    a('magician', 'Воплотить мечту, в которую никто не верил', 'Making a dream come true that nobody believed in')
  ]),
  q('q15', 'В соседнем дворе собираются вырубить старый парк.', 'The old park next door is about to be cut down.', [
    a('everyman', 'Подписываю петицию и зову соседей — вместе мы сила', 'Sign the petition and get the neighbours involved. Together we are strong'),
    a('ruler', 'Собираю инициативную группу, пишу официальные письма, назначаю ответственных', 'Set up an action group, write official letters, assign responsibilities'),
    a('hero', 'Встаю перед бульдозером. Образно. Ну, почти', 'Stand in front of the bulldozer. Figuratively. Well, almost'),
    a('caregiver', 'Думаю о детях и пожилых, которые там гуляют, и иду их поддерживать', 'Think of the kids and older people who walk there, and go support them'),
    a('jester', 'Устраиваю в парке весёлый флешмоб, чтобы о нём узнал весь город', 'Organise a funny flash mob in the park so the whole city hears about it'),
    a('explorer', 'Иду фотографировать все тайные тропинки, пока они ещё есть', 'Go and photograph every secret path while they still exist')
  ]),
  q('q16', 'Если бы у тебя был тайный талант, это было бы…', 'If you had a secret talent, it would be…', [
    a('lover', 'Чувствовать без слов, что нужно человеку', 'Sensing what a person needs without a word'),
    a('magician', 'Угадывать желания и исполнять их', 'Guessing wishes and making them come true'),
    a('sage', 'Понимать, как всё устроено, с первого взгляда', 'Understanding how anything works at first glance'),
    a('rebel', 'Находить слабое место любой системы', 'Finding the weak spot in any system'),
    a('creator', 'Создавать красоту из ничего', 'Creating beauty out of nothing'),
    a('innocent', 'Видеть хорошее в каждом', 'Seeing the good in everyone')
  ])
];

// Theoretical positions on the motivation wheel (X: independence vs belonging; Y: mastery vs stability)
const pos = { ruler: [0, -1], caregiver: [-0.5, -0.87], everyman: [-0.87, -0.5], lover: [-1, 0], jester: [-0.87, 0.5], magician: [-0.5, 0.87], hero: [0, 1], rebel: [0.5, 0.87], explorer: [0.87, 0.5], sage: [1, 0], innocent: [0.87, -0.5], creator: [0.5, -0.87] };
const prof = id => { const [x, y] = pos[id]; const r = v => Math.round(v * 100) / 100; return { stability: r(0.5 - 0.4 * y), mastery: r(0.5 + 0.4 * y), belonging: r(0.5 - 0.4 * x), independence: r(0.5 + 0.4 * x) }; };

const outcomes = [
  oc({ id: 'hero', emoji: '🦸', title: ['Герой — тот, кто идёт первым', 'The Hero: first through the door'], profile: prof('hero'),
    summary: [['Видишь вызов — принимаешь вызов', 'You see a challenge, you take it'], ['Смелость и упорство', 'Courage and grit'], ['Защищаешь своих и доказываешь делом', 'You protect your people and prove it with action'], ['Мотив: мастерство и риск', 'Core drive: mastery and risk']],
    detailed: ['Ты — Герой: смелый, упорный и нацеленный на результат. Тебе важно доказать — себе и миру, — что трудности можно победить. Когда остальные говорят «это невозможно», у тебя загораются глаза.\n\nВ модели Марк и Пирсон Герой — центральный архетип квадранта «Риск и мастерство»: его ведёт желание оставить след в мире. Это не измеренная черта, а образ; по смыслу он ближе всего к ценностям достижения (по Шварцу) и к высокой добросовестности и напористой экстраверсии в «Большой пятёрке». Классический путь героя описал Джозеф Кэмпбелл в книге «Тысячеликий герой».\n\nТень Героя — высокомерие и выгорание: желание побеждать любой ценой и страх показаться слабым. Совет: не каждая битва твоя. Иногда самое смелое — попросить о помощи или признать, что можно отдохнуть.',
      'You are the Hero: brave, persistent and results-driven. You need to prove, to yourself and the world, that obstacles can be beaten. When others say "it\'s impossible", your eyes light up.\n\nIn Mark and Pearson\'s model the Hero is the core archetype of the "Risk & Mastery" quadrant: driven by the wish to leave a mark on the world. It is an image, not a measured trait; in meaning it sits closest to achievement values (in Schwartz\'s terms) and to high conscientiousness plus assertive extraversion in the Big Five. Joseph Campbell described the classic hero\'s journey in The Hero with a Thousand Faces.\n\nThe Hero\'s shadow is arrogance and burnout: winning at any cost and the fear of looking weak. Tip: not every battle is yours. Sometimes the bravest move is to ask for help, or to admit you are allowed to rest.'],
    strengths: [['Смелость', 'Courage'], ['Упорство', 'Persistence'], ['Ответственность', 'Responsibility'], ['Умение вести за собой', 'Leading by example']],
    growth: [['Просить о помощи', 'Asking for help'], ['Отдыхать без чувства вины', 'Resting without guilt']],
    funny: [['Тебе говорят: «Это не обязательно делать сегодня». Ты уже делаешь.', 'They say "this doesn\'t have to be done today". You are already doing it.'], ['Ты выбираешь самый сложный маршрут в походе, потому что «а зачем тогда идти?».', 'You pick the hardest hiking trail because "otherwise, why go?"'], ['Друг просит открыть банку. Ты воспринимаешь это как личную миссию.', 'A friend asks you to open a jar. You treat it as a personal mission.'], ['Твой фитнес-браслет устал раньше тебя.', 'Your fitness tracker got tired before you did.']],
    famous: [['Часто сравнивают с Гарри Поттером', 'Often compared to Harry Potter'], ['…с Мулан', '…Mulan'], ['…с Ильёй Муромцем', '…the Russian folk hero Ilya Muromets']],
    compat: ['caregiver', 'sage', 'magician'],
    image: `A cute chibi hero character in a flowing cape standing on a small hill with a glowing shield, sunrise behind, coral and gold palette, ${STYLE}` }),
  oc({ id: 'sage', emoji: '🦉', title: ['Мудрец — ходячая энциклопедия', 'The Sage: a walking encyclopedia'], profile: prof('sage'),
    summary: [['Ищешь истину, а не одобрение', 'You seek truth, not approval'], ['Сначала понять, потом действовать', 'Understand first, act second'], ['К тебе идут за советом', 'People come to you for advice'], ['Мотив: независимость и самореализация', 'Core drive: independence and fulfilment']],
    detailed: ['Ты — Мудрец: вдумчивый, любознательный и независимый в суждениях. Тебя ведёт желание понять, как всё устроено на самом деле. Ты читаешь инструкции, проверяешь источники и любишь вопросы, на которые нет простого ответа.\n\nУ Марк и Пирсон Мудрец входит в квадрант «Независимость и самореализация» — вместе с Искателем и Простодушным: все они ищут свой «рай», и для Мудреца это истина. По смыслу архетип ближе всего к интеллектуальной стороне открытости опыту и к ценности самостоятельности мышления (self-direction у Шварца).\n\nТень Мудреца — бесконечный анализ и холодность: можно знать всё о жизни и при этом забыть её прожить. Совет: делись знанием простыми словами и иногда действуй, не дочитав до последней страницы.',
      'You are the Sage: thoughtful, curious and independent-minded. You are driven by the need to understand how things really work. You read the manual, check the sources and love questions with no easy answer.\n\nFor Mark and Pearson the Sage belongs to the "Independence & Fulfilment" quadrant, alongside the Explorer and the Innocent: all three are searching for their own paradise, and for the Sage paradise is truth. In meaning the archetype is closest to the intellectual side of openness and to the value of independent thought (self-direction in Schwartz\'s model).\n\nThe Sage\'s shadow is endless analysis and coldness: you can know everything about life and forget to live it. Tip: share what you know in plain words, and sometimes act before reaching the last page.'],
    strengths: [['Аналитический ум', 'Analytical mind'], ['Объективность', 'Objectivity'], ['Любознательность', 'Curiosity'], ['Умение объяснять', 'Explaining clearly']],
    growth: [['Принимать решения без идеальной информации', 'Deciding without perfect information'], ['Слушать чувства, а не только аргументы', 'Hearing feelings, not just arguments']],
    funny: [['Ты споришь не ради победы, а ради истины. Но побеждать тоже приятно.', 'You argue for truth, not victory. Though winning is nice too.'], ['Фраза «ну это все знают» вызывает у тебя желание прислать три научные статьи.', '"Everybody knows that" makes you want to send three research papers.'], ['В твоём телефоне 2000 скриншотов «почитать потом».', 'Your phone holds 2,000 screenshots saved to "read later".'], ['Ты смотришь фильм и параллельно гуглишь, насколько он исторически точен.', 'You watch a film while googling how historically accurate it is.']],
    famous: [['Часто сравнивают с Гэндальфом', 'Often compared to Gandalf'], ['…с Шерлоком Холмсом', '…Sherlock Holmes'], ['…с Гермионой Грейнджер', '…Hermione Granger']],
    compat: ['explorer', 'creator', 'hero'],
    image: `A cute chibi sage with round glasses and a long scarf reading a glowing book under a starry sky, an owl on the shoulder, lavender and deep blue palette, ${STYLE}` }),
  oc({ id: 'explorer', emoji: '🧭', title: ['Искатель — рюкзак всегда собран', 'The Explorer: backpack always packed'], profile: prof('explorer'),
    summary: [['Свобода — главная ценность', 'Freedom comes first'], ['Новые места, люди, опыт', 'New places, people and experiences'], ['Скука для тебя страшнее риска', 'Boredom scares you more than risk'], ['Мотив: независимость (с привкусом риска)', 'Core drive: independence, with a dash of risk']],
    detailed: ['Ты — Искатель: свободолюбивый, любопытный и лёгкий на подъём. Тебе тесно в рамках, и ты постоянно ищешь новое — маршруты, идеи, впечатления, себя. Лучшая история в твоей жизни обычно начинается со слов «а давай свернём вот сюда».\n\nУ Марк и Пирсон Искатель живёт в квадранте «Независимость и самореализация», но соседствует с «Риском и мастерством» — отсюда тяга к приключениям. По смыслу архетип ближе всего к открытости опыту (особенно авантюрности) и к ценностям стимуляции и самостоятельности.\n\nТень Искателя — вечный побег: когда новое нужно уже не чтобы найти, а чтобы не останавливаться. Совет: свобода — это ещё и возможность выбрать что-то надолго. Найди одну «гавань», куда приятно возвращаться.',
      'You are the Explorer: freedom-loving, curious and always ready to go. Boxes feel too small, and you are constantly looking for something new: routes, ideas, experiences, yourself. The best stories of your life usually start with "let\'s turn down this road".\n\nIn Mark and Pearson\'s model the Explorer lives in the "Independence & Fulfilment" quadrant but borders on "Risk & Mastery", hence the taste for adventure. In meaning it is closest to openness (especially adventurousness) and to the values of stimulation and self-direction.\n\nThe Explorer\'s shadow is perpetual escape: seeking novelty not to find something, but to avoid stopping. Tip: freedom also means being able to choose something for the long run. Find one harbour that is nice to come back to.'],
    strengths: [['Смелость пробовать', 'Courage to try'], ['Адаптивность', 'Adaptability'], ['Независимость', 'Independence'], ['Широкий кругозор', 'Broad horizons']],
    growth: [['Доводить начатое', 'Finishing what you start'], ['Строить долгие связи', 'Building lasting bonds']],
    funny: [['Твоя фраза «я ненадолго» означает «вернусь через полгода с загаром и тремя новыми языками».', 'Your "I won\'t be long" means "back in six months with a tan and three new languages".'], ['Ты знаешь, где в незнакомом городе лучший кофе, уже через час после приезда.', 'An hour after arriving in a new city, you already know where the best coffee is.'], ['Навигатор: «Через 200 метров поверните направо». Ты: «А что там слева?»', 'Sat-nav: "In 200 metres, turn right." You: "But what\'s on the left?"'], ['Твой чемодан никогда до конца не разбирается. Смысл, если скоро снова ехать?', 'Your suitcase is never fully unpacked. What\'s the point if you are leaving again soon?']],
    famous: [['Часто сравнивают с Индианой Джонсом', 'Often compared to Indiana Jones'], ['…с Моаной', '…Moana'], ['…с Бильбо, когда он всё-таки вышел за дверь', '…Bilbo, once he finally stepped out the door']],
    compat: ['sage', 'rebel', 'jester'],
    image: `A cute chibi explorer with a big backpack, compass and map standing at a trailhead with mountains and a hot-air balloon behind, mint and peach palette, ${STYLE}` }),
  oc({ id: 'rebel', emoji: '⚡', title: ['Бунтарь — правила под вопросом', 'The Rebel: questioning the rules'], profile: prof('rebel'),
    summary: [['«Потому что так принято» — не аргумент', '"Because that\'s how it\'s done" is not an argument'], ['Говоришь то, что другие боятся сказать', 'You say what others are afraid to'], ['Ломаешь то, что не работает', 'You break what doesn\'t work'], ['Мотив: риск и мастерство (с привкусом свободы)', 'Core drive: risk and mastery, with a dash of freedom']],
    detailed: ['Ты — Бунтарь: смелый, независимый и принципиальный. Ты не веришь правилам на слово и всегда спрашиваешь «а зачем?». Когда что-то несправедливо или просто глупо, тебе физически трудно промолчать.\n\nУ Марк и Пирсон этот архетип называется Outlaw — «вне закона»; он входит в квадрант «Риск и мастерство» вместе с Героем и Магом, но соседствует со свободой. Это образ, а не диагноз: по смыслу он ближе к высокой открытости опыту, более низкой уступчивости (доброжелательности) и ценности стимуляции. Бунтарство часто двигает культуру вперёд — многие перемены начинались с людей, которые отказались «как все».\n\nТень Бунтаря — разрушение ради разрушения и протест против всего подряд, даже против хорошего. Совет: выбирай битвы. Сломать легко — гораздо круче предложить то, что будет работать лучше.',
      'You are the Rebel: bold, independent and principled. You never take rules on faith and always ask "but why?". When something is unfair or just plain silly, staying quiet is physically hard for you.\n\nMark and Pearson call this archetype the Outlaw; it belongs to the "Risk & Mastery" quadrant with the Hero and the Magician, but borders on freedom. It is an image, not a diagnosis: in meaning it sits closer to high openness, lower agreeableness and the value of stimulation. Rebellion often moves culture forward; plenty of change started with people who refused to "do it like everyone else".\n\nThe Rebel\'s shadow is destruction for its own sake, protesting against everything, even the good stuff. Tip: pick your battles. Breaking things is easy; proposing something that works better is far cooler.'],
    strengths: [['Смелость', 'Courage'], ['Честность', 'Honesty'], ['Свежий взгляд', 'Fresh perspective'], ['Независимость', 'Independence']],
    growth: [['Предлагать альтернативу, а не только критику', 'Offering alternatives, not just critique'], ['Видеть союзников, а не только систему', 'Seeing allies, not just the system']],
    funny: [['Табличка «Не трогать» для тебя звучит как приглашение.', 'A "Do not touch" sign sounds like an invitation to you.'], ['Ты споришь с GPS, с инструкцией к мебели и с бабушкой о том, сколько нужно есть.', 'You argue with the GPS, the furniture manual and your grandma about how much you should eat.'], ['Твой ответ на «все так делают»: «Ну и зря».', 'Your reply to "everyone does it": "Well, they shouldn\'t."'], ['Ты носишь чёрное не потому, что модно, а потому, что все носят бежевое.', 'You wear black not because it is trendy, but because everyone else wears beige.']],
    famous: [['Часто сравнивают с Робин Гудом', 'Often compared to Robin Hood'], ['…с капитаном Джеком Воробьём', '…Captain Jack Sparrow'], ['…с Пеппи Длинныйчулок', '…Pippi Longstocking']],
    compat: ['explorer', 'magician', 'jester'],
    image: `A cute chibi rebel with a leather jacket and a lightning bolt badge, skateboard under one arm, confident grin, lilac, black and electric-yellow accents, ${STYLE}` }),
  oc({ id: 'magician', emoji: '🔮', title: ['Маг — превращает идеи в чудо', 'The Magician: turning ideas into magic'], profile: prof('magician'),
    summary: [['Видишь, как всё может быть иначе', 'You see how things could be different'], ['Умеешь вдохновлять и менять людей', 'You inspire and transform people'], ['Харизма плюс интуиция', 'Charisma plus intuition'], ['Мотив: мастерство (с привкусом принадлежности)', 'Core drive: mastery, with a dash of belonging']],
    detailed: ['Ты — Маг: визионер, который превращает «а что если» в «смотрите, получилось». Ты чувствуешь людей, видишь скрытые связи и умеешь создавать моменты, после которых мир кажется немного другим. Рядом с тобой хочется верить в невозможное.\n\nУ Марк и Пирсон Маг входит в квадрант «Риск и мастерство», но его сила — в трансформации людей и ситуаций, поэтому он соседствует с принадлежностью. Это образ: по смыслу он ближе к сочетанию высокой открытости опыту и экстраверсии — воображению плюс влиянию на окружающих.\n\nТень Мага — манипуляция: когда умение влиять используется не ради чуда, а ради контроля. Совет: самая сильная магия — честная. Объясняй свои идеи прозрачно, и люди пойдут за тобой не из восхищения, а из доверия.',
      'You are the Magician: a visionary who turns "what if" into "look, it worked". You read people, see hidden connections and create moments that make the world feel slightly different afterwards. Around you, people want to believe in the impossible.\n\nFor Mark and Pearson the Magician belongs to "Risk & Mastery", but its power lies in transforming people and situations, so it borders on belonging. It is an image: in meaning it is closest to high openness combined with extraversion, imagination plus influence.\n\nThe Magician\'s shadow is manipulation, when the power to influence serves control rather than wonder. Tip: the strongest magic is honest. Explain your ideas transparently, and people will follow out of trust rather than awe.'],
    strengths: [['Видение', 'Vision'], ['Харизма', 'Charisma'], ['Интуиция', 'Intuition'], ['Умение вдохновлять', 'Inspiring others']],
    growth: [['Прозрачность намерений', 'Transparency of intentions'], ['Доводить чудеса до бытовых деталей', 'Seeing wonders through to the boring details']],
    funny: [['Ты приходишь на скучное совещание, и через десять минут все обсуждают твою идею, которая «изменит всё».', 'You walk into a dull meeting and ten minutes later everyone is discussing your idea that "will change everything".'], ['Друзья: «Как тебе вообще удалось его уговорить?» Ты: «Ну, просто поговорили».', 'Friends: "How did you get them to agree?" You: "We just talked."'], ['Ты даришь подарки, о которых человек мечтал, но никому не рассказывал.', 'You give people gifts they wanted but never mentioned to anyone.'], ['Твой плейлист «на удачу» реально работает. Ну, тебе так кажется.', 'Your "good luck" playlist really works. Or so you believe.']],
    famous: [['Часто сравнивают с Мэри Поппинс', 'Often compared to Mary Poppins'], ['…с доктором Стрэнджем', '…Doctor Strange'], ['…с Воландом из «Мастера и Маргариты» — в его самых обаятельных сценах', '…Woland from The Master and Margarita, in his most charming scenes']],
    compat: ['hero', 'lover', 'rebel'],
    image: `A cute chibi magician in a starry cloak holding a glowing crystal ball, sparkles turning into butterflies, deep violet and pink palette, ${STYLE}` }),
  oc({ id: 'lover', emoji: '💗', title: ['Романтик — живёт сердцем', 'The Lover: living from the heart'], profile: prof('lover'),
    summary: [['Близость и красота — твой кислород', 'Closeness and beauty are your oxygen'], ['Умеешь делать людей особенными', 'You make people feel special'], ['Чувства — не слабость, а сила', 'Feelings are strength, not weakness'], ['Мотив: принадлежность и радость', 'Core drive: belonging and enjoyment']],
    detailed: ['Ты — Романтик: тёплый, страстный и чуткий к красоте. Для тебя важны глубокие связи — с людьми, с местами, с музыкой, с моментом. Ты помнишь, какой чай любит друг, и умеешь превратить обычный вечер в событие.\n\nУ Марк и Пирсон этот архетип называется Lover и стоит в центре квадранта «Принадлежность и радость». Речь не только о романтической любви: это любовь к жизни, дружбе и эстетике. По смыслу он ближе всего к высокой доброжелательности и тёплой, эмоциональной стороне экстраверсии.\n\nТень Романтика — растворение в другом человеке и страх быть отвергнутым. Совет: самые крепкие отношения строятся, когда ты не забываешь о себе. Любить себя — не эгоизм, а фундамент.',
      'You are the Lover: warm, passionate and attuned to beauty. Deep connection matters most to you, with people, places, music and the moment. You remember how a friend likes their tea and can turn an ordinary evening into an occasion.\n\nIn Mark and Pearson\'s model the Lover stands at the centre of the "Belonging & Enjoyment" quadrant. It is not only about romance: it is love of life, friendship and beauty. In meaning it is closest to high agreeableness and to the warm, emotional side of extraversion.\n\nThe Lover\'s shadow is dissolving into another person and fearing rejection. Tip: the strongest relationships grow when you do not forget yourself. Loving yourself is not selfish; it is the foundation.'],
    strengths: [['Теплота', 'Warmth'], ['Эмпатия', 'Empathy'], ['Чувство прекрасного', 'Sense of beauty'], ['Преданность', 'Devotion']],
    growth: [['Сохранять себя в отношениях', 'Keeping yourself in relationships'], ['Спокойнее переносить отказы', 'Taking rejection more lightly']],
    funny: [['Ты плачешь на свадьбах. Даже на чужих. Даже в кино.', 'You cry at weddings. Even strangers\'. Even in films.'], ['Твой ответ на «как прошёл день?» начинается со слова «представь».', 'Your answer to "how was your day?" begins with "Imagine…".'], ['На твоём столе всегда стоят свечи. Даже если ты ешь пельмени.', 'There are always candles on your table. Even when you are eating instant noodles.'], ['Ты подписываешь открытки так долго, что почта успевает подорожать.', 'You take so long writing cards that postage goes up in the meantime.']],
    famous: [['Часто сравнивают с Ромео и Джульеттой', 'Often compared to Romeo and Juliet'], ['…с Элизабет Беннет', '…Elizabeth Bennet'], ['…с Амели', '…Amélie']],
    compat: ['caregiver', 'magician', 'innocent'],
    image: `A cute chibi character hugging a giant heart-shaped pillow surrounded by roses and floating hearts, rose pink and peach palette, ${STYLE}` }),
  oc({ id: 'jester', emoji: '🃏', title: ['Шут — король хорошего настроения', 'The Jester: ruler of good vibes'], profile: prof('jester'),
    summary: [['Юмор — твой способ любить мир', 'Humour is how you love the world'], ['Превращаешь неловкость в смех', 'You turn awkwardness into laughter'], ['Живёшь здесь и сейчас', 'You live in the here and now'], ['Мотив: принадлежность и радость (с привкусом риска)', 'Core drive: belonging and enjoyment, with a dash of risk']],
    detailed: ['Ты — Шут: весёлый, находчивый и бесстрашный в своём юморе. Ты умеешь разрядить любую обстановку, найти смешное в трудном и напомнить всем, что жизнь — не только дедлайны. После тебя людям легче.\n\nУ Марк и Пирсон Шут — архетип квадранта «Принадлежность и радость», соседствующий с риском: настоящая шутка — это всегда немного смелость. По смыслу он ближе всего к экстраверсии (её «весёлой» грани) и ценности гедонизма — умению наслаждаться жизнью. А ещё юмор в позитивной психологии считается одной из сильных сторон характера.\n\nТень Шута — шутить, чтобы не чувствовать: когда смех становится бронёй от серьёзных разговоров. Совет: позволяй себе и грустить при близких. Лучшие шутники — это люди, которые не боятся быть настоящими.',
      'You are the Jester: cheerful, quick-witted and fearless with your humour. You can defuse any situation, find the funny side of hard things and remind everyone that life is not just deadlines. People feel lighter after you.\n\nFor Mark and Pearson the Jester belongs to "Belonging & Enjoyment" and borders on risk: a real joke always takes a bit of nerve. In meaning it is closest to extraversion (its cheerful facet) and to the value of hedonism, the ability to enjoy life. Humour is also listed as a character strength in positive psychology.\n\nThe Jester\'s shadow is joking so as not to feel, when laughter becomes armour against serious talks. Tip: let yourself be sad in front of the people you trust. The best jokers are those who are not afraid to be real.'],
    strengths: [['Юмор', 'Humour'], ['Лёгкость', 'Lightness'], ['Находчивость', 'Quick wit'], ['Умение объединять', 'Bringing people together']],
    growth: [['Выдерживать серьёзные разговоры', 'Staying with serious conversations'], ['Помнить о последствиях', 'Remembering consequences']],
    funny: [['Ты шутишь на похоронах кактуса. И все смеются, даже кактус бы оценил.', 'You crack jokes at a cactus funeral. Everyone laughs; even the cactus would approve.'], ['Твой стикерпак в мессенджере больше, чем словарный запас некоторых людей.', 'Your sticker collection is bigger than some people\'s vocabulary.'], ['Учитель: «Тебе всё смешно?» Ты, честно: «Ну, не всё. Процентов девяносто».', 'Teacher: "You find everything funny?" You, honestly: "Not everything. About ninety per cent."'], ['На совещании ты говоришь одну фразу — и следующие пять минут никто не может работать.', 'One line from you in a meeting and nobody can work for the next five minutes.']],
    famous: [['Часто сравнивают с Карлсоном', 'Often compared to Karlsson-on-the-Roof'], ['…с Джинном из «Аладдина»', '…the Genie from Aladdin'], ['…с Тимоном и Пумбой', '…Timon and Pumbaa']],
    compat: ['everyman', 'explorer', 'rebel'],
    image: `A cute chibi jester in a colourful hat with bells juggling stars and confetti, big laughing smile, sunshine yellow, teal and pink palette, ${STYLE}` }),
  oc({ id: 'caregiver', emoji: '🫶', title: ['Заботливый — тёплый плед в человеческом обличье', 'The Caregiver: a warm blanket in human form'], profile: prof('caregiver'),
    summary: [['Помогать — твоя природа', 'Helping is your nature'], ['Замечаешь, когда кому-то плохо', 'You notice when someone is struggling'], ['Надёжная опора для близких', 'A steady support for loved ones'], ['Мотив: стабильность (с привкусом принадлежности)', 'Core drive: stability, with a dash of belonging']],
    detailed: ['Ты — Заботливый: добрый, внимательный и щедрый. Ты первым замечаешь, что кто-то загрустил, и последним уходишь, когда нужна помощь. Рядом с тобой людям безопасно — как под тёплым пледом с какао.\n\nУ Марк и Пирсон Заботливый входит в квадрант «Стабильность и контроль»: его мотив — защищать и поддерживать, создавать мир, где о людях заботятся. Это один из немногих архетипов, для которого есть исследовательские подсказки: в работе Фабер и Майера (Faber & Mayer, 2009) люди, которым близки «заботливые» образы в кино и музыке, описывали себя как более доброжелательных. Ценностный аналог — благожелательность (benevolence) у Шварца.\n\nТень Заботливого — самопожертвование и выгорание, а иногда — гиперопека. Совет: надевай кислородную маску сначала на себя. Твоя забота ценна, только если у тебя остаются силы.',
      'You are the Caregiver: kind, attentive and generous. You are the first to notice someone is down and the last to leave when help is needed. People feel safe around you, like being under a warm blanket with cocoa.\n\nIn Mark and Pearson\'s model the Caregiver belongs to the "Stability & Control" quadrant: its drive is to protect and support, to build a world where people are looked after. It is one of the few archetypes with some research hints: in Faber and Mayer\'s (2009) study, people who resonated with caregiver figures in films and music described themselves as more agreeable. The values counterpart is benevolence in Schwartz\'s model.\n\nThe Caregiver\'s shadow is self-sacrifice and burnout, and sometimes smothering. Tip: put on your own oxygen mask first. Your care is only sustainable if you have energy left.'],
    strengths: [['Доброта', 'Kindness'], ['Внимательность', 'Attentiveness'], ['Надёжность', 'Reliability'], ['Терпение', 'Patience']],
    growth: [['Говорить «нет»', 'Saying no'], ['Принимать заботу от других', 'Accepting care from others']],
    funny: [['У тебя в сумке пластыри, таблетки от головы, влажные салфетки и конфета. На всякий случай для всех.', 'Your bag holds plasters, painkillers, wet wipes and a sweet. For everyone, just in case.'], ['Тебя спрашивают «как ты?», и ты отвечаешь «а ты как?». Сработало, вопрос закрыт.', 'Asked "how are you?", you reply "how are YOU?". It works; topic closed.'], ['Ты кормишь всех гостей так, будто они пришли из голодного похода.', 'You feed guests as if they just returned from a starvation trek.'], ['Ты пишешь «напиши, как доедешь» даже курьеру.', 'You text "let me know you got home safe" even to the delivery driver.']],
    famous: [['Часто сравнивают с Сэмом Гэмджи', 'Often compared to Samwise Gamgee'], ['…с Бэймаксом', '…Baymax'], ['…с Молли Уизли', '…Molly Weasley']],
    compat: ['lover', 'everyman', 'hero'],
    image: `A cute chibi caregiver wrapping a small friend in a cozy blanket, holding a steaming mug, little hearts and stars around, soft pink and cream palette, ${STYLE}` }),
  oc({ id: 'ruler', emoji: '👑', title: ['Правитель — всё под контролем', 'The Ruler: everything under control'], profile: prof('ruler'),
    summary: [['Порядок, ответственность и стратегия', 'Order, responsibility and strategy'], ['Естественно берёшь управление на себя', 'You naturally take charge'], ['Строишь системы, которые работают', 'You build systems that work'], ['Мотив: стабильность и контроль', 'Core drive: stability and control']],
    detailed: ['Ты — Правитель: организованный, уверенный и ответственный. Ты видишь, как должна работать система, и умеешь её выстроить — будь то семейный бюджет, школьный проект или целая компания. Когда начинается хаос, все почему-то смотрят на тебя.\n\nУ Марк и Пирсон Правитель — центральный архетип квадранта «Стабильность и контроль»: его мотив — создать порядок и процветание. По смыслу он ближе всего к высокой добросовестности, напористой экстраверсии и ценностям власти и безопасности у Шварца — в хорошем смысле: ответственности за результат.\n\nТень Правителя — тотальный контроль: когда порядок становится важнее людей. Совет: лучшие лидеры делегируют. Позволь другим делать по-своему — система станет только крепче.',
      'You are the Ruler: organised, confident and responsible. You can see how a system should work and know how to build it, whether it is a family budget, a school project or a whole company. When chaos strikes, everyone somehow looks to you.\n\nFor Mark and Pearson the Ruler is the core archetype of "Stability & Control": its drive is to create order and prosperity. In meaning it is closest to high conscientiousness, assertive extraversion and Schwartz\'s power and security values, in the good sense of owning the outcome.\n\nThe Ruler\'s shadow is total control, when order matters more than people. Tip: the best leaders delegate. Let others do things their way and the system will only get stronger.'],
    strengths: [['Лидерство', 'Leadership'], ['Организованность', 'Organisation'], ['Стратегическое мышление', 'Strategic thinking'], ['Ответственность', 'Accountability']],
    growth: [['Делегировать и доверять', 'Delegating and trusting'], ['Терпимость к хаосу и импровизации', 'Tolerating chaos and improvisation']],
    funny: [['У тебя есть таблица для планирования таблиц.', 'You have a spreadsheet for planning your spreadsheets.'], ['Ты спокойно «предлагаешь» друзьям план отпуска с почасовым расписанием и бюджетом.', 'You casually "suggest" a holiday plan to friends, with an hourly schedule and a budget.'], ['В семейном чате ты — неофициальный администратор, даже если формально им не являешься.', 'In the family chat you are the unofficial admin, even if you technically are not.'], ['Фраза «как-нибудь само решится» звучит для тебя как фильм ужасов.', '"It\'ll sort itself out" sounds like a horror film to you.']],
    famous: [['Часто сравнивают с Муфасой', 'Often compared to Mufasa'], ['…с Дейенерис Таргариен (в мирное время)', '…Daenerys Targaryen (in peacetime)'], ['…с Мирандой Пристли — только подобрее', '…a kinder Miranda Priestly']],
    compat: ['caregiver', 'creator', 'sage'],
    image: `A cute chibi ruler with a small golden crown sitting on a cushy throne, holding a neat clipboard, a tiny castle in the background, royal blue and gold palette, ${STYLE}` }),
  oc({ id: 'creator', emoji: '🎨', title: ['Творец — создаёт то, чего ещё нет', 'The Creator: making what doesn\'t exist yet'], profile: prof('creator'),
    summary: [['Воображение плюс мастерство', 'Imagination plus craft'], ['Тебе важно выразить себя', 'Self-expression matters to you'], ['Делаешь вещи, которые остаются', 'You make things that last'], ['Мотив: стабильность (с привкусом свободы)', 'Core drive: stability, with a dash of freedom']],
    detailed: ['Ты — Творец: изобретательный, увлечённый и стремящийся к качеству. Тебе мало потреблять — тебе нужно создавать: рисунки, тексты, проекты, рецепты, системы. Идеальный день — это день, когда из ничего появилось что-то настоящее.\n\nУ Марк и Пирсон Творец относится к квадранту «Стабильность и контроль»: он хочет создать нечто прочное и ценное, придать форму своему видению. Свобода и самовыражение для него тоже важны — поэтому он соседствует с независимостью. По смыслу архетип ближе всего к открытости опыту (воображению и эстетике) и ценности самостоятельности.\n\nТень Творца — перфекционизм и вечные черновики: «ещё не готово» может длиться годами. Совет: выпускай работы в мир несовершенными. Готовое лучше идеального — тем более что идеального не бывает.',
      'You are the Creator: inventive, passionate and committed to quality. Consuming is not enough; you need to make things: drawings, texts, projects, recipes, systems. A perfect day is one where something real appeared out of nothing.\n\nFor Mark and Pearson the Creator belongs to "Stability & Control": it wants to build something lasting and valuable, to give form to a vision. Freedom and self-expression matter too, so it borders on independence. In meaning it is closest to openness (imagination and aesthetics) and to the value of self-direction.\n\nThe Creator\'s shadow is perfectionism and endless drafts: "not ready yet" can last for years. Tip: release your work into the world imperfect. Done beats perfect, especially since perfect does not exist.'],
    strengths: [['Креативность', 'Creativity'], ['Мастерство', 'Craftsmanship'], ['Оригинальность', 'Originality'], ['Увлечённость', 'Passion']],
    growth: [['Заканчивать и показывать работы', 'Finishing and sharing your work'], ['Спокойнее относиться к критике', 'Taking criticism more calmly']],
    funny: [['В твоей папке «Проекты» 47 папок, и в каждой лежит «финал_v12_точно_последний».', 'Your Projects folder has 47 subfolders, each with "final_v12_really_last".'], ['Ты не можешь просто купить подарок — его обязательно нужно сделать своими руками.', 'You cannot just buy a gift; you have to make it by hand.'], ['Друзья просят: «Нарисуй что-нибудь простое». Через три часа ты всё ещё рисуешь.', 'Friends ask: "Draw something simple." Three hours later you are still drawing.'], ['Ты переставляешь мебель чаще, чем другие меняют обои на телефоне.', 'You rearrange furniture more often than others change their phone wallpaper.']],
    famous: [['Часто сравнивают с Вилли Вонкой', 'Often compared to Willy Wonka'], ['…с Тони Старком в мастерской', '…Tony Stark in his workshop'], ['…с Левшой, подковавшим блоху', '…Lefty, the Russian craftsman who shod a flea']],
    compat: ['sage', 'ruler', 'innocent'],
    image: `A cute chibi creator with a paint-splattered apron holding a brush, surrounded by floating colourful shapes and a half-finished canvas, pastel rainbow palette, ${STYLE}` }),
  oc({ id: 'innocent', emoji: '🌼', title: ['Простодушный — солнечный оптимист', 'The Innocent: sunshine optimist'], profile: prof('innocent'),
    summary: [['Веришь в хорошее — и находишь его', 'You believe in good, and you find it'], ['Простые радости — лучшие', 'Simple joys are the best'], ['Искренность без масок', 'Sincerity without masks'], ['Мотив: независимость и поиск счастья (с привкусом стабильности)', 'Core drive: fulfilment and happiness, with a dash of stability']],
    detailed: ['Ты — Простодушный (у Марк и Пирсон — Innocent): светлый, искренний и оптимистичный. Ты умеешь радоваться солнцу, вкусному завтраку и хорошей новости друга так, будто это лучшее событие в мире. Ты веришь в людей — и люди часто оправдывают это доверие.\n\nВ модели Марк и Пирсон Простодушный входит в квадрант «Независимость и самореализация» — он ищет свой «рай»: простую, честную и счастливую жизнь — и соседствует со стабильностью и безопасностью. По смыслу архетип ближе к доброжелательности, эмоциональной устойчивости и надежде — одной из сильных сторон характера, которая в исследованиях позитивной психологии теснее всего связана с удовлетворённостью жизнью.\n\nТень Простодушного — наивность и отрицание проблем: «не буду об этом думать, и оно пройдёт». Совет: оптимизм работает лучше всего вместе с реализмом. Можно верить в хорошее и при этом проверять договор перед подписью.',
      'You are the Innocent: bright, sincere and optimistic. You can celebrate sunshine, a good breakfast or a friend\'s good news as if it were the best thing in the world. You believe in people, and people often live up to that trust.\n\nIn Mark and Pearson\'s model the Innocent belongs to the "Independence & Fulfilment" quadrant, searching for its own paradise, a simple, honest, happy life, and it borders on stability and safety. In meaning the archetype is closest to agreeableness, emotional stability and hope, one of the character strengths most closely linked to life satisfaction in positive psychology research.\n\nThe Innocent\'s shadow is naivety and denial: "if I don\'t think about it, it will go away". Tip: optimism works best alongside realism. You can believe in the good and still read the contract before signing.'],
    strengths: [['Оптимизм', 'Optimism'], ['Искренность', 'Sincerity'], ['Доверие к людям', 'Trust in people'], ['Умение радоваться', 'Capacity for joy']],
    growth: [['Замечать риски', 'Noticing risks'], ['Не избегать трудных разговоров', 'Facing difficult conversations']],
    funny: [['Ты здороваешься с собаками на улице раньше, чем с их хозяевами.', 'You greet dogs on the street before their owners.'], ['Твой ответ на «у меня плохие новости»: «Ничего, зато…» — и ты правда находишь это «зато».', 'Your reply to "I have bad news": "Never mind, at least…", and you genuinely find the "at least".'], ['Ты до сих пор загадываешь желание на падающую звезду. И на самолёт, на всякий случай.', 'You still make a wish on a shooting star. And on airplanes, just in case.'], ['Ты смотришь мультфильмы «для племянника». Племянника нет.', 'You watch cartoons "for your nephew". There is no nephew.']],
    famous: [['Часто сравнивают с Форрестом Гампом', 'Often compared to Forrest Gump'], ['…с медвежонком Паддингтоном', '…Paddington Bear'], ['…с Чебурашкой', '…Cheburashka']],
    compat: ['caregiver', 'lover', 'creator'],
    image: `A cute chibi character with a daisy flower crown blowing dandelion seeds in a sunny meadow, rosy cheeks, butter-yellow and mint palette, ${STYLE}` }),
  oc({ id: 'everyman', emoji: '🤝', title: ['Свой человек — с ним легко всем', 'The Everyman: easy to be around'], profile: prof('everyman'),
    summary: [['Без понтов и масок', 'No airs, no masks'], ['С тобой легко и спокойно', 'People feel at ease with you'], ['Ценишь честность и равенство', 'You value honesty and equality'], ['Мотив: принадлежность (с привкусом стабильности)', 'Core drive: belonging, with a dash of stability']],
    detailed: ['Ты — Свой человек (у Марк и Пирсон — Regular Guy/Gal, в русском издании — «Славный малый»): дружелюбный, простой в общении и надёжный. Ты не любишь пафос и снобизм, зато умеешь найти общий язык с кем угодно — от профессора до таксиста. С тобой не нужно казаться лучше, чем ты есть.\n\nУ Марк и Пирсон этот архетип входит в квадрант «Принадлежность и радость»: его главная потребность — быть частью сообщества, «своим среди своих». Он соседствует со стабильностью — тебе важны надёжность и предсказуемость. По смыслу ближе всего к доброжелательности и ценностям благожелательности и традиций у Шварца.\n\nТень Своего человека — раствориться в толпе и не выделяться, даже когда есть что сказать. Совет: твоё мнение важно. Быть «как все» не значит молчать — иногда именно ты можешь сказать то, что думают многие.',
      'You are the Everyman (Mark and Pearson\'s Regular Guy/Gal): friendly, down-to-earth and dependable. You dislike pretension and snobbery, and you can get along with anyone from a professor to a taxi driver. Nobody needs to pretend to be better than they are around you.\n\nIn Mark and Pearson\'s model this archetype belongs to "Belonging & Enjoyment": its core need is to be part of the community, one of us. It borders on stability; reliability and predictability matter to you. In meaning it is closest to agreeableness and to Schwartz\'s benevolence and tradition values.\n\nThe Everyman\'s shadow is blending into the crowd and staying quiet even when you have something to say. Tip: your opinion matters. Being "one of us" does not mean being silent; sometimes you are the one who can voice what many are thinking.'],
    strengths: [['Дружелюбие', 'Friendliness'], ['Надёжность', 'Dependability'], ['Честность', 'Honesty'], ['Умение объединять', 'Bringing people together']],
    growth: [['Выделяться, когда это нужно', 'Standing out when it matters'], ['Пробовать новое без оглядки на «что скажут»', 'Trying new things regardless of what people say']],
    funny: [['Ты знаешь по имени охранника, уборщицу и директора — и со всеми на «ты».', 'You know the security guard, the cleaner and the CEO by name, and you are on first-name terms with all of them.'], ['В любом новом коллективе через неделю ты уже «наш».', 'In any new group, within a week you are "one of us".'], ['Твоя любимая еда — та, что у бабушки. Ресторан с молекулярной кухней тебя не впечатлил.', 'Your favourite food is grandma\'s. The molecular gastronomy place did not impress you.'], ['Ты умеешь поддержать разговор о рыбалке, сериалах и ипотеке. Иногда одновременно.', 'You can chat about fishing, TV series and mortgages. Sometimes all at once.']],
    famous: [['Часто сравнивают с Бильбо Бэггинсом (до приключений)', 'Often compared to Bilbo Baggins (before the adventure)'], ['…с Шуриком', '…Shurik from classic Soviet comedies'], ['…с Пэм из «Офиса»', '…Pam from The Office']],
    compat: ['jester', 'caregiver', 'lover'],
    image: `A cute chibi character in a cozy hoodie waving hello, sharing a picnic with small friends on a blanket, warm beige, sage and sky-blue palette, ${STYLE}` })
];

const band = (lr, le, s1, d1, l2, s2, d2, l3, s3, d3) => [
  { label: L(...lr), summary: P(s1), detailed: L(...d1) },
  { label: L(...l2), summary: P(s2), detailed: L(...d2) },
  { label: L(...l3), summary: P(s3), detailed: L(...d3) }
];
const dimDefs = {
  stability: {
    name: L('Стабильность и контроль', 'Stability & control'),
    description: L('Желание порядка, безопасности и структуры: заботиться, строить, управлять.', 'The wish for order, safety and structure: caring, building, managing.'),
    lowLabel: L('импровизация', 'improvisation'), highLabel: L('порядок, опора', 'order, support'), color: '#A8E0C8',
    bands: [
      { label: L('Любишь свободу манёвра', 'You like room to manoeuvre'), summary: P([['Правила — не главное', 'Rules are not the point'], ['Легко импровизируешь', 'You improvise easily'], ['Структура тебя скорее сковывает', 'Structure tends to cramp you']]), detailed: L('Тебя мало мотивирует контроль и порядок ради порядка. Это даёт гибкость, но иногда важным делам не хватает опоры. Попробуй одну маленькую «систему» в той сфере, где хаос мешает больше всего.', 'Control and order for its own sake do not motivate you much. That gives you flexibility, but important things sometimes lack a backbone. Try one small "system" in the area where chaos hurts most.') },
      { label: L('Порядок по необходимости', 'Order when needed'), summary: P([['Можешь собраться, когда надо', 'You can get organised when needed'], ['Не фанатеешь от контроля', 'You are not obsessed with control'], ['Баланс заботы и свободы', 'A balance of care and freedom']]), detailed: L('Стабильность для тебя важна, но не любой ценой. Ты умеешь и навести порядок, и отпустить ситуацию.', 'Stability matters to you, but not at any price. You can bring order and you can let go.') },
      { label: L('Строитель и опора', 'Builder and anchor'), summary: P([['Создаёшь структуру и безопасность', 'You create structure and safety'], ['Заботишься о людях и результате', 'You care for people and outcomes'], ['На тебя опираются', 'People lean on you']]), detailed: L('Твоя ведущая мотивация — создать надёжный, упорядоченный мир для себя и других. Береги себя от гиперконтроля: доверие тоже строит стабильность.', 'Your leading drive is creating a safe, orderly world for yourself and others. Guard against over-control: trust builds stability too.') }
    ]
  },
  mastery: {
    name: L('Риск и мастерство', 'Risk & mastery'),
    description: L('Желание проявить себя, рискнуть, победить и изменить мир.', 'The wish to prove yourself, take risks, win and change the world.'),
    lowLabel: L('спокойные амбиции', 'quiet ambitions'), highLabel: L('вызов, победа', 'challenge, victory'), color: '#FFC3A0',
    bands: [
      { label: L('Без гонки', 'No rat race'), summary: P([['Соревнование тебя не цепляет', 'Competition does not hook you'], ['Ценишь спокойствие', 'You value peace'], ['Риск — только по необходимости', 'Risk only when necessary']]), detailed: L('Тебе не нужно постоянно что-то доказывать. Это прекрасная защита от выгорания — главное, не упускать шансы, которые действительно важны.', 'You do not need to keep proving things. Great protection against burnout; just do not miss chances that truly matter.') },
      { label: L('Здоровые амбиции', 'Healthy ambition'), summary: P([['Можешь рискнуть ради важного', 'You will take a risk for something important'], ['Цели есть, фанатизма нет', 'Goals without obsession'], ['Знаешь цену отдыху', 'You know the value of rest']]), detailed: L('Ты умеешь включать режим «вызов принят», но не живёшь в нём постоянно.', 'You can switch on "challenge accepted" mode without living in it permanently.') },
      { label: L('Охотник за вызовами', 'Challenge hunter'), summary: P([['Трудности тебя заводят', 'Difficulty energises you'], ['Хочешь оставить след в мире', 'You want to leave a mark'], ['Готовность рисковать', 'Ready to take risks']]), detailed: L('Твоя ведущая мотивация — мастерство, победа и перемены. Помни про тень этого мотива: не каждая ситуация — битва.', 'Your leading drive is mastery, victory and change. Mind its shadow: not every situation is a battle.') }
    ]
  },
  belonging: {
    name: L('Принадлежность и радость', 'Belonging & enjoyment'),
    description: L('Желание близости, общности и удовольствия: любить, дружить, веселиться.', 'The wish for closeness, community and enjoyment: loving, befriending, having fun.'),
    lowLabel: L('самодостаточность', 'self-sufficient'), highLabel: L('люди, тепло, веселье', 'people, warmth, fun'), color: '#F7B8C8',
    bands: [
      { label: L('Самодостаточность', 'Self-sufficient'), summary: P([['Тебе хорошо и наедине с собой', 'You are fine on your own'], ['Не гонишься за одобрением', 'You do not chase approval'], ['Близость — избирательно', 'Selective about closeness']]), detailed: L('Принадлежность к группе для тебя не главный мотиватор. Это даёт независимость; только не забывай, что связи — тоже ресурс.', 'Belonging to a group is not your main motivator. That gives independence; just remember connections are a resource too.') },
      { label: L('Тёплый, но независимый', 'Warm but independent'), summary: P([['Ценишь близких', 'You value your people'], ['Не растворяешься в группе', 'You do not dissolve into the group'], ['Любишь веселье в меру', 'You enjoy fun in moderation']]), detailed: L('Тебе важны люди и радость, но и своё пространство тоже.', 'People and joy matter to you, and so does your own space.') },
      { label: L('Человек для людей', 'A people person'), summary: P([['Связи — твоя главная ценность', 'Connection is your core value'], ['Умеешь дарить радость', 'You bring joy'], ['Создаёшь чувство «мы»', 'You create a sense of "us"']]), detailed: L('Твоя ведущая мотивация — близость, общность и удовольствие от жизни. Береги себя от растворения в других.', 'Your leading drive is closeness, community and enjoying life. Guard against losing yourself in others.') }
    ]
  },
  independence: {
    name: L('Свобода и самореализация', 'Independence & fulfilment'),
    description: L('Желание свободы, истины и счастья по-своему: искать, познавать, мечтать.', 'The wish for freedom, truth and happiness on your own terms: exploring, learning, dreaming.'),
    lowLabel: L('укоренённость', 'rooted'), highLabel: L('свобода, поиск', 'freedom, quest'), color: '#C9B6F2',
    bands: [
      { label: L('Укоренённость', 'Rooted'), summary: P([['Ценишь привычное и своё', 'You value the familiar'], ['Поиск ради поиска не нужен', 'No need to search for the sake of it'], ['Счастье — рядом', 'Happiness is close at hand']]), detailed: L('Тебя мало тянет «за горизонт». Это даёт устойчивость; иногда стоит позволить себе маленькое путешествие в неизвестное.', 'The horizon does not pull at you much. That gives stability; now and then, allow yourself a small trip into the unknown.') },
      { label: L('Свобода в меру', 'Freedom in moderation'), summary: P([['Любопытство есть', 'You are curious'], ['Но и корни важны', 'But roots matter too'], ['Ищешь, не теряя опоры', 'You search without losing your footing']]), detailed: L('Ты умеешь совмещать поиск нового с надёжной базой.', 'You combine seeking the new with a solid base.') },
      { label: L('Вечный искатель', 'Eternal seeker'), summary: P([['Свобода превыше всего', 'Freedom above all'], ['Ищешь истину и смысл', 'You seek truth and meaning'], ['Своё счастье — по своим правилам', 'Happiness on your own terms']]), detailed: L('Твоя ведущая мотивация — независимость и самореализация. Не забывай, что свобода включает и право выбрать что-то надолго.', 'Your leading drive is independence and fulfilment. Remember that freedom also includes the right to commit to something.') }
    ]
  }
};

const methodology = L(
`### Что это за тест
Развлекательный тест по мотивам **12 архетипов** в версии Маргарет Марк и Кэрол Пирсон («The Hero and the Outlaw», 2001; рус. изд. «Герой и бунтарь», 2005). 16 ситуаций оцениваются по четырём базовым мотивам, вокруг которых авторы выстроили свою модель:

| Мотив | Архетипы |
|---|---|
| Стабильность и контроль | Заботливый, Творец, Правитель |
| Принадлежность и радость | Свой человек, Романтик, Шут |
| Риск и мастерство | Герой, Бунтарь, Маг |
| Независимость и самореализация | Простодушный, Искатель, Мудрец |

Мотивы образуют две оси: «стабильность ↔ мастерство» и «принадлежность ↔ независимость». Каждый архетип — точка на этом «колесе мотивов»: у центрального архетипа квадранта один ведущий мотив, у пограничных — ведущий плюс соседний.

### Откуда это взялось
Понятие **архетипа** ввёл Карл Густав Юнг — как универсальные образы «коллективного бессознательного». Джозеф Кэмпбелл описал «путь героя», Кэрол Пирсон в 1980–90-х предложила набор из 12 архетипов для личностного развития, а Марк и Пирсон адаптировали его для маркетинга и брендинга.

### Что говорит наука — честно
- Юнгианские архетипы и 12-архетипная схема **не являются эмпирически валидированной моделью личности**: это культурный и литературный инструмент, а не измеренные черты. Тест нельзя использовать для отбора на работу или серьёзных решений.
- Есть отдельные исследования: Фабер и Майер (Faber & Mayer, 2009) создали шкалу отклика на архетипические образы в музыке, кино и искусстве и обнаружили, что люди устойчиво «резонируют» с разными группами архетипов, а этот отклик связан с чертами личности и жизненными темами (например, отклик на «заботливые» образы — с доброжелательностью).
- Четыре мотива по смыслу перекликаются с кругом ценностей Шалома Шварца (Schwartz, 1992) — безопасность, достижение, благожелательность, самостоятельность и др., — а ценности, в свою очередь, умеренно связаны с «Большой пятёркой» (Roccas et al., 2002). Связи архетипов с чертами в описаниях — **наши смысловые сопоставления**, а не измеренные корреляции.

### Как считается результат
Каждый вариант ответа «пахнет» одним архетипом и даёт 2 балла его ведущему мотиву (+1 соседнему для пограничных архетипов). Суммы по четырём мотивам переводятся в шкалу 0–1, и выбирается архетип с ближайшим профилем (евклидово расстояние). Профили откалиброваны симуляцией, чтобы все 12 архетипов выпадали примерно одинаково часто. Вопросы оригинальные, надёжность не измерялась.`,
`### What this quiz is
An entertainment quiz based on the **12 archetypes** as framed by Margaret Mark and Carol Pearson (The Hero and the Outlaw, 2001). 16 situations are scored on the four core motivations around which the authors built their model:

| Motivation | Archetypes |
|---|---|
| Stability & control | Caregiver, Creator, Ruler |
| Belonging & enjoyment | Everyman, Lover, Jester |
| Risk & mastery | Hero, Rebel (Outlaw), Magician |
| Independence & fulfilment | Innocent, Explorer, Sage |

The motivations form two axes, stability ↔ mastery and belonging ↔ independence. Each archetype is a point on this "motivation wheel": the core archetype of a quadrant has one leading motive, the border archetypes have a leading motive plus a neighbouring one.

### Where this comes from
Carl Gustav Jung introduced **archetypes** as universal images of the "collective unconscious". Joseph Campbell described the hero's journey; Carol Pearson proposed a set of 12 archetypes for personal growth in the 1980s–90s, and Mark and Pearson adapted it for marketing and branding.

### What the science says, honestly
- Jungian archetypes and the 12-archetype scheme are **not an empirically validated personality model**: they are a cultural and literary tool, not measured traits. Do not use this quiz for hiring or serious decisions.
- There is some research: Faber and Mayer (2009) built a scale of resonance to archetypal characters in music, film and art and found that people reliably resonate with different archetype clusters, and that resonance relates to personality traits and life themes (e.g., resonance with caregiver figures went with agreeableness).
- The four motivations echo Shalom Schwartz's (1992) circle of values — security, achievement, benevolence, self-direction and others — and values in turn relate moderately to the Big Five (Roccas et al., 2002). The archetype–trait links in the descriptions are **our conceptual mapping**, not measured correlations.

### How the result is computed
Each answer option "smells" of one archetype and gives 2 points to its leading motivation (+1 to the neighbouring one for border archetypes). The four totals are rescaled to 0–1, and you get the archetype with the nearest profile (Euclidean distance). Profiles were calibrated by simulation so all 12 archetypes come up about equally often. Questions are original; reliability has not been measured.`);

module.exports = {
  dimOrder: ['stability', 'mastery', 'belonging', 'independence'], dimDefs,
  def: {
    id: 'archetype', category: 'fun', kind: 'choice', seriousness: 'fun',
    title: L('Какой ты архетип?', 'Which archetype are you?'),
    tagline: L('Герой, Мудрец, Бунтарь или Шут? 12 архетипов по Юнгу, Марк и Пирсон — и один из них про тебя', 'Hero, Sage, Rebel or Jester? 12 archetypes after Jung, Mark and Pearson, and one of them is you'),
    description: L('Апельсины на тротуаре, апокалипсис в кино и миллион с неба — 16 ситуаций покажут, какой мотив ведёт тебя по жизни: стабильность, принадлежность, мастерство или свобода. В результате — твой архетип, его сильные стороны, «тень» и персонажи, с которыми тебя часто сравнивают.',
      'Oranges on the pavement, a movie apocalypse and a million from the sky: 16 situations reveal the motive that drives you, stability, belonging, mastery or freedom. You get your archetype, its strengths, its "shadow" and the characters you are often compared to.'),
    emoji: '🦸', durationMin: 5, popularity: 4,
    tags: [L('архетипы', 'archetypes'), L('Юнг', 'Jung'), L('мотивация', 'motivation'), L('развлечение', 'fun')],
    methodology,
    sources: [
      { citation: 'Mark, M., & Pearson, C. S. (2001). The hero and the outlaw: Building extraordinary brands through the power of archetypes. New York: McGraw-Hill.' },
      { citation: 'Марк, М., Пирсон, К. (2005). Герой и бунтарь. Создание бренда с помощью архетипов. СПб.: Питер.' },
      { citation: 'Pearson, C. S. (1991). Awakening the heroes within: Twelve archetypes to help us find ourselves and transform our world. San Francisco: HarperSanFrancisco.' },
      { citation: 'Jung, C. G. (1959). The archetypes and the collective unconscious (Collected Works, Vol. 9, Part 1). Princeton, NJ: Princeton University Press.' },
      { citation: 'Campbell, J. (1949). The hero with a thousand faces. New York: Pantheon Books.' },
      { citation: 'Faber, M. A., & Mayer, J. D. (2009). Resonance to archetypes in media: There\'s some accounting for taste. Journal of Research in Personality, 43(3), 307–322.', doi: '10.1016/j.jrp.2008.11.003', url: 'https://scholars.unh.edu/psych_facpub/350' },
      { citation: 'Schwartz, S. H. (1992). Universals in the content and structure of values: Theoretical advances and empirical tests in 20 countries. Advances in Experimental Social Psychology, 25, 1–65.', doi: '10.1016/S0065-2601(08)60281-6' },
      { citation: 'Roccas, S., Sagiv, L., Schwartz, S. H., & Knafo, A. (2002). The Big Five personality factors and personal values. Personality and Social Psychology Bulletin, 28(6), 789–801.', doi: '10.1177/0146167202289008' }
    ],
    license: 'Original content written for testik. The 12-archetype framework is described and cited (Mark & Pearson, 2001), not reproduced; no questions are taken from any commercial archetype assessment (e.g., the Pearson–Marr Archetype Indicator) or quiz site.',
    disclaimer: L('Развлекательный тест. Архетипы — культурная и литературная модель, а не научно валидированная типология личности. Не используй результат для серьёзных решений.', 'Entertainment quiz. Archetypes are a cultural and literary model, not a scientifically validated personality typology. Do not use the result for serious decisions.'),
    instructions: L('В каждой ситуации выбирай вариант, который откликается сильнее всего. Если тянет к нескольким — выбирай тот, что больше похож на тебя настоящего, а не на того, кем хочется казаться.', 'In each situation, pick the option that resonates most. If several pull at you, choose the one that is most like the real you, not who you would like to seem.'),
    questions, outcomes,
    scoringNotes: L('Четыре шкалы — мотивы Марк и Пирсон: стабильность, мастерство, принадлежность и независимость. Каждый ответ даёт 2 балла ведущему мотиву архетипа и 1 балл соседнему (для пограничных архетипов). Суммы переводятся в 0–1: (балл − минимум) / (максимум − минимум); затем выбирается архетип с ближайшим профилем (евклидово расстояние).',
      'Four scales, Mark and Pearson\'s motivations: stability, mastery, belonging and independence. Each answer gives 2 points to the archetype\'s leading motive and 1 to the neighbouring one (for border archetypes). Totals are rescaled to 0–1: (score − min) / (max − min); you then get the archetype with the nearest profile (Euclidean distance).'),
    resultIntro: L('Твой архетип найден! Это не диагноз, а зеркало: образ, через который удобно посмотреть на свои мотивы.', 'Your archetype has been found! Not a diagnosis but a mirror: an image that helps you look at your own motives.')
  }
};

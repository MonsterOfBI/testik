const { L, o, q, BIG5 } = require('./common');
const P = a => a.map(([ru, en]) => L(ru, en));
const oc = x => ({
  id: x.id, title: L(...x.title), emoji: x.emoji, profile: x.profile,
  summary: P(x.summary), detailed: L(...x.detailed), strengths: P(x.strengths), growth: P(x.growth),
  funnyExamples: P(x.funny), compatibleWith: x.compat, imagePrompt: x.image
});
const STYLE = 'soft pastel colors, glossy flat-3D style, smooth gradient background, cute, minimal, high detail, no text';

const questions = [
  q('q1', 'Друзья зовут в спонтанную поездку. Выезд — через час.', 'Friends invite you on a spontaneous trip. Departure in one hour.', [
    o('Уже собираю рюкзак! Маршрут обсудим по дороге', 'Already packing! We will sort out the route on the way', { E: 2, N: -1, C: -1 }),
    o('Еду, но сначала проверю погоду, бюджет и где мы ночуем', 'I am in, but first I check the weather, the budget and where we sleep', { E: 1, C: 2 }),
    o('Еду… и всю дорогу переживаю, всё ли пройдёт нормально', 'I go… and worry the whole way whether it will all be okay', { E: 1, N: 2 }),
    o('Спасибо, но у меня уютный вечер, и я его никому не отдам', 'Thanks, but I have a cosy evening planned and I am not giving it up', { E: -2, N: -1 }),
    o('Через час?! Мне нужно минимум три дня, чтобы морально подготовиться', 'In an hour?! I need at least three days to prepare emotionally', { E: -1, N: 1, C: 1 }),
    o('Поеду, если по пути будет что-нибудь странное — заброшенная обсерватория, например', 'Only if there is something weird on the way, like an abandoned observatory', { O: 2, E: 1 })
  ]),
  q('q2', 'Тебя несправедливо раскритиковали при всех.', 'You get unfairly criticised in front of everyone.', [
    o('Отвечаю сразу — громко и по делу', 'Answer back on the spot, loud and to the point', { E: 2, N: 1 }),
    o('Снаружи — полное спокойствие, внутри — ураган до самой ночи', 'Calm on the outside, a hurricane inside until midnight', { E: -1, N: 2 }),
    o('Пропускаю мимо ушей: на всех не угодишь', 'Let it slide. You cannot please everyone', { N: -2 }),
    o('Отшучиваюсь — и напряжение как рукой снимает', 'Make a joke, and the tension melts away', { E: 1, N: -1 }),
    o('Потом спокойно разбираю ситуацию и пишу аргументированное сообщение', 'Later, calmly analyse what happened and send a well-argued message', { C: 2, E: -1 })
  ]),
  q('q3', 'Как ты восстанавливаешься после тяжёлой недели?', 'How do you recharge after a rough week?', [
    o('Концерт, вечеринка, танцы — мне нужно больше людей!', 'A gig, a party, dancing. I need more people!', { E: 2 }),
    o('Тишина, книга, горячая ванна. Телефон — в авиарежим', 'Silence, a book, a hot bath. Phone on airplane mode', { E: -2 }),
    o('Генеральная уборка и план на следующую неделю. Порядок снаружи — порядок внутри', 'A deep clean and next week\'s plan. Order outside, order inside', { C: 2 }),
    o('Рисую, сочиняю, смотрю на звёзды и придумываю миры', 'Draw, write, stargaze and invent new worlds', { O: 2, E: -1 }),
    o('Долгий разговор по душам с одним близким человеком — чтобы всё проговорить', 'A long heart-to-heart with one close person to talk it all through', { E: -1, N: 1 })
  ]),
  q('q4', 'В компании ты обычно…', 'In a group you are usually…', [
    o('Заводила: рассказываю истории и придумываю игры', 'The life of the party: telling stories and inventing games', { E: 2, N: -1 }),
    o('Тот, кто спорит до хрипоты, если тема задела', 'The one who argues until hoarse if the topic hits a nerve', { E: 2, N: 1 }),
    o('Спокойный слушатель, к которому потом подходят поговорить наедине', 'The calm listener people come to later for a private chat', { E: -1, N: -1 }),
    o('Наблюдатель: замечаю, кто на кого как посмотрел, и делаю выводы', 'The observer who notices who looked at whom, and draws conclusions', { E: -1, N: 1 }),
    o('Человек с неожиданными идеями: «А давайте в следующий раз в планетарий?»', 'The one with left-field ideas: "Next time, let\'s go to the planetarium?"', { O: 2 })
  ]),
  q('q5', 'Ты опаздываешь на важную встречу, а автобус встал в пробке.', 'You are late for an important meeting and the bus is stuck in traffic.', [
    o('Нервно стучу ногой, пишу всем, что опаздываю, и мысленно ругаю мэрию', 'Tap my foot, text everyone I am late and silently blame city hall', { E: 1, N: 2 }),
    o('Выхожу и бегу. Ногами быстрее!', 'Get off and run. Feet are faster!', { E: 1, C: 1 }),
    o('Ну, опоздаю. Мир не рухнет', 'So I will be late. The world will not end', { N: -2, C: -1 }),
    o('Такого не бывает: я всегда выезжаю с запасом в сорок минут', 'Never happens. I always leave forty minutes early', { C: 2 }),
    o('Тихо переживаю и репетирую, как буду извиняться', 'Quietly fret and rehearse my apology', { E: -1, N: 1, C: 1 })
  ]),
  q('q6', 'Какое время года тебе ближе всего?', 'Which season feels most like you?', [
    o('Весна: всё оживает, хочется гулять и влюбляться', 'Spring: everything wakes up, you want to stroll and fall in love', { E: 1, N: -1 }),
    o('Лето: жара, движ, яркие эмоции', 'Summer: heat, action, big emotions', { E: 1, N: 1 }),
    o('Осень: дождь, шарф, глубокие мысли', 'Autumn: rain, a scarf, deep thoughts', { E: -1, N: 1 }),
    o('Зима: тишина, снег и никакой суеты', 'Winter: silence, snow and no fuss', { E: -1, N: -1 }),
    o('Любое, если небо красивое — с грозой, звездопадом или радугой', 'Any season, as long as the sky is interesting: storms, meteor showers, rainbows', { O: 2 })
  ]),
  q('q7', 'Твой стиль работы над большим проектом:', 'Your style on a big project:', [
    o('Рывок! Всё за одну бессонную ночь на чистом вдохновении', 'One big sprint! All done in one sleepless night on pure inspiration', { E: 1, N: 1, C: -1 }),
    o('Чёткий план, контрольные точки, никаких сюрпризов', 'A clear plan, milestones, no surprises', { C: 2, N: -1 }),
    o('Медленно, но верно. Главное — без нервов', 'Slow and steady. The main thing is no stress', { N: -1, E: -1, C: 1 }),
    o('Шлифую каждую деталь, пока не станет идеально', 'Polish every detail until it is perfect', { C: 1, N: 1, E: -1 }),
    o('Месяц ищу вдохновение, а потом выдаю что-то, чего никто не ждал', 'Spend a month hunting for inspiration, then deliver something nobody expected', { O: 2, C: -1 })
  ]),
  q('q8', 'В разгаре спора ты вдруг понимаешь, что прав собеседник.', 'Mid-argument, you suddenly realise the other person is right.', [
    o('Признаю это сразу и с юмором', 'Admit it right away, with a laugh', { E: 1, N: -1 }),
    o('Дожимаю спор из принципа — сдаваться не в моём стиле', 'Keep pushing on principle. Surrender is not my style', { E: 1, N: 1 }),
    o('Молча соглашаюсь, а потом неделю прокручиваю этот разговор в голове', 'Quietly agree, then replay the conversation in my head for a week', { E: -1, N: 2 }),
    o('Спокойно киваю: «Справедливо, принимаю»', 'Calmly nod: "Fair enough, I accept that"', { E: -1, N: -1 }),
    o('Предлагаю посмотреть на вопрос с совсем другой стороны — вдруг мы оба неправы', 'Suggest looking at it from a totally different angle; maybe we are both wrong', { O: 2 })
  ]),
  q('q9', 'Тебе предстоит выступить перед большой аудиторией.', 'You have to speak in front of a big audience.', [
    o('Ура, сцена! Чем больше зрителей, тем лучше', 'Yes, a stage! The bigger the crowd, the better', { E: 2, N: -1 }),
    o('Волнуюсь так, что дрожат руки, но выступаю с огнём', 'My hands shake with nerves, but I perform with fire', { E: 1, N: 1 }),
    o('Готовлюсь две недели и репетирую перед зеркалом', 'Prepare for two weeks and rehearse in front of the mirror', { C: 2, N: 1 }),
    o('Не люблю такое, но справлюсь спокойно и без драмы', 'Not my favourite thing, but I will handle it calmly, no drama', { E: -1, N: -1 }),
    o('Тревожусь заранее и втайне надеюсь, что выступление отменят', 'Worry for days and secretly hope it gets cancelled', { E: -1, N: 2 })
  ]),
  q('q10', 'Как ты злишься?', 'How do you get angry?', [
    o('Вспыхиваю мгновенно — и так же быстро остываю', 'Flare up instantly, cool down just as fast', { E: 1, N: 1 }),
    o('Почти не злюсь: максимум закатываю глаза', 'Hardly ever. An eye-roll at most', { N: -2 }),
    o('Злюсь тихо и долго, но никому не показываю', 'Quietly and for a long time, without showing anyone', { E: -1, N: 1 }),
    o('Высказываю всё прямо и сразу — так честнее', 'Say it all directly and immediately; it is more honest', { E: 2 }),
    o('Иду в спортзал или драю квартиру до блеска', 'Hit the gym or scrub the flat until it shines', { C: 2, N: -1 })
  ]),
  q('q11', 'Твоё отношение к планам:', 'Your relationship with plans:', [
    o('План — это скелет моей жизни', 'A plan is the skeleton of my life', { C: 2 }),
    o('Планы? Я живу по вдохновению', 'Plans? I live by inspiration', { C: -2, O: 1 }),
    o('Планирую, но если всё сломалось — ну и ладно, переиграем', 'I plan, but if it falls apart, fine, we will improvise', { N: -1, C: 1 }),
    o('Планирую и очень расстраиваюсь, когда что-то идёт не по плану', 'I plan, and get really upset when things go off script', { C: 1, N: 2 }),
    o('Всегда держу план Б, В и Г — на всякий случай', 'Always keep plans B, C and D, just in case', { C: 1, N: 1 })
  ]),
  q('q12', 'Друзья описывают тебя одним словом. Скорее всего, это…', 'Your friends describe you in one word. Most likely…', [
    o('«Зажигалка»', '"Firecracker"', { E: 2, N: 1 }),
    o('«Солнышко»', '"Sunshine"', { E: 1, N: -1 }),
    o('«Скала»', '"Rock"', { N: -1, E: -1 }),
    o('«Глубина»', '"Deep"', { E: -1, N: 1 }),
    o('«Человек-план»', '"The planner"', { C: 2 }),
    o('«Человек-вселенная»', '"A whole universe"', { O: 2 })
  ]),
  q('q13', 'Приходит неприятная новость — не катастрофа, но обидно.', 'You get some annoying news. Not a disaster, but it stings.', [
    o('Звоню другу, вместе смеёмся над ситуацией — и всё, отпустило', 'Call a friend, laugh about it together, and it is gone', { E: 2, N: -1 }),
    o('Злюсь и сразу кидаюсь всё исправлять', 'Get angry and rush straight into fixing it', { E: 1, N: 1, C: 1 }),
    o('Ухожу в себя и долго это переживаю', 'Withdraw and process it for a long time', { E: -1, N: 2 }),
    o('Пожимаю плечами: бывает', 'Shrug: it happens', { N: -2 }),
    o('Пишу список: что можно исправить, а что — просто отпустить', 'Write a list: what I can fix and what I just let go', { C: 2, N: -1 })
  ]),
  q('q14', 'Какой вид из окна тебе по душе?', 'Which view from the window speaks to you?', [
    o('Вулкан. Пусть будет драматично', 'A volcano. Let it be dramatic', { E: 1, N: 1 }),
    o('Бескрайнее небо и ветер', 'An endless sky and wind', { E: 1, N: -1, O: 1 }),
    o('Горы и старый лес', 'Mountains and an ancient forest', { E: -1, N: 1 }),
    o('Спокойное озеро без единой волны', 'A still lake without a ripple', { E: -1, N: -1 }),
    o('Северное сияние', 'The northern lights', { O: 2 }),
    o('Ночной город в огнях небоскрёбов', 'A night city glittering with skyscrapers', { C: 1, E: 1 })
  ]),
  q('q15', 'Решение нужно принять прямо сейчас — за десять секунд.', 'You have to make a decision right now, in ten seconds.', [
    o('Решаю мгновенно, разбираться буду потом', 'Decide instantly, figure it out later', { E: 1, N: -1, C: -1 }),
    o('Паника! Ладно, решаю, но потом сто раз пересматриваю', 'Panic! Okay, I decide, then second-guess it a hundred times', { N: 2 }),
    o('Действую по заранее продуманному алгоритму', 'Follow an algorithm I worked out in advance', { C: 2 }),
    o('Доверяю интуиции — у неё хороший вкус', 'Trust my intuition; it has good taste', { O: 1, N: -1 }),
    o('Не спешу, даже если торопят', 'Take my time, even if they rush me', { E: -1, N: -1 })
  ])
];

const outcomes = [
  oc({ id: 'fire', emoji: '🔥', title: ['Огонь', 'Fire'], profile: { E: 0.85, N: 0.75, O: 0.55, C: 0.5 },
    summary: [['Страсть, энергия и скорость', 'Passion, energy and speed'], ['Вспыхиваешь — и зажигаешь других', 'You catch fire and light others up'], ['Эмоции на максимум — и в радости, и в споре', 'Emotions at full volume, in joy and in arguments'], ['Классический темперамент — холерик', 'Classical temperament: choleric']],
    detailed: ['Ты — огонь: энергичный, страстный и очень живой. В современных терминах это сочетание высокой экстраверсии и высокой эмоциональной реактивности: ты быстро загораешься, ярко чувствуешь и сразу действуешь. С тобой не бывает скучно — и редко бывает тихо.\n\nВ античной схеме огонь (горячий и сухой) соответствовал жёлтой желчи и лету, а темперамент с избытком жёлтой желчи позже назвали холерическим. Ганс Айзенк заметил, что четыре древних темперамента удивительно хорошо ложатся на две его оси: холерик — это экстраверт с высокой эмоциональной нестабильностью. В русской традиции добавляют ещё Павлова: «сильный неуравновешенный» тип нервной системы, где возбуждение берёт верх над торможением.\n\nТвоя сила — драйв: ты запускаешь проекты, вдохновляешь людей и не боишься конфликтов, если речь о важном. Зона роста — пауза. Огонь греет, пока горит ровно: научись считать до десяти перед резким ответом, и твоя энергия станет не пожаром, а двигателем.',
      'You are fire: energetic, passionate and intensely alive. In modern terms that is high extraversion combined with high emotional reactivity: you light up fast, feel things vividly and act immediately. Life with you is never boring, and rarely quiet.\n\nIn the ancient scheme, fire (hot and dry) matched yellow bile and summer, and the temperament with too much yellow bile was later called choleric. Hans Eysenck noticed that the four ancient temperaments fit his two axes surprisingly well: the choleric is an extravert high in emotional instability. Russian textbooks add Pavlov: a "strong, unbalanced" nervous system, where excitation overpowers inhibition.\n\nYour strength is drive: you start projects, inspire people and do not shy away from conflict when something matters. Your growth edge is the pause. Fire warms while it burns steadily. Learn to count to ten before a sharp reply, and your energy becomes an engine rather than a wildfire.'],
    strengths: [['Энергия и инициатива', 'Energy and initiative'], ['Смелость', 'Boldness'], ['Умение вдохновлять', 'Ability to inspire'], ['Честность в эмоциях', 'Emotional honesty']],
    growth: [['Пауза перед резкими словами', 'Pause before sharp words'], ['Доводить начатое, когда первая искра погасла', 'Finish things after the first spark fades']],
    funny: [['Ты в споре о том, как правильно варить гречку: через пять минут это уже вопрос чести.', 'You in a debate about how to cook rice: five minutes in, it is a matter of honour.'], ['Твоё «да я вообще не нервничаю!» звучит на 20 децибел громче, чем у остальных.', 'Your "I am calm" is 20 decibels louder than everyone else\'s.'], ['Записаться на марафон в понедельник, купить экипировку во вторник, найти новую страсть к четвергу.', 'Sign up for a marathon on Monday, buy the gear on Tuesday, find a new passion by Thursday.'], ['Друзья заранее предупреждают официанта: «Не обращайте внимания, у нас просто эмоциональное обсуждение».', 'Your friends warn the waiter in advance: "Don\'t mind us, we are just having a passionate discussion."']],
    compat: ['air', 'ether'],
    image: `A cute smiling flame character with big sparkling eyes, dancing with tiny sparks, warm coral, peach and golden palette, ${STYLE}` }),
  oc({ id: 'air', emoji: '🌬️', title: ['Воздух', 'Air'], profile: { E: 0.85, N: 0.2, O: 0.6, C: 0.35 },
    summary: [['Лёгкость, оптимизм и общительность', 'Lightness, optimism and sociability'], ['Быстро переключаешься и не держишь обид', 'You switch fast and never hold grudges'], ['Новые люди и идеи — твой кислород', 'New people and ideas are your oxygen'], ['Классический темперамент — сангвиник', 'Classical temperament: sanguine']],
    detailed: ['Ты — воздух: лёгкий, весёлый и подвижный. В языке современной психологии это высокая экстраверсия плюс высокая эмоциональная устойчивость. Ты легко знакомишься, быстро отходишь от неприятностей и умеешь находить хорошее даже в понедельнике.\n\nВ античной медицине воздух (горячий и влажный) был связан с кровью — по-латыни sanguis — и с весной. Отсюда и «сангвиник»: человек жизнерадостный, общительный, лёгкий на подъём. Айзенк поместил сангвиника в квадрант «экстраверт + эмоционально стабильный», а у Павлова это «сильный, уравновешенный, подвижный» тип — самый «удобный» для перемен.\n\nТвоя сила — гибкость и позитив: ты разряжаешь обстановку, объединяешь людей и легко адаптируешься к новому. Зона роста — глубина и постоянство. Ветер свободен, но иногда стоит задержаться на одном месте подольше, чтобы что-то по-настоящему выросло.',
      'You are air: light, cheerful and always on the move. In modern psychological language that is high extraversion plus high emotional stability. You make friends easily, bounce back from setbacks fast and can find something good even in a Monday.\n\nIn ancient medicine air (hot and moist) was linked to blood — sanguis in Latin — and to spring. Hence "sanguine": cheerful, sociable and quick to say yes. Eysenck placed the sanguine in the "extraverted and emotionally stable" quadrant, and for Pavlov it is the "strong, balanced, mobile" type, the one best built for change.\n\nYour strength is flexibility and optimism: you lighten the mood, bring people together and adapt to anything new. Your growth edge is depth and constancy. The wind is free, but sometimes you need to stay in one place long enough for something to really grow.'],
    strengths: [['Оптимизм', 'Optimism'], ['Общительность', 'Sociability'], ['Гибкость', 'Flexibility'], ['Отходчивость', 'Quick recovery']],
    growth: [['Не бросать дела на середине', 'Do not drop things halfway'], ['Слушать до конца, а не только ждать своей реплики', 'Listen to the end instead of waiting for your turn']],
    funny: [['Ты: «Мы же знакомы?» Человек: «Нет». Ты, через десять минут: «Ну, теперь знакомы!»', 'You: "Have we met?" Them: "No." You, ten minutes later: "Well, now we have!"'], ['У тебя восемь хобби, и ни одно не продержалось дольше сезона. Зато какие были сезоны!', 'You have eight hobbies and none lasted more than a season. But what seasons they were!'], ['Обида? Ой, точно, надо же было обидеться. Ладно, уже неактуально.', 'A grudge? Oh right, I meant to be upset. Forgot. Never mind.'], ['Ты приходишь в гости «на часок» — и приводишь трёх новых друзей. Познакомились у подъезда.', 'You drop by "for an hour" with three new friends you met on the way.']],
    compat: ['fire', 'water'],
    image: `A cute cloud-like breeze spirit with rosy cheeks swirling with leaves and paper airplanes, sky blue, mint and white palette, ${STYLE}` }),
  oc({ id: 'earth', emoji: '⛰️', title: ['Земля', 'Earth'], profile: { E: 0.2, N: 0.75, O: 0.5, C: 0.65 },
    summary: [['Глубина, серьёзность и чуткость', 'Depth, seriousness and sensitivity'], ['Замечаешь детали, которые другие пропускают', 'You notice details others miss'], ['Чувствуешь сильно, но показываешь не всем', 'You feel deeply but show it to few'], ['Классический темперамент — меланхолик', 'Classical temperament: melancholic']],
    detailed: ['Ты — земля: глубокая, вдумчивая и очень чуткая. Это сочетание интроверсии и высокой эмоциональной чувствительности, часто вместе с аккуратностью и любовью к качеству. Ты долго переживаешь важное, тщательно обдумываешь решения и редко делаешь что-то «на отвали».\n\nВопреки популярным схемам, в античной традиции именно земля (холодная и сухая) соответствовала чёрной желчи — по-гречески melaina cholē — и осени. Так появился «меланхолик». Важно: в классических текстах меланхолия связывалась не только с грустью, но и с глубиной ума — ещё в «Проблемах», приписываемых Аристотелю, спрашивается, почему выдающиеся люди так часто меланхолики. У Айзенка это квадрант «интроверт + эмоционально нестабильный», у Павлова — «слабый» тип: высокая чувствительность нервной системы.\n\nТвоя сила — глубина, эмпатия и внимание к деталям: ты видишь риски раньше других и делаешь вещи по-настоящему хорошо. Зона роста — бережность к себе. Чувствительность не нужно «лечить», но ей нужен уход: сон, движение и люди, рядом с которыми можно не держать лицо.',
      'You are earth: deep, thoughtful and highly sensitive. That is introversion combined with high emotional sensitivity, often with care and a love of quality. You process important things for a long time, think decisions through and rarely do anything half-heartedly.\n\nContrary to many pop charts, in the ancient tradition it was earth (cold and dry) that matched black bile — melaina cholē in Greek — and autumn. Hence "melancholic". Note that classical texts linked melancholy not only to sadness but also to depth of mind: the Problems attributed to Aristotle asks why outstanding people are so often melancholic. For Eysenck this is the "introverted and emotionally unstable" quadrant; for Pavlov, the "weak" type, meaning a highly sensitive nervous system.\n\nYour strength is depth, empathy and attention to detail: you spot risks early and do things properly. Your growth edge is self-care. Sensitivity does not need "fixing", but it needs looking after: sleep, movement and people around whom you do not have to keep a brave face.'],
    strengths: [['Глубина мышления', 'Depth of thought'], ['Внимание к деталям', 'Attention to detail'], ['Эмпатия', 'Empathy'], ['Ответственность', 'Responsibility']],
    growth: [['Не прокручивать неудачи по кругу', 'Stop replaying setbacks on a loop'], ['Разрешать себе «достаточно хорошо» вместо «идеально»', 'Allow yourself "good enough" instead of "perfect"']],
    funny: [['Ты перечитываешь сообщение пять раз перед отправкой. А потом ещё раз — уже после.', 'You reread a message five times before sending it. And once more afterwards.'], ['Тебе сказали «нормально получилось», и теперь ты три дня гадаешь, что значит «нормально».', 'Someone said "it turned out fine", and now you spend three days decoding "fine".'], ['Твой плейлист «для настроения» состоит из песен, под которые хорошо смотреть в окно поезда.', 'Your "mood" playlist is all songs for staring out of a train window.'], ['Ты помнишь неловкий момент 2016 года лучше, чем свой пароль от почты.', 'You remember an awkward moment from 2016 better than your email password.']],
    compat: ['water', 'metal'],
    image: `A cute little mountain character with a mossy cap and tiny flowers, sitting peacefully with a small lantern among autumn leaves, sage green, terracotta and cream palette, ${STYLE}` }),
  oc({ id: 'water', emoji: '💧', title: ['Вода', 'Water'], profile: { E: 0.2, N: 0.2, O: 0.45, C: 0.5 },
    summary: [['Спокойствие, терпение и устойчивость', 'Calm, patience and steadiness'], ['Обтекаешь препятствия, а не бьёшься о них', 'You flow around obstacles instead of hitting them'], ['Рядом с тобой всем становится тише', 'Everything gets quieter around you'], ['Классический темперамент — флегматик', 'Classical temperament: phlegmatic']],
    detailed: ['Ты — вода: спокойная, терпеливая и удивительно устойчивая. Это сочетание интроверсии и высокой эмоциональной стабильности. Тебя трудно вывести из себя, ты не принимаешь поспешных решений и умеешь ждать — а это, как известно, вода и камень точит.\n\nВ античной схеме вода (холодная и влажная) соответствовала флегме — слизи — и зиме. Звучит не очень романтично, но «флегматик» в итоге стал означать человека невозмутимого и надёжного. У Айзенка это квадрант «интроверт + эмоционально стабильный», а у Павлова — «сильный, уравновешенный, инертный» тип: медленно раскачивается, зато и сбить его с курса трудно.\n\nТвоя сила — выдержка: в кризисе ты сохраняешь ясную голову, а людям рядом с тобой спокойнее. Зона роста — инициатива. Спокойная вода прекрасна, но иногда стоит устроить небольшую волну: сказать о своём желании первым или попробовать что-то без долгих раздумий.',
      'You are water: calm, patient and remarkably steady. That is introversion combined with high emotional stability. It is hard to rattle you, you do not make rash decisions and you know how to wait, and as the saying goes, dripping water wears away stone.\n\nIn the ancient scheme water (cold and moist) matched phlegm and winter. Not very romantic, but "phlegmatic" came to mean someone unflappable and dependable. For Eysenck this is the "introverted and emotionally stable" quadrant; for Pavlov, the "strong, balanced, inert" type: slow to start, but hard to knock off course.\n\nYour strength is composure: in a crisis you keep a clear head, and people feel calmer around you. Your growth edge is initiative. Still water is beautiful, but sometimes make a small wave: say what you want first, or try something without a long deliberation.'],
    strengths: [['Невозмутимость', 'Composure'], ['Терпение', 'Patience'], ['Надёжность', 'Reliability'], ['Умение слушать', 'Listening']],
    growth: [['Проявлять инициативу', 'Take the initiative'], ['Показывать эмоции, чтобы близкие не гадали', 'Show your feelings so loved ones do not have to guess']],
    funny: [['Вокруг пожарная тревога, все бегут. Ты: «Так, сначала возьму куртку».', 'Fire alarm, everyone is running. You: "Right, let me get my jacket first."'], ['Тебя спрашивают «ты злишься?», а ты просто так выглядишь, когда думаешь.', 'People ask "are you angry?" No, that is just your thinking face.'], ['Твоя реакция на сюжетный поворот, от которого весь кинозал ахнул: лёгкое «хм».', 'Your reaction to a plot twist that made the whole cinema gasp: a mild "hm".'], ['Ты выбираешь кафе так долго, что друзья успевают проголодаться дважды.', 'You choose a café so slowly that your friends get hungry twice.']],
    compat: ['earth', 'air'],
    image: `A cute round water droplet character floating on a calm lake with lily pads and soft ripples, aqua, lavender and pearl palette, ${STYLE}` }),
  oc({ id: 'ether', emoji: '✨', title: ['Эфир', 'Aether'], profile: { E: 0.5, N: 0.5, O: 0.9, C: 0.25 },
    summary: [['Воображение без границ', 'Imagination without limits'], ['Видишь связи там, где другие видят хаос', 'You see connections where others see chaos'], ['Немного не от мира сего — и это комплимент', 'A little otherworldly, and that is a compliment'], ['Пятый элемент Аристотеля', 'Aristotle\'s fifth element']],
    detailed: ['Ты — эфир: мечтательный, необычный и бесконечно любопытный. В терминах «Большой пятёрки» у тебя очень высокая открытость опыту и довольно свободное отношение к планам и порядку. Тебя вдохновляют идеи, искусство, странные факты и вопросы, на которые нет ответа.\n\nАристотель считал, что четырёх земных стихий мало: небесные тела, по его мнению, состоят из особого пятого элемента — эфира, вечного и неизменного. Средневековые учёные называли его quinta essentia, «пятая сущность», — отсюда наше слово «квинтэссенция». Это не темперамент из классической четвёрки, поэтому мы связали эфир не с эмоциональностью, а с открытостью опыту — чертой, которой у древних просто не было названия.\n\nТвоя сила — воображение и способность придумывать то, чего ещё нет. Зона роста — заземление: выбирай одну идею из десяти и доводи её до реальности. Небо — твой дом, но строить что-то приходится на земле.',
      'You are aether: dreamy, unusual and endlessly curious. In Big Five terms you have very high openness to experience and a pretty relaxed attitude to plans and order. You are inspired by ideas, art, strange facts and questions that have no answer.\n\nAristotle thought four earthly elements were not enough: the heavenly bodies, he argued, are made of a special fifth element, aether, eternal and unchanging. Medieval scholars called it quinta essentia, the "fifth essence", which gave us the word "quintessence". It is not one of the classical four temperaments, so we link aether not to emotionality but to openness, a trait the ancients had no name for.\n\nYour strength is imagination and the ability to invent what does not exist yet. Your growth edge is grounding: pick one idea in ten and bring it into reality. The sky is your home, but building happens on the ground.'],
    strengths: [['Воображение', 'Imagination'], ['Оригинальность', 'Originality'], ['Широта интересов', 'Wide interests'], ['Интуиция', 'Intuition']],
    growth: [['Доводить идеи до воплощения', 'Turn ideas into reality'], ['Иногда проверять, какой сегодня день недели', 'Occasionally check what day of the week it is']],
    funny: [['«Я на пять минут загуглю» → через два часа ты знаешь всё о брачных ритуалах глубоководных рыб.', '"Just a quick google" → two hours later you know everything about the mating rituals of deep-sea fish.'], ['Твои заметки в телефоне: список покупок, идея для романа и вопрос «а что, если время — это суп?».', 'Your notes app: a shopping list, an idea for a novel and "what if time is soup?".'], ['Ты не опаздываешь — ты просто живёшь в своём часовом поясе.', 'You are not late, you just live in your own time zone.'], ['Друзья: «О чём думаешь?» Ты: «Да так, о том, снятся ли рыбам сны».', 'Friends: "What are you thinking about?" You: "Oh, just whether fish dream."']],
    compat: ['fire', 'air'],
    image: `A cute glowing star-sprite character floating among swirling iridescent stardust and tiny planets, lilac, pink and pearl palette, ${STYLE}` }),
  oc({ id: 'metal', emoji: '⚙️', title: ['Металл', 'Metal'], profile: { E: 0.5, N: 0.3, O: 0.3, C: 0.9 },
    summary: [['Дисциплина, ясность и принципы', 'Discipline, clarity and principles'], ['Слово — как сталь: сказал — сделал', 'Your word is steel: said it, did it'], ['Порядок — твоя форма заботы', 'Order is how you show care'], ['Стихия из китайской системы у-син', 'An element from the Chinese wuxing system']],
    detailed: ['Ты — металл: собранный, принципиальный и надёжный. В терминах «Большой пятёрки» у тебя очень высокая добросовестность и неплохая эмоциональная устойчивость, а к новинкам ты относишься прагматично: сначала докажите, что это работает. Ты держишь слово, ценишь ясность и не любишь, когда всё делается «как-нибудь».\n\nМеталла нет среди греческих стихий: он пришёл из другой традиции — китайской системы у-син («пяти фаз»): дерево, огонь, земля, металл и вода. Там металл связывали с осенью, западом, чёткостью и завершённостью. Это не научная модель личности, а древняя классификация природы, поэтому мы честно сопоставили металл с современной чертой — добросовестностью, одним из самых надёжных предикторов успеха в учёбе и работе.\n\nТвоя сила — организованность и честность: на тебя можно опереться. Зона роста — гибкость. Даже самая прочная сталь закаляется в огне: иногда позволяй плану поменяться, а людям — сделать по-своему.',
      'You are metal: focused, principled and reliable. In Big Five terms you have very high conscientiousness and good emotional stability, and you are pragmatic about novelty: prove that it works first. You keep your word, value clarity and dislike things done any old way.\n\nMetal is not one of the Greek elements. It comes from a different tradition, the Chinese wuxing ("five phases") system: wood, fire, earth, metal and water. There metal was linked to autumn, the west, clarity and completion. That is an ancient classification of nature, not a scientific personality model, so we openly match metal to a modern trait: conscientiousness, one of the most reliable predictors of success at school and work.\n\nYour strength is organisation and integrity: people can lean on you. Your growth edge is flexibility. Even the strongest steel is tempered in fire, so sometimes let the plan change and let people do things their own way.'],
    strengths: [['Дисциплина', 'Discipline'], ['Надёжность', 'Reliability'], ['Ясность мышления', 'Clear thinking'], ['Принципиальность', 'Integrity']],
    growth: [['Пробовать новое, не дожидаясь гарантий', 'Try new things without guarantees'], ['Прощать себе и другим мелкие ошибки', 'Forgive small mistakes, yours and others\'']],
    funny: [['Твой список дел на выходные содержит пункт «отдохнуть (14:00–15:30)».', 'Your weekend to-do list includes "relax (2:00–3:30 p.m.)".'], ['Фраза «давай как-нибудь по ходу разберёмся» вызывает у тебя лёгкий нервный тик.', 'The phrase "let\'s just figure it out as we go" gives you a slight eye twitch.'], ['Ты единственный человек в группе, который читал инструкцию. До покупки.', 'You are the only person in the group who read the manual. Before buying the thing.'], ['Твои папки на компьютере называются «2024_проекты_финал_проверено». И это действительно финал.', 'Your folders are named "2024_projects_final_checked". And they really are final.']],
    compat: ['earth', 'water'],
    image: `A cute shiny little robot-like metal sphere character with a tiny gear crown and a neat checklist, silver, mint and soft blue palette, ${STYLE}` })
];

const methodology = L(
`### Что это за тест
Развлекательный тест о **темпераменте**. 15 ситуаций оцениваются по четырём шкалам: экстраверсия (E), эмоциональная реактивность / нейротизм (N), открытость опыту (O) и добросовестность (C). Четыре классические стихии определяются в основном двумя первыми осями, а «эфир» и «металл» — двумя дополнительными.

### Историческая линия — честно
1. **Эмпедокл (V в. до н. э.)** описал четыре «корня» мира: огонь, воздух, воду и землю.
2. **Гиппократовская медицина** (трактат «О природе человека») связала здоровье с балансом четырёх «соков»: крови, жёлтой желчи, чёрной желчи и флегмы. Каждый сок соотносили с парой качеств (тёплое/холодное, сухое/влажное), стихией и временем года: кровь — воздух — весна; жёлтая желчь — огонь — лето; чёрная желчь — **земля** — осень; флегма — **вода** — зима.
3. **Гален (II в. н. э.)** развил учение о «смешениях» (temperamentum — «смесь») и описал девять вариантов темперамента; привычная «четвёрка» личностных типов — сангвиник, холерик, меланхолик, флегматик — окончательно оформилась позже, в средневековой и ренессансной традиции (Stelmack & Stalikas, 1991; Kagan, 1994).
4. **Кант** (1798) и **Вундт** (1874/1903) превратили типы в психологические описания; Вундт расположил их на двух осях — сила и скорость эмоций.
5. **Павлов** связал четыре типа со свойствами нервной системы (сила, уравновешенность, подвижность) — эта линия стала классикой отечественной психологии индивидуальных различий (Ильин, 2004).
6. **Айзенк** показал, что четыре типа удобно ложатся в квадранты двух измеряемых черт — экстраверсии и нейротизма: холерик = E+N+, сангвиник = E+N−, меланхолик = E−N+, флегматик = E−N− (Eysenck & Eysenck, 1985). Эти же две черты входят в «Большую пятёрку».

**Важно:** гуморальная теория как объяснение физиологии давно опровергнута — никакой «чёрной желчи» в характере нет. Научной ценностью обладают лишь описательные наблюдения, которые современная психология измеряет совсем другими инструментами. **Эфир** (пятый элемент Аристотеля) и **металл** (из китайской системы у-син) в классическую четвёрку не входят; мы добавили их ради игры и честно привязали к открытости опыту и добросовестности.

Многие популярные сайты связывают флегматика с землёй, а меланхолика — с водой. В античной схеме было наоборот: меланхолия — холодная и сухая, как земля; флегма — холодная и влажная, как вода. Мы следуем первоисточникам.

### Ограничения
Вопросы оригинальные; тест не валидирован, надёжность не измерялась. Для научной оценки экстраверсии и нейротизма используй валидированные опросники (например, шкалы «Большой пятёрки» из открытого пула IPIP).

### Как считается результат
Каждый ответ даёт от −2 до +2 баллов по одной-трём шкалам. Суммы переводятся в шкалу 0–1, и выбирается стихия, чей профиль ближе всего к твоему (евклидово расстояние). Профили откалиброваны симуляцией случайных ответов, так что все шесть стихий выпадают примерно с равной частотой.`,
`### What this quiz is
An entertainment quiz about **temperament**. 15 situations are scored on four scales: extraversion (E), emotional reactivity / neuroticism (N), openness (O) and conscientiousness (C). The four classical elements are defined mainly by the first two axes; "aether" and "metal" by the two extra ones.

### The historical lineage, honestly
1. **Empedocles (5th c. BCE)** described four "roots" of the world: fire, air, water and earth.
2. **Hippocratic medicine** (the treatise On the Nature of Man) tied health to the balance of four humours: blood, yellow bile, black bile and phlegm. Each humour was paired with qualities (hot/cold, dry/moist), an element and a season: blood — air — spring; yellow bile — fire — summer; black bile — **earth** — autumn; phlegm — **water** — winter.
3. **Galen (2nd c. CE)** developed the doctrine of mixtures (temperamentum, "mixture") and described nine temperaments; the familiar four personality types — sanguine, choleric, melancholic, phlegmatic — took their final shape later, in medieval and Renaissance tradition (Stelmack & Stalikas, 1991; Kagan, 1994).
4. **Kant** (1798) and **Wundt** (1874/1903) turned the types into psychological descriptions; Wundt placed them on two axes, the strength and the speed of emotions.
5. **Pavlov** linked the four types to properties of the nervous system (strength, balance, mobility), a line that became classic in Russian differential psychology (Ilyin, 2004).
6. **Eysenck** showed the four types fit neatly into the quadrants of two measurable traits, extraversion and neuroticism: choleric = E+N+, sanguine = E+N−, melancholic = E−N+, phlegmatic = E−N− (Eysenck & Eysenck, 1985). Both traits are part of the Big Five.

**Important:** humoral theory as an explanation of physiology was disproved long ago; there is no "black bile" in anyone's character. Only the descriptive observations have value, and modern psychology measures them with entirely different tools. **Aether** (Aristotle's fifth element) and **metal** (from the Chinese wuxing system) are not part of the classical four; we added them for fun and openly tied them to openness and conscientiousness.

Many pop sites pair the phlegmatic with earth and the melancholic with water. The ancient scheme was the other way round: melancholy is cold and dry, like earth; phlegm is cold and moist, like water. We follow the original sources.

### Limitations
The questions are original; the quiz is not validated and its reliability has not been measured. For a scientific measure of extraversion and neuroticism, use validated inventories (e.g., Big Five scales from the public-domain IPIP).

### How the result is computed
Each answer adds −2 to +2 points on one to three scales. Totals are rescaled to 0–1, and you get the element whose profile is closest to yours (Euclidean distance). Profiles were calibrated by simulating random answers, so all six elements come up about equally often.`);

module.exports = {
  dimOrder: ['E', 'N', 'O', 'C'], dimDefs: BIG5,
  def: {
    id: 'element', category: 'fun', kind: 'choice', seriousness: 'fun',
    title: L('Какая ты стихия?', 'Which element are you?'),
    tagline: L('Огонь, вода, земля, воздух — или что-то пореже? Тест по мотивам 2500-летней теории темпераментов', 'Fire, water, earth, air, or something rarer? A quiz based on a 2,500-year-old theory of temperament'),
    description: L('От Эмпедокла и Гиппократа до Павлова и Айзенка люди пытались разделить характеры на четыре типа. Пройди 15 ситуаций — и узнай свою стихию, свой классический темперамент и то, как его описывает современная психология.',
      'From Empedocles and Hippocrates to Pavlov and Eysenck, people have tried to sort characters into four types. Go through 15 situations to find your element, your classical temperament and how modern psychology describes it.'),
    emoji: '🔥', durationMin: 4, popularity: 4,
    tags: [L('темперамент', 'temperament'), L('стихии', 'elements'), L('история психологии', 'history of psychology'), L('развлечение', 'fun')],
    methodology,
    sources: [
      { citation: 'Stelmack, R. M., & Stalikas, A. (1991). Galen and the humour theory of temperament. Personality and Individual Differences, 12(3), 255–263.' },
      { citation: 'Kagan, J. (1994). Galen\'s prophecy: Temperament in human nature. New York: Basic Books (paperback ed. Westview Press, 1998).' },
      { citation: 'Eysenck, H. J., & Eysenck, M. W. (1985). Personality and individual differences: A natural science approach. New York: Plenum Press.' },
      { citation: 'Eysenck, H. J. (1967). The biological basis of personality. Springfield, IL: Charles C. Thomas.' },
      { citation: 'Strelau, J. (1998). Temperament: A psychological perspective. New York: Plenum Press.' },
      { citation: 'Ильин, Е. П. (2004). Психология индивидуальных различий. СПб.: Питер.' },
      { citation: 'Lumen Learning. Introduction to Psychology: Eysenck personality dimensions (figure mapping the four temperaments onto extraversion and stability).', url: 'https://content.one.lumenlearning.com/introductiontopsychology/chapter/learn-it-eysenck-personality-dimensions/' },
      { citation: 'Goldberg, L. R., Johnson, J. A., Eber, H. W., Hogan, R., Ashton, M. C., Cloninger, C. R., & Gough, H. G. (2006). The International Personality Item Pool and the future of public-domain personality measures. Journal of Research in Personality, 40(1), 84–96.', doi: '10.1016/j.jrp.2005.08.007' }
    ],
    license: 'Original content written for testik (all questions and outcome texts are original). Historical theories are described and cited, not reproduced from any copyrighted test.',
    disclaimer: L('Развлекательный тест. Античная теория темпераментов — часть истории психологии, а не современная наука; результат не является психологической диагностикой.', 'Entertainment quiz. The ancient theory of temperaments is part of the history of psychology, not modern science; your result is not a psychological assessment.'),
    instructions: L('Отвечай так, как обычно поступаешь в жизни, а не как «было бы правильно». Первый пришедший в голову вариант обычно самый честный.', 'Answer the way you usually act in real life, not how you think you should. Your first instinct is usually the most honest one.'),
    questions, outcomes,
    scoringNotes: L('Ответы дают баллы по четырём шкалам: экстраверсия (E), эмоциональная реактивность (N), открытость (O) и добросовестность (C). Каждая сумма переводится в шкалу 0–1: (балл − минимум) / (максимум − минимум). Затем выбирается стихия, чей профиль ближе всего (евклидово расстояние). Огонь ≈ E+N+, воздух ≈ E+N−, земля ≈ E−N+, вода ≈ E−N−, эфир ≈ высокая O, металл ≈ высокая C.',
      'Answers add points on four scales: extraversion (E), emotional reactivity (N), openness (O) and conscientiousness (C). Each total is rescaled to 0–1: (score − min) / (max − min). You then get the element with the nearest profile (Euclidean distance). Fire ≈ E+N+, air ≈ E+N−, earth ≈ E−N+, water ≈ E−N−, aether ≈ high O, metal ≈ high C.'),
    resultIntro: L('Твоя стихия определена! Древние объясняли её «соками» тела, мы — чертами личности. Первое — история, второе — наука.', 'Your element is revealed! The ancients explained it with bodily humours; we use personality traits. The first is history, the second is science.')
  }
};

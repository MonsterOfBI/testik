const { L, o, q } = require('./common');
const P = a => a.map(([ru, en]) => L(ru, en));
const oc = x => ({
  id: x.id, title: L(...x.title), emoji: x.emoji, profile: x.profile,
  summary: P(x.summary), detailed: L(...x.detailed), strengths: P(x.strengths), growth: P(x.growth),
  funnyExamples: P(x.funny), compatibleWith: x.compat, imagePrompt: x.image
});
const STYLE = 'soft pastel colors, glossy flat-3D style, smooth gradient background, cute chibi superhero, minimal, high detail, no text';

// Superpower -> VIA virtue scores (main strength's virtue 2, secondary strength's virtue 1)
const S = {
  telepathy: { humanity: 2, wisdom: 1 }, healing: { humanity: 2, temperance: 1 },
  'time-control': { temperance: 2, courage: 1 }, invisibility: { temperance: 2, wisdom: 1 },
  'super-strength': { courage: 2, justice: 1 }, teleportation: { wisdom: 2, courage: 1 },
  shapeshifting: { wisdom: 2, transcendence: 1 }, precognition: { wisdom: 2, temperance: 1 },
  'force-field': { justice: 2, humanity: 1 }, magnetism: { justice: 2, courage: 1 },
  flight: { transcendence: 2, courage: 1 }, light: { transcendence: 2, humanity: 1 }
};
const a = (k, ru, en) => o(ru, en, { ...S[k] });

const questions = [
  q('q1', 'Утро понедельника, всё валится из рук. Как ты спасаешь день?', 'Monday morning and everything is going wrong. How do you save the day?', [
    a('time-control', 'Составляю план по пунктам и иду по нему, не отвлекаясь', 'Write a step-by-step plan and follow it without distraction'),
    a('telepathy', 'Замечаю, что коллегам тоже тяжело, и зову всех за кофе', 'Notice my colleagues are struggling too and invite everyone for coffee'),
    a('super-strength', 'Беру самую неприятную задачу и делаю её первой — дальше легче', 'Take the nastiest task and do it first. It gets easier from there'),
    a('shapeshifting', 'Превращаю хаос в игру: придумываю, как сделать скучное смешным', 'Turn the chaos into a game and find a way to make boring things funny'),
    a('force-field', 'Собираю команду и честно делю задачи, чтобы никто не тонул в одиночку', 'Gather the team and split tasks fairly so nobody drowns alone'),
    a('light', 'Нахожу пять минут посмотреть на небо и вспомнить, что в жизни есть хорошего', 'Take five minutes to look at the sky and remember what is good in life')
  ]),
  q('q2', 'У тебя свободный день в незнакомом городе.', 'You have a free day in an unfamiliar city.', [
    a('teleportation', 'Хочу всё и сразу: рынок, крыши, странные музеи и местная еда', 'I want it all: the market, rooftops, weird museums and local food'),
    a('flight', 'Встаю на рассвете и иду туда, откуда виден весь город', 'Get up at dawn and head to a spot where you can see the whole city'),
    a('precognition', 'Заранее читаю об истории города, чтобы понимать, что вижу', 'Read up on the city\'s history first, so I understand what I am seeing'),
    a('healing', 'Звоню близким по видео и показываю всё — радость нужно делить', 'Video-call my loved ones and show them everything. Joy is for sharing'),
    a('invisibility', 'Брожу без цели, сливаюсь с местными и наблюдаю за жизнью', 'Wander aimlessly, blend in with the locals and watch life go by'),
    a('magnetism', 'Собираю попутчиков из хостела и веду всех на прогулку', 'Round up people from the hostel and lead everyone on a walk')
  ]),
  q('q3', 'В общем чате начинают высмеивать одного человека.', 'People in a group chat start mocking someone.', [
    a('super-strength', 'Прямо пишу: «Хватит, это не смешно» — даже если окажусь в меньшинстве', 'Write straight out: "Stop, this isn\'t funny", even if I end up in the minority'),
    a('telepathy', 'Пишу этому человеку в личку: «Ты как? Я на твоей стороне»', 'Message that person privately: "Are you okay? I\'m on your side"'),
    a('magnetism', 'Меняю тему и задаю чату новый тон — за мной обычно подтягиваются', 'Change the subject and set a new tone. People usually follow my lead'),
    a('precognition', 'Прикидываю, к чему это приведёт, и спокойно объясняю, почему так не стоит', 'Think through where this is heading and calmly explain why it is a bad idea'),
    a('invisibility', 'Не устраиваю сцен, но тихо сообщаю тому, кто может это остановить', 'Avoid a scene, but quietly tell someone who can put a stop to it'),
    a('light', 'Напоминаю всем, что за экраном живой человек, и пишу о нём что-то хорошее', 'Remind everyone there is a real person behind the screen and say something nice about them')
  ]),
  q('q4', 'Внезапно выпала целая свободная неделя.', 'You suddenly get a whole free week.', [
    a('healing', 'Навещаю бабушку, друзей и всех, по кому соскучилась душа', 'Visit grandma, friends and everyone my heart has been missing'),
    a('time-control', 'Наконец-то закрываю все хвосты и запускаю новую полезную привычку', 'Finally clear my backlog and start a new healthy habit'),
    a('teleportation', 'Покупаю билет в страну, где ещё ни разу не было моих ног', 'Buy a ticket to a country I have never set foot in'),
    a('shapeshifting', 'Пробую себя в новом: импровизация, гончарка, диджеинг', 'Try something new: improv, pottery, DJing'),
    a('force-field', 'Помогаю волонтёрам или соседям с общим делом', 'Help volunteers or neighbours with a shared project'),
    a('flight', 'Мечтаю по-крупному и рисую карту желаний на год вперёд', 'Dream big and draw a vision board for the year ahead')
  ]),
  q('q5', 'Близкий друг провалил важное собеседование.', 'A close friend has bombed an important job interview.', [
    a('telepathy', 'Понимаю по одному «привет» в трубке, что что-то случилось', 'I can tell from a single "hi" on the phone that something is wrong'),
    a('time-control', 'Помогаю составить план подготовки к следующему разу', 'Help put together a preparation plan for next time'),
    a('super-strength', 'Честно говорю, что пошло не так, — правда поможет в следующий раз', 'Tell them honestly what went wrong. The truth will help next time'),
    a('shapeshifting', 'Смешу до слёз альтернативной версией событий, где интервьюер был драконом', 'Make them laugh with an alternative version where the interviewer was a dragon'),
    a('force-field', 'Собираю общих друзей, чтобы поддержать все вместе', 'Gather our friends so we can all support them together'),
    a('light', 'Напоминаю, что одна неудача не определяет человека, и вместе ищем в этом смысл', 'Remind them one failure does not define a person, and help find meaning in it')
  ]),
  q('q6', 'Стартует новый большой и сложный проект.', 'A big, tough new project is kicking off.', [
    a('magnetism', 'Беру роль лидера — кто-то же должен вести', 'Take the lead. Someone has to'),
    a('precognition', 'Сразу вижу, где проект может споткнуться, и предупреждаю заранее', 'Immediately see where it might stumble and flag it early'),
    a('teleportation', 'Загораюсь: новое! Хочу разобраться во всём сразу', 'Light up: something new! I want to understand all of it at once'),
    a('invisibility', 'Тихо делаю свою часть на отлично и не жду аплодисментов', 'Quietly do my part brilliantly, no applause needed'),
    a('healing', 'Слежу, чтобы никто в команде не выгорел', 'Make sure nobody on the team burns out'),
    a('flight', 'Верю, что получится круто, и заражаю этой верой остальных', 'Believe it will be amazing and infect everyone with that belief')
  ]),
  q('q7', 'Что тебе чаще всего говорят люди?', 'What do people tell you most often?', [
    a('telepathy', '«Ты что, мысли читаешь?»', '"Can you read minds or something?"'),
    a('super-strength', '«Как тебе не страшно?»', '"How are you not scared?"'),
    a('magnetism', '«Веди, мы за тобой»', '"Lead the way, we\'re right behind you"'),
    a('precognition', '«Надо было тебя послушать»', '"We should have listened to you"'),
    a('invisibility', '«Подожди, это всё сделано тобой? Даже незаметно было»', '"Wait, you did all this? We didn\'t even notice"'),
    a('light', '«С тобой я начинаю замечать красоту вокруг»', '"Around you I start noticing how beautiful things are"')
  ]),
  q('q8', 'Тебя просят устроить праздник для большой компании.', 'You are asked to throw a party for a big group.', [
    a('healing', 'Слежу, чтобы всем было уютно и никто не скучал в углу', 'Make sure everyone is comfy and nobody is bored in a corner'),
    a('time-control', 'Таймлайн, бюджет, список покупок — всё под контролем', 'Timeline, budget, shopping list. All under control'),
    a('teleportation', 'Тема «вокруг света»: еда из десяти стран и музыка со всего мира', 'Theme: around the world, with food from ten countries and music from everywhere'),
    a('shapeshifting', 'Безумная концепция с костюмами, квестом и сюрпризами', 'A wild concept with costumes, a quest and surprises'),
    a('force-field', 'Делю обязанности по-честному, чтобы никто не устал больше других', 'Split the jobs fairly so nobody gets more tired than the rest'),
    a('flight', 'Будет волшебно! Я в этом ни секунды не сомневаюсь', 'It will be magical! I do not doubt it for a second')
  ]),
  q('q9', 'Какое кино ты пересматриваешь чаще всего?', 'What kind of film do you rewatch most?', [
    a('telepathy', 'Драмы о сложных отношениях — люблю разгадывать, что чувствуют герои', 'Dramas about complicated relationships. I love decoding what the characters feel'),
    a('time-control', 'Историю спортсмена, который годами шёл к цели', 'The story of an athlete who worked towards a goal for years'),
    a('super-strength', 'Боевик, где герой встаёт на защиту слабых', 'An action film where the hero stands up for the vulnerable'),
    a('shapeshifting', 'Безумную комедию или мультфильм с неожиданными поворотами', 'A crazy comedy or an animated film full of twists'),
    a('force-field', 'Фильм о команде, которая побеждает вместе', 'A film about a team that wins together'),
    a('light', 'Красивое неспешное кино, после которого хочется жить', 'A beautiful, slow film that makes you want to live')
  ]),
  q('q10', 'На скамейке лежит кошелёк с деньгами и документами.', 'A wallet with cash and ID is lying on a bench.', [
    a('precognition', 'Прикидываю, где владелец мог его потерять, и действую по логике', 'Work out where the owner probably lost it and act logically'),
    a('invisibility', 'Отношу в бюро находок и никому об этом не рассказываю', 'Hand it in to lost property and tell nobody'),
    a('healing', 'Представляю, как человек сейчас переживает, и сразу ищу его в соцсетях', 'Picture how worried the owner must be and look them up online right away'),
    a('magnetism', 'Подключаю всех вокруг — через час владелец найден', 'Get everyone around involved. The owner is found within the hour'),
    a('teleportation', 'Это же детектив! Изучаю каждую карточку — интересно, кто он', 'It\'s a mystery! I study every card. Who is this person?'),
    a('flight', 'Верю, что владелец найдётся, — и помогаю этому случиться', 'Believe the owner will be found, and help make it happen')
  ]),
  q('q11', 'Твоё отношение к правилам:', 'Your attitude to rules:', [
    a('super-strength', 'Если правило несправедливо, я скажу об этом вслух', 'If a rule is unfair, I will say so out loud'),
    a('telepathy', 'Смотрю, как правило влияет на людей, — важно, чтобы никому не было плохо', 'I look at how a rule affects people. Nobody should be hurt by it'),
    a('magnetism', 'Правила нужны, и я не против их устанавливать', 'Rules are needed, and I do not mind being the one who sets them'),
    a('precognition', 'Сначала разбираюсь, зачем правило вообще придумали', 'First I figure out why the rule exists at all'),
    a('invisibility', 'Соблюдаю без лишнего шума', 'I follow them without fuss'),
    a('light', 'Главное — дух правила, а не буква', 'The spirit of a rule matters more than its letter')
  ]),
  q('q12', 'Что ты делаешь, когда злишься?', 'What do you do when you are angry?', [
    a('healing', 'Остываю и прощаю — носить обиды слишком тяжело', 'Cool down and forgive. Carrying grudges is too heavy'),
    a('time-control', 'Считаю до десяти и не принимаю решений на эмоциях', 'Count to ten and never decide anything in the heat of the moment'),
    a('teleportation', 'Иду гулять в новое место — смена обстановки лечит', 'Go for a walk somewhere new. A change of scene heals'),
    a('shapeshifting', 'Шучу над ситуацией, пока она не перестанет злить', 'Joke about it until it stops being annoying'),
    a('force-field', 'Разбираюсь по справедливости: кто прав, кто нет и как всё исправить', 'Sort it out fairly: who is right, who is not and how to fix it'),
    a('flight', 'Злюсь недолго — верю, что всё наладится', 'Stay angry only briefly. I trust things will work out')
  ]),
  q('q13', 'Вы в походе, и погода резко портится.', 'You are on a hike and the weather suddenly turns.', [
    a('telepathy', 'Замечаю, кто в группе испугался, и иду рядом с ним', 'Notice who in the group is scared and walk next to them'),
    a('time-control', 'Сохраняю спокойствие и действую по чек-листу безопасности', 'Stay calm and work through the safety checklist'),
    a('super-strength', 'Забираю рюкзак у самого уставшего и иду первым', 'Take the most tired person\'s backpack and lead the way'),
    a('shapeshifting', 'Придумываю, как соорудить укрытие из плаща и палок', 'Figure out how to build a shelter from a raincoat and sticks'),
    a('force-field', 'Слежу, чтобы группа держалась вместе и никто не отстал', 'Keep the group together so nobody falls behind'),
    a('light', 'Даже под ливнем замечаю, как красиво клубятся облака над горами', 'Even in a downpour, I notice how beautiful the clouds look over the mountains')
  ]),
  q('q14', 'Какое хобби тебе ближе всего?', 'Which hobby suits you best?', [
    a('precognition', 'Шахматы, стратегии, головоломки', 'Chess, strategy games, puzzles'),
    a('invisibility', 'Уличная фотография: незаметно ловить живые моменты', 'Street photography: quietly catching real moments'),
    a('healing', 'Волонтёрство — с животными или людьми', 'Volunteering, with animals or people'),
    a('magnetism', 'Собрать свой клуб, сообщество или турнир', 'Starting my own club, community or tournament'),
    a('teleportation', 'Путешествия и новые языки', 'Travel and learning languages'),
    a('flight', 'Бег, танцы — всё, что даёт ощущение полёта', 'Running, dancing, anything that feels like flying')
  ]),
  q('q15', 'Какой вопрос тебе интереснее всего?', 'Which question fascinates you most?', [
    a('telepathy', 'Почему люди поступают так, как поступают?', 'Why do people do what they do?'),
    a('super-strength', 'Хватит ли у меня смелости на то, о чём я мечтаю?', 'Do I have the courage for what I dream of?'),
    a('magnetism', 'Как собрать людей вокруг большой цели?', 'How do you unite people around a big goal?'),
    a('precognition', 'Что будет через десять лет — и как к этому подготовиться?', 'What will the world be like in ten years, and how do I prepare?'),
    a('invisibility', 'Как жить хорошо, не привлекая лишнего внимания?', 'How do you live well without drawing attention?'),
    a('light', 'В чём смысл всего этого?', 'What is the meaning of it all?')
  ]),
  q('q16', 'За что ты себя хвалишь?', 'What do you give yourself credit for?', [
    a('healing', 'За то, что не прохожу мимо, когда кому-то плохо', 'Never walking past when someone is hurting'),
    a('time-control', 'За то, что довожу дела до конца', 'Finishing what I start'),
    a('teleportation', 'За то, что не боюсь нового', 'Not being afraid of new things'),
    a('shapeshifting', 'За нестандартные идеи', 'Coming up with unconventional ideas'),
    a('force-field', 'За то, что со мной всё по-честному', 'Being fair with everyone'),
    a('flight', 'За то, что не теряю надежду', 'Never losing hope')
  ])
];

const prof = k => { const p = { wisdom: 0.4, courage: 0.4, humanity: 0.4, justice: 0.4, temperance: 0.4, transcendence: 0.4 }; const ks = Object.keys(S[k]); p[ks[0]] = 0.85; if (ks[1]) p[ks[1]] = 0.65; return p; };

const outcomes = [
  oc({ id: 'telepathy', emoji: '🧠', title: ['Телепатия', 'Telepathy'], profile: prof('telepathy'),
    summary: [['Читаешь людей как открытую книгу', 'You read people like an open book'], ['Понимаешь чувства без слов', 'You understand feelings without words'], ['Сильная сторона: социальный интеллект', 'Core strength: social intelligence'], ['Добродетель VIA: человечность', 'VIA virtue: humanity']],
    detailed: ['Твоя суперсила — телепатия. Нет, ты не слышишь чужие мысли (наверное), но замечаешь то, что другие пропускают: дрогнувший голос, паузу перед «всё нормально», взгляд, который говорит больше слов. Люди рядом с тобой чувствуют себя понятыми.\n\nВ классификации сильных сторон характера Питерсона и Селигмана (VIA) это **социальный интеллект** — умение понимать мотивы и чувства других людей и свои собственные. Он относится к добродетели «человечность» вместе с добротой и способностью любить. В исследованиях социальный интеллект заметно связан с общительностью — одной из граней экстраверсии.\n\nКак прокачать: используй силу осознанно. Иногда лучше спросить «я правильно понимаю, что…?», чем действовать по догадке. И не забывай включать телепатию на себя — твои собственные чувства тоже важны.',
      'Your superpower is telepathy. No, you probably cannot hear thoughts, but you notice what others miss: a wobble in someone\'s voice, the pause before "I\'m fine", a look that says more than words. People feel understood around you.\n\nIn Peterson and Seligman\'s classification of character strengths (VIA) this is **social intelligence**: understanding the motives and feelings of others, and your own. It belongs to the virtue of humanity, alongside kindness and the capacity to love. In research, social intelligence is clearly linked to sociability, one facet of extraversion.\n\nHow to level up: use your power consciously. Sometimes asking "am I right that…?" beats acting on a hunch. And remember to point your telepathy at yourself. Your own feelings matter too.'],
    strengths: [['Эмпатия', 'Empathy'], ['Тонкая наблюдательность', 'Keen observation'], ['Умение поддержать', 'Knowing how to comfort'], ['Дипломатичность', 'Tact']],
    growth: [['Проверять догадки вопросом', 'Checking hunches with a question'], ['Не брать на себя чужие эмоции', 'Not absorbing other people\'s emotions']],
    funny: [['Друг: «Всё нормально». Ты: «Так, рассказывай, что случилось».', 'Friend: "I\'m fine." You: "Right, tell me what happened."'], ['Ты понимаешь, что пара скоро расстанется, раньше самой пары.', 'You know a couple is about to break up before they do.'], ['Твоё «ты какой-то не такой сегодня» пугает людей сильнее, чем гороскоп.', 'Your "you seem off today" scares people more than their horoscope.'], ['На собеседовании ты по лицу интервьюера понимаешь, что работа твоя. И что кофе у них так себе.', 'In an interview you can tell from the interviewer\'s face that you got the job. And that their coffee is bad.']],
    compat: ['healing', 'light', 'force-field'],
    image: `A cute chibi superhero with a glowing pastel brain-shaped aura and soft rings radiating from their head, holding a tiny heart, lilac and pink palette, ${STYLE}` }),
  oc({ id: 'healing', emoji: '💚', title: ['Исцеление', 'Healing'], profile: prof('healing'),
    summary: [['Рядом с тобой становится легче', 'People feel better around you'], ['Доброта, которая лечит', 'Kindness that heals'], ['Сильные стороны: доброта, любовь, прощение', 'Core strengths: kindness, love, forgiveness'], ['Добродетель VIA: человечность', 'VIA virtue: humanity']],
    detailed: ['Твоя суперсила — исцеление. Ты не заживляешь раны прикосновением (пока), но твоя забота действует почти так же. Чашка чая, вовремя сказанное слово, готовность прийти в три часа ночи — и людям действительно становится легче.\n\nВ классификации VIA за этим стоят **доброта** и **способность любить и быть любимым** (добродетель «человечность»), а также **прощение** — оно относится к добродетели «умеренность». В исследованиях доброта и прощение теснее всего связаны с доброжелательностью из «Большой пятёрки», а любовь — одна из сильных сторон, которые сильнее всего связаны с удовлетворённостью жизнью.\n\nКак прокачать: лечить других получается дольше, если не забываешь про себя. Попробуй на неделю направить свою суперсилу на одного «пациента», о котором часто забываешь, — на себя.',
      'Your superpower is healing. You cannot close wounds with a touch (yet), but your care works almost as well. A cup of tea, the right word at the right moment, a willingness to show up at 3 a.m., and people genuinely feel better.\n\nIn the VIA classification this is **kindness** and the **capacity to love and be loved** (virtue of humanity), plus **forgiveness**, which falls under the virtue of temperance. In research, kindness and forgiveness are most closely tied to Big Five agreeableness, and love is one of the strengths most strongly linked to life satisfaction.\n\nHow to level up: you can heal others for longer if you do not forget yourself. For one week, try pointing your superpower at the patient you neglect most: you.'],
    strengths: [['Доброта', 'Kindness'], ['Умение прощать', 'Forgiveness'], ['Терпение', 'Patience'], ['Тепло', 'Warmth']],
    growth: [['Заботиться о себе так же, как о других', 'Caring for yourself as you care for others'], ['Позволять людям справляться самим', 'Letting people handle things themselves']],
    funny: [['У тебя в сумке есть всё: пластырь, таблетка, конфета и пачка салфеток. Ты ходячая аптечка.', 'Your bag has it all: plasters, painkillers, a sweet and tissues. You are a walking first-aid kit.'], ['Ты извиняешься перед стулом, о который ударился мизинец.', 'You apologise to the chair you stubbed your toe on.'], ['Друзья приходят к тебе пожаловаться, а уходят накормленными, утешенными и с контейнером еды с собой.', 'Friends come to vent and leave fed, comforted and carrying a food container.'], ['Ты прощаешь обидчика раньше, чем он успевает извиниться.', 'You forgave them before they even got around to apologising.']],
    compat: ['telepathy', 'force-field', 'light'],
    image: `A cute chibi superhero with glowing green hands creating sparkling leaves and tiny hearts, healing a small bird, mint and peach palette, ${STYLE}` }),
  oc({ id: 'time-control', emoji: '⏳', title: ['Управление временем', 'Time Control'], profile: prof('time-control'),
    summary: [['Успеваешь то, что другим кажется невозможным', 'You get done what seems impossible to others'], ['Сила воли и фокус', 'Willpower and focus'], ['Сильные стороны: саморегуляция и настойчивость', 'Core strengths: self-regulation and perseverance'], ['Добродетель VIA: умеренность', 'VIA virtue: temperance']],
    detailed: ['Твоя суперсила — управление временем. Ты не останавливаешь часы, но иногда кажется, что у тебя в сутках минимум 30 часов. Ты умеешь сосредоточиться, не отвлекаться на соблазны и доводить дела до конца, даже когда мотивация закончилась.\n\nВ классификации VIA это **саморегуляция** (добродетель «умеренность») и **настойчивость** (добродетель «мужество»). Исследования показывают, что именно эти сильные стороны теснее всего связаны с добросовестностью — чертой «Большой пятёрки», которая надёжно предсказывает успехи в учёбе и работе.\n\nКак прокачать: научись тратить время не только на дела, но и на ничегонеделание. Даже повелителю времени нужен перерыв — иначе вселенная начнёт сбоить.',
      'Your superpower is time control. You cannot stop clocks, but sometimes it looks as if your day has at least 30 hours. You focus, resist temptations and see things through even after motivation has run out.\n\nIn the VIA classification this is **self-regulation** (virtue of temperance) and **perseverance** (virtue of courage). Research shows these strengths are most closely linked to conscientiousness, the Big Five trait that reliably predicts success at school and work.\n\nHow to level up: learn to spend time not only on tasks but also on doing nothing. Even a master of time needs a break, or the universe starts glitching.'],
    strengths: [['Дисциплина', 'Discipline'], ['Фокус', 'Focus'], ['Упорство', 'Persistence'], ['Надёжность', 'Reliability']],
    growth: [['Отдыхать без чувства вины', 'Resting without guilt'], ['Прощать себе сорванные планы', 'Forgiving yourself for broken plans']],
    funny: [['Твой будильник звонит, когда завтрак уже съеден, а пять километров — пробежаны.', 'Your alarm goes off after you have already had breakfast and run five kilometres.'], ['«Я просто быстренько» в твоём исполнении действительно означает быстро.', 'When you say "I\'ll just do it quickly", it actually is quick.'], ['Отчёт сдан за неделю до срока, и ты искренне не понимаешь, почему все так на тебя смотрят.', 'You finished the assignment a week early and cannot understand why everyone is staring.'], ['Ты отказываешься от десерта и спокойно смотришь, как его едят другие. Люди считают это настоящей магией.', 'You turn down dessert and calmly watch others eat it. People consider this actual magic.']],
    compat: ['precognition', 'super-strength', 'invisibility'],
    image: `A cute chibi superhero holding a glowing pastel hourglass with clock hands floating around, calm confident smile, sky blue and gold palette, ${STYLE}` }),
  oc({ id: 'invisibility', emoji: '🫥', title: ['Невидимость', 'Invisibility'], profile: prof('invisibility'),
    summary: [['Делаешь важное без лишнего шума', 'You do important things without fuss'], ['Наблюдаешь и замечаешь', 'You observe and notice'], ['Сильные стороны: скромность и благоразумие', 'Core strengths: humility and prudence'], ['Добродетель VIA: умеренность', 'VIA virtue: temperance']],
    detailed: ['Твоя суперсила — невидимость. Тебе не нужен свет софитов: ты тихо делаешь важную работу, замечаешь то, что упускают другие, и появляешься ровно тогда, когда нужно. Многие проекты держатся на таких людях — даже если на финальной фотографии их не видно.\n\nВ классификации VIA это **скромность** и **благоразумие** (добродетель «умеренность»): способность не преувеличивать свою роль и не рисковать понапрасну. Скромность как черта характера продолжает изучаться — например, работы Эксклайн и Хилл (2012) связывали её с щедростью; а благоразумие в исследованиях тесно связано с осмотрительностью — гранью добросовестности.\n\nКак прокачать: невидимость — суперсила, а не обязанность. Иногда снимай плащ: говори о своих успехах и позволяй людям тебя благодарить. Тебя ценят больше, чем ты думаешь.',
      'Your superpower is invisibility. You do not need the spotlight: you quietly do important work, notice what others miss and appear exactly when needed. Plenty of projects run on people like you, even if they are not in the final photo.\n\nIn the VIA classification this is **humility** and **prudence** (virtue of temperance): not overstating your role and not taking needless risks. Humility as a character trait is an active research topic; for example, Exline and Hill (2012) linked it to generosity, and prudence is closely linked to deliberation, a facet of conscientiousness.\n\nHow to level up: invisibility is a superpower, not a duty. Take the cloak off sometimes: talk about your wins and let people thank you. You are valued more than you think.'],
    strengths: [['Скромность', 'Humility'], ['Наблюдательность', 'Observation'], ['Осмотрительность', 'Prudence'], ['Надёжность', 'Dependability']],
    growth: [['Заявлять о своих достижениях', 'Speaking up about your achievements'], ['Брать слово на встречах', 'Taking the floor in meetings']],
    funny: [['Половина проекта — твоя работа, а на презентации звучит скромное «а ещё нам помогали…». Ну и ладно.', 'Half the project is your work, and at the presentation all you get is a modest "we also had some help from…". Fine by you.'], ['Ты уходишь с вечеринки по-английски так виртуозно, что твоё отсутствие замечают только через час.', 'You leave parties so stealthily that people only notice an hour later.'], ['В групповом фото тебя всегда наполовину закрывает чья-то голова. И тебя это устраивает.', 'In group photos you are always half-hidden behind someone\'s head. And you are fine with that.'], ['Ты знаешь все офисные новости, хотя ни разу ни о чём не спрашиваешь.', 'You know all the office gossip without ever having asked about anything.']],
    compat: ['precognition', 'time-control', 'telepathy'],
    image: `A cute chibi superhero half-transparent with a shimmering pastel cloak, peeking with a shy smile, little sparkles where they fade, lavender and silver palette, ${STYLE}` }),
  oc({ id: 'super-strength', emoji: '💪', title: ['Суперсила', 'Super Strength'], profile: prof('super-strength'),
    summary: [['Смелость там, где другие отступают', 'Courage where others back down'], ['Встаёшь на защиту слабых', 'You stand up for the vulnerable'], ['Сильные стороны: храбрость и честность', 'Core strengths: bravery and honesty'], ['Добродетель VIA: мужество', 'VIA virtue: courage']],
    detailed: ['Твоя суперсила — сила. Не обязательно физическая (хотя и банку огурцов ты, скорее всего, откроешь): главное — сила духа. Ты говоришь правду, когда это неудобно, и встаёшь на защиту тех, кого обижают, даже если остаёшься в меньшинстве.\n\nВ классификации VIA это **храбрость** и **честность** (добродетель «мужество»). Храбрость — это не отсутствие страха, а действие вопреки ему. Исследования связывают её с социальной смелостью — гранью экстраверсии, а честность — с добросовестностью и честностью-скромностью из модели HEXACO.\n\nКак прокачать: сила раскрывается лучше всего в сочетании с мягкостью. Правду можно говорить так, чтобы её было легче услышать, — тогда твоя сила будет не только защищать, но и объединять.',
      'Your superpower is strength. Not necessarily physical (though you can probably open any jar): the point is strength of spirit. You tell the truth when it is inconvenient and stand up for people who are being picked on, even when you are in the minority.\n\nIn the VIA classification this is **bravery** and **honesty** (virtue of courage). Bravery is not the absence of fear but acting despite it. Research links it to social boldness, a facet of extraversion, and honesty to conscientiousness and to the honesty–humility factor of the HEXACO model.\n\nHow to level up: strength works best with gentleness. Truth can be told in a way that is easier to hear, and then your power will not only protect but also unite.'],
    strengths: [['Смелость', 'Bravery'], ['Честность', 'Honesty'], ['Решительность', 'Decisiveness'], ['Защита своих', 'Protecting others']],
    growth: [['Выбирать, какие битвы того стоят', 'Choosing which battles are worth it'], ['Говорить правду мягче', 'Telling the truth more gently']],
    funny: [['Ночью странный звук на кухне проверяешь именно ты. С тапком наперевес.', 'You are the first to check out a strange noise at night. Armed with a slipper.'], ['Твой отзыв в ресторане начинается со слов «Скажу честно…», и персонал уже нервничает.', 'Your restaurant review starts with "I\'ll be honest…", and the staff are already nervous.'], ['Ты единственный человек, который сказал начальнику, что его идея — так себе. И начальник согласился.', 'You are the only person who told the boss their idea was meh. And the boss agreed.'], ['Пауки в доме знают: если ты дома — лучше переехать.', 'The spiders in your home know: when you are around, it is time to move out.']],
    compat: ['force-field', 'magnetism', 'flight'],
    image: `A cute chibi superhero with a flowing cape lifting a giant fluffy cloud like a dumbbell, confident grin, coral and sunny yellow palette, ${STYLE}` }),
  oc({ id: 'teleportation', emoji: '🌀', title: ['Телепортация', 'Teleportation'], profile: prof('teleportation'),
    summary: [['Любопытство переносит тебя куда угодно', 'Curiosity takes you anywhere'], ['Энергия и жажда нового', 'Energy and hunger for novelty'], ['Сильные стороны: любознательность и жизнелюбие', 'Core strengths: curiosity and zest'], ['Добродетель VIA: мудрость (с энергией мужества)', 'VIA virtue: wisdom, powered by courage']],
    detailed: ['Твоя суперсила — телепортация. Сегодня ты изучаешь японскую кухню, завтра — устройство чёрных дыр, а послезавтра уже покупаешь билет в город, о котором вчера узнал из видео. Тебя невозможно удержать на одном месте — ни телом, ни мыслями.\n\nВ классификации VIA это **любознательность** (добродетель «мудрость и знание») и **жизнелюбие** — энергия и энтузиазм (добродетель «мужество»). Обе силы входят в группу «сильных сторон сердца», которые в исследовании Парка, Питерсона и Селигмана (2004) сильнее всего связаны с удовлетворённостью жизнью. С «Большой пятёркой» они пересекаются через открытость опыту и «живую» грань экстраверсии.\n\nКак прокачать: научись иногда оставаться. Глубокое погружение в одну тему или одно место даёт открытия, которые не найти, прыгая с места на место.',
      'Your superpower is teleportation. Today you are studying Japanese cooking, tomorrow how black holes work, and the day after you are buying a ticket to a city you discovered in a video yesterday. Nobody can keep you in one place, physically or mentally.\n\nIn the VIA classification this is **curiosity** (virtue of wisdom and knowledge) and **zest**, energy and enthusiasm (virtue of courage). Both belong to the "strengths of the heart" that Park, Peterson and Seligman (2004) found most strongly related to life satisfaction. They overlap with the Big Five via openness and the lively facet of extraversion.\n\nHow to level up: learn to stay sometimes. Deep dives into one topic or one place bring discoveries you will never find by jumping around.'],
    strengths: [['Любознательность', 'Curiosity'], ['Энергия', 'Energy'], ['Открытость новому', 'Openness'], ['Лёгкость на подъём', 'Spontaneity']],
    growth: [['Доводить начатое до конца', 'Finishing what you start'], ['Задерживаться на одном месте подольше', 'Staying put a little longer']],
    funny: [['«Где ты?» — самый частый вопрос в твоём телефоне.', '"Where are you?" is the most common message on your phone.'], ['У тебя 14 вкладок про осьминогов, 9 — про древний Рим и одна — с билетами в Исландию.', 'You have 14 tabs about octopuses, 9 about ancient Rome and one with flights to Iceland.'], ['Ты знаешь «спасибо» на 20 языках и используешь их все в одном кафе.', 'You know "thank you" in 20 languages and use them all in one café.'], ['Твоё «я ненадолго» заканчивается через две недели — новым хобби и тремя магнитиками.', 'You said "I won\'t be long" and came back two weeks later with a new hobby.']],
    compat: ['shapeshifting', 'flight', 'magnetism'],
    image: `A cute chibi superhero stepping out of a swirling pastel portal with a tiny suitcase and a map, sparkles and stars around, teal and violet palette, ${STYLE}` }),
  oc({ id: 'shapeshifting', emoji: '🦎', title: ['Превращения', 'Shapeshifting'], profile: prof('shapeshifting'),
    summary: [['Меняешь форму, когда старая не работает', 'You change shape when the old one stops working'], ['Креатив и юмор — твоё оружие', 'Creativity and humour are your weapons'], ['Сильные стороны: креативность и чувство юмора', 'Core strengths: creativity and humour'], ['Добродетель VIA: мудрость (с искрой трансцендентности)', 'VIA virtue: wisdom, with a spark of transcendence']],
    detailed: ['Твоя суперсила — превращения. Ты умеешь посмотреть на задачу под совершенно неожиданным углом, придумать решение из подручных средств и превратить скучное в смешное. Если план А не сработал, у тебя уже готовы планы от Б до Я.\n\nВ классификации VIA это **креативность** (добродетель «мудрость и знание») и **чувство юмора** (добродетель «трансцендентность»). Креативность — одна из немногих сильных сторон, для которых доказан самостоятельный вклад в важные результаты сверх «Большой пятёрки»; при этом она теснее всего связана с открытостью опыту.\n\nКак прокачать: превращения прекрасны, но иногда людям нужна твоя постоянная форма. Найди пару вещей, в которых ты всегда предсказуемо надёжен — это сделает твою гибкость ещё ценнее.',
      'Your superpower is shapeshifting. You can look at a problem from a completely unexpected angle, build a solution out of whatever is lying around and turn the boring into the hilarious. If plan A fails, you already have plans B through Z.\n\nIn the VIA classification this is **creativity** (virtue of wisdom and knowledge) and **humour** (virtue of transcendence). Creativity is one of the strengths shown to predict important outcomes beyond the Big Five, while being most closely tied to openness.\n\nHow to level up: shapeshifting is great, but sometimes people need your steady form. Pick a couple of things in which you are always predictably reliable; it will make your flexibility even more valuable.'],
    strengths: [['Креативность', 'Creativity'], ['Юмор', 'Humour'], ['Гибкость', 'Flexibility'], ['Изобретательность', 'Inventiveness']],
    growth: [['Доводить идеи до результата', 'Turning ideas into results'], ['Быть предсказуемым там, где это важно', 'Being predictable where it counts']],
    funny: [['Ты чинишь очки скрепкой, стол — книгой, а настроение друга — мемом.', 'You fix glasses with a paperclip, a wobbly table with a book and a friend\'s mood with a meme.'], ['На вопрос «как тебе это пришло в голову?» у тебя нет ответа. Оно просто пришло.', 'You have no answer to "how did you think of that?". It just arrived.'], ['Твоё резюме: дизайнер, бариста, аниматор, немного программист и специалист по хорошему настроению.', 'Your CV: designer, barista, kids\' entertainer, a bit of a coder and a specialist in good vibes.'], ['Костюм на маскарад — 20 минут и одна картонная коробка. Первое место — твоё.', 'You turned up to a costume party in an outfit made from a box in 20 minutes. And won.']],
    compat: ['teleportation', 'light', 'precognition'],
    image: `A cute chibi superhero mid-transformation surrounded by swirling pastel shapes, half cat ears and half butterfly wings, playful grin, rainbow pastel palette, ${STYLE}` }),
  oc({ id: 'precognition', emoji: '🔭', title: ['Предвидение', 'Precognition'], profile: prof('precognition'),
    summary: [['Видишь последствия на три шага вперёд', 'You see consequences three steps ahead'], ['К тебе идут за советом', 'People come to you for advice'], ['Сильные стороны: мудрость, здравомыслие, любовь к знаниям', 'Core strengths: perspective, judgment, love of learning'], ['Добродетель VIA: мудрость и знание', 'VIA virtue: wisdom and knowledge']],
    detailed: ['Твоя суперсила — предвидение. Не гадание на кофейной гуще, а умение просчитать, к чему приведёт решение, увидеть картину целиком и заметить подвох раньше всех. Фраза «надо было тебя послушать» звучит в твой адрес подозрительно часто.\n\nВ классификации VIA это **мудрость** (perspective — способность давать дельные советы и видеть общую картину), **здравомыслие** (критическое мышление) и **любовь к учению** — все из добродетели «мудрость и знание», с привкусом **благоразумия**. В исследованиях эти силы связаны с открытостью опыту (любовь к знаниям) и с прилежностью и осмотрительностью — гранями добросовестности.\n\nКак прокачать: предвидение работает лучше, когда ты делишься им бережно. Иногда людям нужно совершить свою ошибку — твоя задача не спасти их от всего, а быть рядом, когда понадобится совет.',
      'Your superpower is precognition. Not fortune telling, but the ability to work out where a decision leads, see the whole picture and spot the catch before anyone else. "We should have listened to you" is something you hear suspiciously often.\n\nIn the VIA classification this is **perspective** (giving wise counsel and seeing the big picture), **judgment** (critical thinking) and **love of learning**, all from the virtue of wisdom and knowledge, with a dash of **prudence**. In research these strengths relate to openness (love of learning) and to diligence and prudence, facets of conscientiousness.\n\nHow to level up: foresight works better when shared gently. Sometimes people need to make their own mistakes; your job is not to save them from everything but to be there when advice is needed.'],
    strengths: [['Мудрость', 'Wisdom'], ['Критическое мышление', 'Critical thinking'], ['Стратегия', 'Strategy'], ['Любовь к знаниям', 'Love of learning']],
    growth: [['Действовать, не просчитав всё до конца', 'Acting before everything is calculated'], ['Давать людям право на ошибку', 'Letting people make mistakes']],
    funny: [['Ты берёшь зонт в солнечный день. Через два часа все завидуют.', 'You bring an umbrella on a sunny day. Two hours later, everyone envies you.'], ['Сериал: «Кто же убийца?» Ты, на 4-й минуте первой серии: «Садовник».', 'TV series: "Who is the killer?" You, four minutes into episode one: "The gardener."'], ['Тебе пишут «можно совет?», а у тебя уже открыта заметка с готовым ответом.', 'Someone texts "can I ask your advice?" and you have already opened a note with the answer.'], ['Ты никогда не злорадствуешь «ну я же говорю!». Просто молча смотришь. И это даже хуже.', 'You never gloat "told you so!". You just look at them in silence. Which is even worse.']],
    compat: ['invisibility', 'time-control', 'telepathy'],
    image: `A cute chibi superhero looking through a glowing pastel telescope at floating constellations shaped like arrows and question marks, navy and lilac palette, ${STYLE}` }),
  oc({ id: 'force-field', emoji: '🛡️', title: ['Силовое поле', 'Force Field'], profile: prof('force-field'),
    summary: [['Защищаешь свою команду', 'You protect your team'], ['Справедливость для всех', 'Fairness for everyone'], ['Сильные стороны: командная работа и справедливость', 'Core strengths: teamwork and fairness'], ['Добродетель VIA: справедливость', 'VIA virtue: justice']],
    detailed: ['Твоя суперсила — силовое поле. Внутри твоего круга людям безопасно: ты следишь, чтобы никого не забыли, задачи делились честно, а слабых не обижали. Ты из тех, кто думает «мы», а не «я».\n\nВ классификации VIA это **командная работа** и **справедливость** (добродетель «справедливость»): умение работать на общее дело и относиться ко всем одинаково честно. Исследования связывают справедливость с альтруизмом и доброжелательностью, а командная работа — одна из сильных сторон, которая хуже всего «описывается» чертами «Большой пятёрки», то есть несёт свою собственную информацию.\n\nКак прокачать: силовое поле требует энергии. Делегируй, проси помощи и помни, что ты тоже часть команды, которую защищаешь.',
      'Your superpower is a force field. People feel safe inside your circle: you make sure nobody is forgotten, tasks are shared fairly and the vulnerable are not picked on. You think "we", not "me".\n\nIn the VIA classification this is **teamwork** and **fairness** (virtue of justice): working for the common good and treating everyone equally fairly. Research links fairness to altruism and agreeableness, while teamwork is one of the strengths least captured by Big Five traits, meaning it carries information of its own.\n\nHow to level up: a force field takes energy. Delegate, ask for help and remember that you are part of the team you protect.'],
    strengths: [['Командность', 'Team spirit'], ['Справедливость', 'Fairness'], ['Надёжность', 'Reliability'], ['Защита своих', 'Protectiveness']],
    growth: [['Не тащить всех на себе', 'Not carrying everyone yourself'], ['Принимать неидеальные компромиссы', 'Accepting imperfect compromises']],
    funny: [['Ты делишь пиццу с точностью до миллиметра. С линейкой, если надо.', 'You split pizza to the millimetre. With a ruler if necessary.'], ['В настолках ты объясняешь правила новичкам и поддаёшься, если кто-то расстроился.', 'At board game night you explain the rules to newbies and go easy if someone gets upset.'], ['Твоё любимое слово в групповом проекте: «давайте проголосуем».', 'Your favourite phrase in group projects: "let\'s vote on it".'], ['Ты заступаешься за коллегу так яростно, что коллега сам просит тебя успокоиться.', 'You defend a colleague so fiercely that the colleague asks you to calm down.']],
    compat: ['super-strength', 'healing', 'magnetism'],
    image: `A cute chibi superhero creating a glowing pastel bubble shield around a group of tiny smiling friends, mint and baby blue palette, ${STYLE}` }),
  oc({ id: 'magnetism', emoji: '🧲', title: ['Магнетизм', 'Magnetism'], profile: prof('magnetism'),
    summary: [['Люди сами тянутся за тобой', 'People are drawn to follow you'], ['Собираешь команду вокруг цели', 'You rally people around a goal'], ['Сильная сторона: лидерство', 'Core strength: leadership'], ['Добродетель VIA: справедливость', 'VIA virtue: justice']],
    detailed: ['Твоя суперсила — магнетизм. Ты говоришь «пойдёмте», и люди идут. Ты умеешь объединить разных людей вокруг общей цели, организовать их и сделать так, чтобы каждый чувствовал себя важной частью команды.\n\nВ классификации VIA это **лидерство** — добродетель «справедливость»: ведь настоящий лидер заботится не о своей славе, а о том, чтобы группа достигла цели и при этом сохранила хорошие отношения. В исследованиях лидерство связано с прилежностью (добросовестностью) и социальной смелостью — гранью экстраверсии.\n\nКак прокачать: сильнейшие лидеры умеют слушать. Попробуй на следующей встрече говорить последним — и посмотри, как вырастет команда.',
      'Your superpower is magnetism. You say "let\'s go" and people go. You bring different people together around a shared goal, organise them and make each of them feel like an important part of the team.\n\nIn the VIA classification this is **leadership**, under the virtue of justice: a true leader cares less about personal glory than about the group reaching its goal while keeping good relationships. In research, leadership is linked to diligence (conscientiousness) and social boldness, a facet of extraversion.\n\nHow to level up: the strongest leaders listen. At your next meeting, try speaking last, and watch the team grow.'],
    strengths: [['Лидерство', 'Leadership'], ['Харизма', 'Charisma'], ['Организаторский талант', 'Organising talent'], ['Уверенность', 'Confidence']],
    growth: [['Слушать больше, чем говорить', 'Listening more than speaking'], ['Давать другим вести', 'Letting others lead']],
    funny: [['Пять минут в лифте — и у вас уже общий чат «Соседи седьмого подъезда».', 'You step into a lift; three floors later there is a group chat called "Building 7 Neighbours".'], ['Становиться старостой в твоих планах не было. Просто все как-то посмотрели на тебя.', 'You never planned to be class rep. Everyone just sort of looked at you.'], ['Твоя фраза «так, народ» мгновенно наводит порядок в любой толпе.', 'Your "right, everyone" instantly brings order to any crowd.'], ['Даже кот дома, кажется, выполняет твои просьбы. Иногда.', 'Even your cat seems to follow your instructions. Sometimes.']],
    compat: ['force-field', 'super-strength', 'teleportation'],
    image: `A cute chibi superhero holding a glowing pastel horseshoe magnet with little hearts and stars drawn toward it, coral and lilac palette, ${STYLE}` }),
  oc({ id: 'flight', emoji: '🕊️', title: ['Полёт', 'Flight'], profile: prof('flight'),
    summary: [['Надежда поднимает тебя над проблемами', 'Hope lifts you above problems'], ['Энергия и вера в лучшее', 'Energy and belief in the best'], ['Сильные стороны: надежда и жизнелюбие', 'Core strengths: hope and zest'], ['Добродетель VIA: трансцендентность', 'VIA virtue: transcendence']],
    detailed: ['Твоя суперсила — полёт. Когда все смотрят под ноги, ты смотришь вверх: веришь, что всё получится, и находишь силы действовать. Твой оптимизм заразителен — рядом с тобой даже понедельник кажется началом чего-то хорошего.\n\nВ классификации VIA это **надежда** (добродетель «трансцендентность») — ожидание лучшего будущего и готовность работать на него — и **жизнелюбие** (добродетель «мужество»). В исследовании Парка, Питерсона и Селигмана (2004) именно надежда и жизнелюбие — вместе с благодарностью, любовью и любознательностью — сильнее всего связаны с удовлетворённостью жизнью. С «Большой пятёркой» эти силы пересекаются через «живую» грань экстраверсии и эмоциональную устойчивость.\n\nКак прокачать: оптимизм крепче, если у него есть план. Пусть надежда задаёт направление, а маленькие конкретные шаги ведут к цели.',
      'Your superpower is flight. When everyone is staring at their feet, you look up: you believe things will work out and find the energy to act. Your optimism is contagious; with you, even a Monday feels like the start of something good.\n\nIn the VIA classification this is **hope** (virtue of transcendence), expecting a good future and working towards it, plus **zest** (virtue of courage). Park, Peterson and Seligman (2004) found that hope and zest, together with gratitude, love and curiosity, are the strengths most strongly linked to life satisfaction. With the Big Five they overlap via the lively facet of extraversion and emotional stability.\n\nHow to level up: optimism is sturdier with a plan. Let hope set the direction and small concrete steps take you there.'],
    strengths: [['Оптимизм', 'Optimism'], ['Энергия', 'Energy'], ['Вдохновение', 'Inspiration'], ['Стойкость', 'Resilience']],
    growth: [['Подкреплять мечты планом', 'Backing dreams with a plan'], ['Замечать реальные риски', 'Noticing real risks']],
    funny: [['Прогноз: 90% дождя. Ты: «Значит, 10% солнца!»', 'Forecast: 90% chance of rain. You: "So, 10% sunshine!"'], ['Ты подбадриваешь даже навигатор, когда он перестраивает маршрут.', 'You cheer on the sat-nav when it recalculates the route.'], ['Твоя доска желаний занимает целую стену. И половина пунктов уже вычеркнута.', 'Your vision board covers a whole wall, and half of it is already ticked off.'], ['Ты танцуешь в очереди в банке. Банк от этого стал добрее.', 'You dance in the bank queue. The bank has become kinder because of it.']],
    compat: ['light', 'teleportation', 'super-strength'],
    image: `A cute chibi superhero soaring through cotton-candy clouds with small feathered wings and a rainbow trail, joyful laugh, sky blue and peach palette, ${STYLE}` }),
  oc({ id: 'light', emoji: '🌟', title: ['Повелитель света', 'Light Bender'], profile: prof('light'),
    summary: [['Видишь красоту там, где другие её не замечают', 'You see beauty others miss'], ['Благодарность и смысл', 'Gratitude and meaning'], ['Сильные стороны: восприятие красоты, благодарность, духовность', 'Core strengths: appreciation of beauty, gratitude, spirituality'], ['Добродетель VIA: трансцендентность', 'VIA virtue: transcendence']],
    detailed: ['Твоя суперсила — управление светом. Ты умеешь подсветить хорошее: красоту заката, доброту случайного прохожего, смысл в трудной ситуации. Рядом с тобой люди начинают замечать, сколько в мире чудесного.\n\nВ классификации VIA это **восприятие красоты и совершенства**, **благодарность** и **духовность** (поиск смысла) — добродетель «трансцендентность», то есть связь с чем-то бо́льшим, чем отдельный человек. Восприятие красоты в исследованиях почти совпадает с эстетической гранью открытости опыту, а благодарность — одна из сильных сторон, наиболее связанных с удовлетворённостью жизнью.\n\nКак прокачать: попробуй классическое упражнение позитивной психологии — каждый вечер записывай три хорошие вещи, которые случились за день. Твой свет станет ещё ярче — и заметнее для других.',
      'Your superpower is bending light. You know how to spotlight the good: the beauty of a sunset, a stranger\'s kindness, meaning in a hard situation. Around you, people start noticing how much wonder the world holds.\n\nIn the VIA classification this is **appreciation of beauty and excellence**, **gratitude** and **spirituality** (a sense of meaning), the virtue of transcendence, a connection to something larger than yourself. In research, appreciation of beauty almost overlaps with the aesthetic facet of openness, and gratitude is one of the strengths most strongly linked to life satisfaction.\n\nHow to level up: try the classic positive psychology exercise: each evening, write down three good things that happened that day. Your light will grow brighter, and more visible to others.'],
    strengths: [['Чувство прекрасного', 'Sense of beauty'], ['Благодарность', 'Gratitude'], ['Поиск смысла', 'Search for meaning'], ['Вдохновение', 'Inspiration']],
    growth: [['Делиться своим взглядом вслух', 'Sharing your view out loud'], ['Не уходить в созерцание вместо действий', 'Not letting contemplation replace action']],
    funny: [['Ты останавливаешь всю компанию посреди улицы: «Стойте! Посмотрите, какое небо!»', 'You stop the whole group mid-street: "Wait! Look at that sky!"'], ['У тебя в галерее 3000 фотографий облаков. И каждое — особенное.', 'You have 3,000 photos of clouds. Each one is special.'], ['Ты благодаришь водителя автобуса, кассира, банкомат и Вселенную. Всех по отдельности.', 'You thank the bus driver, the cashier, the cash machine and the universe. Each one separately.'], ['Друг: «Это просто лужа». Ты: «В ней отражается весь город!»', 'Friend: "It\'s just a puddle." You: "The whole city is reflected in it!"']],
    compat: ['flight', 'healing', 'shapeshifting'],
    image: `A cute chibi superhero holding a glowing orb of pastel light that paints rainbows across a dreamy sky, soft sparkles, golden and pink palette, ${STYLE}` })
];

const B = (low, mid, high) => [low, mid, high].map(([l, s, d]) => ({ label: L(...l), summary: P(s), detailed: L(...d) }));
const dimDefs = {
  wisdom: { name: L('Мудрость и знание', 'Wisdom & knowledge'), description: L('Креативность, любознательность, здравомыслие, любовь к учению и умение видеть картину целиком.', 'Creativity, curiosity, judgment, love of learning and seeing the big picture.'), lowLabel: L('практика', 'hands-on'), highLabel: L('идеи, знания', 'ideas, knowledge'), color: '#C9B6F2',
    bands: B([['Практик', 'Practitioner'], [['Лучше сделать, чем обсуждать', 'Doing beats debating'], ['Знания — когда нужны', 'Knowledge on demand'], ['Опора на опыт', 'You rely on experience']], ['Ты предпочитаешь действовать, а не теоретизировать. Иногда стоит дать любопытству немного больше места.', 'You prefer acting over theorising. Sometimes give curiosity a little more room.']],
      [['Любопытный реалист', 'Curious realist'], [['Интересуешься, но без фанатизма', 'Interested, not obsessed'], ['Совмещаешь идеи и дело', 'You mix ideas and action'], ['Умеешь учиться', 'You know how to learn']], ['Знания и идеи для тебя важны, когда помогают в реальной жизни.', 'Knowledge and ideas matter to you when they help in real life.']],
      [['Искатель знаний', 'Knowledge seeker'], [['Любопытство без границ', 'Boundless curiosity'], ['Нестандартные решения', 'Unconventional solutions'], ['К тебе идут за советом', 'People ask your advice']], ['Сильные стороны мудрости — твоя опора. Делись ими простыми словами.', 'Wisdom strengths are your backbone. Share them in plain words.']]) },
  courage: { name: L('Мужество', 'Courage'), description: L('Храбрость, настойчивость, честность и жизнелюбие — умение действовать вопреки трудностям.', 'Bravery, perseverance, honesty and zest: acting despite obstacles.'), lowLabel: L('осторожность', 'caution'), highLabel: L('смелость, драйв', 'bravery, drive'), color: '#FFC3A0',
    bands: B([['Осторожный стратег', 'Careful strategist'], [['Не рискуешь понапрасну', 'No needless risks'], ['Сначала безопасность', 'Safety first'], ['Бережёшь силы', 'You save your energy']], ['Ты избегаешь лишнего риска. Иногда маленький смелый шаг даёт больше, чем кажется.', 'You avoid unnecessary risks. Sometimes a small brave step pays off more than you think.']],
      [['Смелость по делу', 'Brave when it counts'], [['Рискуешь ради важного', 'You risk for what matters'], ['Умеешь настоять на своём', 'You can stand your ground'], ['Баланс энергии', 'Balanced energy']], ['Ты можешь проявить мужество, когда это действительно нужно.', 'You can show courage when it truly matters.']],
      [['Отважное сердце', 'Brave heart'], [['Действуешь вопреки страху', 'You act despite fear'], ['Не сдаёшься', 'You never give up'], ['Говоришь правду', 'You tell the truth']], ['Мужество — твоя сильная сторона. Помни, что смелость включает и право отдохнуть.', 'Courage is your strength. Remember that bravery includes the right to rest.']]) },
  humanity: { name: L('Человечность', 'Humanity'), description: L('Любовь, доброта и социальный интеллект — сильные стороны близких отношений.', 'Love, kindness and social intelligence: the strengths of close relationships.'), lowLabel: L('независимость', 'independence'), highLabel: L('тепло, эмпатия', 'warmth, empathy'), color: '#F7B8C8',
    bands: B([['Самостоятельный', 'Self-reliant'], [['Ценишь личное пространство', 'You value your space'], ['Не навязываешь помощь', 'You do not force help'], ['Дружба — избирательно', 'Selective friendships']], ['Ты проявляешь заботу сдержанно. Иногда одно тёплое слово значит очень много.', 'You show care in a reserved way. Sometimes one warm word means a lot.']],
      [['Тёплый реалист', 'Warm realist'], [['Помогаешь, когда нужно', 'You help when needed'], ['Чувствуешь людей', 'You read people'], ['Помнишь о себе', 'You remember yourself']], ['Ты заботишься о людях и при этом держишь баланс.', 'You are kind to people while keeping a balance.']],
      [['Большое сердце', 'Big heart'], [['Эмпатия и доброта', 'Empathy and kindness'], ['Близкие отношения — главное', 'Close bonds come first'], ['Тонко чувствуешь других', 'You sense others deeply']], ['Человечность — твоя суперсила. Не забывай направлять её и на себя.', 'Humanity is your superpower. Remember to point it at yourself too.']]) },
  justice: { name: L('Справедливость', 'Justice'), description: L('Командная работа, справедливость и лидерство — сильные стороны жизни в сообществе.', 'Teamwork, fairness and leadership: the strengths of community life.'), lowLabel: L('свой путь', 'own path'), highLabel: L('команда, честность', 'team, fairness'), color: '#A8E0C8',
    bands: B([['Одиночка', 'Lone wolf'], [['Предпочитаешь свой путь', 'You prefer your own path'], ['Не любишь собрания', 'Meetings are not your thing'], ['Независимость важнее', 'Independence first']], ['Тебе комфортнее действовать самостоятельно. Иногда команда может удивить.', 'You are more comfortable acting alone. Sometimes a team can surprise you.']],
      [['Надёжный участник', 'Reliable member'], [['Умеешь работать в команде', 'You can work in a team'], ['Честность с людьми', 'You are fair with people'], ['Лидируешь по ситуации', 'You lead when needed']], ['Ты хороший член команды и при необходимости можешь её повести.', 'You are a good team member and can lead when needed.']],
      [['Защитник команды', 'Team guardian'], [['Мы важнее, чем я', '"We" over "me"'], ['Честность для всех', 'Fairness for all'], ['Естественное лидерство', 'Natural leadership']], ['Справедливость — твоя сильная сторона. Береги силы и делегируй.', 'Justice is your strength. Save your energy and delegate.']]) },
  temperance: { name: L('Умеренность', 'Temperance'), description: L('Прощение, скромность, благоразумие и саморегуляция — сильные стороны, которые защищают от крайностей.', 'Forgiveness, humility, prudence and self-regulation: strengths that protect against excess.'), lowLabel: L('спонтанность', 'spontaneity'), highLabel: L('самоконтроль', 'self-control'), color: '#A9D2F5',
    bands: B([['Спонтанность', 'Spontaneous'], [['Живёшь моментом', 'You live in the moment'], ['Импульсы — двигатель', 'Impulses drive you'], ['Правила — не про тебя', 'Rules are not your thing']], ['Ты действуешь по настроению. Одна маленькая привычка самоконтроля может многое изменить.', 'You act on mood. One small self-control habit can change a lot.']],
      [['Разумный баланс', 'Sensible balance'], [['Умеешь остановиться', 'You know when to stop'], ['Прощаешь, но помнишь', 'You forgive but remember'], ['Спонтанность в меру', 'Spontaneity in moderation']], ['Ты держишь баланс между свободой и самоконтролем.', 'You keep a balance between freedom and self-control.']],
      [['Мастер самоконтроля', 'Self-control master'], [['Сила воли', 'Willpower'], ['Скромность и такт', 'Humility and tact'], ['Думаешь, прежде чем действовать', 'You think before acting']], ['Умеренность — твоя опора. Позволяй себе иногда расслабиться.', 'Temperance is your anchor. Let yourself relax sometimes.']]) },
  transcendence: { name: L('Трансцендентность', 'Transcendence'), description: L('Восприятие красоты, благодарность, надежда, юмор и духовность — связь с чем-то бо́льшим.', 'Appreciation of beauty, gratitude, hope, humour and spirituality: connection to something larger.'), lowLabel: L('приземлённость', 'down-to-earth'), highLabel: L('смысл, вдохновение', 'meaning, inspiration'), color: '#FFE3A3',
    bands: B([['Приземлённый', 'Down-to-earth'], [['Факты важнее смыслов', 'Facts over meanings'], ['Без лишней романтики', 'No extra romance'], ['Здесь и сейчас', 'Here and now']], ['Ты смотришь на жизнь трезво. Попробуй иногда замечать маленькие чудеса — это заряжает.', 'You see life soberly. Try noticing small wonders sometimes; it recharges you.']],
      [['Вдохновение по случаю', 'Occasional inspiration'], [['Умеешь радоваться', 'You can enjoy things'], ['Надежда — по ситуации', 'Hope when it fits'], ['Юмор в запасе', 'Humour in reserve']], ['Ты умеешь находить смысл и красоту, когда есть время остановиться.', 'You find meaning and beauty when you have time to pause.']],
      [['Источник света', 'Source of light'], [['Благодарность и надежда', 'Gratitude and hope'], ['Видишь красоту и смысл', 'You see beauty and meaning'], ['Вдохновляешь других', 'You inspire others']], ['Трансцендентность — твоя суперсила. Подкрепляй вдохновение действием.', 'Transcendence is your superpower. Back inspiration with action.']]) }
};

const methodology = L(
`### Что это за тест
Развлекательный тест по мотивам **классификации сильных сторон характера VIA** (Values in Action), созданной Кристофером Питерсоном и Мартином Селигманом (2004) — одного из центральных проектов позитивной психологии. В ней 24 сильные стороны сгруппированы в 6 добродетелей:

| Добродетель | Сильные стороны |
|---|---|
| Мудрость и знание | креативность, любознательность, здравомыслие, любовь к учению, мудрость (перспектива) |
| Мужество | храбрость, настойчивость, честность, жизнелюбие |
| Человечность | любовь, доброта, социальный интеллект |
| Справедливость | командная работа, справедливость, лидерство |
| Умеренность | прощение, скромность, благоразумие, саморегуляция |
| Трансцендентность | восприятие красоты, благодарность, надежда, юмор, духовность |

Каждая «суперсила» — это метафора одной-двух сильных сторон: телепатия = социальный интеллект, управление временем = саморегуляция и настойчивость, полёт = надежда и жизнелюбие и т. д. 16 ситуаций начисляют баллы по шести добродетелям.

### Научная основа
- Питерсон и Селигман отбирали сильные стороны по критериям: ценятся в разных культурах, вносят вклад в благополучие, измеримы и проявляются в поведении.
- В исследовании Парка, Питерсона и Селигмана (2004) сильнее всего с удовлетворённостью жизнью были связаны надежда, жизнелюбие, благодарность, любовь и любознательность.
- Сильные стороны частично пересекаются с «Большой пятёркой»: жизнелюбие и надежда — с «живой» гранью экстраверсии, доброта и прощение — с доброжелательностью, настойчивость и саморегуляция — с добросовестностью, креативность и восприятие красоты — с открытостью; но большинство сильных сторон несут и свою собственную информацию (McGrath et al., 2020).
- Упражнение «используй свою сильную сторону по-новому каждый день в течение недели» в эксперименте Селигмана и коллег (2005) повышало уровень счастья и снижало симптомы депрессии на протяжении шести месяцев.

### Честные ограничения
- Шесть добродетелей — теоретическая группировка; факторный анализ ответов на опросник VIA-IS обычно находит меньше факторов (например, McGrath, 2015 — три-пять). Мы используем шесть добродетелей как понятную рамку, а не как измеренную структуру.
- Это **не** официальный опросник VIA-IS: его вопросы защищены авторским правом и здесь не используются. Все вопросы оригинальные; надёжность не измерялась. Пройти научную версию можно на сайте VIA Institute on Character.

### Как считается результат
Каждый вариант связан с одной суперсилой и даёт 2 балла её главной добродетели и 1 балл второй. Суммы по шести добродетелям переводятся в шкалу 0–1, и выбирается суперсила с ближайшим профилем (евклидово расстояние). Профили откалиброваны симуляцией, чтобы все 12 суперсил выпадали примерно одинаково часто.`,
`### What this quiz is
An entertainment quiz based on the **VIA classification of character strengths** (Values in Action) created by Christopher Peterson and Martin Seligman (2004), one of the core projects of positive psychology. It groups 24 strengths into 6 virtues:

| Virtue | Strengths |
|---|---|
| Wisdom & knowledge | creativity, curiosity, judgment, love of learning, perspective |
| Courage | bravery, perseverance, honesty, zest |
| Humanity | love, kindness, social intelligence |
| Justice | teamwork, fairness, leadership |
| Temperance | forgiveness, humility, prudence, self-regulation |
| Transcendence | appreciation of beauty, gratitude, hope, humour, spirituality |

Each "superpower" is a metaphor for one or two strengths: telepathy = social intelligence, time control = self-regulation and perseverance, flight = hope and zest, and so on. 16 situations add points on the six virtues.

### Scientific grounding
- Peterson and Seligman selected strengths using criteria such as being valued across cultures, contributing to fulfilment, being measurable and showing up in behaviour.
- Park, Peterson and Seligman (2004) found hope, zest, gratitude, love and curiosity to be the strengths most strongly associated with life satisfaction.
- Strengths partly overlap with the Big Five: zest and hope with the lively facet of extraversion, kindness and forgiveness with agreeableness, perseverance and self-regulation with conscientiousness, creativity and appreciation of beauty with openness; but most strengths also carry information of their own (McGrath et al., 2020).
- In an experiment by Seligman and colleagues (2005), using a signature strength in a new way every day for a week increased happiness and reduced depressive symptoms for six months.

### Honest limitations
- The six virtues are a theoretical grouping; factor analyses of the VIA-IS usually find fewer factors (e.g., McGrath, 2015, three to five). We use the six virtues as a clear framework, not as a measured structure.
- This is **not** the official VIA-IS questionnaire; its items are copyrighted and not used here. All questions are original and reliability has not been measured. The scientific version is available from the VIA Institute on Character.

### How the result is computed
Each option is linked to one superpower and gives 2 points to its main virtue and 1 point to its second virtue. The six totals are rescaled to 0–1, and you get the superpower with the nearest profile (Euclidean distance). Profiles were calibrated by simulation so all 12 superpowers come up about equally often.`);

module.exports = {
  dimOrder: ['wisdom', 'courage', 'humanity', 'justice', 'temperance', 'transcendence'], dimDefs,
  def: {
    id: 'superpower', category: 'fun', kind: 'choice', seriousness: 'fun',
    title: L('Какая у тебя суперсила?', 'What is your superpower?'),
    tagline: L('Телепатия, управление временем или полёт? Узнай, какая сильная сторона характера — твоя суперспособность', 'Telepathy, time control or flight? Find out which character strength is your superpower'),
    description: L('Позитивная психология выделяет 24 сильные стороны характера — от храбрости до благодарности. Мы превратили их в 12 суперспособностей. Пройди 16 ситуаций и узнай свою суперсилу, научную «изнанку» за ней и способ её прокачать.',
      'Positive psychology identifies 24 character strengths, from bravery to gratitude. We turned them into 12 superpowers. Go through 16 situations to find yours, the science behind it and how to level it up.'),
    emoji: '⚡', durationMin: 5, popularity: 4,
    tags: [L('сильные стороны', 'character strengths'), L('позитивная психология', 'positive psychology'), L('суперсилы', 'superpowers'), L('развлечение', 'fun')],
    methodology,
    sources: [
      { citation: 'Peterson, C., & Seligman, M. E. P. (2004). Character strengths and virtues: A handbook and classification. Washington, DC: American Psychological Association / New York: Oxford University Press.' },
      { citation: 'Park, N., Peterson, C., & Seligman, M. E. P. (2004). Strengths of character and well-being. Journal of Social and Clinical Psychology, 23(5), 603–619.', doi: '10.1521/jscp.23.5.603.50748' },
      { citation: 'Seligman, M. E. P., Steen, T. A., Park, N., & Peterson, C. (2005). Positive psychology progress: Empirical validation of interventions. American Psychologist, 60(5), 410–421.', doi: '10.1037/0003-066X.60.5.410' },
      { citation: 'McGrath, R. E., Hall-Simmonds, A., & Goldberg, L. R. (2020). Are measures of character and personality distinct? Evidence from observed-score and true-score analyses. Assessment, 27(1), 117–135 (online first 2017).', doi: '10.1177/1073191117738047' },
      { citation: 'McGrath, R. E. (2015). Integrating psychological and cultural perspectives on virtue: The hierarchical structure of character strengths. The Journal of Positive Psychology, 10(5), 407–424.', doi: '10.1080/17439760.2014.994222' },
      { citation: 'Noftle, E. E., Schug, J., & Robins, R. W. (2011). Character and personality: Connections between positive psychology and personality psychology. In K. M. Sheldon, T. B. Kashdan, & M. F. Steger (Eds.), Designing positive psychology: Taking stock and moving forward (pp. 207–227). New York: Oxford University Press.' },
      { citation: 'Exline, J. J., & Hill, P. C. (2012). Humility: A consistent and robust predictor of generosity. The Journal of Positive Psychology, 7(3), 208–218.', doi: '10.1080/17439760.2012.671348' },
      { citation: 'VIA Institute on Character. The VIA Classification of Character Strengths and Virtues.', url: 'https://viacharacter.org/pdf/VirtuesClassification-2020.pdf' }
    ],
    license: 'Original content written for testik. The VIA classification (names of the 24 strengths and 6 virtues) is described and cited as a scientific framework; no VIA-IS items or VIA Institute materials are reproduced. The quiz is not affiliated with or endorsed by the VIA Institute on Character.',
    disclaimer: L('Развлекательный тест по мотивам классификации VIA. Это не официальный опросник VIA-IS и не психологическая диагностика.', 'Entertainment quiz inspired by the VIA classification. It is not the official VIA-IS questionnaire and not a psychological assessment.'),
    instructions: L('Представь себя в каждой ситуации и выбери то, что ты сделаешь на самом деле. Здесь нет плохих ответов — у каждой суперсилы свои сильные стороны.', 'Picture yourself in each situation and choose what you would really do. There are no bad answers; every superpower has its own strengths.'),
    questions, outcomes,
    scoringNotes: L('Шесть шкал — добродетели VIA: мудрость, мужество, человечность, справедливость, умеренность, трансцендентность. Каждый ответ даёт 2 балла главной добродетели своей суперсилы и 1 балл второй. Суммы переводятся в 0–1: (балл − минимум) / (максимум − минимум); затем выбирается суперсила с ближайшим профилем (евклидово расстояние).',
      'Six scales, the VIA virtues: wisdom, courage, humanity, justice, temperance and transcendence. Each answer gives 2 points to its superpower\'s main virtue and 1 to the second. Totals are rescaled to 0–1: (score − min) / (max − min); you then get the superpower with the nearest profile (Euclidean distance).'),
    resultIntro: L('Твоя суперсила найдена! Плащ не прилагается, но научная основа — да.', 'Your superpower has been found! Cape not included, but the science is.')
  }
};

import type { Locale } from "@/lib/types";
import { SITE_URL } from "@/lib/site";
import { AGE_RATING, LEGAL_DATE, OPERATOR, placeholder } from "@/lib/legal";

/**
 * Legal documents of the site, written for Russian law (152-ФЗ, 149-ФЗ, 436-ФЗ).
 * The Russian text is the binding one; the English text is a translation for convenience.
 * Markdown is rendered by src/lib/md.ts (headings, lists, bold, links).
 */

function op(lang: Locale) {
  const ru = lang === "ru";
  const name = placeholder(OPERATOR.name, ru);
  const email = OPERATOR.email ? `[${OPERATOR.email}](mailto:${OPERATOR.email})` : placeholder("", ru);
  const inn = OPERATOR.inn ? (ru ? `, ИНН ${OPERATOR.inn}` : `, taxpayer ID (INN) ${OPERATOR.inn}`) : "";
  const address = placeholder(OPERATOR.address, ru);
  return { name, email, inn, address, site: SITE_URL };
}

export type LegalDocId = "privacy" | "consent" | "terms";

export const LEGAL_TITLES: Record<LegalDocId, Record<Locale, string>> = {
  privacy: { ru: "Политика обработки персональных данных", en: "Personal data processing policy" },
  consent: { ru: "Согласие на обработку персональных данных", en: "Consent to personal data processing" },
  terms: { ru: "Пользовательское соглашение", en: "Terms of use" },
};

export function legalDoc(id: LegalDocId, lang: Locale): string {
  const o = op(lang);
  const L = `/${lang}`;
  const date = LEGAL_DATE[lang];
  const ru = lang === "ru";
  const enNote = ru ? "" : "*This is a translation for convenience. The Russian version is the legally binding one.*\n\n";

  if (id === "privacy") {
    return ru
      ? `Редакция от ${date}

## 1. Общие положения

1. Настоящая Политика определяет, какие персональные данные пользователей сайта testik (${o.site}, далее — Сайт) обрабатываются, зачем, как они защищены и какие права есть у пользователей. Политика принята во исполнение Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных».
2. Оператор персональных данных: **${o.name}**${o.inn}. Адрес для обращений: ${o.address}. Электронная почта: ${o.email}.
3. Согласие на обработку персональных данных оформлено отдельным документом: [Согласие на обработку персональных данных](${L}/consent). Правила пользования Сайтом описаны в [Пользовательском соглашении](${L}/terms).

## 2. Какие данные обрабатываются

**2.1. Если вы не входите в аккаунт**

- Ответы на вопросы, результаты и незаконченный прогресс тестов хранятся только в вашем браузере (localStorage) и Оператору не передаются. Результат попадает в адрес ссылки, только если вы сами ею поделитесь.
- Технические данные, которые браузер автоматически передаёт серверу: IP-адрес, тип браузера и устройства, адрес запрошенной страницы, дата и время запроса (журналы веб-сервера).
- Только если вы нажали «Согласен» в окне о cookie: данные сервиса Яндекс Метрика (идентификатор cookie, просмотренные страницы, источник перехода, тип устройства, приблизительное местоположение по IP-адресу). Ответы и результаты тестов в Метрику не передаются, запись действий на странице (Вебвизор) отключена.

**2.2. Если вы входите через VK ID или Яндекс ID**

- Имя, адрес электронной почты, ссылка на изображение профиля, идентификатор аккаунта в VK или Яндексе и служебные токены доступа, которые эти сервисы передают Сайту по вашему запросу.
- Идентификатор пройденного теста, код результата и дата прохождения, чтобы показывать историю в личном кабинете на любом устройстве.
- Дата, время и редакция данного вами согласия.

**2.3. Чего Сайт не делает**

- Результаты скрининговых тестов о психическом здоровье (тревога, депрессия, стресс, выгорание, СДВГ и подобные) **никогда не сохраняются на сервере**, даже если вы вошли в аккаунт. Они остаются только в вашем браузере. Таким образом, Оператор не обрабатывает специальные категории персональных данных, в том числе сведения о состоянии здоровья.
- Оператор не обрабатывает биометрические персональные данные, не использует пароли и не принимает решений, порождающих для вас юридические последствия, на основании исключительно автоматизированной обработки. Результаты тестов носят информационный характер.

## 3. Цели обработки

| Цель | Данные |
|---|---|
| Вход на Сайт, ведение личного кабинета, хранение истории результатов и синхронизация между устройствами | п. 2.2 |
| Обеспечение работы и безопасности Сайта, защита от злоупотреблений | технические данные из п. 2.1 |
| Анализ посещаемости и улучшение Сайта (только с согласия) | данные Яндекс Метрики |
| Ответы на обращения пользователей | адрес почты и данные из обращения |

## 4. Правовые основания

- Согласие субъекта персональных данных (п. 1 ч. 1 ст. 6 152-ФЗ): личный кабинет и аналитика.
- Исполнение Пользовательского соглашения, стороной которого является пользователь (п. 5 ч. 1 ст. 6 152-ФЗ): работа личного кабинета.
- Законный интерес Оператора по обеспечению безопасности Сайта (п. 7 ч. 1 ст. 6 152-ФЗ): журналы веб-сервера.

## 5. Как обрабатываются данные

1. Действия с данными: сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, удаление, уничтожение. Обработка автоматизированная, с передачей по сети Интернет.
2. **Локализация.** Запись, систематизация, накопление, хранение, уточнение и извлечение персональных данных граждан Российской Федерации ведутся с использованием баз данных, находящихся на территории Российской Федерации (ч. 5 ст. 18 152-ФЗ). Сайт и база данных размещены на серверах хостинг-провайдера ООО «Бегет» в России.
3. Трансграничная передача персональных данных не осуществляется.
4. Сроки хранения: данные аккаунта и результаты — до удаления аккаунта или отзыва согласия; журналы веб-сервера — не более 30 дней; резервные копии базы данных — не более 30 дней. По достижении целей обработки данные уничтожаются.

## 6. Кому передаются данные

- **ООО «Бегет»** — хостинг: хранение данных Сайта на серверах в России.
- **ООО «Яндекс»** — Яндекс Метрика (только при согласии на аналитические cookie) и Яндекс ID (при входе через Яндекс сервис передаёт Оператору данные из п. 2.2).
- **ООО «ВК»** — VK ID (при входе через VK сервис передаёт Оператору данные из п. 2.2).
- Государственным органам — только в случаях, прямо предусмотренных законом.

Оператор не продаёт персональные данные и не передаёт их рекламодателям.

## 7. Cookie и хранилище браузера {#cookies}

**Необходимые** (работают без отдельного согласия, без них Сайт не работает):

- \`authjs.session-token\`, \`authjs.csrf-token\`, \`authjs.callback-url\` — вход в аккаунт и защита от подделки запросов, только у вошедших пользователей;
- \`pd_consent\` — отметка о данном согласии на время входа (1 час);
- \`lang\` — выбранный язык;
- localStorage: тема оформления, выбор по cookie, история, результаты и прогресс тестов. Эти данные лежат только на вашем устройстве.

**Аналитические** — cookie Яндекс Метрики (\`_ym_uid\`, \`_ym_d\`, \`_ym_isad\` и другие). Загружаются только после нажатия «Согласен». Изменить выбор можно в любой момент по ссылке «Настройки cookie» внизу страницы или удалив cookie в настройках браузера.

## 8. Ваши права

- Получать сведения об обработке своих персональных данных (ст. 14 152-ФЗ).
- Требовать уточнения, блокирования или уничтожения данных, если они неполные, устаревшие, неточные, незаконно полученные или не нужны для заявленной цели.
- Отозвать согласие на обработку (ч. 2 ст. 9 152-ФЗ). Самый быстрый способ — кнопка «Удалить аккаунт» в [личном кабинете](${L}/me): она сразу удаляет аккаунт и все сохранённые на сервере результаты.
- Обжаловать действия Оператора в Роскомнадзоре ([rkn.gov.ru](https://rkn.gov.ru)) или в суде.

## 9. Как направить запрос

1. Напишите на ${o.email} или по адресу ${o.address}. Укажите сведения, по которым можно найти ваш аккаунт (например, адрес почты в VK или Яндексе), и суть запроса.
2. Оператор отвечает в течение 10 рабочих дней со дня получения запроса. Срок может быть продлён не более чем на 5 рабочих дней с объяснением причин (ст. 20 152-ФЗ).
3. При отзыве согласия данные уничтожаются в течение 30 дней, если иное не предусмотрено законом (ч. 5 ст. 21 152-ФЗ).

## 10. Защита данных

- Соединение с Сайтом шифруется (HTTPS).
- Доступ к серверу и базе данных есть только у Оператора, сервер и база защищены паролями и ключами доступа.
- Сайт не хранит паролей: вход выполняется через VK ID и Яндекс ID.
- При неправомерной передаче (утечке) персональных данных Оператор уведомляет Роскомнадзор в течение 24 часов, а о результатах расследования — в течение 72 часов (ч. 3.1 ст. 21 152-ФЗ).

## 11. Возраст пользователей

Сайт имеет знак информационной продукции **${AGE_RATING}**. Создавая аккаунт, вы подтверждаете, что вам исполнилось 16 лет. Если Оператор узнает, что аккаунт создан младшим пользователем без согласия законного представителя, аккаунт будет удалён.

## 12. Изменение Политики

Оператор может обновлять Политику. Новая редакция действует с момента публикации на этой странице, дата редакции указана в начале документа.`
      : `${enNote}Version of ${date}

## 1. General

1. This Policy describes which personal data of users of the testik website (${o.site}, the "Site") is processed, why, how it is protected and what rights users have. It is adopted under Russian Federal Law No. 152-FZ "On Personal Data".
2. Data operator: **${o.name}**${o.inn}. Postal address for requests: ${o.address}. Email: ${o.email}.
3. Consent to data processing is a separate document: [Consent to personal data processing](${L}/consent). Rules of use are in the [Terms of use](${L}/terms).

## 2. What data is processed

**2.1. Without signing in**

- Your answers, results and unfinished test progress stay in your browser (localStorage) and are never sent to the operator. A result ends up in a link only if you share that link yourself.
- Technical data your browser sends automatically: IP address, browser and device type, requested page, date and time (web server logs).
- Only if you click "Accept" in the cookie notice: Yandex Metrica data (cookie ID, pages viewed, referrer, device type, approximate location by IP). Test answers and results are never sent to Metrica; session recording (Webvisor) is off.

**2.2. When you sign in with VK ID or Yandex ID**

- Name, email address, profile picture link, account ID at VK or Yandex and access tokens these services send at your request.
- Test ID, result code and date, so your history shows up in your space on any device.
- Date, time and version of the consent you gave.

**2.3. What the Site does not do**

- Results of mental-health screeners (anxiety, depression, stress, burnout, ADHD and similar) are **never stored on the server**, even when you are signed in. They stay in your browser only, so the operator does not process special categories of data such as health data.
- The operator processes no biometric data, uses no passwords and takes no decisions with legal effect based solely on automated processing.

## 3. Purposes

| Purpose | Data |
|---|---|
| Sign-in, personal space, result history and sync between devices | 2.2 |
| Keeping the Site working and secure | technical data from 2.1 |
| Traffic analysis to improve the Site (with consent only) | Yandex Metrica data |
| Replying to user requests | email and the request itself |

## 4. Legal grounds

Your consent (Art. 6(1)(1) of 152-FZ), performance of the Terms of use (Art. 6(1)(5)) and the operator's legitimate interest in security (Art. 6(1)(7)).

## 5. How data is processed

1. Collection, recording, systematisation, accumulation, storage, updating, retrieval, use, deletion and destruction, by automated means over the Internet.
2. **Localisation.** Personal data of Russian citizens is recorded, stored and retrieved using databases located in Russia (Art. 18(5) of 152-FZ). The Site and its database are hosted by Beget LLC in Russia.
3. No cross-border transfer takes place.
4. Retention: account data and results until you delete the account or withdraw consent; web server logs up to 30 days; database backups up to 30 days.

## 6. Who receives data

- **Beget LLC**: hosting in Russia.
- **Yandex LLC**: Yandex Metrica (only with analytics consent) and Yandex ID (sends the data in 2.2 when you sign in with Yandex).
- **VK LLC**: VK ID (sends the data in 2.2 when you sign in with VK).
- Public authorities, only where the law requires it.

The operator never sells personal data or shares it with advertisers.

## 7. Cookies and browser storage {#cookies}

**Essential** (no separate consent needed): \`authjs.session-token\`, \`authjs.csrf-token\`, \`authjs.callback-url\` for signed-in users; \`pd_consent\` (1 hour, during sign-in); \`lang\`; localStorage for theme, cookie choice, history, results and test progress, kept on your device only.

**Analytics**: Yandex Metrica cookies (\`_ym_uid\`, \`_ym_d\`, \`_ym_isad\` and others), loaded only after you click "Accept". Change your choice any time with "Cookie settings" at the bottom of the page.

## 8. Your rights

Access information about processing (Art. 14), demand correction, blocking or destruction, withdraw consent (Art. 9(2)). The quickest way is "Delete account" in [your space](${L}/me), which deletes the account and all results stored on the server at once. You may complain to Roskomnadzor ([rkn.gov.ru](https://rkn.gov.ru)) or a court.

## 9. Requests

Write to ${o.email} or ${o.address} with details that identify your account. The operator replies within 10 working days (extendable by 5 with reasons). After consent is withdrawn, data is destroyed within 30 days.

## 10. Security

HTTPS everywhere; only the operator can access the server and database; no passwords are stored; data breaches are reported to Roskomnadzor within 24 hours, with follow-up within 72 hours.

## 11. Age

The Site is rated **${AGE_RATING}**. By creating an account you confirm you are at least 16.

## 12. Changes

The operator may update this Policy; a new version applies once published here.`;
  }

  if (id === "consent") {
    return ru
      ? `Редакция от ${date}

Я, пользователь сайта testik (${o.site}), отмечая поле «Я даю согласие на обработку персональных данных» на странице входа, действую свободно, своей волей и в своём интересе и даю конкретное, предметное, информированное, сознательное и однозначное согласие на обработку моих персональных данных на следующих условиях.

1. **Оператор:** ${o.name}${o.inn}; адрес: ${o.address}; электронная почта: ${o.email}.
2. **Цель обработки:** регистрация и вход на Сайт, ведение личного кабинета, хранение истории результатов тестов и её синхронизация между устройствами, ответы на мои обращения.
3. **Перечень данных:** имя; адрес электронной почты; ссылка на изображение профиля; идентификатор аккаунта в VK ID или Яндекс ID и служебные токены доступа; идентификаторы пройденных тестов, коды результатов и даты прохождения; дата, время и редакция настоящего согласия. Результаты скрининговых тестов о психическом здоровье на сервере не сохраняются и в перечень не входят.
4. **Действия с данными:** сбор, запись, систематизация, накопление, хранение, уточнение (обновление, изменение), извлечение, использование, удаление, уничтожение. Хранение данных Оператор вправе поручить хостинг-провайдеру ООО «Бегет» (серверы на территории Российской Федерации). Распространение данных и трансграничная передача не осуществляются.
5. **Способ обработки:** автоматизированная, с передачей по сети Интернет.
6. **Срок действия:** до удаления аккаунта или отзыва согласия.
7. **Отзыв согласия:** кнопка «Удалить аккаунт» в личном кабинете (данные удаляются сразу) или письмо на ${o.email}. После отзыва Оператор прекращает обработку и уничтожает данные в течение 30 дней, если иное не предусмотрено законом.
8. Я подтверждаю, что мне исполнилось 16 лет и что я ознакомлен(а) с [Политикой обработки персональных данных](${L}/privacy).

Согласие на аналитические cookie (Яндекс Метрика) даётся отдельно, в окне о cookie, и может быть отозвано по ссылке «Настройки cookie» внизу страницы.`
      : `${enNote}Version of ${date}

By ticking "I consent to the processing of my personal data" on the sign-in page of testik (${o.site}), I freely, of my own will and in my own interest, give specific, informed, conscious and unambiguous consent to the processing of my personal data on these terms.

1. **Operator:** ${o.name}${o.inn}; address: ${o.address}; email: ${o.email}.
2. **Purpose:** sign-in, personal space, storing my test result history and syncing it between devices, replying to my requests.
3. **Data:** name; email; profile picture link; VK ID or Yandex ID account ID and access tokens; IDs of tests taken, result codes and dates; date, time and version of this consent. Mental-health screener results are never stored on the server and are not included.
4. **Actions:** collection, recording, systematisation, accumulation, storage, updating, retrieval, use, deletion, destruction. Storage may be entrusted to the hosting provider Beget LLC (servers in Russia). No disclosure to the public and no cross-border transfer.
5. **Means:** automated, over the Internet.
6. **Term:** until I delete my account or withdraw consent.
7. **Withdrawal:** "Delete account" in my space (immediate) or an email to ${o.email}. Data is destroyed within 30 days of withdrawal.
8. I confirm I am at least 16 and have read the [Personal data processing policy](${L}/privacy).

Consent to analytics cookies (Yandex Metrica) is given separately in the cookie notice.`;
  }

  return ru
    ? `Редакция от ${date}

## 1. Что это за сайт

1. Сайт testik (${o.site}) даёт бесплатный доступ к психологическим тестам, развлекательным тестам, мини-играм на внимание и память и к личному кабинету с историей результатов. Владелец Сайта: ${o.name}${o.inn}, ${o.email}.
2. Пользуясь Сайтом, вы принимаете это Соглашение. Если вы не согласны с ним, не пользуйтесь Сайтом.

## 2. Тесты не являются медицинской услугой

1. Тесты на Сайте носят информационный и развлекательный характер и помогают лучше узнать себя. Они **не являются медицинской услугой, не ставят диагноз и не заменяют консультацию** врача, психотерапевта или клинического психолога.
2. Скрининговые тесты (тревога, депрессия, стресс, выгорание, СДВГ) показывают только, стоит ли обратить внимание на своё состояние. При тревожащем результате обратитесь к специалисту.
3. Если вам плохо или есть мысли о причинении себе вреда, звоните 112. Экстренная психологическая помощь МЧС: 8-495-989-50-50. Детский телефон доверия: 8-800-2000-122.
4. Развлекательные тесты созданы для удовольствия и научной силы не имеют. Оценка IQ и процентили приблизительны и рассчитаны по опубликованным нормам.

## 3. Возраст

Сайт имеет знак информационной продукции **${AGE_RATING}**: в скрининговых тестах упоминаются мысли о смерти и причинении себе вреда без подробностей. Личный кабинет доступен пользователям от 16 лет.

## 4. Аккаунт

1. Вход выполняется через VK ID или Яндекс ID. Вы отвечаете за безопасность своего аккаунта в этих сервисах.
2. Аккаунт можно удалить в любой момент в личном кабинете, вместе со всеми сохранёнными на сервере результатами.
3. Обработка персональных данных описана в [Политике](${L}/privacy) и [Согласии](${L}/consent).

## 5. Права на материалы

1. Дизайн, тексты интерпретаций, развлекательные тесты и программный код Сайта принадлежат владельцу Сайта.
2. Научные методики используются по открытым лицензиям, лицензия и источники указаны на странице каждого теста.
3. Ссылками на свои результаты и картинками результатов можно свободно делиться.

## 6. Что запрещено

Автоматически собирать содержимое Сайта в больших объёмах, создавать чрезмерную нагрузку, пытаться получить доступ к чужим аккаунтам или к серверу, вмешиваться в работу Сайта.

## 7. Ответственность

Сайт предоставляется «как есть». Владелец старается, чтобы Сайт работал без ошибок, но не гарантирует этого и не отвечает за решения, принятые вами на основании результатов тестов, в пределах, допускаемых законом.

## 8. Прочее

1. Соглашение регулируется законодательством Российской Федерации.
2. Владелец может изменять Соглашение. Новая редакция действует с момента публикации на этой странице.
3. Вопросы и претензии: ${o.email}.`
    : `${enNote}Version of ${date}

## 1. About the Site

testik (${o.site}) offers free psychological tests, fun quizzes, attention and memory mini-games and a personal space with your result history. Owner: ${o.name}${o.inn}, ${o.email}. By using the Site you accept these Terms.

## 2. Not a medical service

Tests are for information and entertainment. They **are not a medical service, do not diagnose and do not replace a consultation** with a doctor, therapist or clinical psychologist. Screeners only suggest whether your wellbeing deserves attention. In an emergency call 112. Fun quizzes are for enjoyment only; IQ estimates and percentiles are approximate.

## 3. Age

The Site is rated **${AGE_RATING}**. Accounts are for users aged 16 and over.

## 4. Account

Sign-in works through VK ID or Yandex ID. You can delete your account, with all results stored on the server, at any time in your space. See the [Policy](${L}/privacy) and [Consent](${L}/consent).

## 5. Rights

Design, interpretation texts, fun quizzes and code belong to the Site owner. Scientific instruments are used under open licences listed on each test page. Feel free to share links and images of your results.

## 6. Not allowed

Bulk scraping, excessive load, attempts to access other accounts or the server, interfering with the Site.

## 7. Liability

The Site is provided "as is" to the extent permitted by law.

## 8. Other

These Terms are governed by Russian law. Questions: ${o.email}.`;
}

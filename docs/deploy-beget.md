# Запуск testik на Beget

Сайт на Next.js 16 с серверным рендерингом, входом и базой данных, поэтому нужен **VPS**, а не обычный виртуальный хостинг. Всё, что ниже, занимает около часа.

## 1. Что заказать

- **Beget → VPS** ([beget.com/ru/vps](https://beget.com/ru/vps)): Ubuntu 24.04, от 2 ядер, **2 ГБ памяти** и 20 ГБ диска. Меньше 2 ГБ сборка будет идти очень долго (скрипт всё равно добавит swap).
- **Домен**, например в Beget же (раздел «Домены»). Зона .ru или .рф подходит.
- В панели Beget в разделе DNS домена: запись **A** для `@` и для `www` → IP вашего VPS.

Данные пользователей будут храниться на этом же сервере в России, это и есть выполнение требования о локализации (ч. 5 ст. 18 152-ФЗ).

## 2. Первичная настройка сервера

Зайдите на сервер по SSH под root (логин и пароль Beget присылает на почту при создании VPS) и выполните, подставив свой домен:

```bash
curl -fsSL https://raw.githubusercontent.com/MonsterOfBI/testik/main/deploy/beget/setup-server.sh | bash -s -- testik.ru
```

Скрипт `deploy/beget/setup-server.sh` ставит Node.js 22, PostgreSQL, nginx, certbot, файрвол, создаёт пользователя `testik`, базу с случайным паролем, файл `/var/www/testik/.env.local`, systemd-сервис, ежедневный бэкап базы (хранится 14 дней) и ограничивает хранение логов 30 днями.

## 3. Заполнить настройки

```bash
nano /var/www/testik/.env.local
```

Обязательно:

- `OPERATOR_NAME`, `OPERATOR_EMAIL`: кто владелец сайта. Это видно в подвале и в политике, без этого сайт не соответствует 149-ФЗ и 152-ФЗ. По желанию `OPERATOR_INN`, `OPERATOR_ADDRESS`.
- `NEXT_PUBLIC_SITE_URL` и `AUTH_URL`: уже подставлены скриптом.

Для входа (сначала подайте уведомление в Роскомнадзор, см. `docs/legal-ru.md`):

- **Яндекс ID**: [oauth.yandex.ru](https://oauth.yandex.ru) → создать приложение «Веб-сервисы», доступ к имени, почте и аватару. Redirect URI: `https://testik.ru/api/auth/callback/yandex`. Ключи в `AUTH_YANDEX_ID`, `AUTH_YANDEX_SECRET`.
- **VK ID**: [id.vk.com/about/business/go](https://id.vk.com/about/business/go) → приложение для сайта. Доверенный redirect URL: `https://testik.ru/api/auth/callback/vk`. Ключи в `AUTH_VK_ID`, `AUTH_VK_SECRET`. См. «Известное ограничение» в `docs/legal-ru.md`.
- **Яндекс Метрика**: [metrika.yandex.ru](https://metrika.yandex.ru), номер счётчика в `NEXT_PUBLIC_YANDEX_METRIKA_ID`. Вебвизор включать не нужно, сайт его отключает.

Вход по почте выключен намеренно (`AUTH_EMAIL_ENABLED` пустая).

## 4. Собрать и запустить

```bash
sudo -u testik bash /var/www/testik/deploy/beget/deploy.sh
```

Скрипт берёт свежий `main`, ставит зависимости, создаёт таблицы в базе, собирает сайт и перезапускает сервис. В конце должно быть `health: HTTP 200`.

## 5. HTTPS

Когда домен уже открывается по http:

```bash
certbot --nginx -d testik.ru -d www.testik.ru --redirect -m ваша@почта --agree-tos
```

Сертификат Let's Encrypt продлевается сам.

## 6. Автодеплой из GitHub (по желанию)

Сейчас каждый push в `main` выкладывается на Vercel. Чтобы он выкладывался и на Beget:

1. На своём компьютере: `ssh-keygen -t ed25519 -f testik_deploy -N ""`.
2. На сервере: `mkdir -p /home/testik/.ssh && cat >> /home/testik/.ssh/authorized_keys` и вставьте содержимое `testik_deploy.pub`, затем `chown -R testik:testik /home/testik/.ssh && chmod 700 /home/testik/.ssh && chmod 600 /home/testik/.ssh/authorized_keys`.
3. В GitHub → репозиторий → Settings → Secrets and variables → Actions:
   - Secrets: `BEGET_HOST` = IP сервера, `BEGET_SSH_KEY` = содержимое `testik_deploy` (приватный ключ).
   - Variables: `BEGET_DEPLOY` = `true`.

Workflow `.github/workflows/deploy-beget.yml` после этого запускает `deploy.sh` на каждый push в `main` и вручную из вкладки Actions.

Когда сайт на Beget заработает, Vercel можно отключить или оставить как запасное зеркало без входа и базы.

## Полезные команды

```bash
systemctl status testik            # работает ли сайт
journalctl -u testik -n 100 -f     # логи приложения
nginx -t && systemctl reload nginx # проверить и перечитать nginx
ls /var/backups/testik             # бэкапы базы
gunzip -c /var/backups/testik/testik-2026-11-06.sql.gz | sudo -u postgres psql testik   # восстановить
```

## Что лежит в `deploy/beget/`

| Файл | Зачем |
|---|---|
| `setup-server.sh` | Разовая настройка нового VPS |
| `deploy.sh` | Обновление сайта до свежего `main` |
| `env.production.example` | Шаблон `.env.local` со всеми переменными |
| `testik.service` | systemd-сервис (`next start` на 127.0.0.1:3000) |
| `nginx.conf` | Обратный прокси: сжатие, кэш статики, лимит запросов к API, без буферизации для стриминга |
| `backup-db.sh` | Ежедневный дамп Postgres |

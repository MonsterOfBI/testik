# testik

Bilingual (RU/EN) site with scientific and fun psychological tests: personality (Big Five, temperament, HEXACO…),
cognitive tests and mini-games (IQ, reaction time, Stroop, memory, n-back), mental-health screeners, relationships,
career and ~a dozen fun quizzes. Detailed results with charts, published norms, a generative "aura", friend comparison,
shareable result cards, personal space with a combined personality portrait and achievements.

## Stack
Next.js 16 (App Router, Cache Components, View Transitions), React 19, Tailwind CSS 4, Motion, Lenis, WebGL shader aura,
Auth.js v5 (VK, Yandex, email) + Drizzle ORM + Postgres, `next/og` for result images.

## Content
Every test is one JSON file in `src/content/tests/` (schema: `src/lib/types.ts`). `npm run content` regenerates the index;
`node scripts/validate-content.mjs` checks the files. Set `"draft": true` to hide a test.
Sources, licenses and methodology live inside each JSON and are shown on the test page.

## Develop
```bash
npm install
cp .env.example .env.local   # everything is optional for local dev
npm run dev
```
With `DATABASE_URL` set, run `npm run db:push` once to create tables.

## Deploy and legal
- Beget VPS deployment (nginx, systemd, Postgres, auto-deploy): `docs/deploy-beget.md`, files in `deploy/beget/`.
- Russian law checklist (152-ФЗ, 149-ФЗ, 436-ФЗ) and what is implemented: `docs/legal-ru.md`.
  Legal texts live in `src/content/legal.ts`; owner details come from `OPERATOR_*` env vars.

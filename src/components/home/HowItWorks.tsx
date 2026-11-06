import Link from "next/link";
import type { Locale } from "@/lib/types";

const COPY = {
  ru: {
    title: "Откуда берутся вопросы",
    items: [
      ["Открытые научные методики", "Научные тесты собраны из опросников с открытой лицензией: IPIP, ICAR, PHQ‑9, GAD‑7 и других. Ссылки на статьи есть у каждого теста."],
      ["Сравнение с нормами", "Ваш балл сравнивается с опубликованными данными больших выборок, поэтому видно, где вы находитесь среди других людей."],
      ["Весёлые тесты тоже с умом", "Развлекательные тесты опираются на исследования личности, но честно говорят, что они для удовольствия."],
    ],
    more: "Подробнее о методике",
  },
  en: {
    title: "Where the questions come from",
    items: [
      ["Open scientific instruments", "Scientific tests use openly licensed questionnaires: IPIP, ICAR, PHQ‑9, GAD‑7 and others. Every test links to its papers."],
      ["Compared with norms", "Your score is compared with published data from large samples, so you can see where you stand among other people."],
      ["Fun tests, built with care", "The fun quizzes draw on personality research but are honest that they're for enjoyment."],
    ],
    more: "Read about our method",
  },
};

export function HowItWorks({ lang }: { lang: Locale }) {
  const c = COPY[lang];
  return (
    <section className="mx-auto mt-24 max-w-6xl px-5">
      <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{c.title}</h2>
      <div className="mt-6 grid gap-8 md:grid-cols-3">
        {c.items.map(([h, p]) => (
          <div key={h} className="border-t border-line pt-5">
            <h3 className="font-medium">{h}</h3>
            <p className="mt-2 text-sm text-ink-2 text-pretty">{p}</p>
          </div>
        ))}
      </div>
      <Link href={`/${lang}/about`} className="mt-8 inline-block text-sm underline decoration-line-strong underline-offset-4 hover:decoration-ink">
        {c.more}
      </Link>
    </section>
  );
}

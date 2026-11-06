import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDict } from "@/i18n/dict";
import { tests, CATEGORY_ORDER } from "@/content/registry";

export const metadata: Metadata = { title: "Как мы работаем · How we work" };

const COPY = {
  ru: {
    h: "Как устроены тесты на testik",
    p: [
      "Научные тесты на сайте построены на опросниках, которые учёные открыто публикуют для свободного использования: банк вопросов IPIP, задачи ICAR, скрининговые шкалы PHQ‑9 и GAD‑7, шкалы самооценки, удовлетворённости жизнью, привязанности и другие. Мы не используем методики, защищённые авторским правом, вроде MMPI или официального MBTI, а берём их открытые научные аналоги.",
      "Баллы считаются по ключам из оригинальных статей. Если для шкалы опубликованы нормы большой выборки, мы показываем процентиль: какой доле людей ваш балл выше. Нормы взяты из зарубежных и российских исследований и указаны под каждым графиком, поэтому сравнение приблизительное.",
      "Развлекательные тесты написаны нами. Вопросы в них связаны с чертами личности из исследований, но сами тесты не проверялись научно и нужны для удовольствия.",
      "Скрининговые тесты (тревожность, депрессия, выгорание, СДВГ, аутистические черты) помогают заметить, что стоит обратить внимание на своё состояние. Они не ставят диагноз. Если результат вас тревожит, обратитесь к психологу, психотерапевту или врачу.",
      "Ответы на тесты хранятся в вашем браузере. Если вы войдёте в аккаунт, результаты сохраняются на сервере, чтобы они были доступны на других устройствах. Ответы не передаются в аналитику и рекламу.",
    ],
    list: "Все методики и источники",
  },
  en: {
    h: "How tests on testik work",
    p: [
      "Scientific tests here are built on questionnaires that researchers openly publish for free use: the IPIP item pool, ICAR ability items, the PHQ‑9 and GAD‑7 screeners, scales of self-esteem, life satisfaction, attachment and more. We don't use copyrighted instruments such as the MMPI or the official MBTI; we use their open scientific equivalents.",
      "Scores follow the keys from the original papers. When large-sample norms are published for a scale, we show your percentile: the share of people you score above. Norms come from international and Russian studies and are named under every chart, so the comparison is approximate.",
      "Fun quizzes are written by us. Their questions link to personality traits from research, but the quizzes themselves are not scientifically validated and are meant for enjoyment.",
      "Screening tests (anxiety, depression, burnout, ADHD, autistic traits) help you notice when your wellbeing deserves attention. They do not diagnose. If your result worries you, talk to a psychologist, therapist or doctor.",
      "Your answers are stored in your browser. If you sign in, results are saved on our server so you can see them on other devices. Answers are never sent to analytics or advertisers.",
    ],
    list: "All instruments and sources",
  },
};

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const c = COPY[lang];
  const d = getDict(lang);
  return (
    <div className="mx-auto max-w-3xl px-5 pt-10">
      <h1 className="font-display text-[clamp(2rem,5vw,3.2rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">{c.h}</h1>
      <div className="mt-8 space-y-5 text-[16.5px] leading-relaxed text-ink-2">
        {c.p.map((p, i) => (
          <p key={i} className="text-pretty">{p}</p>
        ))}
      </div>
      <h2 className="font-display mt-14 text-2xl font-medium">{c.list}</h2>
      {CATEGORY_ORDER.map((cat) => {
        const ts = tests.filter((t) => t.category === cat);
        if (!ts.length) return null;
        return (
          <div key={cat} className="mt-8">
            <h3 className="text-sm text-muted">{d.cat[cat]}</h3>
            <ul className="mt-3 space-y-3">
              {ts.map((t) => (
                <li key={t.id} className="border-t border-line pt-3">
                  <Link href={`/${lang}/tests/${t.id}`} className="font-medium hover:underline">
                    {t.emoji} {t.title[lang]}
                  </Link>
                  <p className="mt-1 text-sm text-muted">{t.license}</p>
                  {t.sources?.[0] && <p className="mt-1 text-xs text-muted">{t.sources[0].citation}</p>}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

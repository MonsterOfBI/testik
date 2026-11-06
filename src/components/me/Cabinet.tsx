"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import type { Locale, TestResult } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { fmt } from "@/i18n/dict";
import type { PortraitMeta } from "@/lib/portrait";
import { clearHistory, getHistory, useLocalData, type HistoryEntry } from "@/lib/history";
import { Aura } from "@/components/ui/Aura";
import { AccountActions } from "@/components/me/AccountActions";
import { auraFromScores } from "@/components/ui/auraMath";
import { Radar } from "@/components/results/Charts";
import { CAT_GRADIENT, PALETTE } from "@/lib/ui";
import { UnfinishedTests } from "./UnfinishedTests";

type Badge = { id: string; emoji: string; ru: string; en: string; test: (h: HistoryEntry[], m: Record<string, PortraitMeta>) => boolean };

const BADGES: Badge[] = [
  { id: "first", emoji: "🌱", ru: "Первый шаг", en: "First step", test: (h) => h.length >= 1 },
  { id: "five", emoji: "🖐️", ru: "Пять тестов", en: "Five tests", test: (h) => uniq(h).length >= 5 },
  { id: "ten", emoji: "🔟", ru: "Десятка", en: "Perfect ten", test: (h) => uniq(h).length >= 10 },
  { id: "science", emoji: "🔬", ru: "Научный подход", en: "Science mode", test: (h, m) => uniq(h).filter((id) => m[id]?.seriousness === "scientific").length >= 5 },
  { id: "fun", emoji: "🎉", ru: "Ради смеха", en: "Just for laughs", test: (h, m) => uniq(h).filter((id) => m[id]?.seriousness === "fun").length >= 5 },
  { id: "brain", emoji: "🧠", ru: "Мозговой штурм", en: "Brainstorm", test: (h, m) => uniq(h).filter((id) => m[id]?.category === "cognitive").length >= 3 },
  { id: "all-cats", emoji: "🌈", ru: "Все грани", en: "Every facet", test: (h, m) => new Set(uniq(h).map((id) => m[id]?.category)).size >= 7 },
  { id: "retake", emoji: "🔁", ru: "Перепроверка", en: "Double-check", test: (h) => h.length - uniq(h).length >= 1 },
];
function uniq(h: HistoryEntry[]) {
  return [...new Set(h.map((e) => e.result.testId))];
}

export function Cabinet({ lang, dict, metas }: { lang: Locale; dict: Dict; metas: PortraitMeta[] }) {
  const version = useLocalData();
  const hist = useMemo<HistoryEntry[]>(() => (version ? getHistory() : []), [version]);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const byId = useMemo(() => Object.fromEntries(metas.map((m) => [m.id, m])), [metas]);

  useEffect(() => {
    fetch("/api/auth/session").then((r) => r.json()).then((s) => setUser(s?.user ?? null)).catch(() => {});
  }, []);

  const latest = useMemo(() => {
    const out: Record<string, HistoryEntry> = {};
    for (const e of hist) if (byId[e.result.testId] && !out[e.result.testId]) out[e.result.testId] = e;
    return out;
  }, [hist, byId]);
  const done = Object.values(latest);

  const allNorms = done.flatMap((e) => e.result.dims.slice(0, 6).map((d) => d.norm));
  const aura = auraFromScores(allNorms.length ? allNorms : [0.5, 0.4, 0.6], PALETTE);
  const big5 = latest["big-five"];
  const big5Meta = byId["big-five"];

  return (
    <div className="mx-auto max-w-5xl px-5 pt-8">
      <section className="relative isolate grid items-center gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="font-display text-[clamp(2.2rem,6vw,3.8rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
            {user?.name ? user.name : dict.me.title}
          </h1>
          <p className="mt-3 text-ink-2">{fmt(dict.me.progress, { n: done.length, total: metas.length })}</p>
          <div className="mt-4 h-2 max-w-sm overflow-hidden rounded-full bg-surface-2">
            <motion.div className="h-full rounded-full bg-[linear-gradient(90deg,var(--lilac),var(--rose),var(--peach))]" initial={{ width: 0 }} animate={{ width: `${(done.length / Math.max(1, metas.length)) * 100}%` }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} />
          </div>
          {!user && (
            <p className="mt-6 max-w-md text-sm text-muted">
              {dict.me.localNote}{" "}
              <Link href={`/${lang}/signin`} className="text-ink underline underline-offset-4">
                {dict.nav.signIn}
              </Link>
            </p>
          )}
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[220px] md:max-w-[340px]">
          <Aura className="absolute inset-0" colors={aura.colors} sizes={aura.sizes} seed={aura.seed} />
        </div>
      </section>

      <UnfinishedTests lang={lang} dict={dict} byId={byId} />

      {/* portrait */}
      <section className="mt-12">
        <h2 className="font-display text-2xl font-medium tracking-tight">{dict.me.portrait}</h2>
        <p className="mt-1 text-sm text-muted">{dict.me.portraitNote}</p>
        {!done.length ? (
          <div className="mt-6 rounded-3xl border border-dashed border-line-strong p-10 text-center">
            <p className="text-ink-2">{dict.me.empty}</p>
            <Link href={`/${lang}#tests`} className="mt-5 inline-block rounded-2xl bg-ink px-5 py-3 text-sm font-medium text-bg">
              {dict.nav.tests}
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.4fr]">
            {big5 && big5Meta ? (
              <div className="rounded-3xl border border-line bg-surface p-5">
                <h3 className="font-medium">{big5Meta.title[lang]}</h3>
                <Radar labels={big5Meta.dims.map((d) => d.name[lang])} values={big5Meta.dims.map((d) => big5.result.dims.find((x) => x.id === d.id)?.norm ?? 0)} size={300} />
              </div>
            ) : (
              <Link href={`/${lang}/tests/big-five`} className="grid place-items-center rounded-3xl border border-dashed border-line-strong p-8 text-center text-sm text-ink-2 hover:text-ink">
                {lang === "ru" ? "Пройдите «Большую пятёрку», чтобы увидеть карту личности" : "Take the Big Five to unlock your personality map"}
              </Link>
            )}
            <div className="grid content-start gap-3 sm:grid-cols-2">
              {done.map((e, i) => (
                <PortraitCard key={e.result.testId} e={e} m={byId[e.result.testId]} lang={lang} i={i} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* badges */}
      <section className="mt-14">
        <h2 className="font-display text-2xl font-medium tracking-tight">{dict.me.badges}</h2>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BADGES.map((b, i) => {
            const got = b.test(hist, byId);
            return (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className={`rounded-3xl border p-4 text-center ${got ? "border-transparent bg-[linear-gradient(135deg,color-mix(in_oklab,var(--lilac)_30%,var(--surface)),color-mix(in_oklab,var(--peach)_25%,var(--surface)))]" : "border-line bg-surface opacity-50 grayscale"}`}
              >
                <div className="text-3xl">{b.emoji}</div>
                <div className="mt-2 text-sm font-medium">{b[lang]}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* history */}
      {hist.length > 0 && (
        <section className="mt-14">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-medium tracking-tight">{dict.me.history}</h2>
            <button
              onClick={() => {
                if (!confirm(dict.account.clearConfirm)) return;
                clearHistory();
                if (user) fetch("/api/results", { method: "DELETE" }).catch(() => {});
              }}
              className="text-sm text-muted hover:text-ink"
            >
              {dict.me.clear}
            </button>
          </div>
          <ul className="mt-4 divide-y divide-[var(--line)] rounded-3xl border border-line bg-surface">
            {hist.slice(0, 60).map((e, i) => {
              const m = byId[e.result.testId];
              if (!m) return null;
              return (
                <li key={i}>
                  <Link href={`/${lang}/r/${e.result.testId}/${e.code}`} className="flex items-center gap-4 px-5 py-3.5 hover:bg-surface-2">
                    <span className="text-xl">{m.emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate">{m.title[lang]}</span>
                      <span className="text-xs text-muted">{headline(e.result, m, lang)}</span>
                    </span>
                    <span className="text-xs tabular-nums text-muted">{new Date(e.result.at).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB")}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {user && <AccountActions lang={lang} dict={dict} />}
    </div>
  );
}

function headline(r: TestResult, m: PortraitMeta, lang: Locale) {
  const o = r.outcomeId && m.outcomes[r.outcomeId];
  if (o) return `${o.emoji} ${o.title[lang]}`;
  if (r.iq) return `IQ ≈ ${r.iq}`;
  if (r.correct !== undefined && r.total) return `${r.correct}/${r.total}`;
  const d = m.dims[0];
  const dr = d && r.dims.find((x) => x.id === d.id);
  return (d && dr && d.bands[dr.bandIndex]?.[lang]) || "";
}

function PortraitCard({ e, m, lang, i }: { e: HistoryEntry; m: PortraitMeta; lang: Locale; i: number }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.03 }}>
      <Link href={`/${lang}/r/${m.id}/${e.code}`} className="flex h-full items-center gap-3 rounded-2xl border border-line bg-surface p-3.5 hover:border-line-strong">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl text-xl" style={{ background: CAT_GRADIENT[m.category] }}>
          {m.emoji}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs text-muted">{m.title[lang]}</span>
          <span className="block truncate font-medium">{headline(e.result, m, lang)}</span>
        </span>
      </Link>
    </motion.div>
  );
}

"use client";

import Link from "next/link";
import { ViewTransition, useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import type { Category, Locale, TestMeta } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { CAT_GRADIENT, cx } from "@/lib/ui";
import { allProgress, latestByTest, useLocalData, type Progress } from "@/lib/history";
import { fmt } from "@/i18n/dict";

const CATS: (Category | "all")[] = ["all", "personality", "cognitive", "mental-health", "wellbeing", "relationships", "career", "fun"];

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

export function Catalog({ lang, dict, tests }: { lang: Locale; dict: Dict; tests: TestMeta[] }) {
  const [cat, setCat] = useState<Category | "all">("all");
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);
  const version = useLocalData();
  const { done, started } = useMemo(() => {
    if (!version) return { done: new Set<string>(), started: {} as Record<string, Progress> };
    return { done: new Set(Object.keys(latestByTest())), started: Object.fromEntries(allProgress().map((p) => [p.id, p])) };
  }, [version]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: tests.length };
    for (const t of tests) c[t.category] = (c[t.category] ?? 0) + 1;
    return c;
  }, [tests]);

  const list = useMemo(() => {
    const nq = norm(dq.trim());
    return tests.filter((t) => {
      if (cat !== "all" && t.category !== cat) return false;
      if (!nq) return true;
      const hay = norm(
        [t.title.ru, t.title.en, t.tagline.ru, t.tagline.en, t.description[lang], ...t.tags.flatMap((x) => [x.ru, x.en])].join(" "),
      );
      return nq.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [tests, cat, dq, lang]);

  return (
    <section id="tests" className="mx-auto max-w-6xl scroll-mt-24 px-5 pt-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{dict.catalog.title}</h2>
        <label className="relative block w-full md:w-96">
          <span className="sr-only">{dict.catalog.search}</span>
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={dict.catalog.search}
            type="search"
            enterKeyHint="search"
            className="w-full rounded-2xl border border-line bg-surface py-3 pl-11 pr-4 text-base outline-none sm:text-[15px] transition-[border-color,box-shadow] placeholder:text-muted focus:border-line-strong focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--lilac)_25%,transparent)]"
          />
        </label>
      </div>

      <LayoutGroup id="cats">
        <div className="-mx-5 mt-5 flex gap-1.5 overflow-x-auto px-5 pb-2" role="tablist">
          {CATS.map((c) => {
            const active = cat === c;
            return (
              <button
                key={c}
                role="tab"
                aria-selected={active}
                onClick={() => setCat(c)}
                className={cx(
                  "relative shrink-0 rounded-xl px-3.5 py-2 text-sm transition-colors",
                  active ? "text-accent-ink" : "text-ink-2 hover:text-ink",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="cat-pill"
                    className="absolute inset-0 rounded-xl bg-accent"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span className="relative">
                  {c === "all" ? dict.catalog.all : dict.cat[c]}
                  <span className={cx("ml-1.5 text-xs", active ? "opacity-70" : "text-muted")}>{counts[c] ?? 0}</span>
                </span>
              </button>
            );
          })}
        </div>
      </LayoutGroup>

      <motion.ul layout className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((t, i) => (
            <motion.li
              key={t.id}
              layout
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 30, delay: Math.min(i, 12) * 0.02 }}
              className={cx(t.popularity >= 5 && cat === "all" && !dq && "sm:col-span-2 lg:col-span-1")}
            >
              <TestCard t={t} lang={lang} dict={dict} done={done.has(t.id)} started={started[t.id]} />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      {!list.length && (
        <div className="mt-10 rounded-3xl border border-dashed border-line-strong p-10 text-center">
          <p className="text-ink-2">{dict.catalog.empty}</p>
          <button onClick={() => { setQ(""); setCat("all"); }} className="mt-4 rounded-xl bg-surface-2 px-4 py-2 text-sm">
            {dict.catalog.reset}
          </button>
        </div>
      )}
    </section>
  );
}

function TestCard({ t, lang, dict, done, started }: { t: TestMeta; lang: Locale; dict: Dict; done: boolean; started?: Progress }) {
  const onMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <Link
      href={`/${lang}/tests/${t.id}`}
      onPointerMove={onMove}
      className="group relative flex h-full min-h-44 flex-col overflow-hidden rounded-3xl border border-line bg-surface p-5 transition-[border-color,transform] duration-500 hover:border-line-strong active:scale-[0.99]"
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(260px circle at var(--mx) var(--my), color-mix(in oklab, var(--lilac) 18%, transparent), transparent 70%)" }}
      />
      <div className="relative flex items-start gap-4">
        <ViewTransition name={`emoji-${t.id}`} share="morph" default="none">
          <span
            className="grid size-14 shrink-0 place-items-center rounded-2xl text-[28px] shadow-[inset_0_-6px_14px_rgba(0,0,0,0.08)] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105"
            style={{ background: CAT_GRADIENT[t.category] }}
          >
            {t.emoji}
          </span>
        </ViewTransition>
        <div className="min-w-0">
          <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-balance">{t.title[lang]}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-ink-2">{t.tagline[lang]}</p>
        </div>
      </div>
      <div className="relative mt-auto flex flex-wrap items-center gap-x-3 gap-y-1 pt-5 text-xs text-muted">
        <span>{dict.cat[t.category]}</span>
        <span aria-hidden>•</span>
        <span>
          {t.durationMin} {dict.catalog.min}
        </span>
        {t.questionCount > 0 && (
          <>
            <span aria-hidden>•</span>
            <span>
              {t.questionCount} {dict.catalog.questions}
            </span>
          </>
        )}
        {started ? (
          <span className="ml-auto rounded-full bg-[color-mix(in_oklab,var(--peach)_30%,transparent)] px-2 py-0.5 text-[11px] tabular-nums text-ink">
            {fmt(dict.catalog.inProgress, { n: Object.keys(started.answers).length, total: started.total ?? t.questionCount })}
          </span>
        ) : (
          done && (
            <span className="ml-auto rounded-full bg-[color-mix(in_oklab,var(--mint)_30%,transparent)] px-2 py-0.5 text-[11px] text-ink">
              ✓ {dict.catalog.done}
            </span>
          )
        )}
      </div>
    </Link>
  );
}

"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Answers, Locale, Question, TestDef } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { fmt } from "@/i18n/dict";
import { canSaveProgress, getProgress, saveProgress } from "@/lib/history";
import { cx } from "@/lib/ui";
import { Visual } from "./Visual";

const LETTERS = "ABCDEFGHIJ";

export function Runner({
  test,
  lang,
  dict,
  onDone,
  onExit,
}: {
  test: TestDef;
  lang: Locale;
  dict: Dict;
  onDone: (a: Answers) => void;
  onExit: () => void;
}) {
  const qs = test.questions;
  const persist = canSaveProgress(test);
  const [state, setState] = useState<{ index: number; answers: Answers; dir: number }>(() => {
    if (persist) {
      const p = getProgress(test.id);
      if (p) {
        // drop answers to questions that no longer exist (content can change between visits)
        const ids = new Set(qs.map((x) => x.id));
        const answers = Object.fromEntries(Object.entries(p.answers).filter(([k]) => ids.has(k)));
        const firstOpen = qs.findIndex((x) => answers[x.id] === undefined);
        const index = Math.max(0, Math.min(p.index, firstOpen === -1 ? qs.length - 1 : firstOpen, qs.length - 1));
        return { index, answers, dir: 1 };
      }
    }
    return { index: 0, answers: {}, dir: 1 };
  });
  const { index, answers, dir } = state;
  const q = qs[index];
  const lock = useRef(false);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const answeredCount = Object.keys(answers).length;
  const progress = answeredCount / qs.length;

  // latest values for timers and keyboard handlers, updated after render
  const answersRef = useRef(answers);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    answersRef.current = answers;
    onDoneRef.current = onDone;
  });
  const doneOnce = useRef(false);
  const complete = useCallback((a: Answers) => {
    if (doneOnce.current) return;
    doneOnce.current = true;
    clearTimeout(advanceTimer.current);
    onDoneRef.current(a);
  }, []);

  // whole-test timer (cognitive tests); a deadline survives tab sleep better than counting ticks
  const [left, setLeft] = useState<number | null>(test.timeLimitSec ?? null);
  useEffect(() => {
    if (!test.timeLimitSec) return;
    const deadline = Date.now() + test.timeLimitSec * 1000;
    const tick = () => {
      const s = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setLeft(s);
      if (s === 0) {
        clearInterval(t);
        complete(answersRef.current);
      }
    };
    const t = setInterval(tick, 250);
    return () => clearInterval(t);
  }, [test.timeLimitSec, complete]);

  // save after every answer; ability tests and games are never resumed
  useEffect(() => {
    if (!persist || doneOnce.current || Object.keys(answers).length === 0) return;
    saveProgress(test.id, { answers, index, at: Date.now(), total: qs.length });
  }, [answers, index, test.id, persist, qs.length]);

  useEffect(() => () => clearTimeout(advanceTimer.current), []);

  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // bring the new question into view if the person scrolled down to answer
    const el = topRef.current;
    if (el && el.getBoundingClientRect().top < 0) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: Math.max(0, window.scrollY + el.getBoundingClientRect().top - 140), behavior: reduce ? "auto" : "smooth" });
    }
  }, [index]);

  const go = useCallback(
    (delta: number) => {
      if (lock.current) return;
      setState((s) => {
        const ni = s.index + delta;
        if (ni < 0 || ni >= qs.length) return s;
        return { ...s, index: ni, dir: delta };
      });
    },
    [qs.length],
  );

  const answer = useCallback(
    (value: number) => {
      if (lock.current || !q) return;
      lock.current = true;
      const isLast = index === qs.length - 1;
      const nextAnswers = { ...answers, [q.id]: value };
      setState((s) => ({ ...s, answers: nextAnswers }));
      advanceTimer.current = setTimeout(() => {
        lock.current = false;
        if (isLast) complete(nextAnswers);
        else setState((s) => ({ ...s, index: Math.min(s.index + 1, qs.length - 1), dir: 1 }));
      }, 260);
    },
    [answers, index, q, qs.length, complete],
  );

  const choices = useMemo(() => optionsFor(test, q, lang), [test, q, lang]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= choices.length) answer(choices[n - 1].value);
      else if (e.key === "ArrowLeft" || e.key === "Backspace") go(-1);
      else if (e.key === "ArrowRight" && q && answers[q.id] !== undefined) go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choices, answer, go, answers, q]);

  if (!q) return null;
  const selected = answers[q.id];
  const useDots = test.kind === "likert" && choices.length >= 5 && choices.every((c) => c.label.length <= 26);

  return (
    <div ref={topRef} className="min-h-[70dvh]">
      {/* top bar: sits right under the header and slides up with it when the header hides */}
      <div className="sticky top-[var(--header-offset,76px)] z-10 -mx-5 bg-[color-mix(in_oklab,var(--bg)_86%,transparent)] px-5 pb-3 pt-2 backdrop-blur-md transition-[top] duration-300 ease-out">
        <div className="flex items-center gap-3 text-sm text-muted">
          <button onClick={() => (index === 0 ? onExit() : go(-1))} className="-ml-2 min-h-11 rounded-lg px-2 py-1 hover:bg-surface-2 hover:text-ink">
            ← {dict.test.back}
          </button>
          <span className="ml-auto tabular-nums">
            {dict.test.question} {index + 1} {dict.test.of} {qs.length}
          </span>
          {left !== null && (
            <span className={cx("rounded-lg px-2 py-1 tabular-nums", left < 60 ? "bg-[color-mix(in_oklab,var(--danger)_20%,transparent)] text-ink" : "bg-surface-2")}>
              ⏱ {Math.floor(left / 60)}:{String(left % 60).padStart(2, "0")}
            </span>
          )}
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--lilac),var(--rose),var(--peach),var(--mint))] bg-[length:200%_100%]"
            animate={{ width: `${Math.max(2, progress * 100)}%`, backgroundPositionX: `${progress * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 22 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={q.id}
          custom={dir}
          variants={{
            enter: (d: number) => ({ opacity: 0, x: d * 40 }),
            center: { opacity: 1, x: 0 },
            exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8"
        >
          <h2 className="font-display text-[clamp(1.35rem,3.6vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.02em] text-balance">{q.text[lang]}</h2>
          {q.visual && (
            <div className="mt-6">
              <Visual spec={q.visual} lang={lang} />
            </div>
          )}

          {useDots ? (
            <LikertDots choices={choices} selected={selected} onPick={answer} />
          ) : (
            <ul className={cx("mt-8 grid gap-2.5", optionGrid(q, choices.length))}>
              {choices.map((c, i) => (
                <motion.li key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.04 * i + 0.08, duration: 0.3 }}>
                  <button
                    onClick={() => answer(c.value)}
                    className={cx(
                      "group flex w-full items-center gap-4 rounded-2xl border px-4 py-3.5 text-left transition-[background-color,border-color,transform] duration-200 active:scale-[0.99]",
                      selected === c.value ? "border-transparent bg-accent text-accent-ink" : "border-line bg-surface hover:border-line-strong hover:bg-surface-2",
                    )}
                  >
                    <span
                      className={cx(
                        "grid size-8 shrink-0 place-items-center rounded-xl text-xs font-semibold",
                        selected === c.value ? "bg-[color-mix(in_oklab,var(--accent-ink)_15%,transparent)]" : "bg-surface-2 text-muted group-hover:text-ink",
                      )}
                    >
                      {test.kind === "likert" ? i + 1 : LETTERS[i]}
                    </span>
                    {c.visual ? <Visual spec={c.visual} small lang={lang} /> : <span className="text-[15.5px] leading-snug">{c.label}</span>}
                  </button>
                </motion.li>
              ))}
            </ul>
          )}

          <div className="mt-8 flex items-center justify-between gap-3 text-xs text-muted">
            <span className="hidden [@media(pointer:fine)]:inline">{fmt(dict.test.keyboardHint, { n: choices.length })}</span>
            {persist && answeredCount > 0 && (
              <span className="flex items-center gap-1.5 [@media(pointer:fine)]:hidden">
                <span className="size-1.5 rounded-full bg-[var(--ok)]" aria-hidden />
                {dict.test.autosave}
              </span>
            )}
            <div className="ml-auto flex gap-2">
              {test.kind === "cognitive" && selected === undefined && (
                <button onClick={() => (index === qs.length - 1 ? complete(answers) : go(1))} className="min-h-11 rounded-xl px-3 py-2 text-sm hover:bg-surface-2 hover:text-ink">
                  {dict.test.skip}
                </button>
              )}
              {selected !== undefined && index < qs.length - 1 && (
                <button onClick={() => go(1)} className="min-h-11 shrink-0 rounded-xl px-3 py-2 text-sm hover:bg-surface-2 hover:text-ink">
                  {dict.test.next} →
                </button>
              )}
              {index === qs.length - 1 && answeredCount > 0 && selected !== undefined && (
                <button onClick={() => complete(answers)} className="min-h-11 shrink-0 rounded-xl bg-ink px-4 py-2 text-sm font-medium text-bg">
                  {dict.test.finish}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

type Choice = { label: string; value: number; visual?: unknown };

function optionsFor(test: TestDef, q: Question | undefined, lang: Locale): Choice[] {
  if (!q) return [];
  if (test.kind === "likert" && test.likert) {
    return test.likert.anchors.map((a, i) => ({ label: a[lang] ?? a.ru, value: test.likert!.values[i] }));
  }
  const optVisuals: unknown[] | undefined = q.visual?.options;
  return (q.options ?? []).map((o, i) => ({
    label: o.text?.[lang] ?? "",
    value: i,
    visual: (o as { visual?: unknown }).visual ?? optVisuals?.[i],
  }));
}

function optionGrid(q: Question, n: number) {
  const visual = q.options?.some((o) => (o as { visual?: unknown }).visual) || Array.isArray(q.visual?.options);
  if (visual) return n > 6 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3";
  return "grid-cols-1";
}

function LikertDots({ choices, selected, onPick }: { choices: Choice[]; selected?: number; onPick: (v: number) => void }) {
  const n = choices.length;
  const mid = (n - 1) / 2;
  return (
    <div className="mt-10">
      <div className="flex items-start justify-between gap-1 sm:gap-3">
        {choices.map((c, i) => {
          const dist = Math.abs(i - mid) / mid; // 0 center .. 1 ends
          const size = 34 + dist * 30;
          const color = i < mid ? "var(--rose)" : i > mid ? "var(--mint)" : "var(--lilac)";
          const active = selected === c.value;
          return (
            <button key={i} onClick={() => onPick(c.value)} className="group flex flex-1 flex-col items-center gap-3" aria-pressed={active}>
              <span className="grid h-16 place-items-center">
                <motion.span
                  className="block rounded-full border-2"
                  style={{ width: size, height: size, borderColor: color }}
                  animate={{ backgroundColor: active ? color : "rgba(0,0,0,0)", scale: active ? 1.12 : 1 }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                />
              </span>
              <span className={cx("text-center text-[11.5px] leading-tight sm:text-[13px]", active ? "text-ink" : "text-muted group-hover:text-ink-2")}>{c.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

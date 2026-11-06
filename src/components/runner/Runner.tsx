"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Answers, Locale, Question, TestDef } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { fmt } from "@/i18n/dict";
import { getProgress, saveProgress } from "@/lib/history";
import { cx } from "@/lib/ui";
import { Visual } from "./Visual";

const LETTERS = "ABCDEFGHIJ";

export function Runner({
  test,
  lang,
  dict,
  fresh,
  onDone,
  onExit,
}: {
  test: TestDef;
  lang: Locale;
  dict: Dict;
  fresh: boolean;
  onDone: (a: Answers) => void;
  onExit: () => void;
}) {
  const qs = test.questions;
  const [state, setState] = useState<{ index: number; answers: Answers; dir: number }>(() => {
    if (!fresh) {
      const p = getProgress(test.id);
      if (p) return { index: Math.min(p.index, qs.length - 1), answers: p.answers, dir: 1 };
    }
    return { index: 0, answers: {}, dir: 1 };
  });
  const { index, answers, dir } = state;
  const q = qs[index];
  const lock = useRef(false);
  const answeredCount = Object.keys(answers).length;
  const progress = (index + (answers[q?.id] !== undefined ? 1 : 0)) / qs.length;

  // whole-test timer (cognitive tests)
  const [left, setLeft] = useState<number | null>(test.timeLimitSec ?? null);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  useEffect(() => {
    if (!test.timeLimitSec) return;
    const t = setInterval(() => {
      setLeft((s) => {
        if (s === null) return s;
        if (s <= 1) {
          clearInterval(t);
          onDone(answersRef.current);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [test.timeLimitSec, onDone]);

  useEffect(() => {
    saveProgress(test.id, { answers, index, at: Date.now() });
  }, [answers, index, test.id]);

  useEffect(() => {
    if (window.scrollY > 120) window.scrollTo({ top: 0, behavior: "smooth" });
  }, [index]);

  const go = useCallback(
    (delta: number) => {
      setState((s) => {
        const ni = s.index + delta;
        if (ni < 0) return s;
        if (ni >= qs.length) return s;
        return { ...s, index: ni, dir: delta };
      });
    },
    [qs.length],
  );

  const answer = useCallback(
    (value: number) => {
      if (lock.current) return;
      lock.current = true;
      const nextAnswers = { ...answers, [q.id]: value };
      setState((s) => ({ ...s, answers: nextAnswers }));
      setTimeout(() => {
        lock.current = false;
        if (index === qs.length - 1) onDone(nextAnswers);
        else setState((s) => ({ ...s, index: s.index + 1, dir: 1 }));
      }, 260);
    },
    [answers, index, q, qs.length, onDone],
  );

  const choices = useMemo(() => optionsFor(test, q, lang), [test, q, lang]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= choices.length) answer(choices[n - 1].value);
      else if (e.key === "ArrowLeft" || e.key === "Backspace") go(-1);
      else if (e.key === "ArrowRight" && answers[q.id] !== undefined) go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [choices, answer, go, answers, q]);

  if (!q) return null;
  const selected = answers[q.id];
  const useDots = test.kind === "likert" && choices.length >= 5 && choices.every((c) => c.label.length <= 26);

  return (
    <div className="min-h-[70dvh]">
      {/* top bar */}
      <div className="sticky top-[76px] z-10 -mx-5 bg-[color-mix(in_oklab,var(--bg)_82%,transparent)] px-5 pb-3 pt-2 backdrop-blur-md md:top-[84px]">
        <div className="flex items-center gap-3 text-sm text-muted">
          <button onClick={() => (index === 0 ? onExit() : go(-1))} className="rounded-lg px-2 py-1 hover:bg-surface-2 hover:text-ink" aria-label={dict.test.back}>
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
            enter: (d: number) => ({ opacity: 0, x: d * 48, filter: "blur(6px)" }),
            center: { opacity: 1, x: 0, filter: "blur(0px)" },
            exit: (d: number) => ({ opacity: 0, x: d * -48, filter: "blur(6px)" }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
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

          <div className="mt-8 flex items-center justify-between text-xs text-muted">
            <span className="hidden sm:inline">{fmt(dict.test.keyboardHint, { n: choices.length })}</span>
            <div className="ml-auto flex gap-2">
              {test.kind === "cognitive" && selected === undefined && (
                <button onClick={() => (index === qs.length - 1 ? onDone(answers) : go(1))} className="rounded-xl px-3 py-2 text-sm hover:bg-surface-2 hover:text-ink">
                  {dict.test.skip}
                </button>
              )}
              {selected !== undefined && index < qs.length - 1 && (
                <button onClick={() => go(1)} className="rounded-xl px-3 py-2 text-sm hover:bg-surface-2 hover:text-ink">
                  {dict.test.next} →
                </button>
              )}
              {index === qs.length - 1 && answeredCount > 0 && selected !== undefined && (
                <button onClick={() => onDone(answers)} className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-bg">
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

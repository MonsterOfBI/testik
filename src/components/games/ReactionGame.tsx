"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { deriveResult } from "@/lib/scoring";
import type { GameProps } from "./GameHost";
import { Countdown, StageCard, TrialDots, median, plainKey, sd, shuffle } from "./shared";

const SIMPLE_TRIALS = 12;
const CHOICE_TRIALS = 24; // each of the 4 positions 6 times, shuffled
const KEYS = ["d", "f", "j", "k"];

const T = {
  ru: {
    s1: "Часть 1. Простая реакция",
    s1t: "Когда круг станет мятно-зелёным, как можно быстрее нажмите на него, пробел или любую клавишу. Не торопитесь раньше времени: фальстарт засчитывается заново.",
    s2: "Часть 2. Реакция выбора",
    s2t: "Звёздочка появится в одном из четырёх окошек. Нажмите на него или клавишу D, F, J или K (слева направо).",
    go: "Поехали",
    wait: "Ждите зелёного…",
    now: "Жми!",
    early: "Фальстарт! Повторим попытку.",
    ms: "мс",
  },
  en: {
    s1: "Part 1. Simple reaction",
    s1t: "When the circle turns mint green, click it, press space or any key as fast as you can. Don't jump early: a false start is repeated.",
    s2: "Part 2. Choice reaction",
    s2t: "A star will appear in one of four boxes. Tap that box or press D, F, J or K (left to right).",
    go: "Let's go",
    wait: "Wait for green…",
    now: "Now!",
    early: "False start! Let's repeat that one.",
    ms: "ms",
  },
};

type Stage = "intro1" | "count1" | "simple" | "intro2" | "count2" | "choice";

export function ReactionGame({ test, lang, onDone }: GameProps) {
  const t = T[lang];
  const [stage, setStage] = useState<Stage>("intro1");
  const [simple, setSimple] = useState<number[]>([]);
  const [choice, setChoice] = useState<{ rt: number; ok: boolean }[]>([]);
  const [armed, setArmed] = useState<"wait" | "go" | "early" | null>(null);
  const [target, setTarget] = useState<number | null>(null);
  const [last, setLast] = useState<number | null>(null);
  const shownAt = useRef(0);
  const order = useRef<number[]>(shuffle(Array.from({ length: CHOICE_TRIALS }, (_, k) => k % 4)));
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startSimpleTrial = useCallback(() => {
    setArmed("wait");
    const fore = 1000 + Math.random() * 3000;
    timer.current = setTimeout(() => {
      shownAt.current = performance.now();
      setArmed("go");
      // stamp the onset in the frame the stimulus gets painted
      requestAnimationFrame(() => (shownAt.current = performance.now()));
    }, fore);
  }, []);

  const startChoiceTrial = useCallback((k: number) => {
    setTarget(null);
    const fore = 700 + Math.random() * 1600;
    timer.current = setTimeout(() => {
      shownAt.current = performance.now();
      setTarget(order.current[k % CHOICE_TRIALS]);
      requestAnimationFrame(() => (shownAt.current = performance.now()));
    }, fore);
  }, []);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const finish = useCallback(
    (s: number[], c: { rt: number; ok: boolean }[]) => {
      const okRts = c.filter((x) => x.ok && x.rt >= 100 && x.rt <= 2000).map((x) => x.rt);
      const sv = s.filter((x) => x >= 100 && x <= 1500);
      const raws = {
        simple_rt: Math.round(median(sv.length ? sv : s)),
        choice_rt: Math.round(median(okRts)),
        consistency: Math.round(sd(sv.length ? sv : s)),
        choice_accuracy: Math.round((c.filter((x) => x.ok).length / Math.max(1, c.length)) * 100),
      };
      onDone(deriveResult(test, raws, { at: Date.now(), extra: { simple: s, choice: c } }));
    },
    [onDone, test],
  );

  const hitSimple = useCallback(() => {
    if (stage !== "simple") return;
    if (armed === "wait") {
      if (timer.current) clearTimeout(timer.current);
      setArmed("early");
      setTimeout(startSimpleTrial, 1100);
      return;
    }
    if (armed !== "go") return;
    const rt = performance.now() - shownAt.current;
    if (rt < 100) {
      // anticipation, not a reaction: treat as a false start
      setArmed("early");
      setTimeout(startSimpleTrial, 1100);
      return;
    }
    setLast(Math.round(rt));
    setArmed(null);
    const next = [...simple, rt];
    setSimple(next);
    if (next.length >= SIMPLE_TRIALS) setTimeout(() => setStage("intro2"), 700);
    else setTimeout(startSimpleTrial, 650);
  }, [stage, armed, simple, startSimpleTrial]);

  const hitChoice = useCallback(
    (i: number) => {
      if (stage !== "choice" || target === null) return;
      const rt = performance.now() - shownAt.current;
      const next = [...choice, { rt, ok: i === target }];
      setChoice(next);
      setLast(Math.round(rt));
      setTarget(null);
      if (next.length >= CHOICE_TRIALS) setTimeout(() => finish(simple, next), 400);
      else startChoiceTrial(next.length);
    },
    [stage, target, choice, simple, finish, startChoiceTrial],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!plainKey(e)) return;
      if (stage === "simple") {
        e.preventDefault();
        hitSimple();
      } else if (stage === "choice") {
        const i = KEYS.indexOf(e.key.toLowerCase());
        if (i >= 0) hitChoice(i);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [stage, hitSimple, hitChoice]);

  if (stage === "intro1")
    return (
      <StageCard title={t.s1} action={t.go} onAction={() => setStage("count1")}>
        {t.s1t}
      </StageCard>
    );
  if (stage === "count1")
    return (
      <Countdown
        onDone={() => {
          setStage("simple");
          startSimpleTrial();
        }}
      />
    );
  if (stage === "intro2")
    return (
      <StageCard title={t.s2} action={t.go} onAction={() => setStage("count2")}>
        {t.s2t}
      </StageCard>
    );
  if (stage === "count2")
    return (
      <Countdown
        onDone={() => {
          setStage("choice");
          setLast(null);
          startChoiceTrial(0);
        }}
      />
    );

  if (stage === "simple") {
    const color = armed === "go" ? "var(--mint)" : armed === "early" ? "var(--rose)" : "var(--surface-2)";
    return (
      <div className="py-6">
        <TrialDots total={SIMPLE_TRIALS} done={simple.length} />
        <button onPointerDown={hitSimple} className="mx-auto mt-8 grid aspect-square w-full max-w-[420px] place-items-center rounded-full outline-none" aria-label="target">
          <motion.span
            className="grid size-full place-items-center rounded-full"
            animate={{ backgroundColor: color, scale: armed === "go" ? 1.03 : 1 }}
            transition={{ duration: armed === "go" ? 0 : 0.25 }}
          >
            <span className="font-display text-xl text-ink">
              {armed === "go" ? t.now : armed === "early" ? t.early : t.wait}
            </span>
          </motion.span>
        </button>
        <p className="mt-6 h-6 text-center tabular-nums text-muted">{last !== null && `${last} ${t.ms}`}</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <TrialDots total={CHOICE_TRIALS} done={choice.length} ok={choice.map((c) => c.ok)} />
      <div className="mx-auto mt-10 grid max-w-xl grid-cols-4 gap-2 sm:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <button
            key={i}
            onPointerDown={() => hitChoice(i)}
            className="grid aspect-[3/4] place-items-center rounded-3xl border border-line bg-surface text-4xl"
          >
            {target === i && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 700, damping: 20 }}>
                ⭐
              </motion.span>
            )}
            <span className="sr-only">{KEYS[i].toUpperCase()}</span>
          </button>
        ))}
      </div>
      <div className="mx-auto mt-3 grid max-w-xl grid-cols-4 text-center text-xs text-muted">
        {KEYS.map((k) => (
          <span key={k}>{k.toUpperCase()}</span>
        ))}
      </div>
      <p className="mt-6 h-6 text-center tabular-nums text-muted">{last !== null && `${last} ${t.ms}`}</p>
    </div>
  );
}

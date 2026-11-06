"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { deriveResult } from "@/lib/scoring";
import type { GameProps } from "./GameHost";
import { Countdown, StageCard, TrialDots, zInv } from "./shared";

const LETTERS = "BCDFGHJKLMNPQRSTVWXZ".split("");
const N = 2;
const TRIALS = 30; // scored trials after the first N
const STIM_MS = 500;
const ISI_MS = 2000;

const T = {
  ru: {
    title: "2-back",
    text: "Буквы появляются по одной. Нажмите «Совпало» (или пробел), если буква такая же, как две буквы назад. Например: К, М, К — на второй «К» нужно нажать. Около трети букв совпадают.",
    go: "Начать",
    match: "Совпало",
  },
  en: {
    title: "2-back",
    text: "Letters appear one at a time. Press “Match” (or space) when the letter is the same as the one two steps back. For example: K, M, K — press on the second K. About a third of the letters match.",
    go: "Start",
    match: "Match",
  },
};

function makeSeq() {
  const total = TRIALS + N;
  const seq: string[] = [];
  const targets: boolean[] = [];
  for (let i = 0; i < total; i++) {
    const isTarget = i >= N && Math.random() < 0.33;
    if (isTarget) seq.push(seq[i - N]);
    else {
      let l: string;
      do l = LETTERS[Math.floor(Math.random() * LETTERS.length)];
      while (i >= N && l === seq[i - N]);
      seq.push(l);
    }
    targets.push(i >= N && seq[i] === seq[i - N]);
  }
  return { seq, targets };
}

export function NBackGame({ test, lang, onDone }: GameProps) {
  const t = T[lang];
  const [stage, setStage] = useState<"intro" | "count" | "run">("intro");
  const [i, setI] = useState(-1);
  const [on, setOn] = useState(false);
  const [pressedFx, setPressedFx] = useState(0);
  const data = useRef(makeSeq());
  const responses = useRef<boolean[]>([]);
  const rts = useRef<number[]>([]);
  const shownAt = useRef(0);

  const finish = useCallback(() => {
    const { targets } = data.current;
    let hits = 0, misses = 0, fa = 0, cr = 0;
    for (let k = N; k < targets.length; k++) {
      const r = !!responses.current[k];
      if (targets[k]) r ? hits++ : misses++;
      else r ? fa++ : cr++;
    }
    // log-linear correction (Hautus 1995)
    const H = (hits + 0.5) / (hits + misses + 1);
    const F = (fa + 0.5) / (fa + cr + 1);
    const dprime = Math.round((zInv(H) - zInv(F)) * 100) / 100;
    const accuracy = Math.round(((hits + cr) / Math.max(1, hits + misses + fa + cr)) * 100);
    onDone(deriveResult(test, { dprime, accuracy, hit_rate: Math.round(H * 100), false_alarm_rate: Math.round(F * 100) }, { at: Date.now(), extra: { hits, misses, fa, cr } }));
  }, [onDone, test]);

  useEffect(() => {
    if (stage !== "run") return;
    let k = 0;
    let alive = true;
    const step = () => {
      if (!alive) return;
      if (k >= data.current.seq.length) {
        finish();
        return;
      }
      setI(k);
      setOn(true);
      shownAt.current = performance.now();
      setTimeout(() => alive && setOn(false), STIM_MS);
      k++;
      setTimeout(step, STIM_MS + ISI_MS);
    };
    step();
    return () => {
      alive = false;
    };
  }, [stage, finish]);

  const press = useCallback(() => {
    if (stage !== "run" || i < 0 || responses.current[i]) return;
    responses.current[i] = true;
    rts.current.push(performance.now() - shownAt.current);
    setPressedFx((x) => x + 1);
  }, [stage, i]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        press();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  if (stage === "intro")
    return (
      <StageCard title={t.title} action={t.go} onAction={() => setStage("count")}>
        {t.text}
      </StageCard>
    );
  if (stage === "count") return <Countdown onDone={() => setStage("run")} />;

  return (
    <div className="py-6 text-center">
      <TrialDots total={data.current.seq.length} done={Math.max(0, i + 1)} />
      <div className="mx-auto mt-8 grid size-56 place-items-center rounded-[2.5rem] border border-line bg-surface sm:size-64">
        <AnimatePresence>
          {on && i >= 0 && (
            <motion.span
              key={i}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.12 }}
              className="font-display text-8xl font-semibold"
            >
              {data.current.seq[i]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <motion.button
        key={pressedFx}
        onPointerDown={press}
        animate={pressedFx ? { scale: [0.94, 1] } : undefined}
        className="mt-8 rounded-2xl bg-ink px-10 py-4 font-medium text-bg"
      >
        {t.match}
      </motion.button>
    </div>
  );
}

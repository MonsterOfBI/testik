"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { deriveResult } from "@/lib/scoring";
import type { GameProps } from "./GameHost";
import { StageCard, plainKey, sleep } from "./shared";

const T = {
  ru: {
    f: "Цифры по порядку",
    ft: "Цифры будут появляться по одной. Запомните их и введите в том же порядке. Каждый раз ряд становится длиннее. На каждую длину есть две попытки.",
    b: "Цифры наоборот",
    bt: "Теперь введите цифры в обратном порядке: последнюю первой.",
    go: "Начать",
    watch: "Запоминайте",
    type: "Введите цифры",
    typeB: "Введите в обратном порядке",
    ok: "Верно!",
    no: "Не совсем",
    len: "Длина",
    del: "Стереть",
    done: "Готово",
  },
  en: {
    f: "Digits forward",
    ft: "Digits will appear one at a time. Remember them and type them in the same order. The sequence gets longer each time. You have two tries at every length.",
    b: "Digits backward",
    bt: "Now type the digits in reverse order: the last one first.",
    go: "Start",
    watch: "Watch closely",
    type: "Type the digits",
    typeB: "Type them in reverse",
    ok: "Correct!",
    no: "Not quite",
    len: "Length",
    del: "Delete",
    done: "Done",
  },
};

type Mode = "forward" | "backward";

function seq(n: number) {
  const out: number[] = [];
  while (out.length < n) {
    const d = Math.floor(Math.random() * 10);
    if (out[out.length - 1] !== d) out.push(d);
  }
  return out;
}

export function SpanGame({ test, lang, onDone }: GameProps) {
  const t = T[lang];
  const [stage, setStage] = useState<"introF" | "introB" | "show" | "input" | "feedback">("introF");
  const [mode, setMode] = useState<Mode>("forward");
  const [len, setLen] = useState(3);
  const [attempt, setAttempt] = useState(0);
  const [fails, setFails] = useState(0);
  const [current, setCurrent] = useState<number[]>([]);
  const [shown, setShown] = useState<{ d: number; k: number } | null>(null);
  const [typed, setTyped] = useState<number[]>([]);
  const [lastOk, setLastOk] = useState<boolean | null>(null);
  const best = useRef({ forward: 0, backward: 0 });
  const passedThisLen = useRef(false);

  const run = useCallback(async (n: number) => {
    const s = seq(n);
    setCurrent(s);
    setTyped([]);
    setStage("show");
    await sleep(600);
    for (const [k, d] of s.entries()) {
      setShown({ d, k });
      await sleep(800);
      setShown(null);
      await sleep(250);
    }
    setStage("input");
  }, []);

  const submit = useCallback(
    (entry: number[]) => {
      const target = mode === "forward" ? current : [...current].reverse();
      const ok = entry.length === target.length && entry.every((d, i) => d === target[i]);
      setLastOk(ok);
      setStage("feedback");
      if (ok) {
        best.current[mode] = Math.max(best.current[mode], len);
        passedThisLen.current = true;
      }
      const nextFails = ok ? 0 : fails + 1;
      setTimeout(() => {
        // two attempts per length; advance if either passed, stop after both failed
        if (attempt === 0) {
          setAttempt(1);
          setFails(nextFails);
          run(len);
          return;
        }
        const passed = passedThisLen.current;
        passedThisLen.current = false;
        setAttempt(0);
        setFails(0);
        if (passed && len < 10) {
          setLen(len + 1);
          run(len + 1);
        } else if (mode === "forward") {
          setMode("backward");
          setLen(2);
          setStage("introB");
        } else {
          const raws = { forward_span: best.current.forward, backward_span: best.current.backward };
          onDone(deriveResult(test, raws, { at: Date.now() }));
        }
      }, 900);
    },
    [mode, current, len, attempt, fails, run, onDone, test],
  );

  const press = useCallback(
    (d: number) => {
      if (stage !== "input") return;
      const next = [...typed, d];
      setTyped(next);
      if (next.length === current.length) setTimeout(() => submit(next), 150);
    },
    [stage, typed, current.length, submit],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!plainKey(e)) return;
      if (/^[0-9]$/.test(e.key)) press(Number(e.key));
      else if (e.key === "Backspace") setTyped((x) => x.slice(0, -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [press]);

  if (stage === "introF")
    return (
      <StageCard title={t.f} action={t.go} onAction={() => run(3)}>
        {t.ft}
      </StageCard>
    );
  if (stage === "introB")
    return (
      <StageCard title={t.b} action={t.go} onAction={() => run(2)}>
        {t.bt}
      </StageCard>
    );

  return (
    <div className="py-6 text-center">
      <p className="text-sm text-muted">
        {mode === "forward" ? t.f : t.b} • {t.len} {len}
      </p>
      <div className="mx-auto mt-8 grid h-48 max-w-md place-items-center rounded-3xl border border-line bg-surface">
        {stage === "show" && (
          <AnimatePresence mode="popLayout">
            {shown !== null ? (
              <motion.span
                key={shown.k}
                initial={{ scale: 0.5, opacity: 0, filter: "blur(6px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                exit={{ scale: 1.4, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-display text-8xl font-semibold"
              >
                {shown.d}
              </motion.span>
            ) : (
              <span className="text-muted">{t.watch}</span>
            )}
          </AnimatePresence>
        )}
        {stage === "input" && (
          <div>
            <p className="text-sm text-muted">{mode === "forward" ? t.type : t.typeB}</p>
            <div className="mt-4 flex justify-center gap-2">
              {current.map((_, i) => (
                <motion.span
                  key={i}
                  animate={{ scale: typed[i] !== undefined ? 1 : 0.9, backgroundColor: typed[i] !== undefined ? "var(--lilac)" : "var(--surface-2)" }}
                  className="grid size-10 place-items-center rounded-xl font-display text-lg text-[#1b1433]"
                >
                  {typed[i] ?? ""}
                </motion.span>
              ))}
            </div>
          </div>
        )}
        {stage === "feedback" && (
          <motion.p initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="font-display text-2xl" style={{ color: lastOk ? "var(--ok)" : "var(--danger)" }}>
            {lastOk ? t.ok : t.no}
          </motion.p>
        )}
      </div>
      <div className="mx-auto mt-6 grid max-w-xs grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((d) => (
          <button key={d} onPointerDown={() => press(d)} disabled={stage !== "input"} className="rounded-2xl border border-line bg-surface py-4 font-display text-xl transition-transform active:scale-95 disabled:opacity-40">
            {d}
          </button>
        ))}
        <button onPointerDown={() => setTyped((x) => x.slice(0, -1))} disabled={stage !== "input"} className="rounded-2xl py-4 text-sm text-muted disabled:opacity-40">
          {t.del}
        </button>
        <button onPointerDown={() => press(0)} disabled={stage !== "input"} className="rounded-2xl border border-line bg-surface py-4 font-display text-xl transition-transform active:scale-95 disabled:opacity-40">
          0
        </button>
      </div>
    </div>
  );
}

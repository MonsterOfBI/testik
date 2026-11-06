"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { deriveResult } from "@/lib/scoring";
import type { GameProps } from "./GameHost";
import { Countdown, StageCard, TrialDots, mean, plainKey, shuffle } from "./shared";

const COLORS = [
  { id: "red", hex: "#ff7a95", ru: "КРАСНЫЙ", en: "RED", btnRu: "Красный", btnEn: "Red" },
  { id: "green", hex: "#5fd3a2", ru: "ЗЕЛЁНЫЙ", en: "GREEN", btnRu: "Зелёный", btnEn: "Green" },
  { id: "blue", hex: "#6fa8ff", ru: "СИНИЙ", en: "BLUE", btnRu: "Синий", btnEn: "Blue" },
  { id: "yellow", hex: "#f5c84c", ru: "ЖЁЛТЫЙ", en: "YELLOW", btnRu: "Жёлтый", btnEn: "Yellow" },
];
const PER_TYPE = 16; // 16 congruent + 16 incongruent + 16 neutral = 48
const PRACTICE = 6;

type Trial = { word: string; ink: number; type: "congruent" | "incongruent" | "neutral" };
type Resp = Trial & { rt: number; ok: boolean };

const T = {
  ru: {
    title: "Тест Струпа",
    text: "На экране появятся слова, написанные цветными буквами. Нажимайте кнопку с цветом букв, а не со значением слова. Клавиши 1–4 тоже работают. Сначала шесть тренировочных слов.",
    go: "Начать тренировку",
    real: "Отлично! Теперь по-настоящему",
    realText: "48 слов. Отвечайте быстро, но старайтесь не ошибаться.",
    start: "Начать",
    practice: "Тренировка",
  },
  en: {
    title: "Stroop test",
    text: "Words will appear in coloured letters. Press the button for the colour of the letters, not the meaning of the word. Keys 1–4 work too. First, six practice words.",
    go: "Start practice",
    real: "Great! Now for real",
    realText: "48 words. Answer quickly but try not to make mistakes.",
    start: "Start",
    practice: "Practice",
  },
};

function makeTrials(n: number, lang: "ru" | "en"): Trial[] {
  const out: Trial[] = [];
  for (let i = 0; i < n; i++) {
    const ink = i % 4;
    out.push({ word: COLORS[ink][lang], ink, type: "congruent" });
    let w = Math.floor(Math.random() * 3);
    if (w >= ink) w++;
    out.push({ word: COLORS[w][lang], ink, type: "incongruent" });
    out.push({ word: "XXXXX", ink, type: "neutral" });
  }
  return shuffle(out);
}

export function StroopGame({ test, lang, onDone }: GameProps) {
  const t = T[lang];
  const [stage, setStage] = useState<"intro" | "practice" | "mid" | "count" | "run">("intro");
  const [trials, setTrials] = useState<Trial[]>([]);
  const [i, setI] = useState(0);
  const [resp, setResp] = useState<Resp[]>([]);
  const [visible, setVisible] = useState(false);
  const [flash, setFlash] = useState<null | boolean>(null);
  const shownAt = useRef(0);

  const show = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      shownAt.current = performance.now();
      setVisible(true);
    }, 450);
  }, []);

  const begin = (practice: boolean) => {
    setTrials(practice ? makeTrials(2, lang).slice(0, PRACTICE) : makeTrials(PER_TYPE, lang));
    setI(0);
    setResp([]);
    setStage(practice ? "practice" : "run");
    show();
  };

  const answer = useCallback(
    (c: number) => {
      if (!visible || (stage !== "practice" && stage !== "run")) return;
      const tr = trials[i];
      const rt = performance.now() - shownAt.current;
      const ok = c === tr.ink;
      setFlash(ok);
      setTimeout(() => setFlash(null), 220);
      const next = [...resp, { ...tr, rt, ok }];
      setResp(next);
      if (i + 1 >= trials.length) {
        setVisible(false);
        if (stage === "practice") setTimeout(() => setStage("mid"), 400);
        else {
          const by = (type: Trial["type"]) => next.filter((r) => r.type === type && r.ok && r.rt > 200 && r.rt < 3000).map((r) => r.rt);
          const raws = {
            interference: Math.round(mean(by("incongruent")) - mean(by("congruent"))),
            congruent_rt: Math.round(mean(by("congruent"))),
            incongruent_rt: Math.round(mean(by("incongruent"))),
            accuracy: Math.round((next.filter((r) => r.ok).length / next.length) * 100),
          };
          setTimeout(() => onDone(deriveResult(test, raws, { at: Date.now() })), 300);
        }
        return;
      }
      setI(i + 1);
      show();
    },
    [visible, stage, trials, i, resp, show, onDone, test],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!plainKey(e)) return;
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 4) answer(n - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [answer]);

  if (stage === "intro")
    return (
      <StageCard title={t.title} action={t.go} onAction={() => begin(true)}>
        {t.text}
      </StageCard>
    );
  if (stage === "mid")
    return (
      <StageCard title={t.real} action={t.start} onAction={() => setStage("count")}>
        {t.realText}
      </StageCard>
    );
  if (stage === "count") return <Countdown onDone={() => begin(false)} />;

  const tr = trials[i];
  return (
    <div className="py-6">
      {stage === "practice" ? <p className="text-center text-sm text-muted">{t.practice}</p> : <TrialDots total={trials.length} done={resp.length} ok={resp.map((r) => r.ok)} />}
      <div
        className="mt-8 grid h-56 place-items-center rounded-3xl border transition-colors duration-200"
        style={{
          borderColor: flash === null ? "var(--line)" : flash ? "var(--mint)" : "var(--rose)",
          background: "var(--surface)",
        }}
      >
        {visible && tr && (
          <motion.span
            key={i}
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.12 }}
            className="font-display text-[clamp(2.2rem,8vw,4rem)] font-bold tracking-tight"
            style={{ color: COLORS[tr.ink].hex }}
          >
            {tr.word}
          </motion.span>
        )}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {COLORS.map((c, k) => (
          <button
            key={c.id}
            onPointerDown={() => answer(k)}
            className="flex items-center justify-center gap-2 rounded-2xl border border-line bg-surface py-4 font-medium transition-transform active:scale-95"
          >
            <span className="size-4 rounded-full" style={{ background: c.hex }} />
            {lang === "ru" ? c.btnRu : c.btnEn}
            <span className="text-xs text-muted">{k + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

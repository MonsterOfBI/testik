"use client";

import { ViewTransition, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import type { Answers, Locale, TestDef, TestMeta, TestResult } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { CAT_GRADIENT } from "@/lib/ui";
import { md } from "@/lib/md";
import { Md } from "@/components/ui/Disclosure";
import { MethodPanel } from "./MethodPanel";
import { Runner } from "./Runner";
import { GameHost } from "@/components/games/GameHost";
import { clearProgress, getProgress, saveToHistory } from "@/lib/history";
import { encodeResult, scoreTest } from "@/lib/scoring";
import { Aura } from "@/components/ui/Aura";

type Phase = "intro" | "run" | "computing";

export function TestExperience({ test, lang, dict }: { test: TestDef; lang: Locale; dict: Dict; related: TestMeta[] }) {
  const router = useRouter();
  // read ?vs= after mount instead of useSearchParams, so the intro prerenders as static HTML (SEO)
  const [vs, setVs] = useState<string | null>(null);
  useEffect(() => setVs(new URLSearchParams(window.location.search).get("vs")), []);
  const [phase, setPhase] = useState<Phase>("intro");
  const [resumeAt, setResumeAt] = useState<number | null>(null);
  const [fresh, setFresh] = useState(false);

  useEffect(() => {
    const p = getProgress(test.id);
    if (p && p.index > 0 && Date.now() - p.at < 1000 * 60 * 60 * 24 * 7) setResumeAt(p.index);
  }, [test.id]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [phase]);

  const finish = (result: TestResult, answers?: Answers) => {
    const code = encodeResult(result);
    saveToHistory({ code, result });
    clearProgress(test.id);
    if (answers) {
      try {
        sessionStorage.setItem(`testik:answers:${test.id}:${code}`, JSON.stringify(answers));
      } catch {}
    }
    setPhase("computing");
    setTimeout(() => {
      router.push(`/${lang}/r/${test.id}/${code}${vs ? `?vs=${encodeURIComponent(vs)}` : ""}`);
    }, 1400);
  };

  const finishAnswers = (answers: Answers) => finish(scoreTest(test, answers), answers);

  return (
    <div className="mx-auto max-w-3xl px-5 pt-6 sm:pt-10">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div key="intro" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
            {vs && (
              <div className="mb-6 rounded-2xl border border-line bg-[color-mix(in_oklab,var(--rose)_14%,var(--surface))] p-4 text-sm">
                🤝 {dict.test.compareBanner}
              </div>
            )}
            <div className="flex items-center gap-5">
              <ViewTransition name={`emoji-${test.id}`} share="morph" default="none">
                <span className="grid size-20 shrink-0 place-items-center rounded-3xl text-[40px] sm:size-24 sm:text-5xl" style={{ background: CAT_GRADIENT[test.category] }}>
                  {test.emoji}
                </span>
              </ViewTransition>
              <div className="text-sm text-muted">
                <div>{dict.cat[test.category]}</div>
                <div>
                  {test.durationMin} {dict.catalog.min}
                  {test.questions.length > 0 && ` • ${test.questions.length} ${dict.catalog.questions}`}
                </div>
                <div>{dict.serious[test.seriousness]}</div>
              </div>
            </div>
            <h1 className="font-display mt-6 text-[clamp(2rem,5.4vw,3.4rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-balance">{test.title[lang]}</h1>
            <p className="mt-4 text-lg text-ink-2 text-pretty">{test.description[lang]}</p>

            {test.disclaimer && (
              <div className="mt-6 rounded-2xl border border-line bg-surface p-4 text-sm text-ink-2">
                <Md html={md(test.disclaimer[lang])} className="!text-sm" />
              </div>
            )}

            <div className="mt-6 rounded-2xl bg-surface-2 p-5">
              <Md html={md(test.instructions[lang])} />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  if (resumeAt === null) clearProgress(test.id);
                  setFresh(resumeAt === null);
                  setPhase("run");
                }}
                className="rounded-2xl bg-ink px-7 py-4 font-medium text-bg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {resumeAt !== null ? `${dict.test.resume} ${resumeAt + 1}` : dict.test.start}
              </button>
              {resumeAt !== null && (
                <button
                  onClick={() => {
                    clearProgress(test.id);
                    setResumeAt(null);
                    setFresh(true);
                    setPhase("run");
                  }}
                  className="rounded-2xl border border-line-strong px-6 py-4 font-medium hover:bg-surface-2"
                >
                  {dict.test.restart}
                </button>
              )}
            </div>
            <div className="mt-12">
              <MethodPanel test={test} lang={lang} dict={dict} />
            </div>
          </motion.div>
        )}

        {phase === "run" && (
          <motion.div key="run" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {test.kind === "game" ? (
              <GameHost test={test} lang={lang} dict={dict} onDone={(r) => finish(r)} />
            ) : (
              <Runner test={test} lang={lang} dict={dict} fresh={fresh} onDone={finishAnswers} onExit={() => setPhase("intro")} />
            )}
          </motion.div>
        )}

        {phase === "computing" && (
          <motion.div key="computing" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="grid place-items-center py-16">
            <div className="relative size-72">
              <Aura className="absolute inset-0" speed={4} interactive={false} />
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0.6, 1] }} transition={{ duration: 1.4 }} className="font-display -mt-6 text-lg">
              {dict.test.computing}…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

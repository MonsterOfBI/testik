"use client";

import { ViewTransition, useEffect, useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
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
import { canSaveProgress, clearProgress, getProgress, latestByTest, saveToHistory, useLocalData } from "@/lib/history";
import Link from "next/link";
import { fmt } from "@/i18n/dict";
import { encodeResult, scoreTest } from "@/lib/scoring";
import { Aura } from "@/components/ui/Aura";

type Phase = "intro" | "run" | "computing";

const noopSubscribe = () => () => {};
const subscribeProgress = (cb: () => void) => {
  window.addEventListener("testik:progress", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("testik:progress", cb);
    window.removeEventListener("storage", cb);
  };
};

type Props = { test: TestDef; lang: Locale; dict: Dict; related: TestMeta[] };

/**
 * Next keeps visited pages alive (hidden) between navigations. A link or redirect to this
 * page starts a fresh attempt (new key), while browser back/forward restores the old one.
 */
export function TestExperience(props: Props) {
  const { bfcacheId } = useRouter();
  return <TestExperienceInner key={bfcacheId} {...props} />;
}

function TestExperienceInner({ test, lang, dict }: Props) {
  const router = useRouter();
  // read ?vs= on the client instead of useSearchParams, so the intro prerenders as static HTML (SEO)
  const vs = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).get("vs"),
    () => null,
  );
  // ?retake=1 (from "Take it again" on a result) skips the intro
  const retake = useSyncExternalStore(
    noopSubscribe,
    () => new URLSearchParams(window.location.search).has("retake"),
    () => false,
  );
  const [chosenPhase, setPhase] = useState<Phase | null>(null);
  const phase: Phase = chosenPhase ?? (retake ? "run" : "intro");
  const persist = canSaveProgress(test);

  // the latest finished result of this test in this browser
  const localVersion = useLocalData();
  const last = useMemo(() => (localVersion ? latestByTest()[test.id] : undefined), [localVersion, test.id]);

  // saved progress, kept in sync with localStorage (also across tabs)
  const progressKey = `testik:progress:${test.id}`;
  const progressRaw = useSyncExternalStore(
    subscribeProgress,
    () => {
      try {
        return localStorage.getItem(progressKey);
      } catch {
        return null;
      }
    },
    () => null,
  );
  const saved = useMemo(() => (persist && progressRaw ? getProgress(test.id) : null), [persist, progressRaw, test.id]);
  const savedCount = saved ? Object.keys(saved.answers).length : 0;
  const resumeAt = saved && savedCount > 0 ? saved.index : null;

  useEffect(() => {
    // timed and ability tests never resume; drop leftovers from older versions of the site
    if (!persist) clearProgress(test.id);
  }, [persist, test.id]);

  // one-sitting tests (IQ, timed tests, games) lose everything on reload: ask before leaving
  useEffect(() => {
    if (phase !== "run" || persist) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [phase, persist]);

  const firstPhase = useRef(true);
  useEffect(() => {
    if (firstPhase.current) {
      firstPhase.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
  }, [phase]);

  const finished = useRef(false);
  // once the result page takes over, coming back (browser back) shows the intro, not "calculating…"
  useLayoutEffect(
    () => () => {
      if (finished.current) {
        finished.current = false;
        setPhase("intro");
      }
    },
    [],
  );
  const finish = (result: TestResult, answers?: Answers) => {
    if (finished.current) return;
    finished.current = true;
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

            {resumeAt !== null && (
              <div className="mt-6 rounded-2xl border border-line bg-[color-mix(in_oklab,var(--mint)_10%,var(--surface))] p-4">
                <p className="text-sm text-ink-2">{fmt(dict.test.resumeNote, { n: savedCount, total: test.questions.length })}</p>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className="h-full rounded-full bg-[linear-gradient(90deg,var(--lilac),var(--rose),var(--peach),var(--mint))]"
                    style={{ width: `${Math.max(3, (savedCount / Math.max(1, test.questions.length)) * 100)}%` }}
                  />
                </div>
              </div>
            )}

            {last && resumeAt === null && (
              <p className="mt-6 text-sm text-ink-2">
                {fmt(dict.test.doneBefore, { date: new Date(last.result.at).toLocaleDateString(lang === "ru" ? "ru-RU" : "en-GB") })}{" "}
                <Link href={`/${lang}/r/${test.id}/${last.code}`} className="text-ink underline decoration-[var(--line-strong)] underline-offset-4 hover:decoration-current">
                  {dict.test.seeResult}
                </Link>
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={() => setPhase("run")}
                className="rounded-2xl bg-ink px-7 py-4 font-medium text-bg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                {resumeAt !== null ? `${dict.test.resume} ${resumeAt + 1}` : last ? `↻ ${dict.test.retake}` : dict.test.start}
              </button>
              {resumeAt !== null && (
                <button
                  onClick={() => {
                    clearProgress(test.id);
                    setPhase("run");
                  }}
                  className="rounded-2xl border border-line-strong px-6 py-4 font-medium transition-colors hover:bg-surface-2"
                >
                  {dict.test.restart}
                </button>
              )}
            </div>
            {test.kind !== "game" && (
              <p className="mt-4 flex items-center gap-2 text-xs text-muted">
                <span className={`size-1.5 shrink-0 rounded-full ${persist ? "bg-[var(--ok)]" : "bg-[var(--peach)]"}`} aria-hidden />
                {persist ? dict.test.autosave : dict.test.oneSitting}
              </p>
            )}
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
              <Runner test={test} lang={lang} dict={dict} onDone={finishAnswers} onExit={() => setPhase("intro")} />
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

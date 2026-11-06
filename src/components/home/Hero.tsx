"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Fragment } from "react";
import { Aura } from "@/components/ui/Aura";
import type { Locale } from "@/lib/types";
import type { Dict } from "@/i18n/dict";

const CHIPS: Record<Locale, string[]> = {
  ru: ["Сова или жаворонок?", "Какое ты животное?", "Холерик или флегматик?", "IQ 120 — это много?", "Тревожность или усталость?", "Какой ты десерт?"],
  en: ["Night owl or lark?", "Which animal are you?", "Choleric or phlegmatic?", "Is IQ 120 a lot?", "Anxiety or fatigue?", "Which dessert are you?"],
};

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero({ lang, dict, featured, ids }: { lang: Locale; dict: Dict; featured?: string; ids: string[] }) {
  const router = useRouter();
  const words = dict.hero.title.split(" ");
  const random = () => {
    const id = ids[Math.floor(Math.random() * ids.length)];
    router.push(`/${lang}/tests/${id}`);
  };
  return (
    <section className="relative isolate mx-auto max-w-6xl px-5 pb-10 pt-10 sm:pt-16 md:pb-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease }}
        className="pointer-events-none absolute -right-56 top-0 -z-10 h-[560px] w-[620px] sm:-right-40 md:-right-24 md:top-8 md:h-[760px] md:w-[760px]"
      >
        <Aura className="h-full w-full" opacity={0.78} />
      </motion.div>

      <h1 className="font-display max-w-[15ch] text-[clamp(2.4rem,7.2vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.035em] text-balance">
        {words.map((w, i) => (
          <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%", rotate: 4 }}
              animate={{ y: 0, rotate: 0 }}
              transition={{ duration: 0.9, delay: 0.15 + i * 0.06, ease }}
            >
              {w}
              {i < words.length - 1 && !/[.:]$/.test(w) ? "\u00a0" : ""}
            </motion.span>
          </span>
            {/[.:]$/.test(w) && <br />}
          </Fragment>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease }}
        className="mt-6 max-w-[56ch] text-lg text-ink-2 text-pretty"
      >
        {dict.hero.sub}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.85, ease }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        {featured && (
          <Link
            href={`/${lang}/tests/${featured}`}
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-ink px-6 py-3.5 font-medium text-bg transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="absolute inset-0 -translate-x-full bg-[linear-gradient(100deg,transparent,rgba(255,255,255,0.35),transparent)] transition-transform duration-700 group-hover:translate-x-full" />
            {dict.hero.ctaPrimary}
          </Link>
        )}
        <button
          onClick={random}
          className="group inline-flex items-center gap-2 rounded-2xl border border-line-strong px-5 py-3.5 font-medium transition-colors hover:bg-surface-2"
        >
          <motion.span
            className="inline-block"
            whileHover={{ rotate: 180 }}
            transition={{ type: "spring", stiffness: 260, damping: 12 }}
            aria-hidden
          >
            🎲
          </motion.span>
          {dict.hero.ctaRandom}
        </button>
      </motion.div>

      <div className="relative mt-14 flex flex-wrap gap-2.5 md:mt-20">
        {CHIPS[lang].map((c, i) => (
          <motion.span
            key={c}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 1.05 + i * 0.07, type: "spring", stiffness: 260, damping: 20 }}
            className="inline-block"
          >
            {/* the idle float lives on an inner element, so it never fights the entrance transform */}
            <span
              className="inline-block rounded-full border border-line bg-[color-mix(in_oklab,var(--surface)_78%,transparent)] px-4 py-2 text-sm text-ink-2"
              style={{ animation: `float-y ${5 + (i % 3)}s ease-in-out ${1.6 + i * 0.4}s infinite` }}
            >
              {c}
            </span>
          </motion.span>
        ))}
      </div>
    </section>
  );
}

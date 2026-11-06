"use client";

import Link from "next/link";
import { useMemo } from "react";
import { motion } from "motion/react";
import type { Locale } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import type { PortraitMeta } from "@/lib/portrait";
import { allProgress, clearProgress, useLocalData } from "@/lib/history";
import { CAT_GRADIENT } from "@/lib/ui";

/** Questionnaires started in this browser and not finished yet, with a link to continue. */
export function UnfinishedTests({ lang, dict, byId }: { lang: Locale; dict: Dict; byId: Record<string, PortraitMeta> }) {
  const version = useLocalData();
  const items = useMemo(() => (version ? allProgress().filter((p) => byId[p.id]) : []), [version, byId]);
  if (!items.length) return null;
  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-medium tracking-tight">{dict.me.unfinished}</h2>
      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
        {items.map((p, i) => {
          const m = byId[p.id];
          const n = Object.keys(p.answers).length;
          const total = p.total ?? n;
          return (
            <motion.li key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3.5">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl text-xl" style={{ background: CAT_GRADIENT[m.category] }}>
                  {m.emoji}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{m.title[lang]}</span>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <span
                      className="block h-full rounded-full bg-[linear-gradient(90deg,var(--lilac),var(--rose),var(--peach))]"
                      style={{ width: `${Math.max(4, (n / Math.max(1, total)) * 100)}%` }}
                    />
                  </span>
                  <span className="mt-1 block text-xs tabular-nums text-muted">
                    {n} {dict.test.of} {total}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  <Link href={`/${lang}/tests/${p.id}`} className="rounded-xl bg-ink px-3.5 py-2 text-sm font-medium text-bg">
                    {dict.me.continue}
                  </Link>
                  <button onClick={() => clearProgress(p.id)} className="px-1 py-1 text-xs text-muted hover:text-ink" aria-label={`${dict.test.restart}: ${m.title[lang]}`}>
                    ✕
                  </button>
                </span>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

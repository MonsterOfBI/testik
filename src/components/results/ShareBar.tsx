"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Locale, TestDef } from "@/lib/types";
import type { Dict } from "@/i18n/dict";

export function ShareBar({ test, code, lang, dict, title }: { test: TestDef; code: string; lang: Locale; dict: Dict; title: string }) {
  const [copied, setCopied] = useState<string | null>(null);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${origin}/${lang}/r/${test.id}/${code}`;
  const compareUrl = `${origin}/${lang}/tests/${test.id}?vs=${code}`;
  const text = `${test.title[lang]}: ${title}`;

  const copy = async (v: string, key: string) => {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(key);
      setTimeout(() => setCopied(null), 1800);
    } catch {}
  };

  const download = async () => {
    const res = await fetch(`/og/r/${test.id}/${code}?lang=${lang}`);
    const blob = await res.blob();
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `testik-${test.id}.png`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 2000);
  };

  const native = async () => {
    const n = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
    if (n.share) {
      try {
        await n.share({ title: "testik", text, url });
      } catch {}
    } else copy(url, "link");
  };

  const btn = "inline-flex items-center gap-2 rounded-2xl border border-line bg-surface px-4 py-3 text-sm font-medium transition-colors hover:border-line-strong hover:bg-surface-2";

  return (
    <section className="mt-14 overflow-hidden rounded-[2rem] border border-line bg-[linear-gradient(135deg,color-mix(in_oklab,var(--lilac)_22%,var(--surface)),color-mix(in_oklab,var(--rose)_16%,var(--surface))_55%,color-mix(in_oklab,var(--peach)_18%,var(--surface)))] p-6 sm:p-8">
      <h2 className="font-display text-2xl font-medium tracking-tight">{dict.result.share}</h2>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <button onClick={native} className={btn}>↗ {dict.result.share}</button>
        <button onClick={() => copy(url, "link")} className={btn}>🔗 {dict.result.copyLink}</button>
        <button onClick={download} className={btn}>🖼 {dict.result.downloadCard}</button>
        <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://vk.com/share.php?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`}>VK</a>
        <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`}>Telegram</a>
      </div>
      <div className="mt-8 rounded-2xl bg-[color-mix(in_oklab,var(--surface)_70%,transparent)] p-5">
        <h3 className="font-medium">🤝 {dict.result.compareFriend}</h3>
        <p className="mt-1 text-sm text-ink-2">{dict.result.compareHint}</p>
        <button onClick={() => copy(compareUrl, "cmp")} className="mt-4 rounded-xl bg-ink px-4 py-2.5 text-sm font-medium text-bg">
          {dict.result.copyLink}
        </button>
      </div>
      <AnimatePresence>
        {copied && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-2xl bg-ink px-5 py-3 text-sm text-bg shadow-soft">
            ✓ {dict.result.copied}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

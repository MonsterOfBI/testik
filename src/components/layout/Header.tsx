"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import type { Locale } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { ThemeToggle } from "./ThemeToggle";
import { UserButton } from "./UserButton";

export function Header({ lang, dict }: { lang: Locale; dict: Dict }) {
  const pathname = usePathname() ?? `/${lang}`;
  const other: Locale = lang === "ru" ? "en" : "ru";
  const otherPath = pathname.replace(/^\/(ru|en)(?=\/|$)/, `/${other}`);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 12);
    setHidden(y > 240 && y > prev);
  });
  useEffect(() => setHidden(false), [pathname]);

  const nav = [
    { href: `/${lang}#tests`, label: dict.nav.tests },
    { href: `/${lang}/me`, label: dict.nav.me },
    { href: `/${lang}/about`, label: dict.nav.about },
  ];

  return (
    <motion.header
      initial={false}
      animate={{ y: hidden ? -90 : 0 }}
      transition={{ type: "spring", stiffness: 380, damping: 38 }}
      className="sticky top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center gap-2 rounded-2xl px-3 py-2 transition-[background-color,box-shadow,border-color] duration-500 sm:px-4 ${
          scrolled
            ? "border border-line bg-[color-mix(in_oklab,var(--surface)_72%,transparent)] shadow-soft backdrop-blur-xl"
            : "border border-transparent"
        }`}
      >
        <Link href={`/${lang}`} className="group mr-auto flex items-center gap-2" aria-label="testik">
          <span className="relative inline-block size-7">
            <span className="absolute inset-0 rounded-full bg-[conic-gradient(from_200deg,var(--lilac),var(--rose),var(--peach),var(--mint),var(--sky),var(--lilac))] blur-[1px] transition-transform duration-700 group-hover:rotate-180" />
            <span className="absolute inset-[5px] rounded-full bg-bg" />
            <span className="absolute inset-[9px] rounded-full bg-[conic-gradient(from_20deg,var(--lilac),var(--rose),var(--peach))]" />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">testik</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="rounded-xl px-3 py-2 text-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          href={otherPath}
          onClick={() => {
            document.cookie = `lang=${other};path=/;max-age=31536000`;
          }}
          className="rounded-xl px-2.5 py-2 text-sm font-medium text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
          aria-label={other === "en" ? "Switch to English" : "Переключить на русский"}
        >
          {other.toUpperCase()}
        </Link>
        <ThemeToggle dict={dict} />
        <UserButton lang={lang} dict={dict} />
      </div>
      <nav className="mx-auto mt-2 flex max-w-6xl gap-1 overflow-x-auto px-1 md:hidden">
        {nav.map((n) => (
          <Link key={n.href} href={n.href} className="shrink-0 rounded-xl px-3 py-1.5 text-sm text-ink-2 hover:text-ink">
            {n.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}

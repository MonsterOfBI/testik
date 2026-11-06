"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  const anchor = useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 12);
    if (y < 120) {
      anchor.current = y;
      setHidden(false);
      return;
    }
    // ignore small jitter (iOS rubber-banding, trackpad noise): hide after 24px down, show after 24px up
    const d = y - anchor.current;
    if (d > 24) {
      anchor.current = y;
      setHidden(true);
    } else if (d < -24) {
      anchor.current = y;
      setHidden(false);
    } else if ((hidden && d > 0) || (!hidden && d < 0)) anchor.current = y;
  });
  // show the header again after navigation
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setHidden(false);
  }

  // publish the visible header height, so sticky bars below it (test progress) can follow it
  const ref = useRef<HTMLElement>(null);
  const [height, setHeight] = useState(76);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setHeight(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  useEffect(() => {
    document.documentElement.style.setProperty("--header-offset", `${hidden ? 0 : height}px`);
  }, [hidden, height]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(href + "/"));

  const nav = [
    { href: `/${lang}#tests`, label: dict.nav.tests },
    { href: `/${lang}/me`, label: dict.nav.me },
    { href: `/${lang}/about`, label: dict.nav.about },
  ];

  return (
    <motion.header
      ref={ref}
      initial={false}
      animate={{ y: hidden ? "-110%" : "0%" }}
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
              aria-current={isActive(n.href) ? "page" : undefined}
              className="rounded-xl px-3 py-2 text-sm text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink aria-[current=page]:text-ink"
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
      <nav
        className={`mx-auto mt-1.5 flex max-w-6xl gap-1 overflow-x-auto rounded-2xl px-1 py-0.5 transition-[background-color,backdrop-filter] duration-500 md:hidden ${
          scrolled ? "bg-[color-mix(in_oklab,var(--bg)_70%,transparent)] backdrop-blur-xl" : ""
        }`}
      >
        {nav.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            aria-current={isActive(n.href) ? "page" : undefined}
            className="shrink-0 rounded-xl px-3 py-1.5 text-sm text-ink-2 hover:text-ink aria-[current=page]:bg-surface-2 aria-[current=page]:text-ink"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </motion.header>
  );
}

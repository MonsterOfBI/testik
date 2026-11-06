"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dict } from "@/i18n/dict";

/**
 * Cookie notice. Analytics (Yandex Metrica only: its data stays in Russia, so no cross-border
 * transfer under 152-ФЗ ст. 12) loads only after an explicit "Accept". The choice can be changed
 * any time via the "Cookie settings" link in the footer, which dispatches `testik:cookie-settings`.
 */
const YM = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const KEY = "consent";
export const COOKIE_SETTINGS_EVENT = "testik:cookie-settings";

type Choice = "all" | "essential";

function readChoice(): Choice | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    if (raw === "all" || raw === "essential") return raw; // older format
    const v = JSON.parse(raw) as { v?: Choice };
    return v.v === "all" || v.v === "essential" ? v.v : null;
  } catch {
    return null;
  }
}

function loadAnalytics() {
  if (!YM || !/^\d+$/.test(YM) || document.getElementById("ym")) return;
  const s = document.createElement("script");
  s.id = "ym";
  s.innerHTML = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${Number(YM)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`;
  document.head.appendChild(s);
}

function dropAnalyticsCookies() {
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!name.startsWith("_ym")) continue;
    for (const d of domains) document.cookie = `${name}=;path=/;max-age=0${d ? `;domain=${d}` : ""}`;
  }
}

export function CookieConsent({ dict }: { dict: Dict }) {
  const lang = usePathname()?.split("/")[1] === "en" ? "en" : "ru";
  const [show, setShow] = useState(false);
  const current = useRef<Choice | null>(null);

  useEffect(() => {
    const v = readChoice();
    current.current = v;
    if (v === "all") loadAnalytics();
    const open = () => setShow(true);
    window.addEventListener(COOKIE_SETTINGS_EVENT, open);
    let t: ReturnType<typeof setTimeout> | undefined;
    if (!v) t = setTimeout(() => setShow(true), 1800);
    return () => {
      window.removeEventListener(COOKIE_SETTINGS_EVENT, open);
      if (t) clearTimeout(t);
    };
  }, []);

  const decide = (v: Choice) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ v, at: new Date().toISOString() }));
    } catch {}
    setShow(false);
    const was = current.current;
    current.current = v;
    if (v === "all") loadAnalytics();
    else if (was === "all") {
      // withdrawing consent: remove Metrica cookies and reload so the counter is gone from memory
      dropAnalyticsCookies();
      location.reload();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 24, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 30 }}
          className="fixed inset-x-2 bottom-[calc(0.5rem+env(safe-area-inset-bottom))] z-[70] mx-auto max-w-xl rounded-2xl border border-line bg-surface/95 p-3 shadow-soft backdrop-blur-xl sm:inset-x-3 sm:bottom-[calc(1.25rem+env(safe-area-inset-bottom))] sm:p-4"
          role="dialog"
          aria-label={dict.cookie.title}
        >
          <p className="text-[13px] leading-snug text-ink-2 sm:text-sm">
            <span className="sm:hidden">{dict.cookie.short}</span>
            <span className="hidden sm:inline">{dict.cookie.text}</span>{" "}
            <Link href={`/${lang}/privacy#cookies`} className="underline decoration-[var(--line-strong)] underline-offset-2 hover:text-ink">
              {dict.cookie.more}
            </Link>
          </p>
          <div className="mt-2 flex gap-2 sm:mt-3">
            <button onClick={() => decide("all")} className="rounded-xl bg-ink px-4 py-1.5 text-[13px] font-medium text-bg sm:py-2 sm:text-sm">
              {dict.cookie.accept}
            </button>
            <button onClick={() => decide("essential")} className="rounded-xl border border-line px-3.5 py-1.5 text-[13px] text-ink-2 hover:bg-surface-2 sm:px-4 sm:py-2 sm:text-sm">
              {dict.cookie.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Footer link that reopens the cookie notice. */
export function CookieSettingsLink({ label }: { label: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))} className="hover:text-ink">
      {label}
    </button>
  );
}

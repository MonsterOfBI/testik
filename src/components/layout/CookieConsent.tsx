"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Dict } from "@/i18n/dict";

const YM = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
const GA = process.env.NEXT_PUBLIC_GA_ID;

function loadAnalytics() {
  if (YM && !document.getElementById("ym")) {
    const s = document.createElement("script");
    s.id = "ym";
    s.innerHTML = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");ym(${Number(YM)},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:false});`;
    document.head.appendChild(s);
  }
  if (GA && !document.getElementById("ga")) {
    const s = document.createElement("script");
    s.id = "ga";
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA}`;
    document.head.appendChild(s);
    const i = document.createElement("script");
    i.innerHTML = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`;
    document.head.appendChild(i);
  }
}

export function CookieConsent({ dict }: { dict: Dict }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let v: string | null = null;
    try {
      v = localStorage.getItem("consent");
    } catch {}
    if (v === "all") loadAnalytics();
    else if (!v) {
      const t = setTimeout(() => setShow(true), 1800);
      return () => clearTimeout(t);
    }
  }, []);
  const decide = (v: "all" | "essential") => {
    try {
      localStorage.setItem("consent", v);
    } catch {}
    if (v === "all") loadAnalytics();
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.96 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-2xl border border-line bg-surface/95 p-4 shadow-soft backdrop-blur-xl sm:bottom-5"
          role="dialog"
          aria-live="polite"
        >
          <p className="text-sm text-ink-2">{dict.cookie.text}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => decide("all")} className="rounded-xl bg-ink px-4 py-2 text-sm font-medium text-bg">
              {dict.cookie.accept}
            </button>
            <button onClick={() => decide("essential")} className="rounded-xl px-4 py-2 text-sm text-ink-2 hover:bg-surface-2">
              {dict.cookie.decline}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

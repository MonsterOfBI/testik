"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import type { Dict } from "@/i18n/dict";

type Theme = "dark" | "light";

const subscribe = (cb: () => void) => {
  window.addEventListener("testik:theme", cb);
  return () => window.removeEventListener("testik:theme", cb);
};
const readTheme = () => (document.documentElement.dataset.theme as Theme | undefined) ?? "dark";

export function ThemeToggle({ dict }: { dict: Dict }) {
  const theme = useSyncExternalStore<Theme | null>(subscribe, readTheme, () => null);

  const toggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const root = document.documentElement;
    if (root.classList.contains("theme-switching")) return;
    const next: Theme = readTheme() === "dark" ? "light" : "dark";
    const apply = () => {
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      window.dispatchEvent(new Event("testik:theme"));
    };
    // While switching, CSS transitions are off and the aura canvases pause, so the
    // browser swaps one finished frame for another instead of repainting the page
    // under the reveal on every frame (that was the stutter).
    root.classList.add("theme-switching");
    const done = () => root.classList.remove("theme-switching");

    const d = document as Document & {
      startViewTransition?: (cb: () => void) => { ready: Promise<void>; finished: Promise<void> };
    };
    if (!d.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flushSync(apply);
      requestAnimationFrame(() => requestAnimationFrame(done));
      return;
    }
    // circular reveal from the button (its centre when activated from the keyboard)
    const b = e.currentTarget.getBoundingClientRect();
    const x = e.detail === 0 ? b.left + b.width / 2 : e.clientX;
    const y = e.detail === 0 ? b.top + b.height / 2 : e.clientY;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const vt = d.startViewTransition(() => flushSync(apply));
    vt.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: 700, easing: "cubic-bezier(0.4, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" },
        );
      })
      .catch(() => {});
    vt.finished.then(done, done);
  };
  const label = theme === "dark" ? dict.theme.light : dict.theme.dark;
  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-xl text-ink-2 transition-colors hover:bg-surface-2 hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.svg
          key={theme ?? "x"}
          initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {theme === "light" ? (
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          ) : (
            <>
              <circle cx="12" cy="12" r="4.2" />
              <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
            </>
          )}
        </motion.svg>
      </AnimatePresence>
    </button>
  );
}

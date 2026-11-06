"use client";

import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

export const median = (a: number[]) => {
  if (!a.length) return 0;
  const s = [...a].sort((x, y) => x - y);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};
export const mean = (a: number[]) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
export const sd = (a: number[]) => {
  if (a.length < 2) return 0;
  const m = mean(a);
  return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / (a.length - 1));
};
/** inverse standard normal CDF (Acklam) */
export function zInv(p: number) {
  const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
  const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
  const c = [-0.00778489400243029, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
  const d = [0.00778469570904146, 0.32246712907004, 2.445134137143, 3.75440866190742];
  const pl = 0.02425;
  if (p < pl) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - pl) {
    const q = Math.sqrt(-2 * Math.log(1 - p));
    return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
export const shuffle = <T,>(a: T[]) => {
  const r = [...a];
  for (let i = r.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
};
/** a deliberate key press: no auto-repeat from holding the key, no browser shortcuts (Ctrl/Cmd/Alt) */
export const plainKey = (e: KeyboardEvent) => !e.repeat && !e.metaKey && !e.ctrlKey && !e.altKey && !["Tab", "Shift", "Meta", "Control", "Alt", "CapsLock", "Escape"].includes(e.key);
export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function Countdown({ onDone, label }: { onDone: () => void; label?: string }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n === 0) {
      onDone();
      return;
    }
    const t = setTimeout(() => setN((x) => x - 1), 700);
    return () => clearTimeout(t);
  }, [n, onDone]);
  return (
    <div className="grid min-h-[50dvh] place-items-center">
      <div className="text-center">
        {label && <p className="mb-4 text-muted">{label}</p>}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={n}
            initial={{ scale: 2, opacity: 0, filter: "blur(8px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="font-display text-8xl font-semibold"
          >
            {n || "·"}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function StageCard({ title, children, action, onAction }: { title: string; children: ReactNode; action: string; onAction: () => void }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-xl py-10 text-center">
      <h2 className="font-display text-2xl font-medium tracking-tight">{title}</h2>
      <div className="mt-4 text-ink-2 text-pretty">{children}</div>
      <button onClick={onAction} className="mt-8 rounded-2xl bg-ink px-7 py-4 font-medium text-bg transition-transform hover:scale-[1.02] active:scale-[0.98]">
        {action}
      </button>
    </motion.div>
  );
}

export function TrialDots({ total, done, ok }: { total: number; done: number; ok?: boolean[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <motion.span
          key={i}
          className="size-2 rounded-full"
          animate={{
            backgroundColor: i < done ? (ok && ok[i] === false ? "var(--rose)" : "var(--mint)") : "var(--surface-2)",
            scale: i === done ? 1.5 : 1,
          }}
        />
      ))}
    </div>
  );
}

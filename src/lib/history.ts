"use client";

import { useSyncExternalStore } from "react";
import type { Answers, TestResult } from "./types";

const KEY = "testik:history:v1";
const PKEY = (id: string) => `testik:progress:${id}`;

export interface HistoryEntry {
  code: string;
  result: TestResult;
}

function read<T>(k: string, fallback: T): T {
  try {
    const v = localStorage.getItem(k);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function write(k: string, v: unknown) {
  try {
    localStorage.setItem(k, JSON.stringify(v));
  } catch {}
}

export function getHistory(): HistoryEntry[] {
  return read<HistoryEntry[]>(KEY, []);
}

export function saveToHistory(entry: HistoryEntry) {
  const h = getHistory().filter((e) => !(e.result.testId === entry.result.testId && e.code === entry.code));
  h.unshift(entry);
  write(KEY, h.slice(0, 200));
  window.dispatchEvent(new Event("testik:history"));
  // sync to account if signed in (fails silently when not)
  fetch("/api/results", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ testId: entry.result.testId, code: entry.code, outcomeId: entry.result.outcomeId }),
  }).catch(() => {});
}

export function clearHistory() {
  write(KEY, []);
  window.dispatchEvent(new Event("testik:history"));
}

export function latestByTest(): Record<string, HistoryEntry> {
  const out: Record<string, HistoryEntry> = {};
  for (const e of getHistory()) if (!out[e.result.testId]) out[e.result.testId] = e;
  return out;
}

export interface Progress {
  answers: Answers;
  index: number;
  at: number;
  /** total questions when saved, for "12 of 120" in lists */
  total?: number;
}

/** how long an unfinished test can be resumed */
export const PROGRESS_TTL = 1000 * 60 * 60 * 24 * 30;

/**
 * Only untimed questionnaires keep progress between visits. Ability tests, timed
 * tests and games must be taken in one sitting, otherwise the score means nothing.
 */
export function canSaveProgress(t: { kind: string; timeLimitSec?: number }) {
  return (t.kind === "likert" || t.kind === "choice") && !t.timeLimitSec;
}

export function getProgress(id: string): Progress | null {
  const p = read<Progress | null>(PKEY(id), null);
  if (!p || typeof p !== "object" || !p.answers || typeof p.index !== "number") return null;
  // stale or empty entries are simply ignored (no writes here: this runs during render)
  if (Date.now() - (p.at ?? 0) > PROGRESS_TTL || Object.keys(p.answers).length === 0) return null;
  return p;
}
export const saveProgress = (id: string, p: Progress) => {
  write(PKEY(id), p);
  window.dispatchEvent(new Event("testik:progress"));
};
export const clearProgress = (id: string) => {
  try {
    localStorage.removeItem(PKEY(id));
  } catch {}
  window.dispatchEvent(new Event("testik:progress"));
};

/** all unfinished tests in this browser, newest first */
export function allProgress(): (Progress & { id: string })[] {
  const out: (Progress & { id: string })[] = [];
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k?.startsWith("testik:progress:")) continue;
      const id = k.slice("testik:progress:".length);
      const p = getProgress(id);
      if (p) out.push({ ...p, id });
    }
  } catch {}
  return out.sort((a, b) => b.at - a.at);
}

/* ---------- React binding: re-render when history or progress changes (also in other tabs) ---------- */

function subscribeStore(cb: () => void) {
  window.addEventListener("testik:history", cb);
  window.addEventListener("testik:progress", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("testik:history", cb);
    window.removeEventListener("testik:progress", cb);
    window.removeEventListener("storage", cb);
  };
}

/** a string that changes whenever saved history or progress changes */
function storeSnapshot() {
  try {
    const parts = [localStorage.getItem(KEY) ?? ""];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith("testik:progress:")) parts.push(`${k}=${localStorage.getItem(k)}`);
    }
    return parts.join("\n");
  } catch {
    return "";
  }
}

/** Version string of local data: use it as a memo key, read the data with getHistory()/allProgress(). "" on the server. */
export function useLocalData() {
  return useSyncExternalStore(subscribeStore, storeSnapshot, () => "");
}

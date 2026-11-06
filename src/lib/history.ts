"use client";

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
}
export const getProgress = (id: string) => read<Progress | null>(PKEY(id), null);
export const saveProgress = (id: string, p: Progress) => write(PKEY(id), p);
export const clearProgress = (id: string) => {
  try {
    localStorage.removeItem(PKEY(id));
  } catch {}
};

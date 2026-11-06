"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const VOWELS = /[аеёиоуыэюяaeiouy]/i;
const isV = (ch: string) => VOWELS.test(ch);

/** where to hyphenate a long word: vowel|consonant+vowel first, then between two consonants, nearest the middle */
function hyphenAt(w: string) {
  const mid = Math.floor(w.length / 2);
  const ok = (i: number) => i >= 3 && i <= w.length - 3 && !/[ьъй]/i.test(w[i]);
  const rules = [(i: number) => isV(w[i - 1]) && !isV(w[i]) && isV(w[i + 1]), (i: number) => !isV(w[i - 1]) && !isV(w[i])];
  for (const rule of rules)
    for (let d = 0; d <= mid; d++) for (const i of [mid + d, mid - d]) if (ok(i) && rule(i)) return i;
  return mid;
}

/** Radar axis label: drops the parenthetical, wraps at ~12 chars, hyphenates long words. */
function wrapLabel(label: string): string[] {
  const max = 13;
  const words = label
    .replace(/\s*\([^)]*\)?/g, "")
    .trim()
    .split(/\s+/)
    .flatMap((w) => w.split(/(?<=-)/));
  const parts: string[] = [];
  for (const w of words) {
    if (w.length <= max) parts.push(w);
    else {
      const cut = hyphenAt(w);
      parts.push(w.slice(0, cut) + "-", w.slice(cut));
    }
  }
  const out: string[] = [];
  for (const p of parts) {
    const last = out[out.length - 1];
    if (last && !last.endsWith("-") && last.length + 1 + p.length <= max) out[out.length - 1] = `${last} ${p}`;
    else if (last?.endsWith("-") && last.length + p.length <= max) out[out.length - 1] = last + p;
    else out.push(p);
  }
  return out.slice(0, 3);
}

/** Radar chart for 3+ dimensions, values 0..1. Optional comparison series. */
export function Radar({
  labels,
  values,
  compare,
  colors = ["var(--lilac)", "var(--rose)"],
  size = 340,
}: {
  labels: string[];
  values: number[];
  compare?: number[];
  colors?: [string, string] | string[];
  size?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const n = values.length;
  const c = size / 2;
  const R = size / 2 - 58;
  const pt = (i: number, v: number) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return [c + Math.cos(a) * R * v, c + Math.sin(a) * R * v] as const;
  };
  const poly = (vals: number[]) => vals.map((v, i) => pt(i, Math.max(0.04, v)).join(",")).join(" ");
  const anchorAt = (x: number) => (Math.abs(x - c) < 8 ? "middle" : x > c ? "start" : "end");
  const lines = labels.map(wrapLabel);
  // widen the viewBox so side labels fit inside the svg instead of spilling off narrow screens
  let padL = 0;
  let padR = 0;
  lines.forEach((ls, i) => {
    const [x] = pt(i, 1.2);
    const w = Math.max(...ls.map((l) => l.length)) * 7.2;
    const a = anchorAt(x);
    if (a === "start") padR = Math.max(padR, x + w - size);
    else if (a === "end") padL = Math.max(padL, w - x);
    else {
      padL = Math.max(padL, w / 2 - x);
      padR = Math.max(padR, x + w / 2 - size);
    }
  });
  padL = Math.ceil(padL + 4);
  padR = Math.ceil(padR + 4);
  return (
    <svg ref={ref} viewBox={`${-padL} 0 ${size + padL + padR} ${size}`} className="mx-auto w-full max-w-[460px] overflow-visible" role="img" aria-label={labels.map((l, i) => `${l}: ${Math.round(values[i] * 100)}%`).join(", ")}>
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon key={r} points={poly(Array(n).fill(r))} fill="none" stroke="var(--line-strong)" strokeWidth={1} strokeDasharray={r === 1 ? undefined : "2 4"} />
      ))}
      {labels.map((_, i) => {
        const [x, y] = pt(i, 1);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="var(--line)" />;
      })}
      {compare && (
        <motion.polygon
          points={poly(compare)}
          fill={colors[1]}
          fillOpacity={0.18}
          stroke={colors[1]}
          strokeWidth={2}
          strokeDasharray="5 4"
          initial={{ opacity: 0, scale: 0.3 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.1, ease, delay: 0.3 }}
          style={{ transformOrigin: `${c}px ${c}px` }}
        />
      )}
      <motion.polygon
        points={poly(values)}
        fill={colors[0]}
        fillOpacity={0.32}
        stroke={colors[0]}
        strokeWidth={2.5}
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.2, rotate: -20 }}
        animate={inView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
        transition={{ duration: 1.2, ease }}
        style={{ transformOrigin: `${c}px ${c}px` }}
      />
      {values.map((v, i) => {
        const [x, y] = pt(i, Math.max(0.04, v));
        return (
          <motion.circle key={i} cx={x} cy={y} r={4} fill="var(--bg)" stroke={colors[0]} strokeWidth={2.5} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.9 + i * 0.05 }} />
        );
      })}
      {labels.map((l, i) => {
        const [x, y] = pt(i, 1.2);
        const ls = lines[i];
        return (
          <text key={i} x={x} y={y - ((ls.length - 1) * 14) / 2} textAnchor={anchorAt(x)} dominantBaseline="middle" className="fill-[var(--ink-2)] text-[12.5px]">
            <title>{l}</title>
            {ls.map((line, k) => (
              <tspan key={k} x={x} dy={k ? 14 : 0}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}

/** A normal curve with the person's position (percentile 0..100) and optional friend marker */
export function NormCurve({ percentile, compare, color = "var(--lilac)" }: { percentile: number; compare?: number; color?: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const W = 300;
  const H = 70;
  const zOf = (p: number) => {
    // inverse of logistic approx good enough for drawing
    const q = Math.min(0.995, Math.max(0.005, p / 100));
    return Math.log(q / (1 - q)) / 1.702;
  };
  const xOf = (z: number) => ((z + 3) / 6) * W;
  const pts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const z = -3 + (6 * i) / 60;
    const y = H - 6 - Math.exp(-(z * z) / 2) * (H - 14);
    pts.push(`${xOf(z).toFixed(1)},${y.toFixed(1)}`);
  }
  const x = xOf(zOf(percentile));
  const id = `clip-${Math.round(percentile)}-${Math.round(compare ?? -1)}`;
  return (
    <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" aria-hidden>
      <defs>
        <clipPath id={id}>
          <motion.rect x={0} y={0} height={H} initial={{ width: 0 }} animate={inView ? { width: x } : {}} transition={{ duration: 1.2, ease }} />
        </clipPath>
      </defs>
      <polyline points={`0,${H - 6} ${pts.join(" ")} ${W},${H - 6}`} fill="var(--surface-2)" stroke="none" />
      <polyline points={`0,${H - 6} ${pts.join(" ")} ${W},${H - 6}`} fill={color} fillOpacity={0.55} clipPath={`url(#${id})`} />
      <polyline points={pts.join(" ")} fill="none" stroke="var(--line-strong)" strokeWidth={1.2} />
      <motion.line x1={x} x2={x} y1={4} y2={H - 6} stroke="var(--ink)" strokeWidth={2} initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1 }} />
      <motion.circle cx={x} cy={4} r={4} fill="var(--ink)" initial={{ scale: 0 }} animate={inView ? { scale: 1 } : {}} transition={{ delay: 1.1, type: "spring" }} />
      {compare !== undefined && (
        <line x1={xOf(zOf(compare))} x2={xOf(zOf(compare))} y1={10} y2={H - 6} stroke="var(--rose)" strokeWidth={2} strokeDasharray="3 3" />
      )}
    </svg>
  );
}

/** Horizontal scale bar 0..1 with band ticks */
export function ScaleBar({ value, compare, color = "var(--lilac)", ticks = [] }: { value: number; compare?: number; color?: string; ticks?: number[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="relative h-3 rounded-full bg-surface-2">
      {ticks.map((t, i) => (
        <span key={i} className="absolute top-0 h-full w-px bg-[var(--line-strong)]" style={{ left: `${t * 100}%` }} />
      ))}
      <motion.div
        className="absolute inset-y-0 left-0 rounded-full"
        style={{ background: `linear-gradient(90deg, color-mix(in oklab, ${color} 55%, transparent), ${color})` }}
        initial={{ width: 0 }}
        animate={inView ? { width: `${Math.max(3, value * 100)}%` } : {}}
        transition={{ duration: 1.1, ease }}
      />
      {compare !== undefined && (
        <span className="absolute -top-1 h-5 w-1 -translate-x-1/2 rounded-full bg-[var(--rose)] ring-2 ring-[var(--bg)]" style={{ left: `${compare * 100}%` }} />
      )}
    </div>
  );
}

/** Semi-circular gauge, used for IQ */
export function Gauge({ value, min = 55, max = 145, label }: { value: number; min?: number; max?: number; label: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true });
  const f = Math.max(0, Math.min(1, (value - min) / (max - min)));
  const r = 90;
  const len = Math.PI * r;
  return (
    <svg ref={ref} viewBox="0 0 220 130" className="mx-auto w-full max-w-[300px]">
      <defs>
        <linearGradient id="gg" x1="0" x2="1">
          <stop offset="0" stopColor="var(--sky)" />
          <stop offset="0.5" stopColor="var(--lilac)" />
          <stop offset="1" stopColor="var(--rose)" />
        </linearGradient>
      </defs>
      <path d="M20 115 A90 90 0 0 1 200 115" fill="none" stroke="var(--surface-2)" strokeWidth={16} strokeLinecap="round" />
      <motion.path
        d="M20 115 A90 90 0 0 1 200 115"
        fill="none"
        stroke="url(#gg)"
        strokeWidth={16}
        strokeLinecap="round"
        strokeDasharray={len}
        initial={{ strokeDashoffset: len }}
        animate={inView ? { strokeDashoffset: len * (1 - f) } : {}}
        transition={{ duration: 1.6, ease }}
      />
      <text x="110" y="100" textAnchor="middle" className="fill-[var(--ink)] font-display text-[40px] font-semibold">
        {value}
      </text>
      <text x="110" y="124" textAnchor="middle" className="fill-[var(--muted)] text-[11px]">
        {label}
      </text>
    </svg>
  );
}

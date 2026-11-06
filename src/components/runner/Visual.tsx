"use client";

import { useId } from "react";

/* Renders the machine-readable figure specs used by matrix-reasoning items.
   A cell is a list of shapes: { shape, count?, fill?, rotation?, size? }.
   A matrix is { cells: (cell | null)[] } laid out on a 3×3 (or n×n) grid. */

type Shape = {
  shape?: string;
  count?: number;
  fill?: "none" | "solid" | "striped" | string;
  rotation?: number;
  size?: "s" | "m" | "l" | number;
  color?: string;
};
type Cell = Shape[] | { shapes: Shape[] } | Shape | null;

const SIZE: Record<string, number> = { s: 0.42, m: 0.62, l: 0.85 };

function shapesOf(c: Cell): Shape[] {
  if (!c) return [];
  if (Array.isArray(c)) return c;
  if ("shapes" in c && Array.isArray((c as { shapes: Shape[] }).shapes)) return (c as { shapes: Shape[] }).shapes;
  return [c as Shape];
}

function path(shape: string, r: number): React.ReactNode {
  const pts = (n: number, rot = -90, rr = r) =>
    Array.from({ length: n }, (_, i) => {
      const a = ((rot + (360 / n) * i) * Math.PI) / 180;
      return `${(Math.cos(a) * rr).toFixed(2)},${(Math.sin(a) * rr).toFixed(2)}`;
    }).join(" ");
  switch (shape) {
    case "circle":
      return <circle r={r} />;
    case "square":
      return <rect x={-r * 0.85} y={-r * 0.85} width={r * 1.7} height={r * 1.7} rx={r * 0.12} />;
    case "triangle":
      return <polygon points={pts(3)} />;
    case "diamond":
      return <polygon points={pts(4)} />;
    case "pentagon":
      return <polygon points={pts(5)} />;
    case "hexagon":
      return <polygon points={pts(6, 0)} />;
    case "star": {
      const p = Array.from({ length: 10 }, (_, i) => {
        const a = ((-90 + 36 * i) * Math.PI) / 180;
        const rr = i % 2 ? r * 0.45 : r;
        return `${(Math.cos(a) * rr).toFixed(2)},${(Math.sin(a) * rr).toFixed(2)}`;
      }).join(" ");
      return <polygon points={p} />;
    }
    case "cross":
    case "plus":
      return <path d={`M${-r},${-r * 0.28}H${-r * 0.28}V${-r}H${r * 0.28}V${-r * 0.28}H${r}V${r * 0.28}H${r * 0.28}V${r}H${-r * 0.28}V${r * 0.28}H${-r}Z`} />;
    case "line":
      return <line x1={-r} y1={0} x2={r} y2={0} strokeWidth={3} />;
    case "arrow":
      return <path d={`M${-r},0H${r * 0.5}M${r * 0.1},${-r * 0.45}L${r * 0.6},0L${r * 0.1},${r * 0.45}`} fill="none" />;
    case "dot":
      return <circle r={r * 0.3} />;
    default:
      return <circle r={r} />;
  }
}

function CellSvg({ cell, px, id }: { cell: Cell; px: number; id: string }) {
  const shapes = shapesOf(cell);
  const items: { s: Shape; x: number; y: number; scale: number }[] = [];
  for (const s of shapes) {
    const n = Math.max(1, Math.min(9, s.count ?? 1));
    const cols = n <= 1 ? 1 : n <= 4 ? 2 : 3;
    const rows = Math.ceil(n / cols);
    const k = 1 / Math.max(cols, rows);
    for (let i = 0; i < n; i++) {
      const cx = ((i % cols) + 0.5) / cols - 0.5;
      const cy = (Math.floor(i / cols) + 0.5) / rows - 0.5;
      items.push({ s, x: cx, y: cy, scale: n === 1 ? 1 : k * 1.05 });
    }
  }
  return (
    <svg viewBox="-50 -50 100 100" width={px} height={px} className="block">
      <defs>
        <pattern id={`st-${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="6" height="6" fill="transparent" />
          <line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" strokeWidth="2.4" />
        </pattern>
      </defs>
      {items.map(({ s, x, y, scale }, i) => {
        const base = typeof s.size === "number" ? s.size : SIZE[s.size ?? "m"] ?? 0.62;
        const r = 40 * base * scale;
        const fill = s.fill === "solid" ? "currentColor" : s.fill === "striped" ? `url(#st-${id})` : "none";
        return (
          <g
            key={i}
            transform={`translate(${x * 86} ${y * 86}) rotate(${s.rotation ?? 0})`}
            fill={fill}
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinejoin="round"
            strokeLinecap="round"
            style={s.color ? { color: s.color } : undefined}
          >
            {path(s.shape ?? "circle", r)}
          </g>
        );
      })}
    </svg>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Visual({ spec, small = false, lang = "ru" }: { spec: any; small?: boolean; lang?: "ru" | "en" }) {
  const uid = useId().replace(/:/g, "");
  if (!spec) return null;
  if (spec.type === "alphabetStrip") {
    const letters: string[] = String(spec[lang] ?? spec.ru ?? "").split(/\s+/).filter(Boolean);
    return (
      <div className="flex flex-wrap gap-1">
        {letters.map((l, i) => (
          <span key={i} className="grid h-8 min-w-7 place-items-center rounded-lg bg-surface-2 px-1 text-sm tabular-nums">
            <span>{l}</span>
          </span>
        ))}
      </div>
    );
  }
  const cells: Cell[] | undefined = spec.cells ?? spec.grid ?? spec.matrix;
  if (Array.isArray(cells)) {
    const n = Math.round(Math.sqrt(cells.length)) || 3;
    return (
      <div className="inline-grid gap-1.5 rounded-2xl bg-surface p-2 text-ink" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
        {cells.map((c, i) => (
          <div key={i} className="grid size-[clamp(64px,19vw,104px)] place-items-center rounded-xl border border-line bg-bg-2">
            {c ? <CellSvg cell={c} px={88} id={`${uid}m${i}`} /> : <span className="font-display text-3xl text-muted">?</span>}
          </div>
        ))}
      </div>
    );
  }
  return (
    <span className={small ? "grid size-16 place-items-center text-ink" : "grid size-24 place-items-center text-ink"}>
      <CellSvg cell={spec.cell ?? spec} px={small ? 60 : 92} id={uid} />
    </span>
  );
}

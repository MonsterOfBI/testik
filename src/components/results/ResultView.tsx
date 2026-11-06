"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import type { Answers, Dimension, Locale, TestDef, TestMeta, TestResult } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { fmt } from "@/i18n/dict";
import { decodeResult } from "@/lib/scoring";
import { md } from "@/lib/md";
import { Aura, auraFromScores } from "@/components/ui/Aura";
import { Disclosure, Md } from "@/components/ui/Disclosure";
import { MethodPanel } from "@/components/runner/MethodPanel";
import { Visual } from "@/components/runner/Visual";
import { CAT_GRADIENT, PALETTE } from "@/lib/ui";
import { Gauge, NormCurve, Radar, ScaleBar } from "./Charts";
import { ShareBar } from "./ShareBar";
import { clearProgress, getHistory, useLocalData } from "@/lib/history";

const ease = [0.16, 1, 0.3, 1] as const;
const noopSubscribe = () => () => {};
const heroBtn =
  "inline-flex items-center gap-2 rounded-2xl border border-line-strong bg-[color-mix(in_oklab,var(--surface)_70%,transparent)] px-4 py-2.5 text-sm font-medium backdrop-blur-sm transition-colors hover:bg-surface-2";

/** a compact citation for the norm line; the full text lives in the method panel */
function shortSource(src: string, lang: Locale) {
  if (/^computed by testik/i.test(src)) return lang === "ru" ? "расчёт testik по открытым данным" : "testik's calculation on open data";
  const cite = src.match(/^[^;(]*?\(\d{4}[a-z]?\)/);
  if (cite) return cite[0];
  const s = src.split(";")[0].replace(/\s*\([^)]*\/[^)]*\)/g, "").trim();
  return s.length > 90 ? s.slice(0, 88).replace(/\s+\S*$/, "") + "…" : s;
}

/** unit for game metrics, inferred from the dimension id */
function unitFor(id: string, lang: Locale) {
  if (/(_rt|interference|consistency)$/.test(id)) return lang === "ru" ? "мс" : "ms";
  if (/(accuracy|rate)$/.test(id)) return "%";
  if (/span$/.test(id)) return lang === "ru" ? "цифр" : "digits";
  if (id === "dprime") return "d′";
  return "";
}

export function ResultView({
  test,
  code,
  lang,
  dict,
  related,
}: {
  test: TestDef;
  code: string;
  lang: Locale;
  dict: Dict;
  related: TestMeta[];
}) {
  const result = useMemo(() => decodeResult(test, code), [test, code]);
  const sp = useSearchParams();
  const vs = sp.get("vs");
  const friend = useMemo(() => (vs ? decodeResult(test, vs) : null), [test, vs]);
  // answers of a test just taken in this tab, for the cognitive review
  const answersRaw = useSyncExternalStore(
    noopSubscribe,
    () => {
      try {
        return sessionStorage.getItem(`testik:answers:${test.id}:${code}`);
      } catch {
        return null;
      }
    },
    () => null,
  );
  const answers = useMemo<Answers | null>(() => {
    try {
      return answersRaw ? JSON.parse(answersRaw) : null;
    } catch {
      return null;
    }
  }, [answersRaw]);

  // whether this result is in this browser's history: then offer a retake, otherwise "take it and compare"
  const localVersion = useLocalData();
  const own = useMemo(() => !!localVersion && getHistory().some((e) => e.code === code && e.result.testId === test.id), [localVersion, code, test.id]);

  if (!result) return <p className="py-24 text-center text-muted">404</p>;

  const facetIds = new Set(test.dimensions.flatMap((d) => d.facets ?? []));
  const mainDims = test.dimensions.filter((d) => !facetIds.has(d.id));
  const byId = Object.fromEntries(result.dims.map((d) => [d.id, d]));
  const fById = friend ? Object.fromEntries(friend.dims.map((d) => [d.id, d])) : null;
  const outcome = test.outcomes?.find((o) => o.id === result.outcomeId);
  const fOutcome = friend && test.outcomes?.find((o) => o.id === friend.outcomeId);
  const aura = auraFromScores(mainDims.map((d) => byId[d.id]?.norm ?? 0), mainDims.map((d, i) => d.color ?? PALETTE[i % PALETTE.length]));
  const isFun = test.seriousness === "fun";
  const showRadar = mainDims.length >= 3 && test.kind !== "game";

  // headline
  let headline = outcome?.title[lang];
  let headEmoji = outcome?.emoji ?? test.emoji;
  if (!headline && test.kind !== "cognitive" && mainDims.length) {
    const d0 = mainDims[0];
    const b = d0.bands[byId[d0.id]?.bandIndex ?? -1];
    headline = mainDims.length === 1 || test.seriousness === "screening" ? b?.label[lang] : undefined;
  }
  if (test.kind === "cognitive" && !headline) headEmoji = "🧠";
  // long "Title — tagline" headlines split into a title and a smaller tagline
  const split = headline && headline.length > 26 ? headline.split(/\s+[—–]\s+|:\s+/) : [];
  const headMain = split.length > 1 ? split[0] : headline;
  const headSub = split.length > 1 ? split.slice(1).join(": ") : undefined;
  // intros like "Твой вайб —" lead into the title, so they sit above it
  const introText = test.resultIntro?.[lang].replace(/\*\*/g, "");
  const leadIn = !!introText && /([—–:]|…|\.\.\.)\s*$/.test(introText);
  const g0 = test.kind === "game" ? mainDims[0] : undefined;
  const g0r = g0 && byId[g0.id];
  const gameHead = g0 && g0r ? { value: g0r.raw, unit: unitFor(g0.id, lang), name: g0.name[lang], band: g0.bands[g0r.bandIndex]?.label[lang] } : null;

  const summary: string[] = outcome
    ? outcome.summary.map((s) => s[lang])
    : mainDims.flatMap((d) => {
        const b = d.bands[byId[d.id]?.bandIndex ?? -1];
        return b?.summary?.slice(0, mainDims.length > 2 ? 1 : 3).map((s) => (mainDims.length > 2 ? `${d.name[lang]}: ${s[lang]}` : s[lang])) ?? [];
      });

  return (
    <div className="mx-auto max-w-4xl px-5 pt-4">
      {/* ---------- hero ---------- */}
      <section className="relative isolate grid items-center gap-6 pb-6 pt-6 md:grid-cols-[1.1fr_1fr] md:pt-12">
        <div>
          <p className="text-sm text-muted">
            {dict.result.yourResult} • {test.title[lang]}
          </p>
          {introText && leadIn && <p className="mt-3 max-w-md text-[15px] text-ink-2 text-pretty">{introText}</p>}
          <motion.div initial={{ scale: 0.4, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 14, delay: 0.1 }} className="mt-5 text-7xl">
            {headEmoji}
          </motion.div>
          {test.kind === "cognitive" ? (
            <h1 className="font-display mt-4 text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em]">
              {result.correct} <span className="text-muted">/ {result.total}</span>
            </h1>
          ) : gameHead ? (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 }}>
              <h1 className="font-display mt-4 text-[clamp(2.4rem,7vw,4.2rem)] font-semibold leading-[1.02] tracking-[-0.03em] tabular-nums">
                {gameHead.value}
                {gameHead.unit && <span className="ml-2 text-[0.5em] text-muted">{gameHead.unit}</span>}
              </h1>
              <p className="mt-2 text-ink-2">
                {gameHead.name}
                {gameHead.band && <span className="ml-2 rounded-full bg-surface-2 px-2.5 py-0.5 text-sm text-ink">{gameHead.band}</span>}
              </p>
            </motion.div>
          ) : (
            headline && (
              <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease, delay: 0.25 }} className="font-display mt-4 text-[clamp(2rem,6vw,3.6rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance">
                {headMain}
                {headSub && <span className="mt-3 block font-sans text-[0.42em] font-medium leading-snug tracking-normal text-ink-2">{headSub}</span>}
              </motion.h1>
            )
          )}
          {introText && !leadIn && <p className="mt-4 max-w-md text-[15px] text-ink-2 text-pretty">{introText}</p>}
          {localVersion && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease, delay: 0.4 }} className="mt-6 flex flex-wrap gap-2.5">
              {own ? (
                <Link href={`/${lang}/tests/${test.id}?retake=1`} onClick={() => clearProgress(test.id)} className={heroBtn}>
                  <span aria-hidden>↻</span> {dict.result.retake}
                </Link>
              ) : (
                <Link href={`/${lang}/tests/${test.id}?vs=${encodeURIComponent(code)}`} className={heroBtn}>
                  <span aria-hidden>🤝</span> {dict.result.takeAndCompare}
                </Link>
              )}
            </motion.div>
          )}
          {friend && (
            <p className="mt-3 text-sm text-ink-2">
              <span className="mr-2 inline-block size-2.5 rounded-full bg-[var(--rose)]" />
              {dict.result.friend}: {fOutcome ? `${fOutcome.emoji} ${fOutcome.title[lang]}` : friend.iq ? `IQ ${friend.iq}` : ""}
            </p>
          )}
        </div>
        <div
          className={
            test.kind === "cognitive"
              ? "relative mx-auto aspect-square w-full max-w-[380px]"
              : "pointer-events-none absolute -right-20 -top-2 -z-10 size-80 opacity-80 md:pointer-events-auto md:relative md:right-auto md:top-auto md:z-auto md:mx-auto md:aspect-square md:size-auto md:w-full md:max-w-[380px] md:opacity-100"
          }
        >
          <Aura className="absolute inset-0" colors={aura.colors} sizes={aura.sizes} seed={aura.seed} />
          {test.kind === "cognitive" && result.iq && (
            <div className="absolute inset-0 grid place-items-center">
              <div className="w-3/4">
                <Gauge value={result.iq} label={dict.result.iq} />
              </div>
            </div>
          )}
        </div>
      </section>

      {result.flags?.includes("crisis") && (
        <div className="mb-8 rounded-3xl border-2 border-[var(--rose)] bg-[color-mix(in_oklab,var(--rose)_14%,var(--surface))] p-5 text-[15px]">
          💗 {dict.result.crisis}
        </div>
      )}

      {/* ---------- summary ---------- */}
      {summary.length > 0 && (
        <section className="rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <h2 className="font-display text-xl font-medium">{dict.result.summary}</h2>
          <ul className="mt-4 space-y-2.5">
            {summary.map((s, i) => (
              <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }} className="flex gap-3 text-[15.5px] text-ink-2">
                <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
                <span className="text-pretty">{s}</span>
              </motion.li>
            ))}
          </ul>
          {test.kind === "cognitive" && result.iq && <p className="mt-5 text-xs text-muted">{dict.result.iqNote}</p>}
        </section>
      )}

      {/* ---------- charts ---------- */}
      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">{dict.result.scales}</h2>
        <div className={showRadar ? "mt-6 grid items-start gap-8 md:grid-cols-[1fr_1.2fr]" : "mt-6"}>
          {showRadar && (
            <div className="md:sticky md:top-28">
              <Radar labels={mainDims.map((d) => d.name[lang])} values={mainDims.map((d) => byId[d.id]?.norm ?? 0)} compare={fById ? mainDims.map((d) => fById[d.id]?.norm ?? 0) : undefined} />
              {friend && (
                <div className="mt-2 flex justify-center gap-5 text-xs text-muted">
                  <span><span className="mr-1.5 inline-block size-2.5 rounded-full bg-[var(--lilac)]" />{dict.result.you}</span>
                  <span><span className="mr-1.5 inline-block size-2.5 rounded-full bg-[var(--rose)]" />{dict.result.friend}</span>
                </div>
              )}
            </div>
          )}
          <div className="space-y-4">
            {mainDims.map((d, i) => (
              <DimRow key={d.id} test={test} dim={d} res={result} friend={friend} lang={lang} dict={dict} color={d.color ?? PALETTE[i % PALETTE.length]} />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- outcome details ---------- */}
      {outcome && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-medium tracking-tight">{dict.result.details}</h2>
          <Md html={md(outcome.detailed[lang])} className="mt-4 !text-[16px]" />
          {(outcome.strengths?.length || outcome.growth?.length) && (
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {outcome.strengths?.length ? <ListCard title={dict.result.strengths} items={outcome.strengths.map((s) => s[lang])} tone="var(--mint)" /> : null}
              {outcome.growth?.length ? <ListCard title={dict.result.growth} items={outcome.growth.map((s) => s[lang])} tone="var(--peach)" /> : null}
            </div>
          )}
          {outcome.funnyExamples?.length ? (
            <div className="mt-10">
              <h3 className="font-display text-lg font-medium">{dict.result.funny}</h3>
              <div className="mt-4 space-y-2.5">
                {outcome.funnyExamples.map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 14, scale: 0.96 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ type: "spring", stiffness: 260, damping: 22, delay: i * 0.12 }}
                    className={`max-w-[85%] rounded-3xl px-4 py-3 text-[15px] ${i % 2 ? "ml-auto rounded-br-lg bg-[color-mix(in_oklab,var(--lilac)_28%,var(--surface))]" : "rounded-bl-lg bg-surface-2"}`}
                  >
                    {f[lang]}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : null}
          {(outcome.famous?.length || outcome.compatibleWith?.length) && (
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {outcome.famous?.length ? (
                <div>
                  <h3 className="text-sm text-muted">{dict.result.famous}</h3>
                  <p className="mt-2 text-ink-2">{outcome.famous.map((f) => f[lang]).join(", ")}</p>
                </div>
              ) : null}
              {outcome.compatibleWith?.length ? (
                <div>
                  <h3 className="text-sm text-muted">{dict.result.compatible}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {outcome.compatibleWith.map((id) => {
                      const o = test.outcomes?.find((x) => x.id === id);
                      return o ? (
                        <span key={id} className="rounded-full bg-surface-2 px-3 py-1.5 text-sm">
                          {o.emoji} {o.title[lang]}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </section>
      )}

      {/* ---------- per-dimension detailed text ---------- */}
      {!outcome && test.kind !== "cognitive" && (
        <section className="mt-14">
          <h2 className="font-display text-2xl font-medium tracking-tight">{dict.result.details}</h2>
          <div className="mt-4">
            {mainDims.map((d, i) => {
              const b = d.bands[byId[d.id]?.bandIndex ?? -1];
              if (!b) return null;
              return (
                <Disclosure key={d.id} defaultOpen={i === 0} title={<span>{d.name[lang]}: <span className="text-ink-2">{b.label[lang]}</span></span>}>
                  <Md html={md(b.detailed[lang])} />
                  {b.summary?.length > 0 && mainDims.length > 1 && (
                    <ul className="mt-4 space-y-1.5 text-sm text-ink-2">
                      {b.summary.map((s, k) => (
                        <li key={k}>• {s[lang]}</li>
                      ))}
                    </ul>
                  )}
                </Disclosure>
              );
            })}
          </div>
        </section>
      )}
      {outcome && mainDims.some((d) => d.bands?.length) && !isFun && (
        <section className="mt-10">
          {mainDims.map((d) => {
            const b = d.bands[byId[d.id]?.bandIndex ?? -1];
            if (!b) return null;
            return (
              <Disclosure key={d.id} title={<span>{d.name[lang]}: <span className="text-ink-2">{b.label[lang]}</span></span>}>
                <Md html={md(b.detailed[lang])} />
              </Disclosure>
            );
          })}
        </section>
      )}

      {/* ---------- cognitive review ---------- */}
      {test.kind === "cognitive" && answers && (
        <section className="mt-14">
          <Disclosure title={dict.result.review}>
            <ol className="space-y-6">
              {test.questions.map((q, i) => {
                const a = answers[q.id];
                const ci = q.options?.findIndex((o) => o.correct) ?? -1;
                const ok = a === ci;
                return (
                  <li key={q.id} className="rounded-2xl border border-line p-4">
                    <p className="font-medium">
                      <span className={ok ? "text-[var(--ok)]" : "text-[var(--danger)]"}>{ok ? "✓" : "✗"}</span> {i + 1}. {q.text[lang]}
                    </p>
                    {q.visual && (
                      <div className="mt-3 scale-90">
                        <Visual spec={q.visual} lang={lang} />
                      </div>
                    )}
                    <p className="mt-2 text-sm text-ink-2">
                      {dict.result.yourAnswer}: {a !== undefined ? optionText(q.options?.[a], lang) : "—"} • {dict.result.rightAnswer}: {optionText(q.options?.[ci], lang)}
                    </p>
                    {q.explanation && <Md html={md(q.explanation[lang])} className="mt-2 !text-sm" />}
                  </li>
                );
              })}
            </ol>
          </Disclosure>
        </section>
      )}


      {/* ---------- share ---------- */}
      <ShareBar test={test} code={code} lang={lang} dict={dict} title={headline ?? test.title[lang]} />

      {/* ---------- next ---------- */}
      <section className="mt-16">
        <h2 className="font-display text-2xl font-medium tracking-tight">{dict.result.nextTests}</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {related.slice(0, 6).map((m) => (
            <Link key={m.id} href={`/${lang}/tests/${m.id}`} className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-line-strong">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl text-2xl" style={{ background: CAT_GRADIENT[m.category] }}>
                {m.emoji}
              </span>
              <span>
                <span className="block font-medium leading-snug">{m.title[lang]}</span>
                <span className="text-xs text-muted">
                  {m.durationMin} {dict.catalog.min}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="mt-14">
        <MethodPanel test={test} lang={lang} dict={dict} />
      </div>
    </div>
  );
}

function optionText(o: { text?: { ru: string; en: string }; visual?: unknown } | undefined, lang: Locale) {
  if (!o) return "—";
  return o.text?.[lang] || "◻︎";
}

function ListCard({ title, items, tone }: { title: string; items: string[]; tone: string }) {
  return (
    <div className="rounded-3xl p-5" style={{ background: `color-mix(in oklab, ${tone} 16%, var(--surface))` }}>
      <h3 className="font-medium">{title}</h3>
      <ul className="mt-3 space-y-2 text-[15px] text-ink-2">
        {items.map((s, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-2 size-1.5 shrink-0 rounded-full" style={{ background: tone }} />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function DimRow({
  test,
  dim,
  res,
  friend,
  lang,
  dict,
  color,
}: {
  test: TestDef;
  dim: Dimension;
  res: TestResult;
  friend: TestResult | null;
  lang: Locale;
  dict: Dict;
  color: string;
}) {
  const r = res.dims.find((d) => d.id === dim.id);
  const f = friend?.dims.find((d) => d.id === dim.id);
  if (!r) return null;
  const band = dim.bands[r.bandIndex];
  const facets = (dim.facets ?? []).map((fid) => test.dimensions.find((d) => d.id === fid)).filter(Boolean) as Dimension[];
  const fmtRaw = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(dim.scoring === "mean" ? 2 : 1));
  const [lo, hi] = [dim.min, dim.max];
  const ticks = dim.bands.length > 1 && hi > lo ? dim.bands.slice(1).map((b) => (b.min - lo) / (hi - lo)).filter((t) => t > 0 && t < 1) : [];
  return (
    <div className="rounded-3xl border border-line bg-surface p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="font-medium">{dim.name[lang]}</h3>
        <span className="text-sm tabular-nums text-ink-2">
          {test.kind === "game" ? (
            <>
              {fmtRaw(r.raw)}
              {unitFor(dim.id, lang) && <span className="text-muted"> {unitFor(dim.id, lang)}</span>}
            </>
          ) : (
            test.seriousness !== "fun" && (
              <>
                {fmtRaw(r.raw)}
                <span className="text-muted"> / {fmtRaw(dim.max)}</span>
              </>
            )
          )}
          {band && <span className="ml-2 rounded-full px-2 py-0.5 text-xs text-ink" style={{ background: `color-mix(in oklab, ${color} 35%, transparent)` }}>{band.label[lang]}</span>}
        </span>
      </div>
      <div className="mt-3">
        <ScaleBar value={r.norm} compare={f?.norm} color={color} ticks={test.seriousness === "screening" ? ticks : []} />
        <div className="mt-1.5 flex justify-between text-[11.5px] text-muted">
          {/* the bar is drawn on the "better" axis, so lower-is-better scales swap ends */}
          <span>{(dim.lowerIsBetter ? dim.highLabel : dim.lowLabel)[lang]}</span>
          <span>{(dim.lowerIsBetter ? dim.lowLabel : dim.highLabel)[lang]}</span>
        </div>
      </div>
      {r.percentile !== undefined && (
        <div className="mt-4">
          <NormCurve percentile={r.percentile} compare={f?.percentile} color={color} />
          <p className="mt-1 text-sm">
            <span className="font-medium">{fmt(dim.lowerIsBetter ? dict.result.betterThan : r.percentile >= 50 ? dict.result.higherThan : dict.result.lowerThan, { p: r.percentile >= 50 || dim.lowerIsBetter ? r.percentile : 100 - r.percentile })}</span>
          </p>
          {dim.norms && <p className="mt-1 text-[11.5px] text-muted">{fmt(dict.result.percentileNote, { src: shortSource(dim.norms.source, lang) })}</p>}
        </div>
      )}
      {facets.length > 0 && (
        <Disclosure title={<span className="text-sm">{lang === "ru" ? "Аспекты" : "Facets"} ({facets.length})</span>} className="mt-4">
          <div className="space-y-3">
            {facets.map((fd) => {
              const fr = res.dims.find((x) => x.id === fd.id);
              if (!fr) return null;
              const fb = fd.bands[fr.bandIndex];
              return (
                <div key={fd.id}>
                  <div className="flex justify-between text-sm">
                    <span>{fd.name[lang]}</span>
                    <span className="text-muted">{fr.percentile !== undefined ? `${fr.percentile}%` : fb?.label[lang]}</span>
                  </div>
                  <div className="mt-1.5">
                    <ScaleBar value={fr.norm} compare={friend?.dims.find((x) => x.id === fd.id)?.norm} color={color} />
                  </div>
                  {fb?.summary?.[0] && <p className="mt-1 text-xs text-muted">{fb.summary[0][lang]}</p>}
                </div>
              );
            })}
          </div>
        </Disclosure>
      )}
    </div>
  );
}

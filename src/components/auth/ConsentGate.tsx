"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Locale } from "@/lib/types";
import type { Dict } from "@/i18n/dict";

/**
 * 152-ФЗ (с 01.09.2025): consent to personal data processing is a separate document and must be given
 * actively, so the box is never pre-ticked. Every sign-in form sends `consent=yes`, and the server
 * action refuses to start sign-in without it.
 */
export function ConsentGate({ lang, dict, children }: { lang: Locale; dict: Dict; children: ReactNode }) {
  const [ok, setOk] = useState(false);
  const a = dict.auth;
  const link = "underline decoration-[var(--line-strong)] underline-offset-2 hover:text-ink";
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-bg/60 p-3.5 text-sm text-ink-2">
        <input
          type="checkbox"
          checked={ok}
          onChange={(e) => setOk(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-[var(--lilac)]"
        />
        <span>
          {a.consentPre}{" "}
          <Link href={`/${lang}/consent`} target="_blank" className={link}>
            {a.consentLink}
          </Link>{" "}
          {a.consentPost}
        </span>
      </label>
      <fieldset disabled={!ok} className="mt-4 space-y-2.5 transition-opacity disabled:opacity-50" aria-describedby="consent-hint">
        {children}
      </fieldset>
      {!ok && (
        <p id="consent-hint" className="mt-2 text-center text-xs text-muted">
          {a.consentNeeded}
        </p>
      )}
      <p className="mt-5 text-xs leading-relaxed text-muted">
        {a.termsPre}{" "}
        <Link href={`/${lang}/terms`} className={link}>{a.termsLink}</Link> {a.termsMid}{" "}
        <Link href={`/${lang}/privacy`} className={link}>{a.privacyLink}</Link>.
      </p>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useTransition } from "react";
import type { Locale } from "@/lib/types";
import type { Dict } from "@/i18n/dict";
import { deleteAccountAction, signOutAction } from "@/app/actions/account";

/** Sign out and delete account (withdraws consent and erases server-side data at once). */
export function AccountActions({ lang, dict }: { lang: Locale; dict: Dict }) {
  const [pending, start] = useTransition();
  const a = dict.account;
  return (
    <section className="mt-14 rounded-3xl border border-line bg-surface p-5 sm:p-6">
      <p className="text-sm text-ink-2">{a.note}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          disabled={pending}
          onClick={() => start(() => signOutAction(lang))}
          className="rounded-xl bg-surface-2 px-4 py-2 text-sm font-medium hover:bg-[color-mix(in_oklab,var(--surface-2)_80%,var(--ink))] disabled:opacity-50"
        >
          {a.signOut}
        </button>
        <button
          disabled={pending}
          onClick={() => confirm(a.deleteConfirm) && start(() => deleteAccountAction(lang))}
          className="rounded-xl border border-[var(--rose)] px-4 py-2 text-sm font-medium text-[var(--rose)] hover:bg-[color-mix(in_oklab,var(--rose)_12%,transparent)] disabled:opacity-50"
        >
          {a.delete}
        </button>
        <Link href={`/${lang}/privacy`} className="ml-auto text-sm text-muted hover:text-ink">
          {a.docs}
        </Link>
      </div>
    </section>
  );
}

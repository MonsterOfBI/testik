"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/types";
import type { Dict } from "@/i18n/dict";

type U = { name?: string | null; image?: string | null; email?: string | null };

export function UserButton({ lang, dict }: { lang: Locale; dict: Dict }) {
  const [user, setUser] = useState<U | null | undefined>(undefined);
  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((s) => setUser(s?.user ?? null))
      .catch(() => setUser(null));
  }, []);
  if (user) {
    const initial = (user.name || user.email || "?").slice(0, 1).toUpperCase();
    return (
      <Link href={`/${lang}/me`} className="ml-1 grid size-9 place-items-center overflow-hidden rounded-xl bg-surface-2" title={user.name ?? ""}>
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="size-full object-cover" />
        ) : (
          <span className="font-display text-sm">{initial}</span>
        )}
      </Link>
    );
  }
  return (
    <Link
      href={`/${lang}/signin`}
      className="ml-1 rounded-xl bg-ink px-3.5 py-2 text-sm font-medium text-bg transition-transform duration-300 hover:scale-[1.03] active:scale-95"
    >
      {dict.nav.signIn}
    </Link>
  );
}

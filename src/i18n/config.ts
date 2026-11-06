import type { L, Locale } from "@/lib/types";

export const locales = ["ru", "en"] as const;
export const defaultLocale: Locale = "ru";

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

export const tr = (l: L | undefined, locale: Locale): string => (l ? l[locale] || l.ru || l.en : "");

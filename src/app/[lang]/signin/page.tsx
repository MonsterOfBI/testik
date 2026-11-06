import type { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { hasLocale } from "@/i18n/config";
import { getDict } from "@/i18n/dict";
import { enabledProviders, signIn } from "@/auth";
import { Aura } from "@/components/ui/Aura";
import { ConsentGate } from "@/components/auth/ConsentGate";
import { CONSENT_COOKIE, LEGAL_VERSION } from "@/lib/legal";

export const metadata: Metadata = { title: "Вход · Sign in", robots: { index: false } };

/** Remembers the consent for the length of the sign-in round trip; auth.ts writes it to the user row. */
async function recordConsent(fd: FormData) {
  "use server";
  if (fd.get("consent") !== "yes") return false;
  (await cookies()).set(CONSENT_COOKIE, `${LEGAL_VERSION}|${new Date().toISOString()}`, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return true;
}

export default async function SignIn({ params }: PageProps<"/[lang]/signin">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDict(lang);
  const redirectTo = `/${lang}/me`;
  const has = (id: string) => enabledProviders.includes(id);
  const btn = "flex w-full items-center justify-center gap-3 rounded-2xl px-5 py-4 font-medium transition-transform enabled:hover:scale-[1.01] enabled:active:scale-[0.99] disabled:cursor-not-allowed";
  const consent = <input type="hidden" name="consent" value="yes" />;
  return (
    <div className="relative mx-auto grid max-w-md place-items-center px-5 pt-10">
      <div className="pointer-events-none absolute -top-10 left-1/2 -z-10 size-[420px] max-w-[100vw] -translate-x-1/2">
        <Aura className="size-full" />
      </div>
      <div className="w-full rounded-[2rem] border border-line bg-[color-mix(in_oklab,var(--surface)_85%,transparent)] p-6 shadow-soft backdrop-blur-xl sm:p-7">
        <h1 className="font-display text-2xl font-semibold tracking-tight">{d.auth.title}</h1>
        <p className="mt-2 text-sm text-ink-2">{d.auth.sub}</p>
        <div className="mt-6">
          {enabledProviders.length ? (
            <ConsentGate lang={lang} dict={d}>
              {has("vk") && (
                <form action={async (fd: FormData) => { "use server"; if (await recordConsent(fd)) await signIn("vk", { redirectTo }); }}>
                  {consent}
                  <button className={`${btn} bg-[#0077ff] text-white`}>{d.auth.vk}</button>
                </form>
              )}
              {has("yandex") && (
                <form action={async (fd: FormData) => { "use server"; if (await recordConsent(fd)) await signIn("yandex", { redirectTo }); }}>
                  {consent}
                  <button className={`${btn} bg-[#fc3f1d] text-white`}>{d.auth.yandex}</button>
                </form>
              )}
              {has("nodemailer") && (
                <form
                  action={async (fd: FormData) => {
                    "use server";
                    if (await recordConsent(fd)) await signIn("nodemailer", { email: String(fd.get("email") ?? ""), redirectTo });
                  }}
                  className="space-y-2.5 pt-3"
                >
                  {consent}
                  <input name="email" type="email" required placeholder={d.auth.email} className="w-full rounded-2xl border border-line bg-bg px-4 py-3.5 outline-none focus:border-line-strong" />
                  <button className={`${btn} bg-ink text-bg`}>{d.auth.sendLink}</button>
                </form>
              )}
            </ConsentGate>
          ) : (
            <p className="rounded-2xl bg-surface-2 p-4 text-sm text-ink-2">{d.auth.unavailable}</p>
          )}
        </div>
      </div>
    </div>
  );
}

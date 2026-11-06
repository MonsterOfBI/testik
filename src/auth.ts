import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
import Yandex from "next-auth/providers/yandex";
import VK from "next-auth/providers/vk";
import Nodemailer from "next-auth/providers/nodemailer";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { db, schema } from "@/db";
import { CONSENT_COOKIE } from "@/lib/legal";

const providers: Provider[] = [];
if (process.env.AUTH_YANDEX_ID && process.env.AUTH_YANDEX_SECRET) providers.push(Yandex);
if (process.env.AUTH_VK_ID && process.env.AUTH_VK_SECRET) providers.push(VK);
// Magic-link email is off unless AUTH_EMAIL_ENABLED=1: since 01.12.2023 149-ФЗ (ред. 406-ФЗ) allows Russian users
// to be authorised only via a Russian phone number, Gosuslugi or Russian-owned ID services (VK ID, Yandex ID).
// It also needs a database to store verification tokens.
if (db && process.env.AUTH_EMAIL_ENABLED === "1" && process.env.EMAIL_SERVER && process.env.EMAIL_FROM)
  providers.push(Nodemailer({ server: process.env.EMAIL_SERVER, from: process.env.EMAIL_FROM }));

export const enabledProviders = providers.map((p) => (typeof p === "function" ? p({}) : p).id);

const config: NextAuthConfig = {
  providers,
  adapter: db
    ? DrizzleAdapter(db, {
        usersTable: schema.users,
        accountsTable: schema.accounts,
        sessionsTable: schema.sessions,
        verificationTokensTable: schema.verificationTokens,
      })
    : undefined,
  session: { strategy: db ? "database" : "jwt" },
  trustHost: true,
  // a fallback secret is only used while no sign-in provider is configured (nothing to protect yet)
  secret: process.env.AUTH_SECRET ?? (providers.length ? undefined : "testik-no-providers-configured"),
  pages: { signIn: "/ru/signin", verifyRequest: "/ru/signin?check=1" },
  events: {
    // 152-ФЗ ст. 9 ч. 3: the operator must be able to prove consent, so store when and which version was accepted
    async signIn({ user }) {
      if (!db || !user?.id) return;
      try {
        const jar = await cookies();
        const raw = jar.get(CONSENT_COOKIE)?.value;
        if (!raw) return;
        const [version, at] = raw.split("|");
        const when = new Date(at);
        await db
          .update(schema.users)
          .set({ consentVersion: version.slice(0, 32), consentAt: Number.isNaN(when.getTime()) ? new Date() : when })
          .where(eq(schema.users.id, user.id));
        jar.delete(CONSENT_COOKIE);
      } catch (e) {
        console.error("consent record failed", e);
      }
    },
  },
  callbacks: {
    session({ session, user, token }) {
      const id = user?.id ?? token?.sub;
      if (id && session.user) (session.user as { id?: string }).id = id;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

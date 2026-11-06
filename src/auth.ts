import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Provider } from "next-auth/providers";
import Yandex from "next-auth/providers/yandex";
import VK from "next-auth/providers/vk";
import Nodemailer from "next-auth/providers/nodemailer";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db, schema } from "@/db";

const providers: Provider[] = [];
if (process.env.AUTH_YANDEX_ID && process.env.AUTH_YANDEX_SECRET) providers.push(Yandex);
if (process.env.AUTH_VK_ID && process.env.AUTH_VK_SECRET) providers.push(VK);
// magic-link email needs a database to store verification tokens
if (db && process.env.EMAIL_SERVER && process.env.EMAIL_FROM)
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
  callbacks: {
    session({ session, user, token }) {
      const id = user?.id ?? token?.sub;
      if (id && session.user) (session.user as { id?: string }).id = id;
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);

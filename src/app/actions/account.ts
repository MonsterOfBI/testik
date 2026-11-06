"use server";

import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { db, schema } from "@/db";

const home = (lang: string) => (lang === "en" ? "/en" : "/ru");

export async function signOutAction(lang: string) {
  await signOut({ redirectTo: home(lang) });
}

/**
 * Deletes the account with everything stored about the user (accounts, sessions and results cascade).
 * This is also how a user withdraws consent to data processing (152-ФЗ ст. 9 ч. 2, ст. 21 ч. 5).
 */
export async function deleteAccountAction(lang: string) {
  const session = await auth();
  const uid = (session?.user as { id?: string } | undefined)?.id;
  if (db && uid) {
    await signOut({ redirect: false });
    await db.delete(schema.users).where(eq(schema.users.id, uid));
  }
  redirect(home(lang));
}

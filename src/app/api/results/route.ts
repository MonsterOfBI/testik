import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, schema } from "@/db";
import { testById } from "@/content/registry";
import { SENSITIVE_CATEGORIES } from "@/lib/legal";

async function userId() {
  const session = await auth();
  return (session?.user as { id?: string } | undefined)?.id;
}

/** Health-related screeners are special-category data (152-ФЗ ст. 10): they stay in the browser only. */
const storable = (testId: string) => {
  const t = testById(testId);
  return Boolean(t && !SENSITIVE_CATEGORIES.has(t.category) && t.seriousness !== "screening");
};

export async function GET() {
  const uid = await userId();
  if (!db || !uid) return Response.json({ results: [], synced: false });
  const rows = await db.select().from(schema.results).where(eq(schema.results.userId, uid)).orderBy(desc(schema.results.createdAt)).limit(300);
  return Response.json({ results: rows.filter((r) => storable(r.testId)), synced: true });
}

export async function POST(req: Request) {
  const uid = await userId();
  if (!db || !uid) return Response.json({ ok: false }, { status: 200 });
  const body = await req.json().catch(() => null);
  if (!body || typeof body.testId !== "string" || typeof body.code !== "string" || body.code.length > 4000) {
    return Response.json({ ok: false }, { status: 400 });
  }
  if (!storable(body.testId)) return Response.json({ ok: true, stored: false });
  await db.insert(schema.results).values({ userId: uid, testId: body.testId, code: body.code, outcomeId: typeof body.outcomeId === "string" ? body.outcomeId.slice(0, 64) : null });
  return Response.json({ ok: true, stored: true });
}

/** Clears the result history stored in the account. */
export async function DELETE() {
  const uid = await userId();
  if (!db || !uid) return Response.json({ ok: false });
  await db.delete(schema.results).where(eq(schema.results.userId, uid));
  return Response.json({ ok: true });
}

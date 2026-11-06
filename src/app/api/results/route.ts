import { desc, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db, schema } from "@/db";

export async function GET() {
  const session = await auth();
  const uid = (session?.user as { id?: string } | undefined)?.id;
  if (!db || !uid) return Response.json({ results: [], synced: false });
  const rows = await db.select().from(schema.results).where(eq(schema.results.userId, uid)).orderBy(desc(schema.results.createdAt)).limit(300);
  return Response.json({ results: rows, synced: true });
}

export async function POST(req: Request) {
  const session = await auth();
  const uid = (session?.user as { id?: string } | undefined)?.id;
  if (!db || !uid) return Response.json({ ok: false }, { status: 200 });
  const body = await req.json().catch(() => null);
  if (!body || typeof body.testId !== "string" || typeof body.code !== "string" || body.code.length > 4000) {
    return Response.json({ ok: false }, { status: 400 });
  }
  await db.insert(schema.results).values({ userId: uid, testId: body.testId.slice(0, 64), code: body.code, outcomeId: typeof body.outcomeId === "string" ? body.outcomeId.slice(0, 64) : null });
  return Response.json({ ok: true });
}

import "server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const url = process.env.DATABASE_URL;

export const db = url ? drizzle(postgres(url, { prepare: false, max: 5 }), { schema }) : null;
export { schema };

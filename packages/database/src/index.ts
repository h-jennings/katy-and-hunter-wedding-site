import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema });

// Re-export drizzle-orm operators to ensure single instance across workspace
export { and, eq, inArray, isNull, or } from "drizzle-orm";

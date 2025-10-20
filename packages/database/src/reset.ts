import { config } from "dotenv";
import { reset } from "drizzle-seed";
import { db } from ".";
import * as schema from "./schema";

config({ path: ".env.development.local" });

async function main() {
  await reset(db, schema);
}

main();

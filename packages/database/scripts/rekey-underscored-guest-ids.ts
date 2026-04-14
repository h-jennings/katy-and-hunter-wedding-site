import { eq, like } from "drizzle-orm";
import type { BatchItem } from "drizzle-orm/batch";
import { db } from "../src";
import { guests, rsvps } from "../src/schema";
import { generateId } from "../src/utils/generate-id";

function generateSafeGuestId(existingIds: Set<string>): string {
  const MAX_ATTEMPTS = 10;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const candidate = generateId();
    if (candidate.includes("_")) continue;
    if (existingIds.has(candidate)) continue;
    return candidate;
  }
  throw new Error(`Could not generate a safe guest id in ${MAX_ATTEMPTS} attempts`);
}

async function main() {
  console.log("🔍 Scanning for guest ids containing '_'...");

  const underscoredGuests = await db.query.guests.findMany({
    where: like(guests.id, "%\\_%"),
  });

  if (underscoredGuests.length === 0) {
    console.log("✅ No guests with underscored ids. Nothing to do.");
    return;
  }

  console.log(`⚠️  Found ${underscoredGuests.length} guest(s) to rekey:`);
  for (const g of underscoredGuests) {
    console.log(`   - ${g.id}  (${g.firstName} ${g.lastName})`);
  }

  const allGuests = await db.query.guests.findMany({ columns: { id: true } });
  const existingIds = new Set(allGuests.map((g) => g.id));

  const rekeyed: Array<{ oldId: string; newId: string; firstName: string; lastName: string }> = [];
  const statements: Array<BatchItem<"pg">> = [];

  for (const old of underscoredGuests) {
    const newId = generateSafeGuestId(existingIds);
    existingIds.delete(old.id);
    existingIds.add(newId);

    // 1. Insert replacement guest row with the new id but identical data.
    statements.push(
      db.insert(guests).values({
        id: newId,
        firstName: old.firstName,
        lastName: old.lastName,
        partyId: old.partyId,
        createdAt: old.createdAt,
        updatedAt: new Date(),
      }),
    );

    // 2. Repoint rsvps from the old guest id to the new one.
    statements.push(db.update(rsvps).set({ guestId: newId }).where(eq(rsvps.guestId, old.id)));

    // 3. Remove the old guest row (rsvps no longer reference it).
    statements.push(db.delete(guests).where(eq(guests.id, old.id)));

    rekeyed.push({ oldId: old.id, newId, firstName: old.firstName, lastName: old.lastName });
  }

  // neon-http can't hold an interactive BEGIN/COMMIT session, so `db.transaction`
  // isn't available. `db.batch` sends all statements in a single HTTP request
  // that Neon executes atomically — same all-or-nothing guarantee for our case.
  await db.batch(statements as [BatchItem<"pg">, ...Array<BatchItem<"pg">>]);

  console.log("\n✅ Rekey complete:");
  for (const r of rekeyed) {
    console.log(`   ${r.firstName} ${r.lastName}:  ${r.oldId}  →  ${r.newId}`);
  }
}

main().catch((err) => {
  console.error("❌ Rekey failed:", err);
  process.exit(1);
});

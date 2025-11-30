import fs from "node:fs";
import path from "node:path";
import csv from "csv-parser";
import { db } from "../src";
import { guests } from "../src/schema";

const CSV_SOURCE = path.join(__dirname, "/data/wedding-guest-export.csv");

interface CsvGuest {
  "first name": string;
  "last name": string;
  party: string;
}

interface MappedGuest {
  firstName: string;
  lastName: string;
  party: string;
}

async function main() {
  const results: Array<CsvGuest> = [];

  // Read CSV file
  const stream = fs
    .createReadStream(CSV_SOURCE, { encoding: "utf8" })
    .pipe(
      csv({
        mapHeaders: ({ header }) => header.toLowerCase(),
      }),
    )
    .on("data", (data: CsvGuest) => {
      results.push(data);
    })
    .on("error", (error) => {
      console.error("Failed to read CSV:", error);
      process.exit(1);
    });

  // Wait for stream to finish
  await new Promise((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });

  console.log(`📄 Parsed ${results.length} guests from CSV`);

  // Map CSV data to database format
  const guestsData: Array<MappedGuest> = results.map((guest) => ({
    firstName: guest["first name"],
    lastName: guest["last name"],
    party: guest.party,
  }));

  // Group guests by party
  const partyMap = new Map<string, Array<MappedGuest>>();
  for (const guest of guestsData) {
    const partyGuests = partyMap.get(guest.party) ?? [];
    partyGuests.push(guest);
    partyMap.set(guest.party, partyGuests);
  }

  console.log(`👥 Found ${partyMap.size} unique parties`);

  try {
    // Load all parties in a single query
    const allParties = await db.query.parties.findMany({
      columns: {
        id: true,
        displayName: true,
      },
    });

    const partyLookup = new Map(allParties.map((p) => [p.displayName, p.id]));

    // Validate all parties exist
    const missingParties: Array<string> = [];
    for (const partyName of partyMap.keys()) {
      if (!partyLookup.has(partyName)) {
        missingParties.push(partyName);
      }
    }

    if (missingParties.length > 0) {
      console.error("❌ Missing parties in database:");
      for (const partyName of missingParties) {
        const guestCount = partyMap.get(partyName)?.length ?? 0;
        console.error(`   - "${partyName}" (${guestCount} guests)`);
      }
      process.exit(1);
    }

    // Build guests to insert
    const guestsToInsert: Array<{
      firstName: string;
      lastName: string;
      partyId: string;
    }> = [];

    for (const [partyName, partyGuests] of partyMap.entries()) {
      const partyId = partyLookup.get(partyName);
      if (partyId) {
        for (const guest of partyGuests) {
          guestsToInsert.push({
            firstName: guest.firstName,
            lastName: guest.lastName,
            partyId,
          });
        }
      }
    }

    console.log(`\n🔄 Starting import...`);

    // Delete existing guests
    await db.delete(guests);
    console.log("   ✓ Cleared existing guests");

    // Insert all guests
    await db.insert(guests).values(guestsToInsert);
    console.log(`   ✓ Inserted ${guestsToInsert.length} guests`);

    // Log summary
    console.log("\n✅ Import successful!");
    console.log(`\nSummary:`);
    for (const [partyName, partyGuests] of partyMap.entries()) {
      console.log(`   - ${partyName}: ${partyGuests.length} guests`);
    }
    console.log(`\nTotal: ${guestsToInsert.length} guests across ${partyMap.size} parties`);
  } catch (err) {
    console.error("\n❌ Import failed:", err);
    process.exit(1);
  }
}

main();

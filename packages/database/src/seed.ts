import { config } from "dotenv";
import { seed } from "drizzle-seed";
import { db } from ".";
import * as schema from "./schema";

config({ path: ".env.development.local" });

async function main() {
  // Seed parties, guests, and events (but not rsvps yet - we'll do those manually)
  await seed(db, schema).refine((f) => {
    return {
      parties: {
        count: 50,
        columns: {
          displayName: f.companyName(),
          phoneNumber: f.phoneNumber({ template: "###-###-####" }), // Max 12 chars to fit in varchar(20)
          address: f.streetAddress(),
          notes: f.loremIpsum(),
          email: f.email(),
        },
      },
      guests: {
        count: 100,
        columns: {
          firstName: f.firstName(),
          lastName: f.lastName(),
        },
      },
      events: {
        count: 3,
        columns: {
          name: f.companyName(),
          date: f.date(),
        },
      },
      rsvps: {
        count: 0, // Don't auto-generate RSVPs - we'll create them manually below
      },
    };
  });

  // Manually create RSVPs to ensure each guest has exactly one RSVP per event
  console.log("Creating RSVPs for all guests and events...");

  const allGuests = await db.select({ id: schema.guests.id }).from(schema.guests);
  const allEvents = await db.select({ id: schema.events.id }).from(schema.events);

  const rsvpsToInsert = [];
  for (const event of allEvents) {
    for (const guest of allGuests) {
      rsvpsToInsert.push({
        eventId: event.id,
        guestId: guest.id,
        status: "pending" as const,
      });
    }
  }

  console.log(`Inserting ${rsvpsToInsert.length} RSVPs...`);
  await db.insert(schema.rsvps).values(rsvpsToInsert);
  console.log("RSVPs created successfully!");
}

main();

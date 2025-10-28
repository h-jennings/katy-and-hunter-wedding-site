import { seed } from "drizzle-seed";
import { db } from ".";
import * as schema from "./schema";

async function main() {
  await seed(db, schema).refine((f) => {
    return {
      parties: {
        count: 50,
        columns: {
          displayName: f.companyName(),
          phoneNumber: f.phoneNumber({ template: "###-###-####" }),
          address: f.streetAddress(),
          notes: f.loremIpsum(),
          email: f.email(),
          respondedAt: f.default({ defaultValue: null }),
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
        count: 0,
      },
    };
  });

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

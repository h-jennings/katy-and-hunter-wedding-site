import { db } from "../src";
import { rsvps } from "../src/schema";

async function main() {
  console.log("Starting rsvp init script");

  try {
    await db.delete(rsvps);
    console.log("Removed existing rsvps");

    const allEvents = await db.query.events.findMany();
    console.log(`Adding rsvps for ${allEvents.length} events`);

    const allGuests = await db.query.guests.findMany();
    console.log(`Adding ${allEvents.length * allGuests.length} total rvsps`);

    for (const ev of allEvents) {
      await db.insert(rsvps).values(
        allGuests.map((g) => {
          return {
            eventId: ev.id,
            guestId: g.id,
            status: "pending" as const,
          };
        }),
      );
    }

    console.log(`Success: ${await db.$count(rsvps)} rsvps added`);
  } catch (err) {
    console.error("Failed to add rsvps for each guest", err);
  }
}

main();

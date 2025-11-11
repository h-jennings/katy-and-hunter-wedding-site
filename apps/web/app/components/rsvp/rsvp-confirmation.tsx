import { db } from "@repo/database";
import { guests } from "@repo/database/schema";
import { eq } from "drizzle-orm";

export async function RsvpConfirmation({ partyId }: { partyId: string }) {
  const result = await getRsvpDetailsByPartyId(partyId);
  return <h1>You've RSVP'd!</h1>;
}

async function getRsvpDetailsByPartyId(partyId: string) {
  const eventsWithRsvps = await db.query.events.findMany({
    with: {
      rsvps: {
        where: (rsvps, { inArray }) =>
          inArray(rsvps.guestId, db.select({ id: guests.id }).from(guests).where(eq(guests.partyId, partyId))),
        with: {
          guest: true,
        },
      },
    },
  });

  return eventsWithRsvps;
}

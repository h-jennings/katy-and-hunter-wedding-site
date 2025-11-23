import { db, eq } from "@repo/database";
import { guests } from "@repo/database/schema";

export async function getRsvpDetailsByPartyId(partyId: string) {
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

  // Sort RSVPs by guest name to ensure consistent ordering across events
  return eventsWithRsvps.map((event) => ({
    ...event,
    rsvps: event.rsvps.toSorted((a, b) => {
      const lastNameCompare = a.guest.lastName.localeCompare(b.guest.lastName);
      if (lastNameCompare !== 0) return lastNameCompare;
      return a.guest.firstName.localeCompare(b.guest.firstName);
    }),
  }));
}

export async function getPartyById(partyId: string) {
  const party = db.query.parties.findFirst({
    where: ({ id }) => eq(id, partyId),
  });
  return party;
}

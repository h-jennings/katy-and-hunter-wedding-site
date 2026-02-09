import type { getRsvpDetailsByPartyId } from "~/app/lib/queries/rsvp.queries";

type RsvpDetails = Awaited<ReturnType<typeof getRsvpDetailsByPartyId>>;

export function formatRsvpNotificationEmail(
  partyDisplayName: string,
  rsvpDetails: RsvpDetails,
  needsTransportation: boolean | null,
): string {
  const lines = [`New RSVP submission from ${partyDisplayName}`, "", "Responses:", ""];

  for (const event of rsvpDetails) {
    lines.push(`${event.name} (${formatEventDate(event.date)}):`);

    for (const rsvp of event.rsvps) {
      const guestName = `${rsvp.guest.firstName} ${rsvp.guest.lastName}`;
      const status = rsvp.status === "attending" ? "✓ Attending" : "✗ Declined";
      lines.push(`  - ${guestName}: ${status}`);
    }

    lines.push("");
  }

  if (needsTransportation !== null) {
    lines.push(
      needsTransportation ? "Transportation: Yes, needs a ride" : "Transportation: No, making their own way",
      "",
    );
  }

  return lines.join("\n");
}

function formatEventDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

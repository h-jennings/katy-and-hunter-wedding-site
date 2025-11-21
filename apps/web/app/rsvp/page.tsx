import { db } from "@repo/database";
import { guests } from "@repo/database/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { RsvpConfirmation } from "~/app/components/rsvp/rsvp-confirmation";
import { RsvpForm } from "~/app/components/rsvp/rsvp-form";
import { RsvpLayout } from "~/app/components/rsvp/rsvp-layout";
import { getAuthState } from "~/app/lib/auth/auth.helpers";

export default async function RsvpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | Array<string> | undefined }>;
}) {
  const editParam = (await searchParams).edit;
  const state = await getAuthState();

  if (!state.authorized || state.partyId == null) {
    return redirect("/");
  }

  const party = await getPartyById(state.partyId);

  if (!party) {
    return redirect("/");
  }

  if (editParam != null) {
    return <PartyFormView eyebrow="Edit RSVP" title="Adjust your response below" partyId={party.id} />;
  }

  return (
    <div>
      {party?.respondedAt != null ? (
        <RsvpConfirmation partyId={state.partyId} partyName={party.displayName} />
      ) : (
        <PartyFormView title="Let's celebrate together!" partyId={party.id} />
      )}
    </div>
  );
}

async function PartyFormView({ eyebrow, title, partyId }: { eyebrow?: string; title: string; partyId: string }) {
  const rsvpDetails = await getRsvpDetailsByPartyId(partyId);
  const rsvpFormInformation = rsvpDetails.map((event) => {
    return {
      id: event.id,
      name: event.name,
      date: event.date.toISOString(),
      rsvps: event.rsvps.map(({ guest, status }) => {
        return {
          id: guest.id,
          firstName: guest.firstName,
          lastName: guest.lastName,
          status,
        };
      }),
    };
  });

  return (
    <RsvpLayout eyebrow={eyebrow} title={title}>
      <RsvpForm formInformation={rsvpFormInformation} />
    </RsvpLayout>
  );
}

async function getPartyById(partyId: string) {
  const party = db.query.parties.findFirst({
    where: ({ id }) => eq(id, partyId),
  });
  return party;
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

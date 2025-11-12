import { RsvpForm } from "~/app/components/rsvp/rsvp-form";

export default async function RsvpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | Array<string> | undefined }>;
}) {
  const editParam = (await searchParams).edit;
  /*
  const state = await getAuthState();

  if (!state.authorized || state.partyId == null) {
    return redirect("/");
  }

  const party = await getPartyById(state.partyId);

  if (!party) {
    return redirect("/");
  }
  */

  return (
    <RsvpForm
      formInformation={[
        {
          id: "12345",
          name: "Welcome Party",
          date: "10/10/2010",
          rsvps: [
            {
              id: "1",
              firstName: "Hunter",
              lastName: "Jennings",
              status: "pending",
            },
            {
              id: "2",
              firstName: "Katy",
              lastName: "Jennings",
              status: "pending",
            },
          ],
        },
        {
          id: "1345",
          name: "Wedding",
          date: "10/11/2010",
          rsvps: [
            {
              id: "1",
              firstName: "Hunter",
              lastName: "Jennings",
              status: "pending",
            },
            {
              id: "2",
              firstName: "Katy",
              lastName: "Jennings",
              status: "pending",
            },
          ],
        },
      ]}
    />
  );

  // if (editParam != null) {
  //   return <EditForm partyId={state.partyId} />;
  // }

  // return (
  //   <div>
  //     {/*{party?.respondedAt != null ? <RsvpConfirmation partyId={state.partyId} /> : <RsvpForm />}*/}
  //     <RsvpConfirmation partyId={state.partyId} partyName={party.displayName} />
  //   </div>
  // );
}

/*
async function EditForm({ partyId }: { partyId: string }) {
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
    <div>
      <RsvpForm formInformation={rsvpFormInformation} />
    </div>
  );
}

*/

/*
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
 */

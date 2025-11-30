import { redirect } from "next/navigation";
import { RsvpConfirmation } from "~/app/components/rsvp/rsvp-confirmation";
import { RsvpForm } from "~/app/components/rsvp/rsvp-form";
import { RsvpLayout } from "~/app/components/rsvp/rsvp-layout";
import { ScrollToTop } from "~/app/components/scroll-to-top";
import { getAuthState } from "~/app/lib/auth/auth.helpers";
import { getPartyById, getRsvpDetailsByPartyId } from "~/app/lib/queries/rsvp.queries";

export default async function RsvpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | Array<string> | undefined }>;
}) {
  const editParam = (await searchParams).edit;
  const state = await getAuthState();

  if (state.partyId == null) {
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
      startTime: event.startTime,
      endTime: event.endTime,
      location: event.location,
      attire: event.attire,
      description: event.description,
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
    <ScrollToTop key={title}>
      <RsvpLayout eyebrow={eyebrow} title={title}>
        <RsvpForm formInformation={rsvpFormInformation} />
      </RsvpLayout>
    </ScrollToTop>
  );
}

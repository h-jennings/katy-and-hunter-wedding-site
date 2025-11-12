import { db } from "@repo/database";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { RsvpConfirmation } from "~/app/components/rsvp/rsvp-confirmation";
import { RsvpForm } from "~/app/components/rsvp/rsvp-form";
import { getAuthState } from "~/app/lib/auth/auth.helpers";

export default async function RsvpPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | Array<string> | undefined }>;
}) {
  const state = await getAuthState();
  const editParam = (await searchParams).edit;

  if (!state.authorized || state.partyId == null) {
    return redirect("/");
  }

  const party = await getPartyById(state.partyId);

  if (!party) {
    return redirect("/");
  }

  if (editParam != null) {
    return <EditForm />;
  }

  return (
    <div>
      {/*{party?.respondedAt != null ? <RsvpConfirmation partyId={state.partyId} /> : <RsvpForm />}*/}
      <RsvpConfirmation partyId={state.partyId} partyName={party.displayName} />
    </div>
  );
}

function EditForm() {
  return (
    <div>
      <RsvpForm />
    </div>
  );
}

async function getPartyById(partyId: string) {
  const party = db.query.parties.findFirst({
    where: ({ id }) => eq(id, partyId),
  });
  return party;
}

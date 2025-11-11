import { db } from "@repo/database";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { RsvpConfirmation } from "~/app/components/rsvp/rsvp-confirmation";
import { getAuthState } from "~/app/lib/auth/auth.helpers";

export default async function RsvpPage() {
  const state = await getAuthState();

  if (!state.authorized || state.partyId == null) {
    return redirect("/");
  }

  const party = await getPartyById(state.partyId);

  return (
    <div>
      <h1>RSVP Page</h1>
      {/*{party?.respondedAt != null ? <RsvpConfirmation partyId={state.partyId} /> : <RsvpForm />}*/}
      <RsvpConfirmation partyId={state.partyId} />
    </div>
  );
}

async function getPartyById(partyId: string) {
  const party = db.query.parties.findFirst({
    where: ({ id }) => eq(id, partyId),
  });
  return party;
}

import { getAuthState } from "~/app/lib/auth/auth.helpers";
import { RsvpVerifyCodeForm } from "./rsvp-code-form";
import { RsvpForm } from "./rsvp-form";
import { RsvpPartyLookup } from "./rsvp-party-lookup";

export async function Rsvp() {
  const state = await getAuthState();

  return (
    <div>
      {(() => {
        switch (true) {
          case state.authorized && state.partyId != null: {
            return <RsvpForm />;
          }
          case state.authorized && state.partyId == null: {
            return <RsvpPartyLookup />;
          }
          default: {
            return <RsvpVerifyCodeForm />;
          }
        }
      })()}
    </div>
  );
}

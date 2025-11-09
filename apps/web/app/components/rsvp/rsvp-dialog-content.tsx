import Link from "next/link";
import { getAuthState } from "~/app/lib/auth/auth.helpers";
import { RsvpVerifyCodeForm } from "./rsvp-code-form";
import { RsvpPartyLookup } from "./rsvp-party-lookup";

export async function RsvpDialogContent() {
  const state = await getAuthState();

  return (
    <div>
      {(() => {
        switch (true) {
          case state.authorized && state.partyId != null: {
            return (
              <p>
                Should redirect, but <Link href="/rsvp"></Link> here's a link
              </p>
            );
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

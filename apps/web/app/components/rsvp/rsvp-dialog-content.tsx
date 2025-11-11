import Link from "next/link";
import { RsvpPartyLookupForm } from "~/app/components/rsvp/rsvp-party-lookup-form";
import { RsvpVerifyCodeForm } from "~/app/components/rsvp/rsvp-verify-code-form";
import { getAuthState } from "~/app/lib/auth/auth.helpers";

export async function RsvpDialogContent() {
  const state = await getAuthState();

  return (
    <div className="w-full">
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
            return <RsvpPartyLookupForm />;
          }
          default: {
            return <RsvpVerifyCodeForm />;
          }
        }
      })()}
    </div>
  );
}

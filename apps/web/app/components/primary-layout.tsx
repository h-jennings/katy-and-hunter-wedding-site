import Link from "next/link";
import { Noise } from "~/app/components/noise";
import { RsvpClosedDialog } from "~/app/components/rsvp/rsvp-closed-dialog";
import { RsvpDialog } from "~/app/components/rsvp/rsvp-dialog";
import { RsvpDialogContent } from "~/app/components/rsvp/rsvp-dialog-content";
import { RsvpPlaceholder } from "~/app/components/rsvp/rsvp-placeholder";
import { SiteFooter } from "~/app/components/site-footer";
import { SiteHeader } from "~/app/components/site-header";
import { getAuthState } from "~/app/lib/auth/auth.helpers";

export async function SiteLayout({ children }: { children: React.ReactNode }) {
  const state = await getAuthState();
  const canAccessRsvpPage = state.partyId != null;
  const rsvpClosed = process.env.NEXT_PUBLIC_RSVP_CLOSED === "true";
  const rsvpReleased = process.env.NEXT_PUBLIC_RELEASE_RSVP === "true";

  return (
    <div className="isolate">
      <Noise />
      <SiteHeader>
        {rsvpClosed ? (
          canAccessRsvpPage ? (
            <Link href="/rsvp" className="flex px-2 font-medium font-sans text-sm text-text-primary md:text-lg">
              RSVP
            </Link>
          ) : (
            <RsvpClosedDialog />
          )
        ) : rsvpReleased ? (
          canAccessRsvpPage ? (
            <Link href="/rsvp" className="flex px-2 font-medium font-sans text-sm text-text-primary md:text-lg">
              RSVP
            </Link>
          ) : (
            <RsvpDialog>
              <RsvpDialogContent />
            </RsvpDialog>
          )
        ) : (
          <RsvpPlaceholder />
        )}
      </SiteHeader>
      <div className="relative z-0 pt-site-header-h">{children}</div>
      <SiteFooter />
    </div>
  );
}

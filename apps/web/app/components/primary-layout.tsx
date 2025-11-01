import Link from "next/link";
import { SiteHeader } from "~/app/components/site-header";
import { getAuthState } from "../lib/auth/auth.helpers";
import { Noise } from "./noise";
import { RsvpDialog } from "./rsvp/rsvp-dialog";
import { RsvpDialogContent } from "./rsvp/rsvp-dialog-content";
import { RsvpPlaceholder } from "./rsvp/rsvp-placeholder";
import { SiteFooter } from "./site-footer";

export async function SiteLayout({ children }: { children: React.ReactNode }) {
  const state = await getAuthState();
  const canAccessRsvpPage = state.authorized && state.partyId != null;

  return (
    <div className="isolate">
      <Noise />
      <SiteHeader>
        {process.env.NEXT_PUBLIC_RELEASE_RSVP === "true" ? (
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
      <div className="relative z-0">{children}</div>
      <SiteFooter />
    </div>
  );
}

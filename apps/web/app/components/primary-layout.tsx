import Link from "next/link";
import { Noise } from "~/app/components/noise";
import { RsvpDialog } from "~/app/components/rsvp/rsvp-dialog";
import { RsvpDialogContent } from "~/app/components/rsvp/rsvp-dialog-content";
import { RsvpPlaceholder } from "~/app/components/rsvp/rsvp-placeholder";
import { SiteFooter } from "~/app/components/site-footer";
import { SiteHeader } from "~/app/components/site-header";
import { getAuthState } from "~/app/lib/auth/auth.helpers";

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

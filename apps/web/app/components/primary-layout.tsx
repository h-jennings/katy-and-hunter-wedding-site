import { SiteHeader } from "~/app/components/site-header";
import { Noise } from "./noise";
import { RsvpDialog } from "./rsvp/rsvp-dialog";
import { RsvpDialogContent } from "./rsvp/rsvp-dialog-content";
import { RsvpPlaceholder } from "./rsvp/rsvp-placeholder";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate">
      <Noise />
      <SiteHeader>
        {/** The RSVP action should be a link to the RSVP page when the user has a valid partyId and is authenticated */}
        {process.env.NEXT_PUBLIC_RELEASE_RSVP === "true" ? (
          <RsvpDialog>
            <RsvpDialogContent />
          </RsvpDialog>
        ) : (
          <RsvpPlaceholder />
        )}
      </SiteHeader>
      <div className="relative z-0">{children}</div>
      <SiteFooter />
    </div>
  );
}

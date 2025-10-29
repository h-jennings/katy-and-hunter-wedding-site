import { SiteHeader } from "~/app/components/site-header";
import { Noise } from "./noise";
import { Rsvp } from "./rsvp/rsvp";
import { RsvpDialog } from "./rsvp/rsvp-dialog";
import { RsvpPlaceholder } from "./rsvp/rsvp-placeholder";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate">
      <Noise />
      <SiteHeader>
        {process.env.NEXT_PUBLIC_RELEASE_RSVP === "true" ? (
          <RsvpDialog>
            <Rsvp />
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

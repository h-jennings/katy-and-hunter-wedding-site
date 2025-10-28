import { SiteHeader } from "~/app/components/site-header";
import { Noise } from "./noise";
import { Rsvp } from "./rsvp/rsvp";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate">
      <Noise />
      <SiteHeader>
        <Rsvp />
      </SiteHeader>
      <div className="relative z-0">{children}</div>
      <SiteFooter />
    </div>
  );
}

import { SiteHeader } from "~/app/components/site-header";
import { SiteFooter } from "./site-footer";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate">
      <SiteHeader />
      <div className="relative z-0">{children}</div>
      <SiteFooter />
    </div>
  );
}

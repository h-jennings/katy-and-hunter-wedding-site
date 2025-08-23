import { SiteHeader } from "~/app/components/site-header";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="isolate">
      <SiteHeader />
      <div className="relative z-0">{children}</div>
    </div>
  );
}

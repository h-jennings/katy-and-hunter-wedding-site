import { SiteHeader } from "~/app/components/site-header";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SiteHeader />
      {children}
    </div>
  );
}

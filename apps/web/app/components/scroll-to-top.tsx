"use client";

import { useEffect } from "react";

export function ScrollToTop({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return <>{children}</>;
}

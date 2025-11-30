"use client";

import * as React from "react";

export function ScrollToTop({ children }: { children: React.ReactNode }) {
  React.useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return <>{children}</>;
}

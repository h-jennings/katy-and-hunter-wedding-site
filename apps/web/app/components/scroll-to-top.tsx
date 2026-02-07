"use client";

import { useLenis } from "lenis/react";
import * as React from "react";

export function ScrollToTop({ children }: { children: React.ReactNode }) {
  const lenis = useLenis();
  React.useLayoutEffect(() => {
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis]);

  return <>{children}</>;
}

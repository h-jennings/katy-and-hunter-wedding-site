"use client";
import { ReactLenis } from "lenis/react";

export function SmoothScroll() {
  return <ReactLenis root options={{ anchors: { offset: -80 } }} />;
}

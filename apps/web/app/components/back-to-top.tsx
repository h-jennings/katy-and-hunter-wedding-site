"use client";

import { useLenis } from "lenis/react";

export function BackToTop() {
  const lenis = useLenis();
  return (
    <button
      onClick={() => {
        lenis?.scrollTo(0, { duration: 1.5 });
      }}
      type="button"
      className="cursor-pointer font-medium font-sans text-base text-orange leading-none md:text-lg"
    >
      Back to top ↑
    </button>
  );
}

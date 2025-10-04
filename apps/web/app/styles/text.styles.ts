import { tv } from "tailwind-variants";

/**
 * Callout styles for text elements.
 *
 * Font size scales from 1.5rem to 1.875rem using clamp() based on viewport width.
 * The minimum viewport width is set to 36rem and the maximum is set to 64rem.
 */
export const callout = tv({
  base: "text-left font-medium font-sans text-[clamp(1.25rem,2.232vw+0.446rem,1.875rem)] text-pretty text-text-primary leading-snug tracking-tighter",
});

export const chunky = tv({
  base: "font-black text-lg text-text-primary uppercase leading-none tracking-tight",
});

/**
 * Heading styles for text elements.
 *
 * Font size scales from 3rem to 4.5rem using clamp() based on viewport width.
 * The minimum viewport width is set to 36rem and the maximum is set to 64rem.

 */
export const fancyHeading = tv({
  base: "font-script text-text-primary leading-none",
  variants: {
    size: {
      lg: "text-[clamp(3rem,1.0714285714285716rem+5.357142857142857vw,4.5rem)] leading-none",
      md: "text-[clamp(2.25rem,1.2857142857142858rem+2.6785714285714284vw,3rem)] leading-none",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const label = tv({
  base: "font-normal text-sm text-text-secondary uppercase",
});

export const copy = tv({
  base: "max-w-prose font-normal leading-snug text-sm text-text-primary text-pretty",
});

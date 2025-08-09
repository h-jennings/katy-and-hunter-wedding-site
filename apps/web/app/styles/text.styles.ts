import { tv } from "tailwind-variants";

/**
 * Callout styles for text elements.
 *
 * Font size scales from 1.5rem to 1.875rem using clamp() based on viewport width.
 * The minimum viewport width is set to 36rem and the maximum is set to 64rem.
 */
export const callout = tv({
  base: "text-left font-medium font-sans text-[clamp(1.5rem,1.0178571428571428rem+1.3392857142857142vw,1.875rem)] text-text-primary leading-snug tracking-tighter",
});

export const eyebrow = tv({
  base: "font-black text-lg text-text-primary uppercase leading-none tracking-tighter",
});

/**
 * Heading styles for text elements.
 *
 * Font size scales from 3rem to 4.5rem using clamp() based on viewport width.
 * The minimum viewport width is set to 36rem and the maximum is set to 64rem.
 */
export const fancyHeading = tv({
  base: "font-script text-[clamp(3rem,1.0714285714285716rem+5.357142857142857vw,4.5rem)] text-text-primary leading-tight",
});

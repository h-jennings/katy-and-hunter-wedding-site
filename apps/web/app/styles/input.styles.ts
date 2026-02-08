import { tv } from "tailwind-variants";

export const radio = tv({
  base: "size-4 appearance-none rounded-full border border-transparent bg-bg-foundation opacity-90 outline-none ring-2 ring-black/10 transition-all checked:border-2 checked:border-bg-foundation checked:bg-black checked:opacity-100 checked:ring-black/50 focus-within:opacity-100 focus-within:ring-black/25 hover:opacity-100 hover:ring-3 not-checked:hover:ring-black/25",
});

import { twMerge } from "tailwind-merge";

export function Noise() {
  return (
    <div
      className={twMerge([
        "pointer-events-none fixed inset-0 z-0 h-full w-full",
        "after:-top-40 after:-left-40 after:absolute after:h-[calc(100%+20rem)] after:w-[calc(100%+20rem)] after:animate-noise after:bg-[50%] after:bg-[url(/noise.png)] after:will-change-transform after:content-['']",
      ])}
    />
  );
}

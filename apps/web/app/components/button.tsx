import Link from "next/link";
import type * as React from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  accentColor?: `#${string}`;
}
export function Button({ className, children, accentColor = "#000000", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={twMerge(
        "relative inline-block rounded-xl px-5.5 py-2.5 transition-all duration-200 [--bg-accent:var(--bg-accent-color)]/[0.06] hover:scale-[0.98] hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#D2D2D3] active:scale-[0.95]",
        className,
      )}
      style={
        {
          "--bg-accent-color": accentColor,
          boxShadow:
            "rgba(255, 255, 255, 0.06) 0px -12px 16px 0px inset, rgba(255, 255, 255, 0.16) 0px 4px 16px 0px inset, rgba(255, 255, 255, 0.12) 0px 0.75px 0.25px 0px inset, rgba(255, 255, 255, 0.32) 0px 0.25px 0.25px 0px inset, rgba(0, 0, 0, 0.02) 0px 6px 12px 0px, rgba(0, 0, 0, 0.03) 0px 3px 6px 0px, rgba(0, 0, 0, 0.03) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 0.5px 0.5px 0px, rgba(0, 0, 0, 0.04) 0px 3px 6px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          background: "linear-gradient(rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.24) 100%), var(--bg-accent)",
        } as React.CSSProperties
      }
    >
      <span
        className="pointer-events-none absolute inset-0 block h-full w-full rounded-[inherit] p-[1px]"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(153, 153, 153, 0) 5%, rgba(255, 255, 255, 0.24) 20%, rgba(153, 153, 153, 0.24) 40%, rgba(255, 255, 255, 0) 100%)",
          mask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />
      <span className="flex items-center gap-x-[0.75ch]">
        <span
          className="bg-clip-text font-medium font-sans text-base text-gradient text-transparent transition-all"
          style={{
            backgroundImage: "linear-gradient(0deg, rgb(153, 153, 153) 0%, rgb(61, 61, 61) 100%)",
          }}
        >
          {children}
        </span>
      </span>
    </button>
  );
}

interface ButtonLinkProps extends React.ComponentProps<typeof Link> {
  accentColor?: `#${string}`;
}
export function ButtonLink({ children, className, accentColor = "#000000", ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={twMerge(
        "relative inline-block rounded-xl px-5.5 py-2.5 transition-all duration-200 [--bg-accent:var(--bg-accent-color)]/[0.06] hover:scale-[0.98] hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#D2D2D3] active:scale-[0.95]",
        className,
      )}
      style={
        {
          "--bg-accent-color": accentColor,
          boxShadow:
            "rgba(255, 255, 255, 0.06) 0px -12px 16px 0px inset, rgba(255, 255, 255, 0.16) 0px 4px 16px 0px inset, rgba(255, 255, 255, 0.12) 0px 0.75px 0.25px 0px inset, rgba(255, 255, 255, 0.32) 0px 0.25px 0.25px 0px inset, rgba(0, 0, 0, 0.02) 0px 6px 12px 0px, rgba(0, 0, 0, 0.03) 0px 3px 6px 0px, rgba(0, 0, 0, 0.03) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 0.5px 0.5px 0px, rgba(0, 0, 0, 0.04) 0px 3px 6px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          background: "linear-gradient(rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.24) 100%), var(--bg-accent)",
        } as React.CSSProperties
      }
    >
      <span
        className="pointer-events-none absolute inset-0 block h-full w-full rounded-[inherit] p-[1px]"
        style={{
          backgroundImage:
            "linear-gradient(to top, rgba(153, 153, 153, 0) 5%, rgba(255, 255, 255, 0.24) 20%, rgba(153, 153, 153, 0.24) 40%, rgba(255, 255, 255, 0) 100%)",
          mask: "linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
        }}
      />
      <span className="flex items-center gap-x-[0.75ch]">
        <span
          className="bg-clip-text font-medium font-sans text-base text-gradient text-transparent transition-all"
          style={{
            backgroundImage: "linear-gradient(0deg, rgb(153, 153, 153) 0%, rgb(61, 61, 61) 100%)",
          }}
        >
          {children}
        </span>
      </span>
    </Link>
  );
}

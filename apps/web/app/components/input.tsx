import { twMerge } from "tailwind-merge";

export function Input({ className, ...props }: React.ComponentPropsWithRef<"input">) {
  return (
    <input
      className={twMerge(
        "h-10 w-full min-w-0 rounded-lg border border-black/10 bg-transparent px-3 py-1 text-base/none text-gray-700 outline-none transition-all duration-200 hover:border-gray-400 focus-visible:border-gray-400 focus-visible:shadow-[0px_0px_1px_2px_#D2D2D3]",
        className,
      )}
      {...props}
    />
  );
}

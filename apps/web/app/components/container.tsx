import { twMerge } from "tailwind-merge";

export function Container({ children, className, ...rest }: React.ComponentProps<"div">) {
  return (
    <div {...rest} className={twMerge("px-16", className)}>
      <div className="mx-auto max-w-site-container-w">{children}</div>
    </div>
  );
}

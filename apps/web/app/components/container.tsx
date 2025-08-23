import { twMerge } from "tailwind-merge";

export function Container({ children, className, ...rest }: React.ComponentProps<"div">) {
  return (
    <div {...rest} className={twMerge("px-6 md:px-16", className)}>
      <div className="mx-auto max-w-site-container-w">{children}</div>
    </div>
  );
}

export function ContainerInner({ children, className, ...rest }: React.ComponentProps<"div">) {
  return (
    <section {...rest} className={twMerge("pt-20 pb-20 xl:pb-40", className)}>
      {children}
    </section>
  );
}

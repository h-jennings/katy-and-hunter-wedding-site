import { KATY_PHONE_DISPLAY, KATY_SMS_HREF } from "~/app/lib/contact";
import { copy, label } from "~/app/styles/text.styles";

export function RsvpClosedBanner() {
  return (
    <div className="mx-auto flex w-full max-w-site-container-w-inner flex-col gap-y-2 rounded-md bg-accent p-6 md:px-8">
      <span className={label({ className: "text-bg-foundation" })}>RSVPs are closed</span>
      <span className={copy({ className: "text-bg-foundation" })}>
        Need to make a change? Please text Katy directly
        {KATY_SMS_HREF ? (
          <>
            {" at "}
            <a href={KATY_SMS_HREF} className="underline underline-offset-4">
              {KATY_PHONE_DISPLAY || "Katy's number"}
            </a>
          </>
        ) : null}
        .
      </span>
    </div>
  );
}

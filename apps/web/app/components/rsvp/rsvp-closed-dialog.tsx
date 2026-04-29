import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/app/components/dialog";
import { KATY_PHONE_DISPLAY, KATY_SMS_HREF } from "~/app/lib/contact";
import { chunky } from "~/app/styles/text.styles";

export function RsvpClosedDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="flex px-2 font-medium font-sans text-sm text-text-primary md:text-lg">
          RSVP
        </button>
      </DialogTrigger>
      <DialogContent className="grid aspect-4/3 w-[min(24rem,100%)] max-w-[calc(100vw-3rem)] place-items-center">
        <DialogHeader className="gap-4">
          <DialogTitle className={chunky({ className: "text-center" })}>RSVPs are closed</DialogTitle>
          <DialogDescription className="w-full max-w-prose text-balance text-center text-text-primary">
            Need to update your response? Please text Katy directly.
          </DialogDescription>
          {KATY_SMS_HREF ? (
            <span className="text-center font-medium font-sans text-text-primary">
              Text Katy at{" "}
              <a href={KATY_SMS_HREF} className="underline underline-offset-4">
                {KATY_PHONE_DISPLAY ? `${KATY_PHONE_DISPLAY}` : ""}
              </a>
            </span>
          ) : null}
          <span className="text-center text-text-primary">❤︎</span>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

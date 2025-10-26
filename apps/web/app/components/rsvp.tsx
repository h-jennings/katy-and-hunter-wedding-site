"use client";
import { chunky } from "../styles/text.styles";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./dialog";

export function Rsvp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" className="flex px-2 font-medium font-sans text-sm text-text-primary md:text-lg">
          RSVP
        </button>
      </DialogTrigger>
      <DialogContent className="grid aspect-[4/3] w-[min(24rem,100%)] max-w-[calc(100vw-3rem)] place-items-center">
        <DialogHeader className="gap-4">
          <DialogTitle className={chunky({ className: "text-center" })}>RSVP Coming Early 2026</DialogTitle>
          <DialogDescription className="w-full max-w-prose text-pretty text-center text-text-primary">
            We're excited that you're excited. We'll start accepting RSVPs early next year.
          </DialogDescription>
          <span className="text-center text-text-primary">❤︎</span>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
export const RSVP_DIALOG_ID = "rsvp-dialog" as const;

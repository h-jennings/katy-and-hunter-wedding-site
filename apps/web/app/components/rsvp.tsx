"use client";
import * as React from "react";
import { chunky, copy } from "../styles/text.styles";

export function Rsvp() {
  const dialogRef = React.useRef<HTMLDialogElement>(null);

  return (
    <React.Fragment>
      <button
        onClick={() => {
          if (dialogRef.current) {
            dialogRef.current.showModal();
          }
        }}
        type="button"
        className="flex px-2 font-medium font-sans text-sm text-text-primary md:text-lg"
      >
        RSVP
      </button>
      <dialog
        className="-translate-y-1/2 -translate-x-1/2 fixed top-1/2 left-1/2 aspect-[4/3] w-[min(24rem,100%)] max-w-[calc(100vw-3rem)] rounded-lg bg-bg-foundation text-text-primary backdrop:bg-black/20"
        ref={dialogRef}
      >
        <div className="relative flex h-full p-3">
          <button
            onClick={() => {
              if (dialogRef.current) {
                dialogRef.current.close();
              }
            }}
            type="button"
            className="absolute top-3 right-3 rounded-md p-1 text-sm text-text-primary transition-colors hover:text-text-secondary focus-visible:text-text-secondary"
            // biome-ignore lint/a11y/noAutofocus: false positive...I'm in a dialog element
            autoFocus
          >
            close
          </button>
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-balance px-3 text-center">
            <h3 className={chunky()}>RSVP Coming Early 2026</h3>
            <p className={copy()}>We're excited that you're excited. We'll start accepting RSVPs early next year.</p>
            <span>❤︎</span>
          </div>
        </div>
      </dialog>
    </React.Fragment>
  );
}
export const RSVP_DIALOG_ID = "rsvp-dialog" as const;

"use client";

import { AlertCircleIcon } from "lucide-react";
import * as React from "react";
import { Button } from "~/app/components/button";
import { type RsvpError, submitRsvp } from "~/app/lib/actions/rsvp.actions";
import { copy, fancyHeading, label } from "~/app/styles/text.styles";

export function RsvpForm({
  formInformation,
}: {
  formInformation: Array<{
    id: string;
    name: string;
    date: string;
    rsvps: Array<{
      id: string;
      firstName: string;
      lastName: string;
      status: "pending" | "attending" | "declined";
    }>;
  }>;
}) {
  const [state, submitAction, isPending] = React.useActionState(submitRsvp, null);

  return (
    <form action={submitAction} className="flex flex-col gap-y-24">
      <div className="mx-auto flex w-full max-w-site-container-w-inner flex-col gap-y-16">
        {formInformation.map((event) => (
          <div key={event.id} className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 md:px-8 md:[grid-column:unset]">
            <h2 className={fancyHeading({ size: "md", className: "col-span-full" })}>{event.name}</h2>
            <div className="col-span-full grid grid-cols-subgrid">
              <span className={label()}>Date</span>
              <span className={copy()}>{event.date}</span>
            </div>
            <div className="col-span-full grid grid-cols-subgrid items-baseline">
              <span className={label()}>RSVP</span>
              <ul className="flex w-full flex-col border-black/10 *:border-b *:first:pt-0">
                {event.rsvps.map((guest) => {
                  const fieldId = `${event.id}_${guest.id}_rsvpStatus` as const;

                  return (
                    <li key={guest.id} className="py-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={copy({ className: "block" })}>
                          {guest.firstName} {guest.lastName}
                        </span>
                        <div className="flex items-center gap-x-4 justify-self-end">
                          <div className="flex items-center gap-x-2">
                            <input
                              type="radio"
                              id={`${fieldId}_attend`}
                              name={fieldId}
                              value="attending"
                              defaultChecked={guest.status === "attending"}
                              required
                              className="outine-none size-4 appearance-none rounded-full border border-transparent bg-bg-foundation opacity-90 ring-2 ring-black/10 transition-all checked:border-2 checked:border-bg-foundation checked:bg-black checked:opacity-100 checked:ring-black/50 focus-within:opacity-100 focus-within:ring-black/25 hover:opacity-100 hover:ring-3 not-checked:hover:ring-black/25"
                            />
                            <label className={copy()} htmlFor={`${fieldId}_attend`}>
                              Will Attend
                            </label>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <input
                              type="radio"
                              id={`${fieldId}_decline`}
                              name={fieldId}
                              value="declined"
                              defaultChecked={guest.status === "declined"}
                              required
                              className="outine-none size-4 appearance-none rounded-full border border-transparent bg-bg-foundation opacity-90 ring-2 ring-black/10 transition-all checked:border-2 checked:border-bg-foundation checked:bg-black checked:opacity-100 checked:ring-black/50 focus-within:opacity-100 focus-within:ring-black/25 hover:opacity-100 hover:ring-3 not-checked:hover:ring-black/25"
                            />
                            <label className={copy()} htmlFor={`${fieldId}_decline`}>
                              Will Not Attend
                            </label>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex flex-col items-center gap-y-8">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
        {state?.status === "error" && (
          <div className="flex items-center gap-x-2 rounded-md border border-red-800 px-4 py-3 text-red-800">
            <div className="grid h-[1lh] place-items-center">
              <AlertCircleIcon className="size-4 shrink-0" />
            </div>
            <p className={copy({ className: "text-red-800" })}>{getErrorMessage(state.error._tag)}</p>
          </div>
        )}
      </div>
    </form>
  );
}

function getErrorMessage(tag: RsvpError["_tag"]) {
  switch (tag) {
    case "UNAUTHORIZED": {
      return "You are not authorized to submit this RSVP.";
    }
    case "INVALID_RSVP_DATA": {
      return "The RSVP data provided is invalid. Please check your responses and try again.";
    }
    case "NO_RSVP_RESPONSES": {
      return "No RSVP responses were provided. Please select your attendance status.";
    }
    case "DATABASE_ERROR": {
      return "There was a problem submitting your RSVP. Please try again later.";
    }
    default: {
      return "An unknown error occurred. Please try again later.";
    }
  }
}

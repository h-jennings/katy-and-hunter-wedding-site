"use client";

import * as React from "react";
import { Button } from "~/app/components/button";
import { submitRsvp } from "~/app/lib/auth/rsvp.actions";
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
                {event.rsvps.map((rsvp) => {
                  const fieldId = `${event.id}_${rsvp.id}_rsvpStatus` as const;

                  return (
                    <li key={rsvp.id} className="py-4">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={copy({ className: "block" })}>
                          {rsvp.firstName} {rsvp.lastName}
                        </span>
                        <div className="flex items-center gap-x-4 justify-self-end">
                          <div className="flex items-center gap-x-2">
                            <input type="radio" id={`${fieldId}_attend`} name={fieldId} value="attending" required />
                            <label className={copy()} htmlFor={`${fieldId}_attend`}>
                              Will Attend
                            </label>
                          </div>
                          <div className="flex items-center gap-x-2">
                            <input type="radio" id={`${fieldId}_decline`} name={fieldId} value="declined" required />
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
      <div className="mx-auto">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

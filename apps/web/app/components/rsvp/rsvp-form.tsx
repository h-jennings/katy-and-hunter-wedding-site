"use client";

import { AlertCircleIcon } from "lucide-react";
import * as React from "react";
import { Button } from "~/app/components/button";
import { type RsvpError, submitRsvp } from "~/app/lib/actions/rsvp.actions";
import { radio } from "~/app/styles/input.styles";
import { copy, fancyHeading, label } from "~/app/styles/text.styles";

export function RsvpForm({
  events,
  needsTransportation,
  afterPartyEventId,
}: {
  events: Array<{
    id: string;
    name: string;
    date: string;
    startTime: string | null;
    endTime: string | null;
    location: string | null;
    attire: string | null;
    description: string | null;
    rsvps: Array<{
      id: string;
      firstName: string;
      lastName: string;
      status: "pending" | "attending" | "declined";
    }>;
  }>;
  needsTransportation: boolean | null;
  afterPartyEventId: string | null;
}) {
  const [state, submitAction, isPending] = React.useActionState(submitRsvp, null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const [showTransportation, setShowTransportation] = React.useState(() => {
    if (needsTransportation != null) return true;
    if (!afterPartyEventId) return false;
    const afterParty = events.find((ev) => ev.id === afterPartyEventId);
    return afterParty?.rsvps.some((g) => g.status === "attending") ?? false;
  });

  const handleRsvpChange = () => {
    if (!formRef.current || !afterPartyEventId) return;

    const afterPartyEvent = events.find((ev) => ev.id === afterPartyEventId);

    if (!afterPartyEvent) return;

    const hasAfterPartyAttendee = afterPartyEvent.rsvps.some((guest) => {
      const fieldName = `${afterPartyEvent.id}_${guest.id}_rsvpStatus`;
      const input = formRef.current?.elements.namedItem(fieldName) as HTMLInputElement | null;
      return input?.value === "attending";
    });

    setShowTransportation(hasAfterPartyAttendee);
  };

  return (
    <form action={submitAction} ref={formRef} className="flex flex-col gap-y-24">
      <div className="mx-auto flex w-full max-w-site-container-w-inner flex-col gap-y-16">
        {events.map((event) => {
          const prettyDate = new Intl.DateTimeFormat("en-US", {
            dateStyle: "long",
          }).format(new Date(event.date));

          return (
            <div key={event.id} className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-4 md:col-[unset] md:px-8">
              <h2 className={fancyHeading({ size: "md", className: "col-span-full" })}>{event.name}</h2>
              <div className="col-span-full grid grid-cols-subgrid">
                <span className={label()}>Date</span>
                <span className={copy()}>{prettyDate}</span>
              </div>
              <div className="col-span-full grid grid-cols-subgrid">
                <span className={label()}>Time</span>
                <span className={copy()}>
                  {event.startTime} {event.endTime ? `to ${event.endTime}` : null}
                </span>
              </div>
              <div className="col-span-full grid grid-cols-subgrid">
                <span className={label()}>Place</span>
                <span className={copy({ className: "whitespace-pre-wrap" })}>{event.location}</span>
              </div>
              {event.attire && event.attire.trim().length !== 0 && (
                <div className="col-span-full grid grid-cols-subgrid">
                  <span className={label()}>Attire</span>
                  <span className={copy({ className: "whitespace-pre-wrap" })}>{event.attire}</span>
                </div>
              )}
              <div className="col-span-full grid grid-cols-subgrid">
                <span className={label()}>Details</span>
                <span
                  className={copy({ className: "whitespace-pre-wrap [&>strong]:font-medium" })}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: static content from DB
                  dangerouslySetInnerHTML={{
                    __html: event.description ?? "",
                  }}
                />
              </div>
              <div className="col-span-full grid grid-cols-subgrid items-baseline">
                <span className={label()}>RSVP</span>
                <ul className="flex w-full flex-col border-black/10 *:border-b *:first:pt-0">
                  {event.rsvps.map((guest) => {
                    const fieldId = `${event.id}_${guest.id}_rsvpStatus` as const;

                    return (
                      <li key={guest.id} className="py-4">
                        <div className="flex flex-col flex-wrap items-baseline justify-between gap-x-2 gap-y-4 sm:flex-row">
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
                                className={radio()}
                                onChange={handleRsvpChange}
                              />
                              <label className={copy()} htmlFor={`${fieldId}_attend`}>
                                Accepts
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
                                className={radio()}
                                onChange={handleRsvpChange}
                              />
                              <label className={copy()} htmlFor={`${fieldId}_decline`}>
                                Declines
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
          );
        })}

        {/* conditional transportation question */}
        {showTransportation && (
          <div className="bg-accent p-6">
            <div className="flex flex-col gap-y-2 pb-6">
              <h2 className={copy({ className: "font-medium text-bg-foundation text-lg" })}>Need a ride?</h2>
              <p className={copy({ className: "text-bg-foundation" })}>
                We're planning on arranging transportation to the <strong>after party</strong> for guests who need it.
                If you think you'll need a ride, please let us know!
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  id="transportation_yes"
                  name="needsTransportation"
                  value="yes"
                  defaultChecked={needsTransportation === true}
                  className={radio()}
                />
                <label className={copy({ className: "text-bg-foundation" })} htmlFor="transportation_yes">
                  Yes, I will need transportation
                </label>
              </div>
              <div className="flex items-center gap-x-2">
                <input
                  type="radio"
                  id="transportation_no"
                  name="needsTransportation"
                  value="no"
                  defaultChecked={needsTransportation === false}
                  className={radio()}
                />
                <label className={copy({ className: "text-bg-foundation" })} htmlFor="transportation_no">
                  No thanks, I'll make my own way there
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mx-auto flex flex-col items-center gap-y-8">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Submitting..." : "Submit"}
        </Button>
        {state?.status === "error" && (
          <div className="flex items-center gap-x-2 rounded-md border border-red-800 px-4 py-3 text-red-800">
            <div className="grid h-lh place-items-center">
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

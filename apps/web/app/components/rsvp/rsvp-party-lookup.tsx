"use client";
import * as React from "react";
import { lookupParty } from "~/app/lib/auth/lookup-party.actions";
import { selectPartyAction } from "~/app/lib/auth/select-party.actions";
import { chunky, copy } from "~/app/styles/text.styles";
import { Button } from "../button";
import { Input } from "../input";

export function RsvpPartyLookup() {
  const [state, submitAction, isPending] = React.useActionState(lookupParty, { status: "idle" as const });

  return (
    <div className="flex flex-col items-center gap-y-6 px-4 text-center">
      <form action={submitAction} className="flex flex-col items-center gap-y-6">
        <div className="flex flex-col items-center gap-y-4 pt-14 text-center">
          <h2 className={chunky()}>Guest Lookup</h2>
          <p className={copy({ className: "text-pretty" })}>
            Please enter the first and last name of one member of your party below.
          </p>
          <div className="w-full">
            <label htmlFor="full_name" className="sr-only">
              Full Name:
            </label>
            <Input
              className="w-full"
              type="text"
              autoComplete="name"
              name="full_name"
              minLength={2}
              required
              placeholder="Enter a full name"
            />
          </div>
          <p className={copy({ className: "text-pretty text-text-secondary text-xs" })}>
            Ex. Hunter Jennings (not The Jennings Family or Dr. & Mr. Jennings)
          </p>
        </div>
        <Button type="submit" disabled={isPending}>
          Search Guests
        </Button>
      </form>
      <div className="min-h-10 w-full border-black/10 not-empty:border-t">
        {state.status === "success" && <PartyLookupResult parties={state.data} />}
      </div>
    </div>
  );
}

function PartyLookupResult({ parties }: { parties: Array<Party> }) {
  if (parties.length === 0) {
    return (
      <div>
        <p className={copy({ className: "text-pretty" })}>No party found.</p>
      </div>
    );
  }
  return (
    <ul className="w-full">
      {parties.map((p) => {
        const actionWithPartyId = selectPartyAction.bind(null, p.id);
        return (
          <li key={p.id} className="flex gap-2">
            <form action={actionWithPartyId}>
              <div className="flex flex-col gap-2 rounded-lg p-4 text-left">
                <p className={copy({ className: "text-pretty font-semibold" })}>{p.displayName}</p>
                <p className={copy({ className: "text-pretty text-text-secondary" })}>
                  {p.guests.map((guest) => `${guest.firstName} ${guest.lastName}`.trim()).join(", ")}
                </p>
              </div>
              <Button type="submit">Select</Button>
            </form>
          </li>
        );
      })}
    </ul>
  );
}

interface Guest {
  id: string;
  firstName: string;
  lastName: string;
}

interface Party {
  id: string;
  displayName: string;
  guests: Array<Guest>;
}

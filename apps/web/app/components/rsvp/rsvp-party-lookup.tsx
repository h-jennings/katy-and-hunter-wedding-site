"use client";
import * as React from "react";
import { type LookupPartyError, lookupParty, type PartyData } from "~/app/lib/auth/lookup-party.actions";
import { selectPartyAction } from "~/app/lib/auth/select-party.actions";
import { chunky, copy } from "~/app/styles/text.styles";
import { Button } from "../button";
import { Input } from "../input";

export function RsvpPartyLookup() {
  const [state, submitAction, isPending] = React.useActionState(lookupParty, null);

  return (
    <div className="flex flex-col items-center gap-y-8 px-4 text-center">
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
          {isPending ? "Searching..." : "Search Guests"}
        </Button>
      </form>
      <div className="min-h-10 w-full border-black/10 not-empty:border-t">
        {state?.status === "success" && <PartyLookupResult parties={state.data} />}
        {state?.status === "error" && <PartyLookupError error={state.error} />}
      </div>
    </div>
  );
}

function PartyLookupError({ error }: { error: LookupPartyError }) {
  return (
    <div className="pt-6 pb-4">
      {(() => {
        switch (error._tag) {
          case "NOT_FOUND": {
            return (
              <p className={copy({ className: "text-pretty" })}>
                No party found. Please check the spelling and try again.
              </p>
            );
          }
          case "NAME_REQUIRED": {
            return <p className={copy({ className: "text-pretty" })}>Please enter a full name.</p>;
          }
          case "DATABASE_ERROR": {
            return <p className={copy({ className: "text-red-800" })}>Something went wrong. Please try again.</p>;
          }
          default: {
            const _exhaustive: never = error;

            return null;
          }
        }
      })()}
    </div>
  );
}

function PartyLookupResult({ parties }: { parties: PartyData }) {
  return (
    <ul className="w-full pt-6 pb-4">
      {parties.map((p) => {
        const actionWithPartyId = selectPartyAction.bind(null, p.id);
        return (
          <li key={p.id} className="px-2">
            <form action={actionWithPartyId} className="flex items-center gap-4 outline">
              <div className="flex min-w-0 flex-1 flex-col gap-2 rounded-lg text-left">
                <p className={copy({ className: "text-pretty font-semibold" })}>{p.displayName}</p>
                <p className={copy({ className: "text-pretty text-text-secondary" })}>
                  {p.guests.map((guest) => `${guest.firstName} ${guest.lastName}`.trim()).join(", ")}
                </p>
              </div>
              <div className="shrink-0">
                <Button type="submit">Select</Button>
              </div>
            </form>
          </li>
        );
      })}
    </ul>
  );
}

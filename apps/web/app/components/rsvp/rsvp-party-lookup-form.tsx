"use client";
import * as React from "react";
import { Button } from "~/app/components/button";
import { IconRestart } from "~/app/components/icon-restart";
import { Input } from "~/app/components/input";
import { Spinner } from "~/app/components/spinner";
import { type LookupPartyError, lookupParty, type PartyData } from "~/app/lib/actions/lookup-party.actions";
import { selectPartyAction } from "~/app/lib/actions/select-party.actions";
import { chunky, copy } from "~/app/styles/text.styles";

export function RsvpPartyLookupForm() {
  const [state, submitAction, isPending] = React.useActionState(lookupParty, null);

  return (
    <div className="flex flex-col items-center gap-y-8 text-center">
      <div className="px-4">
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
      </div>
      <div className="w-full rounded-b-lg not-empty:border border-black/10 not-empty:bg-black text-bg-foundation">
        {state?.status === "success" && <PartyLookupResult parties={state.data} />}
        {state?.status === "error" && <PartyLookupError error={state.error} />}
      </div>
    </div>
  );
}

function PartyLookupError({ error }: { error: LookupPartyError }) {
  return (
    <div className="pt-4 pb-4">
      {(() => {
        switch (error._tag) {
          case "NOT_FOUND": {
            return (
              <p className={copy({ className: "text-pretty text-off-white" })}>
                No party found. Please check the spelling and try again.
              </p>
            );
          }
          case "NAME_REQUIRED": {
            return <p className={copy({ className: "text-pretty text-off-white" })}>Please enter a full name.</p>;
          }
          case "DATABASE_ERROR": {
            return <p className={copy({ className: "text-red-800" })}>Something went wrong. Please try again.</p>;
          }
          case "RATE_LIMIT_EXCEEDED": {
            return <p className={copy({ className: "text-red-800" })}>{error.message}</p>;
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
    <ul className="w-full divide-y divide-bg-foundation pt-4 pb-4 *:not-first:pt-4 *:not-last:pb-4">
      {parties.map((party) => {
        return (
          <li key={party.id} className="px-4">
            <PartyResult party={party} />
          </li>
        );
      })}
    </ul>
  );
}

function PartyResult({ party }: { party: PartyData[number] }) {
  const actionWithPartyId = selectPartyAction.bind(null, party.id);
  const [state, submitAction, isPending] = React.useActionState(actionWithPartyId, null);

  return (
    <form action={submitAction} className="flex flex-wrap items-center gap-4">
      <div className="flex min-w-[min(20ch,100%)] flex-1 flex-col gap-2 rounded-lg text-left">
        <p className={copy({ className: "text-pretty font-semibold text-off-white" })}>{party.displayName}</p>
        <p className={copy({ className: "text-pretty text-text-secondary" })}>
          {party.guests.map((guest) => `${guest.firstName} ${guest.lastName}`.trim()).join(", ")}
        </p>
      </div>
      <div className="shrink-0">
        {state?.status !== "error" ? <ButtonIdle isPending={isPending} /> : <ButtonRetry isPending={isPending} />}
      </div>
    </form>
  );
}

function ButtonIdle({ isPending }: { isPending: boolean }) {
  return (
    <button
      className="relative inline-block rounded-xl bg-off-white px-4.5 py-2.5 font-medium font-sans text-black text-sm transition-all duration-200 hover:scale-[0.98] hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#D2D2D3] active:scale-[0.95]"
      type="submit"
      disabled={isPending}
    >
      <span data-loading={isPending} className="group/btn grid grid-cols-1 grid-rows-1 place-items-center">
        <Spinner className="col-span-full row-span-full hidden group-data-[loading=true]/btn:block" />
        <span className="visible col-span-full row-span-full group-data-[loading=true]/btn:invisible">Select</span>
      </span>
    </button>
  );
}

function ButtonRetry({ isPending }: { isPending: boolean }) {
  return (
    <button
      className="relative inline-block rounded-xl bg-red-50 px-4.5 py-2.5 font-medium font-sans text-red-800 text-sm transition-all duration-200 hover:scale-[0.98] hover:opacity-80 focus-visible:outline-2 focus-visible:outline-[#D2D2D3] active:scale-[0.95]"
      type="submit"
      disabled={isPending}
    >
      <span data-loading={isPending} className="group/btn grid grid-cols-1 grid-rows-1 place-items-center">
        <Spinner className="col-span-full row-span-full hidden group-data-[loading=true]/btn:block" />
        <span className="visible col-span-full row-span-full flex items-center gap-x-1 group-data-[loading=true]/btn:invisible">
          <IconRestart />
          <span>Retry</span>
        </span>
      </span>
    </button>
  );
}

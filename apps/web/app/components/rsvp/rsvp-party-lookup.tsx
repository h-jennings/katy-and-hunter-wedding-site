"use client";
import * as React from "react";
import { lookupParty } from "~/app/lib/auth/lookup-party.actions";
import { chunky, copy } from "~/app/styles/text.styles";
import { Button } from "../button";
import { Input } from "../input";

export function RsvpPartyLookup() {
  const [state, submitAction, isPending] = React.useActionState(lookupParty, { status: "success" as const });

  return (
    <form action={submitAction} className="flex flex-col items-center gap-y-6 px-4 text-center">
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
      <div className="h-10" />
    </form>
  );
}

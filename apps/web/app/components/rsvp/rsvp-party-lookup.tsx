"use client";
import * as React from "react";
import { lookupParty } from "~/app/lib/auth/lookup-party.actions";
import { chunky } from "~/app/styles/text.styles";
import { Button } from "../button";
import { Input } from "../input";

export function RsvpPartyLookup() {
  const [state, submitAction, isPending] = React.useActionState(lookupParty, { status: "success" as const });

  return (
    <form action={submitAction} className="flex flex-col items-center gap-y-6 text-center">
      <div className="flex flex-col items-center gap-y-4 pt-14 text-center">
        <h2 className={chunky()}>Party Lookup</h2>
        <div>
          <label htmlFor="full_name" className="sr-only">
            Full Name:
          </label>
          <Input type="text" autoComplete="name" name="full_name" placeholder="Enter your full name" />
        </div>
        <p>description here...</p>
      </div>
      <Button type="submit" disabled={isPending}>
        Search
      </Button>
      {/*<div className="mb-4 h-10">
        {!isPending && state.status === "error" && (
          <p className={copy({ className: "text-red-700" })}>An error occurred</p>
        )}
      </div>*/}
    </form>
  );
}

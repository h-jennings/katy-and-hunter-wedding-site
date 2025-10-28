"use client";
import * as React from "react";
import { IconRestart } from "~/app/components/icon-restart";
import { Spinner } from "~/app/components/spinner";
import { clearPartyAction } from "~/app/lib/actions/clear-party.actions";

export function ClearParty() {
  const [_state, submitAction, isPending] = React.useActionState(clearPartyAction, null);

  return (
    <form action={submitAction}>
      <button
        type="submit"
        className="mx-auto flex items-center gap-2 rounded-full bg-bg-inverse px-4 py-1.5 pr-1.5 text-sm transition-all hover:scale-[0.98] active:scale-[0.95]"
      >
        <span className="text-bg-foundation">Not your party?</span>{" "}
        <span className="inline-flex gap-0.5 rounded-full bg-bg-foundation py-0.5 pr-2 pl-1.5 text-text-primary">
          <span className="grid size-lh place-items-center">
            {isPending ? <Spinner className="size-3" /> : <IconRestart className="size-3" />}
          </span>
          Reset selection
        </span>
      </button>
    </form>
  );
}

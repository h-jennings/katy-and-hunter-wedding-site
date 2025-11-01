"use client";

import * as React from "react";
import { verifyCode } from "~/app/lib/auth/verify-code.actions";
import { chunky, copy } from "~/app/styles/text.styles";
import { Button } from "../button";
import { Input } from "../input";

export function RsvpVerifyCodeForm() {
  const [state, submitAction, isPending] = React.useActionState(verifyCode, { status: "idle" });
  const [submitCount, setSubmitCount] = React.useState(0);

  return (
    <form action={submitAction} className="flex flex-col items-center gap-y-6 text-center">
      <div className="flex flex-col items-center gap-y-4 px-4 pt-14 text-center">
        <h2 className={chunky()}>Enter your super secret code</h2>
        <div>
          <label htmlFor="code" className="sr-only">
            Code:
          </label>
          <Input type="text" minLength={1} required name="code" placeholder="Shhh..." />
        </div>
      </div>
      <Button type="submit" onClick={() => setSubmitCount((count) => count + 1)} disabled={isPending}>
        Verify Code
      </Button>
      <div className="mb-4 h-10">
        {!isPending && state.status === "error" && (
          <p className={copy({ className: "text-red-700" })}>
            {ERROR_MESSAGE_COPY[(submitCount - 1) % ERROR_MESSAGE_COPY.length]}
          </p>
        )}
      </div>
    </form>
  );
}

const ERROR_MESSAGE_COPY = [
  "Sorry...no dice",
  "Still not it...",
  <span key="error-message">
    Looks like you're having trouble.
    <br /> Shoot Katy a text {process.env.NEXT_PUBLIC_KATY_PHONE}.
  </span>,
];

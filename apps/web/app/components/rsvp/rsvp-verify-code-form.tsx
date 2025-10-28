"use client";

import * as React from "react";
import { Button } from "~/app/components/button";
import { Input } from "~/app/components/input";
import { verifyCode } from "~/app/lib/actions/verify-code.actions";
import { chunky, copy } from "~/app/styles/text.styles";

export function RsvpVerifyCodeForm() {
  const [state, submitAction, isPending] = React.useActionState(verifyCode, null);
  const [submitCount, setSubmitCount] = React.useState(0);

  return (
    <form action={submitAction} className="flex w-full flex-col items-center gap-y-6 text-center">
      <div className="flex w-full flex-col items-center gap-y-6 px-4 pt-14 text-center">
        <h2 className={chunky()}>Enter your super secret code</h2>
        <div className="w-full">
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
        {!isPending &&
          state?.status === "error" &&
          (state.reason === "CODE_REQUIRED" || state.reason === "CODE_INCORRECT" ? (
            <VerificationError submitCount={submitCount} />
          ) : (
            <p className={copy({ className: "text-red-700" })}>Something went wrong. Please try again.</p>
          ))}
      </div>
    </form>
  );
}

function VerificationError({ submitCount }: { submitCount: number }) {
  return (
    <p className={copy({ className: "text-red-700" })}>
      {ERROR_MESSAGE_COPY[(submitCount - 1) % ERROR_MESSAGE_COPY.length]}
    </p>
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

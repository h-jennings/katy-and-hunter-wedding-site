"use client";

import { useActionState } from "react";
import { verifyCode } from "~/app/lib/auth/auth.actions";
import { copy } from "~/app/styles/text.styles";
import { Button } from "../button";

export function RsvpVerifyCodeForm() {
  const [state, submitAction, isPending] = useActionState(verifyCode, { status: "idle" });

  return (
    <form action={submitAction} className="flex flex-col items-center gap-y-6 text-center">
      <div className="flex flex-col items-center gap-y-4 text-center">
        <h2 className={copy()}>Enter your super secret code</h2>
        <input
          type="text"
          name="code"
          placeholder="Enter the secret code"
          className="h-10 w-full min-w-0 rounded-lg border border-black/10 bg-transparent px-3 py-1 text-base/none text-gray-700 outline-none transition-all duration-200 hover:border-gray-400 focus:border-gray-400 focus:shadow-[0px_0px_1px_2px_#D2D2D3]"
        />
      </div>
      <Button disabled={isPending}>Verify Code</Button>
    </form>
  );
}

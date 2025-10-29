"use client";

import { useActionState } from "react";
import { verifyCode } from "~/app/lib/auth/auth.actions";

export function RsvpCodeForm() {
  const verifyCodeWithCode = verifyCode.bind(
    null,
    // TODO: code goes here
    "",
  );
  const [state, submitAction, isPending] = useActionState(verifyCodeWithCode, { status: "idle" });

  return (
    <form action={submitAction}>
      <button type="submit" className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
        Verify Code
      </button>
    </form>
  );
}

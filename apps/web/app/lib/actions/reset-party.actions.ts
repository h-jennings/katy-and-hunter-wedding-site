"use server";
import "server-only";
import { fromPromise, ok, safeTry } from "neverthrow";
import { redirect } from "next/navigation";
import { clearAuthJwt } from "~/app/lib/auth/auth.helpers";
import { unauthorizedError } from "~/app/lib/errors/auth.errors";

export async function selectPartyAction() {
  const result = safeTry(async function* () {
    yield* fromPromise(clearAuthJwt(), () => {
      return unauthorizedError("Failed to clear auth token");
    });

    return ok(undefined);
  });

  return result.match(
    () => {
      return redirect("/rsvp");
    },
    (error) => {
      return {
        status: "error" as const,
        reason: error._tag,
      };
    },
  );
}

"use server";
import "server-only";
import { redirect } from "next/navigation";
import { createAuthJwt } from "~/app/lib/auth/auth.helpers";

export async function selectPartyAction(partyId: string) {
  await createAuthJwt({ authorized: true, partyId });

  return redirect("/rsvp");
}

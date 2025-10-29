import "server-only";
import { createAuthJwt } from "./auth.helpers";

type CodeVerificationResponse =
  | {
      status: "success";
    }
  | {
      status: "error";
      message: string;
    };
export async function verifyCode(code: string): Promise<CodeVerificationResponse> {
  "use server";
  if (code.toUpperCase().trim() !== process.env.INVITE_CODE) {
    return { status: "error", message: "Invalid code" };
  }

  await createAuthJwt({ authorized: true, partyId: null });

  return { status: "success" };
}

export async function lookupParty(name: string) {
  "use server";
  // search guests by LOWER(TRIM(first_name)) and LOWER(TRIM(last_name))
  // if 0 results: show error + email fallback option
  // if 1 result: set cookie with {authorized: true, partyId}
  // if multiple: show party picker UI
}
export async function submitRsvp(formData: FormData) {
  "use server";
  // const { partyId } = jwt.verify(token);
  // verify all guest_ids belong to this party
  // upsert rsvps with status='attending' or 'declined'
  // set parties.responded_at = now()
  // update parties.notes if provided
}

export async function clearPartySelection() {
  "use server";
  // set cookie with {authorized: true} only (remove partyId)
  // redirect("/rsvp");
}

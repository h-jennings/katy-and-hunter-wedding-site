"use server";
import "server-only";

type PartyLookupResponse =
  | { status: "idle" }
  | {
      status: "success";
    };

export async function lookupParty(_initialState: PartyLookupResponse, formData: FormData) {
  // search guests by LOWER(TRIM(first_name)) and LOWER(TRIM(last_name))
  // if 0 results: show error + email fallback option
  // if 1 result: set cookie with {authorized: true, partyId}
  // if multiple: show party picker UI
  return {
    status: "success" as const,
  };
}

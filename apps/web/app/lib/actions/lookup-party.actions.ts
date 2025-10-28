"use server";
import { db } from "@repo/database";
import { err, ok, safeTry } from "neverthrow";
import "server-only";
import { queryDbArrayOrNotFound } from "~/app/lib/db/query-helpers";
import { type NameRequiredError, nameRequiredError } from "~/app/lib/errors/auth.errors";
import type { DatabaseError, NotFoundError } from "~/app/lib/errors/db.errors";

export async function lookupParty(_previousState: LookupPartyState, formData: FormData): Promise<LookupPartyState> {
  const result = safeTry(async function* () {
    const [firstName, lastName] = yield* parseFullName(formData);
    const matchingGuests = yield* getMatchingGuestsFromDb(firstName, lastName);

    const partyIds = [...new Set(matchingGuests.map((g) => g.partyId))];

    const parties = yield* getPartiesByIds(partyIds);

    return ok(parties);
  });

  return result.match(
    (data) => ({ status: "success" as const, data }),
    (error) => ({
      status: "error" as const,
      error,
    }),
  );
}

function getMatchingGuestsFromDb(firstName: string, lastName: string | null) {
  return queryDbArrayOrNotFound(
    () =>
      db.query.guests.findMany({
        columns: {
          id: true,
          firstName: true,
          lastName: true,
          partyId: true,
        },
        where: (guest, { ilike, and }) => {
          if (!lastName) {
            return ilike(guest.firstName, `%${firstName}%`);
          }

          return and(ilike(guest.firstName, `%${firstName}%`), ilike(guest.lastName, `%${lastName}%`));
        },
      }),
    "Failed to find matching guests",
  );
}

function getPartiesByIds(partyIds: Array<string>) {
  return queryDbArrayOrNotFound(
    () =>
      db.query.parties.findMany({
        columns: {
          id: true,
          displayName: true,
        },
        with: {
          guests: {
            columns: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
        where: (party, { inArray }) => inArray(party.id, partyIds),
        limit: 3,
      }),
    "Failed to find parties by IDs",
  );
}

function parseFullName(formData: FormData) {
  const fullName = formData.get("full_name")?.toString().trim().toLowerCase();

  if (!fullName) {
    return err(nameRequiredError("Name is required"));
  }

  return ok(splitFullNameIntoParts(fullName));
}

function splitFullNameIntoParts(fullName: string) {
  const fullNameParts = fullName.trim().split(" ");
  const firstName = fullNameParts[0]!;
  const lastName = fullNameParts.length > 1 ? fullNameParts[1]! : null;

  return [firstName, lastName] as const;
}

export type PartyData = Array<{
  id: string;
  displayName: string;
  guests: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
}>;

export type LookupPartyError = DatabaseError | NotFoundError | NameRequiredError;

export type LookupPartyState =
  | { status: "success"; data: PartyData }
  | { status: "error"; error: LookupPartyError }
  | null;

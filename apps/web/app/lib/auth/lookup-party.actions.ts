"use server";
import { db } from "@repo/database";
import { err, ok, safeTry } from "neverthrow";
import "server-only";
import { queryDbArrayOrNotFound } from "../db/query-helpers";
import { TaggedError } from "../errors/base";
import type { DatabaseError, NotFoundError } from "../errors/infrastructure";

export async function lookupParty(_previousState: LookupPartyState, formData: FormData) {
  const result = await safeTry(async function* () {
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
      error: error.toJSON(),
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
    return err(new NameRequiredError());
  }

  return ok(splitFullNameIntoParts(fullName));
}

function splitFullNameIntoParts(fullName: string) {
  const fullNameParts = fullName.trim().split(" ");
  const firstName = fullNameParts[0]!;
  const lastName = fullNameParts.length > 1 ? fullNameParts[1]! : null;

  return [firstName, lastName] as const;
}

class NameRequiredError extends TaggedError<"NAME_REQUIRED"> {
  readonly _tag = "NAME_REQUIRED" as const;

  constructor(message = "Name is required") {
    super(message);
  }
}

type LookupPartyError = NameRequiredError | NotFoundError | DatabaseError;

export type PartyData = Array<{
  id: string;
  displayName: string;
  guests: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
}>;

export type LookupPartyState =
  | { status: "success"; data: PartyData }
  | { status: "error"; error: ReturnType<LookupPartyError["toJSON"]> }
  | null;

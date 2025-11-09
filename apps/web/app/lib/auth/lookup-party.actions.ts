"use server";
import { db } from "@repo/database";
import { err, ok, ResultAsync, safeTry } from "neverthrow";
import "server-only";

type LookupError =
  | { type: "NAME_REQUIRED"; message: string }
  | {
      type: "DATABASE_ERROR";
      message: string;
      cause?: unknown;
    }
  | {
      type: "NO_RESULTS";
      message: string;
    };

export type PartyData = Array<{
  id: string;
  displayName: string;
  guests: Array<{
    id: string;
    firstName: string;
    lastName: string;
  }>;
}>;

export type LookupPartyState = { status: "success"; data: PartyData } | { status: "error"; error: LookupError } | null;

// TODO: You wanted to use typederror classes and make a better wrapper around the db calls
/*

// db-helpers.ts
export function queryDb<T>(queryFn: () => Promise<T>) {
  return ResultAsync.fromPromise(
    queryFn(),
    (error) => ({
      type: "DATABASE_ERROR" as const,
      message: "Failed to query database",
      cause: error,
    })
  );
}

// then use it
const matchingGuests = yield* queryDb(() =>
  db.query.guests.findMany({ ... })
);

*/
export async function lookupParty(_previousState: LookupPartyState, formData: FormData): Promise<LookupPartyState> {
  const result = await safeTry(async function* () {
    const [firstName, lastName] = yield* parseFullName(formData);
    const matchingGuests = yield* getMatchingGuestsFromDb(firstName, lastName);

    if (matchingGuests.length === 0) {
      return err({ type: "NO_RESULTS" as const, message: "No matching guests found" });
    }

    const partyIds = [...new Set(matchingGuests.map((g) => g.partyId))];

    const parties = yield* getPartiesByIds(partyIds);

    return ok(parties);
  });

  return result.match(
    (data) => ({ status: "success" as const, data }),
    (error) => ({ status: "error" as const, error }),
  );
}

function getMatchingGuestsFromDb(firstName: string, lastName: string | null) {
  return ResultAsync.fromPromise(
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
    (error) => {
      return {
        type: "DATABASE_ERROR" as const,
        message: "Failed to query database",
        cause: error,
      };
    },
  );
}

function getPartiesByIds(partyIds: Array<string>) {
  return ResultAsync.fromPromise(
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
    (error) => {
      return {
        type: "DATABASE_ERROR" as const,
        message: "Failed to query database",
        cause: error,
      };
    },
  );
}

function parseFullName(formData: FormData) {
  const fullName = formData.get("full_name")?.toString().trim().toLowerCase();

  if (!fullName) {
    return err({
      type: "NAME_REQUIRED" as const,
      message: "Name is required",
    });
  }

  return ok(splitFullNameIntoParts(fullName));
}

function splitFullNameIntoParts(fullName: string): [string, string | null] {
  const fullNameParts = fullName.trim().split(" ");
  const firstName = fullNameParts[0]!;
  const lastName = fullNameParts.length > 1 ? fullNameParts[1]! : null;

  return [firstName, lastName];
}

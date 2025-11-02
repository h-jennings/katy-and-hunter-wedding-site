"use server";
import { db } from "@repo/database";
import "server-only";

type PartyLookupResponse =
  | { status: "idle" }
  | {
      status: "success";
      data: Array<{
        id: string;
        displayName: string;
        guests: Array<{
          id: string;
          firstName: string;
          lastName: string;
        }>;
      }>;
    }
  | {
      status: "error";
      message: string;
    };

export async function lookupParty(
  _initialState: PartyLookupResponse,
  formData: FormData,
): Promise<PartyLookupResponse> {
  const fullName = formData.get("full_name")?.toString().trim().toLowerCase();

  if (!fullName) {
    return {
      status: "error",
      message: "Name is required",
    };
  }

  const [firstName, lastName] = splitFullNameIntoParts(fullName);

  try {
    const matchingGuests = await db.query.guests.findMany({
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
    });

    const partyIds = [...new Set(matchingGuests.map((g) => g.partyId))];

    const partiesByFullnameLookup = await db.query.parties.findMany({
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
    });

    return {
      status: "success",
      data: partiesByFullnameLookup,
    };
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An error occurred",
    };
  }
}

function splitFullNameIntoParts(fullName: string): [string, string | null] {
  const fullNameParts = fullName.trim().split(" ");
  const firstName = fullNameParts[0]!;
  const lastName = fullNameParts.length > 1 ? fullNameParts[1]! : null;

  return [firstName, lastName];
}

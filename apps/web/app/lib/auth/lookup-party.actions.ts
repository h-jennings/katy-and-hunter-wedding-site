"use server";
import { db } from "@repo/database";
import "server-only";

type PartyLookupResponse =
  | { status: "idle" }
  | {
      status: "success";
    }
  | {
      status: "error";
      message: string;
    };

export async function lookupParty(_initialState: PartyLookupResponse, formData: FormData) {
  const fullName = formData.get("full_name")?.toString().trim().toLowerCase();

  if (!fullName) {
    return {
      status: "error",
      message: "Name is required",
    };
  }

  const [firstName, lastName] = splitFullNameIntoParts(fullName);

  try {
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
          where: (guest, { ilike }) => {
            return ilike(guest.firstName, `%${firstName}%`) && ilike(guest.lastName, `%${lastName}%`);
          },
        },
      },
      limit: 3,
    });
  } catch (error) {
    console.error(error);
    return {
      status: "error",
      message: "An error occurred",
    };
  }

  // search guests by LOWER(TRIM(first_name)) and LOWER(TRIM(last_name))
  // if 0 results: show error + email katy fallback option option
  // if 1 or more results: show party picker UI
  return {
    status: "success" as const,
  };
}

function splitFullNameIntoParts(fullName: string): [string, string | null] {
  const fullNameParts = fullName.trim().split(" ");
  const firstName = fullNameParts[0]!;
  const lastName = fullNameParts.length > 1 ? fullNameParts[1]! : null;

  return [firstName, lastName];
}

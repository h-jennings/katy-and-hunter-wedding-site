"use server";
import { db } from "@repo/database";
import { and, eq, isNull } from "drizzle-orm";
import { err, fromPromise, ok, safeTry } from "neverthrow";
import { redirect } from "next/navigation";
import { z } from "zod";
import "server-only";
import { parties, rsvps } from "@repo/database/schema";
import { revalidatePath } from "next/cache";
import { getAuthState } from "~/app/lib/auth/auth.helpers";
import { type UnauthorizedError, unauthorizedError } from "~/app/lib/errors/auth.errors";
import { type DatabaseError, databaseError } from "~/app/lib/errors/db.errors";
import {
  type InvalidRsvpDataError,
  invalidRsvpDataError,
  type NoRsvpResponsesError,
  noRsvpResponsesError,
} from "~/app/lib/errors/rsvp.errors";

export async function submitRsvp(_previousState: RsvpState, formData: FormData): Promise<RsvpState> {
  const result = safeTry(async function* () {
    const { partyId } = yield* fromPromise(getAuthState(), () => {
      return unauthorizedError("You must be authorized to submit RSVPs");
    });

    if (!partyId) {
      return err(unauthorizedError("You must have a party association to submit RSVPs"));
    }

    const rsvpUpdates = yield* parseRsvpFormData(formData);
    const guestIds = new Set([...rsvpUpdates.map((rsvp) => rsvp.guestId)]);

    yield* validateGuestOwnership(partyId, Array.from(guestIds));

    // Update RSVPs first (critical operation)
    yield* updateRsvpsInDb(rsvpUpdates);

    // Then update party timestamp (less critical)
    yield* updatePartyRespondedAt(partyId);

    return ok(undefined);
  });

  return result.match(
    () => {
      revalidatePath("/rsvp");
      redirect("/rsvp");
    },
    (error) => ({
      status: "error" as const,
      error,
    }),
  );
}

/**
 * Parse RSVP form data into structured format.
 * Validates that all required fields are present and correctly formatted.
 */
function parseRsvpFormData(formData: FormData) {
  const entries = Array.from(formData.entries());

  const rsvpEntries = entries.filter(([key]) => key.endsWith("_rsvpStatus"));
  // Parse entries using named capture groups
  const rsvpUpdates = rsvpEntries
    .map(([key, value]) => {
      // Match pattern: eventId_guestId_rsvpStatus
      const match = key.match(/^(?<eventId>[^_]+)_(?<guestId>[^_]+)_rsvpStatus$/);

      if (!match?.groups) return null;

      const { eventId, guestId } = match.groups;

      return {
        eventId,
        guestId,
        status: value,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Validate we have at least one RSVP response
  if (rsvpUpdates.length === 0) {
    return err(noRsvpResponsesError("No RSVP responses provided"));
  }

  // Validate all entries were successfully parsed
  if (rsvpUpdates.length !== rsvpEntries.length) {
    return err(invalidRsvpDataError("Some RSVP responses were invalid or malformed"));
  }

  const parsedRsvpUpdates = RsvpUpdatePayloadSchema.safeParse(rsvpUpdates);

  if (!parsedRsvpUpdates.success) {
    return err(invalidRsvpDataError("Some RSVP responses were invalid or malformed"));
  }

  return ok(parsedRsvpUpdates.data);
}

const RsvpUpdatePayloadSchema = z.array(
  z.object({
    eventId: z.string(),
    guestId: z.string(),
    status: z.literal(["attending", "declined"]),
  }),
);

function validateGuestOwnership(partyId: string, guestIds: Array<string>) {
  return fromPromise(
    db.query.guests.findMany({
      where: (guests, { inArray, eq, and }) => {
        return and(inArray(guests.id, guestIds), eq(guests.partyId, partyId));
      },
      columns: {
        id: true,
      },
    }),
    () => {
      return databaseError("Failed to validate guest ownership");
    },
  ).andThen((validGuests) => {
    if (validGuests.length !== guestIds.length) {
      return err(unauthorizedError("You can only RSVP for guests in your party"));
    }
    return ok(undefined);
  });
}

/**
 * Update RSVP statuses in the database.
 * Uses upsert pattern to update existing records or insert new ones.
 */
function updateRsvpsInDb(rsvpUpdates: Array<{ eventId: string; guestId: string; status: "attending" | "declined" }>) {
  return fromPromise(
    Promise.all(
      rsvpUpdates.map((rsvp) =>
        db
          .insert(rsvps)
          .values({
            eventId: rsvp.eventId,
            guestId: rsvp.guestId,
            status: rsvp.status,
            updatedAt: new Date(),
          })
          .onConflictDoUpdate({
            target: [rsvps.eventId, rsvps.guestId],
            set: {
              status: rsvp.status,
              updatedAt: new Date(),
            },
          }),
      ),
    ),
    () => databaseError("Failed to update RSVP responses"),
  );
}

/**
 * Update the party's respondedAt timestamp if they haven't responded before.
 * Only sets respondedAt on the first submission (when it's null).
 */
function updatePartyRespondedAt(partyId: string) {
  return fromPromise(
    db
      .update(parties)
      .set({
        respondedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(and(eq(parties.id, partyId), isNull(parties.respondedAt))),
    () => databaseError("Failed to update party response timestamp"),
  );
}

export type RsvpError = DatabaseError | UnauthorizedError | InvalidRsvpDataError | NoRsvpResponsesError;

export type RsvpState = { status: "success" } | { status: "error"; error: RsvpError } | null;

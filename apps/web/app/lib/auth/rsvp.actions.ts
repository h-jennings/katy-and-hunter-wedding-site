"use server";
import { db } from "@repo/database";
import { and, eq, isNull } from "drizzle-orm";
import { err, fromPromise, ok, safeTry } from "neverthrow";
import { z } from "zod";
import "server-only";
import { parties, rsvps } from "@repo/database/schema";
import { getAuthState } from "~/app/lib/auth/auth.helpers";
import { queryDb } from "~/app/lib/db/query-helpers";
import { type UnauthorizedError, unauthorizedError } from "~/app/lib/errors/auth.errors";
import type { DatabaseError } from "~/app/lib/errors/db.errors";
import {
  type InvalidRsvpDataError,
  invalidRsvpDataError,
  type NoRsvpResponsesError,
  noRsvpResponsesError,
} from "~/app/lib/errors/rsvp.errors";

export async function submitRsvp(_previousState: RsvpState, formData: FormData): Promise<RsvpState> {
  const result = safeTry(async function* () {
    // Get party ID from auth state
    const { partyId } = yield* fromPromise(getAuthState(), () => {
      return unauthorizedError("You must be authorized to submit RSVPs");
    });

    if (!partyId) {
      return err(unauthorizedError("You must have a party association to submit RSVPs"));
    }

    // Parse and validate RSVP form data
    const rsvpUpdates = yield* parseRsvpFormData(formData);

    // TODO: these two things should be in a transaction
    // Update party's respondedAt if this is their first response
    yield* updatePartyRespondedAt(partyId);

    // Update RSVPs in database
    yield* updateRsvpsInDb(rsvpUpdates);

    return ok(undefined);
  });

  return result.match(
    () => ({ status: "success" as const }),
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

  // Parse entries using named capture groups
  const rsvpUpdates = entries
    .map(([key, value]) => {
      // Match pattern: eventId_guestId_rsvpStatus
      // Note: The form field is named with rsvpId but it's actually the guestId
      const match = key.match(/^(?<eventId>.+)_(?<guestId>.+)_rsvpStatus$/);

      if (!match?.groups) return null;

      const { eventId, guestId } = match.groups;
      const status = value as string;

      // Validate status is valid enum value
      if (status !== "attending" && status !== "declined") {
        return null;
      }

      return {
        eventId,
        guestId,
        status,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  // Validate we have at least one RSVP response
  if (rsvpUpdates.length === 0) {
    return err(noRsvpResponsesError("No RSVP responses provided"));
  }

  // Validate all entries were successfully parsed
  if (rsvpUpdates.length !== entries.length) {
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

/**
 * Update the party's respondedAt timestamp if they haven't responded before.
 * Only sets respondedAt on the first submission (when it's null).
 */
function updatePartyRespondedAt(partyId: string) {
  return queryDb(async () => {
    await db
      .update(parties)
      .set({
        respondedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(and(eq(parties.id, partyId), isNull(parties.respondedAt)));
  }, "Failed to update party response timestamp");
}

/**
 * Update RSVP statuses in the database.
 * Uses upsert pattern to update existing records or insert new ones.
 */
function updateRsvpsInDb(
  rsvpUpdates: Array<{
    eventId: string;
    guestId: string;
    status: "attending" | "declined";
  }>,
) {
  return queryDb(async () => {
    // Use Promise.all to update all RSVPs concurrently
    await Promise.all(
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
    );
  }, "Failed to update RSVP responses");
}

export type RsvpError = DatabaseError | UnauthorizedError | InvalidRsvpDataError | NoRsvpResponsesError;

export type RsvpState = { status: "success" } | { status: "error"; error: RsvpError } | null;

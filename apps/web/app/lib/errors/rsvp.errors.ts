/**
 * RSVP-related tagged errors.
 */

import { createErrorTypeGuard, createTaggedError } from "~/app/lib/errors/tagged-error.types";

/**
 * Error when RSVP form data is invalid or malformed.
 */
export const invalidRsvpDataError = createTaggedError("INVALID_RSVP_DATA");
export type InvalidRsvpDataError = ReturnType<typeof invalidRsvpDataError>;

/**
 * Error when no RSVP responses were provided in the form.
 */
export const noRsvpResponsesError = createTaggedError("NO_RSVP_RESPONSES");
export type NoRsvpResponsesError = ReturnType<typeof noRsvpResponsesError>;

/**
 * Union of all RSVP errors.
 */
export type RsvpError = InvalidRsvpDataError | NoRsvpResponsesError;

/**
 * Array of all RSVP error tags.
 */
export const RSVP_ERROR_TAGS = ["INVALID_RSVP_DATA", "NO_RSVP_RESPONSES"] as const;

/**
 * Type guard for RSVP errors.
 */
export const isRsvpError = createErrorTypeGuard<RsvpError>(RSVP_ERROR_TAGS);

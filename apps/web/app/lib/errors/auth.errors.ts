/**
 * Authentication-related tagged errors.
 */

import { createErrorTypeGuard, createTaggedError } from "~/app/lib/errors/tagged-error.types";

/**
 * Error when name is required but not provided.
 */
export const nameRequiredError = createTaggedError("NAME_REQUIRED");
export type NameRequiredError = ReturnType<typeof nameRequiredError>;

/**
 * Error when user is not authorized to perform an action.
 */
export const unauthorizedError = createTaggedError("UNAUTHORIZED");
export type UnauthorizedError = ReturnType<typeof unauthorizedError>;

/**
 * Union of all authentication errors.
 */
export type AuthError = NameRequiredError | UnauthorizedError;

/**
 * Array of all authentication error tags.
 */
export const AUTH_ERROR_TAGS = ["NAME_REQUIRED", "UNAUTHORIZED"] as const;

/**
 * Type guard for authentication errors.
 */
export const isAuthError = createErrorTypeGuard<AuthError>(AUTH_ERROR_TAGS);

/**
 * Authentication-related tagged errors.
 */

import { createErrorTypeGuard, createTaggedError } from "~/app/lib/errors/tagged-error.types";

/**
 * Error when authentication code is required but not provided.
 */
export const codeRequiredError = createTaggedError("CODE_REQUIRED");
export type CodeRequiredError = ReturnType<typeof codeRequiredError>;

export const codeIncorrectError = createTaggedError("CODE_INCORRECT");
export type CodeIncorrectError = ReturnType<typeof codeIncorrectError>;

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
export type AuthError = CodeRequiredError | CodeIncorrectError | NameRequiredError | UnauthorizedError;

/**
 * Array of all authentication error tags.
 */
export const AUTH_ERROR_TAGS = ["CODE_REQUIRED", "CODE_INCORRECT", "NAME_REQUIRED", "UNAUTHORIZED"] as const;

/**
 * Type guard for authentication errors.
 */
export const isAuthError = createErrorTypeGuard<AuthError>(AUTH_ERROR_TAGS);

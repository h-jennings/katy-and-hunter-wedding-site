/**
 * Database-related tagged errors.
 */

import { createErrorTypeGuard, createTaggedError } from "~/app/lib/errors/tagged-error.types";

/**
 * Generic database error.
 */
export const databaseError = createTaggedError("DATABASE_ERROR");
export type DatabaseError = ReturnType<typeof databaseError>;

/**
 * Resource not found error.
 */
export const notFoundError = createTaggedError("NOT_FOUND");
export type NotFoundError = ReturnType<typeof notFoundError>;

/**
 * Union of all database errors.
 */
export type DbError = DatabaseError | NotFoundError;

/**
 * Array of all database error tags.
 */
export const DB_ERROR_TAGS = ["DATABASE_ERROR", "NOT_FOUND"] as const;

/**
 * Type guard for database errors.
 */
export const isDbError = createErrorTypeGuard<DbError>(DB_ERROR_TAGS);

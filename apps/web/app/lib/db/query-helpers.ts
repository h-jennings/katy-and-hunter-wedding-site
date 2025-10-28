import { err, fromPromise, ok, type ResultAsync } from "neverthrow";
import { type DatabaseError, databaseError, type NotFoundError, notFoundError } from "~/app/lib/errors/db.errors";

/**
 * Wraps database queries with consistent error handling.
 * Automatically catches and converts database errors to DatabaseError instances.
 *
 * @template T - The expected return type of the query
 * @param queryFn - A function that performs the database query
 * @param errorMessage - Custom error message (defaults to "Failed to query database")
 * @returns A ResultAsync that resolves to the query result or a DatabaseError
 *
 * @example
 * ```typescript
 * const users = await queryDb(
 *   () => db.query.users.findMany(),
 *   "Failed to fetch users"
 * );
 * ```
 */
export function queryDb<T>(
  queryFn: () => Promise<T>,
  errorMessage = "Failed to query database",
): ResultAsync<T, DatabaseError> {
  return fromPromise(queryFn(), () => {
    // Log database errors server-side for monitoring
    console.error(`[DB Error] ${errorMessage}`);
    return databaseError(errorMessage);
  });
}

/**
 * Wraps database queries that might return null/undefined.
 * Converts null results to NotFoundError.
 *
 * @template T - The expected return type of the query (excluding null/undefined)
 * @param queryFn - A function that performs the database query
 * @param errorMessage - Custom error message for not found case
 * @returns A ResultAsync that resolves to the query result, DatabaseError, or NotFoundError
 *
 * @example
 * ```typescript
 * const user = await queryDbOrNotFound(
 *   () => db.query.users.findFirst({ where: eq(users.id, userId) }),
 *   "user",
 *   "User not found with this ID"
 * );
 * ```
 */
export function queryDbOrNotFound<T>(
  queryFn: () => Promise<T | null | undefined>,
  errorMessage?: string,
): ResultAsync<T, DatabaseError | NotFoundError> {
  return queryDb(queryFn, errorMessage).andThen((result) => {
    if (result == null) {
      return err(notFoundError(errorMessage ?? "Resource not found"));
    }
    return ok(result);
  });
}

/**
 * Wraps database queries that return arrays.
 * Converts empty arrays to NotFoundError.
 *
 * @template T - The type of elements in the array
 * @param queryFn - A function that performs the database query returning an array
 * @param resource - The name of the resource being queried (plural, e.g., "users", "parties")
 * @param errorMessage - Custom error message for not found case
 * @returns A ResultAsync that resolves to the array, DatabaseError, or NotFoundError
 *
 * @example
 * ```typescript
 * const matchingGuests = await queryDbArrayOrNotFound(
 *   () => db.query.guests.findMany({ where: ilike(guests.name, searchTerm) }),
 *   "guests",
 *   "No matching guests found"
 * );
 * ```
 */
export function queryDbArrayOrNotFound<T>(
  queryFn: () => Promise<Array<T>>,
  errorMessage?: string,
): ResultAsync<Array<T>, DatabaseError | NotFoundError> {
  return queryDb(queryFn, errorMessage).andThen((result) => {
    if (result.length === 0) {
      return err(notFoundError(errorMessage ?? "Resource not found"));
    }
    return ok(result);
  });
}
